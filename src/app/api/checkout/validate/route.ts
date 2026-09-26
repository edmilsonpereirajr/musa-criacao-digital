import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Não autenticado." },
      { status: 401 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Dados inválidos." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || !("items" in body)) {
    return NextResponse.json(
      { error: "Carrinho inválido." },
      { status: 400 },
    );
  }

  const items = (body as { items: unknown }).items;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Carrinho vazio." },
      { status: 400 },
    );
  }

  const validItems: CheckoutItem[] = [];

  for (const item of items) {
    if (!item || typeof item !== "object") {
      return NextResponse.json(
        { error: "Item inválido." },
        { status: 400 },
      );
    }

    const productId =
      "productId" in item && typeof item.productId === "string"
        ? item.productId
        : null;

    const quantity =
      "quantity" in item && typeof item.quantity === "number"
        ? item.quantity
        : null;

    if (
      !productId ||
      quantity === null ||
      !Number.isInteger(quantity) ||
      quantity <= 0 ||
      quantity > 99
    ) {
      return NextResponse.json(
        { error: "Quantidade ou produto inválido." },
        { status: 400 },
      );
    }

    validItems.push({
      productId,
      quantity,
    });
  }

  const productIds = [...new Set(validItems.map((item) => item.productId))];

  const { data: products, error } = await supabase
    .from("products")
    .select("id, slug, title, price, is_active")
    .in("id", productIds)
    .eq("is_active", true);

  if (error) {
    return NextResponse.json(
      { error: "Não foi possível validar os produtos." },
      { status: 500 },
    );
  }

  if (!products || products.length !== productIds.length) {
    return NextResponse.json(
      { error: "Um ou mais produtos não estão disponíveis." },
      { status: 400 },
    );
  }

  const validatedItems = validItems.map((item) => {
    const product = products.find(
      (currentProduct) => currentProduct.id === item.productId,
    );

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    const unitPrice = Number(product.price);
    const subtotal = unitPrice * item.quantity;

    return {
      productId: product.id,
      slug: product.slug,
      title: product.title,
      quantity: item.quantity,
      unitPrice,
      subtotal,
    };
  });

  const total = validatedItems.reduce(
    (sum, item) => sum + item.subtotal,
    0,
  );

  return NextResponse.json({
    items: validatedItems,
    total,
  });
}