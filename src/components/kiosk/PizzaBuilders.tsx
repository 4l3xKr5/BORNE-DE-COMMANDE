"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import { bases } from "@/data/bases";
import { formats } from "@/data/formats";
import { ingredients } from "@/data/ingredients";
import { products } from "@/data/products";
import { supplements } from "@/data/supplements";
import { buildCustomPizzaCartItem, buildHalfHalfCartItem } from "@/features/cart/cart.service";
import { calculateIngredientExtras, getSupplementUnitPrice, isSauceIngredient } from "@/features/pricing/pricing.service";
import { formatPrice } from "@/lib/utils/format";
import type { CartItem } from "@/types/cart";
import type { Ingredient, PizzaBaseId, Product } from "@/types/menu";
import { Button } from "@/components/ui/Button";

type BuilderProps = {
  onAdd: (item: CartItem) => void;
};

const halfHalfFormatIds = ["1-2m", "60cm"];
const meatIngredientIds = new Set(["jambon", "boeuf-hache", "poulet", "merguez", "chorizo", "bacon", "lardons", "kebab", "thon", "saumon"]);
const cheeseIngredientIds = new Set(["mozzarella", "chevre", "cheddar", "boursin", "camembert", "bleu", "mascarpone"]);
const vegetableIngredientIds = new Set(["pomme-de-terre", "poivrons", "oignons", "champignons", "olives", "oeuf", "ananas", "origan"]);

function getFormatDisplayLabel(formatId: string, fallback: string) {
  const labels: Record<string, string> = {
    "31cm": "31 cm",
    "40cm": "40 cm",
    "1-2m": "1/2 m\u00e8tre",
    "60cm": "60 cm"
  };

  return labels[formatId] ?? fallback;
}

function getBaseDisplayName(baseId: PizzaBaseId, fallback: string) {
  return baseId === "cream" ? "Cr\u00e8me fra\u00eeche" : fallback;
}

function getIngredientDisplayName(ingredient: Ingredient) {
  const names: Record<string, string> = {
    "boeuf-hache": "B\u0153uf hach\u00e9",
    chevre: "Ch\u00e8vre",
    oeuf: "\u0152uf",
    "sauce-pimentee": "Sauce piment\u00e9e",
    "sauce-samourai": "Sauce samoura\u00ef"
  };

  return names[ingredient.id] ?? ingredient.name;
}

function getProductCardDescription(product: Product) {
  const ingredientsLabel = product.ingredientsLabel
    .split(",")
    .map((ingredient) => ingredient.trim())
    .filter(Boolean)
    .slice(0, 5);

  if (ingredientsLabel.length === 0) {
    return product.description;
  }

  return `Une recette g\u00e9n\u00e9reuse avec ${ingredientsLabel.join(", ")}.`;
}
export function HalfHalfBuilderScreen({ onAdd }: BuilderProps) {
  const [formatId, setFormatId] = useState("1-2m");
  const [baseId, setBaseId] = useState<PizzaBaseId>("tomato");
  const [leftPizzaId, setLeftPizzaId] = useState("");
  const [rightPizzaId, setRightPizzaId] = useState("");
  const [activeHalf, setActiveHalf] = useState<"left" | "right">("left");
  const [extraIngredientIds, setExtraIngredientIds] = useState<string[]>([]);
  const [cheesyCrust, setCheesyCrust] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const format = formats.find((item) => item.id === formatId) ?? formats[0];
  const base = bases.find((item) => item.id === baseId) ?? bases[0];
  const formatLabel = getFormatDisplayLabel(format.id, format.label);
  const baseLabel = getBaseDisplayName(base.id, base.name);
  const basePizzas = products.filter((product) => product.productType === "pizza" && product.baseId === baseId);
  const leftPizza = basePizzas.find((pizza) => pizza.id === leftPizzaId);
  const rightPizza = basePizzas.find((pizza) => pizza.id === rightPizzaId);
  const extraIngredients = useMemo(
    () => ingredients.filter((ingredient) => extraIngredientIds.includes(ingredient.id)),
    [extraIngredientIds]
  );
  const ingredientPricing = calculateIngredientExtras(extraIngredients, 3);
  const cheesyPrice = getSupplementUnitPrice(supplements[0], formatId) ?? 0;
  const total = format.price + (cheesyCrust ? cheesyPrice : 0) + ingredientPricing.total;
  const canAdd = Boolean(leftPizza && rightPizza && leftPizza.id !== rightPizza.id);

  function toggleExtraIngredient(ingredient: Ingredient) {
    setError(null);
    setExtraIngredientIds((current) =>
      current.includes(ingredient.id) ? current.filter((id) => id !== ingredient.id) : [...current, ingredient.id]
    );
  }

  function choosePizza(pizza: Product) {
    setError(null);

    if (activeHalf === "left") {
      if (pizza.id === rightPizzaId) {
        setError("Cette pizza est d\u00e9j\u00e0 choisie pour la Moiti\u00e9 2.");
        return;
      }

      setLeftPizzaId(pizza.id);
      if (!rightPizzaId) setActiveHalf("right");
      return;
    }

    if (pizza.id === leftPizzaId) {
      setError("Cette pizza est d\u00e9j\u00e0 choisie pour la Moiti\u00e9 1.");
      return;
    }

    setRightPizzaId(pizza.id);
  }

  function addToCart() {
    if (!leftPizza || !rightPizza) {
      setError("Choisissez les deux moiti\u00e9s de votre pizza.");
      return;
    }

    if (leftPizza.id === rightPizza.id) {
      setError("Choisissez deux pizzas diff\u00e9rentes pour votre Moit-Moit.");
      return;
    }

    const item = buildHalfHalfCartItem({
      leftPizza,
      rightPizza,
      quantity: 1,
      formatId,
      baseId,
      cheesyCrust,
      formats,
      bases,
      supplements,
      extraIngredients
    });
    onAdd(item);
  }

  return (
    <div className="min-h-full bg-[var(--night-950)] pb-5 text-white">
      <section className="px-5 pb-4 pt-7">
        <span className="pdn-label inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-base text-[var(--gold-500)]">
          <Sparkles size={13} /> {"Option partage 50/50"}
        </span>
        <h1 className="pdn-display mt-3 text-[3.35rem] leading-none text-white">{"Compose ta Moit-Moit"}</h1>
        <p className="mt-2 max-w-2xl text-base font-extrabold leading-snug text-white/68">
          {"Choisis deux pizzas diff\u00e9rentes sur la m\u00eame base, ajoute tes suppl\u00e9ments, puis valide ta cr\u00e9ation."}
        </p>
      </section>

      <div className="space-y-5 px-5 pb-0">
        <HalfHalfLivePreview
          formatLabel={formatLabel}
          baseLabel={baseLabel}
          leftPizza={leftPizza}
          rightPizza={rightPizza}
          activeHalf={activeHalf}
          onActiveHalf={setActiveHalf}
        />

        <FormatBasePanel
          formatId={formatId}
          baseId={baseId}
          onFormat={setFormatId}
          allowedFormatIds={halfHalfFormatIds}
          onBase={(id) => {
            setBaseId(id);
            setLeftPizzaId("");
            setRightPizzaId("");
            setActiveHalf("left");
            setError(null);
          }}
        />

        <section className="rounded-lg border-2 border-white/10 bg-white p-4 text-black shadow-[0_6px_0_var(--gold-500)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="pdn-label text-xl text-[var(--red-500)]">{"Choisis tes deux moiti\u00e9s"}</p>
              <p className="text-sm font-bold text-[var(--neutral-700)]">
                {"M\u00eame base : "}{baseLabel}{". Fais d\u00e9filer les pizzas horizontalement."}
              </p>
            </div>
            <span className="pdn-label rounded-full border-2 border-black bg-[var(--gold-500)] px-3 py-1 text-base">
              {"50/50 inclus"}
            </span>
          </div>

          <HalfPickerTabs
            activeHalf={activeHalf}
            leftPizza={leftPizza}
            rightPizza={rightPizza}
            onActiveHalf={setActiveHalf}
          />

          <PizzaChoiceCarousel
            pizzas={basePizzas}
            activeHalf={activeHalf}
            leftPizzaId={leftPizzaId}
            rightPizzaId={rightPizzaId}
            onPick={choosePizza}
          />
        </section>

        <HalfHalfIngredientCarousels
          selectedIds={extraIngredientIds}
          onToggle={toggleExtraIngredient}
          freeAllowance={3}
          pricing={ingredientPricing}
        />
        <CheesyCrustToggle checked={cheesyCrust} formatId={formatId} onChange={setCheesyCrust} />
        {error ? <p className="pdn-title rounded-xl bg-red-100 p-3 text-sm text-[var(--red-600)]">{error}</p> : null}
        <BuilderTotalBar
          label="Total Moit-Moit"
          total={total}
          onAdd={addToCart}
          disabled={!canAdd}
          helper={canAdd ? "Deux recettes, une seule base." : "Choisissez la Moiti\u00e9 1 et la Moiti\u00e9 2."}
          actionLabel="Valider ma Moit-Moit"
        />
      </div>
    </div>
  );
}
export function CustomPizzaBuilderScreen({ onAdd }: BuilderProps) {
  const [formatId, setFormatId] = useState("31cm");
  const [baseId, setBaseId] = useState<PizzaBaseId>("tomato");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [cheesyCrust, setCheesyCrust] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const maxIngredients = 8;

  const format = formats.find((item) => item.id === formatId) ?? formats[0];
  const base = bases.find((item) => item.id === baseId) ?? bases[0];
  const formatLabel = getFormatDisplayLabel(format.id, format.label);
  const baseLabel = getBaseDisplayName(base.id, base.name);
  const selectedIngredients = useMemo(
    () => ingredients.filter((ingredient) => selectedIds.includes(ingredient.id)),
    [selectedIds]
  );
  const ingredientPricing = calculateIngredientExtras(selectedIngredients, 6);
  const cheesyPrice = getSupplementUnitPrice(supplements[0], formatId) ?? 0;
  const total = format.price + (cheesyCrust ? cheesyPrice : 0) + ingredientPricing.total;
  const canAdd = selectedIngredients.length > 0;

  function toggleIngredient(ingredient: Ingredient) {
    setError(null);
    setSelectedIds((current) => {
      if (current.includes(ingredient.id)) {
        return current.filter((id) => id !== ingredient.id);
      }

      if (current.length >= maxIngredients) {
        setError(`Maximum ${maxIngredients} ingr\u00e9dients pour garder le ticket lisible.`);
        return current;
      }

      return [...current, ingredient.id];
    });
  }

  function addToCart() {
    if (selectedIngredients.length === 0) {
      setError("Choisissez au moins un ingr\u00e9dient.");
      return;
    }

    const item = buildCustomPizzaCartItem({
      selectedIngredients,
      quantity: 1,
      formatId,
      baseId,
      cheesyCrust,
      formats,
      bases,
      supplements
    });
    onAdd(item);
  }

  return (
    <BuilderLayout
      eyebrow="Composition sur mesure"
      title="Compose ta"
      highlight="Pizza"
      subtitle={"Choisis une base, un format et jusqu'\u00e0 huit ingr\u00e9dients. L'aper\u00e7u reste visible pendant la composition."}
    >
      <div className="space-y-5 p-5 pt-0">
        <CustomPizzaLivePreview
          formatLabel={formatLabel}
          baseLabel={baseLabel}
          selectedIngredients={selectedIngredients}
          maxIngredients={maxIngredients}
        />

        <FormatBasePanel formatId={formatId} baseId={baseId} onFormat={setFormatId} onBase={setBaseId} />

        <IngredientPicker
          title={"3. Choisis tes ingr\u00e9dients"}
          description={"S\u00e9lection tactile simple, visuels v\u00e9rifi\u00e9s et sauces gratuites."}
          selectedIds={selectedIds}
          onToggle={toggleIngredient}
          maxIngredients={maxIngredients}
          freeAllowance={6}
          pricing={ingredientPricing}
        />

        <CheesyCrustToggle checked={cheesyCrust} formatId={formatId} onChange={setCheesyCrust} />

        {error ? <p className="pdn-title rounded-lg bg-red-100 p-3 text-sm text-[var(--red-600)]">{error}</p> : null}
        <BuilderTotalBar
          label="Total Pizza"
          total={total}
          onAdd={addToCart}
          disabled={!canAdd}
          helper={canAdd ? "Composition pr\u00eate \u00e0 ajouter au panier." : "Choisissez au moins un ingr\u00e9dient."}
          actionLabel="Valider ma pizza"
        />
      </div>
    </BuilderLayout>
  );
}
function BuilderLayout({
  eyebrow,
  title,
  highlight,
  subtitle,
  children
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-[#fffdf6] pb-5">
      <section className="px-5 pb-5 pt-8 text-center">
        <span className="pdn-label inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1 text-base shadow">
          <Sparkles size={13} className="text-[var(--gold-500)]" /> {eyebrow}
        </span>
        <h1 className="pdn-display mx-auto mt-3 max-w-xl text-6xl">
          {title}
          <span className="pdn-yellow-shadow block text-[var(--gold-500)]">{highlight}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm font-semibold text-[var(--neutral-700)]">{subtitle}</p>
        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[var(--gold-500)]" />
      </section>
      {children}
    </div>
  );
}

function FormatBasePanel({
  formatId,
  baseId,
  onFormat,
  onBase,
  allowedFormatIds
}: {
  formatId: string;
  baseId: PizzaBaseId;
  onFormat: (id: string) => void;
  onBase: (id: PizzaBaseId) => void;
  allowedFormatIds?: string[];
}) {
  const availableFormats = allowedFormatIds ? formats.filter((format) => allowedFormatIds.includes(format.id)) : formats;

  return (
    <section className="rounded-lg border-2 border-white/10 bg-white p-4 text-black shadow-[0_6px_0_var(--gold-500)]">
      <p className="pdn-label mb-3 text-lg">1. Choisissez le format</p>
      <div className="grid grid-cols-2 gap-3">
        {availableFormats.map((format) => (
          <button
            key={format.id}
            onClick={() => onFormat(format.id)}
            className={`pdn-label pdn-pressable min-h-12 rounded-xl border-2 px-3 text-lg ${
              formatId === format.id ? "pdn-card-shadow-sm border-black bg-[var(--gold-500)]" : "border-black/20 bg-[#fffdf6]"
            }`}
          >
            {getFormatDisplayLabel(format.id, format.label)} ({formatPrice(format.price)})
          </button>
        ))}
      </div>
      <p className="pdn-label mb-3 mt-5 text-lg">2. Choisissez la base de sauce</p>
      <div className="grid grid-cols-2 gap-3">
        {bases.map((base) => (
          <button
            key={base.id}
            onClick={() => onBase(base.id)}
            className={`pdn-label pdn-pressable min-h-12 rounded-xl border-2 px-3 text-lg ${
              baseId === base.id
                ? "pdn-card-shadow-sm border-black bg-[var(--red-500)] text-white"
                : "border-black/20 bg-[#fffdf6]"
            }`}
          >
            {getBaseDisplayName(base.id, base.name)}
          </button>
        ))}
      </div>
    </section>
  );
}

function HalfHalfLivePreview({
  formatLabel,
  baseLabel,
  leftPizza,
  rightPizza,
  activeHalf,
  onActiveHalf
}: {
  formatLabel: string;
  baseLabel: string;
  leftPizza?: Product;
  rightPizza?: Product;
  activeHalf: "left" | "right";
  onActiveHalf: (half: "left" | "right") => void;
}) {
  return (
    <section className="sticky top-0 z-30 -mx-5 min-h-[286px] border-y border-white/10 bg-[rgba(5,5,5,0.94)] px-6 py-5 text-white shadow-[0_8px_0_rgba(244,196,0,0.22)] backdrop-blur-md">
      <div className="mx-auto grid max-w-[760px] grid-cols-[240px_minmax(0,1fr)] items-center gap-5">
        <div className="relative mx-auto aspect-square w-full max-w-[232px]">
          <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-[var(--gold-500)] bg-white shadow-[0_8px_0_#000]">
            {leftPizza ? (
              <img
                src={leftPizza.image}
                alt=""
                className="absolute inset-0 h-full w-full scale-110 object-contain"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            ) : (
              <div
                className="absolute inset-0 grid place-items-center bg-[var(--gold-500)]/30"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              >
                <span className="pdn-display -translate-x-7 text-4xl text-black">1</span>
              </div>
            )}
            {rightPizza ? (
              <img
                src={rightPizza.image}
                alt=""
                className="absolute inset-0 h-full w-full scale-110 object-contain"
                style={{ clipPath: "inset(0 0 0 50%)" }}
              />
            ) : (
              <div
                className="absolute inset-0 grid place-items-center bg-[var(--red-500)]/20"
                style={{ clipPath: "inset(0 0 0 50%)" }}
              >
                <span className="pdn-display translate-x-7 text-4xl text-black">2</span>
              </div>
            )}
            <div className="absolute left-1/2 top-[8%] h-[84%] w-[4px] -translate-x-1/2 rounded-full bg-black" />
            <div className="pdn-label absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-black bg-[var(--gold-500)] text-sm text-black shadow-[4px_4px_0_#000]">
              50/50
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="pdn-label rounded-full border border-white/15 bg-white/10 px-3 py-1 text-base">{"Format : "}{formatLabel}</span>
            <span className="pdn-label rounded-full border border-white/15 bg-white/10 px-3 py-1 text-base">{"Base : "}{baseLabel}</span>
          </div>
          <h2 className="pdn-title text-2xl leading-tight">
            {(leftPizza?.name ?? "Moiti\u00e9 1 \u00e0 choisir") + " / " + (rightPizza?.name ?? "Moiti\u00e9 2 \u00e0 choisir")}
          </h2>
          <p className="text-sm font-extrabold leading-snug text-white/66">
            {activeHalf === "left" ? "S\u00e9lection en cours : Moiti\u00e9 1" : "S\u00e9lection en cours : Moiti\u00e9 2"}
          </p>
          <div className="grid max-w-[390px] grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onActiveHalf("left")}
              className={`pdn-pressable rounded-lg border-2 px-3 py-2 text-left ${
                activeHalf === "left" ? "border-[var(--gold-500)] bg-[var(--gold-500)] text-black" : "border-white/15 bg-white/10 text-white"
              }`}
            >
              <span className="pdn-label block text-sm text-[var(--red-500)]">{"Moiti\u00e9 1"}</span>
              <span className="pdn-title text-sm">{leftPizza?.name ?? "\u00c0 choisir"}</span>
            </button>
            <button
              type="button"
              onClick={() => onActiveHalf("right")}
              className={`pdn-pressable rounded-lg border-2 px-3 py-2 text-left ${
                activeHalf === "right" ? "border-[var(--gold-500)] bg-[var(--gold-500)] text-black" : "border-white/15 bg-white/10 text-white"
              }`}
            >
              <span className="pdn-label block text-sm text-[var(--red-500)]">{"Moiti\u00e9 2"}</span>
              <span className="pdn-title text-sm">{rightPizza?.name ?? "\u00c0 choisir"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HalfPickerTabs({
  activeHalf,
  leftPizza,
  rightPizza,
  onActiveHalf
}: {
  activeHalf: "left" | "right";
  leftPizza?: Product;
  rightPizza?: Product;
  onActiveHalf: (half: "left" | "right") => void;
}) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <HalfSlot
        label={"Moiti\u00e9 1"}
        pizza={leftPizza}
        active={activeHalf === "left"}
        onClick={() => onActiveHalf("left")}
      />
      <HalfSlot
        label={"Moiti\u00e9 2"}
        pizza={rightPizza}
        active={activeHalf === "right"}
        onClick={() => onActiveHalf("right")}
      />
    </div>
  );
}

function HalfSlot({ label, pizza, active, onClick }: { label: string; pizza?: Product; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pdn-pressable min-h-24 rounded-lg border-2 p-3 text-left ${
        active ? "border-black bg-[var(--gold-500)] shadow-[4px_4px_0_#000]" : "border-black/15 bg-[#fffdf6]"
      }`}
    >
      <span className="pdn-label text-base text-[var(--red-500)]">{label}</span>
      <span className="mt-2 flex items-center gap-3">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-md border-2 border-black bg-white">
          {pizza ? <img src={pizza.image} alt="" className="h-12 w-12 object-contain" /> : <span className="pdn-display text-2xl">?</span>}
        </span>
        <span>
          <span className="pdn-display block text-2xl leading-none text-black">{pizza?.name ?? "\u00c0 choisir"}</span>
          <span className="mt-1 block text-xs font-extrabold text-[var(--neutral-700)]">
            {pizza ? "Touchez pour modifier" : "S\u00e9lectionnez cette moiti\u00e9"}
          </span>
        </span>
      </span>
    </button>
  );
}

function PizzaChoiceCarousel({
  pizzas,
  activeHalf,
  leftPizzaId,
  rightPizzaId,
  onPick
}: {
  pizzas: Product[];
  activeHalf: "left" | "right";
  leftPizzaId: string;
  rightPizzaId: string;
  onPick: (pizza: Product) => void;
}) {
  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="pdn-label text-base text-[var(--neutral-700)]">{"Glisse pour voir toutes les recettes"}</p>
        <span className="pdn-label rounded-full bg-black px-3 py-1 text-sm text-[var(--gold-500)]">Carousel</span>
      </div>
      <div className="flex snap-x gap-4 overflow-x-auto pb-3 pr-2">
        {pizzas.map((pizza) => {
          const selectedLeft = pizza.id === leftPizzaId;
          const selectedRight = pizza.id === rightPizzaId;
          const unavailable = activeHalf === "left" ? selectedRight : selectedLeft;
          const selected = selectedLeft || selectedRight;

          return (
            <button
              key={pizza.id}
              type="button"
              onClick={() => onPick(pizza)}
              disabled={unavailable}
              className={`pdn-pressable relative min-h-[360px] w-[260px] shrink-0 snap-start overflow-hidden rounded-lg border-2 p-3 text-left disabled:cursor-not-allowed disabled:opacity-55 ${
                selected ? "border-black bg-[var(--gold-500)] shadow-[6px_6px_0_#000]" : "border-black bg-[var(--paper-50)] shadow-[5px_5px_0_rgba(0,0,0,0.72)]"
              }`}
            >
              <span className="relative grid h-40 place-items-center overflow-hidden rounded-md border border-black/10 bg-[linear-gradient(145deg,#fff8df,#eee3c5)]">
                <span className="absolute inset-x-8 bottom-5 h-7 rounded-full bg-black/20 blur-xl" />
                <img src={pizza.image} alt="" className="relative z-10 h-36 w-full object-contain p-2 pdn-product-drop-shadow" />
              </span>
              <span className="mt-4 flex min-h-[64px] items-start justify-between gap-2">
                <strong className="pdn-display text-[1.75rem] leading-[0.92] text-black">{pizza.name}</strong>
                {selectedLeft ? <SelectionBadge label={"Moiti\u00e9 1"} /> : null}
                {selectedRight ? <SelectionBadge label={"Moiti\u00e9 2"} /> : null}
              </span>
              <span className="mt-2 block min-h-[66px] overflow-hidden text-sm font-extrabold leading-snug text-[var(--neutral-700)]">
                {getProductCardDescription(pizza)}
              </span>
              <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 border-t border-black/10 pt-3">
                <span className="pdn-label text-base text-[var(--red-500)]">
                  {unavailable ? "D\u00e9j\u00e0 choisie" : activeHalf === "left" ? "Choisir Moiti\u00e9 1" : "Choisir Moiti\u00e9 2"}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black text-[var(--gold-500)]">
                  {selected ? <Check size={18} /> : "+"}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SelectionBadge({ label }: { label: string }) {
  return <span className="pdn-label shrink-0 rounded-full bg-black px-2 py-1 text-xs text-[var(--gold-500)]">{label}</span>;
}
function CustomPizzaLivePreview({
  formatLabel,
  baseLabel,
  selectedIngredients,
  maxIngredients
}: {
  formatLabel: string;
  baseLabel: string;
  selectedIngredients: Ingredient[];
  maxIngredients: number;
}) {
  const previewIngredients = selectedIngredients.slice(0, 6);
  const selectedNames = selectedIngredients.map(getIngredientDisplayName).join(", ");

  return (
    <section className="sticky top-0 z-20 -mx-5 min-h-[292px] border-y-[3px] border-black bg-[#fffdf6]/96 px-6 py-5 shadow-[0_8px_0_rgba(0,0,0,0.16)] backdrop-blur">
      <div className="mx-auto grid max-w-[760px] grid-cols-[240px_minmax(0,1fr)] items-center gap-5">
        <div className="relative mx-auto aspect-square w-full max-w-[232px]">
          <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-black bg-white drop-shadow-2xl">
            <img src="/image/photo section hero.png" alt="" className="h-full w-full scale-125 object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(255,196,0,0.2)_72%)]" />
            <div className="pdn-card-shadow-sm pdn-label absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-black bg-[var(--gold-500)] text-center text-base leading-tight">
              {selectedIngredients.length}/{maxIngredients}
            </div>
          </div>
          {previewIngredients.map((ingredient, index) => {
            const positions = [
              "left-1 top-10",
              "right-1 top-12",
              "left-4 bottom-12",
              "right-4 bottom-10",
              "left-1/2 top-1 -translate-x-1/2",
              "left-1/2 bottom-1 -translate-x-1/2"
            ];

            return (
              <span
                key={ingredient.id}
                className={`pdn-card-shadow-sm absolute ${positions[index]} grid h-16 w-16 place-items-center rounded-full border-2 border-black bg-white`}
              >
                <img src={ingredient.image} alt="" className="h-12 w-12 object-contain" />
              </span>
            );
          })}
        </div>

        <div className="space-y-3">
          <div>
            <p className="pdn-label text-lg text-[var(--red-500)]">{"Aper\u00e7u en direct"}</p>
            <h2 className="pdn-title text-3xl leading-tight">{"Pizza personnalis\u00e9e"}</h2>
            <p className="mt-1 text-sm font-extrabold text-[var(--neutral-700)]">
              {"Format : "}{formatLabel}{" \u00b7 Base : "}{baseLabel}
            </p>
          </div>
          <div className="rounded-lg border-2 border-black/10 bg-white p-3">
            <p className="pdn-label text-sm text-[var(--red-500)]">{"Ingr\u00e9dients"}</p>
            <p className="mt-1 min-h-[44px] text-sm font-bold leading-snug text-black/75">
              {selectedIngredients.length > 0 ? selectedNames : "Ajoute tes ingr\u00e9dients pour voir ta cr\u00e9ation."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function HalfHalfIngredientCarousels({
  selectedIds,
  onToggle,
  freeAllowance,
  pricing
}: {
  selectedIds: string[];
  onToggle: (ingredient: Ingredient) => void;
  freeAllowance: number;
  pricing: ReturnType<typeof calculateIngredientExtras>;
}) {
  const groups = [
    { title: "Viandes", items: ingredients.filter((ingredient) => meatIngredientIds.has(ingredient.id)) },
    { title: "L\u00e9gumes", items: ingredients.filter((ingredient) => vegetableIngredientIds.has(ingredient.id)) },
    { title: "Fromages", items: ingredients.filter((ingredient) => cheeseIngredientIds.has(ingredient.id)) },
    { title: "Sauces", items: ingredients.filter((ingredient) => isSauceIngredient(ingredient)) }
  ].filter((group) => group.items.length > 0);

  const selectedChargeableIds = ingredients
    .filter((ingredient) => selectedIds.includes(ingredient.id) && !isSauceIngredient(ingredient))
    .map((ingredient) => ingredient.id);

  return (
    <section className="rounded-lg border-2 border-white/10 bg-white p-4 text-black shadow-[0_6px_0_var(--gold-500)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="pdn-label text-xl text-[var(--red-500)]">{"Suppl\u00e9ments"}</p>
          <p className="text-sm font-bold text-[var(--neutral-700)]">{"Suppl\u00e9ments class\u00e9s par famille, sauces gratuites."}</p>
          <p className="pdn-label mt-2 text-base text-black">
            {pricing.freeCount}/{freeAllowance}{" offerts \u00b7 "}{pricing.paidCount}{" payant"}{pricing.paidCount > 1 ? "s" : ""}{" \u00b7 +"}{formatPrice(pricing.total)}
          </p>
        </div>
        <span className="pdn-label rounded-full bg-black px-3 py-1 text-base text-[var(--gold-500)]">
          {selectedIds.length}{" s\u00e9lectionn\u00e9"}{selectedIds.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-5 space-y-5">
        {groups.map((group) => (
          <SupplementCarousel
            key={group.title}
            title={group.title}
            items={group.items}
            selectedIds={selectedIds}
            selectedChargeableIds={selectedChargeableIds}
            freeAllowance={freeAllowance}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}

function SupplementCarousel({
  title,
  items,
  selectedIds,
  selectedChargeableIds,
  freeAllowance,
  onToggle
}: {
  title: string;
  items: Ingredient[];
  selectedIds: string[];
  selectedChargeableIds: string[];
  freeAllowance: number;
  onToggle: (ingredient: Ingredient) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="pdn-display text-3xl leading-none text-black">{title}</h3>
        <span className="pdn-label text-sm text-[var(--neutral-700)]">{"Glisse horizontalement"}</span>
      </div>
      <div className="flex snap-x gap-3 overflow-x-auto pb-2 pr-2">
        {items.map((ingredient) => {
          const selected = selectedIds.includes(ingredient.id);
          const isSauce = isSauceIngredient(ingredient);
          const chargeableIndex = selectedChargeableIds.indexOf(ingredient.id);
          const selectedIsFree = chargeableIndex >= 0 && chargeableIndex < freeAllowance;
          const priceLabel = isSauce ? "Gratuit" : selected ? (selectedIsFree ? "Offert" : "+1,00 \u20ac") : "Ajouter";

          return (
            <button
              key={ingredient.id}
              type="button"
              onClick={() => onToggle(ingredient)}
              className={`pdn-pressable relative min-h-[152px] w-[138px] shrink-0 snap-start rounded-lg border-2 p-2 text-center ${
                selected ? "border-black bg-[var(--gold-500)] shadow-[4px_4px_0_#000]" : "border-black/15 bg-[#fffdf6] shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
              }`}
            >
              {selected ? (
                <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-black text-white">
                  <Check size={14} />
                </span>
              ) : null}
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-black bg-white">
                <img src={ingredient.image} alt="" className="h-12 w-12 object-contain" />
              </span>
              <span className="pdn-title mt-2 block text-[11px] leading-tight">{getIngredientDisplayName(ingredient)}</span>
              <span className="pdn-label mt-2 block text-xs text-[var(--red-500)]">{priceLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
function IngredientPicker({
  title,
  description,
  selectedIds,
  onToggle,
  maxIngredients,
  freeAllowance,
  pricing
}: {
  title: string;
  description: string;
  selectedIds: string[];
  onToggle: (ingredient: Ingredient) => void;
  maxIngredients?: number;
  freeAllowance: number;
  pricing: ReturnType<typeof calculateIngredientExtras>;
}) {
  return (
    <section className="rounded-lg border-2 border-white/10 bg-white p-4 text-black shadow-[0_6px_0_var(--gold-500)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="pdn-label text-xl text-[var(--red-500)]">{title}</p>
          <p className="text-sm font-bold text-[var(--neutral-700)]">{description}</p>
          <p className="pdn-label mt-2 text-base text-black">
            {pricing.freeCount}/{freeAllowance}{" offerts \u00b7 "}{pricing.paidCount}{" payant"}{pricing.paidCount > 1 ? "s" : ""}{" \u00b7 +"}{formatPrice(pricing.total)}
          </p>
        </div>
        <span className={`pdn-label rounded-full px-3 py-1 text-base text-white ${maxIngredients && selectedIds.length >= maxIngredients ? "bg-[var(--red-500)]" : "bg-black"}`}>
          {selectedIds.length}{maxIngredients ? `/${maxIngredients}` : ""}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {ingredients.map((ingredient) => {
          const selected = selectedIds.includes(ingredient.id);
          const limitReached = Boolean(maxIngredients && selectedIds.length >= maxIngredients && !selected);
          const isSauce = isSauceIngredient(ingredient);
          return (
            <button
              key={ingredient.id}
              type="button"
              onClick={() => onToggle(ingredient)}
              disabled={limitReached}
              className={`pdn-pressable relative min-h-[142px] rounded-lg border-2 p-2 text-center disabled:cursor-not-allowed disabled:opacity-45 ${
                selected ? "border-black bg-[var(--gold-500)] shadow-[4px_4px_0_#000]" : "border-black/15 bg-[#fffdf6] shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
              }`}
            >
              {selected ? (
                <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-black text-white">
                  <Check size={14} />
                </span>
              ) : null}
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-black bg-white">
                <img src={ingredient.image} alt="" className="h-12 w-12 object-contain" />
              </span>
              <span className="pdn-title mt-2 block text-[11px] leading-tight">{getIngredientDisplayName(ingredient)}</span>
              {selected ? <span className="pdn-label mt-1 block text-xs text-black">{"S\u00e9lectionn\u00e9"}</span> : null}
              {!selected && isSauce ? <span className="pdn-label mt-1 block text-xs text-[var(--red-500)]">Gratuit</span> : null}
              {limitReached ? <span className="pdn-label mt-1 block text-xs text-[var(--red-500)]">Max atteint</span> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
function CheesyCrustToggle({
  checked,
  formatId,
  onChange
}: {
  checked: boolean;
  formatId: string;
  onChange: (checked: boolean) => void;
}) {
  const price = getSupplementUnitPrice(supplements[0], formatId);

  return (
    <section className="rounded-lg border-2 border-white/10 bg-white p-4 text-black shadow-[0_6px_0_var(--gold-500)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="pdn-label text-xl text-[var(--red-500)]">Options</p>
          <p className="text-sm font-bold text-[var(--neutral-700)]">{"Ajoute une finition gourmande \u00e0 ta pizza."}</p>
        </div>
        <span className={`pdn-label rounded-full px-3 py-1 text-base ${checked ? "bg-[var(--gold-500)] text-black" : "bg-black text-white"}`}>
          {checked ? "Ajout\u00e9" : "Option"}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`pdn-pressable flex min-h-[84px] w-full items-center justify-between gap-4 rounded-lg border-2 p-4 text-left transition ${
          checked
            ? "border-black bg-[var(--gold-500)] shadow-[5px_5px_0_#000] ring-4 ring-[rgba(244,196,0,0.28)]"
            : "border-black/15 bg-[#fffdf6] shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
        }`}
      >
        <span>
          <span className="pdn-title block text-lg">Cheesy Crust</span>
          <span className="text-sm font-bold text-black/70">Bordure farcie au fromage fondu</span>
        </span>
        <span className="flex items-center gap-3">
          <span className="pdn-label rounded-full bg-black px-3 py-1 text-sm text-[var(--gold-500)]">+{formatPrice(price)}</span>
          <span className={`grid h-8 w-8 place-items-center rounded-full border-2 border-black ${checked ? "bg-black text-white" : "bg-white text-transparent"}`}>
            <Check size={17} />
          </span>
        </span>
      </button>
    </section>
  );
}
function BuilderTotalBar({
  label,
  total,
  onAdd,
  disabled = false,
  helper,
  actionLabel = "Ajouter au panier"
}: {
  label: string;
  total: number;
  onAdd: () => void;
  disabled?: boolean;
  helper?: string;
  actionLabel?: string;
}) {
  return (
    <section className="sticky bottom-0 z-20 -mx-5 flex items-center justify-between gap-3 border-[3px] border-x-0 border-b-0 border-black bg-[var(--gold-500)] p-4 text-black shadow-[0_-5px_0_var(--night-950)]">
      <span>
        <span className="pdn-label block text-lg text-[var(--red-500)]">{label}</span>
        <span className="pdn-title block text-4xl">{formatPrice(total)}</span>
        {helper ? <span className="block text-xs font-extrabold text-black/70">{helper}</span> : null}
      </span>
      <Button onClick={onAdd} disabled={disabled} className="min-w-48 rounded-full">
        <span className="inline-flex items-center gap-1">
          {actionLabel} <ChevronRight size={20} />
        </span>
      </Button>
    </section>
  );
}
