import { products } from "@/data/products";
import { validateCart } from "@/features/cart/cart.validation";
import { createOrder } from "@/features/orders/orders.service";
import { fail, ok } from "@/server/api-response";
import { insertOrder, readOrders } from "@/server/orders.repository";
import type { CreateOrderInput } from "@/types/order";

export async function GET() {
  const orders = await readOrders();
  return ok(orders);
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as CreateOrderInput;
    const validation = validateCart(input.items ?? [], products);

    if (!validation.valid) {
      return fail(validation.errors.join(" "));
    }

    const order = createOrder(input);
    await insertOrder(order);
    return ok(order);
  } catch {
    return fail("La commande n'a pas pu être validée. Merci de réessayer ou de demander de l'aide au comptoir.", 500);
  }
}
