import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { createClient } from "@/lib/supabase-server";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

type RequestBody = {
  items: CheckoutItem[];
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

  const items = (body as RequestBody).items;

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

  const { data: orderId, error: orderError } = await supabase.rpc(
    "create_order",
    {
      p_items: validItems,
    },
  );

  if (orderError || !orderId) {
    console.error("Erro ao criar pedido:", orderError);

    return NextResponse.json(
      { error: "Não foi possível criar o pedido." },
      { status: 500 },
    );
  }

  const { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .select("product_id, quantity, unit_price")
    .eq("order_id", orderId);

  if (orderItemsError || !orderItems || orderItems.length === 0) {
    console.error(
      "Erro ao carregar itens do pedido:",
      orderItemsError,
    );

    return NextResponse.json(
      { error: "Não foi possível preparar o pagamento." },
      { status: 500 },
    );
  }

  const productIds = orderItems.map((item) => item.product_id);

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, title, description")
    .in("id", productIds);

  if (productsError || !products) {
    console.error(
      "Erro ao carregar produtos:",
      productsError,
    );

    return NextResponse.json(
      { error: "Não foi possível preparar o pagamento." },
      { status: 500 },
    );
  }

  const productMap = new Map(
    products.map((product) => [product.id, product]),
  );

  const preferenceItems = orderItems.map((item) => {
    const product = productMap.get(item.product_id);

    if (!product) {
      throw new Error("Produto do pedido não encontrado.");
    }

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      quantity: item.quantity,
      currency_id: "BRL",
      unit_price: Number(item.unit_price),
    };
  });

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    console.error("MERCADOPAGO_ACCESS_TOKEN não configurado.");

    return NextResponse.json(
      { error: "Mercado Pago não configurado." },
      { status: 500 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_SITE_URL não configurado.");

    return NextResponse.json(
      { error: "URL do site não configurada." },
      { status: 500 },
    );
  }

  console.log("URL do site:", baseUrl);

  const client = new MercadoPagoConfig({
    accessToken,
  });

  const preference = new Preference(client);

  try {
    console.log("Back URLs:", {
      success: `${baseUrl}/checkout/sucesso`,
      failure: `${baseUrl}/checkout/falha`,
      pending: `${baseUrl}/checkout/pendente`,
    });

    const response = await preference.create({
      body: {
        items: preferenceItems,
        external_reference: orderId,
        payer: {
          email: user.email,
        },
        back_urls: {
          success: `${baseUrl}/checkout/sucesso`,
          failure: `${baseUrl}/checkout/falha`,
          pending: `${baseUrl}/checkout/pendente`,
        },
      },
    });

    if (!response.id || !response.init_point) {
      console.error(
        "Mercado Pago não retornou uma preferência válida.",
        response,
      );

      return NextResponse.json(
        { error: "Não foi possível criar o pagamento." },
        { status: 502 },
      );
    }

    const { data: preferenceSaved, error: preferenceError } =
      await supabase.rpc("set_order_payment_preference", {
        p_order_id: orderId,
        p_preference_id: response.id,
      });

    if (preferenceError || !preferenceSaved) {
      console.error(
        "Erro ao salvar preferência:",
        preferenceError,
      );

      return NextResponse.json(
        {
          error:
            "Não foi possível finalizar a preparação do pagamento.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      orderId,
      preferenceId: response.id,
      initPoint: response.init_point,
    });
  } catch (error) {
    console.error(
      "Erro ao criar preferência Mercado Pago:",
      error,
    );

    return NextResponse.json(
      { error: "Não foi possível criar o pagamento." },
      { status: 502 },
    );
  }
}