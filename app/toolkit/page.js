import Link from 'next/link';

const toolkitSections = [
  {
    title: 'Leadership Reflections',
    description:
      'Work through the six leadership themes and competency reflections from the Inspired to Succeed™ framework.',
    href: '/toolkit/reflections',
  },
  {
    title: 'Vision Board',
    description:
      'Build your leadership vision using image cards, differentiators and aligning phrases.',
    href: '/toolkit/vision-board',
  },
  {
    title: 'Ideal State',
    description:
      'Translate your current state into a leadership gap, ideal state and practical development pathway.',
    href: '/toolkit/ideal-state',
  },
  {
    title: 'Wheel of Success',
    description:
      'See your development across the six leadership themes in one visual leadership profile.',
    href: '/toolkit/wheel',
  },
  {
    title: 'Commitments',
    description:
      'Turn reflection into measurable 30-, 60- and 90-day leadership actions.',
    href: '/toolkit/commitments',
  },
  {
    title: 'Mentor',
    description:
      'Invite an outside mentor and control which parts of your leadership journey are shared.',
    href: '/toolkit/mentor',
  },
];

export default function ToolkitHomePage() {
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
          padding: '72px max(24px, calc((100vw - 1320px) / 2)) 64px',
          background:
            'linear-gradient(135deg, #17150f 0%, #2b2418 100%)',
          color: '#ffffff',
        }}
      >
        <span
          style={{
            display: 'block',
            color: '#d8a12b',
            fontSize: '12px',
            fontWeight: 900,
            letterSpacing: '.16em',
            marginBottom: '14px',
          }}
        >
          INSPIRED TO SUCCEED™
        </span>

        <h1
          style={{
            margin: 0,
            maxWidth: '900px',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(44px, 6vw, 72px)',
            lineHeight: 1,
          }}
        >
          Your Executive Leadership Toolkit
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
          Move through the toolkit as a guided leadership journey:
          reflect, visualise, identify your ideal state, make commitments
          and review your progress.
        </p>
      </section>

      <section
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '56px 24px 80px',
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
          {toolkitSections.map((section, index) => (
            <Link
              key={section.title}
              href={section.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '220px',
                padding: '26px',
                borderRadius: '20px',
                border: '1px solid #e2d8ca',
                background: '#ffffff',
                color: '#1b1916',
                textDecoration: 'none',
                boxShadow: '0 12px 32px rgba(60,45,20,.05)',
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
                {String(index + 1).padStart(2, '0')}
              </span>

              <h2
                style={{
                  margin: '18px 0 12px',
                  fontFamily: 'Georgia, serif',
                  fontSize: '28px',
                }}
              >
                {section.title}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: '#6f675f',
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                {section.description}
              </p>

              <span
                style={{
                  marginTop: '24px',
                  color: '#9a7016',
                  fontWeight: 800,
                }}
              >
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
