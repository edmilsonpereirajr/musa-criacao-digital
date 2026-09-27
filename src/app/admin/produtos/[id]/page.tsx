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
      <section>
        <div className="rounded-2xl border border-[#d8d0c4] bg-white p-8">
          <p className="text-[#6f6a63]">Carregando produto...</p>
        </div>
      </section>
    );
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
          Editar produto
        </h1>

        <p className="mt-3 text-[#6f6a63]">
          Edite as informações do produto selecionado.
        </p>
      </div>

      {error && !form.title ? (
        <div className="rounded-2xl border border-[#f0caca] bg-[#fbe9e9] p-6">
          <p role="alert" className="text-sm text-[#c62828]">
            {error}
          </p>

          <Link
            href="/admin/produtos"
            className="mt-4 inline-block text-sm font-medium text-[#d42367]"
          >
            Voltar para produtos
          </Link>
        </div>
      ) : (
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
                type="text"
                required
                maxLength={120}
                value={form.title}
                onChange={(event) =>
                  updateField("title", event.target.value)
                }
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
                type="text"
                required
                maxLength={120}
                value={form.slug}
                onChange={(event) =>
                  updateField("slug", event.target.value)
                }
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
                required
                maxLength={5000}
                rows={5}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
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
                  type="number"
                  min="0"
                  max="99999999.99"
                  step="0.01"
                  required
                  value={form.price}
                  onChange={(event) =>
                    updateField("price", event.target.value)
                  }
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
                  value={form.contentType}
                  onChange={(event) =>
                    updateField("contentType", event.target.value)
                  }
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
                type="url"
                value={form.imageUrl}
                onChange={(event) =>
                  updateField("imageUrl", event.target.value)
                }
                placeholder="https://..."
                className="w-full rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] px-4 py-3 text-[#151515] outline-none transition focus:border-[#d42367]"
              />
            </div>

            <div>
              <label
                htmlFor="file_path"
                className="mb-2 block text-sm font-medium text-[#151515]"
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
                className="w-full rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] px-4 py-3 text-[#151515] outline-none transition focus:border-[#d42367]"
              />

              <p className="mt-2 text-xs text-[#6f6a63]">
                Caminho do arquivo dentro do Storage privado de produtos.
              </p>
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-[#d8d0c4] bg-[#f0ebe1] p-4">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) =>
                  updateField("isActive", event.target.checked)
                }
                className="h-4 w-4 accent-[#d42367]"
              />

              <span>
                <span className="block text-sm font-medium text-[#151515]">
                  Produto ativo
                </span>

                <span className="mt-1 block text-xs text-[#6f6a63]">
                  Produtos inativos não aparecem na loja.
                </span>
              </span>
            </label>

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
                disabled={saving}
                className="rounded-full bg-[#d42367] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#b91d58] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}