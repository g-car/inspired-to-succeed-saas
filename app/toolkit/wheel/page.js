'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const themes = [
  {
    id: 'values',
    number: '01',
    title: 'Values Driven',
    current: 3,
    desired: 5,
  },
  {
    id: 'culture',
    number: '02',
    title: 'Cultural Competence',
    current: 3,
    desired: 5,
  },
  {
    id: 'performance',
    number: '03',
    title: 'Performance Centred',
    current: 3,
    desired: 5,
  },
  {
    id: 'strategy',
    number: '04',
    title: 'Strategic & Integrative',
    current: 3,
    desired: 5,
  },
  {
    id: 'people',
    number: '05',
    title: 'People Oriented',
    current: 3,
    desired: 5,
  },
  {
    id: 'personal',
    number: '06',
    title: 'Personal Development',
    current: 3,
    desired: 5,
  },
];

function PolarPoint(cx, cy, radius, angleDegrees) {
  const angle = ((angleDegrees - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function polygonPoints(values, maxValue = 5) {
  const cx = 250;
  const cy = 250;
  const maxRadius = 175;

  return values
    .map((value, index) => {
      const angle = (360 / values.length) * index;
      const radius = (value / maxValue) * maxRadius;
      const point = PolarPoint(cx, cy, radius, angle);
      return `${point.x},${point.y}`;
    })
    .join(' ');
}

export default function WheelOfSuccessPage() {
  const [scores, setScores] = useState(
    themes.reduce((acc, theme) => {
      acc[theme.id] = theme.current;
      return acc;
    }, {})
  );

  const currentValues = themes.map(
    (theme) => scores[theme.id]
  );

  const desiredValues = themes.map(
    (theme) => theme.desired
  );

  const average = useMemo(() => {
    const total = currentValues.reduce(
      (sum, value) => sum + value,
      0
    );

    return (total / currentValues.length).toFixed(1);
  }, [currentValues]);

  function updateScore(themeId, value) {
    setScores((previous) => ({
      ...previous,
      [themeId]: Number(value),
    }));
  }

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <Link href="/toolkit/assessment" style={styles.back}>
          ← Back to Leadership Assessment
        </Link>

        <span style={styles.eyebrow}>
          04 · WHEEL OF SUCCESS
        </span>

        <h1 style={styles.heroTitle}>
          See your leadership journey in one picture.
        </h1>

        <p style={styles.heroText}>
          Your Wheel of Success brings the six leadership themes
          together into one visual profile, helping you see where you
          are strongest, where the gaps remain and where your
          development attention should go next.
        </p>

        <div style={styles.heroStats}>
          <div style={styles.stat}>
            <span>Current average</span>
            <strong>{average}/5</strong>
          </div>

          <div style={styles.stat}>
            <span>Desired state</span>
            <strong>5/5</strong>
          </div>

          <div style={styles.stat}>
            <span>Leadership themes</span>
            <strong>6</strong>
          </div>
        </div>
      </section>

      <section style={styles.visualSection}>
        <div style={styles.chartPanel}>
          <span style={styles.sectionLabel}>
            YOUR LEADERSHIP PROFILE
          </span>

          <h2 style={styles.sectionTitle}>
            Current State vs Ideal State
          </h2>

          <div style={styles.chartWrap}>
            <svg
              viewBox="0 0 500 500"
              style={styles.chart}
              role="img"
              aria-label="Wheel of Success leadership profile"
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <polygon
                  key={level}
                  points={polygonPoints(
                    themes.map(() => level)
                  )}
                  fill="none"
                  stroke="#ddd4c8"
                  strokeWidth="1"
                />
              ))}

              {themes.map((theme, index) => {
                const outer = PolarPoint(
                  250,
                  250,
                  175,
                  (360 / themes.length) * index
                );

                return (
                  <line
                    key={theme.id}
                    x1="250"
                    y1="250"
                    x2={outer.x}
                    y2={outer.y}
                    stroke="#ddd4c8"
                    strokeWidth="1"
                  />
                );
              })}

              <polygon
                points={polygonPoints(desiredValues)}
                fill="rgba(221,167,44,0.10)"
                stroke="#dda72c"
                strokeWidth="3"
                strokeDasharray="8 6"
              />

              <polygon
                points={polygonPoints(currentValues)}
                fill="rgba(24,22,18,0.18)"
                stroke="#181612"
                strokeWidth="4"
              />

              {themes.map((theme, index) => {
                const point = PolarPoint(
                  250,
                  250,
                  212,
                  (360 / themes.length) * index
                );

                return (
                  <text
                    key={theme.id}
                    x={point.x}
                    y={point.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill="#463f37"
                  >
                    {theme.title}
                  </text>
                );
              })}
            </svg>
          </div>

          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <span style={styles.currentDot} />
              Current state
            </div>

            <div style={styles.legendItem}>
              <span style={styles.desiredDot} />
              Ideal state
            </div>
          </div>
        </div>

        <div style={styles.analysisPanel}>
          <span style={styles.sectionLabel}>
            DEVELOPMENT INTERPRETATION
          </span>

          <h2 style={styles.analysisTitle}>
            What is your wheel telling you?
          </h2>

          <p style={styles.analysisText}>
            A balanced wheel suggests consistency across your
            leadership practice. A distorted wheel indicates areas
            where capability, confidence or behaviour require greater
            attention.
          </p>

          <div style={styles.themeSummaryList}>
            {themes.map((theme) => {
              const score = scores[theme.id];

              let message =
                'This is currently a major development priority.';

              if (score === 3) {
                message =
                  'You have a developing foundation, but greater consistency is needed.';
              }

              if (score === 4) {
                message =
                  'This is a strong area. Focus on consistency and visible impact.';
              }

              if (score === 5) {
                message =
                  'This is currently an established leadership strength.';
              }

              return (
                <div
                  key={theme.id}
                  style={styles.themeSummary}
                >
                  <div>
                    <span style={styles.themeNumber}>
                      {theme.number}
                    </span>

                    <strong>{theme.title}</strong>
                  </div>

                  <div style={styles.themeScore}>
                    <strong>{score}/5</strong>
                    <span>{message}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={styles.adjustSection}>
        <span style={styles.sectionLabel}>
          REVIEW YOUR CURRENT STATE
        </span>

        <h2 style={styles.sectionTitle}>
          Adjust the six-theme profile
        </h2>

        <p style={styles.adjustIntro}>
          For now, you can review or adjust the scores below. In the
          final connected version, these values should be populated
          automatically from the six-theme Leadership Assessment.
        </p>

        <div style={styles.sliderGrid}>
          {themes.map((theme) => (
            <div
              key={theme.id}
              style={styles.sliderCard}
            >
              <div style={styles.sliderHeading}>
                <div>
                  <span style={styles.themeNumber}>
                    {theme.number}
                  </span>

                  <strong>{theme.title}</strong>
                </div>

                <strong style={styles.bigScore}>
                  {scores[theme.id]}/5
                </strong>
              </div>

              <input
                type="range"
                min="1"
                max="5"
                value={scores[theme.id]}
                onChange={(event) =>
                  updateScore(theme.id, event.target.value)
                }
                style={styles.slider}
              />

              <div style={styles.sliderLabels}>
                <span>Development priority</span>
                <span>Ideal state</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.commitmentSection}>
        <div>
          <span style={styles.goldLabel}>
            TURN INSIGHT INTO ACTION
          </span>

          <h2 style={styles.commitmentTitle}>
            Your wheel is not a scorecard. It is a development map.
          </h2>

          <p style={styles.commitmentText}>
            Use the gaps in your wheel to decide which leadership
            behaviours require deliberate attention over the next
            30, 60 and 90 days.
          </p>
        </div>

        <Link
          href="/toolkit/commitments"
          style={styles.nextButton}
        >
          Build My Commitments →
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

  visualSection: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '64px 24px',
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,1.15fr) minmax(340px,.85fr)',
    gap: '22px',
    alignItems: 'start',
  },

  chartPanel: {
    padding: '28px',
    borderRadius: '20px',
    background: '#fff',
    border: '1px solid #e2d7c9',
  },

  analysisPanel: {
    padding: '28px',
    borderRadius: '20px',
    background: '#181612',
    color: '#fff',
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
    margin: '12px 0 20px',
  },

  chartWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  chart: {
    width: '100%',
    maxWidth: '650px',
    height: 'auto',
    overflow: 'visible',
  },

  legend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '18px',
  },

  legendItem: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    fontSize: '13px',
  },

  currentDot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: '#181612',
  },

  desiredDot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    border: '3px solid #dda72c',
    background: 'transparent',
  },

  analysisTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '34px',
    margin: '12px 0',
  },

  analysisText: {
    color: 'rgba(255,255,255,.72)',
    lineHeight: 1.7,
  },

  themeSummaryList: {
    display: 'grid',
    gap: '10px',
    marginTop: '24px',
  },

  themeSummary: {
    padding: '14px',
    borderRadius: '11px',
    background: 'rgba(255,255,255,.07)',
    display: 'grid',
    gap: '8px',
  },

  themeNumber: {
    display: 'block',
    color: '#dda72c',
    fontSize: '10px',
    fontWeight: 900,
    marginBottom: '4px',
  },

  themeScore: {
    display: 'grid',
    gap: '3px',
    color: 'rgba(255,255,255,.7)',
    fontSize: '12px',
  },

  adjustSection: {
    padding:
      '64px max(24px,calc((100vw - 1320px)/2))',
    background: '#ede6db',
  },

  adjustIntro: {
    maxWidth: '800px',
    color: '#6b635a',
    lineHeight: 1.7,
    marginBottom: '28px',
  },

  sliderGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(300px,1fr))',
    gap: '14px',
  },

  sliderCard: {
    padding: '20px',
    borderRadius: '15px',
    background: '#fff',
    border: '1px solid #dfd3c3',
  },

  sliderHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    alignItems: 'center',
  },

  bigScore: {
    fontFamily: 'Georgia,serif',
    fontSize: '28px',
  },

  slider: {
    width: '100%',
    marginTop: '18px',
  },

  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '6px',
    color: '#786f64',
    fontSize: '11px',
  },

  commitmentSection: {
    padding:
      '60px max(24px,calc((100vw - 1320px)/2))',
    background: '#171612',
    color: '#fff',
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,1fr) auto',
    gap: '30px',
    alignItems: 'center',
  },

  commitmentTitle: {
    maxWidth: '780px',
    fontFamily: 'Georgia,serif',
    fontSize: '40px',
    lineHeight: 1.15,
  },

  commitmentText: {
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
