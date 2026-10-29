export type ThemeId = "quiet" | "paper" | "night" | "custom";

export interface ThemeColors {
  bg: string;
  surface: string;
  fg: string;
  muted: string;
  accent: string;
  divider: string;
  highlight: string;
  jesus: string;
}

export const THEME_PRESETS: Record<Exclude<ThemeId, "custom">, { name: string; colors: ThemeColors }> = {
  quiet: {
    name: "Quiet",
    colors: {
      bg: "#141311",
      surface: "#211f1b",
      fg: "#f2ebdd",
      muted: "#b0a79a",
      accent: "#c8a96b",
      divider: "#423e37",
      highlight: "#4a3c24",
      jesus: "#e8c9a0",
    },
  },
  paper: {
    name: "Paper",
    colors: {
      bg: "#f3eee4",
      surface: "#fffaf1",
      fg: "#2c261e",
      muted: "#6f675c",
      accent: "#8a6a32",
      divider: "#ddd2c0",
      highlight: "#f0e0b8",
      jesus: "#6b3f1f",
    },
  },
  night: {
    name: "Night",
    colors: {
      bg: "#0c0c0d",
      surface: "#161616",
      fg: "#d9d4cc",
      muted: "#8a8680",
      accent: "#b9a37a",
      divider: "#2c2c2e",
      highlight: "#3a3428",
      jesus: "#d4c4a0",
    },
  },
};

export const COLOR_SLOTS: Array<{ key: keyof ThemeColors; label: string; hint: string }> = [
  { key: "bg", label: "Page", hint: "Reading surface" },
  { key: "surface", label: "Panels", hint: "Bars, cards, menus" },
  { key: "fg", label: "Text", hint: "Scripture and labels" },
  { key: "muted", label: "Secondary", hint: "Captions and idle controls" },
  { key: "accent", label: "Accent", hint: "Verse numbers and actions" },
  { key: "divider", label: "Rules", hint: "Hairline separators" },
  { key: "highlight", label: "Highlight", hint: "Marked verses" },
  { key: "jesus", label: "Spoken words", hint: "Words of Jesus" },
];

export function applyTheme(colors: ThemeColors) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--qb-bg", colors.bg);
  root.style.setProperty("--qb-surface", colors.surface);
  root.style.setProperty("--qb-fg", colors.fg);
  root.style.setProperty("--qb-muted", colors.muted);
  root.style.setProperty("--qb-accent", colors.accent);
  root.style.setProperty("--qb-divider", colors.divider);
  root.style.setProperty("--qb-highlight", colors.highlight);
  root.style.setProperty("--qb-jesus", colors.jesus);
  const lightBg = luminance(colors.bg) > 0.55;
  const lightAccent = luminance(colors.accent) > 0.55;
  root.style.setProperty("--qb-accent-fg", lightAccent ? "#161410" : "#f7f1e6");
  root.dataset.scheme = lightBg ? "light" : "dark";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", colors.bg);
}

function luminance(hex: string): number {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16) / 255;
  const g = parseInt(n.slice(2, 4), 16) / 255;
  const b = parseInt(n.slice(4, 6), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function isLight(hex: string): boolean {
  return luminance(hex) > 0.55;
}
