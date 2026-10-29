import { useState } from "react";
import { Bookmark, Copy, Highlighter, NotebookPen, Volume2 } from "lucide-react";
import type { BibleData, Verse } from "@/lib/bible/types";
import { formatRef, verseId } from "@/lib/bible/parse-ref";
import { parseRef } from "@/lib/bible/parse-ref";
import { BOOK_INTROS } from "@/lib/bible/intros";
import { useAppStore } from "@/lib/store";
import { Overlay } from "./ui/overlay";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

export function VerseSheet({
  open,
  data,
  book,
  chapter,
  verse,
  onClose,
  onListen,
  onJumpRef,
}: {
  open: boolean;
  data: BibleData;
  book: string;
  chapter: number;
  verse: Verse | null;
  onClose: () => void;
  onListen: () => void;
  onJumpRef: (book: string, chapter: number, verse?: number) => void;
}) {
  const highlights = useAppStore((s) => s.highlights);
  const bookmarks = useAppStore((s) => s.bookmarks);
  const notes = useAppStore((s) => s.notes);
  const toggleHighlight = useAppStore((s) => s.toggleHighlight);
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const setNote = useAppStore((s) => s.setNote);
  const [draft, setDraft] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);

  if (!verse) return null;
  const id = verseId(book, chapter, verse.n);
  const ref = formatRef(data, book, chapter, verse.n);
  const highlighted = highlights.includes(id);
  const bookmarked = bookmarks.includes(id);
  const existing = notes[id] ?? "";
  const intro = verse.n === 1 ? BOOK_INTROS[book] : undefined;

  return (
    <Overlay open={open} title={ref} onClose={onClose}>
      <p className="font-scripture text-lg leading-relaxed text-pretty">
        {verse.t}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button
          variant={highlighted ? "primary" : "secondary"}
          onClick={() => toggleHighlight(id)}
        >
          <Highlighter className="size-4" />
          {highlighted ? "Highlighted" : "Highlight"}
        </Button>
        <Button
          variant={bookmarked ? "primary" : "secondary"}
          onClick={() => toggleBookmark(id)}
        >
          <Bookmark className="size-4" />
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
        <Button
          onClick={() => {
            setDraft(existing);
            setNoteOpen(true);
          }}
        >
          <NotebookPen className="size-4" />
          {existing ? "Edit note" : "Private note"}
        </Button>
        <Button onClick={onListen}>
          <Volume2 className="size-4" />
          Read aloud
        </Button>
      </div>
      <Button
        className="mt-2 w-full"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(`${ref} — ${verse.t} (BSB)`);
            toast("Verse copied");
          } catch {
            toast("Copy is not available here");
          }
        }}
      >
        <Copy className="size-4" />
        Copy verse
      </Button>

      {noteOpen ? (
        <div className="mt-5">
          <label className="mb-2 block text-sm text-muted" htmlFor="verse-note">
            Note stays on this device
          </label>
          <textarea
            id="verse-note"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            className="w-full rounded-[var(--radius-md)] bg-bg px-3 py-3 text-sm leading-relaxed text-fg shadow-[var(--shadow-border)] outline-none focus:ring-2 focus:ring-accent/60"
          />
          <div className="mt-3 flex gap-2">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                setNote(id, draft);
                setNoteOpen(false);
                toast("Note saved");
              }}
            >
              Save note
            </Button>
            <Button className="flex-1" onClick={() => setNoteOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : existing ? (
        <p className="mt-5 rounded-[var(--radius-md)] bg-bg px-4 py-3 text-sm leading-relaxed text-muted">
          {existing}
        </p>
      ) : null}

      {verse.d ? (
        <StudyBlock title="Superscription">{verse.d}</StudyBlock>
      ) : null}
      {verse.r && verse.r.length > 0 ? (
        <StudyBlock title="Parallel passages">
          <div className="flex flex-wrap gap-2">
            {verse.r.map((label) => (
              <RefChip key={label} label={label} data={data} onJump={onJumpRef} />
            ))}
          </div>
        </StudyBlock>
      ) : null}
      {verse.f && verse.f.length > 0 ? (
        <StudyBlock title="Translator notes">
          <ul className="space-y-2">
            {verse.f.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </StudyBlock>
      ) : null}
      {intro ? <StudyBlock title="About this book">{intro}</StudyBlock> : null}
    </Overlay>
  );
}

function StudyBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 border-t border-border pt-4">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-accent">{title}</h3>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function RefChip({
  label,
  data,
  onJump,
}: {
  label: string;
  data: BibleData;
  onJump: (book: string, chapter: number, verse?: number) => void;
}) {
  const parsed = parseRef(label, data);
  return (
    <button
      type="button"
      onClick={() => {
        if (parsed) onJump(parsed.book, parsed.chapter, parsed.verse);
      }}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm",
        parsed ? "bg-bg text-fg hover:bg-highlight/50" : "bg-bg text-muted",
      )}
    >
      {label}
    </button>
  );
}
