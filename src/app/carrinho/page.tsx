"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <main className="overflow-hidden bg-[#f4efe6]">
        <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
          <div className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="w-full max-w-xl text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d42367] text-2xl text-white">
                ✦
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
                Seu carrinho
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
                Seu carrinho está vazio.
              </h1>

              <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#6f6a63]">
                Encontre um recurso para sua próxima criação e adicione ao
                carrinho.
              </p>

              <Link
                href="/produtos"
                className="mt-8 inline-flex rounded-full bg-[#d42367] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#b91d58]"
              >
                Explorar produtos ↗
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
                Seu carrinho
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
                Seus produtos.
              </h1>

              <p className="mt-4 text-base leading-7 text-[#6f6a63]">
                Revise seus produtos antes de finalizar a compra.
              </p>
            </div>

            <Link
              href="/produtos"
              className="w-fit text-sm font-semibold text-[#151515] transition-colors hover:text-[#d42367]"
            >
              Continuar comprando ↗
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.productId}
                  className="rounded-[1.5rem] border border-[#d8d0c4] bg-[#fffdf9] p-5 shadow-[0_10px_30px_rgba(21,21,21,0.04)] sm:rounded-[1.75rem] sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <Link
                        href={`/produto/${item.slug}`}
                        className="text-xl font-bold tracking-[-0.035em] text-[#151515] transition-colors hover:text-[#d42367]"
                      >
                        {item.title}
                      </Link>

                      <p className="mt-2 text-sm text-[#6f6a63]">
                        {item.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}{" "}
                        por unidade
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="flex items-center rounded-full border border-[#d8d0c4] bg-[#f4efe6]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity - 1,
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center text-lg text-[#151515] transition-colors hover:text-[#d42367]"
                          aria-label={`Diminuir quantidade de ${item.title}`}
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center text-sm font-semibold text-[#151515]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity + 1,
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center text-lg text-[#151515] transition-colors hover:text-[#d42367]"
                          aria-label={`Aumentar quantidade de ${item.title}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-xs font-semibold text-[#c62828] transition-colors hover:text-[#9f1f1f] sm:text-sm"
                      >
                        Remover
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#d8d0c4] pt-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a9389]">
                      Subtotal
                    </span>

                    <span className="text-xl font-bold tracking-[-0.03em] text-[#151515]">
                      {(item.price * item.quantity).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </article>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="pt-2 text-sm font-medium text-[#6f6a63] transition-colors hover:text-[#c62828]"
              >
                Limpar carrinho
              </button>
            </div>

            <aside className="rounded-[1.75rem] border border-[#d8d0c4] bg-[#151515] p-6 text-white shadow-[0_20px_50px_rgba(21,21,21,0.12)] sm:p-7 lg:sticky lg:top-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f8a6c2]">
                Resumo
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em]">
                Seu pedido
              </h2>

              <div className="mt-7 flex items-center justify-between text-sm text-[#c9c2b9]">
                <span>Itens</span>
                <span>{totalItems}</span>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm font-medium text-[#c9c2b9]">
                    Total
                  </span>

                  <span className="text-2xl font-bold tracking-[-0.04em] text-white">
                    {totalPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-7 block w-full rounded-full bg-[#d42367] px-6 py-4 text-center text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#ef3f7c]"
              >
                Finalizar compra ↗
              </Link>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#c9c2b9]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d42367]" />
                Compra segura
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}