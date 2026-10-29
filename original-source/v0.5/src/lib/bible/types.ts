export type Testament = "OT" | "NT";

export interface Verse {
  n: number;
  t: string;
  p?: 1;
  j?: 1;
  h?: string;
  d?: string;
  r?: string[];
  f?: string[];
}

export interface Chapter {
  n: number;
  v: Verse[];
}

export interface BookMeta {
  id: string;
  name: string;
  abbr: string;
  t: Testament;
  chapters: number;
  verses: number;
}

export interface BibleData {
  meta: BookMeta[];
  books: Record<string, Chapter[]>;
}

export interface Location {
  book: string;
  chapter: number;
  verse?: number;
}

export interface ParsedRef {
  book: string;
  chapter: number;
  verse?: number;
  endVerse?: number;
  endChapter?: number;
  label: string;
}

export interface SearchHit {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  name: string;
  text: string;
  kind: "reference" | "phrase" | "words";
}
