import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-[var(--red-500)] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
      {children}
    </span>
  );
}
