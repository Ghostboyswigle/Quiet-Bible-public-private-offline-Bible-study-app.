"""Louis Segond 1910 (French) from the UBS/BibleCorps USFM -> .qbbible.

Keeps the Segond numbering (psalm titles are verse 1, as printed). Drops the modern
introductions, section headings, parallel references and cross-references, so only the
1910 text remains. Words of Jesus are marked; Psalms are set as poetry.
"""
import glob, os, re, unicodedata
from common import BOOKS, clean, write_pack

SRC = "/home/claude/tr/lsg/p.sfm"
NAMES = ["Genèse", "Exode", "Lévitique", "Nombres", "Deutéronome", "Josué", "Juges", "Ruth", "1 Samuel", "2 Samuel",
         "1 Rois", "2 Rois", "1 Chroniques", "2 Chroniques", "Esdras", "Néhémie", "Esther", "Job", "Psaumes", "Proverbes",
         "Ecclésiaste", "Cantique des Cantiques", "Ésaïe", "Jérémie", "Lamentations", "Ézéchiel", "Daniel", "Osée", "Joël",
         "Amos", "Abdias", "Jonas", "Michée", "Nahum", "Habacuc", "Sophonie", "Aggée", "Zacharie", "Malachie",
         "Matthieu", "Marc", "Luc", "Jean", "Actes", "Romains", "1 Corinthiens", "2 Corinthiens", "Galates", "Éphésiens",
         "Philippiens", "Colossiens", "1 Thessaloniciens", "2 Thessaloniciens", "1 Timothée", "2 Timothée", "Tite",
         "Philémon", "Hébreux", "Jacques", "1 Pierre", "2 Pierre", "1 Jean", "2 Jean", "3 Jean", "Jude", "Apocalypse"]
ABBRS = ["Gn", "Ex", "Lv", "Nb", "Dt", "Jos", "Jg", "Rt", "1 S", "2 S", "1 R", "2 R", "1 Ch", "2 Ch", "Esd", "Né", "Est",
         "Jb", "Ps", "Pr", "Ec", "Ct", "És", "Jé", "La", "Éz", "Da", "Os", "Joë", "Am", "Ab", "Jon", "Mi", "Na", "Ha", "So",
         "Ag", "Za", "Ma", "Mt", "Mc", "Lc", "Jn", "Ac", "Ro", "1 Co", "2 Co", "Ga", "Ép", "Ph", "Col", "1 Th", "2 Th",
         "1 Ti", "2 Ti", "Tit", "Phm", "Hé", "Ja", "1 Pi", "2 Pi", "1 Jn", "2 Jn", "3 Jn", "Jud", "Ap"]
assert len(NAMES) == len(ABBRS) == len(BOOKS) == 66

DROP_LINES = re.compile(r"^\\(id|ide|h|toc\d|mt\d?|mte\d?|imt\d?|ip|ipi|io\d?|ior|ie|ib\d?|is\d?|iq|r|s\d?|ms\d?|mr|rem|sd\d?|periph)\b.*$", re.M)


def text_of(raw):
    """USFM verse body -> plain text (+ whether Jesus speaks in it)."""
    jesus = "\\wj " in raw
    t = re.sub(r"\\x\s.*?\\x\*", " ", raw, flags=re.S)               # cross-references
    t = re.sub(r"\\f\s.*?\\f\*", " ", t, flags=re.S)                 # footnotes (none expected)
    t = re.sub(r"\\(?:\+)?[a-z]+\d*\*?", " ", t)                       # every remaining marker
    t = clean(t.replace("\u00a0", " "))
    t = re.sub(r"\s+([,;:.!?»])", r"\1", t)
    t = re.sub(r"([«])\s+", r"\1 ", t)
    t = re.sub(r"\(\s+", "(", t)
    t = re.sub(r"([,;:!?])(?=[^\s\d»)\]’'])", r"\1 ", t)               # "prier:Notre" -> "prier: Notre"
    return unicodedata.normalize("NFC", t), jesus


books, titles = {}, 0
for path in sorted(glob.glob(SRC + "/*.sfm")):
    usfm = open(path, encoding="utf-8").read().replace("\r", "")
    book = re.search(r"^\\id (\w{3})", usfm, re.M).group(1)
    if book not in dict(BOOKS):
        continue
    body = usfm[usfm.index("\\c 1"):]
    body = body.replace("\\v 11 5\u00c9loignez", "\\v 115 \u00c9loignez")   # Psalm 119:115 typed as "11 5" in the source
    body = DROP_LINES.sub("", body)
    for cm in re.finditer(r"\\c (\d+)(.*?)(?=\\c \d+|\Z)", body, re.S):
        c = int(cm.group(1))
        for vm in re.finditer(r"\\v (\d+)(?:-\d+)?\s(.*?)(?=\\v \d+|\Z)", cm.group(2), re.S):
            n, raw = int(vm.group(1)), vm.group(2)
            t, jesus = text_of(raw)
            v = {"t": t, "p": book == "PSA", **({"j": True} if jesus else {})}
            if book == "PSA" and n == 1:
                # "Cantique de David. \b L'Éternel est mon berger" -> the title is set apart
                parts = re.split(r"\\b\b", raw, maxsplit=1)
                if len(parts) == 2:
                    head, _ = text_of(parts[0])
                    rest, _ = text_of(parts[1])
                    if head and rest and t.startswith(head):
                        v["d"] = head
                        titles += 1
            books.setdefault(book, {}).setdefault(c, {})[n] = v

ids = [a for a, _ in BOOKS]
out = "/home/claude/final/translations/QuietBible-LSG.qbbible"
meta, total = write_pack(out, "LSG", "Louis Segond 1910", "LSG", "Public domain",
                         "Louis Segond 1910, UBS edition via github.com/BibleCorps/FRA-B-LSG1910-PD-UBS",
                         books, language="fr", names=dict(zip(ids, NAMES)), abbrs=dict(zip(ids, ABBRS)))
print(len(meta), "books", total, "verses,", titles, "psalm titles set apart,", round(os.path.getsize(out) / 1048576, 2), "MiB")
for r in [("GEN", 1, 1), ("PSA", 3, 1), ("PSA", 3, 3), ("PSA", 23, 1), ("MAT", 6, 9), ("JHN", 3, 16), ("JHN", 14, 6), ("MAL", 4, 5), ("JOL", 2, 28), ("REV", 22, 21)]:
    v = books.get(r[0], {}).get(r[1], {}).get(r[2])
    print(r, v)
