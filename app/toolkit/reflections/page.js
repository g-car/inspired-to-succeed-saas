import Link from 'next/link';
import ToolkitClient from '@/components/ToolkitClient';

export const metadata = {
  title: 'Leadership Reflections | Inspired to Succeed',
  description:
    'Interactive executive leadership reflections based on the Inspired to Succeed framework by Wezi Khoza.',
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
          padding: '54px max(24px, calc((100vw - 1320px) / 2)) 46px',
          background:
            'linear-gradient(135deg, #17150f 0%, #2b2418 100%)',
          color: '#ffffff',
        }}
      >
        <Link
          href="/toolkit"
          style={{
            display: 'inline-block',
            marginBottom: '24px',
            color: '#d8a12b',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '13px',
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
            marginBottom: '12px',
          }}
        >
          01 · LEADERSHIP REFLECTIONS
        </span>

        <h1
          style={{
            margin: 0,
            maxWidth: '850px',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: 1.05,
          }}
        >
          Explore the leader you are becoming.
        </h1>

        <p
          style={{
            maxWidth: '760px',
            marginTop: '22px',
            color: 'rgba(255,255,255,.72)',
            lineHeight: 1.7,
            fontSize: '17px',
          }}
        >
          Work through Wezi Khoza&apos;s six leadership themes and competency
          reflections. Record where you are now, what the reflection awakens
          in you and what leadership behaviour requires attention.
        </p>
      </section>

      <section
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '46px 24px 80px',
        }}
      >
        <ToolkitClient />
      </section>
    </main>
  );
}
