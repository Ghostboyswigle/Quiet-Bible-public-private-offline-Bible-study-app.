import { useRef, useState } from "react";
import { toast } from "sonner";
import { COLOR_SLOTS, THEME_PRESETS, type ThemeId } from "@/lib/themes";
import { activeColors, useAppStore, type Persisted } from "@/lib/store";
import { Button } from "./ui/button";
import { ColorPicker } from "./color-picker";
import { cn } from "@/lib/cn";

export function SettingsView() {
  const fontSize = useAppStore((s) => s.fontSize);
  const lineHeight = useAppStore((s) => s.lineHeight);
  const showJesus = useAppStore((s) => s.showJesus);
  const showHeadings = useAppStore((s) => s.showHeadings);
  const speechRate = useAppStore((s) => s.speechRate);
  const themeId = useAppStore((s) => s.themeId);
  const customColors = useAppStore((s) => s.customColors);
  const setFontSize = useAppStore((s) => s.setFontSize);
  const setLineHeight = useAppStore((s) => s.setLineHeight);
  const setShowJesus = useAppStore((s) => s.setShowJesus);
  const setShowHeadings = useAppStore((s) => s.setShowHeadings);
  const setSpeechRate = useAppStore((s) => s.setSpeechRate);
  const setThemeId = useAppStore((s) => s.setThemeId);
  const setCustomColor = useAppStore((s) => s.setCustomColor);
  const resetListened = useAppStore((s) => s.resetListened);
  const importState = useAppStore((s) => s.importState);
  const fileRef = useRef<HTMLInputElement>(null);
  const colors = activeColors({ themeId, customColors });
  const [openSlot, setOpenSlot] = useState<string | null>(null);

  const exportData = () => {
    const raw = localStorage.getItem("quiet-bible-web-v1");
    const blob = new Blob([raw ?? "{}"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiet-bible-library.json";
    a.click();
    URL.revokeObjectURL(url);
    toast("Library exported");
  };

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-4 py-5 pb-16">
      <h1 className="font-display text-2xl font-medium tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted">Reading, appearance, listening, and privacy.</p>

      <Section title="Reading">
        <Field label={`Scripture size · ${fontSize} px`}>
          <input
            type="range"
            min={16}
            max={32}
            step={1}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-[var(--qb-accent)]"
          />
        </Field>
        <Field label={`Line spacing · ${lineHeight.toFixed(2)}`}>
          <input
            type="range"
            min={1.3}
            max={1.9}
            step={0.05}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full accent-[var(--qb-accent)]"
          />
        </Field>
        <Toggle
          label="Words of Jesus"
          hint="Set spoken words in a distinct color"
          on={showJesus}
          onChange={setShowJesus}
        />
        <Toggle
          label="Section headings"
          hint="Show the headings preserved from the BSB text"
          on={showHeadings}
          onChange={setShowHeadings}
        />
      </Section>

      <Section title="Appearance">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {([...Object.keys(THEME_PRESETS), "custom"] as ThemeId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setThemeId(id)}
              className={cn(
                "h-11 rounded-[var(--radius-md)] text-sm capitalize",
                themeId === id ? "bg-accent text-accent-fg" : "bg-bg text-fg",
              )}
            >
              {id === "custom" ? "Custom" : THEME_PRESETS[id as Exclude<ThemeId, "custom">].name}
            </button>
          ))}
        </div>
        <ul className="mt-4 space-y-3">
          {COLOR_SLOTS.map((slot) => (
            <li key={slot.key}>
              <ColorPicker
                label={slot.label}
                hint={slot.hint}
                value={colors[slot.key]}
                open={openSlot === slot.key}
                onToggle={() => setOpenSlot((cur) => (cur === slot.key ? null : slot.key))}
                onChange={(hex) => setCustomColor(slot.key, hex)}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Listening">
        <Field label={`Speech rate · ${speechRate.toFixed(2)}`}>
          <input
            type="range"
            min={0.7}
            max={1.2}
            step={0.02}
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className="w-full accent-[var(--qb-accent)]"
          />
        </Field>
        <p className="text-sm leading-relaxed text-muted">
          A verse is marked listened only after its audio finishes. Playback uses the voice already on this device.
        </p>
        <Button onClick={() => { resetListened(); toast("Listening progress cleared"); }}>
          Reset listening progress
        </Button>
      </Section>

      <Section title="Your library">
        <p className="text-sm leading-relaxed text-muted">
          Export or restore notes, highlights, bookmarks, plans, and reading place as a file you keep.
        </p>
        <div className="flex gap-2">
          <Button className="flex-1" onClick={exportData}>
            Export
          </Button>
          <Button className="flex-1" onClick={() => fileRef.current?.click()}>
            Import
          </Button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            try {
              const parsed = JSON.parse(await file.text()) as { state?: Persisted } & Partial<Persisted>;
              const state = (parsed.state ?? parsed) as Partial<Persisted>;
              importState(state);
              toast("Library restored");
            } catch {
              toast("That file could not be read");
            }
          }}
        />
      </Section>

      <Section title="About Quiet Bible">
        <p className="text-sm leading-relaxed text-muted">
          Quiet Bible is a private reader for the Berean Standard Bible. Nothing here requests an account,
          advertising, or a remote service for your notes.
        </p>
        <p className="text-sm leading-relaxed text-muted">
          The Holy Bible, Berean Standard Bible, BSB is produced in cooperation with Bible Hub, Discovery Bible,
          OpenBible.com, and the Berean Bible Translation Committee. This text of God's Word has been dedicated
          to the public domain.
        </p>
        <p className="text-sm leading-relaxed text-muted">
          This web edition keeps the original privacy contract, restores study material already present in the BSB
          files (headings, parallel passages, translator notes, poetry, and the words of Jesus), and adds a library
          you can actually return to.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-accent">{title}</h2>
      <div className="space-y-4 rounded-[var(--radius-lg)] bg-surface px-4 py-4 shadow-[var(--shadow-border)]">
        {children}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  hint,
  on,
  onChange,
}: {
  label: string;
  hint: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button type="button" onClick={() => onChange(!on)} className="flex w-full items-center gap-3 text-left">
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-muted">{hint}</span>
      </span>
      <span
        className={cn(
          "relative h-7 w-12 rounded-full",
          on ? "bg-accent" : "bg-bg shadow-[var(--shadow-border)]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-6 rounded-full bg-surface transition-transform duration-[var(--motion-quick)]",
            on ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}
