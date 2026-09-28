"use client";

import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/context/CartContext";

export function CheckoutContent() {
  const { items, totalItems, totalPrice } = useCart();

  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePayment() {
    setError(null);
    setIsCreatingPayment(true);

    try {
      const response = await fetch("/api/checkout/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const data: unknown = await response.json();

      if (
        !response.ok ||
        !data ||
        typeof data !== "object" ||
        !("initPoint" in data) ||
        typeof data.initPoint !== "string"
      ) {
        const message =
          data &&
          typeof data === "object" &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : "Não foi possível iniciar o pagamento.";

        throw new Error(message);
      }

      window.location.href = data.initPoint;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível iniciar o pagamento.",
      );

      setIsCreatingPayment(false);
    }
  }

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
                Checkout
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
                Seu carrinho está vazio.
              </h1>

              <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#6f6a63]">
                Adicione um produto antes de continuar para o pagamento.
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
                Checkout
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
                Finalizar compra.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-[#6f6a63]">
                Confira seu pedido antes de seguir para o pagamento seguro.
              </p>
            </div>

            <Link
              href="/carrinho"
              className="w-fit text-sm font-semibold text-[#151515] transition-colors hover:text-[#d42367]"
            >
              ← Voltar para o carrinho
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <section>
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d42367]">
                  Seu pedido
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                  Produtos selecionados
                </h2>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <article
                    key={item.productId}
                    className="rounded-[1.5rem] border border-[#d8d0c4] bg-[#fffdf9] p-5 shadow-[0_10px_30px_rgba(21,21,21,0.04)] sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="min-w-0">
                        <Link
                          href={`/produto/${item.slug}`}
                          className="text-lg font-bold tracking-[-0.03em] text-[#151515] transition-colors hover:text-[#d42367]"
                        >
                          {item.title}
                        </Link>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#6f6a63]">
                          <span>Quantidade: {item.quantity}</span>

                          <span className="h-1 w-1 rounded-full bg-[#d8d0c4]" />

                          <span>
                            {item.price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}{" "}
                            por unidade
                          </span>
                        </div>
                      </div>

                      <span className="shrink-0 text-lg font-bold tracking-[-0.03em] text-[#151515]">
                        {(item.price * item.quantity).toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          },
                        )}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[#d8d0c4] bg-[#f8dce7] p-5 sm:p-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d42367] text-sm font-bold text-white">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-bold text-[#151515]">
                      Compra segura
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#6f6a63]">
                      O pagamento será processado pelo Mercado Pago. Seus
                      dados de pagamento são tratados pelo provedor.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="h-fit rounded-[1.75rem] bg-[#151515] p-6 text-white shadow-[0_25px_60px_rgba(21,21,21,0.16)] sm:p-7 lg:sticky lg:top-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f8a6c2]">
                Resumo
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em]">
                Seu pedido
              </h2>

              <div className="mt-7 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#c9c2b9]">Itens</span>
                  <span className="font-semibold text-white">
                    {totalItems}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-sm font-medium text-[#c9c2b9]">
                      Total
                    </span>

                    <span className="text-3xl font-bold tracking-[-0.045em] text-white">
                      {totalPrice.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {error ? (
                <div
                  role="alert"
                  className="mt-5 rounded-xl bg-[#fce4e4] p-4 text-sm leading-5 text-[#c62828]"
                >
                  {error}
                </div>
              ) : null}

              <button
                type="button"
                onClick={handlePayment}
                disabled={isCreatingPayment}
                className="mt-7 w-full rounded-full bg-[#d42367] px-6 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#ef3f7c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreatingPayment
                  ? "Preparando pagamento..."
                  : "Continuar para pagamento ↗"}
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#c9c2b9]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d42367]" />
                Pagamento processado pelo Mercado Pago
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}