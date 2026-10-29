"""OSIS (milestoned verses, as from eBible/Haiola) -> {APPID: {ch: {v: {t, p}}}}"""
import xml.sax, re
from common import BOOKS, clean
OSIS2APP = {o: a for a, o in BOOKS}

class H(xml.sax.ContentHandler):
    def __init__(self):
        self.books = {}; self.cur = None; self.buf = []; self.title = None; self.pending_title = None
        self.skip = 0; self.book = None; self.inl = 0; self.d = None; self.jesus = False; self.vj = False
    def startElement(self, name, a):
        if name == "div" and a.get("type") == "book":
            self.book = OSIS2APP.get(a.get("osisID"))
        elif name == "verse" and a.get("sID"):
            if not self.book: return
            _, c, v = a.get("osisID").split(".")[:3]
            self.cur = (self.book, int(c), int(v)); self.buf = []; self.d = None
            if self.pending_title:
                self.d = self.pending_title; self.buf.append(self.pending_title + " "); self.pending_title = None
            self.poetry = self.inl > 0; self.vj = self.jesus
        elif name == "verse" and a.get("eID"):
            self.flush()
        elif name == "title":
            self.title = [] if a.get("type") == "psalm" else None
            self.skip += 1
        elif name == "note":
            self.skip += 1
        elif name == "l":
            self.inl += 1
        elif name == "q" and a.get("who") == "Jesus" and a.get("sID"):
            self.jesus = True
            if self.cur: self.vj = True
        elif name == "q" and a.get("eID"):
            self.jesus = False
    def endElement(self, name):
        if name == "title":
            self.skip -= 1
            if self.title is not None: self.pending_title = clean("".join(self.title))
            self.title = None
        elif name == "note":
            self.skip -= 1
        elif name == "l":
            self.inl -= 1
    def characters(self, s):
        if self.title is not None: self.title.append(s); return
        if self.skip: return
        if self.cur: self.buf.append(s)
    def flush(self):
        if not self.cur: return
        b, c, v = self.cur
        t = clean("".join(self.buf))
        self.books.setdefault(b, {}).setdefault(c, {})[v] = {"t": t, "p": self.poetry, **({"d": self.d} if self.d else {}), **({"j": True} if self.vj else {})}
        self.cur = None

def parse(path):
    h = H(); xml.sax.parse(path, h); return h.books
