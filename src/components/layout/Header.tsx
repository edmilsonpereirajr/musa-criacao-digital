import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[#d8d0c4] bg-[#f0ebe1]">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[#151515]"
        >
          Musa Criação Digital
        </Link>

        <nav className="flex items-center gap-5 text-sm text-[#151515]">
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
            className="transition-colors hover:text-[#d42367]"
          >
            Carrinho
          </Link>
        </nav>
      </div>
    </header>
  );
}