# Building Quiet Bible

Everything here was last built and tested for **v1.4.2** (version code 142, target SDK 36).

## What's where

| Path | What it is |
|---|---|
| `web/` | The reader itself, as shipped in `assets/www/`: `index.html`, `app.css`, `app.js`, the icon, the built-in King James Version (`bible/`), the built-in Berean Standard Bible (`bible/bsb/`), the study data (`bible/study/`), the research documents (`bible/docs/`), and the cross-reference map (`xrefs/`, with its data in `bible/xrefs/`). |
| `study/` | The study tools: the data builder, the page code and its sources (see "Study tools"). |
| `xrefs/` | The cross-reference map (Bible Cross-References by Oleksii Trekhleb, MIT): Quiet Bible's patch, the frame page and the build script. See `xrefs/README.md`. |
| `translations/bsb/` | Headings, notes and flags of the built-in BSB; `translations/tools/build_bsb.py` puts them on the words of `bsb.txt`. |
| `android/base/QuietBible-v0.6.0.apk` | The original APK. Its manifest, resources and icon are reused; everything else is replaced or added. `android/base/decoded/` has them in readable form (see `android/base/README.md`). |
| `android/smali/` | Source of `classes.dex`: `MainActivity` (the WebView and its JavaScript bridges), `QbStorage`, `ThemeArt`. Edited as smali. |
| `android/java/voice/` | Source of most of `classes2.dex`: natural voices (`VoiceBridge`, `VoiceCore`, `PiperSynth`, `ModelPack`, `AudioTrackSink`), added translations (`BibleBridge`) and the sherpa-onnx Java API. |
| `android/java/native/` | More of `classes2.dex`: background playback (`PlaybackService`, `FocusPolicy`, `SilentTrack`, `AudioHooks`). |
| `android/java/ui/` | The rest of `classes2.dex`: `EdgeToEdge` (system bars, keyboard, back gesture on Android 15/16). Not covered by the JVM tests. |
| `android/stubs/` | Compile-only stand-ins for classes that live in `classes.dex`. |
| `android/extra/` | Added to the APK as is: the speech engine (`lib/`), the built-in voice John (`assets/tts/`) and the licence texts (`assets/licenses/`). |
| `android/tests/` | JVM tests for the Java side, with fake Android classes. |
| `e2e/` | Browser tests of the page (Playwright + Chromium). |
| `tools/` | `build.py`, `verify.py`, `test.sh`, `sign.py`, `manifest.py`, `decode_base.py`, and dex2jar 2.4 (with dx 30.0.2). |
| `translations/tools/` | Builders for the `.qbbible` packs. |
| `voices/tools/` | Builders for the `.qbvoice` packs and the voice checks. |
| `voices/pronunciation/` | Quiet Bible's additions to eSpeak NG's English dictionary for Kristin (see "English pronunciation fixes"). |
| `third_party/` | Exact source of sherpa-onnx v1.13.8, the eSpeak NG commit it compiles in (GPL-3.0) and piper-phonemize. |
| `original-source/v0.5/` | The v0.5 React/TypeScript source the app started from (see "Editing the page" and its README). |

The finished downloads (APK, translation packs, voice packs, voice samples) are published as
GitHub releases.

## Build

Needs Python 3 with `cryptography`, a JDK (17 or newer) and `android.jar` for API 34
(`platforms/android-34/android.jar` from any Android SDK install).

```sh
python3 tools/build.py --android-jar /path/to/android-34/android.jar --new-key my-signing-key.p12
# -> out/QuietBible-v1.4.2.apk, signed with a new key of your own (the first time)
python3 tools/build.py --android-jar /path/to/android-34/android.jar --key my-signing-key.p12 --key-password quiet-bible
# -> later builds: the same key, so each one installs over the last
```

Official releases are signed with the maintainer's key, which is not in the public source (see
"Signing"). An APK signed with any other key can't install over the official app.

`build.py` assembles `classes.dex` from `android/smali`, compiles `android/java` to
`classes2.dex` with dx (Java 8 bytecode, no lambdas: dx 30 cannot dex `invokedynamic`),
writes the version into the manifest, repacks the base APK with `web/` and
`android/extra/`, and signs it (APK Signature Scheme v2).

Rebuilding from this tree gave a `classes2.dex` byte-identical to v0.9.7's. `classes.dex`
differs only in instruction encoding, because d2j-smali is not the assembler v0.9.7 used. d2j-smali
mis-assembles `const/high16`, so write float constants as plain `const` in smali.

## Release checklist

1. Raise `VERSION_CODE` and `VERSION_NAME` in `tools/build.py`, and `QB_VERSION` in
   `web/app.js` to the same name. The build refuses to run if the two names differ.
2. `python3 tools/build.py`
3. `python3 tools/verify.py out/QuietBible-vX.apk <previous release APK>`. This checks the signature,
   that the certificate matches the previous release so the update installs over it,
   that the version code went up, alignment, and what changed.
4. `sh tools/test.sh out/QuietBible-vX.apk` runs the JVM tests. The script names the inputs
   it needs; the large ones (sherpa-onnx's Linux JNI build, John as plain ONNX) come from
   the sherpa-onnx v1.13.8 release and Hugging Face.
5. Page tests: serve `web/` (`python3 -m http.server 8770` inside it), then run
   `node e2e/run21.js 8770 <outdir>` (study tools), `node e2e/run22.js 8770 <outdir>` (study tools
   in other translations), `node e2e/run23.js 8770 <outdir>` (Library > Research), `node e2e/run24.js 8770 <outdir>`
   (the built-in BSB and the cross-reference map), `node e2e/run19.js 8770 <outdir> <translation-meta.json>` and the older `run*.js`.
   For a before/after check run `e2e/snap.js` on both builds and compare the shots with
   `e2e/cmpshots.py`. Some of these scripts point at a scratch folder for unpacked
   translation packs; change `S` at the top.
6. Publish the APK, with the translation and voice packs, as a GitHub release.

## Editing the page

`web/app.js` is the compiled bundle of the React/TypeScript app in `original-source/v0.5/`. Since v0.6 every change has been made directly in `app.js`, so the TypeScript
source is behind. The additions are plain functions named `qb…`/`Qb…` (search for them):

- `qbTr`, `qbTrInfo`, `qbTrList`, `qbSwitch`, `qbPath`: translations
- `qbDir`: right-to-left layout
- `qbFold`, `qbAr`, `qbArFold`, `qbDigits`, `qbBookKey`, `qbMetaBook`: search and references
- `QbTranslations`, `QbVoice`, `QbCredits`: Settings
- `QbStudy` and the rest between `/*QB-STUDY-BEGIN*/` and `/*QB-STUDY-END*/`: the study tools,
  the Research tab and the cross-reference map's host (`QbMapHost`, `QbMapButton`, `qbOpenMap`).
  Edit `study/study-ui.js` and run `python3 study/tools/insert_ui.py`; don't edit that part of
  `app.js` by hand.
- `QB_VERSION`, `QB_PARTS`: the About section

The app's styles are precompiled (`app.css`), so only Tailwind classes that already
appear in the bundle work. Use inline `style` for anything new.

## The built-in BSB

`python3 translations/tools/build_bsb.py --txt bsb.txt` writes `web/bible/bsb/`. The words come
from the Berean Bible's `bsb.txt` (checked against its SHA-256; the same pinned file is
`data/raw/bsb.txt` in the cross-reference map's project). Headings, parallel passages,
translator notes, psalm titles, poetry indents and the words of Jesus come from
`translations/bsb/structure.json`, kept from the BSB the app was first built with, whose own
text lost the end of 540 verses. `BibleBridge` lists the BSB after the KJV and serves
`translations/BSB/...` from `assets/www/bible/bsb/`; it can't be removed, and a `.qbbible` with
the id BSB is refused as already built in.

## The cross-reference map

`python3 xrefs/build.py ...` (see `xrefs/README.md` for the inputs) writes `web/xrefs/` and
`web/bible/xrefs/`. The app opens `xrefs/index.html?ref=John.3.16&t=kjv#qbtheme=...` in a
full-screen frame; the page reads its data through `QuietBibleAssets.read("bible/xrefs/...")`
and tells the app `qb-map-close` or `qb-map-read` by `postMessage`.

## Packs

**Translations** (`.qbbible`): a zip of `translation.properties` (id, name, abbr, language,
license, source, note), `meta.json` and `books/XXX.json`. The verse format is
`[{n, v:[{n,t,p?,d?,j?}]}]`. Builders are in `translations/tools/` and share `write_pack()`
in `common.py`. Their source texts are cloned separately (paths at the top of each
builder):

- github.com/seven1m/open-bibles
- github.com/BibleCorps/FRA-B-LSG1910-PD-UBS
- github.com/STEPBible/STEPBible-Data (Arabic)
- github.com/scrollmapper/bible_databases (Portuguese, Russian)
- the BibleNLP eBible corpus, for the Vietnamese capitals repair

**Voices** (`.qbvoice`) come in two formats.

- **Format 1, one Piper voice:** a zip of `voice.properties` (format, id, name, note, gain,
  language, speaker, source, license, rules), `tokens.txt` and `voice.qb8`. Some voices also
  carry `espeak/xx_dict`, and dictionary voices carry `lexicon.txt` plus rule `*.fst` files.
- **Format 2, a many-language pack (Supertonic 3):** split into parts so each file stays
  under GitHub's 100 MB limit. Each part holds `voice.properties` and some of the model files,
  with big files cut into numbered pieces (`name.part01`, `name.part02`). The properties are:
  - format=2, engine=supertonic, id, name, build, part, parts, files, steps, license, source;
  - `size.<file>` and `sha256.<file>` for every model file;
  - `voices=lang|style|name|note|gain;...`, where style is the index in voice.bin
    (F1–F5 are 0–4, M1–M5 are 5–9).

  The app keeps parts in `voices/.parts-<id>` until all have arrived. It then joins the
  pieces and checks every size and checksum. Pack voices get ids like
  `supertonic3-es-2`, and removing one removes the pack.
  `voices/tools/makepack.py` builds the parts from sherpa-onnx's
  `sherpa-onnx-supertonic-3-tts-int8-2026-05-11` download, from the
  k2-fsa/sherpa-onnx `tts-models` release.

- `voices/tools/makevoice2.py` builds a pack from a sherpa-onnx Piper download.
- `pack.py` is the 8-bit QBQ8 packer. The phone rebuilds the float model once, in `ModelPack.java`.
- `relicense.py` rewrites a pack's credit lines.

Voices are levelled to about −19.5 dBFS. Clarity is checked by running speech recognition
on synthetic speech: `asr_score.py` (Whisper, any language), `wer_*.py` and `cer.py`.
`SupTry.java` synthesizes test verses with a Supertonic or Kokoro model through the app's
own JNI classes and prints the real-time factor. `pitch.py` estimates each voice's pitch.

Measured on this build machine (2 cores):

| Voice engine | Speed (CPU time ÷ audio time) | Notes |
|---|---|---|
| Piper (old voices) | 0.075 | |
| Supertonic 3, 5 steps | 0.21 | Shipped for es, fr, pt, ru, vi, ar |
| Kokoro v1.1 int8 | 1.6 | Too slow for phones; Chinese stays on the phone's voice |

AISHELL-3 VITS (Apache 2.0) was too unclear: 31–51% character errors, against 9–12% for the old Chinese voices.

Check each voice's Piper model card before shipping it. Many Piper voices are fine-tuned
from "lessac", whose recordings are licensed for research use only.

## English pronunciation fixes

The Piper voices read English through eSpeak NG, which turns text into phonemes. John,
Kristin and Norman use eSpeak's British "en" rules (the `voice` entry in each model's
metadata), so eSpeak gives them a plain t in "water". Kristin still says "wadder": she learned
from an American speaker that a t before an unstressed vowel is flapped.

`voices/pronunciation/en_listx-clear-t` gives "water", "waters", "watered" and "wateredst"
secondary stress on the syllable after the t, and she then says a real t (on recordings, the
closure grew from about 10 ms to about 70 ms). The APK carries that build of the dictionary
as `assets/tts/en_dict-clear-t`. Voices in `VoiceBridge.CLEAR_T_VOICES` (only Kristin) get
their own copy of the eSpeak data with it, in `files/espeak-ng-data-clear-t`, and every other
voice keeps the stock dictionary. It was not applied more widely because:

- John already says a clear t, and the change made him drop it now and then ("wars");
- Norman was heard less clearly with it than without;
- in compounds and -eth/-est/-ing forms the stress split the word ("war to flood").

To change the list, rebuild with the eSpeak NG commit in `third_party/` (the one sherpa-onnx
1.13.8 compiles in):

```sh
tar xf third_party/espeak-ng-<commit>.tar.xz -C /tmp
(cd /tmp/espeak-ng-<commit> && cmake -B build && cmake --build build)
sh voices/pronunciation/build_clear_t.sh /tmp/espeak-ng-<commit>
```

The script first checks that it rebuilds the shipped `en_dict` byte for byte, then writes
`en_dict-clear-t` and prints a few words in IPA. Raise `ESPEAK_CLEAR_T_VERSION` in
`VoiceBridge.java` afterwards, or phones keep the copy they already made.

To check a voice, synthesize the same phrase several times, because the voices are not
deterministic: `voices/tools/PiperMany.java` does that with any espeak data folder, and
`voices/tools/tgap.py` measures the gap at the t in the last word (a flap is about 10 ms, a
clear t 40 ms or more). Speech recognition is a poor judge here: it was trained on American
speech, so it writes "water" for "wadder" as well. Use it only to check the word still comes
across.

## Study tools

Tapping a verse opens a sheet with a **Study** section: Hebrew or Greek words, cross-references,
commentary and a Bible dictionary. It works offline from `web/bible/study/` (about 30 MB in the
APK), which `study/tools/build_study.py` builds from the sources listed in `study/SOURCES.md`.
The page reads the files through `QuietBibleAssets.read("bible/study/...")`, keeping the last
14 in memory, and only opens a file when its tab is opened.

- **Words.** The KJV verse as phrases, each with its Strong's number and the Hebrew or Greek
  word. Tapping one shows the word as it stands in the verse (with its parsing spelled out),
  the dictionary form, Strong's definition, STEPBible's meaning, how the KJV translates it and
  every verse it occurs in. In other translations the words still come from the KJV.
- **Cross-references.** OpenBible.info's list, most useful first, with each verse's text in the
  translation being read.
- **Commentary.** Matthew Henry (no Song of Solomon in this edition) and Jamieson, Fausset &
  Brown. The last one chosen is remembered.
- **Dictionary.** Easton's, Smith's and Hitchcock's entries for words in the verse, and a
  look-up box.

Translations that number verses differently from the KJV (the Russian Synodal Psalms) get the
KJV's study data for the same verse number.

## Other research documents

Library > Research lists documents the Ben Born Again channel talks about, grouped as the
Septuagint and Masoretic text, early Bibles, early church writings, historians, and texts the
channel warns about. Each has a description, the channel's view and, for the warned-about ones,
a warning, from `study/docs/catalog.json`; edit that file to change them. The texts
(`web/bible/docs/`, about 11 MB in the APK) are built by `study/tools/build_docs.py` from the
sources in `study/SOURCES.md`. The reader (`QbResearch` in `study/study-ui.js`) remembers the
last place read in each document.

## Signing

Android installs an update only if it is signed with the same key as the app already on the
phone. Official Quiet Bible releases are signed with the maintainer's key (RSA-2048,
CN=Quiet Bible Development, valid until 2054), which is kept out of the public source.

`tools/build.py` signs with, in order: `--new-key PATH` (makes a new key, then signs with it),
`--key PATH` with `--key-password` (or `QB_KEY_PASSWORD`), or the key that
`signing/key.properties` names (present only in the maintainer's private copy). Keep your own
key safe: if it is lost, phones have to uninstall the app (losing its notes) to get a newer
build.

## Licences

Quiet Bible's own code is offered under the GNU GPL v3 or later (`LICENSE`), because the
speech engine compiles in eSpeak NG (GPL-3.0). Whoever passes the app on must offer this source
with it, including `third_party/`. In-app credits are in Settings > About > Credits and
licences; `android/extra/assets/licenses/` holds the notices.

The Bible texts, study data and research documents are not code and keep their own terms
(public domain, CC BY, CC BY-SA, GPL for the KJV word data), listed in those notices and in
`study/SOURCES.md`.

**Non-commercial exception.** Three research books, Books 1 and 4 of Rodkinson's Talmud
(`web/bible/docs/talmud/0.json`, `3.json`) and de Manhar's Zohar (`web/bible/docs/zohar/`), come
from sacred-texts.com scans whose notice allows non-commercial use only, with the notice kept.
They are not covered by the GPL. Quiet Bible is free, so it complies; anyone who sells a copy
must first remove them (and their entries in `web/bible/docs/index.json`). The app says so on
their pages and in its credits. The Supertonic voices (a separate download) are under the OpenRAIL-M
licence, which allows sharing and commercial use but forbids the harmful uses it lists.

## Android 16 (target SDK 36)

- **Edge to edge.** Android 15 and later draw every app edge to edge. `EdgeToEdge.java` (in
  classes2) wraps the WebView in a frame padded by the system bars, display cutout and
  keyboard. The frame takes the page's surface colour, which the page reports through
  `QuietBibleTransport.theme`. Status-bar icons switch between light and dark to match.
  `MainActivity.onCreate` (smali) calls `EdgeToEdge.wrap`, and `TransportBridge.theme` calls
  `EdgeToEdge.themeChanged`.
- **Back gesture.** Apps targeting 36 no longer get `onBackPressed()` on Android 16, so
  `EdgeToEdge` registers an `OnBackInvokedCallback` (API 33+) that does the same thing:
  go back in the page if it can, otherwise close the reader.
- **Testing.** This build machine has no emulator, so these were checked on the owner's
  phone (v1.1.0), not here.

## App Bundle (for Google Play)

Not built yet. bundletool can be downloaded from GitHub, but turning the APK's resources
into the bundle format needs Google's `aapt2`, which comes from dl.google.com or
maven.google.com. Neither was reachable from the machine these builds were made on.

## Known limits

- Natural voices need a 64-bit phone (arm64-v8a). 32-bit phones read with the phone's own voice.
- Tested on one real phone so far, not on a range of them.
