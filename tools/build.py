"""Builds and signs the Quiet Bible APK from this source tree.

    python3 tools/build.py                       # -> out/QuietBible-v<version>.apk
    python3 tools/build.py --android-jar PATH    # android.jar for API 34 (default: $ANDROID_JAR or sdk/android-34.jar)
    python3 tools/build.py --new-key my.p12      # make a signing key of your own first, then use it
    python3 tools/build.py --key my.p12 --key-password ...

What goes in:
  android/base/QuietBible-v0.6.0.apk   the original APK: resources, manifest, icons
  android/smali/                       -> classes.dex   (the activity and its JavaScript bridges)
  android/java/ + android/stubs/       -> classes2.dex  (voices, translations, playback service)
  web/                                 -> assets/www/   (the reader itself)
  android/extra/                       -> native speech engine, built-in voice, licence texts
  a signing key                        APK Signature Scheme v2. Official releases are signed with
                                       the maintainer's key, which is not in the public source
                                       (signing/key.properties names it in the private copy).
                                       Anyone else builds with a key of their own.

Needs: python3 with `cryptography`, a JDK (javac/javap 17+), and android.jar for API 34.
The dex tools (dex2jar 2.4, which bundles dx 30.0.2) are in tools/dex-tools-v2.4.
"""
import argparse, glob, os, re, shutil, struct, subprocess, sys, tempfile, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "tools"))
import manifest  # noqa: E402
import sign      # noqa: E402

VERSION_CODE = 143
VERSION_NAME = "1.4.3"
TARGET_SDK = 36          # Android 16; Google Play needs this for new apps from 31 Aug 2026

BASE = os.path.join(ROOT, "android/base/QuietBible-v0.6.0.apk")
DEX_TOOLS = os.path.join(ROOT, "tools/dex-tools-v2.4")
SIGNING = os.path.join(ROOT, "signing", "key.properties")


def run(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if r.returncode:
        sys.exit(f"failed: {' '.join(cmd)}\n{r.stdout}\n{r.stderr}")
    return r.stdout


def build_classes1(work):
    out = os.path.join(work, "classes.dex")
    run(["sh", os.path.join(DEX_TOOLS, "d2j-smali.sh"), "-o", out, os.path.join(ROOT, "android/smali")])
    return out


def build_classes2(work, android_jar):
    cls = os.path.join(work, "classes2")
    os.makedirs(cls)
    srcs = sorted(glob.glob(os.path.join(ROOT, "android/java/**/*.java"), recursive=True))
    # Compile against the real activity's shape without shipping a second copy of it.
    srcs += [os.path.join(ROOT, "android/stubs/native/org/quietbible/app/ThemeArt.java"),
             os.path.join(ROOT, "android/stubs/voice/org/quietbible/app/MainActivity.java")]
    run(["javac", "-nowarn", "-encoding", "UTF-8", "-source", "8", "-target", "8",
         "-bootclasspath", android_jar, "-d", cls] + srcs)
    for stub in glob.glob(os.path.join(cls, "org/quietbible/app/ThemeArt*.class")) + \
            glob.glob(os.path.join(cls, "org/quietbible/app/MainActivity*.class")):
        os.remove(stub)                                   # these live in classes.dex
    classes = sorted(glob.glob(os.path.join(cls, "**/*.class"), recursive=True))
    if "invokedynamic" in run(["javap", "-c", "-p"] + classes):
        sys.exit("invokedynamic found: dx 30 cannot dex lambdas; use anonymous classes")
    out = os.path.join(work, "classes2.dex")
    run(["java", "-cp", os.path.join(DEX_TOOLS, "lib/dx-30.0.2.jar"), "com.android.dx.command.Main",
         "--dex", "--min-sdk-version=21", "--output=" + out, cls])
    return out


def read_properties(path):
    props = {}
    for line in open(path, encoding="utf8"):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            props[k.strip()] = v.strip()
    return props


def signing_key(a):
    """The key to sign with, and its password, as bytes."""
    password = a.key_password or os.environ.get("QB_KEY_PASSWORD")
    if a.new_key:
        if os.path.exists(a.new_key):
            sys.exit(f"{a.new_key} already exists; sign with it using --key")
        password = password or "quiet-bible"
        sign.new_key(a.new_key, password.encode())
        print(f"made a new signing key: {a.new_key} (password: {password}). Keep it: updates must be signed with it.")
        return a.new_key, password.encode()
    if a.key:
        if not password:
            sys.exit("give the key's password with --key-password or QB_KEY_PASSWORD")
        return a.key, password.encode()
    if os.path.isfile(SIGNING):
        p = read_properties(SIGNING)
        return os.path.join(os.path.dirname(SIGNING), p["key"]), (password or p["password"]).encode()
    sys.exit("No signing key. Official releases are signed with the maintainer's own key, which is not part\n"
             "of the public source. Build with a key of your own:\n"
             "  python3 tools/build.py --new-key my-signing-key.p12      (the first time)\n"
             "  python3 tools/build.py --key my-signing-key.p12 --key-password quiet-bible\n"
             "An APK signed with another key can't install over the official app: uninstall that first.")


def web_version():
    js = open(os.path.join(ROOT, "web/app.js"), encoding="utf8").read()
    m = re.search(r"var QB_VERSION=`([^`]*)`", js)
    return m.group(1) if m else None


def default_android_jar():
    if os.environ.get("ANDROID_JAR"):
        return os.environ["ANDROID_JAR"]
    sdk = os.environ.get("ANDROID_HOME") or os.environ.get("ANDROID_SDK_ROOT")
    return os.path.join(sdk, "platforms", "android-34", "android.jar") if sdk else "android.jar"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--android-jar", default=default_android_jar(),
                    help="android.jar for API 34 (default: $ANDROID_JAR, or the one in $ANDROID_HOME)")
    ap.add_argument("--out", default=os.path.join(ROOT, "out"))
    ap.add_argument("--key", help="a PKCS#12 (.p12) signing key; default: the one signing/key.properties names")
    ap.add_argument("--key-password", help="its password (or set QB_KEY_PASSWORD)")
    ap.add_argument("--new-key", metavar="PATH", help="create a new signing key at PATH and sign with it")
    a = ap.parse_args()
    if web_version() != VERSION_NAME:
        sys.exit(f"web/app.js says version {web_version()}, build.py says {VERSION_NAME}: make them match")
    if not os.path.isfile(a.android_jar):
        sys.exit(f"android.jar for API 34 not found at {a.android_jar} (use --android-jar)")
    key, password = signing_key(a)
    work = tempfile.mkdtemp(prefix="qb-build-")
    try:
        over = {"classes.dex": open(build_classes1(work), "rb").read(),
                "classes2.dex": open(build_classes2(work, a.android_jar), "rb").read()}
        base = zipfile.ZipFile(BASE)
        m = manifest.set_version(base.read("AndroidManifest.xml"), VERSION_CODE, VERSION_NAME)
        over["AndroidManifest.xml"] = manifest.set_int_attr(m, "uses-sdk", "targetSdkVersion", TARGET_SDK)
        web = os.path.join(ROOT, "web")
        web_files = {"assets/www/" + os.path.relpath(os.path.join(d, f), web).replace(os.sep, "/"): os.path.join(d, f)
                     for d, _, fs in os.walk(web) for f in fs}
        base_www = {n for n in base.namelist() if n.startswith("assets/www/") and not n.endswith("/")}
        stale = sorted(base_www - set(web_files))
        if stale:
            sys.exit(f"the base APK has page files that web/ no longer has: {stale[:5]}")
        for n, p in web_files.items():
            over[n] = open(p, "rb").read()
        extra = os.path.join(ROOT, "android/extra")
        add = [(os.path.relpath(os.path.join(d, f), extra).replace(os.sep, "/"), os.path.join(d, f))
               for d, ds, fs in sorted(os.walk(extra)) for f in sorted(fs)]
        new_web = sorted(n for n in web_files if n not in base_www)
        add += [(n, web_files[n]) for n in new_web]
        os.makedirs(a.out, exist_ok=True)
        out = os.path.join(a.out, f"QuietBible-v{VERSION_NAME}.apk")
        sign.repack_and_sign(BASE, out, over, add, key, password)
        print("wrote", out, os.path.getsize(out), "bytes")
        mf = zipfile.ZipFile(out).read("AndroidManifest.xml")
        print("version", *manifest.show(mf), "target SDK", manifest.get_int_attr(mf, "uses-sdk", "targetSdkVersion"))
    finally:
        shutil.rmtree(work, ignore_errors=True)


if __name__ == "__main__":
    main()
