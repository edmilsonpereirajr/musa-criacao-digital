import { createClient } from "@/lib/supabase-server";

export async function getActiveProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, slug, title, description, price, image_url")
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
    .select("id, slug, title, description, price, image_url")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error("Não foi possível carregar o produto.");
  }

  return data;
}