import { notFound } from "next/navigation";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminOrderActions } from "@/components/admin/AdminOrderActions";
import { AdminOrderItems, AdminOrderStats, StatusPill } from "@/components/admin/AdminOrderSummary";
import { AdminShell } from "@/components/admin/AdminShell";
import { TicketPrintable } from "@/components/ticket/TicketPrintable";
import { findOrder } from "@/server/orders.repository";
import { formatPrice } from "@/lib/utils/format";
import { isAuthorizedAdmin } from "@/server/admin-auth";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pin?: string }>;
};

export default async function AdminOrderDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { pin } = await searchParams;
  if (!isAuthorizedAdmin(pin)) return <AdminLogin />;

  const order = await findOrder(id);
  if (!order) notFound();

  return (
    <AdminShell pin={pin}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="pdn-label text-lg text-[var(--red-500)]">Détail commande</p>
          <h2 className="pdn-display mt-1 text-4xl">#{order.orderNumber}</h2>
          <p className="mt-1 text-sm font-bold">{new Date(order.createdAt).toLocaleString("fr-FR")} · Commande à emporter</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill type="order" status={order.orderStatus} />
          <StatusPill type="payment" status={order.paymentStatus} />
          <StatusPill type="print" status={order.printStatus} />
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <div className="rounded-[18px] border-[3px] border-[var(--night-950)] bg-white p-5 shadow-[5px_5px_0_var(--night-950)]">
            <AdminOrderStats order={order} />
            <div className="mt-5 rounded-xl bg-black p-4 text-white">
              <div className="pdn-title flex justify-between text-2xl">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <p className="mt-1 text-xs font-bold uppercase text-white/70">Paiement au comptoir avant préparation</p>
            </div>
          </div>

          <div className="rounded-[18px] border-[3px] border-[var(--night-950)] bg-white p-5 shadow-[5px_5px_0_var(--night-950)]">
            <h3 className="pdn-display text-2xl">Contenu commande</h3>
            <AdminOrderItems items={order.items} />
          </div>

          <AdminOrderActions order={order} />
        </div>
        <div className="rounded-[18px] border-[3px] border-[var(--night-950)] bg-white p-4 shadow-[5px_5px_0_var(--night-950)]">
          <p className="pdn-label no-print mb-3 text-lg text-[var(--red-500)]">Aperçu ticket</p>
          <TicketPrintable order={order} />
        </div>
      </div>
    </AdminShell>
  );
}
