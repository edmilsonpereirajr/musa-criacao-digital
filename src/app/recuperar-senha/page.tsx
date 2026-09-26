"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/redefinir-senha`,
    });

    if (error) {
      setError("Não foi possível processar a solicitação.");
      setLoading(false);
      return;
    }

    setMessage(
      "Se esse e-mail estiver cadastrado, você receberá um link para redefinir sua senha.",
    );
    setLoading(false);
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16">
      <div className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f0ebe1] p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#d42367]">
            Musa Criação Digital
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#151515]">
            Recuperar senha
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
            Informe seu e-mail para receber as instruções de recuperação.
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

          {error ? (
            <p
              role="alert"
              className="rounded-xl bg-[#fbe9e9] px-4 py-3 text-sm text-[#c62828]"
            >
              {error}
            </p>
          ) : null}

          {message ? (
            <p
              role="status"
              className="rounded-xl bg-[#e8f5e9] px-4 py-3 text-sm text-[#16803c]"
            >
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#d42367] px-6 py-3 font-medium text-white transition-colors hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar instruções"}
          </button>
        </form>
      </div>
    </section>
  );
}