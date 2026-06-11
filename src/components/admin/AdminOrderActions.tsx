"use client";

import { useRouter } from "next/navigation";
import { Printer } from "lucide-react";
import { getToneClasses, orderStatusMeta } from "@/lib/orders/status-labels";
import type { Order, OrderStatus } from "@/types/order";

const statuses: OrderStatus[] = [
  "awaiting_counter_payment",
  "paid_at_counter",
  "in_preparation",
  "ready",
  "handed_to_customer",
  "cancelled"
];

export function AdminOrderActions({ order }: { order: Order }) {
  const router = useRouter();

  async function changeStatus(orderStatus: OrderStatus) {
    await fetch(`/api/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus })
    });
    router.refresh();
  }

  async function reprint() {
    await fetch(`/api/orders/${order.id}/reprint`, { method: "POST" });
    window.print();
    router.refresh();
  }

  return (
    <div className="no-print rounded-[18px] border-[3px] border-[var(--night-950)] bg-white p-5 shadow-[5px_5px_0_var(--night-950)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[var(--red-500)]">Actions comptoir</p>
          <h2 className="text-2xl font-black uppercase">Suivi commande</h2>
        </div>
        <button
          onClick={reprint}
          className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-[var(--night-950)] bg-[var(--gold-500)] px-4 py-2 text-sm font-black uppercase shadow-[3px_3px_0_var(--night-950)]"
        >
          <Printer size={18} /> Réimprimer ticket
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => changeStatus(status)}
            disabled={order.orderStatus === status}
            className={`rounded-xl border-2 px-4 py-3 text-left transition active:translate-y-1 disabled:cursor-default ${
              order.orderStatus === status
                ? `${getToneClasses(orderStatusMeta[status].tone)} shadow-[3px_3px_0_var(--night-950)]`
                : "border-[var(--night-950)] bg-[var(--paper-100)] hover:bg-white"
            }`}
          >
            <span className="block text-sm font-black uppercase">{orderStatusMeta[status].label}</span>
            <span className="mt-1 block text-xs font-bold text-[var(--neutral-700)]">{orderStatusMeta[status].description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
