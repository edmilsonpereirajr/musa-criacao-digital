import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { createClient } from "@/lib/supabase-server";

type RequestBody = {
  productId: string;
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

  if (!body || typeof body !== "object" || !("productId" in body)) {
    return NextResponse.json(
      { error: "Produto inválido." },
      { status: 400 },
    );
  }

  const productId = (body as RequestBody).productId;

  if (!productId || typeof productId !== "string") {
    return NextResponse.json(
      { error: "Produto inválido." },
      { status: 400 },
    );
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, title, description, price")
    .eq("id", productId)
    .eq("is_active", true)
    .maybeSingle();

  if (productError || !product) {
    return NextResponse.json(
      { error: "Produto indisponível." },
      { status: 404 },
    );
  }

  const { data: orderId, error: orderError } = await supabase.rpc(
    "create_order",
    {
      p_items: [
        {
          productId: product.id,
          quantity: 1,
        },
      ],
    },
  );

  if (orderError || !orderId) {
    console.error("Erro ao criar pedido:", orderError);

    return NextResponse.json(
      { error: "Não foi possível criar o pedido." },
      { status: 500 },
    );
  }

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

  const client = new MercadoPagoConfig({
    accessToken,
  });

  const preference = new Preference(client);

  try {
    const response = await preference.create({
      body: {
        items: [
          {
            id: product.id,
            title: product.title,
            description: product.description,
            quantity: 1,
            currency_id: "BRL",
            unit_price: Number(product.price),
          },
        ],
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