import { createClient } from "@/lib/supabase-server";

const statusLabels = {
  pending: "Pendente",
  paid: "Pago",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
} as const;

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(
      "id, user_id, status, total, payment_provider, payment_preference_id, created_at",
    )
    .order("created_at", { ascending: false });

  if (ordersError) {
    throw new Error("Não foi possível carregar os pedidos.");
  }

  const orderIds = orders.map((order) => order.id);

  const { data: orderItems, error: itemsError } =
    orderIds.length > 0
      ? await supabase
          .from("order_items")
          .select("id, order_id, product_id, quantity, unit_price")
          .in("order_id", orderIds)
      : { data: [], error: null };

  if (itemsError) {
    throw new Error("Não foi possível carregar os itens dos pedidos.");
  }

  const productIds = [
    ...new Set((orderItems ?? []).map((item) => item.product_id)),
  ];

  const { data: products, error: productsError } =
    productIds.length > 0
      ? await supabase
          .from("products")
          .select("id, title, slug")
          .in("id", productIds)
      : { data: [], error: null };

  if (productsError) {
    throw new Error("Não foi possível carregar os produtos dos pedidos.");
  }

  const productMap = new Map(
    (products ?? []).map((product) => [product.id, product]),
  );

  const itemsByOrder = new Map<
    string,
    Array<{
      id: string;
      product_id: string;
      quantity: number;
      unit_price: number;
    }>
  >();

  for (const item of orderItems ?? []) {
    const items = itemsByOrder.get(item.order_id) ?? [];
    items.push(item);
    itemsByOrder.set(item.order_id, items);
  }

  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
            Administração
          </p>

          <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
                Pedidos.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#6f6a63]">
                Acompanhe compras, produtos e informações de pagamento.
              </p>
            </div>

            <div className="flex h-14 w-fit items-center rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                  Total de pedidos
                </p>

                <p className="mt-0.5 text-xl font-bold tracking-[-0.03em] text-[#151515]">
                  {orders.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {orders.length === 0 ? (
            <div className="rounded-[2rem] border border-[#d8d0c4] bg-[#fffdf9] px-6 py-16 text-center shadow-[0_15px_40px_rgba(21,21,21,0.05)] sm:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d42367] text-xl text-white">
                ✦
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                Nenhum pedido encontrado.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6f6a63]">
                Os pedidos realizados pelos clientes aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const items = itemsByOrder.get(order.id) ?? [];

                const status =
                  statusLabels[
                    order.status as keyof typeof statusLabels
                  ] ?? order.status;

                const statusStyle =
                  order.status === "paid"
                    ? "bg-[#e8f5ec] text-[#16803c]"
                    : order.status === "cancelled" ||
                        order.status === "refunded"
                      ? "bg-[#fbe9e9] text-[#c62828]"
                      : "bg-[#fff4d6] text-[#8a6500]";

                return (
                  <article
                    key={order.id}
                    className="overflow-hidden rounded-[2rem] border border-[#d8d0c4] bg-[#fffdf9] shadow-[0_15px_40px_rgba(21,21,21,0.05)]"
                  >
                    <div className="border-b border-[#d8d0c4] bg-[#151515] px-5 py-6 text-white sm:px-7">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f8a6c2]">
                              Pedido
                            </span>

                            <span
                              className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusStyle}`}
                            >
                              {status}
                            </span>
                          </div>

                          <p className="mt-4 break-all font-mono text-xs text-[#c9c2b9]">
                            {order.id}
                          </p>

                          <p className="mt-2 text-xs text-[#9f9890]">
                            {new Date(order.created_at).toLocaleString(
                              "pt-BR",
                            )}
                          </p>
                        </div>

                        <div className="lg:text-right">
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9f9890]">
                            Total
                          </p>

                          <p className="mt-1 text-3xl font-bold tracking-[-0.045em] text-white">
                            {Number(order.total).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_320px]">
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9389]">
                              Itens do pedido
                            </p>

                            <h2 className="mt-1 text-xl font-bold tracking-[-0.035em] text-[#151515]">
                              Produtos
                            </h2>
                          </div>

                          <span className="rounded-full bg-[#f4efe6] px-3 py-1.5 text-xs font-semibold text-[#6f6a63]">
                            {items.length}{" "}
                            {items.length === 1 ? "produto" : "produtos"}
                          </span>
                        </div>

                        <div className="mt-5 space-y-3">
                          {items.length === 0 ? (
                            <div className="rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] p-5">
                              <p className="text-sm text-[#6f6a63]">
                                Nenhum item encontrado.
                              </p>
                            </div>
                          ) : (
                            items.map((item) => {
                              const product = productMap.get(item.product_id);

                              return (
                                <div
                                  key={item.id}
                                  className="rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] p-4 transition-colors hover:border-[#cfc4b6]"
                                >
                                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="min-w-0">
                                      <p className="font-semibold text-[#151515]">
                                        {product?.title ?? "Produto removido"}
                                      </p>

                                      <p className="mt-1 truncate text-xs text-[#6f6a63]">
                                        {product?.slug ?? "Sem slug"}
                                      </p>
                                    </div>

                                    <div className="shrink-0 rounded-xl bg-[#fffdf9] px-3 py-2 text-right">
                                      <p className="text-xs font-semibold text-[#151515]">
                                        {item.quantity} ×{" "}
                                        {Number(
                                          item.unit_price,
                                        ).toLocaleString("pt-BR", {
                                          style: "currency",
                                          currency: "BRL",
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      <aside className="rounded-[1.5rem] border border-[#d8d0c4] bg-[#f4efe6] p-5 sm:p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d42367] text-sm text-white">
                            $
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9389]">
                              Pagamento
                            </p>

                            <h2 className="mt-0.5 text-lg font-bold tracking-[-0.03em] text-[#151515]">
                              Informações
                            </h2>
                          </div>
                        </div>

                        <div className="mt-6 space-y-5">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                              Cliente
                            </p>

                            <p className="mt-1.5 break-all font-mono text-xs leading-5 text-[#151515]">
                              {order.user_id}
                            </p>
                          </div>

                          <div className="border-t border-[#d8d0c4] pt-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                              Provedor
                            </p>

                            <p className="mt-1.5 text-sm font-semibold text-[#151515]">
                              {order.payment_provider ?? "Não definido"}
                            </p>
                          </div>

                          <div className="border-t border-[#d8d0c4] pt-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                              Preferência Mercado Pago
                            </p>

                            <p className="mt-1.5 break-all font-mono text-xs leading-5 text-[#151515]">
                              {order.payment_preference_id ?? "Não definida"}
                            </p>
                          </div>
                        </div>
                      </aside>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}