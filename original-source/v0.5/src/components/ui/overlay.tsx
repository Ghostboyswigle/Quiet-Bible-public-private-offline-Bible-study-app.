import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export function Overlay({
  open,
  title,
  onClose,
  children,
  wide,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="presentation">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-bg/70 motion-safe:animate-[fadeIn_var(--motion-fast)_var(--ease-out)]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        className={cn(
          "relative z-10 flex max-h-[88vh] w-full flex-col overflow-hidden bg-surface text-fg shadow-[var(--shadow-border)]",
          "rounded-t-[var(--radius-xl)] sm:rounded-[var(--radius-xl)]",
          wide ? "sm:max-w-2xl" : "sm:max-w-lg",
          "motion-safe:animate-[sheetIn_var(--motion-fast)_var(--ease-out)]",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h2 id="overlay-title" className="font-display text-lg font-medium tracking-tight text-balance">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-11 items-center justify-center rounded-[var(--radius-md)] text-muted hover:bg-bg hover:text-fg"
            aria-label="Close dialog"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
