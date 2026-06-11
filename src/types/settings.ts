export type AppSettings = {
  restaurantName: string;
  kioskMode: boolean;
  maintenanceMode: boolean;
  inactivityTimeoutSeconds: number;
  returnHomeDelaySeconds: number;
  ticketMessage: string;
  printMode: "browser_print";
  storeInfo: {
    address: string;
    city: string;
    phone: string;
    openingHours: string;
  };
};
