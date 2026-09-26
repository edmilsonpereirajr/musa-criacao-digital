import Link from "next/link";
import { productMap } from "@/data/products";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({
  params,
}: ProductPageProps) {
  const product = productMap[params.slug];

  if (!product) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-[#151515]">
          Produto não encontrado
        </h1>

        <Link
          href="/produtos"
          className="mt-6 inline-flex rounded-full bg-[#d42367] px-6 py-3 font-medium text-white hover:bg-[#b91d58]"
        >
          Voltar para produtos
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="aspect-square rounded-3xl bg-[#e8e1d5]" />

        <div>
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
            Produto digital
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#151515]">
            {product.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#6f6a63]">
            {product.description}
          </p>

          <p className="mt-8 text-3xl font-semibold text-[#151515]">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <button
            type="button"
            className="mt-8 w-full rounded-full bg-[#d42367] px-7 py-4 font-medium text-white transition-colors hover:bg-[#b91d58]"
          >
            Comprar agora
          </button>

          <Link
            href="/produtos"
            className="mt-4 block text-center text-sm font-medium text-[#6f6a63] hover:text-[#d42367]"
          >
            Voltar para produtos
          </Link>
        </div>
      </div>
    </main>
  );
}