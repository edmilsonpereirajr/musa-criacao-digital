import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-[#F4F0E6] bg-[#0D0D0D] text-[#F4F0E6]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-[#0D0D0D] bg-[#FF0066] shadow-[3px_3px_0_#F4F0E6]">
                <span className="text-xl font-black tracking-[-0.12em] text-[#0D0D0D]">
                  M
                </span>
              </div>

              <div>
                <p className="text-xl font-black uppercase tracking-[-0.06em]">
                  MUSA
                </p>

                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#FF0066]">
                  Criação Digital
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#F4F0E6]/60">
              Produtos digitais para criar, inspirar e transformar ideias.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF0066]">
              Institucional
            </p>

            <nav className="mt-4 flex flex-col gap-3 text-sm font-semibold text-[#F4F0E6]/70">
              <Link
                href="/politica-de-privacidade"
                className="w-fit transition-colors hover:text-[#FF0066]"
              >
                Política de Privacidade
              </Link>

              <Link
                href="/termos-de-uso"
                className="w-fit transition-colors hover:text-[#FF0066]"
              >
                Termos de Uso
              </Link>

              <Link
                href="/politica-de-reembolso"
                className="w-fit transition-colors hover:text-[#FF0066]"
              >
                Política de Reembolso
              </Link>

              <Link
                href="/politica-de-cookies"
                className="w-fit transition-colors hover:text-[#FF0066]"
              >
                Política de Cookies
              </Link>

              <Link
                href="/contato"
                className="w-fit transition-colors hover:text-[#FF0066]"
              >
                Contato
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t-2 border-[#F4F0E6]/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#F4F0E6]/40 sm:text-[10px]">
            © {new Date().getFullYear()} Musa Criação Digital. Todos os
            direitos reservados.
          </p>

          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#FF0066]">
            Criação sem limite.
          </span>
        </div>
      </div>
    </footer>
  );
}