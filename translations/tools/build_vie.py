"""Vietnamese Bible (Cadman, 1934) -> .qbbible. The OSIS source keeps each verse in a <verse> element."""
import os, re, collections, unicodedata
import xml.etree.ElementTree as ET
from common import BOOKS, clean, write_pack

NS = "{http://www.bibletechnologies.net/2003/OSIS/namespace}"
SRC = "/home/claude/tr/open-bibles/vie-cadman.osis.xml"

# Book names as printed in the traditional Vietnamese Bible (Kinh Thánh, Bản Truyền Thống).
NAMES = ["Sáng Thế Ký", "Xuất Ê-díp-tô Ký", "Lê-vi Ký", "Dân Số Ký", "Phục Truyền Luật Lệ Ký", "Giô-suê", "Các Quan Xét", "Ru-tơ",
         "1 Sa-mu-ên", "2 Sa-mu-ên", "1 Các Vua", "2 Các Vua", "1 Sử Ký", "2 Sử Ký", "E-xơ-ra", "Nê-hê-mi", "Ê-xơ-tê", "Gióp",
         "Thi Thiên", "Châm Ngôn", "Truyền Đạo", "Nhã Ca", "Ê-sai", "Giê-rê-mi", "Ca Thương", "Ê-xê-chi-ên", "Đa-ni-ên", "Ô-sê",
         "Giô-ên", "A-mốt", "Áp-đia", "Giô-na", "Mi-chê", "Na-hum", "Ha-ba-cúc", "Sô-phô-ni", "A-ghê", "Xa-cha-ri", "Ma-la-chi",
         "Ma-thi-ơ", "Mác", "Lu-ca", "Giăng", "Công Vụ Các Sứ Đồ", "Rô-ma", "1 Cô-rinh-tô", "2 Cô-rinh-tô", "Ga-la-ti", "Ê-phê-sô",
         "Phi-líp", "Cô-lô-se", "1 Tê-sa-lô-ni-ca", "2 Tê-sa-lô-ni-ca", "1 Ti-mô-thê", "2 Ti-mô-thê", "Tít", "Phi-lê-môn",
         "Hê-bơ-rơ", "Gia-cơ", "1 Phi-e-rơ", "2 Phi-e-rơ", "1 Giăng", "2 Giăng", "3 Giăng", "Giu-đe", "Khải Huyền"]
ABBRS = ["Sáng", "Xuất", "Lê", "Dân", "Phục", "Giôs", "Quan", "Ru", "1 Sa", "2 Sa", "1 Vua", "2 Vua", "1 Sử", "2 Sử", "Exr",
         "Nê", "Êxt", "Gióp", "Thi", "Châm", "Truyền", "Nhã", "Ês", "Giê", "Ca", "Êxê", "Đa", "Ôs", "Giôe", "Am", "Áp", "Giôn",
         "Mi", "Na", "Hab", "Sô", "Ag", "Xa", "Mal", "Mat", "Mác", "Lu", "Giăng", "Công", "Rô", "1 Cô", "2 Cô", "Ga", "Êph",
         "Phil", "Côl", "1 Tê", "2 Tê", "1 Ti", "2 Ti", "Tít", "Phlm", "Hê", "Gia", "1 Phi", "2 Phi", "1 Giăng", "2 Giăng",
         "3 Giăng", "Giu", "Khải"]
assert len(NAMES) == len(ABBRS) == len(BOOKS) == 66

osis_to_app = {o: a for a, o in BOOKS}
books = {}
for d in ET.parse(SRC).getroot().iter(NS + "div"):
    app = osis_to_app[d.get("osisID")]
    for v in d.iter(NS + "verse"):
        _, c, n = v.get("osisID").rsplit(".", 2)
        books.setdefault(app, {}).setdefault(int(c), {})[int(n)] = {"t": unicodedata.normalize("NFC", clean("".join(v.itertext()))), "p": app == "PSA"}

# ---- Repairs -------------------------------------------------------------------------------
# The source keeps the 1934 spelling (nhơn, chơn, đờn) but lost the accent on capital vowels that
# carry a tone or a second mark: "Ay" for "Ấy", "Ap-ra-ham" for "Áp-ra-ham", "Ong" for "Ông".
# eBible's copy of the same Bible kept those capitals as VNI pairs ("Aáy", "Aùp-ra-ham", "Oâng"),
# so the two together give back the right letter. Everything else comes from the 1934 source.
EB_REF = "/home/claude/tr/ebible/metadata/vref.txt"
EB_TXT = "/home/claude/tr/ebible/corpus/vie-vie1934.txt"
VNI = {"ù": "\u0301", "ø": "\u0300", "û": "\u0309", "õ": "\u0303", "ï": "\u0323",
       "â": "\u0302", "á": "\u0302\u0301", "à": "\u0302\u0300", "å": "\u0302\u0309", "ã": "\u0302\u0303", "ä": "\u0302\u0323",
       "ê": "\u0306", "é": "\u0306\u0301", "è": "\u0306\u0300", "ú": "\u0306\u0309", "ü": "\u0306\u0303", "ë": "\u0306\u0323"}
TOKEN = re.compile(r"[^\s,.;:!?()\"“”₫]+")


def vni_capital(plain, paired):
    """'Ap-ra-ham' + 'Aùp-ra-ham' -> 'Áp-ra-ham'; None if the pair isn't that pattern."""
    if len(paired) != len(plain) + 1 or not plain or plain[0] not in "AEIOUY" or paired[0] != plain[0]:
        return None
    mark = paired[1]
    if mark not in VNI or paired[2:] != plain[1:]:
        return None
    letter = unicodedata.normalize("NFC", plain[0] + VNI[mark])
    if len(letter) != 1:
        return None                     # not a real Vietnamese letter (e.g. a breve on E)
    return letter + plain[1:]


eb_ref = open(EB_REF, encoding="utf-8").read().split("\n")
eb_txt = open(EB_TXT, encoding="utf-8").read().split("\n")
ebible = {r: unicodedata.normalize("NFC", t) for r, t in zip(eb_ref, eb_txt) if r}
learned = collections.defaultdict(collections.Counter)    # plain word -> corrected spellings seen
kept = collections.Counter()                               # plain word seen unchanged in both copies
aligned = set()
fixes = collections.Counter()


def repair(app, c, n, t):
    t = re.sub(r"\(\s*\d+\s*-\s*:?\s*\d+\s*\)\s*", "", t)   # Hebrew verse numbers, e.g. "(30 -1)"
    t = t.replace("₫", "")                                    # stray mark where the line had no punctuation
    t = re.sub(r"(\w) -(\w)", r"\1-\2", t)                  # "Na -a-ma" -> "Na-a-ma"
    e = ebible.get(f"{app} {c}:{n}", "")
    a, b = TOKEN.findall(t), TOKEN.findall(e)
    if e and len(a) == len(b):
        aligned.add((app, c, n))
        out, pos = [], 0
        for m, y in zip(TOKEN.finditer(t), b):
            fixed = vni_capital(m.group(), y)
            if m.group() == y:
                kept[y] += 1
            if fixed:
                learned[m.group()][fixed] += 1
                out.append(t[pos:m.start()] + fixed); pos = m.end(); fixes["aligned"] += 1
        t = "".join(out) + t[pos:]
    return re.sub(r"\s+", " ", t).strip()


for app, chs in books.items():
    for c, vs in chs.items():
        for n, v in vs.items():
            v["t"] = repair(app, c, n, v["t"])
# Verses whose wording differs between the two copies: use what the aligned verses taught,
# when every occurrence agreed on one spelling.
sure = {w: cs.most_common(1)[0][0] for w, cs in learned.items() if len(cs) == 1 and kept[w] == 0}
for app, chs in books.items():
    for c, vs in chs.items():
        for n, v in vs.items():
            if (app, c, n) in aligned:
                continue
            def sub(m):
                w = m.group()
                if w in sure:
                    fixes["learned"] += 1
                    return sure[w]
                return w
            v["t"] = TOKEN.sub(sub, v["t"])
# A few standalone words both copies lost; as capitals they can only be these.
ALWAYS = {"Ay": "Ấy", "Oi": "Ôi", "Ong": "Ông", "At": "Ắt"}
for chs in books.values():
    for vs in chs.values():
        for v in vs.values():
            v["t"] = re.sub(r"(?<![\w-])(Ay|Oi|Ong|At)(?![\w-])", lambda m: ALWAYS[m.group(1)], v["t"])
print("capital accents restored:", dict(fixes), "distinct words:", len(sure))

ids = [a for a, _ in BOOKS]
out = "/home/claude/final/translations/QuietBible-VIE1934.qbbible"
meta, total = write_pack(out, "VIE1934", "Kinh Thánh 1934 (Bản Truyền Thống)", "VIE1934", "Public domain",
                         "Vietnamese Bible (Cadman, 1934), Unbound Bible via github.com/seven1m/open-bibles",
                         books, language="vi", names=dict(zip(ids, NAMES)), abbrs=dict(zip(ids, ABBRS)))
print(len(meta), "books", total, "verses,", round(os.path.getsize(out) / 1048576, 2), "MiB")
for r in [("GEN", 1, 1), ("PSA", 23, 1), ("JHN", 3, 16), ("REV", 22, 21)]:
    print(r, books[r[0]][r[1]][r[2]]["t"])
