import type { CreateOrderInput, Order } from "@/types/order";
import { generateOrderNumber } from "./order-number.service";

export function createOrder(input: CreateOrderInput): Order {
  const now = new Date();

  return {
    id: crypto.randomUUID(),
    orderNumber: generateOrderNumber(now),
    createdAt: now.toISOString(),
    orderType: "takeaway",
    items: input.items,
    subtotal: input.subtotal,
    total: input.total,
    orderStatus: "ticket_printed",
    paymentStatus: "awaiting_counter_payment",
    printStatus: "printed",
    ticketPrintCount: 1
  };
}
