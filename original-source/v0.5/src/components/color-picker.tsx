import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Button } from "./ui/button";

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function hexToRgb(hex: string): Rgb {
  const raw = hex.replace("#", "").trim();
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = Number.parseInt(full.padEnd(6, "0").slice(0, 6), 16);
  if (Number.isNaN(n)) return { r: 0, g: 0, b: 0 };
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex({ r, g, b }: Rgb) {
  return `#${[r, g, b].map((n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsv({ r, g, b }: Rgb) {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rr) h = ((gg - bb) / d) % 6;
    else if (max === gg) h = (bb - rr) / d + 2;
    else h = (rr - gg) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

function hsvToRgb(h: number, s: number, v: number): Rgb {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function hueColor(h: number) {
  const { r, g, b } = hsvToRgb(h, 1, 1);
  return `rgb(${r}, ${g}, ${b})`;
}

export function ColorPicker({
  label,
  hint,
  value,
  onChange,
  open,
  onToggle,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (hex: string) => void;
  open: boolean;
  onToggle: () => void;
}) {
  const [draft, setDraft] = useState(value);
  const padRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const drag = useRef<"sv" | "hue" | null>(null);
  const pointerId = useRef<number | null>(null);
  const hsvRef = useRef(rgbToHsv(hexToRgb(value)));

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const rgb = hexToRgb(draft);
  const hsv = rgbToHsv(rgb);
  hsvRef.current = hsv;

  const applySv = (clientX: number, clientY: number) => {
    const el = padRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const s = clamp((clientX - box.left) / box.width, 0, 1);
    const v = clamp(1 - (clientY - box.top) / box.height, 0, 1);
    setDraft(rgbToHex(hsvToRgb(hsvRef.current.h, s, v)));
  };

  const applyHue = (clientX: number) => {
    const el = hueRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const h = clamp((clientX - box.left) / box.width, 0, 1) * 360;
    setDraft(rgbToHex(hsvToRgb(h, hsvRef.current.s, hsvRef.current.v)));
  };

  const endDrag = () => {
    const id = pointerId.current;
    drag.current = null;
    pointerId.current = null;
    if (id == null) return;
    for (const el of [padRef.current, hueRef.current]) {
      try {
        el?.releasePointerCapture(id);
      } catch {
        /* already released */
      }
    }
  };

  useEffect(() => {
    if (!open) return;
    const onScroll = () => endDrag();
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [open]);

  const startDrag = (
    kind: "sv" | "hue",
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    drag.current = kind;
    pointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    if (kind === "sv") applySv(event.clientX, event.clientY);
    else applyHue(event.clientX);
  };

  const closeWithoutSave = () => {
    setDraft(value);
    endDrag();
    onToggle();
  };

  const save = () => {
    onChange(draft);
    endDrag();
    onToggle();
  };

  return (
    <div>
      <button type="button" onClick={() => (open ? closeWithoutSave() : onToggle())} className="flex w-full items-center gap-3 text-left">
        <span
          className="size-11 shrink-0 rounded-[var(--radius-sm)] shadow-[var(--shadow-border)]"
          style={{ background: open ? draft : value }}
        />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium">{label}</span>
          <span className="block text-xs text-muted">{hint}</span>
        </span>
        <span className="font-mono text-xs uppercase text-muted">{open ? draft : value}</span>
      </button>

      {open ? (
        <div className="mt-3 space-y-3 rounded-[var(--radius-md)] bg-bg px-3 py-3 shadow-[var(--shadow-border)]">
          <div
            ref={padRef}
            className="relative h-36 w-full touch-none overflow-hidden rounded-[var(--radius-sm)]"
            style={{
              background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor(hsv.h)})`,
            }}
            onPointerDown={(event) => startDrag("sv", event)}
            onPointerMove={(event) => {
              if (drag.current !== "sv") return;
              applySv(event.clientX, event.clientY);
            }}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <span
              className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[var(--shadow-border)]"
              style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: draft }}
            />
          </div>

          <div
            ref={hueRef}
            className="relative h-5 w-full touch-none rounded-full"
            style={{
              background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
            }}
            onPointerDown={(event) => startDrag("hue", event)}
            onPointerMove={(event) => {
              if (drag.current !== "hue") return;
              applyHue(event.clientX);
            }}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <span
              className="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
              style={{ left: `${(hsv.h / 360) * 100}%`, background: hueColor(hsv.h) }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <RgbField label="R" value={rgb.r} onChange={(r) => setDraft(rgbToHex({ ...rgb, r }))} />
            <RgbField label="G" value={rgb.g} onChange={(g) => setDraft(rgbToHex({ ...rgb, g }))} />
            <RgbField label="B" value={rgb.b} onChange={(b) => setDraft(rgbToHex({ ...rgb, b }))} />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button type="button" variant="secondary" onClick={closeWithoutSave}>
              Cancel
            </Button>
            <Button type="button" variant="primary" onClick={save}>
              Save color
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RgbField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block text-center">
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={255}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isNaN(n)) return;
          onChange(clamp(Math.round(n), 0, 255));
        }}
        className="h-11 w-full rounded-[var(--radius-sm)] bg-surface text-center font-mono text-sm text-fg shadow-[var(--shadow-border)]"
      />
      <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-muted">{label}</span>
    </label>
  );
}
