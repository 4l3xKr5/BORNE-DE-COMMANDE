import type { OrderItem } from "./order";

export type Ticket = {
  orderNumber: string;
  createdAt: string;
  restaurantName: string;
  orderTypeLabel: string;
  items: OrderItem[];
  total: number;
  paymentLabel: string;
  customerMessage: string;
  printCount: number;
};
