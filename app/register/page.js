"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "executive",
    organisation: "",
  });

  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!form.fullName.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!form.email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    setBusy(true);

    /*
      Registration will be connected to Supabase Auth
      in the next implementation step.
    */

    setTimeout(() => {
      setBusy(false);
      setMessage(
        "Registration form is ready. Account activation will be connected next."
      );
    }, 500);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f6f3ff 0%, #ffffff 48%, #eef8ff 100%)",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "48px",
          alignItems: "start",
        }}
      >
        <section style={{ paddingTop: "30px" }}>
          <span className="eyebrow">Inspired to Succeed™</span>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              lineHeight: "1.02",
              margin: "18px 0",
            }}
          >
            Begin your leadership development journey.
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              maxWidth: "600px",
            }}
          >
            Create your personal Inspired to Succeed™ account and begin your
            free trial. Your workspace will guide you from leadership
            assessment and reflection through vision building and measurable
            30-, 60- and 90-day commitments.
          </p>

          <div
            style={{
              marginTop: "32px",
              display: "grid",
              gap: "16px",
            }}
          >
            <div>
              <strong>01 — Assess</strong>
              <p>Explore your leadership competencies and development needs.</p>
            </div>

            <div>
              <strong>02 — Reflect</strong>
              <p>
                Turn your leadership experiences into meaningful insight.
              </p>
            </div>

            <div>
              <strong>03 — Envision</strong>
              <p>Create a personal leadership vision and development focus.</p>
            </div>

            <div>
              <strong>04 — Act</strong>
              <p>
                Translate insight into practical 30-, 60- and 90-day
                commitments.
              </p>
            </div>
          </div>
        </section>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "36px",
            boxShadow: "0 20px 60px rgba(20, 20, 60, 0.10)",
            border: "1px solid rgba(100, 80, 180, 0.12)",
          }}
        >
          <span className="eyebrow">Free trial</span>

          <h2 style={{ marginTop: "12px", marginBottom: "8px" }}>
            Create your account
          </h2>

          <p style={{ marginBottom: "28px" }}>
            Already registered?{" "}
            <Link href="/login">
              <strong>Login here</strong>
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>
              Full name
              <input
                style={inputStyle}
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </label>

            <label style={labelStyle}>
              Email address
              <input
                style={inputStyle}
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label style={labelStyle}>
              I am joining as
              <select
                style={inputStyle}
                name="accountType"
                value={form.accountType}
                onChange={updateField}
              >
                <option value="executive">Executive / Individual</option>
                <option value="coach">Coach</option>
                <option value="organisation">
                  Organisation representative
                </option>
              </select>
            </label>

            <label style={labelStyle}>
              Organisation
              <input
                style={inputStyle}
                type="text"
                name="organisation"
                value={form.organisation}
                onChange={updateField}
                placeholder="Organisation name (optional)"
              />
            </label>

            <label style={labelStyle}>
              Password
              <input
                style={inputStyle}
                type="password"
                name="password"
                value={form.password}
                onChange={updateField}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                required
              />
            </label>

            <label style={labelStyle}>
              Confirm password
              <input
                style={inputStyle}
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={updateField}
                placeholder="Repeat your password"
                autoComplete="new-password"
                required
              />
            </label>

            <label
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                marginBottom: "22px",
                fontSize: "0.92rem",
                lineHeight: "1.5",
              }}
            >
              <input type="checkbox" required style={{ marginTop: "4px" }} />

              <span>
                I agree to the platform terms and privacy requirements and
                understand that my trial access is subject to the applicable
                licence conditions.
              </span>
            </label>

            {message && (
              <div
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  background: "#f4f1ff",
                  marginBottom: "18px",
                  lineHeight: "1.5",
                }}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="button primary"
              style={{
                width: "100%",
                border: "none",
                cursor: busy ? "wait" : "pointer",
                justifyContent: "center",
              }}
            >
              {busy ? "Creating account..." : "Start My Free Trial"}
            </button>
          </form>

          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "0.88rem",
              opacity: "0.75",
            }}
          >
            Your trial does not require payment at registration.
          </p>

          <div style={{ textAlign: "center", marginTop: "18px" }}>
            <Link href="/">← Return to home</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

const labelStyle = {
  display: "grid",
  gap: "8px",
  marginBottom: "18px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "10px",
  border: "1px solid #d9dce7",
  background: "#ffffff",
  fontSize: "1rem",
  fontFamily: "inherit",
  boxSizing: "border-box",
};
