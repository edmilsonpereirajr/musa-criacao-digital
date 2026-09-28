import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ded5c8]/80 bg-[#f4efe6]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          aria-label="Musa Criação Digital"
        >
          <span className="text-[25px] font-bold tracking-[-0.06em] text-[#d42367] transition-transform duration-200 group-hover:scale-[1.02]">
            Musa<span className="text-[#151515]">✦</span>
          </span>

          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-[#6f6a63]">
            Criação Digital
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#2b2825] md:flex">
          <Link
            href="/"
            className="relative py-2 transition-colors hover:text-[#d42367]"
          >
            Início
          </Link>

          <Link
            href="/produtos"
            className="relative py-2 transition-colors hover:text-[#d42367]"
          >
            Produtos
          </Link>

          <Link
            href="/produtos"
            className="relative py-2 transition-colors hover:text-[#d42367]"
          >
            Categorias
          </Link>

          <Link
            href="/"
            className="relative py-2 transition-colors hover:text-[#d42367]"
          >
            Sobre
          </Link>

          <Link
            href="/"
            className="relative py-2 transition-colors hover:text-[#d42367]"
          >
            Suporte
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Buscar"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-[#151515] transition-colors hover:bg-[#eadfd2] hover:text-[#d42367] sm:flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[19px] w-[19px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </button>

          <Link
            href="/carrinho"
            aria-label="Carrinho"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#151515] transition-colors hover:bg-[#eadfd2] hover:text-[#d42367]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[20px] w-[20px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="9" cy="19" r="1.3" />
              <circle cx="18" cy="19" r="1.3" />
            </svg>
          </Link>

          <Link
            href="/minha-conta"
            className="rounded-full bg-[#d42367] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b91d58] hover:shadow-md"
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}