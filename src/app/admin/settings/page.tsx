import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";
import { settings } from "@/data/settings";
import { isAuthorizedAdmin } from "@/server/admin-auth";

type PageProps = {
  searchParams: Promise<{ pin?: string }>;
};

export default async function AdminSettingsPage({ searchParams }: PageProps) {
  const { pin } = await searchParams;
  if (!isAuthorizedAdmin(pin)) return <AdminLogin />;

  return (
    <AdminShell pin={pin}>
      <h2 className="pdn-display text-4xl">Settings</h2>
      <pre className="mt-6 overflow-auto rounded-2xl border-2 border-[var(--night-950)] bg-white p-5 text-sm">
        {JSON.stringify(settings, null, 2)}
      </pre>
    </AdminShell>
  );
}
