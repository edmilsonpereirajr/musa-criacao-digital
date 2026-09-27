import Link from "next/link";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/minha-conta");
  }

  return (
    <div className="min-h-screen bg-[#f0ebe1]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-2xl border border-[#d8d0c4] bg-[#e8e1d5] p-5">
            <div className="mb-6">
              <p className="text-sm font-medium text-[#d42367]">
                Musa Criação Digital
              </p>

              <h2 className="mt-1 text-xl font-semibold text-[#151515]">
                Administração
              </h2>
            </div>

            <nav className="flex flex-col gap-2">
              <Link
                href="/admin"
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#151515] transition-colors hover:bg-[#f0ebe1] hover:text-[#d42367]"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/produtos"
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#151515] transition-colors hover:bg-[#f0ebe1] hover:text-[#d42367]"
              >
                Produtos
              </Link>

              <Link
                href="/admin/pedidos"
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#151515] transition-colors hover:bg-[#f0ebe1] hover:text-[#d42367]"
              >
                Pedidos
              </Link>

              <Link
                href="/admin/usuarios"
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#151515] transition-colors hover:bg-[#f0ebe1] hover:text-[#d42367]"
              >
                Usuários
              </Link>

              <Link
                href="/minha-conta"
                className="mt-4 rounded-xl border border-[#d8d0c4] px-4 py-3 text-sm font-medium text-[#151515] transition-colors hover:border-[#d42367] hover:text-[#d42367]"
              >
                Voltar para a loja
              </Link>
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}