import { createClient } from "@/lib/supabase-server";

type AdminUser = {
  user_id: string;
  email: string | null;
  created_at: string;
  is_admin: boolean;
};

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_admin_users");

  if (error) {
    throw new Error("Não foi possível carregar os usuários.");
  }

  const users = (data ?? []) as AdminUser[];

  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
            Administração
          </p>

          <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
                Usuários.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#6f6a63]">
                Visualize os usuários cadastrados e os acessos administrativos.
              </p>
            </div>

            <div className="flex h-14 w-fit items-center rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                  Usuários cadastrados
                </p>

                <p className="mt-0.5 text-xl font-bold tracking-[-0.03em] text-[#151515]">
                  {users.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {users.length === 0 ? (
            <div className="rounded-[2rem] border border-[#d8d0c4] bg-[#fffdf9] px-6 py-16 text-center shadow-[0_15px_40px_rgba(21,21,21,0.05)] sm:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d42367] text-xl text-white">
                ✦
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                Nenhum usuário encontrado.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6f6a63]">
                Os usuários cadastrados aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2rem] border border-[#d8d0c4] bg-[#fffdf9] shadow-[0_15px_40px_rgba(21,21,21,0.05)]">
              <div className="border-b border-[#d8d0c4] bg-[#151515] px-5 py-5 text-white sm:px-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f8a6c2]">
                      Contas
                    </p>

                    <h2 className="mt-1 text-xl font-bold tracking-[-0.035em]">
                      Usuários cadastrados
                    </h2>
                  </div>

                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#c9c2b9]">
                    {users.length}{" "}
                    {users.length === 1 ? "usuário" : "usuários"}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead className="border-b border-[#d8d0c4] bg-[#f4efe6]">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389] sm:px-7">
                        E-mail
                      </th>

                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                        Cadastro
                      </th>

                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                        Acesso
                      </th>

                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9389]">
                        ID
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.user_id}
                        className="border-b border-[#eee8de] transition-colors last:border-b-0 hover:bg-[#fcfaf5]"
                      >
                        <td className="px-6 py-5 sm:px-7">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f8dce7] text-xs font-bold text-[#d42367]">
                              {(user.email?.charAt(0) ?? "?").toUpperCase()}
                            </div>

                            <span className="font-semibold text-[#151515]">
                              {user.email ?? "E-mail não disponível"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm text-[#6f6a63]">
                          {new Date(user.created_at).toLocaleString("pt-BR")}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                              user.is_admin
                                ? "bg-[#e8f5ec] text-[#16803c]"
                                : "bg-[#f1eee9] text-[#6f6a63]"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                user.is_admin
                                  ? "bg-[#16803c]"
                                  : "bg-[#9a9389]"
                              }`}
                            />

                            {user.is_admin ? "Administrador" : "Cliente"}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className="block max-w-[260px] truncate font-mono text-xs text-[#6f6a63]">
                            {user.user_id}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}