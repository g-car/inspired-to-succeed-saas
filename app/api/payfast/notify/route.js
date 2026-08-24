import crypto from "crypto";
import { NextResponse } from "next/server";

function encode(value) {
  return encodeURIComponent(String(value).trim()).replace(/%20/g, "+");
}

function generateSignature(data, passphrase = "") {
  const pairs = [];

  for (const [key, value] of Object.entries(data)) {
    if (
      key !== "signature" &&
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      pairs.push(`${key}=${encode(value)}`);
    }
  }

  if (passphrase) {
    pairs.push(`passphrase=${encode(passphrase)}`);
  }

  return crypto.createHash("md5").update(pairs.join("&")).digest("hex");
}

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const params = new URLSearchParams(rawBody);

    const data = {};

    for (const [key, value] of params.entries()) {
      data[key] = value;
    }

    const receivedSignature = data.signature;

    if (!receivedSignature) {
      console.error("PayFast ITN rejected: no signature received.");
      return new NextResponse("Invalid notification", { status: 400 });
    }

    const passphrase = process.env.PAYFAST_PASSPHRASE || "";
    const calculatedSignature = generateSignature(data, passphrase);

    if (calculatedSignature !== receivedSignature) {
      console.error("PayFast ITN rejected: signature mismatch.");
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const merchantId = process.env.PAYFAST_MERCHANT_ID;

    if (!merchantId || data.merchant_id !== merchantId) {
      console.error("PayFast ITN rejected: merchant ID mismatch.");
      return new NextResponse("Invalid merchant", { status: 400 });
    }

    const paymentStatus = data.payment_status || "";
    const paymentId = data.m_payment_id || "";
    const payfastPaymentId = data.pf_payment_id || "";
    const amountGross = data.amount_gross || "";

    console.log("Verified PayFast notification received:", {
      paymentId,
      payfastPaymentId,
      paymentStatus,
      amountGross,
    });

    if (paymentStatus === "COMPLETE") {
      /*
       * IMPORTANT:
       * The notification has passed the local signature and merchant checks.
       *
       * In the next stage we will connect this verified notification
       * to the platform database so that the correct customer's
       * subscription/payment record can be updated.
       *
       * Do not grant platform access from a browser return URL.
       * Access must be activated from a verified server-side payment.
       */
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("PayFast ITN processing error:", error);

    return new NextResponse("ITN processing failed", {
      status: 500,
    });
  }
}
