"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, Printer, ShoppingCart, Trash2 } from "lucide-react";
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
  const showFooter = screen !== "home" && !isBuilderScreen && screen !== "confirmation";
  const showHeaderCart = screen !== "home" && screen !== "confirmation";

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
        {screen !== "home" && (
          <header className="no-print flex items-center justify-between bg-[var(--night-950)] px-5 py-4 text-white">
            <button className="pdn-label flex items-center gap-2 text-lg" onClick={() => setScreen("categories")}>
              <ArrowLeft size={22} />
              Retour
            </button>
            <img src="/image/LOGO PIZZA DE NUIT_.webp" alt="Pizza de Nuit" className="h-14 w-28 object-contain" />
            {showHeaderCart ? (
              <button className="relative rounded-full bg-white/10 p-3" onClick={() => setScreen("cart")} aria-label="Panier">
                <ShoppingCart size={24} />
                {cartItems.length > 0 ? (
                  <span className="pdn-title absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[var(--gold-500)] text-[10px] text-black">
                    {cartItems.length}
                  </span>
                ) : null}
              </button>
            ) : (
              <span aria-hidden="true" className="h-12 w-12" />
            )}
          </header>
        )}

        <section className={`no-print min-h-0 flex-1 overflow-y-auto scrollbar-soft ${showFooter ? "pb-36" : "pb-0"}`}>
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
                <p className="pdn-label text-base text-[var(--neutral-500)]">Total panier</p>
                <p className="pdn-title text-2xl">{formatPrice(totals.total)}</p>
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
        <h1 className="pdn-display text-4xl">Borne en maintenance</h1>
        <p className="mt-4 text-lg">Merci de commander directement au comptoir.</p>
      </div>
    </div>
  );
}

function HomeScreen({ onStart }: { onStart: () => void }) {
  const stars = [
    { top: "4%", left: "12%", size: "2.5px", duration: "3.2s", delay: "0.1s" },
    { top: "9%", left: "33%", size: "1.5px", duration: "4.5s", delay: "1.2s" },
    { top: "6%", left: "62%", size: "3px", duration: "2.8s", delay: "0.5s" },
    { top: "11%", left: "84%", size: "2px", duration: "3.7s", delay: "2.3s" },
    { top: "18%", left: "18%", size: "1.5px", duration: "5.0s", delay: "0.8s" },
    { top: "25%", left: "48%", size: "2.5px", duration: "3.4s", delay: "1.9s" },
    { top: "16%", left: "75%", size: "2px", duration: "4.1s", delay: "0.3s" },
    { top: "30%", left: "88%", size: "3px", duration: "2.9s", delay: "2.7s" },
    { top: "38%", left: "14%", size: "2px", duration: "3.6s", delay: "1.5s" },
    { top: "35%", left: "65%", size: "1.5px", duration: "4.8s", delay: "0.9s" },
    { top: "45%", left: "85%", size: "2.5px", duration: "3.1s", delay: "2.1s" },
    { top: "52%", left: "22%", size: "2px", duration: "4.3s", delay: "0.4s" },
    { top: "49%", left: "50%", size: "1.5px", duration: "5.2s", delay: "1.7s" },
    { top: "55%", left: "78%", size: "3px", duration: "2.7s", delay: "1.1s" },
    { top: "63%", left: "10%", size: "1.5px", duration: "4.9s", delay: "2.4s" },
    { top: "70%", left: "40%", size: "2.5px", duration: "3.3s", delay: "0.7s" },
    { top: "66%", left: "70%", size: "2px", duration: "4.0s", delay: "1.6s" },
    { top: "78%", left: "90%", size: "3px", duration: "2.6s", delay: "3.0s" },
    { top: "85%", left: "25%", size: "2px", duration: "3.9s", delay: "1.3s" }
  ];

  return (
    <div className="pdn-copy h-full min-h-full bg-[#050507] text-white relative overflow-hidden select-none">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map((star, idx) => (
          <div
            key={idx}
            className="star absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDuration: star.duration,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 h-[320px] w-[320px] rounded-full bg-red-600/[0.05] blur-[120px] pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 h-[27%] overflow-hidden pointer-events-none z-10">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#050507] via-[#050507]/66 to-transparent" />
        <svg className="absolute inset-x-0 bottom-0 h-full w-full opacity-95" viewBox="0 0 1080 520" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="skylineFade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#111216" stopOpacity="0.1" />
              <stop offset="36%" stopColor="#0d0d10" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#020203" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="distantFade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1b1d24" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#08090d" stopOpacity="0.92" />
            </linearGradient>
          </defs>

          <path
            d="M0 520V318h38v-42h46v70h32V245h44v-62h16v62h28v134h52V302h38v-55h64v92h42V220h52v-76h16v76h26v166h52V286h42v-41h42v-78h14v78h44v135h46V262h56v-89h14v89h32v-34h52v112h44v-92h36v-66h14v66h42v272H0Z"
            fill="url(#distantFade)"
          />

          <path
            d="M0 520V386h28v-58h58v-78h14v78h20v146h38V342h44v-96h18v96h36v-42h62v168h42V274h50v-88h18v88h34v-52h70v228h42V306h46v-64h16v64h34v-116h54v-82h12v82h28v306h46V350h42v-70h66v178h44V314h38v-58h48v264H0Z"
            fill="#07070a"
          />

          <path
            d="M0 520V418h44v-52h54v-48h36v-86h12v86h30v170h52V360h64v-72h52v180h58V316h34v-52h70v-96h14v96h36v214h58V338h48v-56h28v-104h16v104h42v198h60V340h42v-44h58v190h54V372h42v-68h52v216H0Z"
            fill="#0a0a0e"
          />

          <g opacity="0.72">
            <path d="M76 388h11v18H76zM96 388h11v18H96zM116 388h11v18h-11zM248 372h14v12h-14zM273 372h14v12h-14zM248 404h14v12h-14zM273 404h14v12h-14zM386 324h15v11h-15zM414 324h15v11h-15zM442 324h15v11h-15zM386 360h15v11h-15zM414 360h15v11h-15zM442 360h15v11h-15zM594 348h12v16h-12zM616 348h12v16h-12zM638 348h12v16h-12zM660 348h12v16h-12zM768 300h16v14h-16zM796 300h16v14h-16zM768 334h16v14h-16zM796 334h16v14h-16zM936 360h12v18h-12zM958 360h12v18h-12zM980 360h12v18h-12z" fill="#f4c400" />
            <path d="M146 340h11v46h-11zM164 340h11v46h-11zM690 304h13v60h-13zM714 304h13v60h-13zM1018 394h10v42h-10zM1036 394h10v42h-10z" fill="#e53424" />
          </g>

          <g opacity="0.4" stroke="#f4c400" strokeLinecap="round" strokeWidth="3">
            <path d="M56 446h70M226 430h96M500 408h120M856 424h86" />
          </g>
          <path d="M0 500h1080" stroke="#101015" strokeWidth="30" />
          <path d="M0 454h96l34 16h104l42-22h160l28 18h118l42-24h170l34 18h102l48-18h102" fill="none" stroke="#111217" strokeWidth="7" strokeLinecap="round" opacity="0.78" />
        </svg>
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050507] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020203] to-transparent" />
      </div>

      <div className="relative flex h-full min-h-full flex-col justify-between z-20 px-8 py-16">
        <div className="h-6" />

        <div className="relative flex flex-col items-center justify-center">
          <img
            src="/image/LOGO PIZZA DE NUIT_.webp"
            alt="Logo Pizza de Nuit"
            className="h-64 w-64 object-contain z-10 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[float_4s_ease-in-out_infinite]"
          />


          <div className="mt-8 text-center max-w-lg">
            <h1 className="pdn-display text-[5.5rem] text-[#f4c400] filter drop-shadow-[0_0_8px_rgba(244,196,0,0.4)]">
              LA STREET PIZZA <br/>
              <span className="text-white text-[4.5rem] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">DE LA NUIT</span>
            </h1>
            <p className="pdn-label mt-6 text-xl text-white/70 leading-relaxed max-w-sm mx-auto">
              Formats XXL • Option Moit/Moit <br/>
              <span className="text-[#f4c400]">Ouvert 7J/7 jusqu'à 4h</span>
            </p>
          </div>
        </div>

        <div className="relative mb-20 flex flex-col items-center gap-6 w-full">
          <button
            onClick={onStart}
            className="pdn-label animate-pulse-glow z-40 flex min-h-[88px] w-full max-w-[360px] items-center justify-center rounded-full border-2 border-[#f4c400] bg-[#050507]/90 px-8 py-5 text-2xl text-[#f4c400] shadow-[0_0_28px_rgba(244,196,0,0.28)] backdrop-blur-sm transition duration-100 ease-out active:scale-95 cursor-pointer"
          >
            Toucher pour commander
          </button>
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
      <h1 className="pdn-display text-5xl">Choisis ta catégorie</h1>
      <div className="mt-6 grid gap-5">
        <button
          onClick={onHalfHalf}
          className="grid grid-cols-[160px_1fr] overflow-hidden rounded-2xl border-[3px] border-[var(--night-950)] bg-[var(--gold-500)] text-left shadow-[0_6px_0_var(--night-950)]"
        >
          <img src="/image/pizza_moitie_moitie.png" alt="" className="h-36 w-full object-cover" />
          <span className="flex flex-col justify-center p-5">
            <span className="pdn-title text-3xl">Moit’-Moit’</span>
            <span className="pdn-copy mt-2 text-sm font-bold text-[var(--night-950)]">Deux recettes sur une même base, option 50/50 incluse.</span>
          </span>
        </button>
        <button
          onClick={onCustomPizza}
          className="grid grid-cols-[160px_1fr] overflow-hidden rounded-2xl border-[3px] border-[var(--night-950)] bg-white text-left shadow-[0_6px_0_var(--night-950)]"
        >
          <img src="/image/ingredients/mozzarella.webp" alt="" className="h-36 w-full bg-[var(--paper-100)] object-contain p-4" />
          <span className="flex flex-col justify-center p-5">
            <span className="pdn-title text-3xl">Pizza personnalisée</span>
            <span className="pdn-copy mt-2 text-sm font-bold text-[var(--neutral-700)]">Choisissez votre base, format et ingrédients.</span>
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
              <span className="pdn-title text-3xl">{category.name}</span>
              <span className="pdn-copy mt-2 text-sm font-bold text-[var(--neutral-700)]">{category.description}</span>
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
      <h1 className="pdn-display text-5xl">{category.name}</h1>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {products.map((product) => (
          <button key={product.id} onClick={() => onOpen(product)} className="overflow-hidden rounded-2xl border-2 border-[var(--night-950)] bg-white text-left shadow-[0_4px_0_var(--night-950)]">
            <img src={product.image} alt="" className="h-40 w-full bg-[var(--paper-100)] object-contain p-2" />
            <span className="block p-4">
              <span className="flex min-h-12 items-start justify-between gap-2">
                <strong className="pdn-title text-lg leading-tight">{product.name}</strong>
                {product.badge ? <Badge>{product.badge}</Badge> : null}
              </span>
              <span className="pdn-label mt-3 block text-lg text-[var(--neutral-700)]">
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
      <h1 className="pdn-display mt-5 text-5xl">{props.product.name}</h1>
      {props.product.badge ? <div className="mt-2"><Badge>{props.product.badge}</Badge></div> : null}
      <p className="pdn-copy mt-3 text-base font-bold">Base : {productBase?.name ?? "Information à confirmer."}</p>
      <p className="mt-1 text-sm text-[var(--neutral-700)]">Ingrédients : {props.product.ingredientsLabel}</p>

      {isPizza ? (
        <>
          <h2 className="pdn-display mt-6 text-3xl">Format</h2>
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
                  <strong className="pdn-title block text-xl">{format.label}</strong>
                  <span className="text-sm">{format.description}</span>
                </span>
                <strong className="pdn-title text-2xl">{formatPrice(format.price)}</strong>
              </button>
            ))}
          </div>

          <label className="mt-5 flex items-center justify-between rounded-xl border-2 border-[var(--night-950)] bg-white p-4">
            <span>
              <strong className="pdn-title block text-lg">Cheesy Crust</strong>
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
      <p className="pdn-label text-lg text-[var(--red-500)]">Dernière vérification</p>
      <h1 className="pdn-display mt-1 text-5xl">Panier</h1>
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
                    <strong className="pdn-title text-xl">{item.productName}</strong>
                    <p className="pdn-label text-base text-[var(--neutral-500)]">Quantité : {item.quantity}</p>
                  </div>
                  <strong className="pdn-title text-xl">{formatPrice(item.lineTotal)}</strong>
                </div>
                <ItemDetails item={item} />
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" className="min-h-11 px-3 py-2" onClick={() => onQuantity(item.id, -1)}>
                      <Minus size={18} />
                    </Button>
                    <span className="pdn-title w-10 text-center text-xl">{item.quantity}</span>
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
            <span className="pdn-label block text-sm text-[var(--red-500)]">Moitié A</span>
            <strong className="pdn-title text-sm">{item.halfHalf.leftPizzaName}</strong>
          </div>
          <div className="rounded-lg bg-white p-2">
            <span className="pdn-label block text-sm text-[var(--red-500)]">Moitié B</span>
            <strong className="pdn-title text-sm">{item.halfHalf.rightPizzaName}</strong>
          </div>
        </div>
      ) : null}

      {item.customPizza ? (
        <div>
          <span className="pdn-label block text-sm text-[var(--red-500)]">Ingrédients sélectionnés</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {item.customPizza.ingredients.map((ingredient) => (
              <span key={ingredient.id} className="pdn-label rounded-full border border-black bg-[#fffdf6] px-2 py-1 text-sm">
                {ingredient.name}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {item.supplements.length > 0 ? (
        <p className="pdn-label rounded-lg bg-[var(--gold-500)] px-3 py-2 text-base">
          + {item.supplements.map((supplement) => supplement.name).join(", ")}
        </p>
      ) : null}
    </div>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="pdn-label rounded-full border-2 border-black bg-white px-3 py-1 text-base">
      {label} : {value}
    </span>
  );
}

function ReviewScreen({ items, total, error }: { items: CartItem[]; total: number; error: string | null }) {
  return (
    <div className="p-6">
      <p className="pdn-label text-lg text-[var(--red-500)]">Ticket avant comptoir</p>
      <h1 className="pdn-display mt-1 text-5xl">Validation finale</h1>
      <p className="pdn-title mt-3 rounded-[18px] border-[3px] border-black bg-[var(--gold-500)] p-4 text-lg shadow-[5px_5px_0_var(--night-950)]">
        Le ticket sera imprimé. Le paiement se fait au comptoir avant préparation.
      </p>
      <div className="mt-5 rounded-[18px] border-[3px] border-black bg-white p-5 shadow-[5px_5px_0_var(--night-950)]">
        {items.map((item) => (
          <div key={item.id} className="border-b border-dashed border-black/25 py-4 text-sm font-bold last:border-b-0">
            <div className="flex justify-between gap-3">
              <span className="pdn-title text-base">{item.quantity} x {item.productName}</span>
              <span>{formatPrice(item.lineTotal)}</span>
            </div>
            <ItemDetails item={item} compact />
          </div>
        ))}
        <div className="pdn-title mt-5 flex justify-between rounded-xl bg-black p-4 text-2xl text-white">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      {error ? <p className="mt-4 rounded-xl bg-red-100 p-3 font-bold text-[var(--red-600)]">{error}</p> : null}
      <p className="pdn-label mt-5 rounded-xl bg-white p-4 text-center text-lg shadow">
        Vérifiez le résumé, puis validez avec le bouton en bas de l'écran.
      </p>
    </div>
  );
}

function ConfirmationScreen({ order }: { order: Order }) {
  return (
    <div className="grid min-h-[calc(100dvh-96px)] place-items-center bg-[var(--night-950)] p-8 text-center text-white">
      <div>
        <p className="pdn-label text-2xl text-[var(--gold-500)]">Ticket imprimé</p>
        <h1 className="pdn-display mt-3 text-7xl">#{order.orderNumber}</h1>
        <p className="pdn-title mt-6 text-3xl">Présentez votre ticket au comptoir pour régler votre commande.</p>
        <p className="mt-4 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-base font-bold">
          Préparation à emporter après paiement comptoir.
        </p>
        <p className="mt-4 text-base">Retour automatique à l'accueil dans quelques secondes.</p>
      </div>
    </div>
  );
}
