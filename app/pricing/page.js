"use client";

import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    id: "individual",
    name: "Individual Access",
    price: "R499",
    period: "once-off access",
    description:
      "For executives and professionals using Inspired to Succeed™ for their own leadership development journey.",
    features: [
      "Full access to the leadership toolkit",
      "Assessments and reflective activities",
      "Vision board development",
      "30-, 60- and 90-day commitments",
      "Personal progress workspace",
    ],
    amount: 499,
    itemName: "Inspired to Succeed Individual Access",
  },
  {
    id: "coach",
    name: "Coach Access",
    price: "R999",
    period: "once-off access",
    description:
      "For coaches supporting authorised clients through structured leadership development.",
    features: [
      "Coach workspace",
      "Client development support tools",
      "Coaching reflection and intervention records",
      "Leadership development tracking",
      "Access to the complete toolkit",
    ],
    amount: 999,
    itemName: "Inspired to Succeed Coach Access",
  },
  {
    id: "organisation",
    name: "Organisation Access",
    price: "Contact us",
    period: "organisation licence",
    description:
      "For organisations that want to deploy Inspired to Succeed™ across leadership teams or development programmes.",
    features: [
      "Multi-user organisational access",
      "Administrator oversight",
      "Coach and executive role management",
      "Leadership engagement monitoring",
      "Custom licensing arrangement",
    ],
    amount: null,
    itemName: "Inspired to Succeed Organisation Access",
  },
];

export default function PricingPage() {
  const [busyPlan, setBusyPlan] = useState("");
  const [message, setMessage] = useState("");

  async function startPayment(plan) {
    if (!plan.amount) {
      setMessage(
        "Organisation licensing is arranged separately. Please contact the platform administrator."
      );
      return;
    }

    setBusyPlan(plan.id);
    setMessage("");

    try {
      const response = await fetch("/api/payfast/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: plan.amount,
          itemName: plan.itemName,
          itemDescription: plan.description,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to prepare the PayFast payment."
        );
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = result.paymentUrl;

      Object.entries(result.fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error(error);
      setMessage(
        "We could not start the payment process. Please try again."
      );
      setBusyPlan("");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f7f5ff 0%, #ffffff 48%, #eef8ff 100%)",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <section
          style={{
            textAlign: "center",
            maxWidth: "820px",
            margin: "0 auto 48px",
          }}
        >
          <span className="eyebrow">Access options</span>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: "1.05",
              margin: "18px 0",
            }}
          >
            Continue your Inspired to Succeed™ journey.
          </h1>

          <p
            style={{
              fontSize: "1.08rem",
              lineHeight: "1.8",
            }}
          >
            Start with a free trial, then choose the access option that best
            fits your leadership development role.
          </p>
        </section>

        {message && (
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto 30px",
              padding: "16px 18px",
              background: "#f4f1ff",
              borderRadius: "12px",
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            {message}
          </div>
        )}

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {plans.map((plan) => (
            <article
              key={plan.id}
              style={{
                background: "#ffffff",
                borderRadius: "22px",
                padding: "30px",
                border: "1px solid rgba(100, 80, 180, 0.12)",
                boxShadow: "0 18px 50px rgba(20, 20, 60, 0.08)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className="eyebrow">{plan.name}</span>

              <h2
                style={{
                  fontSize: "2.2rem",
                  margin: "14px 0 4px",
                }}
              >
                {plan.price}
              </h2>

              <p
                style={{
                  marginTop: 0,
                  opacity: 0.7,
                }}
              >
                {plan.period}
              </p>

              <p
                style={{
                  lineHeight: "1.7",
                  minHeight: "90px",
                }}
              >
                {plan.description}
              </p>

              <div
                style={{
                  borderTop: "1px solid #ececf2",
                  marginTop: "16px",
                  paddingTop: "20px",
                  flex: 1,
                }}
              >
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "12px",
                      lineHeight: "1.5",
                    }}
                  >
                    <span>✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="button primary"
                disabled={busyPlan === plan.id}
                onClick={() => startPayment(plan)}
                style={{
                  width: "100%",
                  border: "none",
                  cursor: busyPlan === plan.id ? "wait" : "pointer",
                  justifyContent: "center",
                  marginTop: "18px",
                }}
              >
                {busyPlan === plan.id
                  ? "Preparing payment..."
                  : plan.amount
                  ? "Purchase with PayFast"
                  : "Request Organisation Access"}
              </button>
            </article>
          ))}
        </section>

        <section
          style={{
            marginTop: "48px",
            padding: "30px",
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid rgba(100, 80, 180, 0.12)",
            textAlign: "center",
          }}
        >
          <h2>Still on your free trial?</h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "10px auto 22px",
              lineHeight: "1.7",
            }}
          >
            You do not need to purchase immediately. Continue exploring the
            platform during your trial and return here when you are ready to
            activate paid access.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link className="button secondary" href="/register">
              Start Free Trial
            </Link>

            <Link className="button secondary" href="/login">
              Login
            </Link>

            <Link className="button secondary" href="/">
              Return Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
