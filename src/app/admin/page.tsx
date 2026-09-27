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
    <section>
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
          Administração
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#151515]">
          Dashboard
        </h1>

        <p className="mt-3 text-[#6f6a63]">
          Gerencie os produtos, pedidos e usuários da Musa Criação Digital.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border border-[#d8d0c4] bg-white p-6">
          <p className="text-sm text-[#6f6a63]">Produtos</p>

          <p className="mt-2 text-3xl font-semibold text-[#151515]">
            {productsCount ?? 0}
          </p>

          <p className="mt-2 text-sm text-[#6f6a63]">
            Produtos cadastrados
          </p>
        </article>

        <article className="rounded-2xl border border-[#d8d0c4] bg-white p-6">
          <p className="text-sm text-[#6f6a63]">Pedidos</p>

          <p className="mt-2 text-3xl font-semibold text-[#151515]">
            {ordersCount ?? 0}
          </p>

          <p className="mt-2 text-sm text-[#6f6a63]">
            Pedidos realizados
          </p>
        </article>

        <article className="rounded-2xl border border-[#d8d0c4] bg-white p-6">
          <p className="text-sm text-[#6f6a63]">Usuários</p>

          <p className="mt-2 text-3xl font-semibold text-[#151515]">
            {usersCount ?? 0}
          </p>

          <p className="mt-2 text-sm text-[#6f6a63]">
            Usuários cadastrados
          </p>
        </article>
      </div>
    </section>
  );
}