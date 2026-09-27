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
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
            Checkout
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#151515]">
            Seu carrinho está vazio
          </h1>

          <p className="mt-4 text-[#6f6a63]">
            Adicione um produto antes de continuar para o checkout.
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
      <div className="mb-10">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
          Checkout
        </span>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#151515]">
          Finalizar compra
        </h1>

        <p className="mt-4 text-[#6f6a63]">
          Confira seu pedido antes de continuar para o pagamento.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          {items.map((item) => (
            <article
              key={item.productId}
              className="rounded-2xl border border-[#d8d0c4] bg-[#e8e1d5] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-[#151515]">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#6f6a63]">
                    Quantidade: {item.quantity}
                  </p>
                </div>

                <span className="font-semibold text-[#151515]">
                  {(item.price * item.quantity).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </article>
          ))}
        </section>

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

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl bg-[#fce4e4] p-4 text-sm text-[#c62828]"
            >
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handlePayment}
            disabled={isCreatingPayment}
            className="mt-6 w-full rounded-full bg-[#d42367] px-6 py-4 font-medium text-white transition-colors hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:bg-[#d8d0c4] disabled:text-[#6f6a63]"
          >
            {isCreatingPayment
              ? "Preparando pagamento..."
              : "Pagar com Mercado Pago"}
          </button>

          <Link
            href="/carrinho"
            className="mt-4 block text-center text-sm font-medium text-[#6f6a63] hover:text-[#d42367]"
          >
            Voltar para o carrinho
          </Link>
        </aside>
      </div>
    </main>
  );
}