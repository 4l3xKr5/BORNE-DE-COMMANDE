import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils/format";
import { isAuthorizedAdmin } from "@/server/admin-auth";

type PageProps = {
  searchParams: Promise<{ pin?: string }>;
};

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const { pin } = await searchParams;
  if (!isAuthorizedAdmin(pin)) return <AdminLogin />;

  return (
    <AdminShell pin={pin}>
      <h2 className="text-4xl font-black uppercase">Produits</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl border-2 border-[var(--night-950)] bg-white p-4">
            <strong className="block text-lg uppercase">{product.name}</strong>
            <span className="text-sm font-bold">{product.productType}</span>
            <p className="mt-2 text-sm">Disponible : {product.isAvailable ? "oui" : "non"}</p>
            <p className="text-sm">
              Prix : {product.productType === "pizza" ? "Selon format" : formatPrice(product.simplePrice)}
            </p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
