import type { Order } from "@/types/order";
import { settings } from "@/data/settings";
import { formatPrice } from "@/lib/utils/format";

export function TicketPrintable({ order }: { order: Order }) {
  return (
    <div className="print-area mx-auto w-full max-w-sm rounded-xl bg-white p-5 text-black shadow-lg">
      <div className="text-center">
        <strong className="text-xl uppercase">{settings.restaurantName}</strong>
        <p className="mt-1 text-sm font-bold uppercase">Commande à emporter</p>
        <p className="mt-2 text-3xl font-black">#{order.orderNumber}</p>
        <p className="text-xs">{new Date(order.createdAt).toLocaleString("fr-FR")}</p>
      </div>

      <div className="my-4 border-y-2 border-dashed border-black py-3">
        {order.items.map((item) => (
          <div key={item.id} className="mb-4 last:mb-0">
            <div className="flex justify-between gap-3 text-sm font-bold">
              <span>
                {item.quantity} x {item.productName.toUpperCase()}
              </span>
              <span>{formatPrice(item.lineTotal)}</span>
            </div>
            {(item.formatLabel || item.baseLabel) ? (
              <p className="mt-1 text-xs font-bold">
                {item.formatLabel ? `Format : ${item.formatLabel}` : ""}
                {item.formatLabel && item.baseLabel ? " | " : ""}
                {item.baseLabel ? `Base : ${item.baseLabel}` : ""}
              </p>
            ) : null}
            {item.halfHalf ? (
              <div className="mt-1 border-l-2 border-black pl-2 text-xs">
                <p><strong>Moit'-Moit'</strong></p>
                <p>A : {item.halfHalf.leftPizzaName}</p>
                <p>B : {item.halfHalf.rightPizzaName}</p>
              </div>
            ) : null}
            {item.customPizza ? (
              <div className="mt-1 border-l-2 border-black pl-2 text-xs">
                <p><strong>Pizza personnalisée</strong></p>
                <p>Ingrédients : {item.customPizza.ingredients.map((ingredient) => ingredient.name).join(", ")}</p>
              </div>
            ) : null}
            {item.supplements.length > 0 ? (
              <p className="mt-1 text-xs font-bold">Suppléments : {item.supplements.map((supplement) => supplement.name).join(", ")}</p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex justify-between border-b-2 border-black pb-2 text-lg font-black">
        <span>Total</span>
        <span>{formatPrice(order.total)}</span>
      </div>
      <div className="mt-4 rounded-lg border-2 border-black p-3 text-center text-sm font-black uppercase">
        Paiement au comptoir avant préparation
      </div>
      <p className="mt-3 text-center text-sm">{settings.ticketMessage}</p>
    </div>
  );
}
