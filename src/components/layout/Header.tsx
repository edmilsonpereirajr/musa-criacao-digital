import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[#d8d0c4] bg-[#f0ebe1]">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-[#151515] transition-colors hover:text-[#d42367]"
        >
          Musa Criação Digital
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-[#151515]">
          <Link
            href="/produtos"
            className="transition-colors hover:text-[#d42367]"
          >
            Produtos
          </Link>

          <Link
            href="/minha-conta"
            className="transition-colors hover:text-[#d42367]"
          >
            Minha conta
          </Link>

          <Link
            href="/carrinho"
            className="rounded-full bg-[#d42367] px-5 py-2.5 text-white transition-colors hover:bg-[#b91d58]"
          >
            Carrinho
          </Link>
        </nav>
      </div>
    </header>
  );
}