import { createClient } from "@/lib/supabase-server";

export async function getActiveProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, title, description, price, image_url, content_type, file_path",
    )
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Não foi possível carregar os produtos.");
  }

  return data;
}

export async function getActiveProductBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, title, description, price, image_url, content_type, file_path",
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error("Não foi possível carregar o produto.");
  }

  return data;
}

export async function getAdminProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, title, description, price, image_url, content_type, file_path, is_active",
    )
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Não foi possível carregar os produtos.");
  }

  return data;
}