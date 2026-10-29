import type { BibleData, ParsedRef } from "./types";
import { resolveBookAlias } from "./aliases";

const REF_RE =
  /^((?:(?:1|2|3|i{1,3}|first|second|third)\s+)?[a-z][a-z']+(?:\s+of\s+[a-z]+)?)\s+(\d+)(?:\s*[:.]\s*(\d+))?(?:\s*[-–—]\s*(\d+))?/i;

export function bookName(data: BibleData, id: string): string {
  return data.meta.find((b) => b.id === id)?.name ?? id;
}

export function formatRef(
  data: BibleData,
  book: string,
  chapter: number,
  verse?: number,
  endVerse?: number,
): string {
  const name = bookName(data, book);
  if (!verse) return `${name} ${chapter}`;
  if (endVerse && endVerse !== verse) return `${name} ${chapter}:${verse}–${endVerse}`;
  return `${name} ${chapter}:${verse}`;
}

export function verseId(book: string, chapter: number, verse: number): string {
  return `${book}.${chapter}.${verse}`;
}

export function parseVerseId(id: string): { book: string; chapter: number; verse: number } | null {
  const parts = id.split(".");
  if (parts.length < 3) return null;
  const book = parts[0]!;
  const chapter = Number(parts[1]);
  const verse = Number(parts[2]);
  if (!book || !chapter || !verse) return null;
  return { book, chapter, verse };
}

export function parseRef(query: string, data: BibleData): ParsedRef | null {
  const trimmed = query.trim();
  const match = trimmed.match(REF_RE);
  if (!match) return null;
  const book = resolveBookAlias(match[1] ?? "");
  if (!book) return null;
  const meta = data.meta.find((b) => b.id === book);
  if (!meta) return null;
  const chapter = Number(match[2]);
  if (chapter < 1 || chapter > meta.chapters) return null;
  const verse = match[3] ? Number(match[3]) : undefined;
  const tail = match[4] ? Number(match[4]) : undefined;
  let endVerse: number | undefined;
  let endChapter: number | undefined;
  if (tail != null) {
    if (verse != null && tail >= verse) endVerse = tail;
    else if (verse == null && tail >= chapter) endChapter = tail;
  }
  return {
    book,
    chapter,
    verse,
    endVerse,
    endChapter,
    label: formatRef(data, book, chapter, verse, endVerse),
  };
}

export function chapterOf(data: BibleData, book: string, chapter: number) {
  return data.books[book]?.find((c) => c.n === chapter) ?? null;
}

export function adjacentChapter(
  data: BibleData,
  book: string,
  chapter: number,
  dir: -1 | 1,
): { book: string; chapter: number } | null {
  const books = data.meta;
  const bookIndex = books.findIndex((b) => b.id === book);
  if (bookIndex < 0) return null;
  const current = books[bookIndex]!;
  const nextChapter = chapter + dir;
  if (nextChapter >= 1 && nextChapter <= current.chapters) {
    return { book, chapter: nextChapter };
  }
  const nextBook = books[bookIndex + dir];
  if (!nextBook) return null;
  return {
    book: nextBook.id,
    chapter: dir === 1 ? 1 : nextBook.chapters,
  };
}

export function chapterOrdinal(data: BibleData, book: string, chapter: number): {
  position: number;
  total: number;
} {
  let position = 0;
  let total = 0;
  for (const meta of data.meta) {
    total += meta.chapters;
    if (meta.id === book) position = total - meta.chapters + chapter;
    else if (position === 0) {
      /* still before current book */
    }
  }
  return { position, total };
}
