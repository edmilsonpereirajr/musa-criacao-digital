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
    <article className="group flex h-full flex-col overflow-hidden border-2 border-[#0D0D0D] bg-[#F4F0E6] shadow-[6px_6px_0_#0D0D0D] transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[3px_3px_0_#FF0066]">
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[#0D0D0D] bg-[#0D0D0D]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#FF0066]">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[35px] border-[#F4F0E6]/20" />

            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-[40px] border-[#0D0D0D]/10" />

            <div className="relative text-center">
              <span className="text-6xl font-black tracking-[-0.08em] text-[#0D0D0D]">
                M<span className="text-[#F4F0E6]">✦</span>
              </span>

              <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D]">
                MUSA DIGITAL
              </p>
            </div>
          </div>
        )}

        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <span className="border-2 border-[#0D0D0D] bg-[#F4F0E6] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#0D0D0D]">
            Digital
          </span>
        </div>

        <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center border-2 border-[#0D0D0D] bg-[#0D0D0D] text-lg font-bold text-[#F4F0E6] transition-all duration-300 group-hover:bg-[#FF0066] group-hover:text-[#0D0D0D] sm:bottom-4 sm:right-4">
          ↗
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF0066]">
            Produto digital
          </p>

          <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.045em] text-[#0D0D0D]">
            {title}
          </h3>

          <p className="mt-2.5 text-sm leading-6 text-[#55514b] sm:mt-3">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-6 sm:pt-7">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#777168]">
                Preço
              </p>

              <p className="mt-1 text-2xl font-black tracking-[-0.04em] text-[#0D0D0D]">
                {price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            <span className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#55514b]">
              Acesso imediato
            </span>
          </div>

          {error ? (
            <p className="mt-3 border-2 border-[#C62828] bg-[#FBE9E9] px-3 py-2 text-sm leading-5 text-[#C62828]">
              {error}
            </p>
          ) : null}

          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2 sm:mt-5">
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={loading}
              className="border-2 border-[#0D0D0D] bg-[#FF0066] px-4 py-3 text-sm font-black text-[#0D0D0D] transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0_#0D0D0D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Preparando..." : "Comprar agora"}
            </button>

            <Link
              href={`/produto/${slug}`}
              aria-label={`Ver detalhes de ${title}`}
              className="flex min-w-11 items-center justify-center border-2 border-[#0D0D0D] bg-[#F4F0E6] px-3 py-3 text-sm font-black text-[#0D0D0D] transition-all duration-200 hover:bg-[#0D0D0D] hover:text-[#F4F0E6] sm:min-w-12 sm:px-4"
            >
              →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}