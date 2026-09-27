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
    <section>
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
          Administração
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#151515]">
          Usuários
        </h1>

        <p className="mt-3 text-[#6f6a63]">
          Visualize os usuários cadastrados e os acessos administrativos.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="rounded-2xl border border-[#d8d0c4] bg-white p-8">
          <h2 className="text-lg font-semibold text-[#151515]">
            Nenhum usuário encontrado
          </h2>

          <p className="mt-2 text-sm text-[#6f6a63]">
            Os usuários cadastrados aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#d8d0c4] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b border-[#d8d0c4] bg-[#e8e1d5]">
                <tr>
                  <th className="px-6 py-4 font-semibold text-[#151515]">
                    E-mail
                  </th>
                  <th className="px-6 py-4 font-semibold text-[#151515]">
                    Cadastro
                  </th>
                  <th className="px-6 py-4 font-semibold text-[#151515]">
                    Acesso
                  </th>
                  <th className="px-6 py-4 font-semibold text-[#151515]">
                    ID
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.user_id}
                    className="border-b border-[#eee8de] last:border-b-0"
                  >
                    <td className="px-6 py-5 font-medium text-[#151515]">
                      {user.email ?? "E-mail não disponível"}
                    </td>

                    <td className="px-6 py-5 text-[#6f6a63]">
                      {new Date(user.created_at).toLocaleString("pt-BR")}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          user.is_admin
                            ? "bg-[#e8f5ec] text-[#16803c]"
                            : "bg-[#e8e1d5] text-[#6f6a63]"
                        }`}
                      >
                        {user.is_admin ? "Administrador" : "Cliente"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-mono text-xs text-[#6f6a63]">
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
    </section>
  );
}