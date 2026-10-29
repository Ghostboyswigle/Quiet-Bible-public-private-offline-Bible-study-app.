import "../src/styles.css";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BookOpen, Bookmark, CalendarDays, Search, Settings } from "lucide-react";
import { Toaster } from "sonner";
import { BibleGate } from "@/components/gate";
import { LibraryView } from "@/components/library-view";
import { PlansView } from "@/components/plans-view";
import { ReaderView } from "@/components/reader-view";
import { SearchView } from "@/components/search-view";
import { SettingsView } from "@/components/settings-view";
import { ThemeSync } from "@/components/theme-sync";
import { BibleProvider, useBible } from "@/lib/bible/context";
import { cn } from "@/lib/cn";

type Tab = "read" | "search" | "library" | "plans" | "settings";

const TABS: Array<{ id: Tab; label: string; icon: typeof BookOpen }> = [
  { id: "read", label: "Read", icon: BookOpen },
  { id: "search", label: "Search", icon: Search },
  { id: "library", label: "Library", icon: Bookmark },
  { id: "plans", label: "Plans", icon: CalendarDays },
  { id: "settings", label: "Settings", icon: Settings },
];

function Shell() {
  const [tab, setTab] = useState<Tab>("read");
  const { data } = useBible();
  const openReader = () => setTab("read");

  return (
    <div className="flex h-dvh flex-col bg-bg text-fg">
      <header className="flex items-center gap-3 border-b border-border bg-surface px-4 py-2.5">
        <img
          src="./quiet-bible-icon.png"
          alt=""
          width={36}
          height={36}
          className="size-9 rounded-[10px] object-cover outline outline-1 -outline-offset-1 outline-fg/10"
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-[17px] font-medium leading-tight tracking-tight">Quiet Bible</p>
          <p className="truncate text-[11px] text-muted">Offline · private · Berean Standard Bible</p>
        </div>
      </header>
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <BibleGate>
          {tab === "read" ? <ReaderView data={data} /> : null}
          {tab === "search" ? <SearchView data={data} onOpenReader={openReader} /> : null}
          {tab === "library" ? <LibraryView data={data} onOpenReader={openReader} /> : null}
          {tab === "plans" ? <PlansView data={data} onOpenReader={openReader} /> : null}
          {tab === "settings" ? <SettingsView /> : null}
        </BibleGate>
      </div>
      <nav className="border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]">
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {TABS.map((item) => {
            const active = tab === item.id;
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "flex h-14 w-full flex-col items-center justify-center gap-0.5 text-[11px]",
                    active ? "text-accent" : "text-muted",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <BibleProvider>
      <ThemeSync />
      <Shell />
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--qb-surface)",
            color: "var(--qb-fg)",
            border: "1px solid var(--qb-divider)",
          },
        }}
      />
    </BibleProvider>,
  );
}
