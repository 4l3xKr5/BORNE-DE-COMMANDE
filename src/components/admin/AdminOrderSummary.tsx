import { getToneClasses, orderStatusMeta, paymentStatusMeta, printStatusMeta } from "@/lib/orders/status-labels";
import { formatPrice } from "@/lib/utils/format";
import type { Order, OrderItem, OrderStatus, PaymentStatus, PrintStatus } from "@/types/order";

export function StatusPill({
  type,
  status
}: {
  type: "order";
  status: OrderStatus;
} | {
  type: "payment";
  status: PaymentStatus;
} | {
  type: "print";
  status: PrintStatus;
}) {
  const meta = type === "order" ? orderStatusMeta[status] : type === "payment" ? paymentStatusMeta[status] : printStatusMeta[status];

  return (
    <span className={`inline-flex rounded-full border-2 px-3 py-1 text-xs font-black uppercase ${getToneClasses(meta.tone)}`}>
      {meta.label}
    </span>
  );
}

export function AdminOrderStats({ order }: { order: Order }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <AdminStat label="Commande" value={orderStatusMeta[order.orderStatus].label} />
      <AdminStat label="Paiement" value={paymentStatusMeta[order.paymentStatus].label} />
      <AdminStat label="Impression" value={printStatusMeta[order.printStatus].label} />
      <AdminStat label="Tickets" value={`${order.ticketPrintCount}`} />
    </div>
  );
}

function AdminStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border-2 border-black bg-[#fffdf6] p-3">
      <span className="block text-[10px] font-black uppercase text-[var(--neutral-500)]">{label}</span>
      <strong className="text-lg uppercase">{value}</strong>
    </div>
  );
}

export function AdminOrderItems({ items }: { items: OrderItem[] }) {
  return (
    <div className="divide-y divide-dashed divide-black/25">
      {items.map((item) => (
        <AdminOrderItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export function AdminOrderItem({ item }: { item: OrderItem }) {
  return (
    <div className="py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <strong className="text-lg uppercase">{item.quantity} x {item.productName}</strong>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.formatLabel ? <AdminDetailPill label="Format" value={item.formatLabel} /> : null}
            {item.baseLabel ? <AdminDetailPill label="Base" value={item.baseLabel} /> : null}
          </div>
        </div>
        <strong className="text-xl">{formatPrice(item.lineTotal)}</strong>
      </div>

      {item.halfHalf ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-black bg-white p-3">
            <span className="block text-[10px] font-black uppercase text-[var(--red-500)]">Moitié A</span>
            <strong className="uppercase">{item.halfHalf.leftPizzaName}</strong>
          </div>
          <div className="rounded-xl border-2 border-black bg-white p-3">
            <span className="block text-[10px] font-black uppercase text-[var(--red-500)]">Moitié B</span>
            <strong className="uppercase">{item.halfHalf.rightPizzaName}</strong>
          </div>
        </div>
      ) : null}

      {item.customPizza ? (
        <div className="mt-3">
          <span className="block text-[10px] font-black uppercase text-[var(--red-500)]">Ingrédients</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {item.customPizza.ingredients.map((ingredient) => (
              <span key={ingredient.id} className="rounded-full border border-black bg-white px-2 py-1 text-[11px] font-black uppercase">
                {ingredient.name}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {item.supplements.length > 0 ? (
        <p className="mt-3 rounded-lg bg-[var(--gold-500)] px-3 py-2 text-xs font-black uppercase">
          Suppléments : {item.supplements.map((supplement) => supplement.name).join(", ")}
        </p>
      ) : null}
    </div>
  );
}

function AdminDetailPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase">
      {label} : {value}
    </span>
  );
}
