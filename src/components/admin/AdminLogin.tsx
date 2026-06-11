export function AdminLogin() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[var(--night-950)] p-6">
      <form action="/admin/orders" className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h1 className="pdn-display text-3xl">Accès admin</h1>
        <p className="mt-2 text-sm font-bold text-[var(--neutral-700)]">Saisissez le PIN admin simple de la borne.</p>
        <input
          name="pin"
          type="password"
          inputMode="numeric"
          className="pdn-title mt-5 w-full rounded-xl border-2 border-[var(--night-950)] p-4 text-xl"
          placeholder="PIN"
        />
        <button className="pdn-label mt-4 min-h-14 w-full rounded-xl border-2 border-[var(--night-950)] bg-[var(--gold-500)] px-5 py-3 text-xl shadow-[0_5px_0_var(--night-950)]">
          Entrer
        </button>
      </form>
    </main>
  );
}
