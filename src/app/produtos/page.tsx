import Link from "next/link";

import { ProductCard } from "@/components/ui/ProductCard";
import { getActiveProducts } from "@/lib/products";

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const products = await getActiveProducts();
  const params = await searchParams;

  const searchTerm = params.q?.trim() ?? "";
  const normalizedSearch = searchTerm.toLowerCase();

  const filteredProducts = normalizedSearch
    ? products.filter((product) => {
        const title = product.title.toLowerCase();
        const description = product.description?.toLowerCase() ?? "";

        return (
          title.includes(normalizedSearch) ||
          description.includes(normalizedSearch)
        );
      })
    : products;

  const isSearching = Boolean(searchTerm);

  return (
    <main className="overflow-hidden bg-[#F4F0E6]">
      <section className="border-b-2 border-[#0D0D0D] bg-[#F4F0E6]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="border-2 border-[#0D0D0D] bg-[#FF0066] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D]">
                Coleção Musa
              </span>

              <span className="border-2 border-[#0D0D0D] bg-[#0D0D0D] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#F4F0E6]">
                Prompts • Packs
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.07em] text-[#0D0D0D] sm:text-7xl lg:text-8xl">
              Recursos para
              <span className="block text-[#FF0066]">
                criar sem limite.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#0D0D0D]/70 sm:text-xl sm:leading-8">
              Sua ideia. Seu universo. Encontre prompts e packs criativos para
              transformar inspiração em projetos.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-3 w-3 border-2 border-[#0D0D0D] bg-[#FF0066]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#0D0D0D]">
                Criação sem limite
              </span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-6 border-b-2 border-[#0D0D0D] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF0066] sm:text-xs">
                {isSearching ? "Resultado da busca" : "Produtos disponíveis"}
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.055em] text-[#0D0D0D] sm:text-5xl">
                {isSearching
                  ? `Resultados para "${searchTerm}"`
                  : "Escolha o que combina com sua ideia."}
              </h2>
            </div>

            <Link
              href="/"
              className="w-fit border-2 border-[#0D0D0D] bg-[#FF0066] px-4 py-3 text-sm font-black text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D] transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_#0D0D0D]"
            >
              Voltar para início ↗
            </Link>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  title={product.title}
                  description={product.description}
                  price={Number(product.price)}
                  image={product.image_url}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 border-2 border-[#0D0D0D] bg-[#F4F0E6] px-5 py-14 text-center shadow-[5px_5px_0_#0D0D0D] sm:px-6 sm:py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-[#0D0D0D] bg-[#FF0066] text-2xl font-black text-[#0D0D0D]">
                {isSearching ? "⌕" : "✦"}
              </div>

              <h2 className="mt-6 text-2xl font-black uppercase tracking-[-0.04em] text-[#0D0D0D] sm:text-3xl">
                {isSearching
                  ? "Nenhum produto encontrado."
                  : "Em breve teremos novidades."}
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#0D0D0D]/65">
                {isSearching
                  ? "Tente buscar por outro termo ou veja todos os produtos disponíveis."
                  : "Estamos preparando novos recursos para deixar suas próximas criações ainda melhores."}
              </p>

              {isSearching ? (
                <Link
                  href="/produtos"
                  className="mt-7 inline-flex border-2 border-[#0D0D0D] bg-[#FF0066] px-6 py-3 text-sm font-black text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D] transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_#0D0D0D]"
                >
                  Ver todos os produtos ↗
                </Link>
              ) : (
                <Link
                  href="/"
                  className="mt-7 inline-flex border-2 border-[#0D0D0D] bg-[#0D0D0D] px-6 py-3 text-sm font-black text-[#F4F0E6] shadow-[3px_3px_0_#FF0066] transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5"
                >
                  Voltar para início ↗
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="border-t-2 border-[#0D0D0D] bg-[#0D0D0D] text-[#F4F0E6]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF0066] sm:text-xs">
              Musa Criação Digital
            </p>

            <h2 className="mt-5 max-w-xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.065em] sm:text-6xl">
              Menos procurando.
              <span className="block text-[#FF0066]">Mais criando.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#F4F0E6]/65 sm:text-lg">
              Recursos digitais pensados para deixar seu processo criativo
              mais simples, rápido e interessante.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex border-2 border-[#F4F0E6] bg-[#FF0066] px-6 py-3.5 text-sm font-black text-[#0D0D0D] shadow-[4px_4px_0_#F4F0E6] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_#F4F0E6]"
            >
              Conhecer a Musa ↗
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative rotate-2 border-2 border-[#F4F0E6] bg-[#FF0066] p-4 shadow-[8px_8px_0_#F4F0E6] transition-transform duration-500 hover:rotate-0 sm:p-5">
              <div className="flex aspect-square flex-col justify-between border-2 border-[#0D0D0D] bg-[#F4F0E6] p-6 text-[#0D0D0D] sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="text-5xl font-black tracking-[-0.12em] sm:text-6xl">
                    M✦
                  </span>

                  <span className="border-2 border-[#0D0D0D] bg-[#0D0D0D] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#F4F0E6]">
                    MUSA
                  </span>
                </div>

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF0066]">
                    Criação sem limite
                  </p>

                  <p className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-[-0.055em] sm:text-4xl">
                    Sua ideia.
                    <span className="block">Seu universo.</span>
                  </p>
                </div>

                <div className="border-t-2 border-[#0D0D0D] pt-4">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#0D0D0D]/55">
                    Recursos disponíveis
                  </p>

                  <p className="mt-1 text-sm font-black uppercase">
                    Prompts • Packs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}