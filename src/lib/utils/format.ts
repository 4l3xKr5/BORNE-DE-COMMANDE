export const INFO_TO_CONFIRM = "Information à confirmer.";

export function formatPrice(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return INFO_TO_CONFIRM;
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

export function titleFromSlug(slug: string) {
  return slug
    .replace(/\.(webp|png|jpg|jpeg)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
