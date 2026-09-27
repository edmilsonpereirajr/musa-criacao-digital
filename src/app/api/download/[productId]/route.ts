import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: "Você precisa estar logado." },
      { status: 401 },
    );
  }

  const { productId } = await params;

  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("id, file_path")
    .eq("id", productId)
    .eq("is_active", true)
    .maybeSingle();

  if (productError) {
    console.error("Erro ao consultar produto:", productError);

    return NextResponse.json(
      { error: "Não foi possível localizar o produto." },
      { status: 500 },
    );
  }

  if (!product || !product.file_path) {
    return NextResponse.json(
      { error: "Arquivo do produto não encontrado." },
      { status: 404 },
    );
  }

  const { data: orderItem, error: orderItemError } = await supabaseAdmin
    .from("order_items")
    .select(
      `
        id,
        orders!inner (
          id,
          user_id,
          status
        )
      `,
    )
    .eq("product_id", product.id)
    .eq("orders.user_id", user.id)
    .eq("orders.status", "paid")
    .limit(1)
    .maybeSingle();

  if (orderItemError) {
    console.error(
      "Erro ao consultar compra do usuário:",
      orderItemError,
    );

    return NextResponse.json(
      { error: "Não foi possível validar sua compra." },
      { status: 500 },
    );
  }

  if (!orderItem) {
    return NextResponse.json(
      { error: "Você não possui este produto." },
      { status: 403 },
    );
  }

  const { data: signedUrlData, error: signedUrlError } =
    await supabaseAdmin.storage
      .from("products")
      .createSignedUrl(product.file_path, 60);

  if (signedUrlError || !signedUrlData?.signedUrl) {
    console.error(
      "Erro ao gerar link temporário:",
      signedUrlError,
    );

    return NextResponse.json(
      { error: "Não foi possível gerar o download." },
      { status: 500 },
    );
  }

  return NextResponse.redirect(signedUrlData.signedUrl);
}