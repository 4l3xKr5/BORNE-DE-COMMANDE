import type { CartItem, SelectedSupplement } from "@/types/cart";
import type { PizzaFormat, Product, Supplement } from "@/types/menu";

export function getProductUnitPrice(product: Product, formatId?: string) {
  if (product.productType === "pizza") {
    if (!formatId) return null;
    return product.pricesByFormat[formatId] ?? null;
  }

  return product.simplePrice;
}

export function getSupplementUnitPrice(supplement: Supplement, formatId?: string) {
  if (formatId && supplement.pricesByFormat?.[formatId] !== undefined) {
    return supplement.pricesByFormat[formatId];
  }

  return supplement.price;
}

export function getFormatLabel(formats: PizzaFormat[], formatId?: string) {
  return formats.find((format) => format.id === formatId)?.label;
}

export function calculateSupplementsTotal(supplements: SelectedSupplement[]) {
  return supplements.reduce((total, supplement) => {
    if (typeof supplement.unitPrice !== "number") return total;
    return total + supplement.unitPrice * supplement.quantity;
  }, 0);
}

export function calculateLineTotal(unitPrice: number, supplements: SelectedSupplement[], quantity: number) {
  return (unitPrice + calculateSupplementsTotal(supplements)) * quantity;
}

export function calculateCartTotals(items: CartItem[]) {
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
  return { subtotal, total: subtotal };
}
