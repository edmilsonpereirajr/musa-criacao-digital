import Link from "next/link";

export const metadata = {
  title: "Contato",
  description: "Entre em contato com a Musa Criação Digital.",
};

export default function ContatoPage() {
  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f6a63] transition-colors hover:text-[#d42367]"
          >
            ← Voltar para a página inicial
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
              Fale com a gente
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl lg:text-6xl">
              Precisa de ajuda?
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#6f6a63] sm:text-lg sm:leading-8">
              Estamos aqui para ajudar com dúvidas sobre produtos, pedidos,
              pagamentos, downloads e acesso à sua conta.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-[#d8d0c4] bg-[#fffdf9] p-7 shadow-[0_12px_35px_rgba(21,21,21,0.05)] sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8dce7] text-xl text-[#d42367]">
                @
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                E-mail
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
                Para dúvidas, suporte ou problemas relacionados aos seus
                pedidos, entre em contato pelo nosso canal de atendimento.
              </p>

              <p className="mt-5 break-all text-sm font-semibold text-[#151515]">
                ctt.musacriacaodigital@gmail.com
              </p>

              <a
                href="mailto:ctt.musacriacaodigital@gmail.com"
                className="mt-4 inline-flex rounded-full bg-[#d42367] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#b91d58]"
              >
                Enviar e-mail
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-[#d8d0c4] bg-[#151515] p-7 text-white shadow-[0_20px_50px_rgba(21,21,21,0.12)] sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d42367] text-xl text-white">
                ?
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-[-0.035em]">
                Antes de entrar em contato
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#c9c2b9]">
                Se sua dúvida for sobre uma compra, tenha em mãos o e-mail
                utilizado na conta e, quando possível, o número do pedido.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-[#c9c2b9]">
                <li>✓ Problemas com pagamento</li>
                <li>✓ Produto não disponível</li>
                <li>✓ Problemas com download</li>
                <li>✓ Dúvidas sobre pedidos</li>
                <li>✓ Acesso à conta</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-[#d8d0c4] bg-[#e8e1d5] p-7 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d42367]">
              Atendimento
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-[#151515]">
              Vamos resolver isso.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6f6a63]">
              Para assuntos relacionados a pedidos, pagamentos, reembolsos ou
              produtos digitais, envie as informações necessárias para que
              possamos localizar e analisar sua solicitação.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}