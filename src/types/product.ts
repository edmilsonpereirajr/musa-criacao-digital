export type ProductContentType =
  | "prompt"
  | "pack"
  | "ebook"
  | "template"
  | "preset"
  | "digital";

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  image_url?: string | null;
  content_type: ProductContentType;
  file_path?: string | null;
};