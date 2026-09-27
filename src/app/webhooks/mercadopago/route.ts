import { NextResponse } from "next/server";
import crypto from "node:crypto";

function verifyWebhookSignature(
  requestId: string | null,
  dataId: string | null,
  xSignature: string | null,
  secret: string,
) {
  if (!requestId || !dataId || !xSignature) {
    return false;
  }

  const parts = xSignature.split(",");

  let ts = "";
  let v1 = "";

  for (const part of parts) {
    const [key, value] = part.split("=", 2);

    if (key === "ts") {
      ts = value;
    }

    if (key === "v1") {
      v1 = value;
    }
  }

  if (!ts || !v1) {
    return false;
  }

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  const receivedBuffer = Buffer.from(v1, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

  if (!secret) {
    console.error("MERCADOPAGO_WEBHOOK_SECRET não configurado.");

    return NextResponse.json(
      { error: "Webhook não configurado." },
      { status: 500 },
    );
  }

  const url = new URL(request.url);

  const dataId = url.searchParams.get("data.id");

  const requestId = request.headers.get("x-request-id");
  const xSignature = request.headers.get("x-signature");

  const validSignature = verifyWebhookSignature(
    requestId,
    dataId,
    xSignature,
    secret,
  );

  if (!validSignature) {
    console.warn("Webhook Mercado Pago rejeitado: assinatura inválida.");

    return NextResponse.json(
      { error: "Assinatura inválida." },
      { status: 401 },
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
    type:
      body &&
      typeof body === "object" &&
      "type" in body
        ? body.type
        : undefined,
    dataId,
  });

  return NextResponse.json({ received: true });
}