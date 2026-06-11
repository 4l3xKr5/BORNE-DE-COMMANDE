import type { Supplement } from "@/types/menu";
export const supplements: Supplement[] = [
  {
    id: "cheesy-crust",
    name: "Cheesy Crust",
    description: "Bordure de pâte farcie au fromage fondu.",
    price: null,
    pricesByFormat: {
      "31cm": 2,
      "40cm": 3,
      "1-2m": 4,
      "60cm": 5
    },
    isAvailable: true,
    compatibleProductIds: [],
    compatibleCategoryIds: ["pizzas-tomate", "pizzas-creme"],
    compatibleFormatIds: ["31cm", "40cm", "1-2m", "60cm"],
    maxQuantity: 1,
    displayOrder: 1
  }
];
