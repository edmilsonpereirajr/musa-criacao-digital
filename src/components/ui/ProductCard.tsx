import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type ProductCardProps = {
  slug: string;
  title: string;
  description: string;
  price: number;
  image?: string;
};

export function ProductCard({
  slug,
  title,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#d8d0c4] bg-[#f0ebe1]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e1d5]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#6f6a63]">
            Imagem do produto
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#151515]">{title}</h3>

        <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="font-semibold text-[#151515]">
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>

          <Link href={`/produto/${slug}`}>
            <Button className="px-4 py-2 text-sm">Ver produto</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}