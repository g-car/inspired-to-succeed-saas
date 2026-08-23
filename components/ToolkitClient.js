'use client';

import { useMemo, useState } from 'react';
import ToolkitClient from '@/components/ToolkitClient';

const challenges = [
  {
    id: 'direction',
    title: 'Strategic Direction',
    description: 'Clarify priorities, choices and the next move.',
  },
  {
    id: 'conversation',
    title: 'Difficult Conversations',
    description: 'Prepare to speak with courage, clarity and respect.',
  },
  {
    id: 'people',
    title: 'Leading People',
    description: 'Strengthen influence, trust and accountability.',
  },
  {
    id: 'decision',
    title: 'Decision Making',
    description: 'Think through an important executive decision.',
  },
  {
    id: 'self',
    title: 'Personal Effectiveness',
    description: 'Protect focus, energy and disciplined execution.',
  },
  {
    id: 'purpose',
    title: 'Purpose & Values',
    description: 'Reconnect daily leadership with what matters most.',
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

const differentiatorGuidance = {
  Authentic: {
    ideal:
      'You lead with consistency between what you believe, what you say and what you do. Others experience your leadership as genuine, transparent and trustworthy.',
    practices: [
      'Say what you genuinely believe while remaining respectful.',
      'Align visible behaviour with stated values.',
      'Acknowledge uncertainty instead of pretending to know.',
      'Invite feedback on whether your actions match your words.',
    ],
  },

  Courageous: {
    ideal:
      'You address difficult realities early, speak when silence would be easier and make principled decisions even when they are uncomfortable.',
    practices: [
      'Identify the conversation or decision you are currently avoiding.',
      'Separate legitimate risk from fear of discomfort.',
      'State the difficult issue clearly and respectfully.',
      'Act according to principle rather than popularity.',
    ],
  },

  Transformational: {
    ideal:
      'Your leadership moves people beyond maintaining the present toward imagining and creating a better future.',
    practices: [
      'Describe clearly what needs to change and why.',
      'Connect change to a meaningful future state.',
      'Invite others to participate in shaping the solution.',
      'Model the behaviours required by the transformation.',
    ],
  },

  Confident: {
    ideal:
      'You bring calm assurance to decisions, conversations and uncertainty without becoming defensive or dismissive of others.',
    practices: [
      'Prepare evidence before high-stakes conversations.',
      'State your position clearly and concisely.',
      'Avoid excessive justification after making a sound decision.',
      'Accept constructive challenge without losing composure.',
    ],
  },

  Bold: {
    ideal:
      'You are willing to pursue opportunities and make decisions that create meaningful movement rather than simply preserving comfort.',
    practices: [
      'Identify one action that feels important but uncomfortable.',
      'Assess the real risk rather than the imagined risk.',
      'Set a clear decision date.',
      'Take visible ownership of the action.',
    ],
  },

  Reliable: {
    ideal:
      'Others experience you as dependable, predictable and consistent. Your decisions, communication and follow-through build confidence.',
    practices: [
      'Make decisions within agreed timeframes.',
      'Communicate expectations and rationale clearly.',
      'Avoid unnecessary reversals once a sound decision is made.',
      'Follow through on commitments and report progress.',
      'Review whether promised outcomes were delivered.',
    ],
  },

  Trustworthy: {
    ideal:
      'People feel safe relying on your word, judgement and handling of responsibility because your behaviour is consistent and ethical.',
    practices: [
      'Keep commitments or renegotiate them early.',
      'Protect confidential information.',
      'Be transparent about constraints and conflicts.',
      'Do not promise what you cannot deliver.',
    ],
  },

  Ambitious: {
    ideal:
      'Your ambition stretches performance and possibility while remaining anchored in values, sustainability and service.',
    practices: [
      'Define the next meaningful level of achievement.',
      'Translate ambition into measurable priorities.',
      'Avoid confusing activity with progress.',
      'Ensure your ambition creates value beyond personal recognition.',
    ],
  },

  Purposeful: {
    ideal:
      'Your decisions and priorities are visibly connected to a clear sense of purpose rather than urgency, habit or external pressure.',
    practices: [
      'State the purpose behind the current priority.',
      'Stop activities that do not contribute to it.',
      'Connect decisions to long-term contribution.',
      'Use purpose as a filter for competing demands.',
    ],
  },

  'Values-driven': {
    ideal:
      'Your values remain visible in how you use authority, allocate resources, treat people and make difficult decisions.',
    practices: [
      'Name the value most relevant to the current challenge.',
      'Ask what that value requires in practice.',
      'Identify where convenience is competing with principle.',
      'Document the decision you would still defend under scrutiny.',
    ],
  },

  Inspirational: {
    ideal:
      'People leave interactions with you clearer about what matters, more confident about what is possible and motivated to contribute.',
    practices: [
      'Connect tasks to meaning and impact.',
      'Recognise genuine contribution.',
      'Communicate possibility without ignoring reality.',
      'Model the energy and behaviour you expect from others.',
    ],
  },

  Accountable: {
    ideal:
      'You take ownership of decisions, outcomes and mistakes, while creating the same standard of responsibility for others.',
    practices: [
      'Clarify who owns each outcome.',
      'Define what success will look like.',
      'Review commitments at agreed intervals.',
      'Own mistakes without shifting blame.',
    ],
  },

  Disciplined: {
    ideal:
      'Your priorities are protected by consistent routines, boundaries and follow-through rather than depending on motivation.',
    practices: [
      'Identify the routine that would create the greatest improvement.',
      'Protect time for high-value work.',
      'Remove one recurring distraction.',
      'Review progress at the same time every week.',
    ],
  },

  Resilient: {
    ideal:
      'You recover from difficulty without losing perspective, values or the ability to lead others constructively.',
    practices: [
      'Separate the setback from your identity.',
      'Identify what remains within your control.',
      'Extract one learning from the difficulty.',
      'Take the next constructive action rather than waiting for perfect conditions.',
    ],
  },

  Intentional: {
    ideal:
      'Your leadership choices are deliberate. Time, attention, relationships and decisions reflect priorities rather than constant reaction.',
    practices: [
      'Define the outcome before acting.',
      'Choose what deserves attention and what does not.',
      'Create decision points rather than remaining reactive.',
      'End each week by identifying the next intentional priority.',
    ],
  },

  'Self-Aware': {
    ideal:
      'You understand how your emotions, habits, strengths and blind spots affect the people and decisions around you.',
    practices: [
      'Notice your reaction before responding.',
      'Ask what might be driving that reaction.',
      'Request feedback from someone who experiences your leadership directly.',
      'Identify one behaviour to consciously practise differently.',
    ],
  },

  'Open-Minded': {
    ideal:
      'You hold clear views without becoming trapped by them. New evidence and perspectives can genuinely influence your thinking.',
    practices: [
      'Ask what you may be missing.',
      'Seek one credible opposing perspective.',
      'Separate disagreement from disloyalty.',
      'Change your position when better evidence warrants it.',
    ],
  },

  Decisive: {
    ideal:
      'You make timely, evidence-informed decisions and create clarity about what happens next.',
    practices: [
      'Define the decision that actually needs to be made.',
      'Identify the minimum information required.',
      'Set a decision deadline.',
      'Communicate the decision, rationale and next action.',
      'Review the outcome rather than repeatedly reopening the decision.',
    ],
  },

  Collaborative: {
    ideal:
      'You create better outcomes by drawing on diverse expertise while maintaining clarity about responsibility and decision rights.',
    practices: [
      'Identify who needs to contribute before the decision.',
      'Invite challenge rather than automatic agreement.',
      'Clarify who decides and who advises.',
      'Recognise contributions after the outcome.',
    ],
  },

  Intuitive: {
    ideal:
      'You recognise patterns and internal signals while testing intuition against evidence, context and consequence.',
    practices: [
      'Name what your intuition is telling you.',
      'Ask what experience may be informing that feeling.',
      'Test it against available evidence.',
      'Use both judgement and data before acting.',
    ],
  },
};

const challengeGuidance = {
  direction: {
    gap:
      'The likely gap is between broad strategic intention and a sufficiently clear set of priorities, choices and execution responsibilities.',
    thirtyDay:
      'Clarify the three priorities that matter most, communicate what will not be prioritised, and review execution weekly.',
  },

  conversation: {
    gap:
      'The likely gap is between recognising an important issue and addressing it with enough clarity, courage and respect to create movement.',
    thirtyDay:
      'Hold the conversation, agree actions and follow up on whether behaviour or understanding actually changed.',
  },

  people: {
    gap:
      'The likely gap concerns translating leadership intention into the day-to-day experience of trust, accountability, development and influence.',
    thirtyDay:
      'Choose two important relationships, clarify expectations, provide meaningful feedback and review progress with each person.',
  },

  decision: {
    gap:
      'The likely gap is between having sufficient information and creating timely clarity through a decision that people can understand and act on.',
    thirtyDay:
      'Identify delayed decisions, define decision criteria, decide within set timeframes and track the quality of follow-through.',
  },

  self: {
    gap:
      'The likely gap is between knowing what matters and consistently protecting the habits, boundaries and energy required to deliver it.',
    thirtyDay:
      'Establish one non-negotiable leadership routine, remove one recurring distraction and review progress every week.',
  },

  purpose: {
    gap:
      'The likely gap is between stated values or purpose and how they are translated into everyday choices, priorities and behaviour.',
    thirtyDay:
      'Select one core value, use it explicitly in a real decision, and reflect on whether your behaviour demonstrated that value.',
  },
};

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

  const idealState = differentiator
    ? differentiatorGuidance[differentiator]
    : null;

  const challengePath = challenge
    ? challengeGuidance[challenge]
    : null;

  function saveSession() {
    setSaved(true);
  }

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <span style={styles.eyebrow}>EXECUTIVE LEADERSHIP STUDIO</span>

        <h1 style={styles.heroTitle}>
          Turn reflection into visible leadership growth.
        </h1>

        <p style={styles.heroText}>
          Choose your leadership challenge, identify who you need to become,
          align your thinking and translate insight into action.
        </p>
      </section>

      <section style={styles.section}>
        <span style={styles.step}>STEP 1</span>
        <h2 style={styles.title}>What do you want to work on?</h2>

        <div style={styles.grid}>
          {challenges.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setChallenge(item.id)}
              style={{
                ...styles.choice,
                ...(challenge === item.id ? styles.selected : {}),
              }}
            >
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section style={styles.darkSection}>
        <span style={styles.stepGold}>STEP 2</span>
        <h2 style={styles.darkTitle}>Who do you need to become?</h2>

        <div style={styles.grid}>
          {differentiators.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setDifferentiator(item)}
              style={{
                ...styles.darkChoice,
                ...(differentiator === item
                  ? styles.darkSelected
                  : {}),
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <span style={styles.step}>STEP 3</span>
        <h2 style={styles.title}>Choose your aligning phrase</h2>

        <div style={styles.phraseGrid}>
          {phrases.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPhrase(item)}
              style={{
                ...styles.phrase,
                ...(phrase === item ? styles.phraseSelected : {}),
              }}
            >
              “{item}”
            </button>
          ))}
        </div>
      </section>

      <section style={styles.promiseSection}>
        <div>
          <span style={styles.stepGold}>STEP 4</span>

          <h2 style={styles.promiseTitle}>
            Make an executive promise
          </h2>

          <p style={styles.promiseText}>
            Leadership development becomes valuable when reflection produces a
            deliberate action that can be reviewed.
          </p>

          <div style={styles.summary}>
            <div style={styles.summaryRow}>
              <span>CHALLENGE</span>
              <strong>
                {selectedChallenge?.title || 'Not selected'}
              </strong>
            </div>

            <div style={styles.summaryRow}>
              <span>DIFFERENTIATOR</span>
              <strong>{differentiator || 'Not selected'}</strong>
            </div>

            <div style={styles.summaryRow}>
              <span>ALIGNING PHRASE</span>
              <strong>{phrase || 'Not selected'}</strong>
            </div>
          </div>
        </div>

        <div style={styles.form}>
          <label style={styles.label}>
            What will you do differently?
            <textarea
              rows="6"
              value={commitment}
              onChange={(event) => {
                setCommitment(event.target.value);
                setSaved(false);
              }}
              placeholder="Example: I will hold the conversation I have been avoiding and clarify responsibilities with my executive team."
              style={styles.textarea}
            />
          </label>

          <div style={styles.twoColumns}>
            <label style={styles.label}>
              By when?
              <input
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                placeholder="Friday, 16:00"
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              What will success look like?
              <input
                value={evidence}
                onChange={(event) => setEvidence(event.target.value)}
                placeholder="Clear agreement and next actions"
                style={styles.input}
              />
            </label>
          </div>

          <button
            type="button"
            onClick={saveSession}
            style={styles.goldButton}
          >
            Save my leadership commitment
          </button>
        </div>
      </section>

      <section style={styles.pathSection}>
        <div style={styles.pathHeader}>
          <div>
            <span style={styles.step}>LEADERSHIP DEVELOPMENT PATHWAY</span>

            <h2 style={styles.pathTitle}>
              Your path to the ideal state
            </h2>

            <p style={styles.pathIntro}>
              Your selections are now translated into a practical picture of
              what stronger leadership could look like and how you can move
              toward it.
            </p>
          </div>

          <div style={styles.focusBadge}>
            <span>YOUR DEVELOPMENT FOCUS</span>
            <strong>{differentiator || 'Select a differentiator'}</strong>
          </div>
        </div>

        {!challenge || !differentiator ? (
          <div style={styles.empty}>
            Select a leadership challenge and differentiator above to generate
            your development pathway.
          </div>
        ) : (
          <div style={styles.pathGrid}>
            <article style={styles.pathCard}>
              <span style={styles.pathNumber}>01</span>
              <h3>Current leadership gap</h3>
              <p>{challengePath?.gap}</p>
            </article>

            <article style={styles.pathCardGold}>
              <span style={styles.pathNumberDark}>02</span>
              <h3>Ideal state</h3>
              <p>{idealState?.ideal}</p>
            </article>

            <article style={styles.pathCard}>
              <span style={styles.pathNumber}>03</span>
              <h3>Leadership practices</h3>

              <ul style={styles.list}>
                {idealState?.practices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article style={styles.pathCard}>
              <span style={styles.pathNumber}>04</span>
              <h3>30-day focus</h3>
              <p>{challengePath?.thirtyDay}</p>
            </article>

            <article style={styles.pathCard}>
              <span style={styles.pathNumber}>05</span>
              <h3>Guiding thought</h3>

              <blockquote style={styles.guidingPhrase}>
                “{phrase || 'Choose an aligning phrase above'}”
              </blockquote>

              <p>
                Return to this phrase when pressure, uncertainty or distraction
                pulls you away from the leadership posture you selected.
              </p>
            </article>

            <article style={styles.pathCardDark}>
              <span style={styles.pathNumberGold}>06</span>
              <h3>Evidence of progress</h3>

              <p>
                {evidence ||
                  'Define an observable result that would demonstrate that your leadership behaviour has changed.'}
              </p>

              {commitment && (
                <>
                  <span style={styles.commitmentLabel}>
                    YOUR COMMITMENT
                  </span>

                  <strong style={styles.commitmentText}>
                    {commitment}
                  </strong>
                </>
              )}

              {deadline && (
                <span style={styles.deadline}>
                  Review point: {deadline}
                </span>
              )}
            </article>
          </div>
        )}
      </section>

      {saved && (
        <section style={styles.savedBanner}>
          <strong>Leadership commitment saved.</strong>

          <span>
            Your next step is to practise the selected leadership behaviours and
            review the evidence of progress.
          </span>
        </section>
      )}

      <section style={styles.deepReflection}>
        <span style={styles.step}>FROM WEZI KHOZA'S TOOLKIT</span>

        <h2 style={styles.title}>Continue into deeper reflection</h2>

        <p style={styles.pathIntro}>
          Explore the leadership themes and competency reflections from the
          Inspired to Succeed™ framework.
        </p>

        <ToolkitClient />
      </section>
    </main>
  );
}

const styles = {
  page: {
    background: '#f7f4ee',
    color: '#191714',
    minHeight: '100vh',
  },

  hero: {
    padding: '72px max(24px, calc((100vw - 1380px) / 2))',
    background:
      'linear-gradient(135deg, #17150f 0%, #292218 100%)',
    color: '#fff',
  },

  eyebrow: {
    color: '#dda72c',
    fontSize: '12px',
    fontWeight: 900,
    letterSpacing: '.16em',
  },

  heroTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(44px, 6vw, 74px)',
    maxWidth: '900px',
    lineHeight: 1,
    margin: '18px 0 22px',
  },

  heroText: {
    maxWidth: '780px',
    lineHeight: 1.7,
    fontSize: '18px',
    color: 'rgba(255,255,255,.7)',
  },

  section: {
    maxWidth: '1380px',
    margin: '0 auto',
    padding: '64px 24px',
  },

  step: {
    color: '#9b7014',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '.15em',
  },

  stepGold: {
    color: '#dda72c',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '.15em',
  },

  title: {
    fontFamily: 'Georgia, serif',
    fontSize: '40px',
    margin: '12px 0 28px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(210px, 1fr))',
    gap: '14px',
  },

  choice: {
    minHeight: '135px',
    padding: '20px',
    display: 'grid',
    gap: '9px',
    textAlign: 'left',
    border: '1px solid #ddd3c5',
    borderRadius: '15px',
    background: '#fff',
    cursor: 'pointer',
  },

  selected: {
    border: '2px solid #dda72c',
    boxShadow: '0 10px 28px rgba(221,167,44,.16)',
  },

  darkSection: {
    padding: '64px max(24px, calc((100vw - 1380px) / 2))',
    background: '#171612',
    color: '#fff',
  },

  darkTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '40px',
    margin: '12px 0 28px',
  },

  darkChoice: {
    minHeight: '85px',
    borderRadius: '13px',
    border: '1px solid rgba(255,255,255,.14)',
    background: 'rgba(255,255,255,.05)',
    color: '#fff',
    fontWeight: 800,
    cursor: 'pointer',
  },

  darkSelected: {
    background: '#dda72c',
    color: '#17130c',
    borderColor: '#dda72c',
  },

  phraseGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '12px',
  },

  phrase: {
    minHeight: '130px',
    padding: '20px',
    background: '#111',
    color: '#fff',
    border: '1px solid #262626',
    borderRadius: '14px',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    fontSize: '17px',
    textAlign: 'left',
  },

  phraseSelected: {
    border: '3px solid #dda72c',
  },

  promiseSection: {
    padding: '62px max(24px, calc((100vw - 1380px) / 2))',
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,.9fr) minmax(0,1.1fr)',
    gap: '0',
    background: '#211c15',
    color: '#fff',
  },

  promiseTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '48px',
    margin: '12px 0 20px',
  },

  promiseText: {
    color: 'rgba(255,255,255,.7)',
    maxWidth: '600px',
    lineHeight: 1.65,
  },

  summary: {
    marginTop: '35px',
  },

  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    padding: '18px 0',
    borderTop: '1px solid rgba(255,255,255,.13)',
  },

  form: {
    padding: '28px',
    background: '#fff',
    color: '#181511',
    borderRadius: '22px',
  },

  label: {
    display: 'grid',
    gap: '8px',
    fontWeight: 800,
    fontSize: '13px',
    marginBottom: '16px',
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #ddd3c5',
    borderRadius: '12px',
    padding: '14px',
    font: 'inherit',
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '48px',
    border: '1px solid #ddd3c5',
    borderRadius: '12px',
    padding: '0 14px',
    font: 'inherit',
  },

  twoColumns: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(220px,1fr))',
    gap: '15px',
  },

  goldButton: {
    width: '100%',
    minHeight: '58px',
    border: 0,
    borderRadius: '13px',
    background: '#dda72c',
    fontWeight: 900,
    fontSize: '15px',
    cursor: 'pointer',
  },

  pathSection: {
    maxWidth: '1380px',
    margin: '0 auto',
    padding: '76px 24px',
  },

  pathHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    alignItems: 'flex-end',
    marginBottom: '32px',
  },

  pathTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '48px',
    margin: '12px 0',
  },

  pathIntro: {
    maxWidth: '760px',
    color: '#6e665d',
    lineHeight: 1.7,
  },

  focusBadge: {
    minWidth: '230px',
    padding: '20px',
    borderRadius: '16px',
    background: '#171612',
    color: '#fff',
    display: 'grid',
    gap: '5px',
  },

  pathGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
  },

  pathCard: {
    padding: '24px',
    border: '1px solid #e1d7c9',
    borderRadius: '18px',
    background: '#fff',
    lineHeight: 1.65,
  },

  pathCardGold: {
    padding: '24px',
    borderRadius: '18px',
    background: '#dda72c',
    color: '#17130c',
    lineHeight: 1.65,
  },

  pathCardDark: {
    padding: '24px',
    borderRadius: '18px',
    background: '#171612',
    color: '#fff',
    lineHeight: 1.65,
  },

  pathNumber: {
    color: '#a27618',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '.12em',
  },

  pathNumberDark: {
    color: '#17130c',
    fontSize: '11px',
    fontWeight: 900,
  },

  pathNumberGold: {
    color: '#dda72c',
    fontSize: '11px',
    fontWeight: 900,
  },

  list: {
    paddingLeft: '20px',
    lineHeight: 1.8,
  },

  guidingPhrase: {
    margin: '18px 0',
    fontFamily: 'Georgia, serif',
    fontSize: '23px',
    lineHeight: 1.45,
  },

  commitmentLabel: {
    display: 'block',
    marginTop: '20px',
    color: '#dda72c',
    fontSize: '10px',
    fontWeight: 900,
    letterSpacing: '.13em',
  },

  commitmentText: {
    display: 'block',
    marginTop: '7px',
  },

  deadline: {
    display: 'block',
    marginTop: '15px',
    color: 'rgba(255,255,255,.65)',
  },

  empty: {
    padding: '30px',
    borderRadius: '16px',
    background: '#fff',
    border: '1px dashed #cdbfae',
    color: '#766e65',
  },

  savedBanner: {
    maxWidth: '1332px',
    margin: '0 auto 50px',
    padding: '20px 24px',
    borderRadius: '14px',
    background: '#e5f2e8',
    color: '#31593b',
    display: 'grid',
    gap: '4px',
  },

  deepReflection: {
    maxWidth: '1380px',
    margin: '0 auto',
    padding: '40px 24px 90px',
  },
};
