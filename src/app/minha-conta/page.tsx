import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { createClient } from "@/lib/supabase-server";

const statusLabels: Record<string, string> = {
  pending: "Aguardando pagamento",
  paid: "Pago",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
};

export default async function MinhaContaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, status, total, created_at")
    .order("created_at", { ascending: false });

  const orderIds = orders?.map((order) => order.id) ?? [];

  const { data: orderItems, error: orderItemsError } =
    orderIds.length > 0
      ? await supabase
          .from("order_items")
          .select("id, order_id, quantity, unit_price, product_id")
          .in("order_id", orderIds)
      : { data: [], error: null };

  const productIds = [
    ...new Set(orderItems?.map((item) => item.product_id) ?? []),
  ];

  const { data: products, error: productsError } =
    productIds.length > 0
      ? await supabase
          .from("products")
          .select("id, title, slug")
          .in("id", productIds)
      : { data: [], error: null };

  const hasError = Boolean(
    error || orderItemsError || productsError,
  );

  const safeOrders = orders ?? [];

  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
                Área do cliente
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl lg:text-6xl">
                Minha conta.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#6f6a63]">
                Acompanhe seus pedidos, pagamentos e produtos digitais em um
                só lugar.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="/produtos"
                className="rounded-full border border-[#d8d0c4] bg-[#fffdf9] px-6 py-3 text-center text-sm font-semibold text-[#151515] transition-all hover:-translate-y-0.5 hover:border-[#d42367] hover:text-[#d42367]"
              >
                Explorar produtos
              </a>

              <LogoutButton />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
            <aside className="rounded-[1.75rem] bg-[#151515] p-6 text-white shadow-[0_25px_60px_rgba(21,21,21,0.12)] sm:p-7 lg:sticky lg:top-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d42367] text-xl font-bold">
                {user.email?.charAt(0).toUpperCase() ?? "M"}
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#f8a6c2]">
                Conta
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-[-0.03em]">
                Seus dados
              </h2>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs text-[#9f9890]">E-mail</p>

                <p className="mt-1 break-all text-sm font-medium text-white">
                  {user.email}
                </p>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-xs text-[#9f9890]">Pedidos</p>

                <p className="mt-1 text-2xl font-bold tracking-[-0.04em]">
                  {safeOrders.length}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs leading-5 text-[#c9c2b9]">
                  Seus pedidos e produtos são carregados de forma protegida
                  pela sua conta.
                </p>
              </div>
            </aside>

            <section>
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d42367] sm:text-sm">
                  Histórico
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-[-0.045em] text-[#151515]">
                  Meus pedidos
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-[#6f6a63]">
                  Aqui você pode acompanhar suas compras e os produtos de
                  cada pedido.
                </p>
              </div>

              {hasError ? (
                <div className="rounded-[1.5rem] border border-[#f0b8b8] bg-[#fce4e4] p-6 text-sm leading-6 text-[#c62828]">
                  Não foi possível carregar seus pedidos.
                </div>
              ) : safeOrders.length === 0 ? (
                <div className="rounded-[1.75rem] border border-[#d8d0c4] bg-[#fffdf9] p-8 shadow-[0_10px_30px_rgba(21,21,21,0.04)] sm:p-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f8dce7] text-xl text-[#d42367]">
                    ✦
                  </div>

                  <h3 className="mt-6 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                    Você ainda não fez nenhum pedido.
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-[#6f6a63]">
                    Seus pedidos aparecerão aqui depois da primeira compra.
                  </p>

                  <a
                    href="/produtos"
                    className="mt-7 inline-flex rounded-full bg-[#d42367] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#b91d58]"
                  >
                    Explorar produtos ↗
                  </a>
                </div>
              ) : (
                <div className="space-y-5">
                  {safeOrders.map((order) => {
                    const itemsForOrder =
                      orderItems?.filter(
                        (item) => item.order_id === order.id,
                      ) ?? [];

                    const isPaid = order.status === "paid";
                    const isCancelled =
                      order.status === "cancelled" ||
                      order.status === "refunded";

                    return (
                      <article
                        key={order.id}
                        className="overflow-hidden rounded-[1.75rem] border border-[#d8d0c4] bg-[#fffdf9] shadow-[0_10px_30px_rgba(21,21,21,0.04)]"
                      >
                        <div className="p-5 sm:p-7">
                          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-[#f4efe6] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6f6a63]">
                                  Pedido
                                </span>

                                <span className="text-xs text-[#9a9389]">
                                  {new Date(
                                    order.created_at,
                                  ).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>

                              <p className="mt-3 break-all font-mono text-xs text-[#9a9389]">
                                {order.id}
                              </p>
                            </div>

                            <div className="sm:text-right">
                              <span
                                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${
                                  isPaid
                                    ? "bg-[#e8f5e9] text-[#16803c]"
                                    : isCancelled
                                      ? "bg-[#fbe9e9] text-[#c62828]"
                                      : "bg-[#f8dce7] text-[#d42367]"
                                }`}
                              >
                                {statusLabels[order.status] ?? order.status}
                              </span>

                              <p className="mt-3 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                                {Number(order.total).toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 border-t border-[#d8d0c4] pt-6">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#151515]">
                                Produtos
                              </h3>

                              <span className="text-xs text-[#9a9389]">
                                {itemsForOrder.length}{" "}
                                {itemsForOrder.length === 1
                                  ? "produto"
                                  : "produtos"}
                              </span>
                            </div>

                            <div className="mt-4 space-y-3">
                              {itemsForOrder.map((item) => {
                                const product = products?.find(
                                  (product) =>
                                    product.id === item.product_id,
                                );

                                return (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between gap-4 rounded-2xl border border-[#e3ddd4] bg-[#f4efe6] p-4"
                                  >
                                    <div className="min-w-0">
                                      <p className="truncate text-sm font-semibold text-[#151515]">
                                        {product?.title ?? "Produto"}
                                      </p>

                                      <p className="mt-1 text-xs text-[#6f6a63]">
                                        Quantidade: {item.quantity}
                                      </p>
                                    </div>

                                    <p className="shrink-0 text-sm font-bold text-[#151515]">
                                      {Number(
                                        item.unit_price * item.quantity,
                                      ).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {isPaid ? (
                          <div className="border-t border-[#d8d0c4] bg-[#f8dce7] px-5 py-4 sm:px-7">
                            <p className="text-xs font-semibold text-[#6f6a63]">
                              ✓ Pagamento confirmado. Seus produtos digitais
                              estão associados a este pedido.
                            </p>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}