import Link from "next/link";

import { getAdminProducts } from "@/lib/products";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
            Administração
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#151515]">
            Produtos
          </h1>

          <p className="mt-3 text-[#6f6a63]">
            Gerencie os produtos digitais da Musa Criação Digital.
          </p>
        </div>

        <Link
          href="/admin/produtos/novo"
          className="inline-flex w-fit rounded-full bg-[#d42367] px-6 py-3 font-medium text-white transition-colors hover:bg-[#b91d58]"
        >
          Novo produto
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#d8d0c4] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#e8e1d5] text-[#151515]">
              <tr>
                <th className="px-6 py-4 font-semibold">Produto</th>
                <th className="px-6 py-4 font-semibold">Tipo</th>
                <th className="px-6 py-4 font-semibold">Preço</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Ação</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#d8d0c4]">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-[#151515]">
                        {product.title}
                      </p>

                      <p className="mt-1 text-xs text-[#6f6a63]">
                        /{product.slug}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 capitalize text-[#6f6a63]">
                    {product.content_type}
                  </td>

                  <td className="px-6 py-5 font-medium text-[#151515]">
                    {Number(product.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td className="px-6 py-5">
                    {product.is_active ? (
                      <span className="inline-flex rounded-full bg-[#e6f4ea] px-3 py-1 text-xs font-medium text-[#16803c]">
                        Ativo
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-[#f1eee9] px-3 py-1 text-xs font-medium text-[#6f6a63]">
                        Inativo
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <Link
                      href={`/admin/produtos/${product.id}`}
                      className="font-medium text-[#d42367] transition-colors hover:text-[#b91d58]"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}

              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-[#6f6a63]"
                  >
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}