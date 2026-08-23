'use client';

import { useMemo, useState } from 'react';
import ToolkitClient from '@/components/ToolkitClient';

const challenges = [
  {
    id: 'direction',
    title: 'Strategic Direction',
    description: 'Clarify priorities, choices and the next move.',
    icon: '◆',
  },
  {
    id: 'conversation',
    title: 'Difficult Conversations',
    description: 'Prepare to speak with courage, clarity and respect.',
    icon: '◇',
  },
  {
    id: 'people',
    title: 'Leading People',
    description: 'Strengthen influence, trust and accountability.',
    icon: '◉',
  },
  {
    id: 'decision',
    title: 'Decision Making',
    description: 'Think through an important executive decision.',
    icon: '◎',
  },
  {
    id: 'self',
    title: 'Personal Effectiveness',
    description: 'Protect focus, energy and disciplined execution.',
    icon: '◐',
  },
  {
    id: 'purpose',
    title: 'Purpose & Values',
    description: 'Reconnect daily leadership with what matters most.',
    icon: '✦',
  },
];

const differentiators = [
  'Authentic',
  'Courageous',
  'Transformational',
  'Confident',
  'Bold',
  'Reliable',
  'Trustworthy',
  'Ambitious',
  'Purposeful',
  'Values-driven',
  'Inspirational',
  'Accountable',
  'Disciplined',
  'Resilient',
  'Intentional',
  'Self-Aware',
  'Open-Minded',
  'Decisive',
  'Collaborative',
  'Intuitive',
];

const phrases = [
  'Worry ends when faith begins',
  'Set the tone',
  'Trust your gut',
  'Choose wisely',
  'Courage is not the volume of your voice',
  'Conserve your energy and know what to overlook',
  'Plant a seed and own your legacy',
  'Speak your truth and enjoy a liberated conscience',
  'Make reliability a reality',
  'Your daily routine determines your success',
  'Embrace greatness',
  'Dare to be different and dare to be you',
  'Immerse yourself in your purpose',
  'Stand by your truth',
  'Action generates momentum',
];

const colourPalette = [
  '#D8A12B',
  '#1F5E45',
  '#203A5F',
  '#713F59',
  '#A44A3F',
  '#5C4E8A',
  '#477A7B',
  '#8C6A32',
];

export default function ToolkitPage() {
  const [challenge, setChallenge] = useState('');
  const [differentiator, setDifferentiator] = useState('');
  const [phrase, setPhrase] = useState('');
  const [commitment, setCommitment] = useState('');
  const [deadline, setDeadline] = useState('');
  const [evidence, setEvidence] = useState('');
  const [saved, setSaved] = useState(false);

  const selectedChallenge = useMemo(
    () => challenges.find((item) => item.id === challenge),
    [challenge]
  );

  function surpriseMe() {
    const randomChallenge =
      challenges[Math.floor(Math.random() * challenges.length)];
    const randomDifferentiator =
      differentiators[Math.floor(Math.random() * differentiators.length)];
    const randomPhrase =
      phrases[Math.floor(Math.random() * phrases.length)];

    setChallenge(randomChallenge.id);
    setDifferentiator(randomDifferentiator);
    setPhrase(randomPhrase);
    setSaved(false);
  }

  function saveSession() {
    setSaved(true);
  }

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroGlowOne} />
        <div style={styles.heroGlowTwo} />

        <div style={styles.heroInner}>
          <div style={styles.heroCopy}>
            <span style={styles.eyebrow}>EXECUTIVE LEADERSHIP STUDIO</span>

            <h1 style={styles.heroTitle}>
              What do you want to work on today?
            </h1>

            <p style={styles.heroText}>
              Choose a leadership challenge. Inspired to Succeed™ will guide
              you from reflection to a clear executive commitment.
            </p>

            <div style={styles.heroButtons}>
              <a href="#studio" style={styles.goldButton}>
                Begin my session
              </a>

              <button
                type="button"
                onClick={surpriseMe}
                style={styles.ghostButton}
              >
                ✦ Surprise me
              </button>
            </div>
          </div>

          <div style={styles.heroCard}>
            <span style={styles.heroCardLabel}>TODAY&apos;S INVITATION</span>
            <div style={styles.quoteMark}>“</div>
            <p style={styles.heroQuote}>Action generates momentum.</p>
            <p style={styles.heroCardText}>
              One deliberate leadership action today can change the direction
              of an entire week.
            </p>
          </div>
        </div>
      </section>

      <section id="studio" style={styles.section}>
        <div style={styles.sectionHeading}>
          <div>
            <span style={styles.sectionEyebrow}>01 · CHOOSE YOUR FOCUS</span>
            <h2 style={styles.sectionTitle}>Your executive challenge</h2>
          </div>

          <span style={styles.stepBadge}>Step 1 of 4</span>
        </div>

        <div style={styles.challengeGrid}>
          {challenges.map((item) => {
            const active = challenge === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setChallenge(item.id);
                  setSaved(false);
                }}
                style={{
                  ...styles.challengeCard,
                  ...(active ? styles.challengeCardActive : {}),
                }}
              >
                <span
                  style={{
                    ...styles.challengeIcon,
                    ...(active ? styles.challengeIconActive : {}),
                  }}
                >
                  {item.icon}
                </span>

                <strong style={styles.challengeTitle}>{item.title}</strong>

                <span style={styles.challengeDescription}>
                  {item.description}
                </span>

                <span style={styles.challengeAction}>
                  {active ? 'Selected ✓' : 'Choose focus →'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section style={styles.darkSection}>
        <div style={styles.sectionHeadingDark}>
          <div>
            <span style={styles.sectionEyebrowGold}>
              02 · WHO DO YOU NEED TO BE?
            </span>
            <h2 style={styles.sectionTitleLight}>
              Choose your leadership differentiator
            </h2>
            <p style={styles.sectionTextLight}>
              Select the quality you most need to demonstrate in this
              situation.
            </p>
          </div>

          <span style={styles.stepBadgeDark}>Step 2 of 4</span>
        </div>

        <div style={styles.differentiatorGrid}>
          {differentiators.map((item, index) => {
            const active = differentiator === item;
            const colour = colourPalette[index % colourPalette.length];

            return (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setDifferentiator(item);
                  setSaved(false);
                }}
                style={{
                  ...styles.differentiatorCard,
                  background: active ? colour : 'rgba(255,255,255,0.06)',
                  borderColor: active ? colour : 'rgba(255,255,255,0.13)',
                  transform: active ? 'translateY(-4px)' : 'none',
                }}
              >
                <span style={styles.differentiatorNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <strong style={styles.differentiatorText}>{item}</strong>

                <span style={styles.differentiatorSelect}>
                  {active ? 'My focus ✓' : 'Select'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeading}>
          <div>
            <span style={styles.sectionEyebrow}>03 · ALIGN YOUR THINKING</span>
            <h2 style={styles.sectionTitle}>Choose the phrase that speaks to you</h2>
            <p style={styles.sectionText}>
              These are not quotations to read and forget. Choose one that
              should shape your action today.
            </p>
          </div>

          <span style={styles.stepBadge}>Step 3 of 4</span>
        </div>

        <div style={styles.phraseGrid}>
          {phrases.map((item, index) => {
            const active = phrase === item;

            return (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setPhrase(item);
                  setSaved(false);
                }}
                style={{
                  ...styles.phraseCard,
                  ...(active ? styles.phraseCardActive : {}),
                }}
              >
                <span style={styles.phraseNumber}>
                  INSIGHT {String(index + 1).padStart(2, '0')}
                </span>

                <span style={styles.phraseQuote}>“{item}”</span>

                <span style={styles.phraseAction}>
                  {active ? 'Selected ✓' : 'This resonates with me →'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section style={styles.commitmentSection}>
        <div style={styles.commitmentInner}>
          <div style={styles.commitmentIntro}>
            <span style={styles.sectionEyebrowGold}>
              04 · TURN INSIGHT INTO ACTION
            </span>

            <h2 style={styles.commitmentTitle}>Make an executive promise</h2>

            <p style={styles.commitmentText}>
              Leadership development becomes valuable when reflection produces
              a deliberate action that can be reviewed.
            </p>

            <div style={styles.sessionSummary}>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Challenge</span>
                <strong style={styles.summaryValue}>
                  {selectedChallenge?.title || 'Not selected yet'}
                </strong>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Differentiator</span>
                <strong style={styles.summaryValue}>
                  {differentiator || 'Not selected yet'}
                </strong>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Aligning phrase</span>
                <strong style={styles.summaryValue}>
                  {phrase || 'Not selected yet'}
                </strong>
              </div>
            </div>
          </div>

          <div style={styles.commitmentForm}>
            <label style={styles.label}>
              What will you do differently?
              <textarea
                value={commitment}
                onChange={(event) => {
                  setCommitment(event.target.value);
                  setSaved(false);
                }}
                placeholder="Example: I will hold the conversation I have been avoiding and clarify responsibilities with my executive team."
                style={styles.textarea}
              />
            </label>

            <div style={styles.twoColumn}>
              <label style={styles.label}>
                By when?
                <input
                  value={deadline}
                  onChange={(event) => {
                    setDeadline(event.target.value);
                    setSaved(false);
                  }}
                  placeholder="Friday, 16:00"
                  style={styles.input}
                />
              </label>

              <label style={styles.label}>
                What will success look like?
                <input
                  value={evidence}
                  onChange={(event) => {
                    setEvidence(event.target.value);
                    setSaved(false);
                  }}
                  placeholder="Clear agreement and next actions"
                  style={styles.input}
                />
              </label>
            </div>

            <button
              type="button"
              onClick={saveSession}
              style={styles.goldButtonWide}
            >
              Save my leadership commitment
            </button>

            {saved && (
              <div style={styles.savedMessage}>
                <span style={styles.savedTick}>✓</span>

                <div>
                  <strong style={styles.savedTitle}>
                    Your leadership commitment is ready.
                  </strong>

                  <p style={styles.savedText}>
                    You have converted today&apos;s reflection into a clear
                    action. Review this commitment at your next check-in.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={styles.resultSection}>
        <div style={styles.resultCard}>
          <div>
            <span style={styles.sectionEyebrow}>YOUR EXECUTIVE INSIGHT</span>

            <h2 style={styles.resultTitle}>
              {differentiator
                ? `${differentiator} leadership in action`
                : 'Your leadership insight will appear here'}
            </h2>

            <p style={styles.resultText}>
              {challenge && differentiator && phrase
                ? `You identified ${differentiator} as the leadership quality needed to address ${selectedChallenge?.title.toLowerCase()}. Your aligning thought is “${phrase}”.`
                : 'Choose your challenge, differentiator and aligning phrase to build a personalised leadership focus.'}
            </p>

            {commitment && (
              <div style={styles.resultCommitment}>
                <span style={styles.resultCommitmentLabel}>
                  YOUR COMMITMENT
                </span>

                <strong style={styles.resultCommitmentText}>
                  {commitment}
                </strong>

                {deadline && (
                  <span style={styles.resultMeta}>Review by: {deadline}</span>
                )}

                {evidence && (
                  <span style={styles.resultMeta}>
                    Success evidence: {evidence}
                  </span>
                )}
              </div>
            )}
          </div>

          <div style={styles.resultScore}>
            <span style={styles.resultScoreSmall}>TODAY&apos;S FOCUS</span>
            <strong style={styles.resultScoreWord}>
              {differentiator || '—'}
            </strong>
            <span style={styles.resultScoreSmall}>
              REFLECT · COMMIT · ACT
            </span>
          </div>
        </div>
      </section>

      <section style={styles.existingToolkit}>
        <div style={styles.existingToolkitHeader}>
          <span style={styles.sectionEyebrow}>DEEPER REFLECTION</span>
          <h2 style={styles.existingToolkitTitle}>
            Continue into your leadership reflection
          </h2>
          <p style={styles.sectionText}>
            Use the structured reflection workspace below when you want to
            explore a competency in greater depth and retain development
            evidence.
          </p>
        </div>

        <ToolkitClient />
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f7f4ee',
    color: '#231f20',
  },

  hero: {
    position: 'relative',
    overflow: 'hidden',
    background:
      'linear-gradient(135deg, #111111 0%, #1f1d1a 48%, #2f2514 100%)',
    color: '#ffffff',
    padding: '86px 24px 78px',
  },

  heroGlowOne: {
    position: 'absolute',
    width: '430px',
    height: '430px',
    borderRadius: '50%',
    background: 'rgba(216,161,43,0.18)',
    filter: 'blur(50px)',
    top: '-180px',
    right: '-60px',
  },

  heroGlowTwo: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(216,161,43,0.08)',
    filter: 'blur(60px)',
    bottom: '-180px',
    left: '20%',
  },

  heroInner: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1380px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.3fr) minmax(320px, 0.7fr)',
    gap: '64px',
    alignItems: 'center',
  },

  heroCopy: {
    maxWidth: '800px',
  },

  eyebrow: {
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: 800,
    letterSpacing: '0.2em',
    color: '#d8a12b',
    marginBottom: '18px',
  },

  heroTitle: {
    margin: 0,
    fontSize: 'clamp(42px, 6vw, 78px)',
    lineHeight: 0.98,
    letterSpacing: '-0.045em',
    maxWidth: '820px',
  },

  heroText: {
    maxWidth: '720px',
    margin: '28px 0 0',
    fontSize: '20px',
    lineHeight: 1.65,
    color: 'rgba(255,255,255,0.74)',
  },

  heroButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
    marginTop: '34px',
  },

  goldButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '52px',
    padding: '0 24px',
    borderRadius: '14px',
    background: '#d8a12b',
    color: '#15120d',
    textDecoration: 'none',
    fontWeight: 800,
    border: '1px solid #d8a12b',
    cursor: 'pointer',
  },

  ghostButton: {
    minHeight: '52px',
    padding: '0 24px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.06)',
    color: '#ffffff',
    fontWeight: 700,
    border: '1px solid rgba(255,255,255,0.18)',
    cursor: 'pointer',
  },

  heroCard: {
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.13)',
    background:
      'linear-gradient(145deg, rgba(255,255,255,0.09), rgba(255,255,255,0.035))',
    boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
    borderRadius: '28px',
    padding: '38px',
    backdropFilter: 'blur(12px)',
  },

  heroCardLabel: {
    color: '#d8a12b',
    fontWeight: 800,
    fontSize: '12px',
    letterSpacing: '0.18em',
  },

  quoteMark: {
    fontSize: '78px',
    color: '#d8a12b',
    height: '58px',
    lineHeight: 1,
    marginTop: '22px',
  },

  heroQuote: {
    fontFamily: 'Georgia, serif',
    fontSize: '34px',
    lineHeight: 1.25,
    margin: '0 0 20px',
  },

  heroCardText: {
    color: 'rgba(255,255,255,0.68)',
    lineHeight: 1.65,
    margin: 0,
  },

  section: {
    maxWidth: '1380px',
    margin: '0 auto',
    padding: '78px 24px',
  },

  sectionHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '32px',
    marginBottom: '34px',
  },

  sectionEyebrow: {
    display: 'inline-block',
    color: '#9a6a0a',
    fontSize: '12px',
    fontWeight: 900,
    letterSpacing: '0.17em',
    marginBottom: '12px',
  },

  sectionEyebrowGold: {
    display: 'inline-block',
    color: '#d8a12b',
    fontSize: '12px',
    fontWeight: 900,
    letterSpacing: '0.17em',
    marginBottom: '12px',
  },

  sectionTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(32px, 4vw, 50px)',
    lineHeight: 1.08,
    margin: 0,
  },

  sectionTitleLight: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(32px, 4vw, 50px)',
    lineHeight: 1.08,
    margin: 0,
    color: '#ffffff',
  },

  sectionText: {
    color: '#6b6258',
    fontSize: '17px',
    lineHeight: 1.7,
    maxWidth: '760px',
  },

  sectionTextLight: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: '17px',
    lineHeight: 1.7,
    maxWidth: '760px',
  },

  stepBadge: {
    background: '#ece4d5',
    color: '#745614',
    padding: '10px 14px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 800,
    whiteSpace: 'nowrap',
  },

  stepBadgeDark: {
    background: 'rgba(216,161,43,0.14)',
    color: '#e5b649',
    border: '1px solid rgba(216,161,43,0.22)',
    padding: '10px 14px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 800,
    whiteSpace: 'nowrap',
  },

  challengeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '18px',
  },

  challengeCard: {
    textAlign: 'left',
    border: '1px solid #ded6ca',
    borderRadius: '20px',
    background: '#ffffff',
    padding: '26px',
    minHeight: '210px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(40,31,19,0.035)',
    transition: 'all 0.2s ease',
  },

  challengeCardActive: {
    borderColor: '#d8a12b',
    boxShadow: '0 18px 44px rgba(216,161,43,0.18)',
    transform: 'translateY(-4px)',
  },

  challengeIcon: {
    display: 'grid',
    placeItems: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '13px',
    background: '#f3efe7',
    color: '#9a6a0a',
    fontSize: '22px',
    marginBottom: '24px',
  },

  challengeIconActive: {
    background: '#d8a12b',
    color: '#17130e',
  },

  challengeTitle: {
    fontSize: '19px',
    marginBottom: '8px',
  },

  challengeDescription: {
    color: '#756d64',
    lineHeight: 1.55,
    flex: 1,
  },

  challengeAction: {
    marginTop: '20px',
    color: '#9a6a0a',
    fontSize: '13px',
    fontWeight: 800,
  },

  darkSection: {
    background: '#171717',
    padding: '78px max(24px, calc((100vw - 1380px) / 2))',
  },

  sectionHeadingDark: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '32px',
    marginBottom: '34px',
  },

  differentiatorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(205px, 1fr))',
    gap: '14px',
  },

  differentiatorCard: {
    position: 'relative',
    minHeight: '170px',
    border: '1px solid rgba(255,255,255,0.13)',
    borderRadius: '19px',
    padding: '20px',
    color: '#ffffff',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease',
  },

  differentiatorNumber: {
    color: 'rgba(255,255,255,0.42)',
    fontSize: '11px',
    letterSpacing: '0.14em',
    fontWeight: 700,
  },

  differentiatorText: {
    fontSize: '21px',
    lineHeight: 1.2,
  },

  differentiatorSelect: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '12px',
    fontWeight: 700,
  },

  phraseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '18px',
  },

  phraseCard: {
    minHeight: '240px',
    border: '1px solid #222222',
    borderRadius: '21px',
    background: '#111111',
    color: '#ffffff',
    padding: '28px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  phraseCardActive: {
    borderColor: '#d8a12b',
    boxShadow: '0 20px 50px rgba(216,161,43,0.2)',
    transform: 'translateY(-4px)',
  },

  phraseNumber: {
    color: '#d8a12b',
    fontSize: '11px',
    letterSpacing: '0.15em',
    fontWeight: 800,
  },

  phraseQuote: {
    fontFamily: 'Georgia, serif',
    fontSize: '25px',
    lineHeight: 1.35,
    margin: '28px 0',
    flex: 1,
  },

  phraseAction: {
    color: 'rgba(255,255,255,0.58)',
    fontSize: '12px',
    fontWeight: 700,
  },

  commitmentSection: {
    background: '#221d16',
    color: '#ffffff',
    padding: '80px 24px',
  },

  commitmentInner: {
    maxWidth: '1380px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
    gap: '60px',
  },

  commitmentTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(36px, 4vw, 54px)',
    margin: '0 0 20px',
  },

  commitmentText: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: '17px',
    lineHeight: 1.7,
  },

  sessionSummary: {
    marginTop: '34px',
    borderTop: '1px solid rgba(255,255,255,0.12)',
  },

  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px',
    padding: '17px 0',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
  },

  summaryLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.09em',
  },

  summaryValue: {
    textAlign: 'right',
    color: '#f0cf82',
  },

  commitmentForm: {
    background: '#ffffff',
    color: '#231f20',
    padding: '34px',
    borderRadius: '25px',
  },

  label: {
    display: 'grid',
    gap: '9px',
    fontSize: '13px',
    fontWeight: 800,
    marginBottom: '19px',
  },

  textarea: {
    width: '100%',
    minHeight: '150px',
    resize: 'vertical',
    border: '1px solid #dad1c5',
    borderRadius: '14px',
    padding: '16px',
    font: 'inherit',
    fontWeight: 400,
    outline: 'none',
    boxSizing: 'border-box',
  },

  input: {
    width: '100%',
    border: '1px solid #dad1c5',
    borderRadius: '14px',
    padding: '15px',
    font: 'inherit',
    fontWeight: 400,
    outline: 'none',
    boxSizing: 'border-box',
  },

  twoColumn: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },

  goldButtonWide: {
    width: '100%',
    minHeight: '54px',
    border: 0,
    borderRadius: '14px',
    background: '#d8a12b',
    color: '#18130b',
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: '15px',
  },

  savedMessage: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start',
    marginTop: '18px',
    background: '#edf6ef',
    border: '1px solid #cce1d0',
    borderRadius: '14px',
    padding: '16px',
  },

  savedTick: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    background: '#276749',
    color: '#ffffff',
    flex: '0 0 auto',
  },

  savedTitle: {
    color: '#235b3d',
  },

  savedText: {
    margin: '5px 0 0',
    color: '#557060',
    lineHeight: 1.5,
    fontSize: '13px',
  },

  resultSection: {
    padding: '76px 24px',
    background: '#f7f4ee',
  },

  resultCard: {
    maxWidth: '1380px',
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '28px',
    border: '1px solid #ded6ca',
    boxShadow: '0 20px 60px rgba(46,34,19,0.07)',
    padding: '38px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.25fr) minmax(260px, 0.75fr)',
    gap: '50px',
    alignItems: 'stretch',
  },

  resultTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(30px, 4vw, 48px)',
    margin: '0 0 17px',
  },

  resultText: {
    color: '#6c645b',
    fontSize: '17px',
    lineHeight: 1.7,
  },

  resultCommitment: {
    marginTop: '28px',
    padding: '23px',
    borderRadius: '17px',
    background: '#f4efe6',
    display: 'grid',
    gap: '9px',
  },

  resultCommitmentLabel: {
    color: '#9a6a0a',
    letterSpacing: '0.14em',
    fontWeight: 900,
    fontSize: '11px',
  },

  resultCommitmentText: {
    fontSize: '17px',
    lineHeight: 1.45,
  },

  resultMeta: {
    color: '#766c61',
    fontSize: '12px',
  },

  resultScore: {
    borderRadius: '22px',
    background:
      'linear-gradient(145deg, #171717 0%, #2a241c 100%)',
    color: '#ffffff',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },

  resultScoreSmall: {
    color: '#d8a12b',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '0.15em',
  },

  resultScoreWord: {
    fontFamily: 'Georgia, serif',
    fontSize: '34px',
    margin: '23px 0',
  },

  existingToolkit: {
    maxWidth: '1380px',
    margin: '0 auto',
    padding: '70px 24px 100px',
  },

  existingToolkitHeader: {
    marginBottom: '30px',
  },

  existingToolkitTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(30px, 4vw, 46px)',
    margin: '0 0 14px',
  },
};
