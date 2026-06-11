import type { MenuPayload } from "@/types/menu";
import { bases } from "./bases";
import { categories } from "./categories";
import { formats } from "./formats";
import { products } from "./products";
import { supplements } from "./supplements";
import { ingredients } from "./ingredients";

export const menu: MenuPayload = {
  categories,
  formats,
  bases,
  supplements,
  products,
  ingredients
};
