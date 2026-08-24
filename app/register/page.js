"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { createTrialDates } from "@/lib/license";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "executive",
    organisation: "",
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function getPlatformRole(accountType) {
    if (accountType === "coach") {
      return "coach";
    }

    if (accountType === "organisation") {
      return "organisation_admin";
    }

    return "executive";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();
    const organisation = form.organisation.trim();

    if (!fullName) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (form.password.length < 8) {
      setErrorMessage(
        "Your password must contain at least 8 characters."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage("The passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      const { trialStartedAt, trialEndsAt } = createTrialDates();

      const platformRole = getPlatformRole(form.accountType);

      const { data, error } = await supabase.auth.signUp({
        email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/login?confirmed=1`,
          data: {
            full_name: fullName,
            account_type: form.accountType,
            role: platformRole,
            organisation: organisation || null,

            licence_status: "trial",
            trial_started_at: trialStartedAt,
            trial_ends_at: trialEndsAt,

            terms_accepted_at: new Date().toISOString(),
          },
        },
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error(
          "The account could not be created. Please try again."
        );
      }

      /*
        Supabase normally requires email confirmation.

        If there is no session, the user must confirm their
        email before login.

        If email confirmation has been disabled and Supabase
        returns a session immediately, we can send the user
        directly to the toolkit.
      */

      if (data.session) {
        setMessage(
          "Your account has been created and your 6-day free trial has started. Opening your workspace..."
        );

        setTimeout(() => {
          router.push("/toolkit");
        }, 1200);

        return;
      }

      setMessage(
        "Your Inspired to Succeed™ account has been created. Your 6-day free trial has been prepared. Please check your email and confirm your account before logging in."
      );

      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "executive",
        organisation: "",
      });
    } catch (error) {
      console.error("Registration error:", error);

      let friendlyMessage =
        "We could not create your account. Please try again.";

      const errorText = String(error?.message || "").toLowerCase();

      if (
        errorText.includes("already registered") ||
        errorText.includes("already been registered")
      ) {
        friendlyMessage =
          "An account already exists for this email address. Please use Login instead.";
      } else if (errorText.includes("password")) {
        friendlyMessage =
          error.message ||
          "Please choose a stronger password and try again.";
      } else if (error?.message) {
        friendlyMessage = error.message;
      }

      setErrorMessage(friendlyMessage);
    } finally {
      setBusy(false);
    }
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
            Create your Inspired to Succeed™ account and begin your
            six-day free trial. Your personal workspace will guide you
            from leadership assessment and reflection through vision
            building and measurable 30-, 60- and 90-day commitments.
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
              <p>
                Explore your leadership competencies and development
                needs.
              </p>
            </div>

            <div>
              <strong>02 — Reflect</strong>
              <p>
                Turn your leadership experiences into meaningful
                insight.
              </p>
            </div>

            <div>
              <strong>03 — Envision</strong>
              <p>
                Create a personal leadership vision and development
                focus.
              </p>
            </div>

            <div>
              <strong>04 — Act</strong>
              <p>
                Translate insight into practical 30-, 60- and 90-day
                commitments.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "34px",
              padding: "22px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(100,80,180,0.12)",
            }}
          >
            <strong>6-Day Free Trial</strong>

            <p
              style={{
                margin: "8px 0 0",
                lineHeight: "1.6",
              }}
            >
              No payment is required when you register. After six days,
              you can continue your leadership journey by purchasing
              the appropriate Inspired to Succeed™ licence.
            </p>
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
          <span className="eyebrow">6-Day Free Trial</span>

          <h2
            style={{
              marginTop: "12px",
              marginBottom: "8px",
            }}
          >
            Create your account
          </h2>

          <p
            style={{
              marginBottom: "28px",
            }}
          >
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
                disabled={busy}
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
                disabled={busy}
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
                disabled={busy}
              >
                <option value="executive">
                  Executive / Individual
                </option>

                <option value="coach">
                  Coach
                </option>

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
                disabled={busy}
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
                disabled={busy}
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
                disabled={busy}
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
              <input
                type="checkbox"
                required
                disabled={busy}
                style={{
                  marginTop: "4px",
                }}
              />

              <span>
                I agree to the platform terms and privacy
                requirements and understand that my free trial lasts
                for six days, after which a valid licence is required
                for continued access.
              </span>
            </label>

            {errorMessage && (
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: "#fff1f1",
                  border: "1px solid #f0c8c8",
                  marginBottom: "18px",
                  lineHeight: "1.5",
                }}
              >
                {errorMessage}
              </div>
            )}

            {message && (
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: "#eefaf3",
                  border: "1px solid #c8e8d4",
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
                opacity: busy ? 0.7 : 1,
              }}
            >
              {busy
                ? "Creating your account..."
                : "Start My 6-Day Free Trial"}
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
            No payment information is required to start your trial.
          </p>

          <div
            style={{
              textAlign: "center",
              marginTop: "18px",
            }}
          >
            <Link href="/">
              ← Return to home
            </Link>
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
