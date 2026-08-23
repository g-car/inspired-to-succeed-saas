'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const themes = [
  {
    id: 'values',
    number: '01',
    title: 'Values Driven',
    description:
      'Values, discipline, agility, courageous leadership and citizenship.',
    ideal:
      'I lead with clear values, disciplined behaviour, adaptability, courage and a strong sense of responsibility.',
  },
  {
    id: 'culture',
    number: '02',
    title: 'Cultural Competence',
    description:
      'Collaboration, inclusion, ESG, globalisation, relationships, competition, social intelligence and emotional intelligence.',
    ideal:
      'I build trust across difference, collaborate effectively, understand people and context, and create environments where others can contribute fully.',
  },
  {
    id: 'performance',
    number: '03',
    title: 'Performance Centred',
    description:
      'Innovation, business intelligence, change leadership, decision making, problem solving and governance.',
    ideal:
      'I create clarity, make sound decisions, solve problems deliberately and translate strategy into accountable performance.',
  },
  {
    id: 'strategy',
    number: '04',
    title: 'Strategic & Integrative',
    description:
      'Positioning, AI, ICT, digital transformation, infrastructure, knowledge management and strategic thinking.',
    ideal:
      'I anticipate change, integrate information, technology and knowledge, and turn complexity into clear long-term direction.',
  },
  {
    id: 'people',
    number: '05',
    title: 'People Oriented',
    description:
      'Talent, corporate health, reward, succession, coaching, sponsorship and remote leadership.',
    ideal:
      'I develop people, create healthy conditions for performance, build future leadership capacity and use influence to open opportunity for others.',
  },
  {
    id: 'personal',
    number: '06',
    title: 'Personal Development',
    description:
      'Industry expertise, data, growth mindset, influence, self-mastery, visualisation and imposter syndrome.',
    ideal:
      'I lead myself with confidence, self-awareness, continuous learning, resilience and a clear sense of personal direction.',
  },
];

const scaleLabels = {
  1: 'Major development priority',
  2: 'Needs significant attention',
  3: 'Developing',
  4: 'Strong',
  5: 'Established strength',
};

function buildIdealState(theme, rating, differentiator, phrase, commitment) {
  const identity = differentiator
    ? `You are intentionally developing as a ${differentiator.toLowerCase()} leader.`
    : 'You are defining the leadership identity you want to strengthen.';

  const guidance = phrase
    ? ` Your chosen aligning phrase — “${phrase}” — should act as a behavioural anchor when pressure or uncertainty arises.`
    : '';

  const gap =
    rating <= 2
      ? 'The gap between your current and desired state is substantial and requires deliberate practice, support and evidence of behavioural change.'
      : rating === 3
      ? 'You have a developing foundation, but greater consistency is required before this becomes a dependable leadership strength.'
      : 'You already show meaningful capability in this area; the next step is consistency, depth and visible impact.';

  const action = commitment
    ? ` Your current commitment is: ${commitment}`
    : '';

  return `${identity} ${theme.ideal} ${gap}${guidance}${action}`;
}

export default function LeadershipAssessmentPage() {
  const [differentiator, setDifferentiator] = useState('');
  const [phrase, setPhrase] = useState('');

  const [assessments, setAssessments] = useState(() =>
    themes.reduce((acc, theme) => {
      acc[theme.id] = {
        rating: 3,
        working: '',
        development: '',
        stop: '',
        start: '',
        strengthen: '',
        commitment: '',
      };
      return acc;
    }, {})
  );

  const [activeThemeId, setActiveThemeId] = useState(themes[0].id);

  const activeTheme = themes.find(
    (theme) => theme.id === activeThemeId
  );

  const activeAssessment = assessments[activeThemeId];

  const averageScore = useMemo(() => {
    const values = Object.values(assessments).map(
      (item) => item.rating
    );

    return (
      values.reduce((total, value) => total + value, 0) /
      values.length
    ).toFixed(1);
  }, [assessments]);

  function updateTheme(field, value) {
    setAssessments((previous) => ({
      ...previous,
      [activeThemeId]: {
        ...previous[activeThemeId],
        [field]: value,
      },
    }));
  }

  const idealState = buildIdealState(
    activeTheme,
    activeAssessment.rating,
    differentiator,
    phrase,
    activeAssessment.commitment
  );

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <Link href="/toolkit" style={styles.back}>
          ← Back to Toolkit
        </Link>

        <span style={styles.eyebrow}>
          03 · LEADERSHIP ASSESSMENT
        </span>

        <h1 style={styles.heroTitle}>
          Where am I now, and what must change?
        </h1>

        <p style={styles.heroText}>
          Assess yourself across Wezi Khoza&apos;s six leadership
          themes, identify the gap between your current state and the
          leader you want to become, and make deliberate development
          commitments.
        </p>

        <div style={styles.heroStats}>
          <div style={styles.stat}>
            <span>Current overall score</span>
            <strong>{averageScore}/5</strong>
          </div>

          <div style={styles.stat}>
            <span>Leadership themes</span>
            <strong>6</strong>
          </div>

          <div style={styles.stat}>
            <span>Development journey</span>
            <strong>Personalised</strong>
          </div>
        </div>
      </section>

      <section style={styles.identitySection}>
        <div>
          <span style={styles.sectionLabel}>
            YOUR VISION BOARD ANCHORS
          </span>

          <h2 style={styles.sectionTitle}>
            Carry your choices into the assessment
          </h2>

          <p style={styles.intro}>
            Enter the Differentiator and Aligning Phrase you selected
            in your Vision Board. These choices help shape your
            personal Ideal State.
          </p>
        </div>

        <div style={styles.identityInputs}>
          <label style={styles.label}>
            My Differentiator
            <input
              value={differentiator}
              onChange={(event) =>
                setDifferentiator(event.target.value)
              }
              placeholder="Example: Reliable"
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            My Aligning Phrase
            <input
              value={phrase}
              onChange={(event) =>
                setPhrase(event.target.value)
              }
              placeholder="Example: Set the tone"
              style={styles.input}
            />
          </label>
        </div>
      </section>

      <section style={styles.themeSelectorSection}>
        <span style={styles.sectionLabel}>
          SIX LEADERSHIP THEMES
        </span>

        <h2 style={styles.sectionTitle}>
          Choose a theme to assess
        </h2>

        <div style={styles.themeGrid}>
          {themes.map((theme) => {
            const selected = activeThemeId === theme.id;
            const score = assessments[theme.id].rating;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setActiveThemeId(theme.id)}
                style={{
                  ...styles.themeCard,
                  ...(selected ? styles.themeCardActive : {}),
                }}
              >
                <span style={styles.themeNumber}>
                  {theme.number}
                </span>

                <strong style={styles.themeTitle}>
                  {theme.title}
                </strong>

                <span style={styles.themeDescription}>
                  {theme.description}
                </span>

                <div style={styles.themeScore}>
                  <span>Self-rating</span>
                  <strong>{score}/5</strong>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section style={styles.workspace}>
        <div style={styles.assessmentPanel}>
          <span style={styles.sectionLabel}>
            THEME {activeTheme.number}
          </span>

          <h2 style={styles.workspaceTitle}>
            {activeTheme.title}
          </h2>

          <p style={styles.workspaceDescription}>
            {activeTheme.description}
          </p>

          <div style={styles.ratingBlock}>
            <div style={styles.ratingHeading}>
              <span>Current self-assessment</span>
              <strong>{activeAssessment.rating}/5</strong>
            </div>

            <input
              type="range"
              min="1"
              max="5"
              value={activeAssessment.rating}
              onChange={(event) =>
                updateTheme(
                  'rating',
                  Number(event.target.value)
                )
              }
              style={styles.slider}
            />

            <div style={styles.scaleText}>
              {scaleLabels[activeAssessment.rating]}
            </div>
          </div>

          <label style={styles.label}>
            What is working well?
            <textarea
              rows="4"
              value={activeAssessment.working}
              onChange={(event) =>
                updateTheme('working', event.target.value)
              }
              placeholder="What strengths, behaviours or results are already visible?"
              style={styles.textarea}
            />
          </label>

          <label style={styles.label}>
            What requires development?
            <textarea
              rows="4"
              value={activeAssessment.development}
              onChange={(event) =>
                updateTheme(
                  'development',
                  event.target.value
                )
              }
              placeholder="What is inconsistent, weak, avoided or not yet developed?"
              style={styles.textarea}
            />
          </label>

          <div style={styles.threeColumns}>
            <label style={styles.label}>
              STOP
              <textarea
                rows="4"
                value={activeAssessment.stop}
                onChange={(event) =>
                  updateTheme('stop', event.target.value)
                }
                placeholder="What should I stop doing?"
                style={styles.textarea}
              />
            </label>

            <label style={styles.label}>
              START
              <textarea
                rows="4"
                value={activeAssessment.start}
                onChange={(event) =>
                  updateTheme('start', event.target.value)
                }
                placeholder="What should I start doing?"
                style={styles.textarea}
              />
            </label>

            <label style={styles.label}>
              STRENGTHEN
              <textarea
                rows="4"
                value={activeAssessment.strengthen}
                onChange={(event) =>
                  updateTheme(
                    'strengthen',
                    event.target.value
                  )
                }
                placeholder="What should I do more consistently?"
                style={styles.textarea}
              />
            </label>
          </div>

          <label style={styles.label}>
            My leadership commitment for this theme
            <textarea
              rows="4"
              value={activeAssessment.commitment}
              onChange={(event) =>
                updateTheme(
                  'commitment',
                  event.target.value
                )
              }
              placeholder="I commit to..."
              style={styles.textarea}
            />
          </label>
        </div>

        <aside style={styles.idealStatePanel}>
          <span style={styles.goldLabel}>
            YOUR DEVELOPING IDEAL STATE
          </span>

          <h2 style={styles.idealTitle}>
            {activeTheme.title}
          </h2>

          <p style={styles.idealText}>
            {idealState}
          </p>

          <div style={styles.gapCard}>
            <span style={styles.gapLabel}>
              CURRENT → IDEAL
            </span>

            <div style={styles.gapScale}>
              <div>
                <span>Current</span>
                <strong>
                  {activeAssessment.rating}/5
                </strong>
              </div>

              <div style={styles.arrow}>
                →
              </div>

              <div>
                <span>Desired</span>
                <strong>5/5</strong>
              </div>
            </div>
          </div>

          <div style={styles.summaryCard}>
            <span style={styles.summaryLabel}>
              WHAT WILL MOVE ME FORWARD
            </span>

            <p>
              {activeAssessment.start ||
                activeAssessment.strengthen ||
                activeAssessment.commitment ||
                'Complete the assessment on the left to define your development pathway.'}
            </p>
          </div>
        </aside>
      </section>

      <section style={styles.overviewSection}>
        <span style={styles.sectionLabel}>
          MY SIX-THEME DEVELOPMENT PROFILE
        </span>

        <h2 style={styles.overviewTitle}>
          Current state across the whole framework
        </h2>

        <div style={styles.profileGrid}>
          {themes.map((theme) => {
            const score = assessments[theme.id].rating;

            return (
              <article
                key={theme.id}
                style={styles.profileCard}
              >
                <span style={styles.profileNumber}>
                  {theme.number}
                </span>

                <h3>{theme.title}</h3>

                <strong style={styles.profileScore}>
                  {score}/5
                </strong>

                <div style={styles.bar}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${score * 20}%`,
                    }}
                  />
                </div>

                <p style={styles.profileText}>
                  {assessments[theme.id].commitment ||
                    'No commitment recorded yet.'}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section style={styles.nextSection}>
        <div>
          <span style={styles.goldLabel}>
            NEXT STAGE
          </span>

          <h2 style={styles.nextTitle}>
            Your Personal Ideal State
          </h2>

          <p style={styles.nextText}>
            Once all six themes have been assessed, your current
            scores, development gaps, commitments, Differentiator and
            Aligning Phrase can be combined into one integrated
            Personal Leadership Ideal State.
          </p>
        </div>

        <Link
          href="/toolkit/wheel"
          style={styles.nextButton}
        >
          Continue to Wheel of Success →
        </Link>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f7f4ee',
    color: '#1b1916',
  },

  hero: {
    padding:
      '60px max(24px, calc((100vw - 1320px) / 2)) 68px',
    background:
      'linear-gradient(135deg,#17150f 0%,#2a2217 100%)',
    color: '#fff',
  },

  back: {
    display: 'inline-block',
    marginBottom: '28px',
    color: '#d8a12b',
    textDecoration: 'none',
    fontWeight: 800,
  },

  eyebrow: {
    display: 'block',
    color: '#d8a12b',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '.16em',
  },

  heroTitle: {
    maxWidth: '900px',
    margin: '16px 0 20px',
    fontFamily: 'Georgia,serif',
    fontSize: 'clamp(44px,6vw,70px)',
    lineHeight: 1,
  },

  heroText: {
    maxWidth: '820px',
    color: 'rgba(255,255,255,.72)',
    fontSize: '18px',
    lineHeight: 1.7,
  },

  heroStats: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '30px',
  },

  stat: {
    minWidth: '170px',
    padding: '16px 20px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,.14)',
    background: 'rgba(255,255,255,.06)',
    display: 'grid',
    gap: '4px',
  },

  identitySection: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '56px 24px 24px',
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,.9fr) minmax(0,1.1fr)',
    gap: '30px',
    alignItems: 'end',
  },

  sectionLabel: {
    color: '#956b13',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '.15em',
  },

  sectionTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '38px',
    margin: '12px 0',
  },

  intro: {
    color: '#6d655d',
    lineHeight: 1.7,
  },

  identityInputs: {
    display: 'grid',
    gap: '12px',
  },

  label: {
    display: 'grid',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 800,
  },

  input: {
    minHeight: '50px',
    border: '1px solid #d9cebf',
    borderRadius: '11px',
    padding: '0 13px',
    font: 'inherit',
    boxSizing: 'border-box',
    width: '100%',
  },

  themeSelectorSection: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '38px 24px',
  },

  themeGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(200px,1fr))',
    gap: '12px',
  },

  themeCard: {
    minHeight: '210px',
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid #ddd2c3',
    background: '#fff',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'grid',
    gap: '10px',
  },

  themeCardActive: {
    background: '#dda72c',
    borderColor: '#dda72c',
    transform: 'translateY(-2px)',
  },

  themeNumber: {
    fontSize: '11px',
    fontWeight: 900,
  },

  themeTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '22px',
  },

  themeDescription: {
    color: '#6e665e',
    fontSize: '13px',
    lineHeight: 1.5,
  },

  themeScore: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },

  workspace: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '30px 24px 70px',
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,1.2fr) minmax(330px,.8fr)',
    gap: '20px',
    alignItems: 'start',
  },

  assessmentPanel: {
    padding: '28px',
    borderRadius: '20px',
    background: '#fff',
    border: '1px solid #e2d7c9',
  },

  workspaceTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '40px',
    margin: '12px 0',
  },

  workspaceDescription: {
    color: '#6c645c',
    lineHeight: 1.7,
  },

  ratingBlock: {
    margin: '26px 0',
    padding: '20px',
    background: '#f3eee5',
    borderRadius: '14px',
  },

  ratingHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },

  slider: {
    width: '100%',
  },

  scaleText: {
    marginTop: '7px',
    color: '#796f63',
    fontSize: '12px',
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px',
    border: '1px solid #d9cebf',
    borderRadius: '11px',
    font: 'inherit',
    lineHeight: 1.6,
    resize: 'vertical',
  },

  threeColumns: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(190px,1fr))',
    gap: '12px',
    margin: '18px 0',
  },

  idealStatePanel: {
    position: 'sticky',
    top: '24px',
    padding: '28px',
    borderRadius: '20px',
    background: '#181612',
    color: '#fff',
  },

  goldLabel: {
    color: '#dda72c',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '.15em',
  },

  idealTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '34px',
    margin: '12px 0',
  },

  idealText: {
    color: 'rgba(255,255,255,.76)',
    lineHeight: 1.8,
  },

  gapCard: {
    marginTop: '24px',
    padding: '18px',
    borderRadius: '13px',
    background: 'rgba(255,255,255,.07)',
  },

  gapLabel: {
    color: '#dda72c',
    fontSize: '10px',
    fontWeight: 900,
  },

  gapScale: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: '12px',
    alignItems: 'center',
    marginTop: '14px',
  },

  arrow: {
    color: '#dda72c',
    fontSize: '28px',
  },

  summaryCard: {
    marginTop: '15px',
    padding: '18px',
    borderRadius: '13px',
    background: '#dda72c',
    color: '#17130c',
  },

  summaryLabel: {
    fontSize: '10px',
    fontWeight: 900,
    letterSpacing: '.12em',
  },

  overviewSection: {
    padding:
      '64px max(24px,calc((100vw - 1320px)/2))',
    background: '#ede6db',
  },

  overviewTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '42px',
    margin: '12px 0 30px',
  },

  profileGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(240px,1fr))',
    gap: '14px',
  },

  profileCard: {
    padding: '20px',
    borderRadius: '15px',
    background: '#fff',
  },

  profileNumber: {
    color: '#9a7015',
    fontSize: '11px',
    fontWeight: 900,
  },

  profileScore: {
    display: 'block',
    fontSize: '28px',
    margin: '12px 0',
  },

  bar: {
    height: '8px',
    borderRadius: '999px',
    background: '#e8e0d5',
    overflow: 'hidden',
  },

  barFill: {
    height: '100%',
    background: '#dda72c',
  },

  profileText: {
    color: '#6f675d',
    lineHeight: 1.6,
    fontSize: '13px',
  },

  nextSection: {
    padding:
      '56px max(24px,calc((100vw - 1320px)/2))',
    background: '#171612',
    color: '#fff',
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,1fr) auto',
    gap: '30px',
    alignItems: 'center',
  },

  nextTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '40px',
  },

  nextText: {
    maxWidth: '760px',
    color: 'rgba(255,255,255,.7)',
    lineHeight: 1.7,
  },

  nextButton: {
    padding: '15px 20px',
    borderRadius: '10px',
    background: '#dda72c',
    color: '#17130c',
    textDecoration: 'none',
    fontWeight: 900,
  },
};
