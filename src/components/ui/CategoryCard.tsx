import Link from "next/link";

type CategoryCardProps = {
  title: string;
};

export function CategoryCard({ title }: CategoryCardProps) {
  return (
    <Link
      href="/produtos"
      className="rounded-2xl border border-[#d8d0c4] bg-[#e8e1d5] p-6 transition-colors hover:border-[#d42367] hover:bg-[#f0ebe1]"
    >
      <h3 className="font-semibold text-[#151515]">{title}</h3>

      <p className="mt-2 text-sm text-[#6f6a63]">Ver produtos</p>
    </Link>
  );
}