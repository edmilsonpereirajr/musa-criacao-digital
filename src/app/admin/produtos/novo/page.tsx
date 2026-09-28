"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { createClient } from "@/lib/supabase";

const contentTypes = [
  "digital",
  "prompt",
  "pack",
  "ebook",
  "template",
  "preset",
] as const;

export default function NewProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contentType, setContentType] = useState("digital");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const cleanTitle = title.trim();
    const cleanSlug = slug.trim().toLowerCase();
    const cleanDescription = description.trim();
    const cleanImageUrl = imageUrl.trim();

    if (!cleanTitle || cleanTitle.length > 120) {
      setError("Informe um nome de produto válido.");
      return;
    }

    if (
      !cleanSlug ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanSlug) ||
      cleanSlug.length > 120
    ) {
      setError(
        "O slug deve conter apenas letras minúsculas, números e hífens.",
      );
      return;
    }

    if (!cleanDescription || cleanDescription.length > 5000) {
      setError("Informe uma descrição válida.");
      return;
    }

    const numericPrice = Number(price);

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice < 0 ||
      numericPrice > 99999999.99
    ) {
      setError("Informe um preço válido.");
      return;
    }

    if (
      !contentTypes.includes(
        contentType as (typeof contentTypes)[number],
      )
    ) {
      setError("Tipo de produto inválido.");
      return;
    }

    if (cleanImageUrl) {
      try {
        const parsedUrl = new URL(cleanImageUrl);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          setError("A URL da imagem é inválida.");
          return;
        }
      } catch {
        setError("A URL da imagem é inválida.");
        return;
      }
    }

    setLoading(true);

    const supabase = createClient();

    const { error: insertError } = await supabase.from("products").insert({
      title: cleanTitle,
      slug: cleanSlug,
      description: cleanDescription,
      price: numericPrice,
      content_type: contentType,
      image_url: cleanImageUrl || null,
      is_active: true,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        setError("Já existe um produto com esse slug.");
      } else {
        setError("Não foi possível cadastrar o produto.");
      }

      setLoading(false);
      return;
    }

    router.push("/admin/produtos");
  }

  return (
    <main className="overflow-hidden bg-[#f4efe6]">
      <section className="border-b border-[#d8d0c4] bg-[#fffdf9]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <Link
            href="/admin/produtos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f6a63] transition-colors hover:text-[#d42367]"
          >
            ← Voltar para produtos
          </Link>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d42367] sm:text-sm">
              Administração
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#151515] sm:text-5xl">
              Novo produto.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#6f6a63]">
              Cadastre um novo produto digital para disponibilizar na loja.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-[#d8d0c4] bg-[#fffdf9] p-6 shadow-[0_20px_50px_rgba(21,21,21,0.06)] sm:p-8 lg:p-10">
            <div className="mb-8 border-b border-[#d8d0c4] pb-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a9389]">
                Informações do produto
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                Detalhes
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-[#151515]"
                >
                  Nome do produto
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  maxLength={120}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Ex.: Pack de Prompts para Fotos"
                  className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all placeholder:text-[#9a9389] focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
                />
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className="mb-2 block text-sm font-semibold text-[#151515]"
                >
                  Slug
                </label>

                <input
                  id="slug"
                  name="slug"
                  type="text"
                  required
                  maxLength={120}
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  placeholder="pack-prompts-fotos"
                  className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all placeholder:text-[#9a9389] focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
                />

                <p className="mt-2 text-xs leading-5 text-[#9a9389]">
                  Use apenas letras minúsculas, números e hífens.
                </p>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-[#151515]"
                >
                  Descrição
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  maxLength={5000}
                  rows={6}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Descreva o que o cliente receberá."
                  className="w-full resize-y rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-3.5 text-sm leading-6 text-[#151515] outline-none transition-all placeholder:text-[#9a9389] focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-semibold text-[#151515]"
                  >
                    Preço
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#9a9389]">
                      R$
                    </span>

                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      max="99999999.99"
                      step="0.01"
                      required
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      placeholder="29,90"
                      className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] py-3.5 pl-11 pr-4 text-sm text-[#151515] outline-none transition-all placeholder:text-[#9a9389] focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="content_type"
                    className="mb-2 block text-sm font-semibold text-[#151515]"
                  >
                    Tipo de produto
                  </label>

                  <select
                    id="content_type"
                    name="content_type"
                    value={contentType}
                    onChange={(event) =>
                      setContentType(event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
                  >
                    <option value="digital">Digital</option>
                    <option value="prompt">Prompt</option>
                    <option value="pack">Pack</option>
                    <option value="ebook">E-book</option>
                    <option value="template">Template</option>
                    <option value="preset">Preset</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="image_url"
                  className="mb-2 block text-sm font-semibold text-[#151515]"
                >
                  URL da imagem
                </label>

                <input
                  id="image_url"
                  name="image_url"
                  type="url"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all placeholder:text-[#9a9389] focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
                />

                <p className="mt-2 text-xs leading-5 text-[#9a9389]">
                  Use uma URL pública com protocolo HTTP ou HTTPS.
                </p>
              </div>

              {error ? (
                <p
                  role="alert"
                  className="rounded-2xl bg-[#fbe9e9] px-4 py-3 text-sm leading-5 text-[#c62828]"
                >
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-[#d8d0c4] pt-7 sm:flex-row sm:justify-end">
                <Link
                  href="/admin/produtos"
                  className="rounded-full border border-[#d8d0c4] px-6 py-3.5 text-center text-sm font-semibold text-[#151515] transition-all hover:border-[#d42367] hover:bg-[#f8dce7] hover:text-[#d42367]"
                >
                  Cancelar
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-[#d42367] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(212,35,103,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Cadastrando..." : "Cadastrar produto ↗"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}