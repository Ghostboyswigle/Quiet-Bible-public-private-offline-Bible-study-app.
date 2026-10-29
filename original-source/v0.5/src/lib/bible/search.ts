import type { BibleData, SearchHit } from "./types";
import { parseRef, verseId } from "./parse-ref";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

export function searchBible(data: BibleData, rawQuery: string, limit = 80): SearchHit[] {
  const query = rawQuery.trim();
  if (!query) return [];
  const hits: SearchHit[] = [];
  const seen = new Set<string>();

  const ref = parseRef(query, data);
  if (ref) {
    const chapter = data.books[ref.book]?.find((c) => c.n === ref.chapter);
    if (chapter) {
      const verses = ref.verse
        ? chapter.v.filter((v) => {
            const end = ref.endVerse ?? ref.verse!;
            return v.n >= ref.verse! && v.n <= end;
          })
        : chapter.v.slice(0, 3);
      for (const v of verses) {
        const id = verseId(ref.book, ref.chapter, v.n);
        seen.add(id);
        hits.push({
          id,
          book: ref.book,
          chapter: ref.chapter,
          verse: v.n,
          name: data.meta.find((b) => b.id === ref.book)?.name ?? ref.book,
          text: v.t,
          kind: "reference",
        });
      }
    }
  }

  const needle = query.toLowerCase();
  const words = tokenize(query);
  const phraseHits: SearchHit[] = [];
  const wordHits: SearchHit[] = [];

  for (const meta of data.meta) {
    const chapters = data.books[meta.id] ?? [];
    for (const ch of chapters) {
      for (const v of ch.v) {
        const id = verseId(meta.id, ch.n, v.n);
        if (seen.has(id)) continue;
        const hay = v.t.toLowerCase();
        const rec: SearchHit = {
          id,
          book: meta.id,
          chapter: ch.n,
          verse: v.n,
          name: meta.name,
          text: v.t,
          kind: "phrase",
        };
        if (hay.includes(needle) && needle.length > 2) {
          phraseHits.push(rec);
        } else if (words.length > 0) {
          const tokens = tokenize(v.t);
          const set = new Set(tokens);
          if (words.every((w) => set.has(w))) {
            wordHits.push({ ...rec, kind: "words" });
          }
        }
        if (phraseHits.length + wordHits.length + hits.length >= limit * 3) break;
      }
    }
  }

  for (const hit of [...phraseHits, ...wordHits]) {
    if (hits.length >= limit) break;
    if (seen.has(hit.id)) continue;
    seen.add(hit.id);
    hits.push(hit);
  }
  return hits.slice(0, limit);
}

export function snippet(text: string, query: string, radius = 90): string {
  const hay = text.toLowerCase();
  const needle = query.trim().toLowerCase();
  if (!needle) return text;
  const at = hay.indexOf(needle);
  if (at < 0) return text.length > 180 ? `${text.slice(0, 177)}…` : text;
  const start = Math.max(0, at - 24);
  const end = Math.min(text.length, at + needle.length + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return prefix + text.slice(start, end) + suffix;
}
