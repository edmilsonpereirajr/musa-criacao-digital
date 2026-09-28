"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase";

export function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { totalItems } = useCart();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setLoggedIn(Boolean(data.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(Boolean(session?.user));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    const supabase = createClient();

    await supabase.auth.signOut();
    setMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      router.push("/produtos");
      setSearchOpen(false);
      return;
    }

    setSearchOpen(false);
    setMobileMenuOpen(false);
    router.push(`/produtos?q=${encodeURIComponent(query)}`);
  }

  function openSearch() {
    setSearchOpen(true);
    setMobileMenuOpen(false);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchTerm("");
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#0D0D0D] bg-[#F4F0E6]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Musa Criação Digital"
          onClick={() => {
            closeMobileMenu();
            closeSearch();
          }}
          className="group flex h-14 shrink-0 items-center"
        >
          <div className="flex h-14 w-20 items-center justify-start">
            <Image
              src="/musa/logo/MCONCEPTBK.png"
              alt="Musa Criação Digital"
              width={90}
              height={64}
              className="h-12 w-16 object-contain object-center transition-transform duration-200 group-hover:scale-[1.03]"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
          <Link
            href="/"
            className="group relative py-3 text-[#0D0D0D] transition-colors hover:text-[#FF0066]"
          >
            Início
            <span className="absolute bottom-1 left-0 h-0.5 w-0 bg-[#FF0066] transition-all group-hover:w-full" />
          </Link>

          <Link
            href="/produtos"
            className="group relative py-3 text-[#0D0D0D] transition-colors hover:text-[#FF0066]"
          >
            Produtos
            <span className="absolute bottom-1 left-0 h-0.5 w-0 bg-[#FF0066] transition-all group-hover:w-full" />
          </Link>

          <Link
            href="/"
            className="group relative py-3 text-[#0D0D0D] transition-colors hover:text-[#FF0066]"
          >
            Sobre
            <span className="absolute bottom-1 left-0 h-0.5 w-0 bg-[#FF0066] transition-all group-hover:w-full" />
          </Link>

          <Link
            href="/contato"
            className="group relative py-3 text-[#0D0D0D] transition-colors hover:text-[#FF0066]"
          >
            Suporte
            <span className="absolute bottom-1 left-0 h-0.5 w-0 bg-[#FF0066] transition-all group-hover:w-full" />
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Buscar"
            onClick={openSearch}
            className="hidden h-10 w-10 items-center justify-center border-2 border-transparent text-[#0D0D0D] transition-all hover:border-[#0D0D0D] hover:bg-[#FF0066] sm:flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[19px] w-[19px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </button>

          <Link
            href="/carrinho"
            aria-label={`Carrinho${
              totalItems > 0 ? `, ${totalItems} itens` : ""
            }`}
            className="relative flex h-10 w-10 items-center justify-center border-2 border-transparent text-[#0D0D0D] transition-all hover:border-[#0D0D0D] hover:bg-[#FF0066]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[20px] w-[20px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="9" cy="19" r="1.3" />
              <circle cx="18" cy="19" r="1.3" />
            </svg>

            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center border-2 border-[#0D0D0D] bg-[#FF0066] px-1 text-[9px] font-black leading-none text-[#0D0D0D]">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            ) : null}
          </Link>

          {loggedIn ? (
            <>
              <Link
                href="/minha-conta"
                className="hidden border-2 border-[#0D0D0D] bg-[#FF0066] px-5 py-2.5 text-sm font-black text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D] transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_#0D0D0D] sm:block"
              >
                Minha conta
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="hidden font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#0D0D0D] transition-colors hover:text-[#FF0066] sm:block"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden border-2 border-[#0D0D0D] bg-[#FF0066] px-5 py-2.5 text-sm font-black text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D] transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_#0D0D0D] sm:block"
            >
              Entrar
            </Link>
          )}

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center border-2 border-[#0D0D0D] text-[#0D0D0D] transition-colors hover:bg-[#FF0066] md:hidden"
          >
            {mobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="h-[21px] w-[21px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-[21px] w-[21px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t-2 border-[#0D0D0D] bg-[#F4F0E6]">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8"
          >
            <div className="relative flex-1">
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#0D0D0D]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                autoFocus
                placeholder="Buscar produtos..."
                aria-label="Buscar produtos"
                className="h-12 w-full border-2 border-[#0D0D0D] bg-white pl-11 pr-4 text-sm font-medium text-[#0D0D0D] outline-none transition-colors placeholder:text-[#77736c] focus:bg-[#FFF9F0] focus:ring-2 focus:ring-[#FF0066]"
              />
            </div>

            <button
              type="submit"
              className="hidden border-2 border-[#0D0D0D] bg-[#FF0066] px-6 py-3 text-sm font-black text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_#0D0D0D] sm:block"
            >
              Buscar
            </button>

            <button
              type="button"
              onClick={closeSearch}
              aria-label="Fechar busca"
              className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#0D0D0D] text-[#0D0D0D] transition-colors hover:bg-[#FF0066]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[20px] w-[20px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>
          </form>
        </div>
      ) : null}

      {mobileMenuOpen ? (
        <div className="border-t-2 border-[#0D0D0D] bg-[#F4F0E6] md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={openSearch}
              className="flex w-full items-center gap-3 border-b-2 border-[#0D0D0D] px-4 py-4 text-left text-sm font-bold text-[#0D0D0D] transition-colors hover:bg-[#FF0066]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              Buscar produtos
            </button>

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="border-b-2 border-[#0D0D0D] px-4 py-4 text-sm font-bold text-[#0D0D0D] transition-colors hover:bg-[#FF0066]"
            >
              Início
            </Link>

            <Link
              href="/produtos"
              onClick={closeMobileMenu}
              className="border-b-2 border-[#0D0D0D] px-4 py-4 text-sm font-bold text-[#0D0D0D] transition-colors hover:bg-[#FF0066]"
            >
              Produtos
            </Link>

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="border-b-2 border-[#0D0D0D] px-4 py-4 text-sm font-bold text-[#0D0D0D] transition-colors hover:bg-[#FF0066]"
            >
              Sobre
            </Link>

            <Link
              href="/contato"
              onClick={closeMobileMenu}
              className="border-b-2 border-[#0D0D0D] px-4 py-4 text-sm font-bold text-[#0D0D0D] transition-colors hover:bg-[#FF0066]"
            >
              Suporte
            </Link>

            {loggedIn ? (
              <>
                <Link
                  href="/minha-conta"
                  onClick={closeMobileMenu}
                  className="mt-4 border-2 border-[#0D0D0D] bg-[#FF0066] px-4 py-4 text-sm font-black text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D]"
                >
                  Minha conta
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-4 text-left text-sm font-bold text-[#0D0D0D] transition-colors hover:text-[#FF0066]"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="mt-4 border-2 border-[#0D0D0D] bg-[#FF0066] px-4 py-4 text-sm font-black text-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D]"
              >
                Entrar
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}