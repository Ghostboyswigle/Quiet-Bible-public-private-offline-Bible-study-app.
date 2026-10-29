#!/bin/sh
# Build the "clear t" English dictionary: eSpeak NG's en_dict plus en_listx-clear-t.
#
# usage: sh voices/pronunciation/build_clear_t.sh <espeak-ng source dir, already built>
#
# Use the eSpeak NG commit in third_party/ (the one sherpa-onnx 1.13.8 compiles in):
#   tar xf third_party/espeak-ng-<commit>.tar.xz -C /tmp
#   cd /tmp/espeak-ng-<commit> && cmake -B build && cmake --build build
# Writes android/extra/assets/tts/en_dict-clear-t. After changing it, raise
# ESPEAK_CLEAR_T_VERSION in VoiceBridge.java so phones copy it again.
set -e
SRC=$(cd "$1" && pwd)
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../.." && pwd)
BIN="$SRC/build/src/espeak-ng-bin"
[ -x "$BIN" ] || { echo "no $BIN: build eSpeak NG first" >&2; exit 1; }
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
cp -r "$SRC/build/espeak-ng-data" "$WORK/espeak-ng-data"
mkdir "$WORK/dict"
cp "$SRC/dictsource/en_rules" "$SRC/dictsource/en_list" "$SRC/dictsource/en_emoji" "$WORK/dict/"
# Without additions this rebuilds the shipped en_dict exactly: check that first.
(cd "$WORK/dict" && ESPEAK_DATA_PATH="$WORK" "$BIN" --compile=en >/dev/null 2>&1)
cmp -s "$WORK/espeak-ng-data/en_dict" "$ROOT/android/extra/assets/tts/espeak-ng-data/en_dict" \
  || { echo "this eSpeak NG does not rebuild the shipped en_dict: wrong commit?" >&2; exit 1; }
cp "$HERE/en_listx-clear-t" "$WORK/dict/en_listx"
(cd "$WORK/dict" && ESPEAK_DATA_PATH="$WORK" "$BIN" --compile=en >/dev/null 2>&1)
cp "$WORK/espeak-ng-data/en_dict" "$ROOT/android/extra/assets/tts/en_dict-clear-t"
# The voices read English with espeak's "en" voice (see the model's metadata).
for w in water waters watered city better; do
  printf '%-8s %s\n' "$w" "$(ESPEAK_DATA_PATH="$WORK" "$BIN" -q --ipa -v en "$w")"
done
echo "wrote android/extra/assets/tts/en_dict-clear-t"
