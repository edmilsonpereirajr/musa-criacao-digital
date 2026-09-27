"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

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
    <article className="overflow-hidden rounded-2xl border border-[#d8d0c4] bg-[#f0ebe1]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e1d5]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#6f6a63]">
            Imagem do produto
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#151515]">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
          {description}
        </p>

        <div className="mt-6">
          <span className="font-semibold text-[#151515]">
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>

          {error ? (
            <p className="mt-3 text-sm text-[#c62828]">
              {error}
            </p>
          ) : null}

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={loading}
              className="w-full rounded-full bg-[#d42367] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Preparando pagamento..." : "Comprar agora"}
            </button>

            <Link
              href={`/produto/${slug}`}
              className="w-full"
            >
              <Button className="w-full px-4 py-2 text-sm">
                Ver produto
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}