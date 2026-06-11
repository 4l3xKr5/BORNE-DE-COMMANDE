import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="pdn-label inline-flex rounded-full bg-[var(--red-500)] px-3 py-1 text-sm text-white">
      {children}
    </span>
  );
}
