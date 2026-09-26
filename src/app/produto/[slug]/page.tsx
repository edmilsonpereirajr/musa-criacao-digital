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
            {Number(product.price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <div className="mt-8">
      <AddToCartButton
    productId={product.id}
    slug={product.slug}
    title={product.title}
    price={Number(product.price)}
       />
      </div>
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