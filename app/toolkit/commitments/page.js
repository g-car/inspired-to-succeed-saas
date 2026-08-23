'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const themes = [
  'Values Driven',
  'Cultural Competence',
  'Performance Centred',
  'Strategic & Integrative',
  'People Oriented',
  'Personal Development',
];

const timeframes = [
  {
    key: '30',
    label: '30 Days',
    purpose: 'Immediate behaviour change',
    description:
      'Choose the first visible action that will begin closing your leadership gap.',
  },
  {
    key: '60',
    label: '60 Days',
    purpose: 'Build consistency',
    description:
      'Strengthen the behaviour, routine or practice until it becomes more dependable.',
  },
  {
    key: '90',
    label: '90 Days',
    purpose: 'Demonstrate measurable progress',
    description:
      'Show evidence that the new behaviour is improving your leadership impact.',
  },
];

export default function CommitmentsPage() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const [commitments, setCommitments] = useState({
    30: {
      action: '',
      why: '',
      measure: '',
      support: '',
    },
    60: {
      action: '',
      why: '',
      measure: '',
      support: '',
    },
    90: {
      action: '',
      why: '',
      measure: '',
      support: '',
    },
  });

  const [executivePromise, setExecutivePromise] = useState('');

  const completed = useMemo(() => {
    let count = 0;

    Object.values(commitments).forEach((item) => {
      if (item.action.trim()) count++;
    });

    if (executivePromise.trim()) count++;

    return count;
  }, [commitments, executivePromise]);

  function updateCommitment(period, field, value) {
    setCommitments((previous) => ({
      ...previous,
      [period]: {
        ...previous[period],
        [field]: value,
      },
    }));
  }

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <Link href="/toolkit/wheel" style={styles.back}>
          ← Back to Wheel of Success
        </Link>

        <span style={styles.eyebrow}>
          05 · LEADERSHIP COMMITMENTS
        </span>

        <h1 style={styles.heroTitle}>
          Turn reflection into visible action.
        </h1>

        <p style={styles.heroText}>
          Leadership development becomes meaningful when insight is
          translated into deliberate commitments that can be reviewed,
          measured and strengthened over time.
        </p>

        <div style={styles.progressBox}>
          <span>COMMITMENT PROGRESS</span>
          <strong>{completed}/4</strong>
        </div>
      </section>

      <section style={styles.themeSection}>
        <span style={styles.sectionLabel}>
          CHOOSE YOUR PRIORITY THEME
        </span>

        <h2 style={styles.sectionTitle}>
          Where will you focus first?
        </h2>

        <p style={styles.intro}>
          Select the leadership theme that requires the most deliberate
          attention based on your Wheel of Success and six-theme assessment.
        </p>

        <div style={styles.themeGrid}>
          {themes.map((theme, index) => {
            const selected = selectedTheme === theme;

            return (
              <button
                type="button"
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                style={{
                  ...styles.themeCard,
                  ...(selected ? styles.themeCardSelected : {}),
                }}
              >
                <span style={styles.themeNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <strong>{theme}</strong>
              </button>
            );
          })}
        </div>
      </section>

      <section style={styles.commitmentSection}>
        <div style={styles.headingBlock}>
          <span style={styles.sectionLabel}>
            DEVELOPMENT PRIORITY
          </span>

          <h2 style={styles.sectionTitle}>
            {selectedTheme}
          </h2>

          <p style={styles.intro}>
            Build a realistic pathway from intention to action. Each
            commitment should be specific enough to observe and review.
          </p>
        </div>

        <div style={styles.timelineGrid}>
          {timeframes.map((period) => (
            <article
              key={period.key}
              style={styles.timelineCard}
            >
              <div style={styles.timelineTop}>
                <span style={styles.periodBadge}>
                  {period.label}
                </span>

                <strong style={styles.periodPurpose}>
                  {period.purpose}
                </strong>
              </div>

              <p style={styles.periodDescription}>
                {period.description}
              </p>

              <label style={styles.label}>
                What will I do differently?
                <textarea
                  rows="4"
                  value={commitments[period.key].action}
                  onChange={(event) =>
                    updateCommitment(
                      period.key,
                      'action',
                      event.target.value
                    )
                  }
                  placeholder="Example: I will hold the conversation I have been avoiding and clarify responsibilities with my executive team."
                  style={styles.textarea}
                />
              </label>

              <label style={styles.label}>
                Why does this matter?
                <textarea
                  rows="3"
                  value={commitments[period.key].why}
                  onChange={(event) =>
                    updateCommitment(
                      period.key,
                      'why',
                      event.target.value
                    )
                  }
                  placeholder="What leadership gap or future state does this action address?"
                  style={styles.textarea}
                />
              </label>

              <label style={styles.label}>
                What will success look like?
                <textarea
                  rows="3"
                  value={commitments[period.key].measure}
                  onChange={(event) =>
                    updateCommitment(
                      period.key,
                      'measure',
                      event.target.value
                    )
                  }
                  placeholder="What evidence will show that progress has been made?"
                  style={styles.textarea}
                />
              </label>

              <label style={styles.label}>
                Who or what will support me?
                <textarea
                  rows="3"
                  value={commitments[period.key].support}
                  onChange={(event) =>
                    updateCommitment(
                      period.key,
                      'support',
                      event.target.value
                    )
                  }
                  placeholder="Coach, mentor, colleague, board member, routine or resource..."
                  style={styles.textarea}
                />
              </label>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.promiseSection}>
        <div>
          <span style={styles.goldLabel}>
            EXECUTIVE PROMISE
          </span>

          <h2 style={styles.promiseTitle}>
            What promise are you making to yourself?
          </h2>

          <p style={styles.promiseText}>
            Your promise should capture the leadership behaviour you intend
            to protect even when pressure, uncertainty or competing demands
            arise.
          </p>
        </div>

        <textarea
          rows="7"
          value={executivePromise}
          onChange={(event) =>
            setExecutivePromise(event.target.value)
          }
          placeholder="I commit to..."
          style={styles.promiseTextarea}
        />
      </section>

      <section style={styles.summarySection}>
        <span style={styles.sectionLabel}>
          MY 90-DAY LEADERSHIP PATHWAY
        </span>

        <h2 style={styles.summaryTitle}>
          From intention to evidence
        </h2>

        <div style={styles.summaryGrid}>
          {timeframes.map((period) => {
            const data = commitments[period.key];

            return (
              <article
                key={period.key}
                style={styles.summaryCard}
              >
                <span style={styles.summaryPeriod}>
                  {period.label}
                </span>

                <strong style={styles.summaryTheme}>
                  {selectedTheme}
                </strong>

                <div style={styles.summaryItem}>
                  <span>ACTION</span>
                  <p>
                    {data.action.trim() ||
                      'No action recorded yet.'}
                  </p>
                </div>

                <div style={styles.summaryItem}>
                  <span>SUCCESS MEASURE</span>
                  <p>
                    {data.measure.trim() ||
                      'No success measure recorded yet.'}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div style={styles.promiseCard}>
          <span style={styles.goldLabel}>
            MY EXECUTIVE PROMISE
          </span>

          <p style={styles.promiseSummary}>
            {executivePromise.trim() ||
              'Complete your executive promise above.'}
          </p>
        </div>
      </section>

      {completed === 4 && (
        <section style={styles.completeSection}>
          <div>
            <span style={styles.goldLabel}>
              COMMITMENT PATHWAY COMPLETE
            </span>

            <h2 style={styles.completeTitle}>
              Your next stage is accountability.
            </h2>

            <p style={styles.completeText}>
              You now have a 30-, 60- and 90-day development pathway and
              an executive promise. The next stage can connect these
              commitments to a mentor or coach for review and accountability.
            </p>
          </div>

          <Link
            href="/toolkit/mentor"
            style={styles.nextButton}
          >
            Continue to Mentor Review →
          </Link>
        </section>
      )}
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
    color: '#dda72c',
    textDecoration: 'none',
    fontWeight: 800,
  },

  eyebrow: {
    display: 'block',
    color: '#dda72c',
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

  progressBox: {
    marginTop: '28px',
    display: 'inline-flex',
    gap: '16px',
    padding: '14px 18px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,.08)',
  },

  themeSection: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '58px 24px 34px',
  },

  sectionLabel: {
    color: '#956b13',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '.15em',
  },

  goldLabel: {
    color: '#dda72c',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '.15em',
  },

  sectionTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '40px',
    margin: '12px 0',
  },

  intro: {
    maxWidth: '820px',
    color: '#6d655c',
    lineHeight: 1.7,
  },

  themeGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(190px,1fr))',
    gap: '12px',
    marginTop: '28px',
  },

  themeCard: {
    minHeight: '125px',
    padding: '18px',
    borderRadius: '14px',
    border: '1px solid #ddcfbb',
    background: '#fff',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'grid',
    alignContent: 'space-between',
    gap: '10px',
  },

  themeCardSelected: {
    background: '#dda72c',
    borderColor: '#dda72c',
    transform: 'translateY(-2px)',
  },

  themeNumber: {
    color: '#8a6310',
    fontSize: '10px',
    fontWeight: 900,
  },

  commitmentSection: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '36px 24px 70px',
  },

  headingBlock: {
    marginBottom: '28px',
  },

  timelineGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(300px,1fr))',
    gap: '16px',
  },

  timelineCard: {
    padding: '22px',
    borderRadius: '18px',
    background: '#fff',
    border: '1px solid #dfd3c3',
  },

  timelineTop: {
    display: 'grid',
    gap: '8px',
    marginBottom: '12px',
  },

  periodBadge: {
    width: 'fit-content',
    padding: '7px 10px',
    borderRadius: '999px',
    background: '#181612',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 900,
  },

  periodPurpose: {
    fontFamily: 'Georgia,serif',
    fontSize: '22px',
  },

  periodDescription: {
    color: '#6d655c',
    lineHeight: 1.6,
  },

  label: {
    display: 'grid',
    gap: '8px',
    marginTop: '16px',
    fontSize: '13px',
    fontWeight: 800,
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

  promiseSection: {
    padding:
      '60px max(24px,calc((100vw - 1320px)/2))',
    background: '#181612',
    color: '#fff',
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,.8fr) minmax(0,1.2fr)',
    gap: '40px',
  },

  promiseTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '40px',
  },

  promiseText: {
    color: 'rgba(255,255,255,.72)',
    lineHeight: 1.7,
  },

  promiseTextarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '16px',
    border: '1px solid rgba(255,255,255,.18)',
    borderRadius: '14px',
    background: '#fff',
    color: '#171612',
    font: 'inherit',
    lineHeight: 1.7,
  },

  summarySection: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '68px 24px',
  },

  summaryTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '44px',
  },

  summaryGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(300px,1fr))',
    gap: '14px',
    marginTop: '28px',
  },

  summaryCard: {
    padding: '22px',
    borderRadius: '16px',
    background: '#fff',
    border: '1px solid #dfd3c3',
  },

  summaryPeriod: {
    color: '#9a7015',
    fontSize: '11px',
    fontWeight: 900,
  },

  summaryTheme: {
    display: 'block',
    margin: '10px 0 20px',
    fontFamily: 'Georgia,serif',
    fontSize: '24px',
  },

  summaryItem: {
    marginTop: '14px',
  },

  summaryItem: {
    marginTop: '14px',
  },

  summaryItemSpan: {
    fontSize: '10px',
    fontWeight: 900,
  },

  promiseCard: {
    marginTop: '18px',
    padding: '24px',
    borderRadius: '16px',
    background:
      'linear-gradient(135deg,#f0dca4,#d6a02b)',
  },

  promiseSummary: {
    fontFamily: 'Georgia,serif',
    fontSize: '24px',
    lineHeight: 1.5,
  },

  completeSection: {
    padding:
      '56px max(24px,calc((100vw - 1320px)/2))',
    background: '#ede6db',
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,1fr) auto',
    gap: '30px',
    alignItems: 'center',
  },

  completeTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '40px',
  },

  completeText: {
    maxWidth: '760px',
    color: '#655e56',
    lineHeight: 1.7,
  },

  nextButton: {
    padding: '15px 20px',
    borderRadius: '10px',
    background: '#171612',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 900,
  },
};
