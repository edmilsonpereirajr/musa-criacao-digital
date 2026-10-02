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

function getContentTypeLabel(contentType: string) {
  const labels: Record<string, string> = {
    prompt: "Prompt",
    pack: "Pack",
    ebook: "E-book",
    template: "Template",
    preset: "Preset",
    digital: "Produto digital",
  };

  return labels[contentType] ?? "Produto digital";
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getActiveProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const contentTypeLabel = getContentTypeLabel(product.content_type);

  return (
    <main className="overflow-hidden bg-[#F4F0E6]">
      <section className="border-b-2 border-[#0D0D0D] bg-[#F4F0E6]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 border-2 border-[#0D0D0D] bg-[#F4F0E6] px-4 py-2.5 text-xs font-black uppercase tracking-[0.08em] text-[#0D0D0D] transition-all duration-200 hover:bg-[#0D0D0D] hover:text-[#F4F0E6]"
          >
            ← Voltar para produtos
          </Link>
        </div>
      </section>

      <section className="border-b-2 border-[#0D0D0D] bg-[#F4F0E6]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
            <div className="relative">
              <div className="border-2 border-[#0D0D0D] bg-[#FF0066] p-3 shadow-[8px_8px_0_#0D0D0D] sm:p-4">
                <div className="relative aspect-square overflow-hidden border-2 border-[#0D0D0D] bg-[#0D0D0D]">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  ) : (
                    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#FF0066]">
                      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[55px] border-[#F4F0E6]/20" />

                      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full border-[65px] border-[#0D0D0D]/10" />

                      <div className="relative text-center">
                        <span className="text-7xl font-black tracking-[-0.08em] text-[#0D0D0D] sm:text-8xl">
                          M<span className="text-[#F4F0E6]">✦</span>
                        </span>

                        <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D]">
                          MUSA DIGITAL
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute left-4 top-4">
                    <span className="border-2 border-[#0D0D0D] bg-[#F4F0E6] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#0D0D0D]">
                      {contentTypeLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center border-2 border-[#0D0D0D] bg-[#FF0066] text-xl font-black text-[#0D0D0D]">
                    ↗
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="border-2 border-[#0D0D0D] bg-[#0D0D0D] px-3 py-4 text-center text-[#F4F0E6]">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#FF0066]">
                    Tipo
                  </p>

                  <p className="mt-1 text-xs font-black uppercase">
                    {contentTypeLabel}
                  </p>
                </div>

                <div className="border-2 border-[#0D0D0D] bg-[#F4F0E6] px-3 py-4 text-center text-[#0D0D0D]">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#FF0066]">
                    Formato
                  </p>

                  <p className="mt-1 text-xs font-black uppercase">
                    Digital
                  </p>
                </div>

                <div className="border-2 border-[#0D0D0D] bg-[#F4F0E6] px-3 py-4 text-center text-[#0D0D0D]">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#FF0066]">
                    Entrega
                  </p>

                  <p className="mt-1 text-xs font-black uppercase">
                    Online
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="border-2 border-[#0D0D0D] bg-[#FF0066] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D]">
                  Produto digital
                </span>

                <span className="border-2 border-[#0D0D0D] bg-[#0D0D0D] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#F4F0E6]">
                  Acesso imediato
                </span>
              </div>

              <h1 className="mt-7 max-w-2xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.065em] text-[#0D0D0D] sm:text-6xl lg:text-7xl">
                {product.title}
              </h1>

              <div className="mt-7 h-2 w-20 bg-[#FF0066]" />

              <p className="mt-7 max-w-xl text-base leading-7 text-[#0D0D0D]/70 sm:text-lg sm:leading-8">
                {product.description}
              </p>

              <div className="mt-8 border-y-2 border-[#0D0D0D] py-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#0D0D0D]/50">
                  Investimento
                </p>

                <p className="mt-1 text-4xl font-black tracking-[-0.05em] text-[#0D0D0D] sm:text-5xl">
                  {Number(product.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <p className="mt-3 text-sm leading-6 text-[#0D0D0D]/60">
                  Pagamento seguro e acesso digital após a confirmação da
                  compra.
                </p>
              </div>

              <div className="mt-7">
              <AddToCartButton
              productId={product.id}
              slug={product.slug}
              title={product.title}
              price={Number(product.price)}
              className="w-full border-2 border-[#0D0D0D] bg-[#FF0066] px-6 py-4 text-sm font-black uppercase tracking-[0.04em] text-[#0D0D0D] shadow-[4px_4px_0_#0D0D0D] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_#0D0D0D]"
              />
              </div>

              <div className="mt-5 border-2 border-[#0D0D0D] bg-[#0D0D0D] p-5 text-[#F4F0E6] shadow-[4px_4px_0_#FF0066]">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF0066]">
                  Como funciona
                </p>

                <p className="mt-3 text-sm leading-6 text-[#F4F0E6]/70">
                  Escolha o produto, finalize sua compra e receba acesso ao
                  material digital conforme a confirmação do pagamento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#0D0D0D] bg-[#FF0066]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#0D0D0D] sm:text-xs">
                Sobre o produto
              </p>

              <h2 className="mt-4 max-w-md text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#0D0D0D] sm:text-5xl">
                Feito para você criar.
              </h2>
            </div>

            <div className="border-2 border-[#0D0D0D] bg-[#F4F0E6] p-6 shadow-[6px_6px_0_#0D0D0D] sm:p-8 lg:p-10">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF0066]">
                Descrição
              </p>

              <p className="mt-5 text-base leading-8 text-[#0D0D0D]/75 sm:text-lg">
                {product.description}
              </p>

              <div className="mt-8 border-t-2 border-[#0D0D0D] pt-6">
                <p className="text-sm font-black uppercase tracking-[0.02em] text-[#0D0D0D]">
                  Produto digital
                </p>

                <p className="mt-2 text-sm leading-6 text-[#0D0D0D]/60">
                  Este produto é entregue digitalmente. Não há envio físico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#0D0D0D] bg-[#F4F0E6]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="border-2 border-[#0D0D0D] bg-[#F4F0E6] p-6 shadow-[4px_4px_0_#0D0D0D]">
              <span className="text-3xl font-black text-[#FF0066]">01</span>

              <h3 className="mt-5 text-lg font-black uppercase tracking-[-0.03em] text-[#0D0D0D]">
                Compra segura
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#0D0D0D]/60">
                Seu pagamento passa pelo fluxo seguro de checkout da loja.
              </p>
            </div>

            <div className="border-2 border-[#0D0D0D] bg-[#0D0D0D] p-6 text-[#F4F0E6] shadow-[4px_4px_0_#FF0066]">
              <span className="text-3xl font-black text-[#FF0066]">02</span>

              <h3 className="mt-5 text-lg font-black uppercase tracking-[-0.03em]">
                Produto digital
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#F4F0E6]/60">
                Você compra um material digital, sem necessidade de entrega
                física.
              </p>
            </div>

            <div className="border-2 border-[#0D0D0D] bg-[#F4F0E6] p-6 shadow-[4px_4px_0_#0D0D0D]">
              <span className="text-3xl font-black text-[#FF0066]">03</span>

              <h3 className="mt-5 text-lg font-black uppercase tracking-[-0.03em] text-[#0D0D0D]">
                Acesso digital
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#0D0D0D]/60">
                Após a confirmação do pagamento, o acesso segue o fluxo
                digital da sua conta.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0D0D0D] text-[#F4F0E6]">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF0066] sm:text-xs">
            Musa Criação Digital
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.065em] sm:text-6xl">
            Menos procurando.
            <span className="block text-[#FF0066]">Mais criando.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#F4F0E6]/60">
            Explore outros recursos digitais e encontre o próximo material
            para sua criação.
          </p>

          <Link
            href="/produtos"
            className="mt-8 inline-flex border-2 border-[#F4F0E6] bg-[#FF0066] px-7 py-4 text-sm font-black text-[#0D0D0D] shadow-[4px_4px_0_#F4F0E6] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_#F4F0E6]"
          >
            Ver outros produtos ↗
          </Link>
        </div>
      </section>
    </main>
  );
}