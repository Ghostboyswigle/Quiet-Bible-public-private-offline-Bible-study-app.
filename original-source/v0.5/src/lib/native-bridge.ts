export type AssetBridge = {
  read: (path: string) => string | null;
};

export type SpeechBridge = {
  ready: () => boolean;
  speak: (text: string, rate: number, id: string) => void;
  stop: () => void;
};

declare global {
  interface Window {
    QuietBibleAssets?: AssetBridge;
    QuietBibleSpeech?: SpeechBridge;
    QuietBibleNative?: { isNative: () => boolean };
    __onQbSpeechEnd?: (id: string) => void;
  }
}

export function bundledRead(path: string): string | null {
  if (typeof window === "undefined") return null;
  const rel = path.replace(/^\//, "");
  try {
    return window.QuietBibleAssets?.read(rel) ?? null;
  } catch {
    return null;
  }
}

export function isNativeApp(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.QuietBibleNative?.isNative?.() === true) return true;
  } catch {
    /* ignore */
  }
  return typeof window.QuietBibleAssets?.read === "function";
}

export function nativeSpeech(): SpeechBridge | undefined {
  if (typeof window === "undefined") return undefined;
  return window.QuietBibleSpeech;
}
