"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError("Não foi possível criar a conta.");
      setLoading(false);
      return;
    }

    setMessage(
      "Conta criada. Verifique seu e-mail para confirmar o cadastro.",
    );
    setLoading(false);
  }

  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center border-b border-[#d8d0c4] px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#f8dce7] blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#d8d0c4] bg-[#fffdf9] shadow-[0_30px_80px_rgba(21,21,21,0.10)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden overflow-hidden bg-[#151515] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full border-[55px] border-[#d42367]/30" />

            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full border-[65px] border-white/5" />

            <div className="relative">
              <span className="text-xl font-bold tracking-[-0.05em]">
                musa<span className="text-[#d42367]">✦</span>
              </span>

              <p className="mt-12 text-xs font-bold uppercase tracking-[0.2em] text-[#f8a6c2]">
                Comece agora
              </p>

              <h2 className="mt-4 max-w-sm text-5xl font-bold leading-[0.9] tracking-[-0.06em]">
                Crie.
                <span className="block text-[#d42367]">Explore.</span>
                <span className="block">Inspire.</span>
              </h2>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-[#c9c2b9]">
                Sua conta dá acesso aos seus produtos digitais.
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
                Crie sua conta
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
                Começar.
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#6f6a63]">
                Crie sua conta para acompanhar seus pedidos e acessar seus
                produtos digitais.
              </p>
            </div>

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
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#151515]"
                >
                  Senha
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Crie uma senha"
                  className="w-full rounded-2xl border border-[#d8d0c4] bg-[#fffdf9] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all placeholder:text-[#9a9389] focus:border-[#d42367] focus:ring-4 focus:ring-[#f8dce7]"
                />

                <p className="mt-2 text-xs text-[#9a9389]">
                  Mínimo de 6 caracteres.
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-semibold text-[#151515]"
                >
                  Confirmar senha
                </label>

                <input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Digite a senha novamente"
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

              {message ? (
                <p
                  role="status"
                  className="rounded-2xl bg-[#e8f5e9] px-4 py-3 text-sm leading-5 text-[#16803c]"
                >
                  {message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#d42367] px-6 py-4 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(212,35,103,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Criando conta..." : "Criar conta ↗"}
              </button>
            </form>

            <div className="mt-7 border-t border-[#d8d0c4] pt-6 text-center text-sm">
              <p className="text-[#6f6a63]">
                Já tem uma conta?{" "}
                <a
                  href="/login"
                  className="font-semibold text-[#151515] transition-colors hover:text-[#d42367]"
                >
                  Entrar
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}