import Link from "next/link";
import type { ReactNode } from "react";

export function AdminShell({ pin, children }: { pin: string; children: ReactNode }) {
  const suffix = `?pin=${encodeURIComponent(pin)}`;

  return (
    <main className="min-h-dvh bg-[var(--paper-100)] text-[var(--night-950)]">
      <header className="border-b-2 border-[var(--night-950)] bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase text-[var(--red-500)]">Admin simple</p>
            <h1 className="text-3xl font-black uppercase">Pizza de Nuit</h1>
          </div>
          <nav className="flex gap-3 text-sm font-black uppercase">
            <Link href={`/admin/orders${suffix}`}>Commandes</Link>
            <Link href={`/admin/products${suffix}`}>Produits</Link>
            <Link href={`/admin/settings${suffix}`}>Settings</Link>
            <Link href="/">Borne</Link>
          </nav>
        </div>
      </header>
      <section className="mx-auto max-w-6xl p-6">{children}</section>
    </main>
  );
}
