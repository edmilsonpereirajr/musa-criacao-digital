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

  const hasError = Boolean(error || orderItemsError || productsError);

  const safeOrders = orders ?? [];

  return (
    <main className="overflow-hidden bg-[#F4F0E6]">
      <section className="border-b-2 border-[#0D0D0D] bg-[#F4F0E6]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-5 inline-flex border-2 border-[#0D0D0D] bg-[#FF0066] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D]">
                Área do cliente
              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.07em] text-[#0D0D0D] sm:text-6xl lg:text-7xl">
                Minha conta.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#0D0D0D]/65 sm:text-lg">
                Acompanhe seus pedidos, pagamentos e produtos digitais em um
                só lugar.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="/produtos"
                className="border-2 border-[#0D0D0D] bg-[#F4F0E6] px-6 py-3 text-center text-sm font-black text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:bg-[#FF0066] hover:shadow-[1px_1px_0_#0D0D0D]"
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
            <aside className="border-2 border-[#F4F0E6] bg-[#0D0D0D] p-6 text-[#F4F0E6] shadow-[6px_6px_0_#FF0066] sm:p-7 lg:sticky lg:top-24">
              <div className="flex h-14 w-14 items-center justify-center border-2 border-[#0D0D0D] bg-[#FF0066] text-xl font-black text-[#0D0D0D]">
                {user.email?.charAt(0).toUpperCase() ?? "M"}
              </div>

              <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF0066]">
                Conta
              </p>

              <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em]">
                Seus dados
              </h2>

              <div className="mt-6 border-t-2 border-[#F4F0E6]/15 pt-5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#F4F0E6]/45">
                  E-mail
                </p>

                <p className="mt-2 break-all text-sm font-medium text-[#F4F0E6]">
                  {user.email}
                </p>
              </div>

              <div className="mt-5 border-t-2 border-[#F4F0E6]/15 pt-5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#F4F0E6]/45">
                  Pedidos
                </p>

                <p className="mt-1 text-3xl font-black tracking-[-0.05em] text-[#FF0066]">
                  {safeOrders.length}
                </p>
              </div>

              <div className="mt-6 border-2 border-[#F4F0E6]/15 bg-[#F4F0E6]/5 p-4">
                <p className="text-xs leading-5 text-[#F4F0E6]/65">
                  Seus pedidos e produtos são carregados de forma protegida
                  pela sua conta.
                </p>
              </div>
            </aside>

            <section>
              <div className="mb-7 border-b-2 border-[#0D0D0D] pb-7">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF0066] sm:text-xs">
                  Histórico
                </p>

                <h2 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.055em] text-[#0D0D0D] sm:text-5xl">
                  Meus pedidos
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-[#0D0D0D]/60">
                  Aqui você pode acompanhar suas compras e os produtos de cada
                  pedido.
                </p>
              </div>

              {hasError ? (
                <div className="border-2 border-[#0D0D0D] bg-[#FBE9E9] p-6 text-sm leading-6 text-[#C62828] shadow-[4px_4px_0_#0D0D0D]">
                  Não foi possível carregar seus pedidos.
                </div>
              ) : safeOrders.length === 0 ? (
                <div className="border-2 border-[#0D0D0D] bg-[#F4F0E6] p-8 shadow-[5px_5px_0_#0D0D0D] sm:p-10">
                  <div className="flex h-14 w-14 items-center justify-center border-2 border-[#0D0D0D] bg-[#FF0066] text-xl font-black text-[#0D0D0D]">
                    ✦
                  </div>

                  <h3 className="mt-6 text-2xl font-black uppercase leading-tight tracking-[-0.04em] text-[#0D0D0D]">
                    Você ainda não fez nenhum pedido.
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-[#0D0D0D]/60">
                    Seus pedidos aparecerão aqui depois da primeira compra.
                  </p>

                  <a
                    href="/produtos"
                    className="mt-7 inline-flex border-2 border-[#0D0D0D] bg-[#FF0066] px-6 py-3.5 text-sm font-black text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_#0D0D0D]"
                  >
                    Explorar produtos ↗
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
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
                        className="overflow-hidden border-2 border-[#0D0D0D] bg-[#F4F0E6] shadow-[5px_5px_0_#0D0D0D]"
                      >
                        <div className="p-5 sm:p-7">
                          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="border-2 border-[#0D0D0D] bg-[#0D0D0D] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#F4F0E6]">
                                  Pedido
                                </span>

                                <span className="font-mono text-[10px] text-[#0D0D0D]/45">
                                  {new Date(
                                    order.created_at,
                                  ).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>

                              <p className="mt-3 break-all font-mono text-[10px] text-[#0D0D0D]/45">
                                {order.id}
                              </p>
                            </div>

                            <div className="sm:text-right">
                              <span
                                className={`inline-flex border-2 border-[#0D0D0D] px-3 py-1.5 text-xs font-black ${
                                  isPaid
                                    ? "bg-[#D9F2DE] text-[#16803C]"
                                    : isCancelled
                                      ? "bg-[#FBE9E9] text-[#C62828]"
                                      : "bg-[#FF0066] text-[#0D0D0D]"
                                }`}
                              >
                                {statusLabels[order.status] ?? order.status}
                              </span>

                              <p className="mt-3 text-2xl font-black tracking-[-0.05em] text-[#0D0D0D]">
                                {Number(order.total).toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 border-t-2 border-[#0D0D0D] pt-6">
                            <div className="flex items-center justify-between">
                              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#0D0D0D]">
                                Produtos
                              </h3>

                              <span className="font-mono text-[10px] text-[#0D0D0D]/45">
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
                                    className="flex items-center justify-between gap-4 border-2 border-[#0D0D0D] bg-[#F4F0E6] p-4"
                                  >
                                    <div className="min-w-0">
                                      <p className="truncate text-sm font-black uppercase text-[#0D0D0D]">
                                        {product?.title ?? "Produto"}
                                      </p>

                                      <p className="mt-1 font-mono text-[10px] text-[#0D0D0D]/50">
                                        Quantidade: {item.quantity}
                                      </p>
                                    </div>

                                    <p className="shrink-0 text-sm font-black text-[#0D0D0D]">
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
                          <div className="border-t-2 border-[#0D0D0D] bg-[#FF0066] px-5 py-4 sm:px-7">
                            <p className="text-xs font-black text-[#0D0D0D]">
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