"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    setBusy(true);

    /*
      Secure authentication will be connected to the
      Inspired to Succeed production authentication backend.

      Once connected, login will:
      1. Authenticate the user.
      2. Retrieve the user's licence status.
      3. Check whether the 6-day trial is still active.
      4. Allow active paid users into the toolkit.
      5. Redirect expired users to /pricing.
    */

    setTimeout(() => {
      setBusy(false);

      setMessage(
        "The login page is ready. Secure authentication and licence verification will be activated when the production account database is connected."
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
          maxWidth: "1080px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "52px",
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
            Continue your leadership development journey.
          </h1>

          <p
            style={{
              fontSize: "1.08rem",
              lineHeight: "1.8",
              maxWidth: "600px",
            }}
          >
            Sign in to continue your assessments, reflections, vision board
            and 30-, 60- and 90-day leadership commitments from where you
            stopped.
          </p>

          <div
            style={{
              marginTop: "32px",
              display: "grid",
              gap: "16px",
            }}
          >
            <InfoCard
              number="01"
              title="6-Day Free Trial"
              text="New users receive six days to explore Inspired to Succeed™ before paid access is required."
            />

            <InfoCard
              number="02"
              title="Your Progress is Preserved"
              text="Once persistent account storage is activated, your leadership work will remain available whenever you return."
            />

            <InfoCard
              number="03"
              title="Continue After Your Trial"
              text="When the trial expires, you can purchase access securely through PayFast and continue using the toolkit."
            />
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
          <span className="eyebrow">Secure account access</span>

          <h2
            style={{
              marginTop: "12px",
              marginBottom: "8px",
            }}
          >
            Login
          </h2>

          <p
            style={{
              marginBottom: "28px",
              lineHeight: "1.6",
            }}
          >
            New to Inspired to Succeed?{" "}
            <Link href="/register">
              <strong>Start your 6-day free trial</strong>
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
                    padding: "6px",
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
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                Keep me signed in
              </label>

              <Link href="/forgot-password">
                Forgot password?
              </Link>
            </div>

            {message && (
              <div
                style={{
                  padding: "14px 16px",
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
              {busy ? "Signing in..." : "Login to My Workspace"}
            </button>
          </form>

          <div
            style={{
              marginTop: "28px",
              paddingTop: "24px",
              borderTop: "1px solid #ececf2",
              textAlign: "center",
            }}
          >
            <strong>Has your trial ended?</strong>

            <p
              style={{
                margin: "8px 0 16px",
                fontSize: "0.92rem",
                lineHeight: "1.6",
              }}
            >
              Purchase access to continue your leadership development journey.
            </p>

            <Link className="button secondary" href="/pricing">
              View Access Options
            </Link>
          </div>

          <div
            style={{
              marginTop: "24px",
              textAlign: "center",
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/register">
              Create Account
            </Link>

            <span style={{ opacity: 0.35 }}>•</span>

            <Link href="/">
              Return Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ number, title, text }) {
  return (
    <div
      style={{
        padding: "20px 22px",
        background: "rgba(255,255,255,0.72)",
        borderRadius: "16px",
        border: "1px solid rgba(90,70,160,0.10)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "14px",
          alignItems: "flex-start",
        }}
      >
        <strong
          style={{
            opacity: 0.55,
            minWidth: "28px",
          }}
        >
          {number}
        </strong>

        <div>
          <strong>{title}</strong>

          <p
            style={{
              margin: "6px 0 0",
              lineHeight: "1.6",
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
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
