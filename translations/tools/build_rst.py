"""Russian Synodal Translation (1876) -> .qbbible, Synodal numbering kept (Psalm 22 is "Господь – Пастырь мой").

Source: scrollmapper/bible_databases RusSynodal (public domain). The 66 books of the Protestant canon;
Daniel as in the canonical Synodal editions (the Greek additions 3:24-90 and chapters 13-14 left out,
3:91-100 numbered 3:24-33). Repairs: two editor's notes removed, one misplaced psalm title moved,
Psalm 114:8-9 split, alternative Greek numbers in brackets such as "[230]" dropped, spaced hyphens
made dashes, psalm titles set apart where the verse goes on after them.
"""
import json, os, re, unicodedata
from common import BOOKS, clean, write_pack

SRC = "/home/claude/tr/bdb/sources/ru/RusSynodal/RusSynodal.json"
NAMES = ["Бытие", "Исход", "Левит", "Числа", "Второзаконие", "Иисус Навин", "Судьи", "Руфь", "1-я Царств", "2-я Царств",
         "3-я Царств", "4-я Царств", "1-я Паралипоменон", "2-я Паралипоменон", "Ездра", "Неемия", "Есфирь", "Иов",
         "Псалтирь", "Притчи", "Екклесиаст", "Песнь Песней", "Исаия", "Иеремия", "Плач Иеремии", "Иезекииль", "Даниил",
         "Осия", "Иоиль", "Амос", "Авдий", "Иона", "Михей", "Наум", "Аввакум", "Софония", "Аггей", "Захария", "Малахия",
         "От Матфея", "От Марка", "От Луки", "От Иоанна", "Деяния", "К Римлянам", "1-е Коринфянам", "2-е Коринфянам",
         "К Галатам", "К Ефесянам", "К Филиппийцам", "К Колоссянам", "1-е Фессалоникийцам", "2-е Фессалоникийцам",
         "1-е Тимофею", "2-е Тимофею", "К Титу", "К Филимону", "К Евреям", "Иакова", "1-е Петра", "2-е Петра",
         "1-е Иоанна", "2-е Иоанна", "3-е Иоанна", "Иуды", "Откровение"]
ABBRS = ["Быт", "Исх", "Лев", "Чис", "Втор", "Нав", "Суд", "Руф", "1Цар", "2Цар", "3Цар", "4Цар", "1Пар", "2Пар", "Езд",
         "Неем", "Есф", "Иов", "Пс", "Притч", "Еккл", "Песн", "Ис", "Иер", "Плач", "Иез", "Дан", "Ос", "Иоил", "Ам", "Авд",
         "Ион", "Мих", "Наум", "Авв", "Соф", "Агг", "Зах", "Мал", "Мф", "Мк", "Лк", "Ин", "Деян", "Рим", "1Кор", "2Кор",
         "Гал", "Еф", "Флп", "Кол", "1Фес", "2Фес", "1Тим", "2Тим", "Тит", "Флм", "Евр", "Иак", "1Пет", "2Пет", "1Ин",
         "2Ин", "3Ин", "Иуд", "Откр"]
SOURCE_NAMES = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "I Samuel",
                "II Samuel", "I Kings", "II Kings", "I Chronicles", "II Chronicles", "Ezra", "Nehemiah", "Esther", "Job",
                "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel",
                "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai",
                "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "I Corinthians",
                "II Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "I Thessalonians",
                "II Thessalonians", "I Timothy", "II Timothy", "Titus", "Philemon", "Hebrews", "James", "I Peter",
                "II Peter", "I John", "II John", "III John", "Jude", "Revelation of John"]
assert len(NAMES) == len(ABBRS) == len(SOURCE_NAMES) == len(BOOKS) == 66

TITLE_START = re.compile(r"^(?:[Пп]салом|[Пп]еснь|Начальнику|Молитва|Учение|Хвала|Аллилуия|\[)")
TITLE_WORDS = re.compile(r"Давида|Асафа|Кореевых|Моисея|Соломона|Идифум|Еман|Ефан|хора|струнных|восьмиструнн|Гефск|[Пп]еснь|[Пп]салом|Учение|Молитва|Хвала|Аллилуия")


# words that only occur in a title: if the rest of verse 1 has them, the whole verse is the title
TITLE_TAIL = re.compile(r"орудии|орудиях|[Пп]салом|[Пп]еснь\.|Учение|Писание|Шошан|Аламоф|Не погуби|В воспоминание|О голубице|По смерти Лабена|При появлении зари|Раба Господня")


def is_title(sentence):
    return (TITLE_START.match(sentence) or TITLE_WORDS.search(sentence)) and len(sentence.split()) <= 12


def tidy(t):
    t = re.sub(r"<note>.*?</note>", "", t)
    t = re.sub(r"<title[^>]*>.*?</title>", "", t)
    t = re.sub(r"\s*\[\d+\]", "", t)                      # "сто тридцать [230]" -> "сто тридцать"
    t = re.sub(r"\s-\s", " — ", t)                        # "Господь - Пастырь" -> "Господь — Пастырь"
    t = re.sub(r"(?<=[^\s(\[])\[", " [", t)               # "правду[мою]" -> "правду [мою]"
    t = re.sub(r"(?<!\.)\.\.(?!\.)", ".", t)               # stray double full stop
    return unicodedata.normalize("NFC", clean(t))


def split_title(t):
    """'Псалом Давида. Господь — Пастырь мой; ...' -> ('Псалом Давида.', rest); None if the verse is all title."""
    pos, title = 0, ""
    while True:
        seg = re.match(r"\s*(\[[^\]]*\]\.?|[^.\[]+\.)", t[pos:])
        if not seg or not is_title(seg.group(1).strip()):
            break
        title += (" " if title else "") + seg.group(1).strip()
        pos += seg.end()
    rest = t[pos:].strip()
    if not title or not rest or is_title(rest.split(".")[0]) or TITLE_TAIL.search(rest):
        return None
    return title[0].upper() + title[1:], rest


src = {b["name"]: b for b in json.load(open(SRC, encoding="utf-8"))["books"]}
books, titles = {}, 0
moved_title = None
for (app, _), sname in zip(BOOKS, SOURCE_NAMES):
    for ch in src[sname]["chapters"]:
        c = ch["chapter"]
        if app == "DAN" and c > 12:
            continue
        for v in ch["verses"]:
            n, raw = v["verse"], v["text"]
            if app == "DAN" and c == 3:
                if 24 <= n <= 90:
                    continue
                if n > 90:
                    n -= 67
                    raw = raw.replace("царь, [услышав, что они поют,] изумился", "царь изумился")   # refers to the song left out above
            m = re.search(r"<title[^>]*>(.*?)</title>", raw)
            if m and app == "PSA":
                moved_title = (c + 1, m.group(1).strip())
            t = tidy(raw)
            if app == "PRO" and c == 29 and n == 6:
                t = t.replace("сеть для [него", "сеть для него")        # unmatched bracket in the source
            if app == "PSA" and c == 114 and n == 8 and "Буду ходить" in t:
                t, rest = t.split(" Буду ходить", 1)
                books.setdefault(app, {}).setdefault(c, {})[9] = {"t": "Буду ходить" + rest, "p": True}
            if not t:
                continue
            if app == "PSA" and c == 151:
                continue
            if app == "PSA" and c == 1 and n == 1:
                t = re.sub(r"^псалом Давида\.\s*", "", t)              # Psalm 1 has no title in the Synodal
            entry = {"t": t, "p": app == "PSA"}
            if app == "PSA" and n == 1:
                if moved_title and moved_title[0] == c and not t.startswith(moved_title[1]):
                    entry["t"] = t = moved_title[1] + " " + t
                    moved_title = None
                st = split_title(t)
                if st:
                    entry["d"], entry["t"] = st[0], st[0] + " " + st[1]
                    titles += 1
                elif t[0].islower():
                    entry["t"] = t[0].upper() + t[1:]
            books.setdefault(app, {}).setdefault(c, {})[n] = entry

ids = [a for a, _ in BOOKS]
out = "/home/claude/final/translations/QuietBible-RST.qbbible"
meta, total = write_pack(
    out, "RST", "Синодальный перевод", "RST", "Public domain",
    "Russian Synodal Translation 1876, via github.com/scrollmapper/bible_databases (RusSynodal)",
    books, language="ru", names=dict(zip(ids, NAMES)), abbrs=dict(zip(ids, ABBRS)),
    note="66 books; Daniel as in canonical Synodal editions; small repairs (notes removed, Psalm 114:8-9 split, bracketed alternative numbers dropped).")
print(len(meta), "books", total, "verses,", titles, "psalm titles,", round(os.path.getsize(out) / 1048576, 2), "MiB")
for r in [("GEN", 1, 1), ("GEN", 5, 3), ("PSA", 22, 1), ("PSA", 26, 1), ("PSA", 50, 1), ("PSA", 114, 9), ("PSA", 143, 15), ("PSA", 144, 1),
          ("DAN", 3, 23), ("DAN", 3, 24), ("DAN", 3, 33), ("JOB", 2, 9), ("JHN", 3, 16), ("ROM", 14, 26)]:
    print(r, books[r[0]][r[1]].get(r[2]))
