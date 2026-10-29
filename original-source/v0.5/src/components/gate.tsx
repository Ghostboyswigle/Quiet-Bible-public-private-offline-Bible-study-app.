import type { ReactNode } from "react";
import { useBible } from "@/lib/bible/context";

export function BibleGate({ children }: { children: ReactNode }) {
  const { error } = useBible();

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-display text-xl">The text could not be opened</p>
        <p className="max-w-sm text-sm text-muted">{error}</p>
      </div>
    );
  }

  return <>{children}</>;
}
