"""Chinese Union Version (1919), traditional and simplified script -> two .qbbible packs."""
import os, re
from usfx import parse
from common import write_pack

IDS = ("GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS "
       "JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM "
       "HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV").split()
TRAD = ("創 出 利 民 申 書 士 得 撒上 撒下 王上 王下 代上 代下 拉 尼 斯 伯 詩 箴 傳 歌 賽 耶 哀 結 但 何 珥 摩 俄 拿 彌 鴻 哈 番 該 亞 瑪 "
        "太 可 路 約 徒 羅 林前 林後 加 弗 腓 西 帖前 帖後 提前 提後 多 門 來 雅 彼前 彼後 約壹 約貳 約參 猶 啟").split()
SIMP = ("创 出 利 民 申 书 士 得 撒上 撒下 王上 王下 代上 代下 拉 尼 斯 伯 诗 箴 传 歌 赛 耶 哀 结 但 何 珥 摩 俄 拿 弥 鸿 哈 番 该 亚 玛 "
        "太 可 路 约 徒 罗 林前 林后 加 弗 腓 西 帖前 帖后 提前 提后 多 门 来 雅 彼前 彼后 约一 约二 约三 犹 启").split()
assert len(IDS) == len(TRAD) == len(SIMP) == 66

# The source's book titles, corrected to the names printed in the Union Version.
FIX = {"創世紀": "創世記", "创世纪": "创世记", "约翰壹书": "约翰一书", "约翰贰书": "约翰二书", "约翰参书": "约翰三书"}

TITLE = re.compile(r"^（[^）]*）")


def build(src, tid, name, abbr, abbrs, out):
    bk, names = parse(src)
    names = {k: FIX.get(v, v) for k, v in names.items()}
    titles = 0
    for c in bk["PSA"].values():
        for n, v in c.items():
            v["p"] = True
            if n == 1:
                m = TITLE.match(v["t"])
                if m and m.end() < len(v["t"]):       # a heading in parentheses, then the verse itself
                    v["d"] = m.group()
                    titles += 1
    meta, total = write_pack(out, tid, name, abbr, "Public domain",
                             "Chinese Union Version (1919), eBible.org via github.com/seven1m/open-bibles",
                             bk, language="zh", names=names, abbrs=dict(zip(IDS, abbrs)))
    print(tid, len(meta), "books", total, "verses,", titles, "psalm titles,",
          round(os.path.getsize(out) / 1048576, 2), "MiB")
    print("  ", " ".join(m["name"] for m in meta[:6]), "...", meta[-1]["name"])
    return bk


os.makedirs("/home/claude/final/translations", exist_ok=True)
build("/home/claude/tr/open-bibles/chi-cuv.usfx.xml", "CUV", "Chinese Union Version (Traditional)", "CUV", TRAD,
      "/home/claude/final/translations/QuietBible-CUV.qbbible")
build("/home/claude/tr/open-bibles/chi-cuv-simp.usfx.xml", "CUVS", "Chinese Union Version (Simplified)", "CUVS", SIMP,
      "/home/claude/final/translations/QuietBible-CUVS.qbbible")
