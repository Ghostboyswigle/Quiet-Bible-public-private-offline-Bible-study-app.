"""Ang Dating Biblia (Tagalog, 1905) -> .qbbible. The OSIS source keeps each verse in a <verse> element."""
import os, re, collections
import xml.etree.ElementTree as ET
from common import BOOKS, clean, write_pack

NS = "{http://www.bibletechnologies.net/2003/OSIS/namespace}"
SRC = "/home/claude/tr/open-bibles/tgl-tagalog.osis.xml"

# Book names as the 1905 edition titles them (Genesis–Awit as listed by Bible Gateway's ADB1905).
NAMES = ["Genesis", "Exodo", "Levitico", "Mga Bilang", "Deuteronomio", "Josue", "Mga Hukom", "Ruth", "1 Samuel", "2 Samuel",
         "1 Mga Hari", "2 Mga Hari", "1 Paralipomeno", "2 Paralipomeno", "Ezra", "Nehemias", "Ester", "Job", "Awit",
         "Mga Kawikaan", "Eclesiastes", "Awit ni Solomon", "Isaias", "Jeremias", "Mga Panaghoy", "Ezekiel", "Daniel", "Oseas",
         "Joel", "Amos", "Abdias", "Jonas", "Mikas", "Nahum", "Habacuc", "Sofonias", "Hageo", "Zacarias", "Malakias",
         "Mateo", "Marcos", "Lucas", "Juan", "Mga Gawa", "Mga Taga-Roma", "1 Mga Taga-Corinto", "2 Mga Taga-Corinto",
         "Mga Taga-Galacia", "Mga Taga-Efeso", "Mga Taga-Filipos", "Mga Taga-Colosas", "1 Mga Taga-Tesalonica",
         "2 Mga Taga-Tesalonica", "1 Kay Timoteo", "2 Kay Timoteo", "Kay Tito", "Kay Filemon", "Mga Hebreo", "Santiago",
         "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas", "Apocalipsis"]
ABBRS = ["Gen", "Exo", "Lev", "Blg", "Deut", "Jos", "Huk", "Ruth", "1 Sam", "2 Sam", "1 Hari", "2 Hari", "1 Par", "2 Par",
         "Ezra", "Neh", "Est", "Job", "Awit", "Kaw", "Ecl", "AwS", "Isa", "Jer", "Pan", "Ezek", "Dan", "Os", "Joel", "Amos",
         "Abd", "Jon", "Mik", "Nah", "Hab", "Sof", "Hag", "Zac", "Mal", "Mat", "Mar", "Luc", "Juan", "Gawa", "Roma",
         "1 Cor", "2 Cor", "Gal", "Efe", "Fil", "Col", "1 Tes", "2 Tes", "1 Tim", "2 Tim", "Tito", "Flm", "Heb", "Sant",
         "1 Ped", "2 Ped", "1 Juan", "2 Juan", "3 Juan", "Jud", "Apoc"]
assert len(NAMES) == len(ABBRS) == len(BOOKS) == 66

osis_to_app = {o: a for a, o in BOOKS}
books = {}
for d in ET.parse(SRC).getroot().iter(NS + "div"):
    app = osis_to_app[d.get("osisID")]
    for v in d.iter(NS + "verse"):
        _, c, n = v.get("osisID").rsplit(".", 2)
        books.setdefault(app, {}).setdefault(int(c), {})[int(n)] = {"t": clean("".join(v.itertext())), "p": app == "PSA"}

ids = [a for a, _ in BOOKS]
out = "/home/claude/final/translations/QuietBible-ADB.qbbible"
meta, total = write_pack(out, "ADB", "Ang Dating Biblia (1905)", "ADB", "Public domain",
                         "Ang Dating Biblia, Philippine Bible Society 1905, via github.com/seven1m/open-bibles",
                         books, language="tl", names=dict(zip(ids, NAMES)), abbrs=dict(zip(ids, ABBRS)))
print(len(meta), "books", total, "verses,", round(os.path.getsize(out) / 1048576, 2), "MiB")
for r in [("GEN", 1, 1), ("PSA", 23, 1), ("JHN", 3, 16), ("REV", 22, 21)]:
    print(r, books[r[0]][r[1]][r[2]]["t"])
