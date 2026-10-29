import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeColors, ThemeId } from "./themes";
import { THEME_PRESETS } from "./themes";

export interface PlanStep {
  title: string;
  reference: string;
  complete: boolean;
}

export interface ReadingPlan {
  id: string;
  name: string;
  description: string;
  steps: PlanStep[];
}

export interface AppState {
  book: string;
  chapter: number;
  focusVerse: number | null;
  highlights: string[];
  bookmarks: string[];
  listened: string[];
  notes: Record<string, string>;
  plans: ReadingPlan[];
  fontSize: number;
  lineHeight: number;
  showJesus: boolean;
  showHeadings: boolean;
  speechRate: number;
  themeId: ThemeId;
  customColors: ThemeColors;
  jumpTo: (book: string, chapter: number, verse?: number) => void;
  clearFocus: () => void;
  toggleHighlight: (id: string) => void;
  toggleBookmark: (id: string) => void;
  markListened: (id: string) => void;
  resetListened: () => void;
  setNote: (id: string, text: string) => void;
  setFontSize: (n: number) => void;
  setLineHeight: (n: number) => void;
  setShowJesus: (v: boolean) => void;
  setShowHeadings: (v: boolean) => void;
  setSpeechRate: (n: number) => void;
  setThemeId: (id: ThemeId) => void;
  setCustomColor: (key: keyof ThemeColors, value: string) => void;
  addPlan: (plan: ReadingPlan) => void;
  updatePlan: (plan: ReadingPlan) => void;
  removePlan: (id: string) => void;
  resetPlan: (id: string) => void;
  togglePlanStep: (planId: string, index: number) => void;
  importState: (data: Partial<Persisted>) => void;
}

export type Persisted = Pick<
  AppState,
  | "book"
  | "chapter"
  | "highlights"
  | "bookmarks"
  | "listened"
  | "notes"
  | "plans"
  | "fontSize"
  | "lineHeight"
  | "showJesus"
  | "showHeadings"
  | "speechRate"
  | "themeId"
  | "customColors"
>;

function toggleIn(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      book: "GEN",
      chapter: 1,
      focusVerse: null,
      highlights: [],
      bookmarks: [],
      listened: [],
      notes: {},
      plans: [],
      fontSize: 20,
      lineHeight: 1.55,
      showJesus: true,
      showHeadings: true,
      speechRate: 0.92,
      themeId: "quiet",
      customColors: THEME_PRESETS.quiet.colors,
      jumpTo: (book, chapter, verse) =>
        set({ book, chapter, focusVerse: verse ?? null }),
      clearFocus: () => set({ focusVerse: null }),
      toggleHighlight: (id) =>
        set((s) => ({ highlights: toggleIn(s.highlights, id) })),
      toggleBookmark: (id) =>
        set((s) => ({ bookmarks: toggleIn(s.bookmarks, id) })),
      markListened: (id) =>
        set((s) =>
          s.listened.includes(id) ? s : { listened: [...s.listened, id] },
        ),
      resetListened: () => set({ listened: [] }),
      setNote: (id, text) =>
        set((s) => {
          const notes = { ...s.notes };
          if (!text.trim()) delete notes[id];
          else notes[id] = text;
          return { notes };
        }),
      setFontSize: (fontSize) => set({ fontSize }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      setShowJesus: (showJesus) => set({ showJesus }),
      setShowHeadings: (showHeadings) => set({ showHeadings }),
      setSpeechRate: (speechRate) => set({ speechRate }),
      setThemeId: (themeId) => set({ themeId }),
      setCustomColor: (key, value) =>
        set((s) => ({
          themeId: "custom",
          customColors: { ...s.customColors, [key]: value },
        })),
      addPlan: (plan) => set((s) => ({ plans: [...s.plans, plan] })),
      updatePlan: (plan) =>
        set((s) => ({
          plans: s.plans.map((p) => (p.id === plan.id ? plan : p)),
        })),
      removePlan: (id) =>
        set((s) => ({ plans: s.plans.filter((p) => p.id !== id) })),
      resetPlan: (id) =>
        set((s) => ({
          plans: s.plans.map((p) =>
            p.id === id
              ? { ...p, steps: p.steps.map((st) => ({ ...st, complete: false })) }
              : p,
          ),
        })),
      togglePlanStep: (planId, index) =>
        set((s) => ({
          plans: s.plans.map((p) =>
            p.id !== planId
              ? p
              : {
                  ...p,
                  steps: p.steps.map((st, i) =>
                    i === index ? { ...st, complete: !st.complete } : st,
                  ),
                },
          ),
        })),
      importState: (data) => set((s) => ({ ...s, ...data })),
    }),
    {
      name: "quiet-bible-web-v1",
      partialize: (s) => ({
        book: s.book,
        chapter: s.chapter,
        highlights: s.highlights,
        bookmarks: s.bookmarks,
        listened: s.listened,
        notes: s.notes,
        plans: s.plans,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        showJesus: s.showJesus,
        showHeadings: s.showHeadings,
        speechRate: s.speechRate,
        themeId: s.themeId,
        customColors: s.customColors,
      }),
    },
  ),
);

export function activeColors(state: Pick<AppState, "themeId" | "customColors">): ThemeColors {
  if (state.themeId === "custom") return state.customColors;
  return THEME_PRESETS[state.themeId].colors;
}
