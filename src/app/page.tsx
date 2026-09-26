import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div>
      <section className="border-b border-[#d8d0c4]">
        <div className="mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <span className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
            Musa Criação Digital
          </span>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-[#151515] sm:text-6xl">
            Produtos digitais para transformar suas ideias em realidade.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6f6a63]">
            Encontre prompts, materiais e recursos digitais feitos para
            facilitar sua criação e trazer mais inspiração para seus projetos.
          </p>

          <div className="mt-8">
            <Link href="/produtos">
              <Button>Ver produtos</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8d0c4]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
              Explore
            </span>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#151515]">
              Encontre o que você precisa
            </h2>

            <p className="mt-4 text-[#6f6a63]">
              Escolha uma categoria e encontre materiais digitais para o seu
              próximo projeto.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Prompts",
              "Packs criativos",
              "E-books",
              "Templates",
            ].map((category) => (
              <CategoryCard key={category} title={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
            Destaques
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#151515]">
            Produtos em destaque
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </section>

      <section className="border-b border-[#d8d0c4]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
              Por que a Musa?
            </span>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#151515]">
              Tudo para facilitar sua criação
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Acesso digital",
                description:
                  "Receba seus produtos digitais sem precisar esperar por entrega.",
              },
              {
                title: "Conteúdo prático",
                description:
                  "Materiais pensados para você aplicar suas ideias de forma simples.",
              },
              {
                title: "Compra segura",
                description:
                  "Pagamento protegido e acesso aos seus produtos após a confirmação.",
              },
            ].map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-[#d8d0c4] p-6"
              >
                <h3 className="text-xl font-semibold text-[#151515]">
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
    </div>
  );
}