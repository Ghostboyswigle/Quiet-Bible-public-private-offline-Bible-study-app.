import { nativeSpeech } from "./native-bridge";

export type SpeechStatus = "idle" | "playing" | "paused";

export interface SpeechHandle {
  status: SpeechStatus;
  index: number;
  total: number;
  verseId: string | null;
}

type Listener = (handle: SpeechHandle) => void;

class ChapterSpeech {
  private parts: Array<{ id: string; text: string }> = [];
  private index = 0;
  private status: SpeechStatus = "idle";
  private utterance: SpeechSynthesisUtterance | null = null;
  private listeners = new Set<Listener>();
  private onComplete: ((id: string) => void) | null = null;
  private rate = 0.92;
  private skip = 0;
  private speakingId: string | null = null;

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    fn(this.snapshot());
    return () => this.listeners.delete(fn);
  }

  setOnComplete(fn: (id: string) => void) {
    this.onComplete = fn;
  }

  setRate(rate: number) {
    this.rate = rate;
    if (this.utterance) this.utterance.rate = rate;
  }

  snapshot(): SpeechHandle {
    const part = this.parts[this.index];
    return {
      status: this.status,
      index: this.index,
      total: this.parts.length,
      verseId: part?.id ?? null,
    };
  }

  private emit() {
    const snap = this.snapshot();
    this.listeners.forEach((fn) => fn(snap));
  }

  supported(): boolean {
    if (nativeSpeech()) return true;
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  start(parts: Array<{ id: string; text: string }>, fromIndex = 0) {
    this.stop();
    this.parts = parts;
    this.index = Math.max(0, Math.min(fromIndex, parts.length - 1));
    this.status = "playing";
    this.speakCurrent();
  }

  toggle(parts: Array<{ id: string; text: string }>) {
    if (this.status === "playing") {
      this.pause();
      return;
    }
    if (this.status === "paused") {
      this.resume();
      return;
    }
    this.start(parts, 0);
  }

  pause() {
    const native = nativeSpeech();
    if (native) {
      native.stop();
      this.status = "paused";
      this.emit();
      return;
    }
    if (!this.supported()) return;
    window.speechSynthesis.pause();
    this.status = "paused";
    this.emit();
  }

  resume() {
    const native = nativeSpeech();
    if (native) {
      if (this.status === "paused") {
        this.status = "playing";
        this.speakCurrent();
      }
      return;
    }
    if (!this.supported()) return;
    if (this.status === "paused") {
      window.speechSynthesis.resume();
      this.status = "playing";
      this.emit();
    }
  }

  skipBy(dir: -1 | 1) {
    if (this.status === "idle" || this.parts.length < 2) return false;
    this.skip = dir;
    nativeSpeech()?.stop();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    const next = Math.max(0, Math.min(this.parts.length - 1, this.index + dir));
    this.index = next;
    this.status = "playing";
    this.speakCurrent();
    return true;
  }

  stop() {
    this.status = "idle";
    this.utterance = null;
    this.skip = 0;
    this.speakingId = null;
    nativeSpeech()?.stop();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.emit();
  }

  private onNativeEnd = (id: string) => {
    if (this.skip !== 0) {
      this.skip = 0;
      return;
    }
    if (this.status !== "playing") return;
    if (this.speakingId && id && this.speakingId !== id) return;
    const part = this.parts[this.index];
    if (part) this.onComplete?.(part.id);
    if (this.index + 1 < this.parts.length) {
      this.index += 1;
      this.speakCurrent();
    } else {
      this.status = "idle";
      this.utterance = null;
      this.speakingId = null;
      this.emit();
    }
  };

  private speakCurrent() {
    if (!this.supported()) {
      this.status = "idle";
      this.emit();
      return;
    }
    const part = this.parts[this.index];
    if (!part) {
      this.status = "idle";
      this.emit();
      return;
    }
    const native = nativeSpeech();
    if (native) {
      window.__onQbSpeechEnd = this.onNativeEnd;
      this.speakingId = part.id;
      this.status = "playing";
      this.emit();
      native.speak(part.text, this.rate, part.id);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(part.text);
    u.rate = this.rate;
    u.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => /en-US/i.test(v.lang) && /natural|premium|enhanced|samantha|daniel|google/i.test(v.name)) ||
      voices.find((v) => /^en/i.test(v.lang));
    if (preferred) u.voice = preferred;
    u.onend = () => {
      if (this.skip !== 0) {
        this.skip = 0;
        return;
      }
      this.onComplete?.(part.id);
      if (this.index + 1 < this.parts.length) {
        this.index += 1;
        this.speakCurrent();
      } else {
        this.status = "idle";
        this.utterance = null;
        this.emit();
      }
    };
    u.onerror = () => {
      this.status = "idle";
      this.utterance = null;
      this.emit();
    };
    this.utterance = u;
    this.status = "playing";
    this.emit();
    window.speechSynthesis.speak(u);
  }
}

export const chapterSpeech = new ChapterSpeech();
