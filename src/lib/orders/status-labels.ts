import type { OrderStatus, PaymentStatus, PrintStatus } from "@/types/order";

type Tone = "neutral" | "gold" | "blue" | "green" | "red";

type StatusMeta = {
  label: string;
  description: string;
  tone: Tone;
};

export const orderStatusMeta: Record<OrderStatus, StatusMeta> = {
  created: {
    label: "Créée",
    description: "Commande créée, ticket pas encore confirmé.",
    tone: "neutral"
  },
  ticket_printed: {
    label: "Ticket imprimé",
    description: "Le client doit présenter son ticket au comptoir.",
    tone: "gold"
  },
  awaiting_counter_payment: {
    label: "À régler",
    description: "En attente de paiement au comptoir.",
    tone: "gold"
  },
  paid_at_counter: {
    label: "Payée comptoir",
    description: "Paiement comptoir validé.",
    tone: "blue"
  },
  in_preparation: {
    label: "En préparation",
    description: "Commande en cours de préparation.",
    tone: "blue"
  },
  ready: {
    label: "Prête",
    description: "Commande prête à emporter.",
    tone: "green"
  },
  handed_to_customer: {
    label: "Remise client",
    description: "Commande remise au client.",
    tone: "green"
  },
  cancelled: {
    label: "Annulée",
    description: "Commande annulée.",
    tone: "red"
  }
};

export const paymentStatusMeta: Record<PaymentStatus, StatusMeta> = {
  awaiting_counter_payment: {
    label: "Paiement attendu",
    description: "Le client doit régler au comptoir.",
    tone: "gold"
  },
  paid_at_counter: {
    label: "Payé comptoir",
    description: "Paiement validé au comptoir.",
    tone: "green"
  },
  cancelled: {
    label: "Paiement annulé",
    description: "Commande annulée.",
    tone: "red"
  }
};

export const printStatusMeta: Record<PrintStatus, StatusMeta> = {
  not_started: {
    label: "Non imprimé",
    description: "Impression non démarrée.",
    tone: "neutral"
  },
  printing: {
    label: "Impression",
    description: "Impression en cours.",
    tone: "blue"
  },
  printed: {
    label: "Imprimé",
    description: "Ticket imprimé.",
    tone: "green"
  },
  failed: {
    label: "Échec impression",
    description: "Le ticket doit être réimprimé.",
    tone: "red"
  },
  reprinted: {
    label: "Réimprimé",
    description: "Ticket réimprimé.",
    tone: "green"
  }
};

export function getToneClasses(tone: Tone) {
  switch (tone) {
    case "gold":
      return "border-black bg-[var(--gold-500)] text-black";
    case "blue":
      return "border-black bg-blue-100 text-blue-950";
    case "green":
      return "border-black bg-green-100 text-green-950";
    case "red":
      return "border-black bg-red-100 text-[var(--red-600)]";
    default:
      return "border-black bg-white text-black";
  }
}
