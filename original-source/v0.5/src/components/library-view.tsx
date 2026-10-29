import { useMemo, useState } from "react";
import type { BibleData } from "@/lib/bible/types";
import { formatRef, parseVerseId } from "@/lib/bible/parse-ref";
import { useAppStore } from "@/lib/store";
import { chapterSpeech } from "@/lib/speech";
import { cn } from "@/lib/cn";

type Tab = "notes" | "highlights" | "bookmarks";

export function LibraryView({ data, onOpenReader }: { data: BibleData; onOpenReader: () => void }) {
  const [tab, setTab] = useState<Tab>("notes");
  const notes = useAppStore((s) => s.notes);
  const highlights = useAppStore((s) => s.highlights);
  const bookmarks = useAppStore((s) => s.bookmarks);
  const setNote = useAppStore((s) => s.setNote);
  const jumpTo = useAppStore((s) => s.jumpTo);
  const [general, setGeneral] = useState(notes.GENERAL ?? "");

  const go = (id: string) => {
    const loc = parseVerseId(id);
    if (!loc) return;
    chapterSpeech.stop();
    jumpTo(loc.book, loc.chapter, loc.verse);
    onOpenReader();
  };

  const verseNotes = useMemo(
    () =>
      Object.entries(notes)
        .filter(([k, v]) => k !== "GENERAL" && v.trim())
        .map(([id, text]) => ({ id, text, loc: parseVerseId(id) })),
    [notes],
  );

  const listFor = (ids: string[]) =>
    ids
      .map((id) => {
        const loc = parseVerseId(id);
        if (!loc) return null;
        const verse = data.books[loc.book]?.find((c) => c.n === loc.chapter)?.v.find((v) => v.n === loc.verse);
        if (!verse) return null;
        return { id, loc, text: verse.t };
      })
      .filter(Boolean) as Array<{ id: string; loc: { book: string; chapter: number; verse: number }; text: string }>;

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-4 py-5 pb-12">
      <h1 className="font-display text-2xl font-medium tracking-tight">Library</h1>
      <p className="mt-1 text-sm text-muted">Notes, highlights, and bookmarks stay on this device.</p>
      <div className="mt-5 flex gap-1 rounded-full bg-surface p-1 shadow-[var(--shadow-border)]">
        {(["notes", "highlights", "bookmarks"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              "h-10 flex-1 rounded-full text-sm capitalize",
              tab === key ? "bg-accent text-accent-fg" : "text-muted",
            )}
          >
            {key}
          </button>
        ))}
      </div>

      {tab === "notes" ? (
        <div className="mt-6 space-y-4">
          <label className="block text-sm text-muted" htmlFor="general-note">
            General notebook
          </label>
          <textarea
            id="general-note"
            value={general}
            onChange={(e) => setGeneral(e.target.value)}
            rows={8}
            placeholder="Write study notes here…"
            className="w-full rounded-[var(--radius-lg)] bg-surface px-4 py-3 text-sm leading-relaxed shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-accent/60"
          />
          <button
            type="button"
            onClick={() => setNote("GENERAL", general)}
            className="h-11 w-full rounded-[var(--radius-md)] bg-accent text-sm font-medium text-accent-fg"
          >
            Save notebook
          </button>
          <h2 className="pt-4 text-xs font-medium uppercase tracking-[0.14em] text-accent">Verse notes</h2>
          {verseNotes.length === 0 ? (
            <p className="text-sm text-muted">Tap a verse while reading to attach a private note.</p>
          ) : (
            verseNotes.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => go(n.id)}
                className="block w-full rounded-[var(--radius-md)] bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]"
              >
                <span className="text-sm font-medium text-accent">
                  {n.loc ? formatRef(data, n.loc.book, n.loc.chapter, n.loc.verse) : n.id}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-fg">{n.text}</span>
              </button>
            ))
          )}
        </div>
      ) : null}

      {tab === "highlights" ? (
        <IdList
          empty="Highlighted verses will collect here."
          items={listFor(highlights)}
          data={data}
          onOpen={go}
        />
      ) : null}
      {tab === "bookmarks" ? (
        <IdList
          empty="Bookmark a verse to return to it later."
          items={listFor(bookmarks)}
          data={data}
          onOpen={go}
        />
      ) : null}
    </div>
  );
}

function IdList({
  empty,
  items,
  data,
  onOpen,
}: {
  empty: string;
  items: Array<{ id: string; loc: { book: string; chapter: number; verse: number }; text: string }>;
  data: BibleData;
  onOpen: (id: string) => void;
}) {
  if (items.length === 0) return <p className="mt-8 text-sm text-muted">{empty}</p>;
  return (
    <ul className="mt-6 space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onOpen(item.id)}
            className="w-full rounded-[var(--radius-md)] bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]"
          >
            <span className="text-sm font-medium text-accent">
              {formatRef(data, item.loc.book, item.loc.chapter, item.loc.verse)}
            </span>
            <span className="mt-1 block font-scripture text-[15px] leading-relaxed">{item.text}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
