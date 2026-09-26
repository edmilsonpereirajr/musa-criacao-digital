import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default async function MinhaContaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-[#d8d0c4] bg-[#f0ebe1] p-8">
        <p className="text-sm font-medium text-[#d42367]">
          Musa Criação Digital
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[#151515]">
          Minha conta
        </h1>

        <p className="mt-4 text-[#6f6a63]">
          Você está conectado como:
        </p>

        <p className="mt-1 font-medium text-[#151515]">{user.email}</p>

        <div className="mt-8">
          <LogoutButton />
        </div>
      </div>
    </section>
  );
}