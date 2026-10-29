"""USFX (milestone <v id/> ... <ve/>) -> {APPID: {ch: {v: {t, p}}}}, plus book names from <h>."""
import xml.sax
from common import clean

class H(xml.sax.ContentHandler):
    def __init__(self):
        self.books = {}; self.names = {}; self.book = None; self.ch = 0; self.cur = None; self.buf = []
        self.skip = 0; self.inh = False; self.hbuf = []
    def close(self):
        if self.cur:
            b, c, v = self.cur
            self.books.setdefault(b, {}).setdefault(c, {})[v] = {"t": clean("".join(self.buf)), "p": False}
        self.cur = None; self.buf = []
    def startElement(self, name, a):
        if name == "book":
            self.close(); self.book = a.get("id"); self.ch = 0
        elif name == "c":
            self.close(); self.ch = int(a.get("id"))
        elif name == "v":
            self.close(); self.cur = (self.book, self.ch, int(a.get("id").split("-")[0]))
        elif name == "ve":
            self.close()
        elif name == "h":
            self.inh = True; self.hbuf = []
        elif name in ("toc", "id", "f", "x", "note", "rem"):
            self.skip += 1
    def endElement(self, name):
        if name == "h":
            self.inh = False; self.names[self.book] = clean("".join(self.hbuf))
        elif name in ("toc", "id", "f", "x", "note", "rem"):
            self.skip -= 1
        elif name == "book":
            self.close()
    def characters(self, s):
        if self.inh: self.hbuf.append(s); return
        if self.skip or not self.cur: return
        self.buf.append(s)

def parse(path):
    h = H(); xml.sax.parse(path, h); return h.books, h.names
