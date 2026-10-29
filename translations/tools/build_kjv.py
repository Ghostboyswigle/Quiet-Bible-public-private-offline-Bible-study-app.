from osis import parse
from common import write_pack
import os
bk = parse("/home/claude/tr/open-bibles/eng-kjv.osis.xml")
for c in bk["PSA"].values():
    for v in c.values(): v["p"] = True          # the whole Psalter is poetry
out = "/home/claude/final/translations/QuietBible-KJV.qbbible"
meta, total = write_pack(out, "KJV", "King James Version", "KJV", "Public domain",
    "King James Version (1769 standardized text), eBible.org via github.com/seven1m/open-bibles", bk)
print(len(meta), "books", total, "verses", round(os.path.getsize(out) / 1048576, 2), "MiB")
