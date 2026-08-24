import crypto from "crypto";
import { NextResponse } from "next/server";

const PAYFAST_URL =
  process.env.PAYFAST_MODE === "sandbox"
    ? "https://sandbox.payfast.co.za/eng/process"
    : "https://www.payfast.co.za/eng/process";

function encode(value) {
  return encodeURIComponent(String(value).trim()).replace(/%20/g, "+");
}

function generateSignature(data, passphrase = "") {
  const pairs = [];

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
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
    const merchantId = process.env.PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
    const passphrase = process.env.PAYFAST_PASSPHRASE || "";

    if (!merchantId || !merchantKey) {
      return NextResponse.json(
        {
          success: false,
          error: "PayFast merchant credentials are not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      amount,
      itemName,
      itemDescription,
      nameFirst,
      nameLast,
      email,
      paymentId,
      returnUrl,
      cancelUrl,
      notifyUrl,
    } = body;

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid payment amount is required.",
        },
        { status: 400 }
      );
    }

    if (!itemName) {
      return NextResponse.json(
        {
          success: false,
          error: "A payment item name is required.",
        },
        { status: 400 }
      );
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "";

    const paymentData = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: returnUrl || `${origin}/payment/success`,
      cancel_url: cancelUrl || `${origin}/payment/cancelled`,
      notify_url: notifyUrl || `${origin}/api/payfast/notify`,
      name_first: nameFirst || "",
      name_last: nameLast || "",
      email_address: email || "",
      m_payment_id: paymentId || `ITS-${Date.now()}`,
      amount: numericAmount.toFixed(2),
      item_name: itemName,
      item_description: itemDescription || "",
    };

    const signature = generateSignature(paymentData, passphrase);

    return NextResponse.json({
      success: true,
      paymentUrl: PAYFAST_URL,
      fields: {
        ...paymentData,
        signature,
      },
    });
  } catch (error) {
    console.error("PayFast checkout error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to prepare the PayFast payment.",
      },
      { status: 500 }
    );
  }
}
