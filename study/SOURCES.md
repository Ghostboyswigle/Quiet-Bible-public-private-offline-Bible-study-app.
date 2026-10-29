# Study tools: sources

`study/tools/build_study.py --src <folder>` builds `web/bible/study/` from the folder laid out
below. Everything else in `study/` is the page code (`study-ui.js`) and the script that puts it
into `web/app.js` (`tools/insert_ui.py`). The notices shown in the app are in
`android/extra/assets/licenses/study-tools-notices.txt`.

| Folder in `<src>` | Where it comes from | Commit used | Licence |
|---|---|---|---|
| `xmlBible.org/` | `git clone https://github.com/DannyCarlton/xmlBible.org` | 71c681e | GPL-3.0 (built from CrossWire's KJV with Strong's, STEPBible TAHOT/TAGNT under CC BY 4.0, and the Cambridge Paragraph Bible) |
| `strongs/` | `git clone https://github.com/openscriptures/strongs` (the XML files are used) | 0acd2f2 | Public domain |
| `stepbible-lexicons/tbesh-hebrew.txt`, `tbesg-greek.txt` | `Lexicons/TBESH …` and `Lexicons/TBESG …` from `https://github.com/STEPBible/STEPBible-Data` | 0f60797 (the builder checks the SHA-256 of both files) | CC BY 4.0 |
| `cross_references.txt` | OpenBible.info cross references, 2025-10-13 edition (a copy is in `https://github.com/TJ-Frederick/TheologAI`, `data/cross-references/`) | — | CC BY |
| `commentaries/matthew-henry/`, `commentaries/jamieson-fausset-brown/` | `data/commentaries/` in `https://github.com/eve-coda/open-christian-data` | 3733dcc | Public domain texts; the data files say CC0 1.0 (the builder refuses any other) |
| `dictionary/` | `data/02_sources/` in `https://github.com/neuu-org/bible-dictionary-dataset` (Easton, Smith and Hitchcock are used) | b8e82aa | Public domain texts; dataset CC BY 4.0 |

The open-christian-data repository is large. To fetch only the two commentaries:

```sh
git clone --depth 1 --filter=blob:none --no-checkout https://github.com/eve-coda/open-christian-data
cd open-christian-data
git sparse-checkout set --no-cone /data/commentaries/matthew-henry/ /data/commentaries/jamieson-fausset-brown/
git checkout
```

## What the builder does with them

- **Words.** Every KJV verse becomes a list of phrases: the English words, their Strong's
  numbers (the content word first, so "God" in John 3:16 is G2316, not the article G3588), a
  flag for italics and for LORD, and the Hebrew or Greek words with transliteration, gloss and
  parsing code. Words the KJV leaves untranslated (such as the object marker) are counted but not
  listed.
- **Lexicon.** Strong's entry (lemma, transliteration, pronunciation, derivation, definition,
  KJV renderings), STEPBible's brief meanings for each extended number (H4325G water, H4325H
  the Water Gate), how the KJV renders the word (counted from the phrases, with words such as
  "and the" that Hebrew folds into the word left off), how often the Hebrew or Greek word
  occurs, and every verse it occurs in.
- **Cross-references.** References with one vote or more, most votes first.
- **Commentaries.** Grouped by chapter. Jamieson, Fausset & Brown keep their note on a
  chapter's first verse as the chapter introduction; the builder attaches it to verse 1.
  Matthew Henry's introductions to chapters stay introductions.
- **Dictionaries.** Easton, Smith and Hitchcock merged by headword, with their Bible
  references. Very common words (and, God, Lord, …) are kept but not matched against verses.

Sizes (v1.2.0): about 30 MB inside the APK, most of it Matthew Henry (11 MB) and the word data
(8 MB).

# Other research documents: sources

`study/tools/build_docs.py --src <folder>` builds `web/bible/docs/` from `study/docs/catalog.json`
(titles, descriptions, what the Ben Born Again channel says, warnings and credits) and the
folders below. The app shows them under Library > Research.

| Folder in `<src>` | Where it comes from | Used for |
|---|---|---|
| `lxx2012/` | `tests/versifications/eng-lxx2012/` in `https://github.com/BibleNLP/ebible` (eBible.org USFM) | The Septuagint in English (Brenton, LXX2012 edition) |
| `wlc/` | `wlc/` in `https://github.com/openscriptures/morphhb` | The Masoretic text (Hebrew text only) |
| `scrollmapper/` | `formats/json/` in `https://github.com/scrollmapper/bible_databases` (Geneva1599, TR, Wycliffe) | The Geneva Bible, the Textus Receptus, the Wycliffe Bible |
| `kjva/` | `data/bible-text/kjva/` in `https://github.com/eve-coda/open-christian-data` (the 14 apocryphal books) | The Apocrypha of the 1611 KJV |
| `hcf/` | `https://github.com/HistoricalChristianFaith/Writings-Database` | Early church writings (Ante-Nicene Fathers translations) |
| `sacred/` | `sacred_obsidian_vault/` in `https://github.com/Neckr0ik/Sacred-Texts.com` (a March 2023 mirror of sacred-texts.com): `jud/t01`–`t10`, `jud/zdm`, `jud/yetzirah.md`, `jud/josephus`, `grim/lks`, `cla/tac/a15040.md` | The Talmud (Rodkinson), the Zohar (de Manhar), the Sefer Yetzirah (Westcott), Josephus (Whiston), the Lesser Key of Solomon (Mathers and Crowley), Tacitus |

These repositories are large; clone them with `--depth 1 --filter=blob:none --no-checkout` and
`git sparse-checkout set` the paths above.

The archive's notice on `jud/t01` and `jud/t04` (Books 1 and 4 of the Talmud) and on `jud/zdm`
(the Zohar) allows non-commercial use only. Those three keep the notice, are marked so in the
app, and are outside Quiet Bible's GPL licence (see "Licences" in `BUILDING.md`). The other
pages carry no such notice (`jud/t09` says "may be reproduced for any purpose provided this
paragraph is left intact").

The channel's views were taken from its website's pages (LXX vs MT, Synagogue of Satan,
Kabbalah, the Tetragrammaton, Evidence for Jesus, Jesus or Yeshua, Hebrew Roots), because
YouTube could not be read from the build machine. Claims on those pages that are false or
hostile to Jewish people as a whole were left out of the summaries.
