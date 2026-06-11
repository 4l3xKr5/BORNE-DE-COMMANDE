import { fail, ok } from "@/server/api-response";
import { recordReprint } from "@/server/orders.repository";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const order = await recordReprint(id);
  if (!order) return fail("Commande introuvable.", 404);
  return ok(order);
}
