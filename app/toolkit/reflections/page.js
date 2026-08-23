import Link from 'next/link';

export const metadata = {
  title: 'Leadership Reflections | Inspired to Succeed',
  description:
    'Leadership reflection workspace for the Inspired to Succeed executive toolkit.',
};

export default function LeadershipReflectionsPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f7f4ee',
        color: '#1b1916',
      }}
    >
      <section
        style={{
          padding: '60px max(24px, calc((100vw - 1280px) / 2))',
          background:
            'linear-gradient(135deg, #17150f 0%, #2b2418 100%)',
          color: '#ffffff',
        }}
      >
        <Link
          href="/toolkit"
          style={{
            display: 'inline-block',
            marginBottom: '28px',
            color: '#d8a12b',
            textDecoration: 'none',
            fontWeight: 800,
          }}
        >
          ← Back to Toolkit
        </Link>

        <span
          style={{
            display: 'block',
            color: '#d8a12b',
            fontSize: '11px',
            fontWeight: 900,
            letterSpacing: '.16em',
            marginBottom: '14px',
          }}
        >
          01 · LEADERSHIP REFLECTIONS
        </span>

        <h1
          style={{
            maxWidth: '850px',
            margin: 0,
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(42px, 6vw, 68px)',
            lineHeight: 1.04,
          }}
        >
          Explore the leader you are becoming.
        </h1>

        <p
          style={{
            maxWidth: '760px',
            marginTop: '24px',
            color: 'rgba(255,255,255,.72)',
            fontSize: '18px',
            lineHeight: 1.7,
          }}
        >
          Work through the Inspired to Succeed™ leadership themes,
          reflect on your current leadership state and build evidence of
          intentional development.
        </p>
      </section>

      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '56px 24px 90px',
        }}
      >
        <div
          style={{
            padding: '36px',
            borderRadius: '22px',
            border: '1px solid #e1d7c9',
            background: '#ffffff',
          }}
        >
          <span
            style={{
              color: '#9a7016',
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '.14em',
            }}
          >
            REFLECTION WORKSPACE
          </span>

          <h2
            style={{
              margin: '14px 0',
              fontFamily: 'Georgia, serif',
              fontSize: '34px',
            }}
          >
            Leadership themes and reflections
          </h2>

          <p
            style={{
              maxWidth: '760px',
              color: '#6e675f',
              lineHeight: 1.7,
            }}
          >
            The interactive reflection workbook will be rebuilt here as
            smaller, individual toolkit pages. This keeps the platform fast
            while preserving Wezi Khoza&apos;s six-theme leadership framework.
          </p>

          <Link
            href="/toolkit"
            style={{
              display: 'inline-flex',
              marginTop: '20px',
              padding: '14px 20px',
              borderRadius: '10px',
              background: '#d8a12b',
              color: '#17130c',
              textDecoration: 'none',
              fontWeight: 900,
            }}
          >
            Return to Toolkit
          </Link>
        </div>
      </section>
    </main>
  );
}
