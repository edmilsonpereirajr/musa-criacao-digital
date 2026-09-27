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
    <section>
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
          Administração
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#151515]">
          Pedidos
        </h1>

        <p className="mt-3 text-[#6f6a63]">
          Acompanhe os pedidos e o status dos pagamentos.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-[#d8d0c4] bg-white p-8">
          <h2 className="text-lg font-semibold text-[#151515]">
            Nenhum pedido encontrado
          </h2>

          <p className="mt-2 text-sm text-[#6f6a63]">
            Os pedidos realizados pelos clientes aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const items = itemsByOrder.get(order.id) ?? [];

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-2xl border border-[#d8d0c4] bg-white"
              >
                <div className="flex flex-col gap-4 border-b border-[#d8d0c4] bg-[#e8e1d5] p-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#6f6a63]">
                      Pedido
                    </p>

                    <p className="mt-1 font-mono text-xs text-[#151515]">
                      {order.id}
                    </p>

                    <p className="mt-2 text-xs text-[#6f6a63]">
                      {new Date(order.created_at).toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === "paid"
                          ? "bg-[#e8f5ec] text-[#16803c]"
                          : order.status === "cancelled" ||
                              order.status === "refunded"
                            ? "bg-[#fbe9e9] text-[#c62828]"
                            : "bg-[#fff4d6] text-[#8a6500]"
                      }`}
                    >
                      {statusLabels[
                        order.status as keyof typeof statusLabels
                      ] ?? order.status}
                    </span>

                    <span className="text-lg font-semibold text-[#151515]">
                      {Number(order.total).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </div>

                <div className="grid gap-6 p-6 lg:grid-cols-[1fr_280px]">
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6f6a63]">
                      Produtos
                    </h2>

                    <div className="mt-4 space-y-3">
                      {items.length === 0 ? (
                        <p className="text-sm text-[#6f6a63]">
                          Nenhum item encontrado.
                        </p>
                      ) : (
                        items.map((item) => {
                          const product = productMap.get(item.product_id);

                          return (
                            <div
                              key={item.id}
                              className="rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] p-4"
                            >
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <p className="font-medium text-[#151515]">
                                    {product?.title ?? "Produto removido"}
                                  </p>

                                  <p className="mt-1 text-xs text-[#6f6a63]">
                                    {product?.slug ?? "Sem slug"}
                                  </p>
                                </div>

                                <div className="text-sm text-[#6f6a63]">
                                  {item.quantity} ×{" "}
                                  {Number(item.unit_price).toLocaleString(
                                    "pt-BR",
                                    {
                                      style: "currency",
                                      currency: "BRL",
                                    },
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] p-5">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6f6a63]">
                      Pagamento
                    </h2>

                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <p className="text-xs text-[#6f6a63]">Cliente</p>
                        <p className="mt-1 break-all font-mono text-xs text-[#151515]">
                          {order.user_id}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#6f6a63]">Provedor</p>
                        <p className="mt-1 text-[#151515]">
                          {order.payment_provider ?? "Não definido"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#6f6a63]">
                          Preferência Mercado Pago
                        </p>
                        <p className="mt-1 break-all font-mono text-xs text-[#151515]">
                          {order.payment_preference_id ?? "Não definida"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}