import Link from "next/link";

import { getAdminProducts } from "@/lib/products";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

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
                Produtos.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#6f6a63]">
                Gerencie o catálogo de produtos digitais da Musa Criação
                Digital.
              </p>
            </div>

            <Link
              href="/admin/produtos/novo"
              className="inline-flex w-fit rounded-full bg-[#d42367] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(212,35,103,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b91d58]"
            >
              + Novo produto
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a9389]">
                Catálogo
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                Produtos cadastrados
              </h2>
            </div>

            <p className="text-sm text-[#6f6a63]">
              {products.length}{" "}
              {products.length === 1 ? "produto" : "produtos"}
            </p>
          </div>

          {products.length === 0 ? (
            <div className="rounded-[1.75rem] border border-[#d8d0c4] bg-[#fffdf9] p-10 text-center shadow-[0_10px_30px_rgba(21,21,21,0.04)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8dce7] text-xl text-[#d42367]">
                ✦
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                Nenhum produto cadastrado.
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6f6a63]">
                Crie seu primeiro produto digital para começar a montar o
                catálogo.
              </p>

              <Link
                href="/admin/produtos/novo"
                className="mt-7 inline-flex rounded-full bg-[#d42367] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#b91d58]"
              >
                Criar primeiro produto ↗
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[1.75rem] border border-[#d8d0c4] bg-[#fffdf9] shadow-[0_10px_30px_rgba(21,21,21,0.04)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] text-left text-sm">
                  <thead className="bg-[#151515] text-white">
                    <tr>
                      <th className="px-6 py-4 font-semibold">
                        Produto
                      </th>
                      <th className="px-6 py-4 font-semibold">
                        Tipo
                      </th>
                      <th className="px-6 py-4 font-semibold">
                        Preço
                      </th>
                      <th className="px-6 py-4 font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Ação
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#e3ddd4]">
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="transition-colors hover:bg-[#f8dce7]/30"
                      >
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-semibold text-[#151515]">
                              {product.title}
                            </p>

                            <p className="mt-1 text-xs text-[#9a9389]">
                              /{product.slug}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-[#f4efe6] px-3 py-1.5 text-xs font-semibold capitalize text-[#6f6a63]">
                            {product.content_type}
                          </span>
                        </td>

                        <td className="px-6 py-5 font-bold text-[#151515]">
                          {Number(product.price).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>

                        <td className="px-6 py-5">
                          {product.is_active ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f5e9] px-3 py-1.5 text-xs font-bold text-[#16803c]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#16803c]" />
                              Ativo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#f1eee9] px-3 py-1.5 text-xs font-bold text-[#6f6a63]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#9a9389]" />
                              Inativo
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-5 text-right">
                          <Link
                            href={`/admin/produtos/${product.id}`}
                            className="inline-flex rounded-full border border-[#d8d0c4] px-4 py-2 text-xs font-semibold text-[#151515] transition-all hover:border-[#d42367] hover:bg-[#f8dce7] hover:text-[#d42367]"
                          >
                            Editar →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}