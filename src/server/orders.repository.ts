import { promises as fs } from "fs";
import path from "path";
import type { Order, OrderStatus, PaymentStatus } from "@/types/order";

const storageDir = path.join(process.cwd(), "storage");
const ordersPath = path.join(storageDir, "orders.json");

async function ensureStorage() {
  await fs.mkdir(storageDir, { recursive: true });
  try {
    await fs.access(ordersPath);
  } catch {
    await fs.writeFile(ordersPath, "[]", "utf8");
  }
}

export async function readOrders(): Promise<Order[]> {
  await ensureStorage();
  const raw = await fs.readFile(ordersPath, "utf8");
  const normalized = raw.replace(/^\uFEFF/, "").trim();
  if (!normalized) return [];
  return JSON.parse(normalized) as Order[];
}

export async function writeOrders(orders: Order[]) {
  await ensureStorage();
  await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2), "utf8");
}

export async function insertOrder(order: Order) {
  const orders = await readOrders();
  orders.unshift(order);
  await writeOrders(orders);
  return order;
}

export async function findOrder(id: string) {
  const orders = await readOrders();
  return orders.find((order) => order.id === id || order.orderNumber === id) ?? null;
}

function derivePaymentStatus(status: OrderStatus, current: PaymentStatus): PaymentStatus {
  if (status === "cancelled") return "cancelled";
  if (status === "paid_at_counter" || status === "in_preparation" || status === "ready" || status === "handed_to_customer") {
    return "paid_at_counter";
  }
  if (status === "ticket_printed" || status === "awaiting_counter_payment") {
    return "awaiting_counter_payment";
  }
  return current;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const orders = await readOrders();
  const index = orders.findIndex((order) => order.id === id || order.orderNumber === id);
  if (index === -1) return null;
  orders[index] = {
    ...orders[index],
    orderStatus: status,
    paymentStatus: derivePaymentStatus(status, orders[index].paymentStatus)
  };
  await writeOrders(orders);
  return orders[index];
}

export async function recordReprint(id: string) {
  const orders = await readOrders();
  const index = orders.findIndex((order) => order.id === id || order.orderNumber === id);
  if (index === -1) return null;
  orders[index] = {
    ...orders[index],
    printStatus: "reprinted",
    ticketPrintCount: orders[index].ticketPrintCount + 1
  };
  await writeOrders(orders);
  return orders[index];
}
