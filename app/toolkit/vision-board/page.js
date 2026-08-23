import Link from 'next/link';

export const metadata = {
  title: 'Vision Board | Inspired to Succeed',
  description:
    'Interactive leadership vision board using image cards, differentiators and aligning phrases.',
};

export default function VisionBoardPage() {
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
          02 · VISION BOARD
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
          Build the leadership future you can see.
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
          Use images, Differentiator Cards and Aligning Phrases to create a
          visual representation of the leader you are becoming.
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
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px',
          }}
        >
          <div
            style={{
              padding: '28px',
              borderRadius: '20px',
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
              01 · IMAGE CARDS
            </span>

            <h2
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '30px',
                margin: '14px 0',
              }}
            >
              What do you see?
            </h2>

            <p
              style={{
                color: '#6e675f',
                lineHeight: 1.7,
              }}
            >
              Choose an image that represents your current reality, future
              aspiration or the leadership story you want to create.
            </p>
          </div>

          <div
            style={{
              padding: '28px',
              borderRadius: '20px',
              background: '#d8a12b',
              color: '#17130c',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '.14em',
              }}
            >
              02 · DIFFERENTIATOR CARDS
            </span>

            <h2
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '30px',
                margin: '14px 0',
              }}
            >
              Who do you need to become?
            </h2>

            <p style={{ lineHeight: 1.7 }}>
              Select the leadership quality you want to embody more visibly
              and consistently.
            </p>
          </div>

          <div
            style={{
              padding: '28px',
              borderRadius: '20px',
              background: '#151515',
              color: '#ffffff',
            }}
          >
            <span
              style={{
                color: '#d8a12b',
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '.14em',
              }}
            >
              03 · ALIGNING PHRASES
            </span>

            <h2
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '30px',
                margin: '14px 0',
              }}
            >
              What thought will guide you?
            </h2>

            <p
              style={{
                color: 'rgba(255,255,255,.72)',
                lineHeight: 1.7,
              }}
            >
              Choose the phrase that anchors your attention and action when
              pressure or distraction arises.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: '28px',
            padding: '32px',
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
            MY VISION BOARD
          </span>

          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '36px',
              margin: '14px 0',
            }}
          >
            The leader I am becoming
          </h2>

          <p
            style={{
              maxWidth: '760px',
              color: '#6e675f',
              lineHeight: 1.7,
            }}
          >
            Your selected image, differentiator and aligning phrase will
            assemble here once the original card assets are connected.
          </p>
        </div>
      </section>
    </main>
  );
}
