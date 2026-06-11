import type { CartItem } from "./cart";

export type OrderStatus =
  | "created"
  | "ticket_printed"
  | "awaiting_counter_payment"
  | "paid_at_counter"
  | "in_preparation"
  | "ready"
  | "handed_to_customer"
  | "cancelled";

export type PaymentStatus = "awaiting_counter_payment" | "paid_at_counter" | "cancelled";
export type PrintStatus = "not_started" | "printing" | "printed" | "failed" | "reprinted";

export type OrderItem = CartItem;

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  orderType: "takeaway";
  items: OrderItem[];
  subtotal: number;
  total: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  printStatus: PrintStatus;
  ticketPrintCount: number;
};

export type CreateOrderInput = {
  items: CartItem[];
  subtotal: number;
  total: number;
};
