"""Smith & Van Dyck Arabic Bible (1865) -> .qbbible.

Source: STEPBible.org / Arabic Bible Outreach Ministry's Strong's-tagged edition (CC BY-SA 4.0).
The Strong's tags are removed (the change made to their work); the vowelled 1865 text is kept as
is. Psalm titles are set apart like the KJV's.
"""
import os, re, unicodedata
import xml.etree.ElementTree as ET
from common import BOOKS, clean, write_pack

NS = "{http://www.bibletechnologies.net/2003/OSIS/namespace}"
SRC = "/home/claude/tr/step/Tagged-Bibles/Arabic Bibles/AraSVD_sb-7.0.1-CC-BY-SA.xml"

NAMES = ["التكوين", "الخروج", "اللاويين", "العدد", "التثنية", "يشوع", "القضاة", "راعوث", "صموئيل الأول", "صموئيل الثاني",
         "الملوك الأول", "الملوك الثاني", "أخبار الأيام الأول", "أخبار الأيام الثاني", "عزرا", "نحميا", "أستير", "أيوب",
         "المزامير", "الأمثال", "الجامعة", "نشيد الأنشاد", "إشعياء", "إرميا", "مراثي إرميا", "حزقيال", "دانيال", "هوشع",
         "يوئيل", "عاموس", "عوبديا", "يونان", "ميخا", "ناحوم", "حبقوق", "صفنيا", "حجي", "زكريا", "ملاخي",
         "متى", "مرقس", "لوقا", "يوحنا", "أعمال الرسل", "رومية", "كورنثوس الأولى", "كورنثوس الثانية", "غلاطية", "أفسس",
         "فيلبي", "كولوسي", "تسالونيكي الأولى", "تسالونيكي الثانية", "تيموثاوس الأولى", "تيموثاوس الثانية", "تيطس",
         "فليمون", "العبرانيين", "يعقوب", "بطرس الأولى", "بطرس الثانية", "يوحنا الأولى", "يوحنا الثانية", "يوحنا الثالثة",
         "يهوذا", "رؤيا يوحنا"]
ABBRS = ["تك", "خر", "لا", "عد", "تث", "يش", "قض", "را", "1صم", "2صم", "1مل", "2مل", "1أخ", "2أخ", "عز", "نح", "أس", "أي",
         "مز", "أم", "جا", "نش", "إش", "إر", "مرا", "حز", "دا", "هو", "يؤ", "عا", "عو", "يون", "مي", "نا", "حب", "صف", "حج",
         "زك", "ملا", "مت", "مر", "لو", "يو", "أع", "رو", "1كو", "2كو", "غل", "أف", "في", "كو", "1تس", "2تس", "1تي", "2تي",
         "تي", "فل", "عب", "يع", "1بط", "2بط", "1يو", "2يو", "3يو", "يه", "رؤ"]
assert len(NAMES) == len(ABBRS) == len(BOOKS) == 66


def text(el):
    t = clean("".join(el.itertext()))
    t = re.sub(r"\s+([.،؛:!؟»)])", r"\1", t)
    return unicodedata.normalize("NFC", t)


osis_to_app = {o: a for a, o in BOOKS}
books, titles = {}, 0
root = ET.parse(SRC).getroot()
for d in root.iter(NS + "div"):
    if d.get("type") != "book":
        continue
    app = osis_to_app[d.get("osisID")]
    for ch in d.iter(NS + "chapter"):
        c = int(ch.get("osisID").rsplit(".", 1)[1])
        title = None
        for el in ch:
            if el.tag == NS + "title":
                title = text(el)
                if not re.search(r"[.!؟:]$", title):
                    title += "."
            elif el.tag == NS + "verse":
                n = int(el.get("osisID").rsplit(".", 1)[1])
                v = {"t": text(el), "p": app == "PSA"}
                if title and n == 1:
                    v["d"] = title
                    v["t"] = title + " " + v["t"]
                    titles += 1
                    title = None
                books.setdefault(app, {}).setdefault(c, {})[n] = v

ids = [a for a, _ in BOOKS]
out = "/home/claude/final/translations/QuietBible-SVD.qbbible"
meta, total = write_pack(
    out, "SVD", "Smith & Van Dyck (Arabic)", "SVD",
    "Public domain (1865); this digital text CC BY-SA 4.0, STEPBible.org and Arabic Bible Outreach Ministry",
    "Smith & Van Dyck 1865, from the STEPBible Arabic Bibles (github.com/STEPBible/STEPBible-Data), Strong's tags removed",
    books, language="ar", names=dict(zip(ids, NAMES)), abbrs=dict(zip(ids, ABBRS)))
print(len(meta), "books", total, "verses,", titles, "psalm titles,", round(os.path.getsize(out) / 1048576, 2), "MiB")
for r in [("GEN", 1, 1), ("PSA", 23, 1), ("PSA", 3, 1), ("JHN", 3, 16), ("MAT", 6, 9), ("REV", 22, 21)]:
    print(r, books[r[0]][r[1]][r[2]])
