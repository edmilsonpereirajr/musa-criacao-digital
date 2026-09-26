import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
          Loja
        </span>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#151515]">
          Produtos digitais
        </h1>

        <p className="mt-4 text-lg leading-8 text-[#6f6a63]">
          Encontre materiais digitais para facilitar suas criações e transformar
          suas ideias em resultados.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.slug}
            className="overflow-hidden rounded-2xl border border-[#d8d0c4] bg-[#f0ebe1]"
          >
            <div className="aspect-[4/3] bg-[#e8e1d5]" />

            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#151515]">
                {product.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
                {product.description}
              </p>

              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="font-semibold text-[#151515]">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>

                <Link href={`/produto/${product.slug}`}>
                     <Button className="px-5 py-2.5 text-sm">Ver produto</Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}