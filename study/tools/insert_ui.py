#!/usr/bin/env python3
"""Puts study/study-ui.js into web/app.js and opens it from the verse sheet.

    python3 study/tools/insert_ui.py

The code goes at the bundle's top level, just before QbCredits, between /*QB-STUDY-BEGIN*/ and
/*QB-STUDY-END*/; running this again replaces it. The verse sheet (function br) gets a Study
section after the note and before the superscription, the Library (function ar) gets a
fourth tab, Research, with the other research documents, and the app's header gets a Map button
that opens the cross-reference map (the frame is mounted in the app shell, function Ur).
"""
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
APP = os.path.join(ROOT, "web", "app.js")
UI = os.path.join(ROOT, "study", "study-ui.js")
BEGIN, END = "/*QB-STUDY-BEGIN*/", "/*QB-STUDY-END*/"
SHEET_HOOK = "i.d?(0,F.jsx)(xr,{title:`Superscription`"
SHEET_CALL = "(0,F.jsx)(QbStudy,{data:t,book:n,chapter:r,verse:i,onJump:s},`qbs-`+v),"

app = open(APP, encoding="utf8").read()
ui = open(UI, encoding="utf8").read().strip()
block = BEGIN + ui + "\n" + END

if BEGIN in app:
    app = re.sub(re.escape(BEGIN) + r".*?" + re.escape(END), lambda m: block, app, count=1, flags=re.S)
else:
    at = app.find("function QbCredits(")
    if at < 0:
        sys.exit("QbCredits not found in app.js")
    app = app[:at] + block + app[at:]

if SHEET_CALL not in app:
    if app.count(SHEET_HOOK) != 1:
        sys.exit("verse sheet hook not found exactly once in app.js")
    app = app.replace(SHEET_HOOK, SHEET_CALL + SHEET_HOOK)

LIB_TABS = "[`notes`,`highlights`,`bookmarks`].map(e=>(0,F.jsx)(`button`"
LIB_TABS_NEW = "[`notes`,`highlights`,`bookmarks`,`research`].map(e=>(0,F.jsx)(`button`"
LIB_HOOK = "n===`bookmarks`?(0,F.jsx)(or,{empty:`Bookmark a verse to return to it later.`,items:p(o),data:e,onOpen:d}):null"
LIB_CALL = ",n===`research`?(0,F.jsx)(QbResearch,{}):null"
if LIB_TABS_NEW not in app:
    if app.count(LIB_TABS) != 1 or app.count(LIB_HOOK) != 1:
        sys.exit("Library tabs not found exactly once in app.js")
    app = app.replace(LIB_TABS, LIB_TABS_NEW).replace(LIB_HOOK, LIB_HOOK + LIB_CALL)

# The cross-reference map: a button in the app's header, and the frame that shows it (in the app
# shell, function Ur, so "Open in Quiet Bible" can switch to the Read tab).
HEADER_HOOK = "children:`Offline · private · ${qbTrInfo().name}`})]})"
HEADER_CALL = ",(0,F.jsx)(QbMapButton,{})"
SHELL_HOOK = "(0,F.jsx)(`nav`,{className:`border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]"
SHELL_CALL = "(0,F.jsx)(QbMapHost,{onRead:r}),"
if HEADER_CALL not in app:
    if app.count(HEADER_HOOK) != 1 or app.count(SHELL_HOOK) != 1:
        sys.exit("app header or tab bar not found exactly once in app.js")
    app = app.replace(HEADER_HOOK, HEADER_HOOK + HEADER_CALL).replace(SHELL_HOOK, SHELL_CALL + SHELL_HOOK)

open(APP, "w", encoding="utf8").write(app)
print("study UI in place:", len(ui), "characters")
