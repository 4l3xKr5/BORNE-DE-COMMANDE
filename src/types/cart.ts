import type { ProductType } from "./menu";

export type SelectedSupplement = {
  supplementId: string;
  name: string;
  quantity: number;
  unitPrice: number | null;
};

export type SelectedIngredientExtra = {
  id: string;
  name: string;
  unitPrice: number;
  isSauce: boolean;
  isFree: boolean;
};

export type IngredientExtraSummary = {
  freeAllowance: number;
  freeCount: number;
  paidCount: number;
  paidUnitPrice: number;
  total: number;
  items: SelectedIngredientExtra[];
};

export type HalfHalfSelection = {
  leftPizzaId: string;
  leftPizzaName: string;
  rightPizzaId: string;
  rightPizzaName: string;
  baseId: string;
  baseLabel: string;
};

export type CustomPizzaSelection = {
  baseId: string;
  baseLabel: string;
  ingredients: Array<{
    id: string;
    name: string;
  }>;
};

export type CartItem = {
  id: string;
  productId: string;
  productName: string;
  productType: ProductType;
  image: string;
  formatId?: string;
  formatLabel?: string;
  baseLabel?: string;
  supplements: SelectedSupplement[];
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  halfHalf?: HalfHalfSelection;
  customPizza?: CustomPizzaSelection;
  ingredientExtras?: IngredientExtraSummary;
  notes?: string;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
  total: number;
  updatedAt: string;
};
