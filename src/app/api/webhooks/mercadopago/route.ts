import { NextResponse } from "next/server";
import crypto from "node:crypto";

import { supabaseAdmin } from "@/lib/supabase-admin";

type MercadoPagoPayment = {
  id: number | string;
  status: string;
  status_detail?: string;
  external_reference?: string | null;
  transaction_amount?: number;
  currency_id?: string;
};

function parseSignature(xSignature: string) {
  let timestamp = "";
  let v1 = "";

  for (const part of xSignature.split(",")) {
    const [key, value] = part.trim().split("=", 2);

    if (key === "ts") {
      timestamp = value ?? "";
    }

    if (key === "v1") {
      v1 = value ?? "";
    }
  }

  return { timestamp, v1 };
}

function verifyWebhookSignature(
  requestId: string | null,
  dataId: string | null,
  xSignature: string | null,
  secret: string,
) {
  if (!requestId || !dataId || !xSignature) {
    return false;
  }

  const { timestamp, v1 } = parseSignature(xSignature);

  if (!timestamp || !v1) {
    return false;
  }

  if (!/^[0-9]+$/.test(timestamp)) {
    return false;
  }

  if (!/^[a-f0-9]{64}$/i.test(v1)) {
    return false;
  }

  const timestampMs = Number(timestamp) * 1000;

  if (!Number.isFinite(timestampMs)) {
    return false;
  }

  if (Math.abs(Date.now() - timestampMs) > 5 * 60 * 1000) {
    return false;
  }

  const manifest =
    `id:${dataId.toLowerCase()};` +
    `request-id:${requestId};` +
    `ts:${timestamp};`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  const receivedBuffer = Buffer.from(v1, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    receivedBuffer,
    expectedBuffer,
  );
}

function toCents(value: number) {
  return Math.round(value * 100);
}

function getOrderStatus(paymentStatus: string) {
  switch (paymentStatus) {
    case "approved":
      return "paid";

    case "refunded":
    case "charged_back":
      return "refunded";

    case "rejected":
    case "cancelled":
      return "cancelled";

    case "pending":
    case "in_process":
    case "in_mediation":
      return "pending";

    default:
      return null;
  }
}

export async function POST(request: Request) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!secret || !accessToken) {
    console.error(
      "Credenciais do Mercado Pago não configuradas.",
    );

    return NextResponse.json(
      { error: "Webhook não configurado." },
      { status: 500 },
    );
  }

  const url = new URL(request.url);

  const dataId = url.searchParams.get("data.id");
  const type = url.searchParams.get("type");

  if (type && type !== "payment") {
    return NextResponse.json({ received: true });
  }

  const requestId = request.headers.get("x-request-id");
  const xSignature = request.headers.get("x-signature");

  const validSignature = verifyWebhookSignature(
    requestId,
    dataId,
    xSignature,
    secret,
  );

  if (!validSignature) {
    console.warn(
      "Webhook Mercado Pago rejeitado: assinatura inválida.",
    );

    return NextResponse.json(
      { error: "Assinatura inválida." },
      { status: 401 },
    );
  }

  if (!dataId) {
    return NextResponse.json(
      { error: "ID do pagamento ausente." },
      { status: 400 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "JSON inválido." },
      { status: 400 },
    );
  }

  console.log("Webhook Mercado Pago recebido:", {
    action:
      body &&
      typeof body === "object" &&
      "action" in body
        ? body.action
        : undefined,
    dataId,
  });

  const paymentResponse = await fetch(
    `https://api.mercadopago.com/v1/payments/${encodeURIComponent(dataId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!paymentResponse.ok) {
    console.error(
      "Erro ao consultar pagamento no Mercado Pago:",
      paymentResponse.status,
    );

    return NextResponse.json(
      { error: "Pagamento não encontrado." },
      { status: 502 },
    );
  }

  const payment =
    (await paymentResponse.json()) as MercadoPagoPayment;

  if (!payment.id || !payment.external_reference) {
    console.error(
      "Pagamento sem ID ou external_reference:",
      payment,
    );

    return NextResponse.json(
      { error: "Pagamento inválido." },
      { status: 400 },
    );
  }

  const orderId = payment.external_reference;
  const paymentId = String(payment.id);

  const { data: order, error: orderError } =
    await supabaseAdmin
      .from("orders")
      .select("id, status, total, payment_id")
      .eq("id", orderId)
      .maybeSingle();

  if (orderError) {
    console.error(
      "Erro ao consultar pedido:",
      orderError,
    );

    return NextResponse.json(
      { error: "Erro ao consultar pedido." },
      { status: 500 },
    );
  }

  if (!order) {
    console.error(
      "Pedido não encontrado:",
      orderId,
    );

    return NextResponse.json(
      { error: "Pedido não encontrado." },
      { status: 404 },
    );
  }

  if (
    order.payment_id &&
    order.payment_id !== paymentId
  ) {
    console.error(
      "Pedido já possui outro payment_id.",
    );

    return NextResponse.json(
      { error: "Pagamento incompatível com o pedido." },
      { status: 409 },
    );
  }

  if (
    payment.currency_id !== "BRL" ||
    typeof payment.transaction_amount !== "number"
  ) {
    console.error(
      "Valor ou moeda do pagamento inválidos.",
    );

    return NextResponse.json(
      { error: "Pagamento inválido." },
      { status: 400 },
    );
  }

  if (
    toCents(payment.transaction_amount) !==
    toCents(Number(order.total))
  ) {
    console.error(
      "Valor do pagamento não confere.",
      {
        orderId: order.id,
        orderTotal: order.total,
        paymentAmount: payment.transaction_amount,
      },
    );

    return NextResponse.json(
      { error: "Valor do pagamento não confere." },
      { status: 409 },
    );
  }

  const newStatus = getOrderStatus(payment.status);

  if (!newStatus) {
    console.warn(
      "Status de pagamento não reconhecido:",
      payment.status,
    );

    return NextResponse.json(
      { error: "Status de pagamento não reconhecido." },
      { status: 400 },
    );
  }

  let updateQuery = supabaseAdmin
    .from("orders")
    .update({
      status: newStatus,
      payment_id: paymentId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", order.id);

  if (order.payment_id) {
    updateQuery = updateQuery.eq(
      "payment_id",
      order.payment_id,
    );
  } else {
    updateQuery = updateQuery.is("payment_id", null);
  }

  const { data: updatedOrder, error: updateError } =
    await updateQuery
      .select("id, status, payment_id")
      .maybeSingle();

  if (updateError) {
    console.error(
      "Erro ao atualizar pedido:",
      updateError,
    );

    return NextResponse.json(
      { error: "Não foi possível atualizar o pedido." },
      { status: 500 },
    );
  }

  if (!updatedOrder) {
    const { data: currentOrder } =
      await supabaseAdmin
        .from("orders")
        .select("id, status, payment_id")
        .eq("id", order.id)
        .maybeSingle();

    if (
      currentOrder?.payment_id === paymentId
    ) {
      return NextResponse.json({
        received: true,
        alreadyProcessed: true,
      });
    }

    return NextResponse.json(
      { error: "Pedido não pôde ser atualizado." },
      { status: 409 },
    );
  }

  console.log("Pedido atualizado:", {
    orderId: order.id,
    paymentId,
    paymentStatus: payment.status,
    orderStatus: newStatus,
  });

  return NextResponse.json({
    received: true,
  });
}