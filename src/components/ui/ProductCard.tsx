"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

type ProductCardProps = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  image?: string | null;
};

export function ProductCard({
  id,
  slug,
  title,
  description,
  price,
  image,
}: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleBuyNow() {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/checkout/buy-now", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
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
      console.error("Erro ao iniciar compra:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível iniciar o pagamento.",
      );

      setLoading(false);
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#d8d0c4] bg-[#fffdf9] shadow-[0_12px_35px_rgba(21,21,21,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cfc4b6] hover:shadow-[0_22px_50px_rgba(21,21,21,0.10)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e1d5]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#d42367]">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[35px] border-[#f8dce7]/30" />

            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-[40px] border-[#151515]/10" />

            <div className="relative text-center text-white">
              <span className="text-5xl font-bold tracking-[-0.08em]">
                M<span className="text-[#f8dce7]">✦</span>
              </span>

              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f8dce7]">
                Musa Digital
              </p>
            </div>
          </div>
        )}

        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <span className="rounded-full bg-[#fffdf9]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#151515] shadow-sm backdrop-blur">
            Digital
          </span>
        </div>

        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#151515] text-base text-white shadow-lg transition-all duration-300 group-hover:bg-[#d42367] sm:bottom-4 sm:right-4 sm:h-10 sm:w-10 sm:text-lg">
          ↗
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d42367]">
            Produto digital
          </p>

          <h3 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.04em] text-[#151515]">
            {title}
          </h3>

          <p className="mt-2.5 text-sm leading-6 text-[#6f6a63] sm:mt-3">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-6 sm:pt-7">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a9389]">
                A partir de
              </p>

              <p className="mt-1 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                {price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            <span className="mb-1 text-xs font-medium text-[#6f6a63]">
              Acesso imediato
            </span>
          </div>

          {error ? (
            <p className="mt-3 rounded-xl bg-[#fbe9e9] px-3 py-2 text-sm leading-5 text-[#c62828]">
              {error}
            </p>
          ) : null}

          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2 sm:mt-5">
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={loading}
              className="rounded-full bg-[#d42367] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Preparando..." : "Comprar agora"}
            </button>

            <Link
              href={`/produto/${slug}`}
              aria-label={`Ver detalhes de ${title}`}
              className="flex min-w-11 items-center justify-center rounded-full border border-[#d8d0c4] px-3 py-3 text-sm font-semibold text-[#151515] transition-all duration-200 hover:border-[#d42367] hover:bg-[#f8dce7] hover:text-[#d42367] sm:min-w-12 sm:px-4"
            >
              →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}