import { useEffect, useMemo, useState } from "react";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import type { BibleData, Verse } from "@/lib/bible/types";
import { adjacentChapter, chapterOf, chapterOrdinal, verseId } from "@/lib/bible/parse-ref";
import { useBible } from "@/lib/bible/context";
import { BOOK_INTROS } from "@/lib/bible/intros";
import { chapterSpeech } from "@/lib/speech";
import { useAppStore } from "@/lib/store";
import { BookPicker } from "./book-picker";
import { VerseSheet } from "./verse-sheet";
import { AudioBar } from "./audio-bar";
import { cn } from "@/lib/cn";

export function ReaderView({ data }: { data: BibleData }) {
  const book = useAppStore((s) => s.book);
  const chapter = useAppStore((s) => s.chapter);
  const focusVerse = useAppStore((s) => s.focusVerse);
  const jumpTo = useAppStore((s) => s.jumpTo);
  const clearFocus = useAppStore((s) => s.clearFocus);
  const highlights = useAppStore((s) => s.highlights);
  const bookmarks = useAppStore((s) => s.bookmarks);
  const listened = useAppStore((s) => s.listened);
  const markListened = useAppStore((s) => s.markListened);
  const fontSize = useAppStore((s) => s.fontSize);
  const lineHeight = useAppStore((s) => s.lineHeight);
  const showJesus = useAppStore((s) => s.showJesus);
  const showHeadings = useAppStore((s) => s.showHeadings);
  const speechRate = useAppStore((s) => s.speechRate);

  const { ensureBook } = useBible();
  const [picker, setPicker] = useState(false);
  const [active, setActive] = useState<Verse | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const ch = chapterOf(data, book, chapter);
  const meta = data.meta.find((b) => b.id === book);
  const ordinal = chapterOrdinal(data, book, chapter);
  const verses = ch?.v ?? [];
  const parts = useMemo(
    () => verses.map((v) => ({ id: verseId(book, chapter, v.n), text: v.t })),
    [verses, book, chapter],
  );
  const heading = verses.find((v) => v.h)?.h;
  const intro = BOOK_INTROS[book];

  useEffect(() => {
    void ensureBook(book);
  }, [book, ensureBook]);

  useEffect(() => {
    chapterSpeech.setRate(speechRate);
  }, [speechRate]);

  useEffect(() => {
    return chapterSpeech.subscribe((h) => setSpeakingId(h.verseId));
  }, []);

  useEffect(() => {
    if (!focusVerse) return;
    const el = document.getElementById(`v-${focusVerse}`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
    const t = window.setTimeout(() => clearFocus(), 2400);
    return () => window.clearTimeout(t);
  }, [book, chapter, focusVerse, clearFocus]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        const next = adjacentChapter(data, book, chapter, 1);
        if (next) {
          chapterSpeech.stop();
          jumpTo(next.book, next.chapter);
        }
      } else if (e.key === "ArrowLeft") {
        const prev = adjacentChapter(data, book, chapter, -1);
        if (prev) {
          chapterSpeech.stop();
          jumpTo(prev.book, prev.chapter);
        }
      } else if (e.key === " ") {
        e.preventDefault();
        chapterSpeech.toggle(parts);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data, book, chapter, jumpTo, parts]);

  const go = (dir: -1 | 1) => {
    const next = adjacentChapter(data, book, chapter, dir);
    if (!next) return;
    chapterSpeech.stop();
    jumpTo(next.book, next.chapter);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
        <button
          type="button"
          onClick={() => setPicker(true)}
          className="min-h-11 flex-1 rounded-[var(--radius-md)] px-3 py-2 text-left hover:bg-bg"
        >
          <span className="block font-display text-base font-medium tracking-tight">
            {meta?.name ?? book} {chapter}
          </span>
          <span className="text-xs text-muted">Berean Standard Bible · tap to change</span>
        </button>
        <span className="hidden pr-2 text-xs tabular-nums text-muted sm:block">
          {ordinal.position} / {ordinal.total}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <article className="mx-auto w-full max-w-[40rem] px-5 pb-16 pt-8 sm:px-8">
          {showHeadings && heading ? (
            <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {heading}
            </p>
          ) : null}
          <h1 className="text-center font-display text-3xl font-medium tracking-tight text-balance">
            {meta?.name} {chapter}
          </h1>
          <p className="mt-2 text-center text-sm text-muted">
            {meta?.t === "OT" ? "Old Testament" : "New Testament"} · chapter {chapter} of {meta?.chapters}
          </p>
          {chapter === 1 && intro ? (
            <p className="mx-auto mt-6 max-w-prose text-center text-sm leading-relaxed text-muted text-pretty">
              {intro}
            </p>
          ) : null}

          <div
            className="mt-8"
            style={{ fontSize: `${fontSize}px`, lineHeight }}
          >
            {verses.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted">Opening this chapter…</p>
            ) : null}
            {verses.map((v, i) => {
              const id = verseId(book, chapter, v.n);
              const isFocus = focusVerse === v.n;
              const isSpeak = speakingId === id;
              return (
                <div key={id}>
                  {showHeadings && v.h && i > 0 ? (
                    <h2 className="mb-3 mt-8 text-center font-display text-[0.95em] font-medium tracking-tight text-accent">
                      {v.h}
                    </h2>
                  ) : null}
                  {v.d ? (
                    <p className="mb-3 text-center text-[0.72em] italic text-muted">{v.d}</p>
                  ) : null}
                  <p
                    id={`v-${v.n}`}
                    onClick={() => setActive(v)}
                    className={cn(
                      "relative cursor-pointer rounded-[var(--radius-sm)] px-2 py-1.5 font-scripture text-pretty",
                      v.p ? "pl-6" : "",
                      highlights.includes(id) ? "bg-highlight" : "",
                      isSpeak ? "bg-highlight/70 ring-1 ring-accent/40" : "",
                      isFocus ? "ring-1 ring-accent/50" : "",
                    )}
                  >
                    {bookmarks.includes(id) ? (
                      <Bookmark className="absolute -left-0.5 top-2 size-3 fill-accent text-accent" />
                    ) : null}
                    <sup className="mr-1.5 select-none align-super text-[0.66em] font-semibold text-accent tabular-nums">
                      {v.n}
                    </sup>
                    <span className={cn(showJesus && v.j ? "text-jesus" : "text-fg")}>
                      {v.d && v.t.startsWith(v.d) ? v.t.slice(v.d.length).trim() : v.t}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-12 flex-1 items-center justify-center gap-1 rounded-[var(--radius-md)] bg-surface text-sm text-fg shadow-[var(--shadow-border)]"
              aria-label="Previous chapter"
            >
              <ChevronLeft className="size-5" />
              Previous
            </button>
            <p className="min-w-16 text-center text-xs tabular-nums text-muted">
              {ordinal.position}
              <span className="block text-[10px] uppercase tracking-wider">of {ordinal.total}</span>
            </p>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-12 flex-1 items-center justify-center gap-1 rounded-[var(--radius-md)] bg-surface text-sm text-fg shadow-[var(--shadow-border)]"
              aria-label="Next chapter"
            >
              Next
              <ChevronRight className="size-5" />
            </button>
          </div>
        </article>
      </div>

      <AudioBar parts={parts} listened={listened} onListened={markListened} />

      <BookPicker
        open={picker}
        data={data}
        book={book}
        chapter={chapter}
        onClose={() => setPicker(false)}
        onSelect={(b, c) => {
          chapterSpeech.stop();
          jumpTo(b, c);
          setPicker(false);
        }}
      />
      <VerseSheet
        open={!!active}
        data={data}
        book={book}
        chapter={chapter}
        verse={active}
        onClose={() => setActive(null)}
        onListen={() => {
          if (!active) return;
          const idx = verses.findIndex((v) => v.n === active.n);
          chapterSpeech.start(parts, Math.max(0, idx));
          setActive(null);
        }}
        onJumpRef={(b, c, v) => {
          setActive(null);
          chapterSpeech.stop();
          jumpTo(b, c, v);
        }}
      />
    </div>
  );
}


