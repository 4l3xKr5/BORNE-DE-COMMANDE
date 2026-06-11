import type { CartItem, IngredientExtraSummary, SelectedIngredientExtra, SelectedSupplement } from "@/types/cart";
import type { Ingredient, PizzaBase, PizzaFormat, Product, Supplement } from "@/types/menu";
import {
  calculateIngredientExtras,
  calculateSupplementsTotal,
  getFormatLabel,
  getProductUnitPrice,
  getSupplementUnitPrice,
  isSauceIngredient
} from "@/features/pricing/pricing.service";

type BuildCartItemInput = {
  product: Product;
  quantity: number;
  formatId?: string;
  supplementIds?: string[];
  formats: PizzaFormat[];
  bases: PizzaBase[];
  supplements: Supplement[];
  extraIngredients?: Ingredient[];
  ingredientFreeAllowance?: number;
};

type BuildHalfHalfCartItemInput = {
  leftPizza: Product;
  rightPizza: Product;
  quantity: number;
  formatId: string;
  baseId: string;
  cheesyCrust: boolean;
  formats: PizzaFormat[];
  bases: PizzaBase[];
  supplements: Supplement[];
  extraIngredients?: Ingredient[];
};

type BuildCustomPizzaCartItemInput = {
  selectedIngredients: Ingredient[];
  quantity: number;
  formatId: string;
  baseId: string;
  cheesyCrust: boolean;
  formats: PizzaFormat[];
  bases: PizzaBase[];
  supplements: Supplement[];
};

const halfHalfFormatIds = new Set(["1-2m", "60cm"]);

function buildIngredientExtraSummary(ingredients: Ingredient[], freeAllowance: number): IngredientExtraSummary | undefined {
  if (ingredients.length === 0) return undefined;

  const pricing = calculateIngredientExtras(ingredients, freeAllowance);
  let chargeableSeen = 0;
  const items: SelectedIngredientExtra[] = ingredients.map((ingredient) => {
    const isSauce = isSauceIngredient(ingredient);
    if (isSauce) {
      return {
        id: ingredient.id,
        name: ingredient.name,
        unitPrice: 0,
        isSauce: true,
        isFree: true
      };
    }

    chargeableSeen += 1;
    const isFree = chargeableSeen <= freeAllowance;

    return {
      id: ingredient.id,
      name: ingredient.name,
      unitPrice: isFree ? 0 : pricing.unitPrice,
      isSauce: false,
      isFree
    };
  });

  return {
    freeAllowance: pricing.freeAllowance,
    freeCount: pricing.freeCount,
    paidCount: pricing.paidCount,
    paidUnitPrice: pricing.unitPrice,
    total: pricing.total,
    items
  };
}

function buildSelectedSupplements(input: { supplementIds?: string[]; supplements: Supplement[]; formatId?: string }) {
  return (input.supplementIds ?? []).map((supplementId) => {
    const supplement = input.supplements.find((item) => item.id === supplementId);
    if (!supplement) {
      throw new Error("Supplément introuvable.");
    }

    const supplementPrice = getSupplementUnitPrice(supplement, input.formatId);
    if (supplementPrice === null) {
      throw new Error("Le prix de ce supplément est à confirmer.");
    }

    return {
      supplementId: supplement.id,
      name: supplement.name,
      quantity: 1,
      unitPrice: supplementPrice
    };
  });
}

export function buildCartItem(input: BuildCartItemInput): CartItem {
  const unitPrice = getProductUnitPrice(input.product, input.formatId);
  if (unitPrice === null) {
    throw new Error("Le prix de ce produit est à confirmer.");
  }

  const selectedSupplements: SelectedSupplement[] = buildSelectedSupplements({
    supplementIds: input.supplementIds,
    supplements: input.supplements,
    formatId: input.formatId
  });
  const ingredientExtras = buildIngredientExtraSummary(input.extraIngredients ?? [], input.ingredientFreeAllowance ?? 3);
  const formatLabel = getFormatLabel(input.formats, input.formatId);
  const baseLabel = input.bases.find((base) => base.id === input.product.baseId)?.name;
  const lineTotal =
    (unitPrice + calculateSupplementsTotal(selectedSupplements) + (ingredientExtras?.total ?? 0)) * input.quantity;

  return {
    id: `${input.product.id}-${input.formatId ?? "simple"}-${Date.now()}`,
    productId: input.product.id,
    productName: input.product.name,
    productType: input.product.productType,
    image: input.product.image,
    formatId: input.formatId,
    formatLabel,
    baseLabel,
    supplements: selectedSupplements,
    quantity: input.quantity,
    unitPrice,
    lineTotal,
    ingredientExtras
  };
}

function buildCheesySupplement(input: { formatId: string; enabled: boolean; supplements: Supplement[] }) {
  if (!input.enabled) return [];

  const supplement = input.supplements.find((item) => item.id === "cheesy-crust");
  if (!supplement) return [];

  const supplementPrice = getSupplementUnitPrice(supplement, input.formatId);
  if (supplementPrice === null) {
    throw new Error("Le prix de ce supplément est à confirmer.");
  }

  return [
    {
      supplementId: supplement.id,
      name: supplement.name,
      quantity: 1,
      unitPrice: supplementPrice
    }
  ];
}

export function buildHalfHalfCartItem(input: BuildHalfHalfCartItemInput): CartItem {
  const format = input.formats.find((item) => item.id === input.formatId);
  const base = input.bases.find((item) => item.id === input.baseId);
  if (!format || !base) {
    throw new Error("Sélectionnez un format et une base pour continuer.");
  }

  if (!halfHalfFormatIds.has(format.id)) {
    throw new Error("Le Moit-Moit est disponible uniquement en 1/2 mètre et 60 cm.");
  }

  if (input.leftPizza.id === input.rightPizza.id) {
    throw new Error("Choisissez deux pizzas différentes pour le Moit-Moit.");
  }

  if (input.leftPizza.baseId !== input.baseId || input.rightPizza.baseId !== input.baseId) {
    throw new Error("Les deux moitiés doivent utiliser la même base.");
  }

  const selectedSupplements = buildCheesySupplement({
    formatId: input.formatId,
    enabled: input.cheesyCrust,
    supplements: input.supplements
  });
  const ingredientExtras = buildIngredientExtraSummary(input.extraIngredients ?? [], 3);
  const lineTotal =
    (format.price + calculateSupplementsTotal(selectedSupplements) + (ingredientExtras?.total ?? 0)) * input.quantity;

  return {
    id: `half-half-${input.leftPizza.id}-${input.rightPizza.id}-${input.formatId}-${Date.now()}`,
    productId: "half-half",
    productName: "Moit-Moit",
    productType: "halfHalf",
    image: "/image/pizza_moitie_moitie.png",
    formatId: format.id,
    formatLabel: format.label,
    baseLabel: base.name,
    supplements: selectedSupplements,
    quantity: input.quantity,
    unitPrice: format.price,
    lineTotal,
    ingredientExtras,
    halfHalf: {
      leftPizzaId: input.leftPizza.id,
      leftPizzaName: input.leftPizza.name,
      rightPizzaId: input.rightPizza.id,
      rightPizzaName: input.rightPizza.name,
      baseId: base.id,
      baseLabel: base.name
    }
  };
}

export function buildCustomPizzaCartItem(input: BuildCustomPizzaCartItemInput): CartItem {
  const format = input.formats.find((item) => item.id === input.formatId);
  const base = input.bases.find((item) => item.id === input.baseId);
  if (!format || !base) {
    throw new Error("Sélectionnez un format et une base pour continuer.");
  }

  if (input.selectedIngredients.length === 0) {
    throw new Error("Choisissez au moins un ingrédient.");
  }

  const selectedSupplements = buildCheesySupplement({
    formatId: input.formatId,
    enabled: input.cheesyCrust,
    supplements: input.supplements
  });
  const ingredientExtras = buildIngredientExtraSummary(input.selectedIngredients, 6);
  const lineTotal =
    (format.price + calculateSupplementsTotal(selectedSupplements) + (ingredientExtras?.total ?? 0)) * input.quantity;

  return {
    id: `custom-pizza-${input.formatId}-${Date.now()}`,
    productId: "custom-pizza",
    productName: "Pizza personnalisée",
    productType: "customPizza",
    image: "/image/photo section hero.png",
    formatId: format.id,
    formatLabel: format.label,
    baseLabel: base.name,
    supplements: selectedSupplements,
    quantity: input.quantity,
    unitPrice: format.price,
    lineTotal,
    ingredientExtras,
    customPizza: {
      baseId: base.id,
      baseLabel: base.name,
      ingredients: input.selectedIngredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name
      }))
    }
  };
}

export function updateCartItemQuantity(item: CartItem, quantity: number): CartItem {
  const nextQuantity = Math.max(1, quantity);
  const supplementTotal = item.supplements.reduce((total, supplement) => total + (supplement.unitPrice ?? 0), 0);
  const ingredientExtraTotal = item.ingredientExtras?.total ?? 0;
  return {
    ...item,
    quantity: nextQuantity,
    lineTotal: (item.unitPrice + supplementTotal + ingredientExtraTotal) * nextQuantity
  };
}
