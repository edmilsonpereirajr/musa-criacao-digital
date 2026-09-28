import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { getActiveProductBySlug } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getActiveProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      {/* PRODUTO */}
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mb-8 sm:mb-10">
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f6a63] transition-colors hover:text-[#d42367]"
            >
              ← Voltar para produtos
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            {/* IMAGEM */}
            <div className="relative overflow-hidden rounded-[2rem] bg-[#151515] p-3 shadow-[0_25px_70px_rgba(21,21,21,0.14)] sm:p-4">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[#e8e1d5]">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#d42367]">
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[55px] border-[#f8dce7]/30" />

                    <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full border-[65px] border-[#151515]/10" />

                    <div className="relative text-center text-white">
                      <span className="text-7xl font-bold tracking-[-0.08em]">
                        M<span className="text-[#f8dce7]">✦</span>
                      </span>

                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f8dce7]">
                        Musa Digital
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-[#fffdf9]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#151515] shadow-sm backdrop-blur">
                    Digital
                  </span>
                </div>
              </div>
            </div>

            {/* INFORMAÇÕES */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
                Produto digital
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl lg:text-6xl">
                {product.title}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#6f6a63] sm:text-lg sm:leading-8">
                {product.description}
              </p>

              <div className="mt-8 border-y border-[#d8d0c4] py-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9389]">
                  Acesso digital
                </p>

                <p className="mt-1 text-3xl font-bold tracking-[-0.045em] text-[#151515] sm:text-4xl">
                  {Number(product.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <p className="mt-2 text-sm text-[#6f6a63]">
                  Acesso imediato após a confirmação do pagamento.
                </p>
              </div>

              <div className="mt-7">
                <AddToCartButton
                  productId={product.id}
                  slug={product.slug}
                  title={product.title}
                  price={Number(product.price)}
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-4">
                  <p className="text-xs font-bold text-[#151515]">
                    ✓ Compra segura
                  </p>
                </div>

                <div className="rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-4">
                  <p className="text-xs font-bold text-[#151515]">
                    ✓ Acesso imediato
                  </p>
                </div>

                <div className="rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-4">
                  <p className="text-xs font-bold text-[#151515]">
                    ✓ Produto digital
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#151515] text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f8a6c2] sm:text-sm">
            Musa Criação Digital
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-bold leading-[0.95] tracking-[-0.055em] sm:text-5xl">
            Sua ideia.
            <span className="block text-[#d42367]">
              Seu universo.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#c9c2b9]">
            Explore outros recursos digitais e encontre o próximo material
            para sua criação.
          </p>

          <Link
            href="/produtos"
            className="mt-7 inline-flex rounded-full bg-[#d42367] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#ef3f7c]"
          >
            Ver outros produtos ↗
          </Link>
        </div>
      </section>
    </main>
  );
}