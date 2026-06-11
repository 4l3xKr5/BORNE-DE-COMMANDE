import type { Category } from "@/types/menu";

export const categories: Category[] = [
  {
    id: "pizzas-tomate",
    name: "Base tomate",
    slug: "pizzas-base-tomate",
    description: "Nos recettes authentiques cuisinées sur une sauce tomate savoureuse. Retrouvez les grands classiques incontournables.",
    type: "pizza",
    image: "/image/pizzas/marguerita.webp",
    isAvailable: true,
    displayOrder: 1
  },
  {
    id: "pizzas-creme",
    name: "Base crème fraîche",
    slug: "pizzas-base-creme-fraiche",
    description: "Une base de crème fraîche légère et onctueuse pour des recettes gourmandes, douces et généreuses en goût.",
    type: "pizza",
    image: "/image/pizzas/cremita.webp",
    isAvailable: true,
    displayOrder: 2
  },
  {
    id: "boissons",
    name: "Boissons",
    slug: "boissons",
    description: "Pour accompagner votre repas, découvrez notre sélection de sodas, d'eaux fraîches et de boissons désaltérantes.",
    type: "drink",
    image: "/image/boisson/boisson_fraiches.png",
    isAvailable: true,
    displayOrder: 3
  },
  {
    id: "desserts",
    name: "Desserts",
    slug: "desserts",
    description: "Terminez sur une note sucrée avec nos desserts gourmands, tiramisus maison et glaces rafraîchissantes pour la nuit.",
    type: "dessert",
    image: "/image/dessert/nos_desserts.png",
    isAvailable: true,
    displayOrder: 4
  }
];
