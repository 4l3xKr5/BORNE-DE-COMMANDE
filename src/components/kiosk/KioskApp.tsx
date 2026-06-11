"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Home, Minus, Plus, Printer, ShoppingCart, Trash2 } from "lucide-react";
import { bases } from "@/data/bases";
import { categories } from "@/data/categories";
import { formats } from "@/data/formats";
import { products } from "@/data/products";
import { settings } from "@/data/settings";
import { supplements } from "@/data/supplements";
import { buildCartItem, updateCartItemQuantity } from "@/features/cart/cart.service";
import { calculateCartTotals } from "@/features/pricing/pricing.service";
import { formatPrice } from "@/lib/utils/format";
import type { CartItem } from "@/types/cart";
import type { Category, Product } from "@/types/menu";
import type { Order } from "@/types/order";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TicketPrintable } from "@/components/ticket/TicketPrintable";
import { CustomPizzaBuilderScreen, HalfHalfBuilderScreen } from "@/components/kiosk/PizzaBuilders";

type Screen = "home" | "categories" | "products" | "detail" | "halfHalfBuilder" | "customPizzaBuilder" | "cart" | "review" | "confirmation";

export function KioskApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFormatId, setSelectedFormatId] = useState<string>("31cm");
  const [cheesySelected, setCheesySelected] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const totals = useMemo(() => calculateCartTotals(cartItems), [cartItems]);
  const categoryProducts = products.filter((product) => product.categoryId === selectedCategory?.id);
  const isBuilderScreen = screen === "halfHalfBuilder" || screen === "customPizzaBuilder";
  const showFooter = !isBuilderScreen && screen !== "confirmation";

  useEffect(() => {
    const markActivity = () => setLastActivity(Date.now());
    window.addEventListener("pointerdown", markActivity);
    window.addEventListener("keydown", markActivity);
    return () => {
      window.removeEventListener("pointerdown", markActivity);
      window.removeEventListener("keydown", markActivity);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (screen !== "home" && Date.now() - lastActivity > settings.inactivityTimeoutSeconds * 1000) {
        resetSession();
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [lastActivity, screen]);

  useEffect(() => {
    if (screen !== "confirmation") return;
    const timeout = window.setTimeout(resetSession, settings.returnHomeDelaySeconds * 1000);
    return () => window.clearTimeout(timeout);
  }, [screen]);

  function resetSession() {
    setScreen("home");
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSelectedFormatId("31cm");
    setCheesySelected(false);
    setCartItems([]);
    setOrder(null);
    setError(null);
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setSelectedFormatId(product.availableFormatIds[0] ?? "31cm");
    setCheesySelected(false);
    setError(null);
    setScreen("detail");
  }

  function addSelectedProduct() {
    if (!selectedProduct) return;

    try {
      const item = buildCartItem({
        product: selectedProduct,
        quantity: 1,
        formatId: selectedProduct.productType === "pizza" ? selectedFormatId : undefined,
        supplementIds: cheesySelected ? ["cheesy-crust"] : [],
        formats,
        bases,
        supplements
      });
      setCartItems((items) => [...items, item]);
      setScreen("cart");
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Commande impossible.");
    }
  }

  function changeQuantity(itemId: string, delta: number) {
    setCartItems((items) =>
      items.map((item) => (item.id === itemId ? updateCartItemQuantity(item, item.quantity + delta) : item))
    );
  }

  async function validateOrder() {
    if (cartItems.length === 0) {
      setError("Votre panier est vide.");
      return;
    }

    setError(null);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems, subtotal: totals.subtotal, total: totals.total })
    });
    const payload = (await response.json()) as { ok: boolean; data?: Order; error?: string };

    if (!payload.ok || !payload.data) {
      setError(payload.error ?? "La commande n'a pas pu être validée.");
      return;
    }

    setOrder(payload.data);
    setScreen("confirmation");
    window.setTimeout(() => window.print(), 250);
  }

  return (
    <main className="kiosk-shell">
      <div className="kiosk-frame flex h-dvh flex-col">
        <header className="no-print flex items-center justify-between bg-[var(--night-950)] px-5 py-4 text-white">
          <button className="flex items-center gap-2 text-sm font-bold" onClick={() => (screen === "home" ? resetSession() : setScreen("categories"))}>
            {screen === "home" ? <Home size={22} /> : <ArrowLeft size={22} />}
            {screen === "home" ? "Accueil" : "Retour"}
          </button>
          <img src="/image/LOGO PIZZA DE NUIT_.webp" alt="Pizza de Nuit" className="h-14 w-28 object-contain" />
          <button className="relative rounded-full bg-white/10 p-3" onClick={() => setScreen("cart")} aria-label="Panier">
            <ShoppingCart size={24} />
            {cartItems.length > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[var(--gold-500)] text-xs font-black text-black">
                {cartItems.length}
              </span>
            ) : null}
          </button>
        </header>

        <section className={`no-print flex-1 overflow-y-auto scrollbar-soft ${showFooter ? "pb-36" : "pb-0"}`}>
          {settings.maintenanceMode ? <Maintenance /> : null}
          {!settings.maintenanceMode && screen === "home" ? <HomeScreen onStart={() => setScreen("categories")} /> : null}
          {!settings.maintenanceMode && screen === "categories" ? (
            <CategoryScreen
              onSelect={(category) => {
                setSelectedCategory(category);
                setScreen("products");
              }}
              onHalfHalf={() => setScreen("halfHalfBuilder")}
              onCustomPizza={() => setScreen("customPizzaBuilder")}
            />
          ) : null}
          {!settings.maintenanceMode && screen === "products" && selectedCategory ? (
            <ProductsScreen category={selectedCategory} products={categoryProducts} onOpen={openProduct} />
          ) : null}
          {!settings.maintenanceMode && screen === "detail" && selectedProduct ? (
            <DetailScreen
              product={selectedProduct}
              selectedFormatId={selectedFormatId}
              setSelectedFormatId={setSelectedFormatId}
              cheesySelected={cheesySelected}
              setCheesySelected={setCheesySelected}
              error={error}
              onAdd={addSelectedProduct}
            />
          ) : null}
          {!settings.maintenanceMode && screen === "halfHalfBuilder" ? (
            <HalfHalfBuilderScreen
              onAdd={(item) => {
                setCartItems((items) => [...items, item]);
                setScreen("cart");
              }}
            />
          ) : null}
          {!settings.maintenanceMode && screen === "customPizzaBuilder" ? (
            <CustomPizzaBuilderScreen
              onAdd={(item) => {
                setCartItems((items) => [...items, item]);
                setScreen("cart");
              }}
            />
          ) : null}
          {!settings.maintenanceMode && screen === "cart" ? (
            <CartScreen items={cartItems} onQuantity={changeQuantity} onRemove={(id) => setCartItems((items) => items.filter((item) => item.id !== id))} />
          ) : null}
          {!settings.maintenanceMode && screen === "review" ? (
            <ReviewScreen items={cartItems} total={totals.total} error={error} />
          ) : null}
          {!settings.maintenanceMode && screen === "confirmation" && order ? <ConfirmationScreen order={order} /> : null}
        </section>

        {order ? <TicketPrintable order={order} /> : null}

        {showFooter ? (
          <footer className="kiosk-footer no-print fixed inset-x-0 bottom-0 mx-auto border-t-2 border-[var(--night-950)] bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-[var(--neutral-500)]">Total panier</p>
                <p className="text-2xl font-black">{formatPrice(totals.total)}</p>
                <p className="text-xs font-bold">Paiement au comptoir après impression du ticket.</p>
              </div>
              {screen === "cart" ? (
                <Button disabled={cartItems.length === 0} onClick={() => setScreen("review")} className="min-w-56">
                  Valider ma commande
                </Button>
              ) : screen === "review" ? (
                <Button disabled={cartItems.length === 0} onClick={validateOrder} className="min-w-64">
                  <span className="inline-flex items-center gap-2">
                    <Printer size={22} /> Valider et imprimer le ticket
                  </span>
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => setScreen("cart")} className="min-w-44">
                  Voir panier
                </Button>
              )}
            </div>
          </footer>
        ) : null}
      </div>
    </main>
  );
}

function Maintenance() {
  return (
    <div className="grid min-h-[70dvh] place-items-center p-8 text-center">
      <div>
        <h1 className="text-4xl font-black uppercase">Borne en maintenance</h1>
        <p className="mt-4 text-lg">Merci de commander directement au comptoir.</p>
      </div>
    </div>
  );
}

function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-[calc(100dvh-96px)] bg-[var(--night-950)] text-white">
      <div className="relative flex min-h-[calc(100dvh-96px)] flex-col justify-between overflow-hidden p-8">
        <img src="/image/photo section hero.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/90" />
        <div className="relative pt-8">
          <p className="text-lg font-black uppercase text-[var(--gold-500)]">Pizza de Nuit</p>
          <h1 className="mt-3 text-6xl font-black uppercase leading-none">Commande à emporter</h1>
        </div>
        <div className="relative space-y-4">
          <p className="text-xl font-bold">Composez votre commande, imprimez le ticket, puis réglez au comptoir.</p>
          <Button onClick={onStart} className="w-full text-xl">
            Commander à emporter
          </Button>
        </div>
      </div>
    </div>
  );
}

function CategoryScreen({
  onSelect,
  onHalfHalf,
  onCustomPizza
}: {
  onSelect: (category: Category) => void;
  onHalfHalf: () => void;
  onCustomPizza: () => void;
}) {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-black uppercase">Choisis ta catégorie</h1>
      <div className="mt-6 grid gap-5">
        <button
          onClick={onHalfHalf}
          className="grid grid-cols-[160px_1fr] overflow-hidden rounded-2xl border-[3px] border-[var(--night-950)] bg-[var(--gold-500)] text-left shadow-[0_6px_0_var(--night-950)]"
        >
          <img src="/image/pizza_moitie_moitie.png" alt="" className="h-36 w-full object-cover" />
          <span className="flex flex-col justify-center p-5">
            <span className="text-3xl font-black uppercase">Moit’-Moit’</span>
            <span className="mt-2 text-sm font-bold text-[var(--night-950)]">Deux recettes sur une même base, option 50/50 incluse.</span>
          </span>
        </button>
        <button
          onClick={onCustomPizza}
          className="grid grid-cols-[160px_1fr] overflow-hidden rounded-2xl border-[3px] border-[var(--night-950)] bg-white text-left shadow-[0_6px_0_var(--night-950)]"
        >
          <img src="/image/ingredients/mozzarella.webp" alt="" className="h-36 w-full bg-[var(--paper-100)] object-contain p-4" />
          <span className="flex flex-col justify-center p-5">
            <span className="text-3xl font-black uppercase">Pizza personnalisée</span>
            <span className="mt-2 text-sm font-bold text-[var(--neutral-700)]">Choisissez votre base, format et ingrédients.</span>
          </span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category)}
            className="grid grid-cols-[160px_1fr] overflow-hidden rounded-2xl border-2 border-[var(--night-950)] bg-white text-left shadow-[0_6px_0_var(--night-950)]"
          >
            <img src={category.image} alt="" className="h-36 w-full object-cover" />
            <span className="flex flex-col justify-center p-5">
              <span className="text-3xl font-black uppercase">{category.name}</span>
              <span className="mt-2 text-sm font-bold text-[var(--neutral-700)]">{category.description}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductsScreen({ category, products, onOpen }: { category: Category; products: Product[]; onOpen: (product: Product) => void }) {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-black uppercase">{category.name}</h1>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {products.map((product) => (
          <button key={product.id} onClick={() => onOpen(product)} className="overflow-hidden rounded-2xl border-2 border-[var(--night-950)] bg-white text-left shadow-[0_4px_0_var(--night-950)]">
            <img src={product.image} alt="" className="h-40 w-full bg-[var(--paper-100)] object-contain p-2" />
            <span className="block p-4">
              <span className="flex min-h-12 items-start justify-between gap-2">
                <strong className="text-lg uppercase leading-tight">{product.name}</strong>
                {product.badge ? <Badge>{product.badge}</Badge> : null}
              </span>
              <span className="mt-3 block text-sm font-bold text-[var(--neutral-700)]">
                {product.productType === "pizza" ? `À partir de ${formatPrice(formats[0].price)}` : formatPrice(product.simplePrice)}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailScreen(props: {
  product: Product;
  selectedFormatId: string;
  setSelectedFormatId: (id: string) => void;
  cheesySelected: boolean;
  setCheesySelected: (selected: boolean) => void;
  error: string | null;
  onAdd: () => void;
}) {
  const productBase = bases.find((base) => base.id === props.product.baseId);
  const isPizza = props.product.productType === "pizza";
  const cheesyPrice = supplements[0].pricesByFormat?.[props.selectedFormatId] ?? null;

  return (
    <div className="p-6">
      <img src={props.product.image} alt="" className="h-72 w-full rounded-2xl bg-white object-contain p-4 shadow" />
      <h1 className="mt-5 text-4xl font-black uppercase">{props.product.name}</h1>
      {props.product.badge ? <div className="mt-2"><Badge>{props.product.badge}</Badge></div> : null}
      <p className="mt-3 text-base font-bold">Base : {productBase?.name ?? "Information à confirmer."}</p>
      <p className="mt-1 text-sm text-[var(--neutral-700)]">Ingrédients : {props.product.ingredientsLabel}</p>

      {isPizza ? (
        <>
          <h2 className="mt-6 text-2xl font-black uppercase">Format</h2>
          <div className="mt-3 grid gap-3">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => props.setSelectedFormatId(format.id)}
                className={`flex items-center justify-between rounded-xl border-2 p-4 text-left ${
                  props.selectedFormatId === format.id
                    ? "border-[var(--night-950)] bg-[var(--gold-500)]"
                    : "border-[var(--neutral-200)] bg-white"
                }`}
              >
                <span>
                  <strong className="block text-xl">{format.label}</strong>
                  <span className="text-sm">{format.description}</span>
                </span>
                <strong className="text-2xl">{formatPrice(format.price)}</strong>
              </button>
            ))}
          </div>

          <label className="mt-5 flex items-center justify-between rounded-xl border-2 border-[var(--night-950)] bg-white p-4">
            <span>
              <strong className="block text-lg">Cheesy Crust</strong>
              <span className="text-sm">Bordure fromage fondu</span>
            </span>
            <span className="flex items-center gap-4">
              <strong>{formatPrice(cheesyPrice)}</strong>
              <input
                type="checkbox"
                checked={props.cheesySelected}
                onChange={(event) => props.setCheesySelected(event.target.checked)}
                className="h-8 w-8 accent-[var(--gold-500)]"
              />
            </span>
          </label>
        </>
      ) : null}

      {props.error ? <p className="mt-4 rounded-xl bg-red-100 p-3 font-bold text-[var(--red-600)]">{props.error}</p> : null}
      <Button onClick={props.onAdd} className="mt-6 w-full text-xl">
        Ajouter au panier
      </Button>
    </div>
  );
}

function CartScreen({
  items,
  onQuantity,
  onRemove
}: {
  items: CartItem[];
  onQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="p-6">
      <p className="text-xs font-black uppercase tracking-widest text-[var(--red-500)]">Dernière vérification</p>
      <h1 className="mt-1 text-4xl font-black uppercase">Panier</h1>
      <p className="mt-2 text-sm font-bold text-[var(--neutral-700)]">Contrôlez les formats, bases et options avant impression du ticket.</p>
      {items.length === 0 ? <p className="mt-8 rounded-xl bg-white p-5 text-lg font-bold">Votre panier est vide.</p> : null}
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-[18px] border-[3px] border-[var(--night-950)] bg-white p-4 shadow-[5px_5px_0_var(--night-950)]">
            <div className="flex gap-4">
              <img src={item.image} alt="" className="h-24 w-24 rounded-xl border-2 border-black bg-[var(--paper-100)] object-contain" />
              <div className="flex-1">
                <div className="flex justify-between gap-3">
                  <div>
                    <strong className="text-xl uppercase">{item.productName}</strong>
                    <p className="text-xs font-black uppercase text-[var(--neutral-500)]">Quantité : {item.quantity}</p>
                  </div>
                  <strong className="text-xl">{formatPrice(item.lineTotal)}</strong>
                </div>
                <ItemDetails item={item} />
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" className="min-h-11 px-3 py-2" onClick={() => onQuantity(item.id, -1)}>
                      <Minus size={18} />
                    </Button>
                    <span className="w-10 text-center text-xl font-black">{item.quantity}</span>
                    <Button variant="secondary" className="min-h-11 px-3 py-2" onClick={() => onQuantity(item.id, 1)}>
                      <Plus size={18} />
                    </Button>
                  </div>
                  <Button variant="danger" className="min-h-11 px-3 py-2" onClick={() => onRemove(item.id)}>
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemDetails({ item, compact = false }: { item: CartItem; compact?: boolean }) {
  return (
    <div className={compact ? "mt-2 space-y-2" : "mt-3 space-y-3"}>
      {(item.formatLabel || item.baseLabel) ? (
        <div className="flex flex-wrap gap-2">
          {item.formatLabel ? <DetailPill label="Format" value={item.formatLabel} /> : null}
          {item.baseLabel ? <DetailPill label="Base" value={item.baseLabel} /> : null}
        </div>
      ) : null}

      {item.halfHalf ? (
        <div className="grid grid-cols-2 gap-2 rounded-xl border-2 border-black bg-[#fffdf6] p-2">
          <div className="rounded-lg bg-white p-2">
            <span className="block text-[10px] font-black uppercase text-[var(--red-500)]">Moitié A</span>
            <strong className="text-sm uppercase">{item.halfHalf.leftPizzaName}</strong>
          </div>
          <div className="rounded-lg bg-white p-2">
            <span className="block text-[10px] font-black uppercase text-[var(--red-500)]">Moitié B</span>
            <strong className="text-sm uppercase">{item.halfHalf.rightPizzaName}</strong>
          </div>
        </div>
      ) : null}

      {item.customPizza ? (
        <div>
          <span className="block text-[10px] font-black uppercase text-[var(--red-500)]">Ingrédients sélectionnés</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {item.customPizza.ingredients.map((ingredient) => (
              <span key={ingredient.id} className="rounded-full border border-black bg-[#fffdf6] px-2 py-1 text-[11px] font-black uppercase">
                {ingredient.name}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {item.supplements.length > 0 ? (
        <p className="rounded-lg bg-[var(--gold-500)] px-3 py-2 text-xs font-black uppercase">
          + {item.supplements.map((supplement) => supplement.name).join(", ")}
        </p>
      ) : null}
    </div>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase">
      {label} : {value}
    </span>
  );
}

function ReviewScreen({ items, total, error }: { items: CartItem[]; total: number; error: string | null }) {
  return (
    <div className="p-6">
      <p className="text-xs font-black uppercase tracking-widest text-[var(--red-500)]">Ticket avant comptoir</p>
      <h1 className="mt-1 text-4xl font-black uppercase">Validation finale</h1>
      <p className="mt-3 rounded-[18px] border-[3px] border-black bg-[var(--gold-500)] p-4 text-lg font-black shadow-[5px_5px_0_var(--night-950)]">
        Le ticket sera imprimé. Le paiement se fait au comptoir avant préparation.
      </p>
      <div className="mt-5 rounded-[18px] border-[3px] border-black bg-white p-5 shadow-[5px_5px_0_var(--night-950)]">
        {items.map((item) => (
          <div key={item.id} className="border-b border-dashed border-black/25 py-4 text-sm font-bold last:border-b-0">
            <div className="flex justify-between gap-3">
              <span className="text-base uppercase">{item.quantity} x {item.productName}</span>
              <span>{formatPrice(item.lineTotal)}</span>
            </div>
            <ItemDetails item={item} compact />
          </div>
        ))}
        <div className="mt-5 flex justify-between rounded-xl bg-black p-4 text-2xl font-black text-white">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      {error ? <p className="mt-4 rounded-xl bg-red-100 p-3 font-bold text-[var(--red-600)]">{error}</p> : null}
      <p className="mt-5 rounded-xl bg-white p-4 text-center text-sm font-black uppercase shadow">
        Vérifiez le résumé, puis validez avec le bouton en bas de l'écran.
      </p>
    </div>
  );
}

function ConfirmationScreen({ order }: { order: Order }) {
  return (
    <div className="grid min-h-[calc(100dvh-96px)] place-items-center bg-[var(--night-950)] p-8 text-center text-white">
      <div>
        <p className="text-lg font-black uppercase text-[var(--gold-500)]">Ticket imprimé</p>
        <h1 className="mt-3 text-6xl font-black uppercase">#{order.orderNumber}</h1>
        <p className="mt-6 text-3xl font-black">Présentez votre ticket au comptoir pour régler votre commande.</p>
        <p className="mt-4 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-base font-bold">
          Préparation à emporter après paiement comptoir.
        </p>
        <p className="mt-4 text-base">Retour automatique à l'accueil dans quelques secondes.</p>
      </div>
    </div>
  );
}
