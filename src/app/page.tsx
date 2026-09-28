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
    <div className="overflow-hidden bg-[#F4F0E6]">
      {/* HERO */}
      <section className="relative border-b-2 border-[#0D0D0D] bg-[#F4F0E6]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#FF0066]/10 blur-3xl" />

        <div className="pointer-events-none absolute left-[8%] top-[18%] hidden h-5 w-5 rotate-12 bg-[#FF0066] lg:block" />

        <div className="pointer-events-none absolute bottom-[14%] right-[8%] hidden h-4 w-4 rounded-full border-2 border-[#0D0D0D] lg:block" />

        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 border-2 border-[#0D0D0D] bg-[#FF0066] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0D0D0D] shadow-[4px_4px_0_#0D0D0D]">
              <span className="h-2 w-2 border border-[#0D0D0D] bg-[#F4F0E6]" />
              Criação digital
            </div>

            <p className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-[#FF0066]">
              MUSA / DIGITAL
            </p>

            <h1 className="mt-5 max-w-2xl text-6xl font-black uppercase leading-[0.84] tracking-[-0.075em] text-[#0D0D0D] sm:text-7xl lg:text-[88px]">
              Criação
              <span className="block text-[#FF0066]">sem limite.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#0D0D0D]/65 sm:text-xl">
              Sua ideia. Seu universo. Recursos digitais para transformar sua
              criatividade em projetos que chamam atenção.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center border-2 border-[#0D0D0D] bg-[#FF0066] px-7 py-4 text-sm font-black text-[#0D0D0D] shadow-[5px_5px_0_#0D0D0D] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_#0D0D0D]"
              >
                Explorar produtos
                <span className="ml-3 text-lg">↗</span>
              </Link>

              <Link
                href="/produtos"
                className="inline-flex items-center justify-center border-2 border-[#0D0D0D] bg-[#F4F0E6] px-7 py-4 text-sm font-black text-[#0D0D0D] transition-all duration-200 hover:bg-[#0D0D0D] hover:text-[#F4F0E6]"
              >
                Ver coleção
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#0D0D0D]/55 sm:text-xs">
              <span>✓ Compra segura</span>
              <span>✓ Acesso digital</span>
              <span>✓ Pix e cartão</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
            <div className="absolute -left-5 top-12 z-20 hidden border-2 border-[#0D0D0D] bg-[#F4F0E6] px-5 py-4 shadow-[5px_5px_0_#0D0D0D] sm:block">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#0D0D0D]/55">
                Sua próxima ideia
              </p>

              <p className="mt-1 text-sm font-black text-[#0D0D0D]">
                Começa aqui ✦
              </p>
            </div>

            <div className="relative aspect-[4/5] rotate-2 border-4 border-[#0D0D0D] bg-[#0D0D0D] p-3 shadow-[12px_12px_0_#FF0066] transition-transform duration-500 hover:rotate-0">
              <div className="relative flex h-full flex-col justify-between overflow-hidden border-2 border-[#0D0D0D] bg-[#FF0066] p-8">
                <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[55px] border-[#F4F0E6]/20" />

                <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full border-[65px] border-[#0D0D0D]/10" />

                <div className="relative flex items-center justify-between">
                  <span className="text-lg font-black tracking-[-0.05em] text-[#0D0D0D]">
                    MUSA
                  </span>

                  <span className="border-2 border-[#0D0D0D] bg-[#F4F0E6] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#0D0D0D]">
                    Digital
                  </span>
                </div>

                <div className="relative">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0D0D0D]">
                    Criação sem limite
                  </p>

                  <h2 className="mt-4 text-5xl font-black leading-[0.86] tracking-[-0.06em] text-[#F4F0E6] sm:text-6xl">
                    Sua ideia.
                    <span className="block text-[#0D0D0D]">
                      Seu universo.
                    </span>
                  </h2>
                </div>

                <div className="relative border-2 border-[#0D0D0D] bg-[#F4F0E6]/15 p-5 backdrop-blur-md">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-[#0D0D0D]">
                        Recursos para criar
                      </p>

                      <p className="mt-1 text-base font-black text-[#F4F0E6]">
                        Prompts • Packs
                      </p>
                    </div>

                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#0D0D0D] bg-[#0D0D0D] text-xl text-[#F4F0E6]">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 z-20 border-2 border-[#0D0D0D] bg-[#0D0D0D] px-5 py-4 shadow-[5px_5px_0_#FF0066]">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#F4F0E6]">
                Acesso
              </p>

              <p className="mt-1 text-sm font-black text-[#FF0066]">
                Imediato ✓
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="border-b-2 border-[#0D0D0D] bg-[#F4F0E6]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF0066] sm:text-xs">
                Explore / 01
              </p>

              <h2 className="mt-3 max-w-2xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.055em] text-[#0D0D0D] sm:text-5xl">
                Encontre o que combina com sua ideia.
              </h2>
            </div>

            <Link
              href="/produtos"
              className="w-fit font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#0D0D0D] transition-colors hover:text-[#FF0066] sm:text-xs"
            >
              Ver todos os produtos ↗
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {categories.map((category) => (
              <Link
                key={category.number}
                href="/produtos"
                className="group relative overflow-hidden border-2 border-[#0D0D0D] bg-[#F4F0E6] p-6 shadow-[5px_5px_0_#0D0D0D] transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:bg-[#FF0066] hover:shadow-[2px_2px_0_#0D0D0D]"
              >
                <span className="font-mono text-xs font-bold text-[#FF0066] group-hover:text-[#0D0D0D]">
                  {category.number}
                </span>

                <h3 className="mt-12 text-2xl font-black uppercase tracking-[-0.04em] text-[#0D0D0D]">
                  {category.title}
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#0D0D0D]/60 group-hover:text-[#0D0D0D]">
                  {category.description}
                </p>

                <div className="mt-8 flex h-10 w-10 items-center justify-center border-2 border-[#0D0D0D] bg-[#0D0D0D] text-[#F4F0E6] transition-all duration-300 group-hover:bg-[#F4F0E6] group-hover:text-[#0D0D0D]">
                  ↗
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="border-b-2 border-[#0D0D0D] bg-[#F4F0E6]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF0066] sm:text-xs">
                Curadoria MUSA / 02
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.055em] text-[#0D0D0D] sm:text-5xl">
                Feitos para você criar.
              </h2>
            </div>

            <Link
              href="/produtos"
              className="w-fit font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#0D0D0D] transition-colors hover:text-[#FF0066] sm:text-xs"
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
      <section className="border-b-2 border-[#0D0D0D] bg-[#0D0D0D] text-[#F4F0E6]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF0066] sm:text-xs">
              MUSA / Manifesto
            </p>

            <h2 className="mt-5 max-w-xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
              Menos tempo procurando.
              <span className="block text-[#FF0066]">
                Mais tempo criando.
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-lg leading-8 text-[#F4F0E6]/65">
              Reunimos recursos digitais para deixar seu processo criativo mais
              simples, rápido e interessante.
            </p>

            <Link
              href="/produtos"
              className="mt-8 inline-flex border-2 border-[#F4F0E6] bg-[#FF0066] px-7 py-4 text-sm font-black text-[#0D0D0D] shadow-[5px_5px_0_#F4F0E6] transition-all hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_#F4F0E6]"
            >
              Conhecer a MUSA ↗
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="aspect-square rotate-2 border-4 border-[#F4F0E6] bg-[#FF0066] p-5 shadow-[10px_10px_0_#F4F0E6] transition-transform duration-500 hover:rotate-0 sm:p-8">
              <div className="flex h-full flex-col justify-between border-2 border-[#0D0D0D] bg-[#0D0D0D] p-7 sm:p-8">
                <div className="text-6xl font-black tracking-[-0.08em] text-[#FF0066]">
                  M✦
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#F4F0E6]/55 sm:text-sm">
                    Crie diferente.
                  </p>

                  <p className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#F4F0E6]">
                    Sua criatividade
                    <span className="block text-[#FF0066]">
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
      <section className="border-b-2 border-[#0D0D0D] bg-[#F4F0E6]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF0066] sm:text-xs">
              Simples assim / 03
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.055em] text-[#0D0D0D] sm:text-5xl">
              Da ideia ao produto em poucos passos.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.number}
                className="group border-2 border-[#0D0D0D] bg-[#F4F0E6] p-7 shadow-[5px_5px_0_#0D0D0D] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:bg-[#FF0066] hover:shadow-[2px_2px_0_#0D0D0D]"
              >
                <span className="font-mono text-sm font-bold text-[#FF0066] group-hover:text-[#0D0D0D]">
                  {benefit.number}
                </span>

                <h3 className="mt-14 text-2xl font-black uppercase tracking-[-0.04em] text-[#0D0D0D]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#0D0D0D]/60 group-hover:text-[#0D0D0D]">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="border-b-2 border-[#0D0D0D] bg-[#F4F0E6]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
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
            ].map((benefit, index) => (
              <article
                key={benefit.title}
                className="border-2 border-[#0D0D0D] bg-[#F4F0E6] p-7 shadow-[4px_4px_0_#FF0066] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center border-2 border-[#0D0D0D] bg-[#FF0066] font-black text-[#0D0D0D]">
                  {index + 1}
                </div>

                <h3 className="text-xl font-black uppercase tracking-[-0.03em] text-[#0D0D0D]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#0D0D0D]/60">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b-2 border-[#0D0D0D] bg-[#FF0066]">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] sm:text-xs">
            Sua próxima criação começa agora
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#0D0D0D] sm:text-6xl">
            Pronto para transformar sua ideia?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#0D0D0D]/70">
            Explore a coleção da MUSA e encontre o recurso que faltava para
            tirar seu próximo projeto do papel.
          </p>

          <Link
            href="/produtos"
            className="mt-9 inline-flex border-2 border-[#0D0D0D] bg-[#0D0D0D] px-8 py-4 text-sm font-black text-[#F4F0E6] shadow-[5px_5px_0_#F4F0E6] transition-all hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_#F4F0E6]"
          >
            Explorar produtos ↗
          </Link>
        </div>
      </section>
    </div>
  );
}