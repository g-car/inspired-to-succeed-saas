import Image from "next/image";
import Link from "next/link";
import { themes } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              Executive leadership development platform
            </span>

            <h1>Turn reflection into visible leadership growth.</h1>

            <p>
              Inspired to Succeed™ transforms Wezi Khoza&apos;s executive
              leadership development methodology into an interactive digital
              workspace for executives, coaches and organisations.
            </p>

            <div className="button-row">
              <Link className="button primary" href="/register">
                Start Free Trial
              </Link>

              <Link className="button secondary" href="/login">
                Login
              </Link>

              <Link className="button secondary" href="/pricing">
                Purchase Access
              </Link>
            </div>

            <div className="hero-metrics">
              <div>
                <strong>6</strong>
                <span>leadership themes</span>
              </div>

              <div>
                <strong>40</strong>
                <span>competency modules</span>
              </div>

              <div>
                <strong>90</strong>
                <span>day action cycles</span>
              </div>
            </div>
          </div>

          <div className="cover-shell">
            <Image
              src="/cover.jpg"
              alt="Inspired to Succeed leadership development toolkit"
              width={1200}
              height={816}
              priority
            />
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">Start your journey</span>
          <h2>Experience Inspired to Succeed before you subscribe.</h2>
          <p>
            Create your account, begin your trial and explore a structured
            leadership development journey before deciding on continued
            access.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <span>01</span>
            <h3>Create your account</h3>
            <p>
              Register securely and establish your own personal Inspired to
              Succeed workspace.
            </p>
          </article>

          <article className="feature-card">
            <span>02</span>
            <h3>Start your free trial</h3>
            <p>
              Explore the toolkit, complete leadership activities and
              experience how the platform supports structured development.
            </p>
          </article>

          <article className="feature-card">
            <span>03</span>
            <h3>Continue with paid access</h3>
            <p>
              When your trial ends, choose your licence and continue your
              leadership journey through secure PayFast payment.
            </p>
          </article>
        </div>

        <div
          className="button-row"
          style={{
            marginTop: "32px",
            justifyContent: "center",
          }}
        >
          <Link className="button primary" href="/register">
            Start Free Trial
          </Link>

          <Link className="button secondary" href="/pricing">
            View Access Options
          </Link>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Built for three audiences</span>
            <h2>One platform, connected leadership development.</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <span>01</span>
              <h3>Executives</h3>
              <p>
                Complete assessments, reflections, vision boards and
                measurable 30-, 60- and 90-day leadership commitments.
              </p>
            </article>

            <article className="feature-card">
              <span>02</span>
              <h3>Coaches</h3>
              <p>
                Work with authorised clients, document development
                conversations and respond to evidence-based leadership
                priorities.
              </p>
            </article>

            <article className="feature-card">
              <span>03</span>
              <h3>Organisations</h3>
              <p>
                Support structured leadership development while maintaining
                appropriate separation between individual coaching information
                and organisational oversight.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">Leadership architecture</span>
          <h2>The complete Inspired to Succeed™ toolkit.</h2>
          <p>
            Move from assessment and reflection to a personalised vision,
            practical commitments and measurable leadership growth.
          </p>
        </div>

        <div className="theme-grid">
          {themes.map((theme, index) => (
            <article className="theme-card" key={theme.name}>
              <div className="theme-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3>{theme.name}</h3>

              <p>{theme.modules.join(" • ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Ready to begin?</span>
            <h2>Your leadership development journey starts here.</h2>
            <p>
              New users can begin with a trial. Existing users can return to
              their workspace, while customers ready to continue can purchase
              access securely.
            </p>
          </div>

          <div
            className="button-row"
            style={{
              justifyContent: "center",
            }}
          >
            <Link className="button primary" href="/register">
              Start Free Trial
            </Link>

            <Link className="button secondary" href="/login">
              Existing User Login
            </Link>

            <Link className="button secondary" href="/pricing">
              Purchase Access
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">Platform administration</span>
          <h2>Administrator access.</h2>
          <p>
            Authorised platform administrators can manage users, licensing,
            subscriptions and platform activity from the administration
            portal.
          </p>
        </div>

        <div
          className="button-row"
          style={{
            justifyContent: "center",
          }}
        >
          <Link className="button secondary" href="/admin">
            Administrator Portal
          </Link>
        </div>
      </section>
    </>
  );
}
