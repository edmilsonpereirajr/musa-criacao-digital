import Link from "next/link";

export const metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso da Musa Criação Digital.",
};

export default function TermosDeUsoPage() {
  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f6a63] transition-colors hover:text-[#d42367]"
          >
            ← Voltar para a página inicial
          </Link>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
            Musa Criação Digital
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
            Termos de Uso
          </h1>

          <p className="mt-5 text-sm leading-6 text-[#6f6a63]">
            Última atualização: setembro de 2026
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                1. Aceitação dos termos
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                Ao acessar ou utilizar a Musa Criação Digital, o usuário
                declara que leu e concorda com estes Termos de Uso. Caso não
                concorde com alguma condição, não deverá utilizar os serviços
                da plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                2. Sobre a loja
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                A Musa Criação Digital disponibiliza produtos digitais para
                criação, inspiração, produção de conteúdo e outras finalidades
                relacionadas aos materiais oferecidos na plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                3. Conta do usuário
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                Algumas funcionalidades exigem a criação de uma conta. O
                usuário é responsável por fornecer informações verdadeiras e
                manter suas credenciais de acesso protegidas.
              </p>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                A conta é pessoal e não deve ser compartilhada com terceiros.
                O usuário deve comunicar qualquer suspeita de acesso não
                autorizado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                4. Produtos digitais
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                Os produtos disponibilizados pela Musa Criação Digital são
                digitais e podem incluir prompts, packs, ebooks, templates,
                presets e outros materiais digitais descritos na página de cada
                produto.
              </p>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                O conteúdo, formato e condições de utilização de cada produto
                podem variar. O usuário deve verificar a descrição do produto
                antes de concluir a compra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                5. Licença e propriedade intelectual
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                A compra de um produto digital não transfere automaticamente
                os direitos autorais ou a propriedade intelectual do material
                ao comprador.
              </p>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                Salvo indicação expressa em contrário na descrição do produto,
                é proibido revender, redistribuir, disponibilizar publicamente,
                compartilhar ou comercializar os arquivos adquiridos como se
                fossem próprios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                6. Compras e pagamentos
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                Os preços dos produtos são apresentados na própria plataforma e
                podem ser alterados antes da confirmação de uma compra.
              </p>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                O processamento do pagamento é realizado por um provedor de
                pagamento integrado à plataforma. A confirmação do pagamento é
                necessária para a liberação do acesso ao produto adquirido.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                7. Acesso e downloads
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                Após a confirmação do pagamento, o produto digital poderá ser
                disponibilizado para download conforme as condições da
                plataforma.
              </p>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                Links de download podem possuir validade limitada e mecanismos
                de segurança. O usuário não deve tentar contornar essas
                proteções ou obter acesso a arquivos que não adquiriu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                8. Uso proibido
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                É proibido utilizar a plataforma para atividades ilegais,
                tentativa de fraude, exploração de vulnerabilidades, acesso não
                autorizado, distribuição indevida de conteúdo ou qualquer
                atividade que prejudique a plataforma ou outros usuários.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                9. Disponibilidade do serviço
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                Buscamos manter a plataforma disponível e funcionando
                corretamente, mas podem ocorrer interrupções temporárias para
                manutenção, atualizações, problemas técnicos ou fatores fora do
                nosso controle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                10. Responsabilidade
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                O usuário é responsável pelo uso dos produtos adquiridos e por
                manter seus dispositivos e credenciais protegidos.
              </p>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                A Musa Criação Digital não garante que todos os produtos sejam
                adequados para qualquer finalidade específica. O usuário deve
                analisar a descrição e as condições do produto antes da compra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                11. Alterações dos termos
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                Estes Termos de Uso podem ser atualizados quando necessário para
                refletir alterações na plataforma, nos produtos ou nas
                obrigações legais. A versão atualizada ficará disponível nesta
                página.
              </p>
            </section>

            <section className="rounded-[1.5rem] border border-[#d8d0c4] bg-[#fffdf9] p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-[-0.035em] text-[#151515]">
                12. Contato
              </h2>

              <p className="mt-4 leading-7 text-[#6f6a63]">
                Em caso de dúvidas sobre estes termos, produtos ou utilização
                da plataforma, o usuário poderá entrar em contato pelos canais
                oficiais disponibilizados pela Musa Criação Digital.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}