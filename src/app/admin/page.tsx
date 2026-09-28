import Link from "next/link";

import { createClient } from "@/lib/supabase-server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: productsCount, error: productsError },
    { count: ordersCount, error: ordersError },
    { data: usersCount, error: usersError },
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("orders")
      .select("*", { count: "exact", head: true }),

    supabase.rpc("get_users_count"),
  ]);

  if (productsError || ordersError || usersError) {
    throw new Error("Não foi possível carregar os dados do dashboard.");
  }

  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
                Administração
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
                Dashboard.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#6f6a63]">
                Gerencie produtos, pedidos e usuários da Musa Criação Digital.
              </p>
            </div>

            <Link
              href="/"
              className="w-fit rounded-full border border-[#d8d0c4] bg-[#fffdf9] px-5 py-3 text-sm font-semibold text-[#151515] transition-all hover:-translate-y-0.5 hover:border-[#d42367] hover:text-[#d42367]"
            >
              Ver loja ↗
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <article className="group rounded-[1.75rem] border border-[#d8d0c4] bg-[#fffdf9] p-6 shadow-[0_10px_30px_rgba(21,21,21,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(21,21,21,0.08)] sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8dce7] text-lg text-[#d42367]">
                  ✦
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                  Catálogo
                </span>
              </div>

              <p className="mt-7 text-sm font-medium text-[#6f6a63]">
                Produtos
              </p>

              <p className="mt-1 text-4xl font-bold tracking-[-0.05em] text-[#151515]">
                {productsCount ?? 0}
              </p>

              <p className="mt-2 text-sm text-[#6f6a63]">
                Produtos cadastrados
              </p>

              <Link
                href="/admin/produtos"
                className="mt-6 inline-flex text-sm font-semibold text-[#d42367] transition-colors hover:text-[#b91d58]"
              >
                Gerenciar produtos →
              </Link>
            </article>

            <article className="group rounded-[1.75rem] border border-[#d8d0c4] bg-[#fffdf9] p-6 shadow-[0_10px_30px_rgba(21,21,21,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(21,21,21,0.08)] sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#151515] text-lg text-white">
                  ↗
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                  Vendas
                </span>
              </div>

              <p className="mt-7 text-sm font-medium text-[#6f6a63]">
                Pedidos
              </p>

              <p className="mt-1 text-4xl font-bold tracking-[-0.05em] text-[#151515]">
                {ordersCount ?? 0}
              </p>

              <p className="mt-2 text-sm text-[#6f6a63]">
                Pedidos realizados
              </p>

              <Link
                href="/admin/pedidos"
                className="mt-6 inline-flex text-sm font-semibold text-[#d42367] transition-colors hover:text-[#b91d58]"
              >
                Ver pedidos →
              </Link>
            </article>

            <article className="group rounded-[1.75rem] border border-[#d8d0c4] bg-[#fffdf9] p-6 shadow-[0_10px_30px_rgba(21,21,21,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(21,21,21,0.08)] sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4efe6] text-lg text-[#151515]">
                  ●
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                  Comunidade
                </span>
              </div>

              <p className="mt-7 text-sm font-medium text-[#6f6a63]">
                Usuários
              </p>

              <p className="mt-1 text-4xl font-bold tracking-[-0.05em] text-[#151515]">
                {usersCount ?? 0}
              </p>

              <p className="mt-2 text-sm text-[#6f6a63]">
                Contas cadastradas
              </p>

              <span className="mt-6 inline-flex text-sm font-semibold text-[#9a9389]">
                Visão geral
              </span>
            </article>
          </div>

          <section className="mt-8 rounded-[2rem] bg-[#151515] p-7 text-white shadow-[0_25px_60px_rgba(21,21,21,0.12)] sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f8a6c2]">
                  Musa Criação Digital
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-4xl">
                  Tudo sob controle.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-[#c9c2b9]">
                  Use o painel para manter o catálogo organizado e acompanhar
                  a operação da loja.
                </p>
              </div>

              <Link
                href="/admin/produtos/novo"
                className="w-fit rounded-full bg-[#d42367] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ef3f7c]"
              >
                Novo produto ↗
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}