import type { Category } from "@/types/menu";

export const categories: Category[] = [
  {
    id: "pizzas-tomate",
    name: "Base tomate",
    slug: "pizzas-base-tomate",
    description: "Recettes classiques, carnées, fromagères et relevées.",
    type: "pizza",
    image: "/image/photo section hero.png",
    isAvailable: true,
    displayOrder: 1
  },
  {
    id: "pizzas-creme",
    name: "Base crème fraîche",
    slug: "pizzas-base-creme-fraiche",
    description: "Recettes gourmandes, onctueuses et street-food.",
    type: "pizza",
    image: "/image/pizza_moitie_moitie.png",
    isAvailable: true,
    displayOrder: 2
  },
  {
    id: "boissons",
    name: "Boissons",
    slug: "boissons",
    description: "Prix issus du site Pizza de Nuit.",
    type: "drink",
    image: "/image/boisson/boisson_fraiches.png",
    isAvailable: true,
    displayOrder: 3
  },
  {
    id: "desserts",
    name: "Desserts",
    slug: "desserts",
    description: "Prix issus du site Pizza de Nuit.",
    type: "dessert",
    image: "/image/dessert/nos_desserts.png",
    isAvailable: true,
    displayOrder: 4
  }
];
