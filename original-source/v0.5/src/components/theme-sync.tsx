import { useEffect } from "react";
import { applyTheme } from "@/lib/themes";
import { activeColors, useAppStore } from "@/lib/store";

export function ThemeSync() {
  const themeId = useAppStore((s) => s.themeId);
  const customColors = useAppStore((s) => s.customColors);

  useEffect(() => {
    applyTheme(activeColors({ themeId, customColors }));
  }, [themeId, customColors]);

  return null;
}
