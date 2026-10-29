import re, os
from usfx import parse
from common import write_pack
bk, names = parse("/home/claude/tr/open-bibles/spa-rv1909.usfx.xml")
ABBR = dict(zip("GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV".split(),
  ["Gn","Éx","Lv","Nm","Dt","Jos","Jue","Rt","1 S","2 S","1 R","2 R","1 Cr","2 Cr","Esd","Neh","Est","Job","Sal","Pr","Ec","Cnt","Is","Jer","Lm","Ez","Dn","Os","Jl","Am","Abd","Jon","Miq","Nah","Hab","Sof","Hag","Zac","Mal",
   "Mt","Mr","Lc","Jn","Hch","Ro","1 Co","2 Co","Gá","Ef","Fil","Col","1 Ts","2 Ts","1 Ti","2 Ti","Tit","Flm","He","Stg","1 P","2 P","1 Jn","2 Jn","3 Jn","Jud","Ap"]))
DIVINE = {"JEHOVÁ", "JAH", "DIOS", "SEÑOR", "CRISTO", "JESÚS", "JESUS"}
CAPS = r"[A-ZÁÉÍÓÚÜÑ]{2,}"
def recase(t):
    """The 1909 print sets the first word(s) of each chapter, and the divine name, in capitals.
    Keep the words, lose the shouting (a text-to-speech voice would spell some of them out).
    Runs of 4+ capitalised words are inscriptions (e.g. on the cross) and stay as printed."""
    words = list(re.finditer(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+", t)); out = []; last = 0; i = 0
    while i < len(words):
        m = words[i]
        if re.fullmatch(CAPS, m.group()):
            j = i
            while j < len(words) and re.fullmatch(CAPS, words[j].group()): j += 1
            run = words[i:j]
            for k, w in enumerate(run):
                out.append(t[last:w.start()]); last = w.end(); s = w.group()
                if j - i >= 4: out.append(s); continue
                first = (w.start() == 0) or re.fullmatch(r"[\s¡¿«\"“(]*", t[:w.start()]) is not None or re.search(r"[.!?:]\s*[¡¿«\"“]?$", t[:w.start()])
                out.append(s.capitalize() if (s in DIVINE or first) else s.lower())
            i = j
        else:
            i += 1
    out.append(t[last:]); return "".join(out)
n = 0
for b in bk.values():
    for c in b.values():
        for v in c.values():
            new = recase(v["t"]); n += new != v["t"]; v["t"] = new
for c in bk["PSA"].values():
    for v in c.values(): v["p"] = True
out = "/home/claude/final/translations/QuietBible-RV1909.qbbible"
meta, total = write_pack(out, "RV1909", "Reina-Valera 1909", "RV1909", "Public domain",
    "Reina-Valera 1909, eBible.org via github.com/seven1m/open-bibles", bk, language="es", names=names, abbrs=ABBR)
print(len(meta), "books", total, "verses;", n, "verses recased;", round(os.path.getsize(out) / 1048576, 2), "MiB")
for r in [("GEN",1,1),("PSA",23,1),("PSA",3,1),("EXO",20,2),("JHN",19,19),("PSA",150,6),("NUM",13,1),("JHN",3,16)]:
    print(r, bk[r[0]][r[1]][r[2]]["t"][:120])
print([m["name"] for m in meta][:10], meta[18]["name"], meta[-1]["name"], meta[21]["name"])
