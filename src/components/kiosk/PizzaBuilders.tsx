"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import { bases } from "@/data/bases";
import { formats } from "@/data/formats";
import { ingredients } from "@/data/ingredients";
import { products } from "@/data/products";
import { supplements } from "@/data/supplements";
import { buildCustomPizzaCartItem, buildHalfHalfCartItem } from "@/features/cart/cart.service";
import { getSupplementUnitPrice } from "@/features/pricing/pricing.service";
import { formatPrice } from "@/lib/utils/format";
import type { CartItem } from "@/types/cart";
import type { Ingredient, PizzaBaseId, Product } from "@/types/menu";
import { Button } from "@/components/ui/Button";

type BuilderProps = {
  onAdd: (item: CartItem) => void;
};

export function HalfHalfBuilderScreen({ onAdd }: BuilderProps) {
  const [formatId, setFormatId] = useState("31cm");
  const [baseId, setBaseId] = useState<PizzaBaseId>("tomato");
  const [leftPizzaId, setLeftPizzaId] = useState("");
  const [rightPizzaId, setRightPizzaId] = useState("");
  const [activeHalf, setActiveHalf] = useState<"left" | "right">("left");
  const [cheesyCrust, setCheesyCrust] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const format = formats.find((item) => item.id === formatId) ?? formats[0];
  const base = bases.find((item) => item.id === baseId) ?? bases[0];
  const basePizzas = products.filter((product) => product.productType === "pizza" && product.baseId === baseId);
  const leftPizza = basePizzas.find((pizza) => pizza.id === leftPizzaId);
  const rightPizza = basePizzas.find((pizza) => pizza.id === rightPizzaId);
  const cheesyPrice = getSupplementUnitPrice(supplements[0], formatId) ?? 0;
  const total = format.price + (cheesyCrust ? cheesyPrice : 0);
  const canAdd = Boolean(leftPizza && rightPizza && leftPizza.id !== rightPizza.id);

  function choosePizza(pizza: Product) {
    setError(null);

    if (activeHalf === "left") {
      if (pizza.id === rightPizzaId) {
        setError("Cette pizza est déjà choisie pour la moitié droite.");
        return;
      }

      setLeftPizzaId(pizza.id);
      if (!rightPizzaId) setActiveHalf("right");
      return;
    }

    if (pizza.id === leftPizzaId) {
      setError("Cette pizza est déjà choisie pour la moitié gauche.");
      return;
    }

    setRightPizzaId(pizza.id);
  }

  function addToCart() {
    if (!leftPizza || !rightPizza) {
      setError("Choisissez les deux moitiés de votre pizza.");
      return;
    }

    if (leftPizza.id === rightPizza.id) {
      setError("Choisissez deux pizzas différentes pour le Moit’-Moit’.");
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
      supplements
    });
    onAdd(item);
  }

  return (
    <BuilderLayout
      eyebrow="Option partage 50/50 inclus"
      title="CRÉEZ VOTRE"
      highlight="MOIT’-MOIT’"
      subtitle="Partagez plus qu'une pizza. Sélectionnez deux recettes sur une même base."
    >
      <div className="space-y-5 p-5 pt-0">
        <HalfHalfLivePreview
          formatLabel={format.label}
          baseLabel={base.name}
          leftPizza={leftPizza}
          rightPizza={rightPizza}
          activeHalf={activeHalf}
          onActiveHalf={setActiveHalf}
        />

        <FormatBasePanel
          formatId={formatId}
          baseId={baseId}
          onFormat={setFormatId}
          onBase={(id) => {
            setBaseId(id);
            setLeftPizzaId("");
            setRightPizzaId("");
            setActiveHalf("left");
            setError(null);
          }}
        />

        <section className="rounded-[18px] border-[3px] border-black bg-white p-4 shadow-[5px_5px_0_#050505]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="pdn-label text-lg text-[var(--red-500)]">3. Choisissez les deux recettes</p>
              <p className="text-sm font-bold text-[var(--neutral-700)]">Même base : {base.name}</p>
            </div>
            <span className="pdn-label rounded-full border-2 border-black bg-[var(--gold-500)] px-3 py-1 text-base">
              50/50 inclus
            </span>
          </div>

          <HalfPickerTabs
            activeHalf={activeHalf}
            leftPizza={leftPizza}
            rightPizza={rightPizza}
            onActiveHalf={setActiveHalf}
          />

          <PizzaChoiceGrid
            pizzas={basePizzas}
            activeHalf={activeHalf}
            leftPizzaId={leftPizzaId}
            rightPizzaId={rightPizzaId}
            onPick={choosePizza}
          />
        </section>

        <CheesyCrustToggle checked={cheesyCrust} formatId={formatId} onChange={setCheesyCrust} />
        {error ? <p className="pdn-title rounded-xl bg-red-100 p-3 text-sm text-[var(--red-600)]">{error}</p> : null}
        <BuilderTotalBar
          label="Total Moit’-Moit’"
          total={total}
          onAdd={addToCart}
          disabled={!canAdd}
          helper={canAdd ? "Deux recettes, une seule base." : "Choisissez une moitié gauche et une moitié droite."}
        />
      </div>
    </BuilderLayout>
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
  const selectedIngredients = useMemo(
    () => ingredients.filter((ingredient) => selectedIds.includes(ingredient.id)),
    [selectedIds]
  );
  const cheesyPrice = getSupplementUnitPrice(supplements[0], formatId) ?? 0;
  const total = format.price + (cheesyCrust ? cheesyPrice : 0);
  const canAdd = selectedIngredients.length > 0;

  function toggleIngredient(ingredient: Ingredient) {
    setError(null);
    setSelectedIds((current) => {
      if (current.includes(ingredient.id)) {
        return current.filter((id) => id !== ingredient.id);
      }

      if (current.length >= maxIngredients) {
        setError(`Maximum ${maxIngredients} ingrédients pour garder le ticket lisible.`);
        return current;
      }

      return [...current, ingredient.id];
    });
  }

  function addToCart() {
    if (selectedIngredients.length === 0) {
      setError("Choisissez au moins un ingrédient.");
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
      title="CRÉEZ VOTRE"
      highlight="PIZZA"
      subtitle="Choisissez une base, un format et jusqu'à huit ingrédients."
    >
      <div className="space-y-5 p-5 pt-0">
        <CustomPizzaLivePreview
          formatLabel={format.label}
          baseLabel={base.name}
          selectedIngredients={selectedIngredients}
          maxIngredients={maxIngredients}
        />

        <FormatBasePanel formatId={formatId} baseId={baseId} onFormat={setFormatId} onBase={setBaseId} />
        <IngredientPicker selectedIds={selectedIds} onToggle={toggleIngredient} maxIngredients={maxIngredients} />
        <CheesyCrustToggle checked={cheesyCrust} formatId={formatId} onChange={setCheesyCrust} />
        {error ? <p className="pdn-title rounded-xl bg-red-100 p-3 text-sm text-[var(--red-600)]">{error}</p> : null}
        <BuilderTotalBar
          label="Total Pizza"
          total={total}
          onAdd={addToCart}
          disabled={!canAdd}
          helper={canAdd ? `${selectedIngredients.length} ingrédient${selectedIngredients.length > 1 ? "s" : ""} sélectionné${selectedIngredients.length > 1 ? "s" : ""}.` : "Choisissez au moins un ingrédient."}
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
  onBase
}: {
  formatId: string;
  baseId: PizzaBaseId;
  onFormat: (id: string) => void;
  onBase: (id: PizzaBaseId) => void;
}) {
  return (
    <section className="rounded-[18px] border-[3px] border-black bg-white p-4 shadow-[5px_5px_0_#050505]">
      <p className="pdn-label mb-3 text-lg">1. Choisissez le format</p>
      <div className="grid grid-cols-2 gap-3">
        {formats.map((format) => (
          <button
            key={format.id}
            onClick={() => onFormat(format.id)}
            className={`pdn-label min-h-12 rounded-xl border-2 px-3 text-lg ${
              formatId === format.id ? "border-black bg-[var(--gold-500)]" : "border-black/20 bg-[#fffdf6]"
            }`}
          >
            {format.label} ({format.price}€)
          </button>
        ))}
      </div>
      <p className="pdn-label mb-3 mt-5 text-lg">2. Choisissez la base de sauce</p>
      <div className="grid grid-cols-2 gap-3">
        {bases.map((base) => (
          <button
            key={base.id}
            onClick={() => onBase(base.id)}
            className={`pdn-label min-h-12 rounded-xl border-2 px-3 text-lg ${
              baseId === base.id
                ? "border-black bg-[var(--red-500)] text-white"
                : "border-black/20 bg-[#fffdf6]"
            }`}
          >
            {base.id === "tomato" ? "🍅 " : "🥛 "}
            {base.name}
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
    <section className="sticky top-0 z-20 -mx-5 border-y-[3px] border-black bg-[#fffdf6]/95 px-5 py-4 shadow-[0_8px_0_rgba(0,0,0,0.12)] backdrop-blur">
      <div className="grid grid-cols-[0.88fr_1.12fr] items-center gap-4">
        <div className="relative mx-auto aspect-square w-full max-w-[270px]">
          <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-black bg-white drop-shadow-2xl">
            {leftPizza ? (
              <img
                src={leftPizza.image}
                alt=""
                className="absolute inset-0 h-full w-full scale-110 object-contain"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            ) : (
              <div
                className="absolute inset-0 grid place-items-center bg-[var(--gold-500)]/35"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              >
                <span className="pdn-title -translate-x-7 text-2xl">A</span>
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
                <span className="pdn-title translate-x-7 text-2xl">B</span>
              </div>
            )}
            <div className="absolute left-1/2 top-[9%] h-[82%] w-[4px] -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_2px_rgba(255,196,0,0.75)]" />
            <div className="pdn-label absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-black bg-[var(--gold-500)] text-sm shadow-[3px_3px_0_#050505]">
              50/50
            </div>
          </div>
          <span className="pdn-label absolute left-0 top-5 rotate-[-7deg] rounded border-2 border-black bg-white px-2 py-1 text-sm">
            A {leftPizza?.name ?? "à choisir"}
          </span>
          <span className="pdn-label absolute bottom-5 right-0 rotate-[7deg] rounded border-2 border-black bg-white px-2 py-1 text-sm">
            B {rightPizza?.name ?? "à choisir"}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <p className="pdn-label text-lg text-[var(--red-500)]">Aperçu en direct</p>
            <h2 className="pdn-title text-2xl leading-tight">
              {leftPizza?.name ?? "Moitié gauche"} / {rightPizza?.name ?? "Moitié droite"}
            </h2>
          </div>
          <div className="pdn-label grid grid-cols-2 gap-2 text-base">
            <span className="rounded-lg border-2 border-black bg-white px-2 py-2">Taille : {formatLabel}</span>
            <span className="rounded-lg border-2 border-black bg-white px-2 py-2">Base : {baseLabel}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onActiveHalf("left")}
              className={`pdn-label min-h-14 rounded-xl border-2 px-3 text-left text-base ${
                activeHalf === "left" ? "border-black bg-[var(--gold-500)] shadow-[3px_3px_0_#050505]" : "border-black/20 bg-white"
              }`}
            >
              <span className="block text-sm text-[var(--red-500)]">Choisir A</span>
              {leftPizza?.name ?? "Moitié gauche"}
            </button>
            <button
              onClick={() => onActiveHalf("right")}
              className={`pdn-label min-h-14 rounded-xl border-2 px-3 text-left text-base ${
                activeHalf === "right" ? "border-black bg-[var(--gold-500)] shadow-[3px_3px_0_#050505]" : "border-black/20 bg-white"
              }`}
            >
              <span className="block text-sm text-[var(--red-500)]">Choisir B</span>
              {rightPizza?.name ?? "Moitié droite"}
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
      <button
        onClick={() => onActiveHalf("left")}
        className={`pdn-label min-h-16 rounded-xl border-2 px-3 text-left text-lg ${
          activeHalf === "left" ? "border-black bg-[var(--gold-500)] shadow-[3px_3px_0_#050505]" : "border-black/20 bg-[#fffdf6]"
        }`}
      >
        <span className="block text-sm text-[var(--red-500)]">Moitié gauche (A)</span>
        <span className="text-sm">{leftPizza?.name ?? "À choisir"}</span>
      </button>
      <button
        onClick={() => onActiveHalf("right")}
        className={`pdn-label min-h-16 rounded-xl border-2 px-3 text-left text-lg ${
          activeHalf === "right" ? "border-black bg-[var(--gold-500)] shadow-[3px_3px_0_#050505]" : "border-black/20 bg-[#fffdf6]"
        }`}
      >
        <span className="block text-sm text-[var(--red-500)]">Moitié droite (B)</span>
        <span className="text-sm">{rightPizza?.name ?? "À choisir"}</span>
      </button>
    </div>
  );
}

function PizzaChoiceGrid({
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
    <div className="mt-4 grid grid-cols-2 gap-3">
      {pizzas.map((pizza) => {
        const selectedLeft = pizza.id === leftPizzaId;
        const selectedRight = pizza.id === rightPizzaId;
        const unavailable = activeHalf === "left" ? selectedRight : selectedLeft;
        const selected = selectedLeft || selectedRight;

        return (
          <button
            key={pizza.id}
            onClick={() => onPick(pizza)}
            disabled={unavailable}
            className={`relative min-h-[128px] rounded-[16px] border-2 p-3 text-left transition active:translate-y-1 disabled:cursor-not-allowed disabled:opacity-55 ${
              selected
                ? "border-black bg-[var(--gold-500)] shadow-[4px_4px_0_#050505]"
                : "border-black/15 bg-[#fffdf6] shadow-[2px_2px_0_rgba(0,0,0,0.12)]"
            }`}
          >
            <div className="flex gap-3">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-black bg-white">
                <img src={pizza.image} alt="" className="h-16 w-16 object-contain" />
              </div>
              <div className="min-w-0">
                <span className="pdn-title block text-base leading-tight">{pizza.name}</span>
                <span className="mt-1 line-clamp-3 block text-[11px] font-semibold leading-tight text-[var(--neutral-700)]">
                  {pizza.ingredientsLabel}
                </span>
              </div>
            </div>
            {selectedLeft ? <HalfBadge label="Gauche A" /> : null}
            {selectedRight ? <HalfBadge label="Droite B" /> : null}
            {unavailable ? (
              <span className="pdn-label absolute inset-x-3 bottom-3 rounded-full bg-black px-3 py-1 text-center text-sm text-white">
                Déjà choisie
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function HalfBadge({ label }: { label: string }) {
  return (
    <span className="pdn-label absolute right-2 top-2 rounded-full border-2 border-black bg-white px-2 py-1 text-sm">
      {label}
    </span>
  );
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

  return (
    <section className="sticky top-0 z-20 -mx-5 border-y-[3px] border-black bg-[#fffdf6]/95 px-5 py-4 shadow-[0_8px_0_rgba(0,0,0,0.12)] backdrop-blur">
      <div className="grid grid-cols-[0.82fr_1.18fr] items-center gap-4">
        <div className="relative mx-auto aspect-square w-full max-w-[255px]">
          <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-black bg-white drop-shadow-2xl">
            <img src="/image/photo section hero.png" alt="" className="h-full w-full scale-125 object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(255,196,0,0.18)_72%)]" />
            <div className="pdn-label absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-black bg-[var(--gold-500)] text-center text-base leading-tight shadow-[3px_3px_0_#050505]">
              {selectedIngredients.length}/{maxIngredients}
            </div>
          </div>
          {previewIngredients.map((ingredient, index) => {
            const positions = [
              "left-1 top-8",
              "right-1 top-10",
              "left-3 bottom-9",
              "right-3 bottom-8",
              "left-1/2 top-0 -translate-x-1/2",
              "left-1/2 bottom-0 -translate-x-1/2"
            ];

            return (
              <span
                key={ingredient.id}
                className={`absolute ${positions[index]} grid h-14 w-14 place-items-center rounded-full border-2 border-black bg-white shadow-[3px_3px_0_#050505]`}
              >
                <img src={ingredient.image} alt="" className="h-10 w-10 object-contain" />
              </span>
            );
          })}
        </div>

        <div className="space-y-3">
          <div>
            <p className="pdn-label text-lg text-[var(--red-500)]">Aperçu en direct</p>
            <h2 className="pdn-title text-2xl leading-tight">Pizza personnalisée</h2>
          </div>
          <div className="pdn-label grid grid-cols-2 gap-2 text-base">
            <span className="rounded-lg border-2 border-black bg-white px-2 py-2">Taille : {formatLabel}</span>
            <span className="rounded-lg border-2 border-black bg-white px-2 py-2">Base : {baseLabel}</span>
          </div>
          {selectedIngredients.length ? (
            <div className="flex max-h-24 flex-wrap gap-2 overflow-hidden">
              {selectedIngredients.map((ingredient) => (
                <span key={ingredient.id} className="pdn-label rounded-full border-2 border-black bg-white px-3 py-1 text-sm">
                  {ingredient.name}
                </span>
              ))}
            </div>
          ) : (
            <div className="pdn-label rounded-xl border-2 border-dashed border-black/35 bg-white px-3 py-3 text-lg text-[var(--neutral-700)]">
              Touchez vos ingrédients préférés.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function IngredientPicker({
  selectedIds,
  onToggle,
  maxIngredients
}: {
  selectedIds: string[];
  onToggle: (ingredient: Ingredient) => void;
  maxIngredients: number;
}) {
  return (
    <section className="rounded-[18px] border-[3px] border-black bg-white p-4 shadow-[5px_5px_0_#050505]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="pdn-label text-lg text-[var(--red-500)]">3. Choisissez vos ingrédients</p>
          <p className="text-sm font-bold text-[var(--neutral-700)]">Ils sont inclus tant que les prix suppléments ne sont pas confirmés.</p>
        </div>
        <span className={`pdn-label rounded-full px-3 py-1 text-base text-white ${selectedIds.length >= maxIngredients ? "bg-[var(--red-500)]" : "bg-black"}`}>
          {selectedIds.length}/{maxIngredients}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {ingredients.map((ingredient) => {
          const selected = selectedIds.includes(ingredient.id);
          const limitReached = selectedIds.length >= maxIngredients && !selected;
          return (
            <button
              key={ingredient.id}
              onClick={() => onToggle(ingredient)}
              disabled={limitReached}
              className={`relative min-h-32 rounded-[16px] border-2 p-2 text-center transition active:translate-y-1 disabled:cursor-not-allowed disabled:opacity-45 ${
                selected ? "border-black bg-[var(--gold-500)] shadow-[3px_3px_0_#050505]" : "border-black/15 bg-[#fffdf6] shadow-[2px_2px_0_rgba(0,0,0,0.1)]"
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
              <span className="pdn-title mt-2 block text-[11px] leading-tight">{ingredient.name}</span>
              {limitReached ? <span className="pdn-label mt-1 block text-sm text-[var(--red-500)]">Max atteint</span> : null}
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
    <label className="flex items-center justify-between gap-4 rounded-[18px] border-[3px] border-black bg-white p-4 shadow-[5px_5px_0_#050505]">
      <span>
        <span className="pdn-title block text-sm">Cheesy Crust</span>
        <span className="text-xs font-semibold">Bordure farcie au fromage fondu (+{formatPrice(price)})</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-8 w-8 accent-[var(--gold-500)]"
      />
    </label>
  );
}

function BuilderTotalBar({
  label,
  total,
  onAdd,
  disabled = false,
  helper
}: {
  label: string;
  total: number;
  onAdd: () => void;
  disabled?: boolean;
  helper?: string;
}) {
  return (
    <section className="sticky bottom-0 z-20 -mx-5 flex items-center justify-between gap-3 border-[3px] border-x-0 border-b-0 border-black bg-black p-4 text-white shadow-[0_-5px_0_var(--gold-500)]">
      <span>
        <span className="pdn-label block text-lg text-[var(--gold-500)]">{label}</span>
        <span className="pdn-title block text-4xl">{formatPrice(total)}</span>
        {helper ? <span className="block text-xs font-bold text-white/75">{helper}</span> : null}
      </span>
      <Button onClick={onAdd} disabled={disabled} className="min-w-48 rounded-full">
        <span className="inline-flex items-center gap-1">
          Ajouter au panier <ChevronRight size={20} />
        </span>
      </Button>
    </section>
  );
}
