import Image from 'next/image';
import Link from 'next/link';
import { themes } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Executive development platform</span>
            <h1>Turn reflection into visible leadership growth.</h1>
            <p>Inspired to Succeed digitises Wezi Khoza&apos;s executive vision-board toolkit into a guided SaaS workspace for executives, coaches and organisations.</p>
            <div className="button-row">
              <Link className="button primary" href="/toolkit">Start the toolkit</Link>
              <Link className="button secondary" href="/admin">View admin portal</Link>
            </div>
            <div className="hero-metrics">
              <div><strong>6</strong><span>leadership themes</span></div>
              <div><strong>40</strong><span>competency modules</span></div>
              <div><strong>90</strong><span>day action cycles</span></div>
            </div>
          </div>
          <div className="cover-shell">
            <Image src="/cover.jpg" alt="Inspired to Succeed front and back book cover" width={1200} height={816} priority />
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">Built for three audiences</span>
          <h2>One platform, connected leadership development.</h2>
        </div>
        <div className="feature-grid">
          <article className="feature-card"><span>01</span><h3>Executives</h3><p>Complete assessments, reflections, vision boards and measurable 90-day commitments.</p></article>
          <article className="feature-card"><span>02</span><h3>Coaches</h3><p>Monitor authorised clients, document sessions and respond to evidence-based development priorities.</p></article>
          <article className="feature-card"><span>03</span><h3>Administrators</h3><p>Track engagement, compare themes and identify where coaching intervention is needed.</p></article>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-heading"><span className="eyebrow">Leadership architecture</span><h2>The complete toolkit structure.</h2></div>
          <div className="theme-grid">
            {themes.map((theme, index) => (
              <article className="theme-card" key={theme.name}>
                <div className="theme-number">{String(index + 1).padStart(2, '0')}</div>
                <h3>{theme.name}</h3>
                <p>{theme.modules.join(' • ')}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
