import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { bundledRead, isNativeApp } from "@/lib/native-bridge";
import type { BibleData, BookMeta, Chapter } from "./types";
import bootstrap from "./bootstrap.json";

const BOOTSTRAP = bootstrap as BibleData;

interface BibleContextValue {
  data: BibleData;
  error: string | null;
  loading: boolean;
  complete: boolean;
  ensureBook: (id: string) => Promise<void>;
}

const BibleContext = createContext<BibleContextValue>({
  data: BOOTSTRAP,
  error: null,
  loading: false,
  complete: false,
  ensureBook: async () => {},
});

function savedBook(): string {
  try {
    const raw = localStorage.getItem("quiet-bible-web-v1");
    if (!raw) return "GEN";
    const parsed = JSON.parse(raw) as { state?: { book?: string } };
    return parsed.state?.book || "GEN";
  } catch {
    return "GEN";
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const bundled = bundledRead(url);
  if (bundled != null) return JSON.parse(bundled) as T;
  const path = url.startsWith("/") ? url : `/${url}`;
  const res = await fetch(path);
  if (!res.ok) throw new Error("The Bible text could not be opened.");
  return res.json() as Promise<T>;
}

async function loadFromBooks(): Promise<BibleData> {
  const meta = await fetchJson<BookMeta[]>("/bible/meta.json");
  const books: Record<string, Chapter[]> = { ...BOOTSTRAP.books };
  for (const book of meta) {
    try {
      books[book.id] = await fetchJson<Chapter[]>(`/bible/books/${book.id}.json`);
    } catch {
      /* keep going — bootstrap/partial text is better than a blank screen */
    }
  }
  return { meta, books };
}

export function BibleProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BibleData>(BOOTSTRAP);
  const [error, setError] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const dataRef = useRef<BibleData>(BOOTSTRAP);
  const inflight = useRef<Record<string, Promise<void>>>({});

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const ensureBook = useCallback(async (id: string) => {
    const existing = dataRef.current.books[id];
    if (existing && (id !== "GEN" || existing.length > 1)) return;
    if (!inflight.current[id]) {
      inflight.current[id] = fetchJson<Chapter[]>(`/bible/books/${id}.json`)
        .then((chapters) => {
          setData((prev) => ({ ...prev, books: { ...prev.books, [id]: chapters } }));
        })
        .finally(() => {
          delete inflight.current[id];
        });
    }
    await inflight.current[id];
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const bookId = savedBook();
        await ensureBook(bookId);
        const native = isNativeApp();
        if (native) {
          const full = await loadFromBooks();
          if (cancelled) return;
          dataRef.current = full;
          setData(full);
          setComplete(true);
          return;
        }
        const full = await fetchJson<BibleData>("/bible/bsb.json");
        if (cancelled) return;
        dataRef.current = full;
        setData(full);
        setComplete(true);
      } catch (err: unknown) {
        if (cancelled) return;
        // Native/file builds still have Genesis from bootstrap — keep the reader usable.
        if (isNativeApp() || dataRef.current.books.GEN) {
          setComplete(true);
          return;
        }
        setError(err instanceof Error ? err.message : "The Bible text could not be opened.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ensureBook]);

  return (
    <BibleContext.Provider value={{ data, error, loading: false, complete, ensureBook }}>
      {children}
    </BibleContext.Provider>
  );
}

export function useBible(): BibleContextValue {
  return useContext(BibleContext);
}
