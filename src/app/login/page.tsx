"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push("/minha-conta");
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16">
      <div className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f0ebe1] p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#d42367]">
            Musa Criação Digital
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#151515]">
            Entrar
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
            Acesse sua conta para acompanhar seus pedidos e produtos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#151515]"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-[#d8d0c4] bg-white px-4 py-3 text-[#151515] outline-none transition focus:border-[#d42367]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#151515]"
            >
              Senha
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#d8d0c4] bg-white px-4 py-3 text-[#151515] outline-none transition focus:border-[#d42367]"
            />
          </div>

          {error ? (
            <p
              role="alert"
              className="rounded-xl bg-[#fbe9e9] px-4 py-3 text-sm text-[#c62828]"
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#d42367] px-6 py-3 font-medium text-white transition-colors hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center gap-3 text-sm">
  <a
    href="/recuperar-senha"
    className="text-[#d42367] transition-colors hover:text-[#b91d58]"
  >
    Esqueci minha senha
  </a>

  <p className="text-[#6f6a63]">
    Ainda não tem uma conta?{" "}
    <a
      href="/cadastro"
      className="font-medium text-[#151515] transition-colors hover:text-[#d42367]"
    >
      Criar conta
          </a>
         </p>
        </div>
      </div>
    </section>
  );
}