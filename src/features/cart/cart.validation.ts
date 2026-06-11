import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/menu";

export function validateCart(items: CartItem[], products: Product[]) {
  const errors: string[] = [];

  if (items.length === 0) {
    errors.push("Votre panier est vide.");
  }

  for (const item of items) {
    if (item.productType === "pizza" || item.productType === "drink" || item.productType === "dessert") {
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product || !product.isAvailable) {
        errors.push(`${item.productName} n'est pas disponible.`);
      }
    }

    if ((item.productType === "pizza" || item.productType === "halfHalf" || item.productType === "customPizza") && !item.formatId) {
      errors.push("Sélectionnez un format pour continuer.");
    }

    if (item.productType === "halfHalf" && (!item.halfHalf?.leftPizzaId || !item.halfHalf?.rightPizzaId)) {
      errors.push("Choisissez les deux moitiés de votre pizza.");
    }

    if (item.productType === "halfHalf" && item.halfHalf) {
      if (item.halfHalf.leftPizzaId === item.halfHalf.rightPizzaId) {
        errors.push("Choisissez deux pizzas différentes pour le Moit'-Moit'.");
      }

      const leftPizza = products.find((candidate) => candidate.id === item.halfHalf?.leftPizzaId);
      const rightPizza = products.find((candidate) => candidate.id === item.halfHalf?.rightPizzaId);
      if (!leftPizza || !rightPizza || leftPizza.baseId !== item.halfHalf.baseId || rightPizza.baseId !== item.halfHalf.baseId) {
        errors.push("Les deux moitiés doivent utiliser la même base.");
      }
    }

    if (item.productType === "customPizza" && (!item.customPizza || item.customPizza.ingredients.length === 0)) {
      errors.push("Choisissez au moins un ingrédient pour votre pizza personnalisée.");
    }

    if (!Number.isFinite(item.lineTotal) || item.lineTotal <= 0) {
      errors.push(`Prix à confirmer pour ${item.productName}.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
