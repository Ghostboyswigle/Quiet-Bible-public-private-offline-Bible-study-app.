/**
 * Convert bundled BSB USFM into compact JSON for the web reader.
 * Captures verses, section headings, parallel refs, poetry, words of Jesus,
 * and footnotes — all of which the original Android parser discarded.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const USFM_DIR = "/tmp/quietbible/usfm";
const OUT_DIR = "/workspace/public/bible";

const BOOKS = [
  ["GEN", "Genesis", "Gen", "OT"],
  ["EXO", "Exodus", "Exod", "OT"],
  ["LEV", "Leviticus", "Lev", "OT"],
  ["NUM", "Numbers", "Num", "OT"],
  ["DEU", "Deuteronomy", "Deut", "OT"],
  ["JOS", "Joshua", "Josh", "OT"],
  ["JDG", "Judges", "Judg", "OT"],
  ["RUT", "Ruth", "Ruth", "OT"],
  ["1SA", "1 Samuel", "1 Sam", "OT"],
  ["2SA", "2 Samuel", "2 Sam", "OT"],
  ["1KI", "1 Kings", "1 Kgs", "OT"],
  ["2KI", "2 Kings", "2 Kgs", "OT"],
  ["1CH", "1 Chronicles", "1 Chr", "OT"],
  ["2CH", "2 Chronicles", "2 Chr", "OT"],
  ["EZR", "Ezra", "Ezra", "OT"],
  ["NEH", "Nehemiah", "Neh", "OT"],
  ["EST", "Esther", "Esth", "OT"],
  ["JOB", "Job", "Job", "OT"],
  ["PSA", "Psalms", "Ps", "OT"],
  ["PRO", "Proverbs", "Prov", "OT"],
  ["ECC", "Ecclesiastes", "Eccl", "OT"],
  ["SNG", "Song of Solomon", "Song", "OT"],
  ["ISA", "Isaiah", "Isa", "OT"],
  ["JER", "Jeremiah", "Jer", "OT"],
  ["LAM", "Lamentations", "Lam", "OT"],
  ["EZK", "Ezekiel", "Ezek", "OT"],
  ["DAN", "Daniel", "Dan", "OT"],
  ["HOS", "Hosea", "Hos", "OT"],
  ["JOL", "Joel", "Joel", "OT"],
  ["AMO", "Amos", "Amos", "OT"],
  ["OBA", "Obadiah", "Obad", "OT"],
  ["JON", "Jonah", "Jonah", "OT"],
  ["MIC", "Micah", "Mic", "OT"],
  ["NAM", "Nahum", "Nah", "OT"],
  ["HAB", "Habakkuk", "Hab", "OT"],
  ["ZEP", "Zephaniah", "Zeph", "OT"],
  ["HAG", "Haggai", "Hag", "OT"],
  ["ZEC", "Zechariah", "Zech", "OT"],
  ["MAL", "Malachi", "Mal", "OT"],
  ["MAT", "Matthew", "Matt", "NT"],
  ["MRK", "Mark", "Mark", "NT"],
  ["LUK", "Luke", "Luke", "NT"],
  ["JHN", "John", "John", "NT"],
  ["ACT", "Acts", "Acts", "NT"],
  ["ROM", "Romans", "Rom", "NT"],
  ["1CO", "1 Corinthians", "1 Cor", "NT"],
  ["2CO", "2 Corinthians", "2 Cor", "NT"],
  ["GAL", "Galatians", "Gal", "NT"],
  ["EPH", "Ephesians", "Eph", "NT"],
  ["PHP", "Philippians", "Phil", "NT"],
  ["COL", "Colossians", "Col", "NT"],
  ["1TH", "1 Thessalonians", "1 Thess", "NT"],
  ["2TH", "2 Thessalonians", "2 Thess", "NT"],
  ["1TI", "1 Timothy", "1 Tim", "NT"],
  ["2TI", "2 Timothy", "2 Tim", "NT"],
  ["TIT", "Titus", "Titus", "NT"],
  ["PHM", "Philemon", "Phlm", "NT"],
  ["HEB", "Hebrews", "Heb", "NT"],
  ["JAS", "James", "Jas", "NT"],
  ["1PE", "1 Peter", "1 Pet", "NT"],
  ["2PE", "2 Peter", "2 Pet", "NT"],
  ["1JN", "1 John", "1 John", "NT"],
  ["2JN", "2 John", "2 John", "NT"],
  ["3JN", "3 John", "3 John", "NT"],
  ["JUD", "Jude", "Jude", "NT"],
  ["REV", "Revelation", "Rev", "NT"],
];

function extractRefs(raw) {
  const refs = [];
  const re = /\\ref\s+([^\\|]+)\|([^\\]+)\\ref\*/g;
  let m;
  while ((m = re.exec(raw))) refs.push(m[1].trim());
  return refs;
}

function pullFootnotes(raw) {
  const notes = [];
  const cleaned = raw.replace(/\\f\s[\s\S]*?\\f\*/g, (block) => {
    const fr = (block.match(/\\fr\s+([\d:.]+)/) || [])[1]?.trim() || "";
    const verseNum = fr.includes(":") ? Number(fr.split(":").pop()) : NaN;
    const text = block
      .replace(/\\f\s+\+\s*/, "")
      .replace(/\\fr\s+[^\\]+/, "")
      .replace(/\\ft\s+/g, "")
      .replace(/\\fqa\s+/g, "")
      .replace(/\\fq\s+/g, "")
      .replace(/\\fk\s+/g, "")
      .replace(/\\fv\s+/g, "")
      .replace(/\\ref\s+([^\\|]+)\|[^\\]+\\ref\*/g, "$1")
      .replace(/\\f\*/g, "")
      .replace(/\\[a-z0-9]+\*?\s*/gi, "")
      .replace(/\s+/g, " ")
      .trim();
    if (text) notes.push({ verseNum, text: fr ? `${fr} ${text}` : text });
    return " ";
  });
  return { cleaned, notes };
}

function cleanText(raw) {
  return raw
    .replace(/\\x\s[\s\S]*?\\x\*/g, " ")
    .replace(/\\wj\*?/g, "")
    .replace(/\\add\*?/g, "")
    .replace(/\\nd\*?/g, "")
    .replace(/\\qt\*?/g, "")
    .replace(/\\tl\*?/g, "")
    .replace(/\\bdit\*?/g, "")
    .replace(/\\it\*?/g, "")
    .replace(/\\bd\*?/g, "")
    .replace(/\\sc\*?/g, "")
    .replace(/\\w\s+([^|\\]+)(?:\|[^\\]+)?\\w\*/g, "$1")
    .replace(/\\ref\s+([^\\|]+)\|[^\\]+\\ref\*/g, "$1")
    .replace(/\\[a-z][a-z0-9]*\*?(?:\s+|$)/gi, " ")
    .replace(/\\\+/g, "")
    .replace(/\s+/g, " ")
    .replace(/^\s+|\s+$/g, "")
    .replace(/\s+([,.;:!?])/g, "$1");
}

function notesFor(verseNum, notes) {
  const matched = notes.filter((n) => n.verseNum === verseNum).map((n) => n.text);
  if (matched.length) return matched;
  if (notes.length && notes.every((n) => Number.isNaN(n.verseNum))) {
    return notes.map((n) => n.text);
  }
  return [];
}

function parseBook(source) {
  const chapters = [];
  let chapter = null;
  let pendingHeading = "";
  let pendingRefs = [];
  let poetry = false;
  let currentVerse = null;

  const pushChapter = (n) => {
    chapter = { n, v: [] };
    chapters.push(chapter);
    pendingHeading = "";
    pendingRefs = [];
    currentVerse = null;
    poetry = false;
  };

  const attachPending = (verse) => {
    if (pendingHeading) {
      verse.h = pendingHeading;
      pendingHeading = "";
    }
    if (pendingRefs.length) {
      verse.r = pendingRefs;
      pendingRefs = [];
    }
  };

  const addVerse = (n, text, isPoetry, isJesus, fns) => {
    if (!chapter) pushChapter(1);
    const existing = chapter.v.find((v) => v.n === n);
    if (existing) {
      if (text) existing.t = `${existing.t} ${text}`.replace(/\s+/g, " ").trim();
      if (isPoetry) existing.p = 1;
      if (isJesus) existing.j = 1;
      if (fns.length) existing.f = [...(existing.f || []), ...fns];
      currentVerse = existing;
      return;
    }
    const verse = { n, t: text };
    if (isPoetry) verse.p = 1;
    if (isJesus) verse.j = 1;
    if (fns.length) verse.f = fns;
    attachPending(verse);
    chapter.v.push(verse);
    currentVerse = verse;
  };

  const appendToCurrent = (text, isPoetry, isJesus, fns) => {
    if (!currentVerse) {
      if (text) addVerse(1, text, isPoetry, isJesus, fns);
      return;
    }
    if (!text) return;
    currentVerse.t = `${currentVerse.t} ${text}`.replace(/\s+/g, " ").trim();
    if (isPoetry) currentVerse.p = 1;
    if (isJesus) currentVerse.j = 1;
    if (fns.length) currentVerse.f = [...(currentVerse.f || []), ...fns];
  };

  const consumeVerses = (line, forcePoetry) => {
    const { cleaned, notes } = pullFootnotes(line);
    const isJesus = /\\wj/.test(line);
    const verseRe = /\\v\s+(\d+)(?:-\d+)?\s*/g;
    const starts = [];
    let vm;
    while ((vm = verseRe.exec(cleaned))) {
      starts.push({ n: Number(vm[1]), at: vm.index, end: vm.index + vm[0].length });
    }
    if (starts.length) {
      for (let i = 0; i < starts.length; i++) {
        const from = starts[i].end;
        const to = i + 1 < starts.length ? starts[i + 1].at : cleaned.length;
        const chunk = cleanText(cleaned.slice(from, to));
        const fns = notesFor(starts[i].n, notes);
        if (chunk || !chapter?.v.some((v) => v.n === starts[i].n)) {
          addVerse(starts[i].n, chunk, forcePoetry, isJesus, fns);
        }
      }
      return true;
    }
    const chunk = cleanText(cleaned);
    if (chunk) {
      const fns = notes.filter((n) => Number.isNaN(n.verseNum) || n.verseNum === currentVerse?.n).map((n) => n.text);
      appendToCurrent(chunk, forcePoetry, isJesus, fns);
      return true;
    }
    return false;
  };

  const lines = source.replace(/\r\n/g, "\n").split("\n");
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (
      line.startsWith("\\id ") ||
      line.startsWith("\\usfm") ||
      line.startsWith("\\h ") ||
      line.startsWith("\\toc") ||
      line.startsWith("\\mt") ||
      line.startsWith("\\ide")
    ) {
      continue;
    }

    const chapterMatch = line.match(/^\\c\s+(\d+)/);
    if (chapterMatch) {
      pushChapter(Number(chapterMatch[1]));
      continue;
    }

    if (/^\\ms\d?\s+/.test(line) && !/\\v\s+/.test(line)) {
      pendingHeading = cleanText(line.replace(/^\\ms\d?\s+/, ""));
      continue;
    }
    if (/^\\s[123]?\s+/.test(line) && !/\\v\s+/.test(line)) {
      const heading = cleanText(line.replace(/^\\s[123]?\s+/, ""));
      pendingHeading = pendingHeading ? `${pendingHeading} — ${heading}` : heading;
      continue;
    }
    if (/^\\r\s+/.test(line) && !/\\v\s+/.test(line)) {
      pendingRefs = extractRefs(line);
      if (!pendingRefs.length) {
        const plain = cleanText(line.replace(/^\\r\s+/, "").replace(/[()]/g, ""));
        if (plain) pendingRefs = plain.split(/;\s*/).map((s) => s.trim()).filter(Boolean);
      }
      continue;
    }
    if (line === "\\b") continue;

    if (/^\\q/.test(line)) poetry = true;
    else if (/^\\p/.test(line) || line.startsWith("\\m") || line.startsWith("\\pi") || line.startsWith("\\li")) {
      poetry = false;
    }

    const isDesc = /^\\d\b/.test(line);
    consumeVerses(line, poetry || isDesc);
    if (isDesc && currentVerse && !currentVerse.d) {
      const desc = currentVerse.t;
      if (desc && desc.length < 80) currentVerse.d = desc;
    }
  }

  for (const ch of chapters) {
    ch.v.sort((a, b) => a.n - b.n);
  }
  return chapters.filter((c) => c.v.length);
}

mkdirSync(join(OUT_DIR, "books"), { recursive: true });

const bible = {};
const meta = [];
let verseCount = 0;
let headingCount = 0;
let jesusCount = 0;
let poetryCount = 0;
let footnoteCount = 0;
let refCount = 0;

for (const [id, name, abbr, testament] of BOOKS) {
  const source = readFileSync(join(USFM_DIR, `${id}.usfm`), "utf8");
  const chapters = parseBook(source);
  bible[id] = chapters;
  writeFileSync(join(OUT_DIR, "books", `${id}.json`), JSON.stringify(chapters));
  const verses = chapters.reduce((n, c) => n + c.v.length, 0);
  verseCount += verses;
  for (const ch of chapters) {
    for (const v of ch.v) {
      if (v.h) headingCount++;
      if (v.j) jesusCount++;
      if (v.p) poetryCount++;
      if (v.f) footnoteCount += v.f.length;
      if (v.r) refCount += v.r.length;
    }
  }
  meta.push({ id, name, abbr, t: testament, chapters: chapters.length, verses });
}

const payload = { meta, books: bible };
const json = JSON.stringify(payload);
writeFileSync(join(OUT_DIR, "bsb.json"), json);
writeFileSync(join(OUT_DIR, "meta.json"), JSON.stringify({ meta }));

const psa23 = bible.PSA.find((c) => c.n === 23);
console.log(
  JSON.stringify(
    {
      books: meta.length,
      verses: verseCount,
      headings: headingCount,
      jesusVerses: jesusCount,
      poetryVerses: poetryCount,
      footnotes: footnoteCount,
      parallelRefs: refCount,
      bytes: json.length,
      genesisCh1v1: bible.GEN[0].v[0],
      johnCh1v1: bible.JHN[0].v[0],
      johnCh1v5: bible.JHN[0].v[4],
      psalm23: psa23,
    },
    null,
    2,
  ),
);
