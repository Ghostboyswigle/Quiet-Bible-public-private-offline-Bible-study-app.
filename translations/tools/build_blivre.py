"""Bíblia Livre, Textus Receptus edition (Almeida 1819 updated; CC BY 3.0 BR) -> .qbbible.

Source: scrollmapper/bible_databases (PorBLivreTR). Small repairs, all listed in the pack's
"note": missing spaces after punctuation, one leftover footnote, one typo (SENHRO), Psalm 46:2-3
split back into two verses, and psalm titles set apart (their closing colon becomes a full stop).
"""
import json, os, re, unicodedata
from common import BOOKS, clean, write_pack

SRC = "/home/claude/tr/bdb/sources/pt/PorBLivreTR/PorBLivreTR.json"
NAMES = ["Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio", "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel",
         "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Ester", "Jó", "Salmos", "Provérbios",
         "Eclesiastes", "Cantares", "Isaías", "Jeremias", "Lamentações", "Ezequiel", "Daniel", "Oseias", "Joel", "Amós",
         "Obadias", "Jonas", "Miqueias", "Naum", "Habacuque", "Sofonias", "Ageu", "Zacarias", "Malaquias",
         "Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios",
         "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito",
         "Filemom", "Hebreus", "Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João", "3 João", "Judas", "Apocalipse"]
ABBRS = ["Gn", "Êx", "Lv", "Nm", "Dt", "Js", "Jz", "Rt", "1Sm", "2Sm", "1Rs", "2Rs", "1Cr", "2Cr", "Ed", "Ne", "Et", "Jó",
         "Sl", "Pv", "Ec", "Ct", "Is", "Jr", "Lm", "Ez", "Dn", "Os", "Jl", "Am", "Ob", "Jn", "Mq", "Na", "Hc", "Sf", "Ag",
         "Zc", "Ml", "Mt", "Mc", "Lc", "Jo", "At", "Rm", "1Co", "2Co", "Gl", "Ef", "Fp", "Cl", "1Ts", "2Ts", "1Tm", "2Tm",
         "Tt", "Fm", "Hb", "Tg", "1Pe", "2Pe", "1Jo", "2Jo", "3Jo", "Jd", "Ap"]
assert len(NAMES) == len(ABBRS) == len(BOOKS) == 66

TITLE_WORDS = ("Salmo", "Cântico", "Instrução", "Oração", "Para", "Memorial")
LETTER = re.compile(r"^([A-ZÁÉÍÓÚ][a-záéíóúâêôãõç]+):\s*")      # Psalm 119's "Álefe:" headings, every 8th verse


def tidy(t):
    t = re.sub(r"/fn/.*?/\*fn\s*", " ", t)                      # one footnote left in the text (Dt 32:5)
    t = t.replace("SENHRO", "SENHOR").replace("´", "’")
    t = re.sub(r"([,;:!?])(?=[A-Za-zÀ-ÿ“])", r"\1 ", t)        # "isto,zombaram" -> "isto, zombaram"
    t = re.sub(r"([a-zà-ÿ])\.(?=[A-ZÀ-Ý])", r"\1. ", t)          # "mim.Porém" -> "mim. Porém"
    return unicodedata.normalize("NFC", clean(t))


src = json.load(open(SRC, encoding="utf-8"))
assert len(src["books"]) == 66
books, titles = {}, 0
for (app, _), b in zip(BOOKS, src["books"]):
    for ch in b["chapters"]:
        c = ch["chapter"]
        for v in ch["verses"]:
            n, t = v["verse"], tidy(v["text"])
            if app == "PSA" and c == 46 and n == 2 and "; Ainda que suas águas" in t:
                t, rest = t.split("; Ainda que suas águas", 1)
                t += ";"
                books.setdefault(app, {}).setdefault(c, {})[3] = {"t": "Ainda que suas águas" + rest, "p": True}
            if app == "PSA" and c == 46 and n == 3 and not t:
                continue
            entry = {"t": t, "p": app == "PSA"}
            if app == "PSA":
                m = LETTER.match(t) if c == 119 and n % 8 == 1 else None
                if m:
                    entry["d"] = m.group(1) + "."
                    entry["t"] = entry["d"] + " " + t[m.end():].strip()
                elif n == 1 and t.split(" ", 1)[0] in TITLE_WORDS:
                    m = re.match(r"^(.{3,200}?):\s", t)
                    if m:
                        entry["d"] = m.group(1) + "."
                        entry["t"] = entry["d"] + " " + t[m.end():]
                        titles += 1
            books.setdefault(app, {}).setdefault(c, {})[n] = entry

ids = [a for a, _ in BOOKS]
out = "/home/claude/final/translations/QuietBible-BLIVRE.qbbible"
meta, total = write_pack(
    out, "BLIVRE", "Bíblia Livre (Almeida)", "BLIVRE",
    "Bíblia Livre (BLIVRE), Copyright © Diego Santos, Mario Sérgio e Marco Teles, Creative Commons Atribuição 3.0 Brasil",
    "Bíblia Livre, Textus Receptus edition (2018), http://sites.google.com/site/biblialivre/, via github.com/scrollmapper/bible_databases",
    books, language="pt", names=dict(zip(ids, NAMES)), abbrs=dict(zip(ids, ABBRS)),
    note="Quiet Bible changes: spacing after punctuation, one footnote and one typo removed, Psalm 46:2-3 split, psalm titles set apart.")
print(len(meta), "books", total, "verses,", titles, "psalm titles,", round(os.path.getsize(out) / 1048576, 2), "MiB")
for r in [("GEN", 1, 1), ("PSA", 23, 1), ("PSA", 46, 2), ("PSA", 46, 3), ("PSA", 119, 9), ("JHN", 3, 16), ("DEU", 32, 5), ("NEH", 2, 19)]:
    print(r, books[r[0]][r[1]].get(r[2]))
