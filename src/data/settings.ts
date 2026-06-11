import type { AppSettings } from "@/types/settings";
import { INFO_TO_CONFIRM } from "@/lib/utils/format";

export const settings: AppSettings = {
  restaurantName: "Pizza de Nuit",
  kioskMode: true,
  maintenanceMode: false,
  inactivityTimeoutSeconds: 90,
  returnHomeDelaySeconds: 8,
  ticketMessage: "Présentez votre ticket au comptoir pour régler votre commande.",
  printMode: "browser_print",
  storeInfo: {
    address: INFO_TO_CONFIRM,
    city: INFO_TO_CONFIRM,
    phone: INFO_TO_CONFIRM,
    openingHours: INFO_TO_CONFIRM
  }
};
