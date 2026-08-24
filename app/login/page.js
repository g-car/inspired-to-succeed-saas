"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    setBusy(true);

    /*
      Authentication will be connected to Supabase Auth
      when the production database is created under
      Wezi Khoza / family ownership.
    */

    setTimeout(() => {
      setBusy(false);
      setMessage(
        "Login interface is ready. Secure account authentication will be connected next."
      );
    }, 500);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f6f3ff 0%, #ffffff 50%, #eef8ff 100%)",
        padding: "60px 20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1050px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "50px",
          alignItems: "center",
        }}
      >
        <section>
          <span className="eyebrow">Inspired to Succeed™</span>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.7rem)",
              lineHeight: "1.02",
              margin: "18px 0",
            }}
          >
            Welcome back to your leadership journey.
          </h1>

          <p
            style={{
              fontSize: "1.08rem",
              lineHeight: "1.8",
              maxWidth: "580px",
            }}
          >
            Sign in to continue your assessments, reflections, vision board
            and leadership commitments from where you left off.
          </p>

          <div
            style={{
              marginTop: "32px",
              padding: "24px",
              background: "rgba(255,255,255,0.7)",
              borderRadius: "18px",
              border: "1px solid rgba(90,70,160,0.12)",
            }}
          >
            <strong>Your progress belongs to you.</strong>

            <p
              style={{
                marginTop: "8px",
                marginBottom: 0,
                lineHeight: "1.6",
              }}
            >
              Once account storage is activated, your toolkit information will
              remain available between sessions so that you can continue your
              development journey without starting again.
            </p>
          </div>
        </section>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "38px",
            boxShadow: "0 20px 60px rgba(20, 20, 60, 0.10)",
            border: "1px solid rgba(100, 80, 180, 0.12)",
          }}
        >
          <span className="eyebrow">Secure access</span>

          <h2
            style={{
              marginTop: "12px",
              marginBottom: "8px",
            }}
          >
            Login to your account
          </h2>

          <p
            style={{
              marginBottom: "28px",
            }}
          >
            New to Inspired to Succeed?{" "}
            <Link href="/register">
              <strong>Start your free trial</strong>
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>
              Email address
              <input
                style={inputStyle}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label style={labelStyle}>
              Password

              <div style={{ position: "relative" }}>
                <input
                  style={{
                    ...inputStyle,
                    paddingRight: "90px",
                  }}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "18px",
                alignItems: "center",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >
              <label
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  fontSize: "0.92rem",
                }}
              >
                <input type="checkbox" />
                Remember me
              </label>

              <Link href="/forgot-password">
                Forgot password?
              </Link>
            </div>

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
              {busy ? "Signing in..." : "Login"}
            </button>
          </form>

          <div
            style={{
              marginTop: "26px",
              paddingTop: "24px",
              borderTop: "1px solid #ececf2",
              textAlign: "center",
            }}
          >
            <p
              style={{
                marginBottom: "12px",
                fontSize: "0.92rem",
              }}
            >
              Trial expired or ready to subscribe?
            </p>

            <Link className="button secondary" href="/pricing">
              View Access Options
            </Link>
          </div>

          <div
            style={{
              marginTop: "22px",
              textAlign: "center",
            }}
          >
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
  marginBottom: "20px",
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
