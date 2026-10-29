import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { BibleData } from "@/lib/bible/types";
import { parseRef } from "@/lib/bible/parse-ref";
import { searchBible, snippet } from "@/lib/bible/search";
import { useAppStore } from "@/lib/store";
import { chapterSpeech } from "@/lib/speech";

export function SearchView({ data, onOpenReader }: { data: BibleData; onOpenReader: () => void }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const jumpTo = useAppStore((s) => s.jumpTo);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query), 180);
    return () => window.clearTimeout(t);
  }, [query]);

  const ref = useMemo(() => parseRef(query, data), [query, data]);
  const hits = useMemo(
    () => (debounced.trim().length < 2 ? [] : searchBible(data, debounced, 80)),
    [data, debounced],
  );

  const go = (book: string, chapter: number, verse?: number) => {
    chapterSpeech.stop();
    jumpTo(book, chapter, verse);
    onOpenReader();
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-hidden px-4 py-5">
      <h1 className="font-display text-2xl font-medium tracking-tight">Search</h1>
      <p className="mt-1 text-sm text-muted">Find a reference or a phrase. Everything stays on this device.</p>
      <label className="relative mt-5 block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="John 3:16 or a word or phrase"
          className="h-12 w-full rounded-[var(--radius-md)] bg-surface pl-10 pr-3 text-base text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-muted focus:ring-2 focus:ring-accent/60"
        />
      </label>

      {ref ? (
        <button
          type="button"
          onClick={() => go(ref.book, ref.chapter, ref.verse)}
          className="mt-4 rounded-[var(--radius-lg)] bg-accent px-4 py-3 text-left text-accent-fg"
        >
          <span className="block text-xs uppercase tracking-[0.14em] opacity-80">Go to reference</span>
          <span className="font-display text-lg">{ref.label}</span>
        </button>
      ) : null}

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pb-8">
        {debounced.trim().length >= 2 && hits.length === 0 ? (
          <p className="py-8 text-sm text-muted">No verses matched that search.</p>
        ) : (
          <ul className="space-y-2">
            {hits.map((hit) => (
              <li key={hit.id}>
                <button
                  type="button"
                  onClick={() => go(hit.book, hit.chapter, hit.verse)}
                  className="w-full rounded-[var(--radius-md)] bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
                >
                  <span className="text-sm font-medium text-accent">
                    {hit.name} {hit.chapter}:{hit.verse}
                  </span>
                  <span className="mt-1 block font-scripture text-[15px] leading-relaxed text-fg">
                    {snippet(hit.text, debounced)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
