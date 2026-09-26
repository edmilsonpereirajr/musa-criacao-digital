import Link from "next/link";
import { Button } from "@/components/ui/Button";

const products = [
  {
    title: "Prompts para Fotos",
    description: "Ideias prontas para criar fotos incríveis com IA.",
    price: "R$ 19,90",
  },
  {
    title: "Pack Criativo",
    description: "Materiais digitais para deixar suas criações mais profissionais.",
    price: "R$ 29,90",
  },
  {
    title: "E-book Digital",
    description: "Conteúdo prático para aprender e colocar suas ideias em ação.",
    price: "R$ 24,90",
  },
];

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
            <article
              key={product.title}
              className="rounded-2xl border border-[#d8d0c4] bg-[#f0ebe1] p-6"
            >
              <div className="mb-8 aspect-[4/3] rounded-xl bg-[#e8e1d5]" />

              <h3 className="text-xl font-semibold text-[#151515]">
                {product.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
                {product.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-semibold text-[#151515]">
                  {product.price}
                </span>

                <Link href="/produtos">
                 <Button className="px-4 py-2 text-sm">Ver produto</Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}