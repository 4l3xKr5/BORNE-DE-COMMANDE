import type { PizzaFormat } from "@/types/menu";

export const formats: PizzaFormat[] = [
  {
    id: "31cm",
    label: "31 cm",
    description: "L'individuelle. Possibilité moitié-moitié sur une même base.",
    price: 10,
    isAvailable: true,
    isLargeFormat: false,
    supportsHalfHalf: true,
    displayOrder: 1
  },
  {
    id: "40cm",
    label: "40 cm",
    description: "La généreuse. Possibilité moitié-moitié sur une même base.",
    price: 15,
    isAvailable: true,
    isLargeFormat: false,
    supportsHalfHalf: true,
    displayOrder: 2
  },
  {
    id: "1-2m",
    label: "1/2 mètre",
    description: "Le compromis. Possibilité moitié-moitié sur une même base.",
    price: 20,
    isAvailable: true,
    isLargeFormat: true,
    supportsHalfHalf: true,
    displayOrder: 3,
    badge: "À partager"
  },
  {
    id: "60cm",
    label: "60 cm",
    description: "L'extrême XXL. Possibilité moitié-moitié sur une même base.",
    price: 30,
    isAvailable: true,
    isLargeFormat: true,
    supportsHalfHalf: true,
    displayOrder: 4,
    badge: "Format géant"
  }
];
