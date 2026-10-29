#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SDK_ROOT="${ANDROID_SDK_ROOT:-/tmp/android-sdk}"
JDK_ROOT="${JAVA_HOME:-/usr/lib/jvm/java-17-openjdk-amd64}"
BUILD_TOOLS="$SDK_ROOT/build-tools/34.0.0"
ANDROID_JAR="$SDK_ROOT/platforms/android-34/android.jar"
APP="$ROOT/apk-android"
OUT="$APP/build"
WWW="$APP/app/src/main/assets/www"
SIGNING_KEY="$APP/signing/quiet-bible-development.keystore"
VERSION_CODE="24"
VERSION_NAME="0.5.3"

if [ ! -x "$BUILD_TOOLS/aapt2" ]; then
  echo "Android build-tools not found at $BUILD_TOOLS" >&2
  exit 1
fi
if [ ! -f "$ANDROID_JAR" ]; then
  echo "android.jar not found at $ANDROID_JAR" >&2
  exit 1
fi

cd "$ROOT"
export PATH="$ROOT/node_modules/.bin:$PATH"
npx vite build --config vite.apk.config.ts

mkdir -p "$WWW"
cp "$ROOT/apk-web/index.html" "$WWW/index.html"
cp "$ROOT/public/quiet-bible-icon.png" "$WWW/quiet-bible-icon.png"
rm -rf "$WWW/bible"
mkdir -p "$WWW/bible/books"
cp "$ROOT/public/bible/meta.json" "$WWW/bible/meta.json"
cp "$ROOT/public/bible/books/"*.json "$WWW/bible/books/"
# never pack installers or the web public tree into the APK
find "$WWW" -maxdepth 1 -type f \( -name '*.apk' -o -name '*.zip' \) -delete

if [ ! -f "$WWW/app.js" ]; then
  echo "apk web bundle missing app.js" >&2
  ls -la "$WWW" >&2
  exit 1
fi
# lib mode may emit app.css under a hashed name — normalize
if [ ! -f "$WWW/app.css" ]; then
  css="$(find "$WWW" -maxdepth 1 -name '*.css' | head -1 || true)"
  if [ -n "${css:-}" ]; then
    mv "$css" "$WWW/app.css"
  else
    echo "apk web bundle missing css" >&2
    ls -la "$WWW" >&2
    exit 1
  fi
fi

rm -rf "$OUT/classes" "$OUT/dex" "$OUT/res"
rm -f "$OUT/res.zip" "$OUT/resources.apk" "$OUT/unsigned.apk" "$OUT/aligned.apk"
mkdir -p "$OUT/classes" "$OUT/dex"

"$BUILD_TOOLS/aapt2" compile --dir "$APP/app/src/main/res" -o "$OUT/res.zip"
"$BUILD_TOOLS/aapt2" link \
  -o "$OUT/resources.apk" \
  -I "$ANDROID_JAR" \
  --manifest "$APP/app/src/main/AndroidManifest.xml" \
  --min-sdk-version 26 \
  --target-sdk-version 34 \
  --version-code "$VERSION_CODE" \
  --version-name "$VERSION_NAME" \
  "$OUT/res.zip"

JAVAC="$JDK_ROOT/bin/javac"
"$JAVAC" -source 8 -target 8 -encoding UTF-8 -bootclasspath "$ANDROID_JAR" \
  -classpath "$ANDROID_JAR" \
  -d "$OUT/classes" \
  "$APP/app/src/main/java/org/quietbible/app/MainActivity.java"

"$BUILD_TOOLS/d8" --lib "$ANDROID_JAR" --min-api 26 --output "$OUT/dex" \
  $(find "$OUT/classes" -name '*.class')

cp "$OUT/resources.apk" "$OUT/unsigned.apk"
python3 - <<PY
import zipfile
from pathlib import Path

apk_path = Path("$OUT/unsigned.apk")
assets_root = Path("$APP/app/src/main/assets")
dex = Path("$OUT/dex/classes.dex")
with zipfile.ZipFile(apk_path, "a", compression=zipfile.ZIP_DEFLATED) as z:
    existing = set(z.namelist())
    for path in assets_root.rglob("*"):
        if not path.is_file():
            continue
        name = str(Path("assets") / path.relative_to(assets_root))
        if name in existing:
            continue
        z.write(path, name)
    if "classes.dex" not in existing:
        z.write(dex, "classes.dex")
PY

"$BUILD_TOOLS/zipalign" -f 4 "$OUT/unsigned.apk" "$OUT/aligned.apk"

if [ ! -f "$SIGNING_KEY" ]; then
  "$JDK_ROOT/bin/keytool" -genkeypair \
    -keystore "$SIGNING_KEY" \
    -storepass android -keypass android \
    -alias androiddebugkey \
    -dname "CN=Quiet Bible Development,O=Quiet Bible,C=US" \
    -keyalg RSA -keysize 2048 -validity 10000
fi

"$BUILD_TOOLS/apksigner" sign \
  --ks "$SIGNING_KEY" \
  --ks-pass pass:android \
  --key-pass pass:android \
  --out "$OUT/QuietBible-v${VERSION_NAME}.apk" \
  "$OUT/aligned.apk"

"$BUILD_TOOLS/apksigner" verify --verbose "$OUT/QuietBible-v${VERSION_NAME}.apk"
cp "$OUT/QuietBible-v${VERSION_NAME}.apk" "$ROOT/artifacts/QuietBible-v${VERSION_NAME}.apk"
ls -lh "$ROOT/artifacts/QuietBible-v${VERSION_NAME}.apk"
