import Link from "next/link";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { StatusPill } from "@/components/admin/AdminOrderSummary";
import { AdminShell } from "@/components/admin/AdminShell";
import { readOrders } from "@/server/orders.repository";
import { formatPrice } from "@/lib/utils/format";
import { isAuthorizedAdmin } from "@/server/admin-auth";

type PageProps = {
  searchParams: Promise<{ pin?: string }>;
};

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const { pin } = await searchParams;
  if (!isAuthorizedAdmin(pin)) return <AdminLogin />;

  const orders = await readOrders();
  const activeOrders = orders.filter((order) => !["handed_to_customer", "cancelled"].includes(order.orderStatus)).length;
  const readyOrders = orders.filter((order) => order.orderStatus === "ready").length;
  const awaitingPaymentOrders = orders.filter((order) => order.paymentStatus === "awaiting_counter_payment").length;

  return (
    <AdminShell pin={pin}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="pdn-label text-lg text-[var(--red-500)]">Suivi comptoir</p>
          <h2 className="pdn-display mt-1 text-4xl">Commandes</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <AdminCounter label="Actives" value={activeOrders} />
          <AdminCounter label="À régler" value={awaitingPaymentOrders} />
          <AdminCounter label="Prêtes" value={readyOrders} />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {orders.length === 0 ? <p className="rounded-xl bg-white p-5 font-bold">Aucune commande enregistrée.</p> : null}
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/admin/orders/${order.id}?pin=${encodeURIComponent(pin)}`}
            className="grid grid-cols-[1fr_auto] gap-4 rounded-[18px] border-[3px] border-[var(--night-950)] bg-white p-4 shadow-[5px_5px_0_var(--night-950)] transition hover:-translate-y-0.5"
          >
            <span>
              <strong className="block text-xl">#{order.orderNumber}</strong>
              <span className="text-sm font-bold">{new Date(order.createdAt).toLocaleString("fr-FR")}</span>
              <span className="mt-2 flex flex-wrap gap-2">
                <StatusPill type="order" status={order.orderStatus} />
                <StatusPill type="payment" status={order.paymentStatus} />
              </span>
              <span className="pdn-label mt-2 block text-base text-[var(--neutral-500)]">
                {order.items.length} ligne{order.items.length > 1 ? "s" : ""} · {order.items.reduce((sum, item) => sum + item.quantity, 0)} produit{order.items.reduce((sum, item) => sum + item.quantity, 0) > 1 ? "s" : ""}
              </span>
            </span>
            <strong className="text-2xl">{formatPrice(order.total)}</strong>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}

function AdminCounter({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-24 rounded-xl border-2 border-black bg-white px-4 py-2 text-center shadow-[3px_3px_0_var(--night-950)]">
      <span className="pdn-label block text-sm text-[var(--neutral-500)]">{label}</span>
      <strong className="text-2xl">{value}</strong>
    </div>
  );
}
