"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase";

const contentTypes = [
  "digital",
  "prompt",
  "pack",
  "ebook",
  "template",
  "preset",
] as const;

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type ProductForm = {
  title: string;
  slug: string;
  description: string;
  price: string;
  contentType: string;
  imageUrl: string;
  filePath: string;
  isActive: boolean;
};

export default function EditProductPage({
  params,
}: EditProductPageProps) {
  const router = useRouter();

  const [productId, setProductId] = useState("");
  const [form, setForm] = useState<ProductForm>({
    title: "",
    slug: "",
    description: "",
    price: "",
    contentType: "digital",
    imageUrl: "",
    filePath: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      const { id } = await params;

      if (cancelled) {
        return;
      }

      setProductId(id);

      const supabase = createClient();

      const { data, error: productError } = await supabase
        .from("products")
        .select(
          "id, slug, title, description, price, image_url, content_type, file_path, is_active",
        )
        .eq("id", id)
        .maybeSingle();

      if (cancelled) {
        return;
      }

      if (productError || !data) {
        setError("Não foi possível carregar o produto.");
        setLoading(false);
        return;
      }

      setForm({
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: String(data.price),
        contentType: data.content_type,
        imageUrl: data.image_url ?? "",
        filePath: data.file_path ?? "",
        isActive: data.is_active,
      });

      setLoading(false);
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [params]);

  function updateField<K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const cleanTitle = form.title.trim();
    const cleanSlug = form.slug.trim().toLowerCase();
    const cleanDescription = form.description.trim();
    const cleanImageUrl = form.imageUrl.trim();
    const cleanFilePath = form.filePath.trim();

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

    const numericPrice = Number(form.price);

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
        form.contentType as (typeof contentTypes)[number],
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

    if (cleanFilePath.length > 500) {
      setError("O caminho do arquivo é inválido.");
      return;
    }

    setSaving(true);

    const supabase = createClient();

    const { error: updateError } = await supabase
      .from("products")
      .update({
        title: cleanTitle,
        slug: cleanSlug,
        description: cleanDescription,
        price: numericPrice,
        content_type: form.contentType,
        image_url: cleanImageUrl || null,
        file_path: cleanFilePath || null,
        is_active: form.isActive,
      })
      .eq("id", productId);

    if (updateError) {
      if (updateError.code === "23505") {
        setError("Já existe um produto com esse slug.");
      } else {
        setError("Não foi possível atualizar o produto.");
      }

      setSaving(false);
      return;
    }

    router.push("/admin/produtos");
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-[#f4efe6]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#d8d0c4] bg-[#fffdf9] p-8 shadow-[0_15px_40px_rgba(21,21,21,0.05)]">
            <div className="h-3 w-24 animate-pulse rounded-full bg-[#e8e1d5]" />
            <div className="mt-5 h-9 w-56 animate-pulse rounded-xl bg-[#e8e1d5]" />
            <div className="mt-4 h-4 w-72 max-w-full animate-pulse rounded-full bg-[#e8e1d5]" />
          </div>
        </div>
      </main>
    );
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
              Editar produto.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#6f6a63]">
              Atualize as informações, o arquivo e a disponibilidade deste
              produto.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {error && !form.title ? (
            <div className="rounded-[2rem] border border-[#f0caca] bg-[#fffdf9] p-8 shadow-[0_15px_40px_rgba(21,21,21,0.05)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbe9e9] text-[#c62828]">
                !
              </div>

              <p
                role="alert"
                className="mt-5 text-sm leading-6 text-[#c62828]"
              >
                {error}
              </p>

              <Link
                href="/admin/produtos"
                className="mt-6 inline-flex rounded-full bg-[#d42367] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#b91d58]"
              >
                Voltar para produtos
              </Link>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-[#d8d0c4] bg-[#fffdf9] p-6 shadow-[0_20px_50px_rgba(21,21,21,0.06)] sm:p-8 lg:p-10">
              <div className="mb-8 border-b border-[#d8d0c4] pb-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a9389]">
                      Informações do produto
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#151515]">
                      Detalhes
                    </h2>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                      form.isActive
                        ? "bg-[#e8f5e9] text-[#16803c]"
                        : "bg-[#f1eee9] text-[#6f6a63]"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        form.isActive ? "bg-[#16803c]" : "bg-[#9a9389]"
                      }`}
                    />
                    {form.isActive ? "Produto ativo" : "Produto inativo"}
                  </span>
                </div>
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
                    type="text"
                    required
                    maxLength={120}
                    value={form.title}
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
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
                    type="text"
                    required
                    maxLength={120}
                    value={form.slug}
                    onChange={(event) =>
                      updateField("slug", event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
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
                    required
                    maxLength={5000}
                    rows={6}
                    value={form.description}
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    className="w-full resize-y rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-3.5 text-sm leading-6 text-[#151515] outline-none transition-all focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
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
                        type="number"
                        min="0"
                        max="99999999.99"
                        step="0.01"
                        required
                        value={form.price}
                        onChange={(event) =>
                          updateField("price", event.target.value)
                        }
                        className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] py-3.5 pl-11 pr-4 text-sm text-[#151515] outline-none transition-all focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
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
                      value={form.contentType}
                      onChange={(event) =>
                        updateField("contentType", event.target.value)
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
                    type="url"
                    value={form.imageUrl}
                    onChange={(event) =>
                      updateField("imageUrl", event.target.value)
                    }
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all placeholder:text-[#9a9389] focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
                  />

                  <p className="mt-2 text-xs leading-5 text-[#9a9389]">
                    Use uma URL pública com protocolo HTTP ou HTTPS.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="file_path"
                    className="mb-2 block text-sm font-semibold text-[#151515]"
                  >
                    Caminho do arquivo
                  </label>

                  <input
                    id="file_path"
                    type="text"
                    maxLength={500}
                    value={form.filePath}
                    onChange={(event) =>
                      updateField("filePath", event.target.value)
                    }
                    placeholder="ex.: produtos/pack-criativo.zip"
                    className="w-full rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] px-4 py-3.5 text-sm text-[#151515] outline-none transition-all placeholder:text-[#9a9389] focus:border-[#d42367] focus:bg-[#fffdf9] focus:ring-4 focus:ring-[#f8dce7]"
                  />

                  <p className="mt-2 text-xs leading-5 text-[#9a9389]">
                    Caminho do arquivo dentro do Storage privado de produtos.
                  </p>
                </div>

                <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-[#d8d0c4] bg-[#f4efe6] p-5 transition-colors hover:border-[#cfc4b6]">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(event) =>
                      updateField("isActive", event.target.checked)
                    }
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[#d42367]"
                  />

                  <span>
                    <span className="block text-sm font-semibold text-[#151515]">
                      Produto ativo
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-[#6f6a63]">
                      Produtos inativos não aparecem na loja.
                    </span>
                  </span>
                </label>

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
                    disabled={saving}
                    className="rounded-full bg-[#d42367] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(212,35,103,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Salvando..." : "Salvar alterações ↗"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}