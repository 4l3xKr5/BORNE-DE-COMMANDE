import type { Product, PizzaBaseId } from "@/types/menu";
import { formats } from "./formats";

type PizzaSeed = {
  id: string;
  name: string;
  ingredients: string[];
  base: PizzaBaseId;
  isSpicy?: boolean;
  isPopular?: boolean;
};

const pizzaSeeds: PizzaSeed[] = [
  { id: "marguerita", name: "Marguerita", ingredients: ["mozzarella", "olives"], base: "tomato" },
  { id: "thon", name: "Thon", ingredients: ["mozzarella", "thon", "poivrons", "oignons"], base: "tomato" },
  { id: "reine", name: "Reine", ingredients: ["mozzarella", "jambon", "champignons"], base: "tomato" },
  { id: "camembert", name: "Camembert", ingredients: ["mozzarella", "camembert", "origan"], base: "tomato" },
  {
    id: "piquante",
    name: "Piquante",
    ingredients: ["mozzarella", "merguez", "poivrons", "olives", "sauce pimentée"],
    base: "tomato",
    isSpicy: true
  },
  {
    id: "cannibale",
    name: "Cannibale",
    ingredients: ["bœuf haché", "mozzarella", "merguez", "chorizo", "oignons", "olives"],
    base: "tomato",
    isPopular: true
  },
  {
    id: "lilloise",
    name: "Lilloise",
    ingredients: ["mozzarella", "jambon", "chorizo", "merguez", "champignons", "œufs", "olives"],
    base: "tomato"
  },
  {
    id: "4-fromages",
    name: "4 Fromages",
    ingredients: ["mozzarella", "fromage de chèvre", "reblochon", "bleu", "crème italienne"],
    base: "tomato",
    isPopular: true
  },
  {
    id: "barbecue",
    name: "Barbecue",
    ingredients: ["bœuf haché", "mozzarella", "jambon", "poivrons", "oignons", "sauce barbecue"],
    base: "tomato"
  },
  {
    id: "vegetarienne",
    name: "Végétarienne",
    ingredients: ["mozzarella", "poivrons", "oignons", "champignons", "olives"],
    base: "tomato"
  },
  { id: "hawaienne", name: "Hawaïenne", ingredients: ["mozzarella", "jambon", "ananas"], base: "tomato" },
  {
    id: "supreme-cannibale",
    name: "Suprême Cannibale",
    ingredients: ["bœuf haché", "mozzarella", "merguez", "chorizo", "jambon", "oignons", "sauce hot pili"],
    base: "tomato",
    isSpicy: true
  },
  { id: "orientale", name: "Orientale", ingredients: ["mozzarella", "merguez", "poivrons", "œuf"], base: "tomato" },
  { id: "buffalo", name: "Buffalo", ingredients: ["bœuf haché", "mozzarella", "champignons", "oignons"], base: "tomato" },
  {
    id: "bolognaise",
    name: "Bolognaise",
    ingredients: ["bœuf haché", "mozzarella", "pomme de terre", "oignons"],
    base: "tomato"
  },
  {
    id: "mexicaine",
    name: "Mexicaine",
    ingredients: ["bœuf haché épicé à la mexicaine", "mozzarella", "poivrons", "oignons"],
    base: "tomato",
    isSpicy: true
  },
  { id: "capri", name: "Capri", ingredients: ["bœuf haché", "mozzarella", "fromage de chèvre"], base: "tomato" },
  {
    id: "tartiflette",
    name: "Tartiflette",
    ingredients: ["mozzarella", "pomme de terre", "lardons", "oignons", "reblochon"],
    base: "tomato"
  },
  { id: "chorizo", name: "Chorizo", ingredients: ["mozzarella", "chorizo", "poivrons", "œuf"], base: "tomato" },
  { id: "chevre-miel", name: "Chèvre-Miel", ingredients: ["mozzarella", "chèvre", "miel"], base: "cream", isPopular: true },
  { id: "cremita", name: "Crémita", ingredients: ["mozzarella", "crème italienne"], base: "cream" },
  {
    id: "fermiere",
    name: "Fermière",
    ingredients: ["mozzarella", "jambon", "champignons", "crème italienne"],
    base: "cream"
  },
  {
    id: "chicken",
    name: "Chicken",
    ingredients: ["mozzarella", "poulet frais", "pomme de terre", "oignons", "olives"],
    base: "cream"
  },
  {
    id: "chicken-spicy",
    name: "Chicken Spicy",
    ingredients: ["mozzarella", "poulet frais", "oignons", "cheddar", "sauce spicy"],
    base: "cream",
    isSpicy: true,
    isPopular: true
  },
  {
    id: "savoyarde",
    name: "Savoyarde",
    ingredients: ["mozzarella", "lardons", "pomme de terre", "oignons", "reblochon"],
    base: "cream"
  },
  {
    id: "cheesy",
    name: "Cheesy",
    ingredients: ["mozzarella", "fromage de chèvre", "reblochon", "bleu", "crème italienne"],
    base: "cream",
    isPopular: true
  },
  { id: "bacon", name: "Bacon", ingredients: ["mozzarella", "poulet frais", "bacon", "oignons"], base: "cream" },
  {
    id: "street-kebab",
    name: "Street Kebab",
    ingredients: ["mozzarella", "sauce samouraï", "kebab", "poivrons", "oignons"],
    base: "cream",
    isSpicy: true,
    isPopular: true
  },
  { id: "norvegienne", name: "Norvégienne", ingredients: ["mozzarella", "saumon", "champignons"], base: "cream" },
  {
    id: "extreme-boursin",
    name: "Extrême Boursin",
    ingredients: ["mozzarella", "jambon", "lardons", "boursin"],
    base: "cream"
  },
  {
    id: "charcut-pizza",
    name: "Charcut'Pizza",
    ingredients: ["mozzarella", "jambon", "lardons", "poulet", "oignons", "œufs"],
    base: "cream"
  },
  {
    id: "classique",
    name: "Classique",
    ingredients: ["mozzarella", "pomme de terre", "jambon", "œuf", "olives"],
    base: "cream"
  },
  {
    id: "douceur",
    name: "Douceur",
    ingredients: ["viande hachée", "mozzarella", "fromage de chèvre", "pomme de terre", "poivrons", "oignons"],
    base: "cream"
  }
];

const pricesByFormat = Object.fromEntries(formats.map((format) => [format.id, format.price]));
const allFormatIds = formats.map((format) => format.id);

const pizzas: Product[] = pizzaSeeds.map((pizza, index) => ({
  id: pizza.id,
  name: pizza.name,
  slug: pizza.id,
  description: pizza.ingredients.join(", "),
  categoryId: pizza.base === "tomato" ? "pizzas-tomate" : "pizzas-creme",
  productType: "pizza",
  image: `/image/pizzas/${pizza.id}.webp`,
  baseId: pizza.base,
  ingredientIds: pizza.ingredients,
  ingredientsLabel: pizza.ingredients.join(", "),
  availableFormatIds: allFormatIds,
  pricesByFormat,
  simplePrice: null,
  compatibleSupplementIds: ["cheesy-crust"],
  isAvailable: true,
  displayOrder: index + 1,
  badge: pizza.isSpicy ? "Épicée" : pizza.isPopular ? "Populaire" : undefined
}));

const drinks: Product[] = [
  {
    id: "canette-33cl",
    name: "Canette",
    slug: "canette-33cl",
    description: "Sélection de boissons fraîches au choix. Gammes exactes à confirmer.",
    categoryId: "boissons",
    productType: "drink",
    image: "/image/boisson/canette-33cl.png",
    ingredientIds: [],
    ingredientsLabel: "Information à confirmer.",
    availableFormatIds: [],
    pricesByFormat: {},
    simplePrice: 1,
    compatibleSupplementIds: [],
    isAvailable: true,
    displayOrder: 101
  },
  {
    id: "bouteille-1-5l",
    name: "Bouteille",
    slug: "bouteille-1-5l",
    description: "Format familial 1.5L pour accompagner les pizzas à partager.",
    categoryId: "boissons",
    productType: "drink",
    image: "/image/boisson/bouteille-1-5l.png",
    ingredientIds: [],
    ingredientsLabel: "Information à confirmer.",
    availableFormatIds: [],
    pricesByFormat: {},
    simplePrice: 2.5,
    compatibleSupplementIds: [],
    isAvailable: true,
    displayOrder: 102
  }
];

const desserts: Product[] = [
  {
    id: "tarte-daim",
    name: "Tarte au Daim",
    slug: "tarte-daim",
    description: "Tarte croquante aux amandes, caramel fondant et chocolat au lait Daim.",
    categoryId: "desserts",
    productType: "dessert",
    image: "/image/dessert/tarte daim.png",
    ingredientIds: [],
    ingredientsLabel: "Information à confirmer.",
    availableFormatIds: [],
    pricesByFormat: {},
    simplePrice: 2.5,
    compatibleSupplementIds: [],
    isAvailable: true,
    displayOrder: 201
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    slug: "tiramisu",
    description: "Classique crémeux au café, mascarpone et cacao.",
    categoryId: "desserts",
    productType: "dessert",
    image: "/image/dessert/tiramisu.png",
    ingredientIds: [],
    ingredientsLabel: "Information à confirmer.",
    availableFormatIds: [],
    pricesByFormat: {},
    simplePrice: 2.5,
    compatibleSupplementIds: [],
    isAvailable: true,
    displayOrder: 202
  }
];

export const products: Product[] = [...pizzas, ...drinks, ...desserts];
