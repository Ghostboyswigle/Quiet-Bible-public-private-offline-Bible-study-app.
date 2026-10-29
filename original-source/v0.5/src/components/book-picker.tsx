import { useMemo, useState } from "react";
import type { BibleData } from "@/lib/bible/types";
import { Overlay } from "./ui/overlay";
import { cn } from "@/lib/cn";

export function BookPicker({
  open,
  data,
  book,
  chapter,
  onClose,
  onSelect,
}: {
  open: boolean;
  data: BibleData;
  book: string;
  chapter: number;
  onClose: () => void;
  onSelect: (book: string, chapter: number) => void;
}) {
  const [step, setStep] = useState<"book" | "chapter">("book");
  const [pending, setPending] = useState(book);
  const [testament, setTestament] = useState<"OT" | "NT">(
    data.meta.find((b) => b.id === book)?.t ?? "OT",
  );

  const books = useMemo(
    () => data.meta.filter((b) => b.t === testament),
    [data.meta, testament],
  );
  const meta = data.meta.find((b) => b.id === pending);

  return (
    <Overlay
      open={open}
      title={step === "book" ? "Choose a book" : meta?.name ?? "Chapter"}
      onClose={() => {
        setStep("book");
        onClose();
      }}
      wide
    >
      {step === "book" ? (
        <>
          <div className="mb-4 flex gap-2">
            {(["OT", "NT"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTestament(t)}
                className={cn(
                  "h-10 flex-1 rounded-full text-sm font-medium",
                  testament === t ? "bg-accent text-accent-fg" : "bg-bg text-muted",
                )}
              >
                {t === "OT" ? "Old Testament" : "New Testament"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {books.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setPending(b.id);
                  setStep("chapter");
                }}
                className={cn(
                  "min-h-11 rounded-[var(--radius-md)] px-3 py-2 text-left text-sm",
                  b.id === book ? "bg-accent text-accent-fg" : "bg-bg text-fg hover:bg-highlight/40",
                )}
              >
                <span className="block font-medium">{b.name}</span>
                <span className={cn("text-xs", b.id === book ? "text-accent-fg/70" : "text-muted")}>
                  {b.chapters} chapters
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setStep("book")}
            className="mb-4 text-sm text-muted hover:text-fg"
          >
            All books
          </button>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
            {Array.from({ length: meta?.chapters ?? 0 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  onSelect(pending, n);
                  setStep("book");
                }}
                className={cn(
                  "flex h-11 items-center justify-center rounded-[var(--radius-sm)] text-sm tabular-nums",
                  pending === book && n === chapter
                    ? "bg-accent text-accent-fg"
                    : "bg-bg text-fg hover:bg-highlight/40",
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </>
      )}
    </Overlay>
  );
}
