import { useEffect, useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { toast } from "sonner";
import { chapterSpeech, type SpeechHandle } from "@/lib/speech";
import { cn } from "@/lib/cn";

export function AudioBar({
  parts,
  listened,
  onListened,
}: {
  parts: Array<{ id: string; text: string }>;
  listened: string[];
  onListened: (id: string) => void;
}) {
  const [handle, setHandle] = useState<SpeechHandle>(chapterSpeech.snapshot());

  useEffect(() => {
    chapterSpeech.setOnComplete(onListened);
    return chapterSpeech.subscribe(setHandle);
  }, [onListened]);

  const playing = handle.status === "playing";
  const done = parts.filter((p) => listened.includes(p.id)).length;
  const percent = parts.length === 0 ? 0 : Math.round((done * 100) / parts.length);

  return (
    <div className="border-t border-border bg-surface">
      <div className="h-0.5 bg-divider">
        <div
          className="h-full bg-accent transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-out)]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mx-auto flex max-w-2xl items-center px-2 py-1">
        <button
          type="button"
          className="flex h-14 flex-1 items-center justify-center text-fg"
          aria-label="Previous verse"
          onClick={() => {
            if (!chapterSpeech.skipBy(-1)) toast("Start playback to skip verses");
          }}
        >
          <SkipBack className="size-5" />
        </button>
        <button
          type="button"
          className={cn(
            "flex h-14 flex-1 items-center justify-center",
            playing ? "text-accent" : "text-fg",
          )}
          aria-label={playing ? "Pause audio" : handle.status === "paused" ? "Resume audio" : "Play chapter"}
          onClick={() => {
            if (!chapterSpeech.supported()) {
              toast("Spoken reading is not available in this browser");
              return;
            }
            if (parts.length === 0) {
              toast("The chapter is still opening");
              return;
            }
            chapterSpeech.toggle(parts);
          }}
        >
          {playing ? <Pause className="size-7 fill-current" /> : <Play className="ml-0.5 size-7 fill-current" />}
        </button>
        <button
          type="button"
          className="flex h-14 flex-1 items-center justify-center text-fg"
          aria-label="Next verse"
          onClick={() => {
            if (!chapterSpeech.skipBy(1)) toast("Start playback to skip verses");
          }}
        >
          <SkipForward className="size-5" />
        </button>
      </div>
      <p className="pb-2 text-center text-[11px] tabular-nums text-muted">
        {percent}% listened
        {handle.verseId && handle.status !== "idle" ? ` · verse ${handle.index + 1} of ${handle.total}` : ""}
      </p>
    </div>
  );
}
