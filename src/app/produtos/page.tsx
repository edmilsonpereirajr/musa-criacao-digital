import Link from "next/link";

import { ProductCard } from "@/components/ui/ProductCard";
import { getActiveProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      {/* CABEÇALHO */}
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8d0c4] bg-[#f4efe6] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6f6a63] sm:mb-7 sm:px-4 sm:text-xs sm:tracking-[0.16em]">
              <span className="h-2 w-2 rounded-full bg-[#d42367]" />
              Coleção Musa
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d42367] sm:text-sm sm:tracking-[0.22em]">
              Prompts • Packs
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-[0.94] tracking-[-0.055em] text-[#151515] sm:text-6xl sm:leading-[0.95] sm:tracking-[-0.06em] lg:text-7xl">
              Recursos para
              <span className="block text-[#d42367]">criar sem limite.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6f6a63] sm:mt-7 sm:text-xl sm:leading-8">
              Sua ideia. Seu universo. Encontre prompts e packs criativos para
              transformar inspiração em projetos.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#d42367] sm:text-sm sm:tracking-[0.2em]">
                Produtos disponíveis
              </p>

              <h2 className="mt-2.5 text-3xl font-bold leading-tight tracking-[-0.045em] text-[#151515] sm:mt-3 sm:text-4xl">
                Escolha o que combina com sua ideia.
              </h2>
            </div>

            <Link
              href="/"
              className="w-fit text-sm font-semibold text-[#151515] transition-colors hover:text-[#d42367]"
            >
              Voltar para início ↗
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {products.map((product) => (
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
            <div className="mt-8 rounded-[1.5rem] border border-[#d8d0c4] bg-[#fffdf9] px-5 py-12 text-center sm:mt-12 sm:rounded-[2rem] sm:px-6 sm:py-16">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#d42367] text-xl text-white sm:h-14 sm:w-14 sm:text-2xl">
                ✦
              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-[#151515] sm:mt-6">
                Em breve teremos novidades.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6f6a63]">
                Estamos preparando novos recursos para deixar suas próximas
                criações ainda melhores.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex rounded-full bg-[#151515] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#2c2926] sm:mt-7"
              >
                Voltar para início ↗
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* DESTAQUE */}
      <section className="border-t border-[#d8d0c4] bg-[#151515] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f8a6c2] sm:text-sm sm:tracking-[0.2em]">
              Musa Criação Digital
            </p>

            <h2 className="mt-4 max-w-xl text-4xl font-bold leading-[0.95] tracking-[-0.05em] sm:mt-5 sm:text-5xl sm:tracking-[-0.055em]">
              Menos procurando.
              <span className="block text-[#d42367]">Mais criando.</span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#c9c2b9] sm:mt-6">
              Recursos digitais pensados para deixar seu processo criativo mais
              simples, rápido e interessante.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex rounded-full bg-[#d42367] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#ef3f7c] sm:mt-8 sm:px-7 sm:py-4"
            >
              Conhecer a Musa ↗
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
            <div className="aspect-square rotate-2 rounded-[1.5rem] bg-[#d42367] p-5 transition-transform duration-500 hover:rotate-0 sm:rounded-[2rem] sm:p-6">
              <div className="flex h-full flex-col justify-between rounded-[1.2rem] border border-white/20 bg-[#151515] p-6 sm:rounded-[1.5rem] sm:p-7">
                <div className="text-5xl font-bold tracking-[-0.08em] text-[#d42367] sm:text-6xl">
                  M✦
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c9c2b9] sm:text-xs sm:tracking-[0.18em]">
                    Criação sem limite
                  </p>

                  <p className="mt-3 text-3xl font-bold leading-none tracking-[-0.05em] sm:text-4xl">
                    Sua ideia.
                    <span className="block text-[#f8a6c2]">
                      Seu universo.
                    </span>
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 sm:rounded-2xl sm:px-5 sm:py-4">
                  <p className="text-[11px] text-[#c9c2b9] sm:text-xs">
                    Recursos disponíveis
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">
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