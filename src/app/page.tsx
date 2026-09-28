import Link from "next/link";

import { ProductCard } from "@/components/ui/ProductCard";
import { createClient } from "@/lib/supabase-server";

const categories = [
  {
    title: "Prompts",
    description: "Ideias prontas para criar imagens incríveis.",
    number: "01",
  },
  {
    title: "Packs criativos",
    description: "Recursos para acelerar seus projetos.",
    number: "02",
  },
];

const benefits = [
  {
    number: "01",
    title: "Escolha",
    description: "Encontre o recurso digital ideal para sua próxima ideia.",
  },
  {
    number: "02",
    title: "Compre",
    description: "Faça seu pagamento de forma rápida e segura.",
  },
  {
    number: "03",
    title: "Crie",
    description: "Receba seu produto e comece a criar imediatamente.",
  },
];

export default async function Home() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("id, slug, title, description, price, image_url")
    .eq("is_active", true)
    .order("created_at", { ascending: true })
    .limit(3);

  if (error) {
    throw new Error("Não foi possível carregar os produtos.");
  }

  return (
    <div className="overflow-hidden bg-[#f4efe6]">
      {/* HERO */}
      <section className="relative border-b border-[#d8d0c4]">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#f8dce7] blur-3xl" />

        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d8d0c4] bg-[#fffdf9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6a63]">
              <span className="h-2 w-2 rounded-full bg-[#d42367]" />
              Criação digital
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d42367]">
              Musa ✦
            </p>

            <h1 className="mt-5 max-w-2xl text-6xl font-bold leading-[0.9] tracking-[-0.065em] text-[#151515] sm:text-7xl lg:text-[88px]">
              Criação sem
              <span className="block text-[#d42367]">limite.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#6f6a63] sm:text-xl">
              Sua ideia. Seu universo. Recursos digitais para transformar sua
              criatividade em projetos que chamam atenção.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center rounded-full bg-[#d42367] px-7 py-4 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(212,35,103,0.20)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#b91d58]"
              >
                Explorar produtos
                <span className="ml-3 text-lg">↗</span>
              </Link>

              <Link
                href="/produtos"
                className="inline-flex items-center justify-center rounded-full border border-[#cfc4b6] bg-[#fffdf9] px-7 py-4 text-sm font-semibold text-[#151515] transition-all duration-200 hover:-translate-y-1 hover:border-[#d42367] hover:text-[#d42367]"
              >
                Ver coleção
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#6f6a63]">
              <span>✓ Compra segura</span>
              <span>✓ Acesso digital</span>
              <span>✓ Pix e cartão</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
            <div className="absolute -left-5 top-12 z-20 hidden rounded-2xl border border-[#d8d0c4] bg-[#fffdf9] px-5 py-4 shadow-[0_20px_45px_rgba(21,21,21,0.10)] sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6f6a63]">
                Sua próxima ideia
              </p>

              <p className="mt-1 text-sm font-bold text-[#151515]">
                Começa aqui ✦
              </p>
            </div>

            <div className="relative aspect-[4/5] rotate-2 rounded-[2rem] bg-[#151515] p-4 shadow-[0_35px_80px_rgba(21,21,21,0.20)] transition-transform duration-500 hover:rotate-0">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-[#d42367] p-8">
                <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[55px] border-[#f8dce7]/30" />

                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full border-[65px] border-[#151515]/10" />

                <div className="relative flex items-center justify-between">
                  <span className="text-lg font-bold tracking-[-0.05em] text-white">
                    musa<span className="text-[#f8dce7]">✦</span>
                  </span>

                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                    Digital
                  </span>
                </div>

                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f8dce7]">
                    Criação sem limite
                  </p>

                  <h2 className="mt-4 text-5xl font-bold leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl">
                    Sua ideia.
                    <span className="block text-[#151515]">
                      Seu universo.
                    </span>
                  </h2>
                </div>

                <div className="relative rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#f8dce7]">
                        Recursos para criar
                      </p>

                      <p className="mt-1 text-base font-semibold text-white">
                        Prompts • Packs
                      </p>
                    </div>

                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#151515] text-xl text-white">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 z-20 rounded-2xl bg-[#151515] px-5 py-4 shadow-[0_20px_45px_rgba(21,21,21,0.20)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d8d0c4]">
                Acesso
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                Imediato ✓
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d42367]">
                Explore
              </p>

              <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-[-0.045em] text-[#151515] sm:text-5xl">
                Encontre o que combina com sua ideia.
              </h2>
            </div>

            <Link
              href="/produtos"
              className="text-sm font-semibold text-[#151515] transition-colors hover:text-[#d42367]"
            >
              Ver todos os produtos ↗
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category.number}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[#d8d0c4] bg-[#f4efe6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d42367]"
              >
                <span className="text-xs font-bold text-[#d42367]">
                  {category.number}
                </span>

                <h3 className="mt-12 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
                  {category.description}
                </p>

                <div className="mt-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#151515] text-white transition-all duration-300 group-hover:bg-[#d42367]">
                  ↗
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="border-b border-[#d8d0c4] bg-[#f4efe6]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d42367]">
                Curadoria Musa
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.045em] text-[#151515] sm:text-5xl">
                Feitos para você criar.
              </h2>
            </div>

            <Link
              href="/produtos"
              className="text-sm font-semibold text-[#151515] transition-colors hover:text-[#d42367]"
            >
              Ver coleção completa ↗
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
        </div>
      </section>

      {/* DESTAQUE */}
      <section className="bg-[#151515] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f8a6c2]">
              Musa Criação Digital
            </p>

            <h2 className="mt-5 max-w-xl text-5xl font-bold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
              Menos tempo procurando.
              <span className="block text-[#d42367]">
                Mais tempo criando.
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-lg leading-8 text-[#c9c2b9]">
              Reunimos recursos digitais para deixar seu processo criativo mais
              simples, rápido e interessante.
            </p>

            <Link
              href="/produtos"
              className="mt-8 inline-flex rounded-full bg-[#d42367] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#ef3f7c]"
            >
              Conhecer a Musa ↗
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-[2rem] bg-[#d42367] p-8 sm:p-12">
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/20 bg-[#151515] p-8">
                <div className="text-6xl font-bold tracking-[-0.08em] text-[#d42367]">
                  M✦
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#c9c2b9]">
                    Crie diferente.
                  </p>

                  <p className="mt-3 text-4xl font-bold leading-none tracking-[-0.05em] text-white">
                    Sua criatividade
                    <span className="block text-[#f8a6c2]">
                      merece espaço.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d42367]">
              Simples assim
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-[-0.045em] text-[#151515] sm:text-5xl">
              Da ideia ao produto em poucos passos.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.number}
                className="rounded-[1.5rem] border border-[#d8d0c4] bg-[#f4efe6] p-7"
              >
                <span className="text-sm font-bold text-[#d42367]">
                  {benefit.number}
                </span>

                <h3 className="mt-14 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="border-b border-[#d8d0c4] bg-[#f4efe6]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Acesso imediato",
                description:
                  "Seus produtos digitais ficam disponíveis após a confirmação do pagamento.",
              },
              {
                title: "Compra segura",
                description:
                  "Pagamento protegido para você comprar com tranquilidade.",
              },
              {
                title: "Conteúdo prático",
                description:
                  "Recursos criados para você colocar suas ideias em prática.",
              },
            ].map((benefit) => (
              <article key={benefit.title} className="p-4">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#d42367] text-white">
                  ✓
                </div>

                <h3 className="text-xl font-bold tracking-[-0.03em] text-[#151515]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8dce7]">
        <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d42367]">
            Sua próxima criação começa agora
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-6xl">
            Pronto para transformar sua ideia?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6a63]">
            Explore a coleção da Musa e encontre o recurso que faltava para
            tirar seu próximo projeto do papel.
          </p>

          <Link
            href="/produtos"
            className="mt-9 inline-flex rounded-full bg-[#151515] px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#2c2926]"
          >
            Explorar produtos ↗
          </Link>
        </div>
      </section>
    </div>
  );
}