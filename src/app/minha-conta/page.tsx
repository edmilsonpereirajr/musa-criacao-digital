import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/auth/LogoutButton";

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
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <section className="rounded-2xl border border-[#d8d0c4] bg-[#f0ebe1] p-8">
          <p className="text-sm font-medium text-[#d42367]">
            Musa Criação Digital
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#151515]">
            Minha conta
          </h1>

          <p className="mt-4 text-[#6f6a63]">
            Você está conectado como:
          </p>

          <p className="mt-1 font-medium text-[#151515]">
            {user.email}
          </p>

          <div className="mt-8">
            <LogoutButton />
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
              Histórico
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[#151515]">
              Meus pedidos
            </h2>

            <p className="mt-2 text-[#6f6a63]">
              Aqui você pode acompanhar suas compras e os produtos de cada
              pedido.
            </p>
          </div>

          {hasError ? (
            <div className="rounded-2xl border border-[#f0b8b8] bg-[#fce4e4] p-6 text-sm text-[#c62828]">
              Não foi possível carregar seus pedidos.
            </div>
          ) : safeOrders.length === 0 ? (
            <div className="rounded-2xl border border-[#d8d0c4] bg-[#e8e1d5] p-8 text-center">
              <h3 className="font-semibold text-[#151515]">
                Você ainda não fez nenhum pedido.
              </h3>

              <p className="mt-2 text-sm text-[#6f6a63]">
                Seus pedidos aparecerão aqui depois da primeira compra.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {safeOrders.map((order) => {
                const itemsForOrder =
                  orderItems?.filter(
                    (item) => item.order_id === order.id,
                  ) ?? [];

                return (
                  <article
                    key={order.id}
                    className="rounded-2xl border border-[#d8d0c4] bg-[#e8e1d5] p-6"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-[#6f6a63]">
                          Pedido
                        </p>

                        <p className="mt-1 break-all font-mono text-sm text-[#151515]">
                          {order.id}
                        </p>

                        <p className="mt-3 text-sm text-[#6f6a63]">
                          {new Date(order.created_at).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-sm text-[#6f6a63]">
                          Status
                        </p>

                        <p
                          className={`mt-1 font-medium ${
                            order.status === "paid"
                              ? "text-[#16803c]"
                              : order.status === "cancelled" ||
                                  order.status === "refunded"
                                ? "text-[#c62828]"
                                : "text-[#d42367]"
                          }`}
                        >
                          {statusLabels[order.status] ?? order.status}
                        </p>

                        <p className="mt-3 text-xl font-semibold text-[#151515]">
                          {Number(order.total).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-[#d8d0c4] pt-6">
                      <h3 className="font-semibold text-[#151515]">
                        Produtos
                      </h3>

                      <div className="mt-4 space-y-3">
                        {itemsForOrder.map((item) => {
                          const product = products?.find(
                            (product) =>
                              product.id === item.product_id,
                          );

                          return (
                            <div
                              key={item.id}
                              className="flex items-center justify-between gap-4 rounded-xl bg-[#f0ebe1] p-4"
                            >
                              <div>
                                <p className="font-medium text-[#151515]">
                                  {product?.title ?? "Produto"}
                                </p>

                                <p className="mt-1 text-sm text-[#6f6a63]">
                                  Quantidade: {item.quantity}
                                </p>
                              </div>

                              <p className="font-medium text-[#151515]">
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
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}