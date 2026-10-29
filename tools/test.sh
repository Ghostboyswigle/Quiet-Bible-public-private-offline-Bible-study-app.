#!/bin/sh
# Runs the JVM tests for the Java side of Quiet Bible against a built APK.
#   sh tools/test.sh out/QuietBible-v1.0.0.apk
# The tests use the real speech engine (sherpa-onnx's Linux build) and the real packs.
# Paths to inputs that are too big for this repository can be overridden:
#   QB_LINUX_JNI   sherpa-onnx v1.13.8 linux-x64 JNI "lib" folder (from the k2-fsa/sherpa-onnx v1.13.8 release)
#   QB_PACKS       folder holding translations/*.qbbible and voices/*.qbvoice, including the personal-use
#                  Piper voices VoicesTest reads and the two Supertonic parts PackTest reads
#   QB_JOHN_ONNX   the built-in voice as plain ONNX (voices/tools/pack.py rebuilds it from assets/tts/voice.qb8)
#   QB_ESPEAK      an espeak-ng-data folder (any Piper voice download from sherpa-onnx has one)
set -e
export JAVA_TOOL_OPTIONS=
ROOT=$(cd "$(dirname "$0")/.." && pwd)
APK=$(cd "$(dirname "$1")" && pwd)/$(basename "$1")
JNI=${QB_LINUX_JNI:-/home/claude/k2-fsa/linuxjni/sherpa-onnx-v1.13.8-linux-x64-jni/lib}
PACKS=${QB_PACKS:-/home/claude/final}
JOHN=${QB_JOHN_ONNX:-/home/claude/voice/pack/john-g64.onnx}
ESPEAK=${QB_ESPEAK:-/home/claude/k2-fsa/voices/vits-piper-en_US-john-medium/espeak-ng-data}
W=$(mktemp -d); trap 'rm -rf "$W"' EXIT
# show only each test's failures and its result line; the engine's own log goes to $W/*.log
r() { name=$1; shift; "$@" > "$W/$name.out" 2> "$W/$name.log" || true; grep -E "\[FAIL\]|RESULT|passed" "$W/$name.out" | sed "s/^/$name: /"; }
T=$ROOT/android/tests

echo "== playback service"
javac -nowarn -encoding UTF-8 -d "$W/n" $(find "$T/native/fake" "$ROOT/android/java/native" "$ROOT/android/stubs/native" "$T/native/test" -name '*.java')
r FocusPolicyTest java -cp "$W/n" org.quietbible.app.FocusPolicyTest
r ServiceTest java -cp "$W/n" org.quietbible.app.ServiceTest

echo "== voices and translations"
javac -nowarn -encoding UTF-8 -d "$W/v" $(find "$T/voice/fake" "$T/voice/testfake" "$ROOT/android/java/voice" "$T/voice/test" -name '*.java') "$ROOT/android/java/native/org/quietbible/app/AudioHooks.java"
J="java -Djava.library.path=$JNI -cp $W/v"
r SinkTest $J org.quietbible.app.SinkTest
mkdir -p "$W/core" && cp "$JOHN" "$W/core/john.onnx" && unzip -p "$APK" assets/tts/tokens.txt > "$W/core/tokens.txt"
r VoiceCoreTest $J org.quietbible.app.VoiceCoreTest "$W/core" "$JNI" "$ESPEAK" john.onnx "$T/fixtures/psalm23.tsv"
r BridgeTest $J org.quietbible.app.BridgeTest "$APK" "$W/f1" "$JOHN"
r VoicesTest $J org.quietbible.app.VoicesTest "$APK" "$W/f2" "$PACKS/voices"
r PackTest $J org.quietbible.app.PackTest "$APK" "$W/f4" "$PACKS/voices"
TR=$PACKS/translations
r BibleTest $J org.quietbible.app.BibleTest "$APK" "$W/f3" "$TR/QuietBible-KJV.qbbible" "$TR/QuietBible-RV1909.qbbible" \
   "$TR/QuietBible-CUV.qbbible" "$TR/QuietBible-CUVS.qbbible" "$TR/QuietBible-ADB.qbbible" \
   "$TR/QuietBible-VIE1934.qbbible" "$TR/QuietBible-LSG.qbbible" "$TR/QuietBible-SVD.qbbible" \
   "$TR/QuietBible-BLIVRE.qbbible" "$TR/QuietBible-RST.qbbible"
