#!/usr/bin/env python3
"""Writes readable forms of what the build takes from android/base/QuietBible-v0.6.0.apk:
its AndroidManifest.xml and its resource table (resources.arsc), which are stored compiled.

    python3 tools/decode_base.py            # (re)writes android/base/decoded/
    python3 tools/decode_base.py --check    # fails if android/base/decoded/ is out of date

android/base/README.md says how they relate to the original source in original-source/v0.5/.
tools/build.py changes only the manifest's versionCode, versionName and targetSdkVersion.
"""
import os
import struct
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.path.join(ROOT, "android", "base", "QuietBible-v0.6.0.apk")
OUT = os.path.join(ROOT, "android", "base", "decoded")
ANDROID_NS = "http://schemas.android.com/apk/res/android"

# Names for the framework attributes and enums that appear in the base APK, so the decoded files
# read like the XML they were compiled from (original-source/v0.5/apk-android/).
ANDROID_ATTRS = {0x01010054: "android:windowBackground", 0x010102dd: "android:windowActionModeOverlay",
                 0x010103ac: "android:fontFamily", 0x01010435: "android:colorAccent",
                 0x01010451: "android:statusBarColor", 0x01010452: "android:navigationBarColor",
                 0x010104e0: "android:windowLightStatusBar", 0x0101056c: "android:windowLightNavigationBar"}
ANDROID_REFS = {0x0103022e: "@android:style/Theme.Material.NoActionBar"}
ENUMS = {"launchMode": {0: "standard", 1: "singleTop", 2: "singleTask", 3: "singleInstance"},
         "windowSoftInputMode": {0x10: "adjustResize", 0x20: "adjustPan"},
         "foregroundServiceType": {0x2: "mediaPlayback"}}
FLAGS = {"configChanges": [(0x0080, "orientation"), (0x0400, "screenSize"), (0x0020, "keyboardHidden"),
                           (0x0100, "screenLayout"), (0x0010, "keyboard"), (0x0200, "uiMode"), (0x0800, "smallestScreenSize")]}

TYPES = {0x00: "null", 0x01: "reference", 0x02: "attribute", 0x03: "string", 0x04: "float", 0x05: "dimension",
         0x06: "fraction", 0x10: "int", 0x11: "hex", 0x12: "bool", 0x1c: "color", 0x1d: "color", 0x1e: "color",
         0x1f: "color"}


def u16(d, o):
    return struct.unpack_from("<H", d, o)[0]


def u32(d, o):
    return struct.unpack_from("<I", d, o)[0]


def string_pool(d, off):
    hs, n, flags, s_start = u16(d, off + 2), u32(d, off + 8), u32(d, off + 16), u32(d, off + 20)
    utf8, out = bool(flags & 0x100), []
    for i in range(n):
        so = off + s_start + u32(d, off + hs + i * 4)
        if utf8:
            so += 2 if d[so] & 0x80 else 1
            ln = d[so]
            if ln & 0x80:
                ln = ((ln & 0x7F) << 8) | d[so + 1]
                so += 2
            else:
                so += 1
            out.append(d[so:so + ln].decode("utf8", "replace"))
        else:
            ln = u16(d, so)
            if ln & 0x8000:
                ln = ((ln & 0x7FFF) << 16) | u16(d, so + 2)
                so += 2
            out.append(d[so + 2:so + 2 + ln * 2].decode("utf-16-le", "replace"))
    return out


def value(dtype, data, strings, names=None):
    if dtype == 0x03:
        return strings[data]
    if dtype == 0x01:
        return (names or {}).get(data) or ANDROID_REFS.get(data) or f"@0x{data:08x}"
    if dtype == 0x02:
        return f"?0x{data:08x}"
    if dtype == 0x12:
        return "true" if data else "false"
    if dtype == 0x10:
        return str(struct.unpack("<i", struct.pack("<I", data))[0])
    if dtype in (0x1c, 0x1d, 0x1e, 0x1f):
        return f"#{data:08x}"
    if dtype == 0x04:
        return repr(struct.unpack("<f", struct.pack("<I", data))[0])
    return f"({TYPES.get(dtype, hex(dtype))}) 0x{data:08x}"


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace('"', "&quot;")


def attr_value(name, dtype, data, strings, names):
    if name in ENUMS and data in ENUMS[name]:
        return ENUMS[name][data]
    if name in FLAGS:
        bits = [n for b, n in FLAGS[name] if data & b]
        if sum(b for b, n in FLAGS[name] if data & b) == data:
            return "|".join(bits)
    return value(dtype, data, strings, names)


def manifest_xml(d, names):
    strings, resmap, out, depth, ns = [], [], ['<?xml version="1.0" encoding="utf-8"?>'], 0, {}
    off = 8
    while off < len(d):
        t, hs, sz = u16(d, off), u16(d, off + 2), u32(d, off + 4)
        if t == 0x0001:
            strings = string_pool(d, off)
        elif t == 0x0180:
            resmap = [u32(d, off + 8 + 4 * i) for i in range((sz - 8) // 4)]
        elif t == 0x0100:
            ns[strings[u32(d, off + 20)]] = strings[u32(d, off + 16)]
        elif t == 0x0102:
            name = strings[u32(d, off + 20)]
            ao, ac = off + 16 + u16(d, off + 24), u16(d, off + 28)
            attrs = []
            for i in range(ac):
                a = ao + i * 20
                uri, nm, raw = u32(d, a), strings[u32(d, a + 4)], u32(d, a + 8)
                dtype, data = d[a + 15], u32(d, a + 16)
                prefix = ns.get(strings[uri], "") + ":" if uri != 0xFFFFFFFF else ""
                v = strings[raw] if raw != 0xFFFFFFFF else attr_value(nm, dtype, data, strings, names)
                attrs.append(f'{prefix}{nm}="{esc(v)}"')
            if depth == 0:
                attrs = [f'xmlns:{p}="{u}"' for u, p in ns.items()] + attrs
            pad = "    " * depth
            if attrs:
                out.append(pad + f"<{name}\n" + "\n".join(pad + "        " + x for x in attrs) + ">")
            else:
                out.append(pad + f"<{name}>")
            depth += 1
        elif t == 0x0103:
            depth -= 1
            out.append("    " * depth + f"</{strings[u32(d, off + 20)]}>")
        off += sz
    return "\n".join(out) + "\n"


def config_name(d, o):
    lang = d[o + 8:o + 10].rstrip(b"\0").decode("ascii", "replace")
    country = d[o + 10:o + 12].rstrip(b"\0").decode("ascii", "replace")
    density, sdk, ui = u16(d, o + 14), u16(d, o + 24), d[o + 29]
    parts = [p for p in (lang, country and "r" + country) if p]
    if ui & 0x30 == 0x20:
        parts.append("night")
    elif ui & 0x30 == 0x10:
        parts.append("notnight")
    if density:
        parts.append({0xFFFF: "nodpi", 0xFFFE: "anydpi"}.get(density, f"{density}dpi"))
    if sdk:
        parts.append(f"v{sdk}")
    return "-".join(parts) or "(default)"


def resource_names(d):
    """{resource id: "@type/name"} for the app's own resources."""
    names = {}
    for line in resources_txt(d, {}).splitlines():
        if line.startswith("  0x"):
            rid, name = line.split()[:2]
            names[int(rid, 16)] = "@" + name
    return names


def resources_txt(d, names):
    out = ["resources.arsc of android/base/QuietBible-v0.6.0.apk", ""]
    strings = []
    off = u16(d, 2)
    while off < len(d):
        t, hs, sz = u16(d, off), u16(d, off + 2), u32(d, off + 4)
        if t == 0x0001:
            strings = string_pool(d, off)
        elif t == 0x0200:
            pid = u32(d, off + 8)
            pname = d[off + 12:off + 12 + 256].decode("utf-16-le").split("\0")[0]
            out.append(f"package 0x{pid:02x} {pname}")
            tstr = string_pool(d, off + u32(d, off + 268))
            kstr = string_pool(d, off + u32(d, off + 276))
            p = off + hs
            while p < off + sz:
                ct, chs, csz = u16(d, p), u16(d, p + 2), u32(d, p + 4)
                if ct == 0x0201:
                    tid, count, start = d[p + 8], u32(d, p + 12), u32(d, p + 16)
                    cfg = config_name(d, p + 20)
                    for i in range(count):
                        eo = u32(d, p + chs + 4 * i)
                        if eo == 0xFFFFFFFF:
                            continue
                        e = p + start + eo
                        esz, flags, key = u16(d, e), u16(d, e + 2), u32(d, e + 4)
                        rid = (pid << 24) | (tid << 16) | i
                        head = f"  0x{rid:08x} {tstr[tid - 1]}/{kstr[key]} [{cfg}]"
                        if flags & 1:
                            parent, n = u32(d, e + 8), u32(d, e + 12)
                            out.append(head + (f" parent={value(1, parent, strings, names)}" if parent else ""))
                            for j in range(n):
                                m = e + 16 + 12 * j
                                a = u32(d, m)
                                out.append(f"      {ANDROID_ATTRS.get(a, f'0x{a:08x}')} = {value(d[m + 7], u32(d, m + 8), strings, names)}")
                        else:
                            out.append(head + " = " + value(d[e + esz + 3], u32(d, e + esz + 4), strings, names))
                p += csz
        off += sz
    return "\n".join(out) + "\n"


def main():
    z = zipfile.ZipFile(BASE)
    arsc = z.read("resources.arsc")
    names = resource_names(arsc)
    files = {"AndroidManifest.xml": manifest_xml(z.read("AndroidManifest.xml"), names),
             "resources.txt": resources_txt(arsc, names),
             "res-files.txt": "".join(f"{n}  {z.getinfo(n).file_size} bytes\n" for n in z.namelist() if n.startswith("res/"))}
    if "--check" in sys.argv:
        stale = [f for f, t in files.items()
                 if not os.path.isfile(os.path.join(OUT, f)) or open(os.path.join(OUT, f), encoding="utf8").read() != t]
        if stale:
            sys.exit(f"android/base/decoded/ is out of date: {stale}; run python3 tools/decode_base.py")
        print("android/base/decoded/ matches the base APK")
        return
    os.makedirs(OUT, exist_ok=True)
    for f, t in files.items():
        with open(os.path.join(OUT, f), "w", encoding="utf8") as fh:
            fh.write(t)
        print("wrote", os.path.join("android/base/decoded", f))


if __name__ == "__main__":
    main()
