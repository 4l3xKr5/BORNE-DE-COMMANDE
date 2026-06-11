export type ProductType = "pizza" | "drink" | "dessert" | "halfHalf" | "customPizza";
export type CategoryType = "pizza" | "drink" | "dessert";
export type PizzaBaseId = "tomato" | "cream";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: CategoryType;
  image: string;
  isAvailable: boolean;
  displayOrder: number;
};

export type PizzaFormat = {
  id: string;
  label: string;
  description: string;
  price: number;
  isAvailable: boolean;
  isLargeFormat: boolean;
  supportsHalfHalf: boolean;
  displayOrder: number;
  badge?: string;
};

export type PizzaBase = {
  id: PizzaBaseId;
  name: string;
  isAvailable: boolean;
  displayOrder: number;
};

export type Supplement = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  pricesByFormat?: Record<string, number>;
  isAvailable: boolean;
  compatibleProductIds: string[];
  compatibleCategoryIds: string[];
  compatibleFormatIds: string[];
  maxQuantity: number;
  displayOrder: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  productType: ProductType;
  image: string;
  baseId?: PizzaBaseId;
  ingredientIds: string[];
  ingredientsLabel: string;
  availableFormatIds: string[];
  pricesByFormat: Record<string, number>;
  simplePrice: number | null;
  compatibleSupplementIds: string[];
  isAvailable: boolean;
  displayOrder: number;
  badge?: string;
};

export type Ingredient = {
  id: string;
  name: string;
  image: string;
  isAvailable: boolean;
  displayOrder: number;
};

export type MenuPayload = {
  categories: Category[];
  formats: PizzaFormat[];
  bases: PizzaBase[];
  supplements: Supplement[];
  products: Product[];
  ingredients: Ingredient[];
};
