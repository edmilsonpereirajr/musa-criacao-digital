export function Footer() {
  return (
    <footer className="border-t border-[#d8d0c4] bg-[#151515] text-[#f0ebe1]">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm sm:px-6 lg:px-8">
        <p className="font-medium">Musa Criação Digital</p>
        <p className="text-[#cfc8bd]">
          Produtos digitais para criar, inspirar e transformar ideias.
        </p>
        <p className="mt-2 text-xs text-[#9f998f]">
          © {new Date().getFullYear()} Musa Criação Digital. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}