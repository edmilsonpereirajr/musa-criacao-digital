import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "pack-prompts-fotos",
    slug: "pack-prompts-fotos",
    title: "Prompts para Fotos",
    description: "Ideias prontas para criar fotos incríveis com IA.",
    price: 29.9,
    content_type: "prompt",
  },
  {
    id: "pack-criativo",
    slug: "pack-criativo",
    title: "Pack Criativo",
    description:
      "Materiais digitais para deixar suas criações mais profissionais.",
    price: 19.9,
    content_type: "pack",
  },
  {
    id: "ebook-criatividade",
    slug: "ebook-criatividade",
    title: "E-book Digital",
    description:
      "Conteúdo prático para aprender e colocar suas ideias em ação.",
    price: 24.9,
    content_type: "ebook",
  },
];

export const productMap = products.reduce(
  (acc, product) => ({ ...acc, [product.slug]: product }),
  {} as Record<string, Product>,
);