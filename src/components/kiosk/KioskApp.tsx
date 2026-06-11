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
            <img src="/image/logo upscale.png" alt="Pizza de Nuit" className="h-14 w-28 object-contain" />
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
  const [shootingStar, setShootingStar] = useState<{ id: number; top: string; left: string; angle: number } | null>(null);

  useEffect(() => {
    const homeStart = document.getElementById("kiosk-home-start");
    if (!homeStart) return;

    const start = (event: Event) => {
      event.preventDefault();
      onStart();
    };

    homeStart.addEventListener("click", start);
    homeStart.addEventListener("touchend", start, { passive: false });
    homeStart.addEventListener("pointerup", start);

    return () => {
      homeStart.removeEventListener("click", start);
      homeStart.removeEventListener("touchend", start);
      homeStart.removeEventListener("pointerup", start);
    };
  }, [onStart]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShootingStar({
        id: Date.now(),
        top: `${Math.random() * 30}%`,
        left: `${20 + Math.random() * 60}%`,
        angle: 45 + Math.random() * 90,
      });
      setTimeout(() => setShootingStar(null), 1500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stars = [
    // Original stars
    { top: "4%", left: "12%", size: "2.5px", duration: "3.2s", delay: "0.1s" },
    { top: "9%", left: "33%", size: "1.5px", duration: "4.5s", delay: "1.2s", bright: true },
    { top: "6%", left: "62%", size: "3px", duration: "2.8s", delay: "0.5s" },
    { top: "11%", left: "84%", size: "2px", duration: "3.7s", delay: "2.3s" },
    { top: "18%", left: "18%", size: "1.5px", duration: "5.0s", delay: "0.8s" },
    { top: "25%", left: "48%", size: "2.5px", duration: "3.4s", delay: "1.9s", bright: true },
    { top: "16%", left: "75%", size: "2px", duration: "4.1s", delay: "0.3s" },
    { top: "30%", left: "88%", size: "3px", duration: "2.9s", delay: "2.7s" },
    { top: "38%", left: "14%", size: "2px", duration: "3.6s", delay: "1.5s", bright: true },
    { top: "35%", left: "65%", size: "1.5px", duration: "4.8s", delay: "0.9s" },
    { top: "45%", left: "85%", size: "2.5px", duration: "3.1s", delay: "2.1s" },
    { top: "52%", left: "22%", size: "2px", duration: "4.3s", delay: "0.4s", bright: true },
    { top: "49%", left: "50%", size: "1.5px", duration: "5.2s", delay: "1.7s" },
    { top: "55%", left: "78%", size: "3px", duration: "2.7s", delay: "1.1s" },
    { top: "63%", left: "10%", size: "1.5px", duration: "4.9s", delay: "2.4s", bright: true },
    { top: "70%", left: "40%", size: "2.5px", duration: "3.3s", delay: "0.7s" },
    { top: "66%", left: "70%", size: "2px", duration: "4.0s", delay: "1.6s" },
    { top: "78%", left: "90%", size: "3px", duration: "2.6s", delay: "3.0s", bright: true },
    { top: "85%", left: "25%", size: "2px", duration: "3.9s", delay: "1.3s" },
    { top: "88%", left: "55%", size: "1.5px", duration: "4.7s", delay: "0.2s" },
    { top: "82%", left: "80%", size: "2.5px", duration: "3.5s", delay: "2.5s", bright: true },
    // New stars
    { top: "12%", left: "45%", size: "2px", duration: "3.5s", delay: "0.2s" },
    { top: "28%", left: "70%", size: "1px", duration: "4.2s", delay: "1.1s" },
    { top: "41%", left: "32%", size: "3px", duration: "2.5s", delay: "2.2s", bright: true },
    { top: "58%", left: "62%", size: "2px", duration: "3.8s", delay: "0.6s" },
    { top: "74%", left: "18%", size: "1.5px", duration: "5.1s", delay: "1.4s" },
    { top: "91%", left: "42%", size: "2.5px", duration: "3.1s", delay: "2.8s" },
    { top: "8%", left: "8%", size: "1.5px", duration: "4.6s", delay: "0.9s" },
    { top: "22%", left: "95%", size: "2px", duration: "3.9s", delay: "1.7s" },
    { top: "51%", left: "92%", size: "3px", duration: "2.9s", delay: "0.4s", bright: true },
    { top: "68%", left: "5%", size: "2px", duration: "4.4s", delay: "2.1s" },
    { top: "86%", left: "68%", size: "1.5px", duration: "5.0s", delay: "1.3s" },
    { top: "95%", left: "28%", size: "2.5px", duration: "3.4s", delay: "0.7s" },
    { top: "33%", left: "25%", size: "2px", duration: "4.1s", delay: "2.6s" },
    { top: "15%", left: "55%", size: "3px", duration: "2.6s", delay: "1.8s", bright: true },
    { top: "76%", left: "52%", size: "1.5px", duration: "4.8s", delay: "0.5s" }
  ];

  return (
    <div
      id="kiosk-home-start"
      className="h-full min-h-full bg-[#050507] text-white relative overflow-hidden select-none"
      onPointerUp={onStart}
    >
      {/* Embedded High-End CSS styles for keyframes & transitions */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sky-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.75); }
          50% { opacity: 1; transform: scale(1.25); }
        }
        @keyframes sky-twinkle-bright {
          0%, 100% { opacity: 0.3; transform: scale(0.8); box-shadow: 0 0 2px rgba(255, 255, 255, 0.2); }
          50% { opacity: 1; transform: scale(1.4); box-shadow: 0 0 10px rgba(255, 255, 255, 0.9); }
        }
        @keyframes shooting-star-anim {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { transform: translateY(50px) scale(1); opacity: 1; }
          100% { transform: translateY(800px) scale(0); opacity: 0; }
        }
        @keyframes neon-pulse-border {
          0%, 100% {
            box-shadow: 0 0 18px rgba(255, 196, 0, 0.45), inset 0 0 10px rgba(255, 196, 0, 0.25), 0 0 2px rgba(230, 57, 46, 0.4);
            border-color: #ffc400;
          }
          50% {
            box-shadow: 0 0 35px rgba(255, 196, 0, 0.75), inset 0 0 20px rgba(255, 196, 0, 0.45), 0 0 6px rgba(230, 57, 46, 0.6);
            border-color: #ffd24a;
          }
          45%, 47% { opacity: 0.94; }
          46% { opacity: 1; }
        }
        @keyframes text-glow {
          0%, 100% {
            text-shadow: 0 0 4px #fff, 0 0 10px rgba(255, 196, 0, 0.8), 0 0 20px rgba(255, 196, 0, 0.5), 0 0 35px rgba(255, 108, 0, 0.3);
          }
          50% {
            text-shadow: 0 0 6px #fff, 0 0 16px rgba(255, 196, 0, 0.95), 0 0 30px rgba(255, 196, 0, 0.7), 0 0 45px rgba(255, 108, 0, 0.5);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(255, 196, 0, 0.3), inset 0 0 5px rgba(255, 196, 0, 0.1);
            border-color: rgba(255, 196, 0, 0.7);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 196, 0, 0.65), inset 0 0 15px rgba(255, 196, 0, 0.3);
            border-color: rgba(255, 196, 0, 1);
            transform: scale(1.025);
          }
        }
        @keyframes skyline-breath {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(255, 196, 0, 0.5));
            stroke: #ffc400;
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(255, 196, 0, 0.8));
            stroke: #ffd24a;
          }
        }
        .star {
          animation: sky-twinkle ease-in-out infinite alternate;
        }
        .star-bright {
          animation: sky-twinkle-bright ease-in-out infinite alternate;
        }
        .shooting-star-streak {
          animation: shooting-star-anim 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-neon-pulse {
          animation: neon-pulse-border 2.5s infinite alternate;
        }
        .animate-text-glow {
          animation: text-glow 2s infinite alternate;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }
        .animate-skyline-breath {
          animation: skyline-breath 3.5s infinite ease-in-out;
        }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}} />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none z-[5]" />

      {/* Sky Constellation (twinkling stars & shooting star) */}
      <div
        className="absolute top-0 left-0 w-full h-[55%] overflow-hidden pointer-events-none z-0"
        style={{ WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}
      >
        {stars.map((star, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full bg-white ${star.bright ? 'star-bright' : 'star'}`}
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

        {/* Shooting Star */}
        {shootingStar && (
          <div
            key={shootingStar.id}
            className="absolute z-0 pointer-events-none"
            style={{
              top: shootingStar.top,
              left: shootingStar.left,
              transform: `rotate(${shootingStar.angle}deg)`,
            }}
          >
            <div className="w-[2px] h-[100px] bg-gradient-to-b from-white to-transparent shooting-star-streak rounded-full" />
          </div>
        )}
      </div>

      {/* Ambient Radial Lights (Flares & Glows) */}
      {/* 1. Red Top-Left Reflex Aura */}
      <div className="absolute top-[-50px] left-[-50px] h-[300px] w-[300px] rounded-full bg-red-600/[0.04] blur-[100px] pointer-events-none z-0" />
      {/* 2. Main central amber aura backing the logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-amber-500/[0.06] blur-[120px] pointer-events-none z-0" />

      <div className="relative flex h-full min-h-full flex-col justify-between z-10 px-8 py-16">
        <div className="h-6" />

        {/* Central Brand Showcase */}
        <div className="relative flex flex-col items-center justify-center">
          <img
            src="/image/logo upscale.png"
            alt="Pizza de Nuit Logo"
            style={{
              width: "480px",
              height: "480px",
              filter: "drop-shadow(2px -6px 4px rgba(255, 200, 0, 0.6)) drop-shadow(-7px 4px 5px rgba(255, 170, 0, 0.5)) drop-shadow(5px 8px 3px rgba(255, 220, 0, 0.4)) drop-shadow(0px 0px 15px rgba(255, 150, 0, 0.3)) drop-shadow(0 15px 25px rgba(0,0,0,0.8))"
            }}
            className="object-contain z-10 animate-[float_4s_ease-in-out_infinite]"
          />

          <div className="mt-8 text-center w-full px-4 translate-y-8">
            <h1 className="pdn-display text-[5rem] text-[#f4c400] filter drop-shadow-[0_0_8px_rgba(244,196,0,0.4)] leading-tight">
              LA STREET PIZZA <br/>
              <span className="text-white text-[4.5rem] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">DE LA NUIT</span>
            </h1>
            <p className="pdn-label mt-6 text-xl text-white/70 leading-relaxed max-w-sm mx-auto">
              Formats XXL • Option Moit/Moit <br/>
              <span className="text-[#f4c400]">Ouvert 7J/7 jusqu'à 4h</span>
            </p>
          </div>
        </div>

        {/* Deep Amber Horizon Aura */}
      <div
        className="absolute bottom-0 left-0 w-full h-[400px] pointer-events-none z-10 opacity-80"
        style={{
          background: "linear-gradient(to top, rgba(180, 100, 0, 0.6) 0%, rgba(100, 40, 0, 0.4) 30%, rgba(30, 10, 0, 0.15) 60%, transparent 100%)"
        }}
      />

      {/* City Skyline Silhouette */}
      <div className="absolute bottom-0 left-0 w-full h-[280px] pointer-events-none z-20">
        <svg viewBox="0 0 1000 250" preserveAspectRatio="none" className="w-full h-full fill-black">
          {/* Base solid ground */}
          <rect x="0" y="240" width="1000" height="10" />

          {/* Buildings */}
          <rect x="0" y="210" width="15" height="40" />
          <rect x="15" y="195" width="25" height="55" />
          <rect x="35" y="180" width="15" height="70" />
          <rect x="65" y="215" width="25" height="35" />

          {/* Spire building */}
          <rect x="100" y="180" width="55" height="70" />
          <rect x="110" y="150" width="35" height="100" />
          <rect x="115" y="120" width="25" height="130" />
          <rect x="122" y="90" width="11" height="160" />
          <rect x="126" y="60" width="3" height="190" />

          {/* Blocks */}
          <rect x="165" y="200" width="35" height="50" />
          <rect x="200" y="190" width="20" height="60" />
          <rect x="230" y="170" width="65" height="80" />
          <rect x="310" y="215" width="25" height="35" />

          {/* Triangular building */}
          <rect x="350" y="160" width="55" height="90" />
          <polygon points="350,160 377,90 405,160" />
          <rect x="365" y="130" width="25" height="120" />

          {/* Mid blocks */}
          <rect x="420" y="195" width="35" height="55" />
          <rect x="435" y="185" width="15" height="65" />
          <rect x="470" y="210" width="25" height="40" />

          {/* Slanted roof building */}
          <rect x="510" y="140" width="75" height="110" />
          <polygon points="510,140 585,60 585,140" />

          {/* Mid-right blocks */}
          <rect x="600" y="190" width="25" height="60" />
          <rect x="610" y="180" width="10" height="70" />
          <rect x="640" y="205" width="35" height="45" />

          {/* Tall blocky building */}
          <rect x="690" y="130" width="65" height="120" />
          <rect x="705" y="90" width="35" height="160" />
          <rect x="715" y="50" width="15" height="200" />

          {/* Right side */}
          <rect x="770" y="185" width="45" height="65" />
          <rect x="830" y="215" width="25" height="35" />
          <rect x="870" y="180" width="60" height="70" />
          <rect x="945" y="200" width="40" height="50" />
          <rect x="990" y="220" width="20" height="30" />

          {/* Tiny windows (amber glow) */}
          <g className="fill-[#ffcc00] opacity-80 animate-pulse">
            <rect x="40" y="195" width="3" height="3" />
            <rect x="120" y="140" width="4" height="4" />
            <rect x="130" y="160" width="4" height="4" />
            <rect x="125" y="190" width="4" height="4" />
            <rect x="250" y="180" width="4" height="4" />
            <rect x="270" y="200" width="4" height="4" />
            <rect x="260" y="220" width="4" height="4" />
            <rect x="365" y="175" width="4" height="4" />
            <rect x="380" y="195" width="4" height="4" />
            <rect x="375" y="220" width="4" height="4" />
            <rect x="430" y="210" width="3" height="3" />
            <rect x="530" y="160" width="4" height="4" />
            <rect x="560" y="185" width="4" height="4" />
            <rect x="545" y="210" width="4" height="4" />
            <rect x="610" y="205" width="3" height="3" />
            <rect x="715" y="110" width="4" height="4" />
            <rect x="730" y="140" width="4" height="4" />
            <rect x="720" y="180" width="4" height="4" />
            <rect x="790" y="200" width="4" height="4" />
            <rect x="800" y="215" width="3" height="3" />
            <rect x="885" y="195" width="4" height="4" />
            <rect x="905" y="215" width="4" height="4" />
            <rect x="965" y="220" width="3" height="3" />
          </g>
        </svg>
      </div>

      {/* Bottom Call-To-Action (Pill Button) */}
        <div className="relative mb-[280px] flex flex-col items-center gap-6 w-full z-30">
          <button
            type="button"
            onClick={() => {
              onStart();
            }}
            onPointerUp={(event) => {
              event.stopPropagation();
              onStart();
            }}
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
