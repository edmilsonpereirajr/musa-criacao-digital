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
    <section>
      <div className="mb-8">
        <Link
          href="/admin/produtos"
          className="text-sm font-medium text-[#d42367] transition-colors hover:text-[#b91d58]"
        >
          ← Voltar para produtos
        </Link>

        <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-[#d42367]">
          Administração
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#151515]">
          Novo produto
        </h1>

        <p className="mt-3 text-[#6f6a63]">
          Cadastre um novo produto digital para a loja.
        </p>
      </div>

      <div className="rounded-2xl border border-[#d8d0c4] bg-white p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-[#151515]"
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
              className="w-full rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] px-4 py-3 text-[#151515] outline-none transition focus:border-[#d42367]"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-medium text-[#151515]"
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
              className="w-full rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] px-4 py-3 text-[#151515] outline-none transition focus:border-[#d42367]"
            />

            <p className="mt-2 text-xs text-[#6f6a63]">
              Use apenas letras minúsculas, números e hífens.
            </p>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-[#151515]"
            >
              Descrição
            </label>

            <textarea
              id="description"
              name="description"
              required
              maxLength={5000}
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descreva o que o cliente receberá."
              className="w-full resize-y rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] px-4 py-3 text-[#151515] outline-none transition focus:border-[#d42367]"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-[#151515]"
              >
                Preço
              </label>

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
                placeholder="29.90"
                className="w-full rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] px-4 py-3 text-[#151515] outline-none transition focus:border-[#d42367]"
              />
            </div>

            <div>
              <label
                htmlFor="content_type"
                className="mb-2 block text-sm font-medium text-[#151515]"
              >
                Tipo
              </label>

              <select
                id="content_type"
                name="content_type"
                value={contentType}
                onChange={(event) => setContentType(event.target.value)}
                className="w-full rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] px-4 py-3 text-[#151515] outline-none transition focus:border-[#d42367]"
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
              className="mb-2 block text-sm font-medium text-[#151515]"
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
              className="w-full rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] px-4 py-3 text-[#151515] outline-none transition focus:border-[#d42367]"
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

          <div className="flex flex-col gap-3 border-t border-[#d8d0c4] pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/admin/produtos"
              className="rounded-full border border-[#d8d0c4] px-6 py-3 text-center text-sm font-medium text-[#151515] transition-colors hover:border-[#d42367] hover:text-[#d42367]"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#d42367] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Cadastrando..." : "Cadastrar produto"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}