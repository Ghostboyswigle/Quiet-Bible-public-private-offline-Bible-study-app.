# Quiet Bible

A private, offline Bible reader for Android that can read the Bible aloud like an audiobook.

Quiet Bible has no account, no ads and no tracking. It doesn't even ask for internet access:
the Bible, your notes and the voices all stay on your phone.

## What it does

- **Read** the King James Version (the main text) or the Berean Standard Bible, both built in.
  Add more translations from files: Spanish, Chinese (Traditional and Simplified), Tagalog,
  Vietnamese, French, Arabic, Portuguese and Russian.
- **Listen.** A natural English voice (John) is built in; more voices can be added from files,
  including Spanish, French, Portuguese, Russian, Vietnamese and Arabic. Reading carries on in
  the background with the screen off.
- **Study.** Tap a verse for the Hebrew or Greek words behind it (with Strong's numbers),
  cross-references, two commentaries (Matthew Henry; Jamieson, Fausset & Brown) and three Bible
  dictionaries.
- **See the connections.** The cross-reference map draws all 344,799 cross-references as arcs
  across the whole Bible, or as threads from a chapter (Bible Cross-References by Oleksii
  Trekhleb, built in).
- **Keep** notes, highlights, bookmarks and reading plans, and choose a theme.
- **Research.** Library > Research holds older texts some readers ask about: the Septuagint,
  the Masoretic text, early English Bibles, early church writings, Josephus and others, each
  with a description.

## Download and install

1. Open [`Downloads/QuietBible-v1.4.2.apk`](Downloads/QuietBible-v1.4.2.apk) on your phone and tap
   the download button (Android 8 or later). Open the file to install it.
2. Optional: translation and voice packs are in [`Downloads/`](Downloads). Add them in
   Settings > Translation and Settings > Voice. The Supertonic voices come in two parts; add both.

[`Downloads/READ ME.txt`](Downloads/READ%20ME.txt) lists every pack, and
[`Downloads/Voice samples/`](Downloads/Voice%20samples) has a short recording of each voice.

## Build it yourself

See [`BUILDING.md`](BUILDING.md). You will sign your build with a key of your own, so it
installs as a separate copy, not as an update to the official app.

## Licence

Quiet Bible is free software under the GNU General Public License, version 3 or later
([`LICENSE`](LICENSE)): you may use, change and share it, as long as you pass on the same
freedoms and the source. Its speech engine includes eSpeak NG (GPL-3.0),
sherpa-onnx (Apache 2.0) and ONNX Runtime (MIT).

The Bible texts are public domain or openly licensed, and the study data comes from
OpenBible.info, STEPBible (Tyndale House), Open Scriptures, xmlBible.org and others, under
CC BY, CC BY-SA, GPL or public domain terms. Every source, with its licence, is listed in the
app under Settings > About > Credits and licences, and in
[`android/extra/assets/licenses/`](android/extra/assets/licenses) and
[`study/SOURCES.md`](study/SOURCES.md). The Supertonic voices are under the OpenRAIL-M licence,
which allows sharing but forbids the harmful uses it lists.

**Non-commercial exception.** Three books in Library > Research (Books 1 and 4 of Rodkinson's
Talmud, and de Manhar's Zohar) come from scans whose notice allows non-commercial use only.
They are not covered by the GPL, and the app marks them. Quiet Bible is given away free; if you
ever sell a copy, remove those three first (see "Licences" in [`BUILDING.md`](BUILDING.md)).

The name "Quiet Bible" and the official signing key belong to the project's maintainer. If you
publish a changed version, please give it another name.
