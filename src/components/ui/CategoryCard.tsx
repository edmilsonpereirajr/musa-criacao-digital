import Link from "next/link";

type CategoryCardProps = {
  title: string;
};

export function CategoryCard({ title }: CategoryCardProps) {
  return (
    <Link
      href="/produtos"
      className="group relative block overflow-hidden border-2 border-[#0D0D0D] bg-[#F4F0E6] p-6 shadow-[4px_4px_0_#0D0D0D] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:bg-[#FF0066] hover:shadow-[2px_2px_0_#0D0D0D]"
    >
      <span className="absolute -right-3 -top-3 text-5xl font-black leading-none text-[#0D0D0D]/10 transition-transform duration-300 group-hover:rotate-12 group-hover:text-[#0D0D0D]/20">
        ✦
      </span>

      <div className="relative">
        <div className="mb-8 flex items-start justify-between">
          <span className="border-2 border-[#0D0D0D] bg-[#0D0D0D] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#F4F0E6]">
            MUSA / CATEGORY
          </span>

          <span className="flex h-9 w-9 items-center justify-center border-2 border-[#0D0D0D] bg-[#FF0066] text-lg font-black text-[#0D0D0D] transition-transform duration-200 group-hover:rotate-12">
            ↗
          </span>
        </div>

        <h3 className="max-w-[12rem] text-2xl font-black uppercase leading-[0.95] tracking-[-0.05em] text-[#0D0D0D]">
          {title}
        </h3>

        <div className="mt-8 flex items-center justify-between border-t-2 border-[#0D0D0D] pt-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#0D0D0D]">
            Explorar categoria
          </p>

          <span className="text-lg font-black text-[#0D0D0D] transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}