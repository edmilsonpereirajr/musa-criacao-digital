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
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
            Seu carrinho
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#151515]">
            Seu carrinho está vazio
          </h1>

          <p className="mt-4 text-[#6f6a63]">
            Adicione um produto para continuar.
          </p>

          <Link
            href="/produtos"
            className="mt-8 inline-block rounded-full bg-[#d42367] px-7 py-4 font-medium text-white transition-colors hover:bg-[#b91d58]"
          >
            Ver produtos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <div>
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
            Seu carrinho
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#151515]">
            Seus produtos
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.productId}
                className="rounded-2xl border border-[#d8d0c4] bg-[#e8e1d5] p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Link
                      href={`/produto/${item.slug}`}
                      className="text-xl font-semibold text-[#151515] hover:text-[#d42367]"
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

                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-[#d8d0c4] bg-[#f0ebe1]">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="px-4 py-2 text-lg hover:text-[#d42367]"
                        aria-label={`Diminuir quantidade de ${item.title}`}
                      >
                        -
                      </button>

                      <span className="min-w-10 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="px-4 py-2 text-lg hover:text-[#d42367]"
                        aria-label={`Aumentar quantidade de ${item.title}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-sm font-medium text-[#c62828] hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#d8d0c4] pt-4 text-right font-semibold text-[#151515]">
                  {(item.price * item.quantity).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </article>
            ))}

            <button
              type="button"
              onClick={clearCart}
              className="text-sm font-medium text-[#6f6a63] hover:text-[#c62828]"
            >
              Limpar carrinho
            </button>
          </div>

          <aside className="h-fit rounded-2xl border border-[#d8d0c4] bg-[#e8e1d5] p-6">
            <h2 className="text-xl font-semibold text-[#151515]">
              Resumo do pedido
            </h2>

            <div className="mt-6 flex items-center justify-between text-sm text-[#6f6a63]">
              <span>Itens</span>
              <span>{totalItems}</span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#d8d0c4] pt-4">
              <span className="font-medium text-[#151515]">Total</span>
              <span className="text-2xl font-semibold text-[#151515]">
                {totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <button
              type="button"
              disabled
              className="mt-6 w-full cursor-not-allowed rounded-full bg-[#d8d0c4] px-6 py-4 font-medium text-[#6f6a63]"
            >
              Finalizar compra
            </button>

            <Link
              href="/produtos"
              className="mt-4 block text-center text-sm font-medium text-[#6f6a63] hover:text-[#d42367]"
            >
              Continuar comprando
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}