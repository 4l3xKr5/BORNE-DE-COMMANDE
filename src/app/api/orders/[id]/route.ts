import { fail, ok } from "@/server/api-response";
import { findOrder, updateOrderStatus } from "@/server/orders.repository";
import type { OrderStatus } from "@/types/order";

const allowedStatuses: OrderStatus[] = [
  "created",
  "ticket_printed",
  "awaiting_counter_payment",
  "paid_at_counter",
  "in_preparation",
  "ready",
  "handed_to_customer",
  "cancelled"
];

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const order = await findOrder(id);
  if (!order) return fail("Commande introuvable.", 404);
  return ok(order);
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as { orderStatus?: OrderStatus };

  if (!body.orderStatus || !allowedStatuses.includes(body.orderStatus)) {
    return fail("Statut de commande invalide.");
  }

  const order = await updateOrderStatus(id, body.orderStatus);
  if (!order) return fail("Commande introuvable.", 404);
  return ok(order);
}
