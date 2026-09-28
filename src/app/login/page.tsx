"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

import { createClient } from "@/lib/supabase";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();

  function getSafeNextPath() {
    const next = searchParams.get("next");

    if (next && next.startsWith("/") && !next.startsWith("//")) {
      return next;
    }

    return "/minha-conta";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    const nextPath = getSafeNextPath();

    window.location.assign(nextPath);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-[#151515]"
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
          placeholder="seu@email.com"
          className="w-full rounded-2xl border border-[#d8d0c4] bg-[#fffdf9] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all placeholder:text-[#9a9389] focus:border-[#d42367] focus:ring-4 focus:ring-[#f8dce7]"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-[#151515]"
          >
            Senha
          </label>

          <a
            href="/recuperar-senha"
            className="text-xs font-semibold text-[#d42367] transition-colors hover:text-[#b91d58]"
          >
            Esqueci minha senha
          </a>
        </div>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Digite sua senha"
          className="w-full rounded-2xl border border-[#d8d0c4] bg-[#fffdf9] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all placeholder:text-[#9a9389] focus:border-[#d42367] focus:ring-4 focus:ring-[#f8dce7]"
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-2xl bg-[#fbe9e9] px-4 py-3 text-sm leading-5 text-[#c62828]"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#d42367] px-6 py-4 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(212,35,103,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Entrando..." : "Entrar ↗"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center border-b border-[#d8d0c4] px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#f8dce7] blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#d8d0c4] bg-[#fffdf9] shadow-[0_30px_80px_rgba(21,21,21,0.10)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden overflow-hidden bg-[#151515] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[55px] border-[#d42367]/30" />

            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full border-[65px] border-white/5" />

            <div className="relative">
              <span className="text-xl font-bold tracking-[-0.05em]">
                musa<span className="text-[#d42367]">✦</span>
              </span>

              <p className="mt-12 text-xs font-bold uppercase tracking-[0.2em] text-[#f8a6c2]">
                Musa Criação Digital
              </p>

              <h2 className="mt-4 max-w-sm text-5xl font-bold leading-[0.9] tracking-[-0.06em]">
                Sua ideia.
                <span className="block text-[#d42367]">
                  Seu universo.
                </span>
              </h2>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-[#c9c2b9]">
                Recursos digitais para criar mais.
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                Prompts • Packs
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mb-8 lg:hidden">
              <span className="text-xl font-bold tracking-[-0.05em] text-[#151515]">
                musa<span className="text-[#d42367]">✦</span>
              </span>
            </div>

            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
                Bem-vindo de volta
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
                Entrar.
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#6f6a63]">
                Acesse sua conta para acompanhar seus pedidos e seus produtos
                digitais.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="rounded-2xl bg-[#f4efe6] px-4 py-3 text-sm text-[#6f6a63]">
                  Carregando...
                </div>
              }
            >
              <LoginForm />
            </Suspense>

            <div className="mt-7 border-t border-[#d8d0c4] pt-6 text-center text-sm">
              <p className="text-[#6f6a63]">
                Ainda não tem uma conta?{" "}
                <a
                  href="/cadastro"
                  className="font-semibold text-[#151515] transition-colors hover:text-[#d42367]"
                >
                  Criar conta
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}