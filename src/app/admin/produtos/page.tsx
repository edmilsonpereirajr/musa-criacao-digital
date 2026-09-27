import { createClient } from "@/lib/supabase-server";

const statusLabels = {
  pending: "Pendente",
  paid: "Pago",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
} as const;

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, status, total, payment_provider, payment_preference_id, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Não foi possível carregar os pedidos.");
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
        <div className="overflow-hidden rounded-2xl border border-[#d8d0c4] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-[#d8d0c4] bg-[#e8e1d5]">
                <tr>
                  <th className="px-6 py-4 font-semibold text-[#151515]">
                    Pedido
                  </th>

                  <th className="px-6 py-4 font-semibold text-[#151515]">
                    Cliente
                  </th>

                  <th className="px-6 py-4 font-semibold text-[#151515]">
                    Total
                  </th>

                  <th className="px-6 py-4 font-semibold text-[#151515]">
                    Pagamento
                  </th>

                  <th className="px-6 py-4 font-semibold text-[#151515]">
                    Status
                  </th>

                  <th className="px-6 py-4 font-semibold text-[#151515]">
                    Data
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#eee8de] last:border-b-0"
                  >
                    <td className="px-6 py-5">
                      <p className="font-mono text-xs text-[#6f6a63]">
                        {order.id}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-mono text-xs text-[#6f6a63]">
                        {order.user_id}
                      </p>
                    </td>

                    <td className="px-6 py-5 font-medium text-[#151515]">
                      {Number(order.total).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="px-6 py-5 text-[#6f6a63]">
                      {order.payment_provider ?? "Não definido"}
                    </td>

                    <td className="px-6 py-5">
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
                    </td>

                    <td className="px-6 py-5 text-[#6f6a63]">
                      {new Date(order.created_at).toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}