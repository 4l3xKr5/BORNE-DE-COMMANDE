import type { Order } from "@/types/order";
import type { AppSettings } from "@/types/settings";
import type { Ticket } from "@/types/ticket";

export function buildTicket(order: Order, settings: AppSettings): Ticket {
  return {
    orderNumber: order.orderNumber,
    createdAt: order.createdAt,
    restaurantName: settings.restaurantName,
    orderTypeLabel: "Commande à emporter",
    items: order.items,
    total: order.total,
    paymentLabel: "Paiement au comptoir",
    customerMessage: settings.ticketMessage,
    printCount: order.ticketPrintCount
  };
}
