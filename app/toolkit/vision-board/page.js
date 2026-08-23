'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

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
  'Accessible',
  'Accountable',
  'Disciplined',
  'Responsible',
  'Sharing',
  'Determined',
  'Unrelenting',
  'Resilient',
  'Grateful',
  'Intentional',
  'Qualified',
  'Self-Aware',
  'Socially Aware',
  'Open-Minded',
  'Curious',
  'Forgiving',
  'Abundance-oriented',
  'Achiever',
  'Mindful',
  'Diligent',
  'Decisive',
  'Respectful',
  'Productive / Impactful',
  'Resolute',
  'Reasonable / Accommodative',
  'Capable',
  'Blessed',
  'Collaborative',
  'Intuitive',
];

const phraseCards = [
  {
    title: 'Worry ends when faith begins',
    meaning:
      'After disciplined effort, allow belief and faith to carry you through uncertainty.',
  },
  {
    title: 'Set the tone',
    meaning:
      'Influence the atmosphere and expectations around you through your actions, language and presence.',
  },
  {
    title: 'Stick to your knitting',
    meaning:
      'Strengthen what you know, care about and are equipped to do well.',
  },
  {
    title: 'Trust your gut',
    meaning:
      'Listen to experience, instinct and intuition, particularly when time or information is limited.',
  },
  {
    title: 'Choose wisely',
    meaning:
      'Choose people, habits, information and activities that support the goal you want to achieve.',
  },
  {
    title: 'Courage is not the volume of your voice',
    meaning:
      'Your vision and inner conviction remain valuable even when they are not loudly expressed.',
  },
  {
    title: 'Work smart and don’t pamper idleness',
    meaning:
      'Prioritise effectiveness and meaningful effort rather than unnecessary exertion.',
  },
  {
    title: 'Conserve your energy and know what to overlook',
    meaning:
      'Protect your attention by deciding which matters deserve your energy and which do not.',
  },
  {
    title: 'Plant a seed and own your legacy',
    meaning:
      'Small acts of contribution, gratitude, ideas and service accumulate into lasting impact.',
  },
  {
    title: 'Accidental outcomes are short-lived',
    meaning:
      'Be deliberate enough to remain accountable for the results and impact of your choices.',
  },
  {
    title: 'Speak your truth and enjoy a liberated conscience',
    meaning:
      'Prioritise truth and integrity even when honesty creates discomfort.',
  },
  {
    title: 'Make reliability a reality',
    meaning:
      'Consistency and dependability build the trust that allows others to contribute to your success.',
  },
  {
    title: 'Run fast from ignorance',
    meaning:
      'Treat learning and knowledge as essential resources for leadership and success.',
  },
  {
    title: 'Lift others as you climb up, because the top is lonely',
    meaning:
      'Develop others as you advance so that success is supported by meaningful relationships.',
  },
  {
    title: 'Your daily routine determines your success',
    meaning:
      'Progressive thoughts become habits, character and eventually visible action.',
  },
  {
    title: 'Embrace Greatness',
    meaning:
      'Intentionally expose yourself to people, places, events and ideas that stretch your aspirations.',
  },
  {
    title: 'Apply situational ethics',
    meaning:
      'Consider context while allowing love, compassion and avoidance of harm to guide judgement.',
  },
  {
    title: 'Dare to be different and Dare to be You',
    meaning:
      'Have the courage to own your individuality rather than conforming unnecessarily.',
  },
  {
    title: 'Break your comfort zone and face challenges with your head held high',
    meaning:
      'Growth requires movement beyond the safety of familiar conditions.',
  },
  {
    title: 'Stand by your truth',
    meaning:
      'Do not knowingly surrender truth simply because falsehood feels easier or more convenient.',
  },
  {
    title: 'Trust but verify',
    meaning:
      'Build trust while still applying appropriate judgement, evidence and accountability.',
  },
  {
    title: 'Be ready to re-invent how you are',
    meaning:
      'Release attachments and habits that no longer produce value or progress.',
  },
  {
    title: 'Surprise yourself and get started',
    meaning:
      'Action begins before certainty; movement itself creates learning and opportunity.',
  },
  {
    title: 'Inside of you are treasures',
    meaning:
      'Recognise and explore your own talents, abilities and natural strengths.',
  },
  {
    title: 'Value what you have',
    meaning:
      'Recognise the worth of what is already present before becoming consumed by what is missing.',
  },
  {
    title: 'Learn to forgive and move on',
    meaning:
      'Release what keeps your attention trapped in the past and redirect energy toward progress.',
  },
  {
    title: 'Stay away from negative people, they have a problem with every solution',
    meaning:
      'Protect constructive thinking from habitual negativity that offers no useful alternative.',
  },
  {
    title: 'A bend in the road is not the end of the road',
    meaning:
      'Goals may require adaptation; changed routes do not necessarily mean failed journeys.',
  },
  {
    title: 'Traditions connect us to the past',
    meaning:
      'Respect identity and history while remaining capable of adaptation for the future.',
  },
  {
    title: 'Creative thinking and innovation result in a thriving environment',
    meaning:
      'Ideas only become valuable when they are translated into meaningful action.',
  },
  {
    title: 'Do not flinch in the face of adversity',
    meaning:
      'Composure under pressure improves judgement, clarity and decision-making.',
  },
  {
    title: 'Use your elbow grease to move ahead of the rest',
    meaning:
      'Participating in progressive opportunities creates exposure, experience and momentum.',
  },
  {
    title: 'Don’t let the world take your hopes away',
    meaning:
      'Remain focused on your meaningful goal despite distraction, fashion or temporary temptation.',
  },
  {
    title: 'Action Generates Momentum',
    meaning:
      'Movement exposes you to ideas, opportunities and possibilities that are invisible while standing still.',
  },
  {
    title: 'Immerse yourself in your purpose',
    meaning:
      'Protect focus on what you genuinely believe in and reduce unnecessary external distraction.',
  },
  {
    title: 'Get off the pity train before it derails',
    meaning:
      'Acknowledge emotion without allowing it to dominate your identity, choices or future.',
  },
  {
    title: 'Life doesn’t revolve around me',
    meaning:
      'Develop internal confidence rather than becoming dependent on constant praise and external approval.',
  },
];

const imageCards = [
  { id: 1, title: 'Boardroom', meaning: 'Leadership, authority and governance' },
  { id: 2, title: 'Camera', meaning: 'Perspective, visibility and how you frame the world' },
  { id: 3, title: 'Books', meaning: 'Learning, knowledge and continuous growth' },
  { id: 4, title: 'Tax Time', meaning: 'Responsibility, compliance and discipline' },
  { id: 5, title: 'Executive Presence', meaning: 'Professional confidence and reflection' },
  { id: 6, title: 'City at Night', meaning: 'Movement, ambition and possibility' },
  { id: 7, title: 'Construction', meaning: 'Building, infrastructure and tangible progress' },
  { id: 8, title: 'Change the Ending', meaning: 'Agency, renewal and personal transformation' },
  { id: 9, title: 'Unlock Potential', meaning: 'Belief, growth and possibility' },
  { id: 10, title: 'Artificial Intelligence', meaning: 'Technology, innovation and the future' },
  { id: 11, title: 'Diversity', meaning: 'Difference, inclusion and belonging' },
  { id: 12, title: 'Giving', meaning: 'Contribution, generosity and service' },
  { id: 13, title: 'Winner', meaning: 'Achievement, excellence and recognition' },
  { id: 14, title: 'I Can', meaning: 'Confidence, resilience and self-belief' },
  { id: 15, title: 'Helping Hand', meaning: 'Support, mentorship and collaboration' },
  { id: 16, title: 'Target', meaning: 'Goals, focus and measurable achievement' },
  { id: 17, title: 'Teamwork', meaning: 'Collaboration and collective achievement' },
  { id: 18, title: 'Health', meaning: 'Wellbeing and sustainable leadership' },
  { id: 19, title: 'Dream in Colour', meaning: 'Vision, creativity and possibility' },
  { id: 20, title: 'Healthy Life', meaning: 'Balance, wellbeing and self-care' },
  { id: 21, title: 'Top Rated', meaning: 'Excellence and high performance' },
  { id: 22, title: 'Be Strong', meaning: 'Resilience and perseverance' },
  { id: 23, title: 'Fitness', meaning: 'Energy, discipline and physical wellbeing' },
  { id: 24, title: 'Pause, Breathe, Ponder, Choose, Do', meaning: 'Reflection before action' },
  { id: 25, title: 'Dream It, Believe It, Achieve It', meaning: 'Aspiration and achievement' },
  { id: 26, title: 'Wake Up, Kick Ass, Be Kind, Repeat', meaning: 'Drive balanced by humanity' },
  { id: 27, title: 'Meeting Room', meaning: 'Leadership, dialogue and collective decision-making' },
  { id: 28, title: 'Signing', meaning: 'Commitment, accountability and formal action' },
  { id: 29, title: 'Resort', meaning: 'Reward, balance and quality of life' },
  { id: 30, title: 'Launch', meaning: 'Beginning, action and new ventures' },
  { id: 31, title: 'Cockpit', meaning: 'Direction, responsibility and control' },
  { id: 32, title: 'Supported Tree', meaning: 'Strength, support and sustainability' },
  { id: 33, title: 'Make It Right', meaning: 'Excellence, responsibility and quality' },
  { id: 34, title: 'Create, Solve, Act', meaning: 'Creativity, engineering and entrepreneurship' },
  { id: 35, title: 'Sunshine', meaning: 'Positive relationships and emotional wellbeing' },
  { id: 36, title: 'Analytics', meaning: 'Evidence, data and informed decisions' },
  { id: 37, title: 'Private Travel', meaning: 'Aspiration, achievement and lifestyle' },
  { id: 38, title: 'Highway Network', meaning: 'Choice, direction and strategic pathways' },
  { id: 39, title: 'Refreshment', meaning: 'Renewal and reward' },
  { id: 40, title: 'Mercedes', meaning: 'Achievement, aspiration and personal reward' },
];

export default function VisionBoardPage() {
  const [selectedDifferentiator, setSelectedDifferentiator] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [personalMeaning, setPersonalMeaning] = useState('');

  const progress = useMemo(() => {
    let completed = 0;

    if (selectedDifferentiator) completed++;
    if (selectedPhrase) completed++;
    if (selectedImage) completed++;
    if (personalMeaning.trim()) completed++;

    return completed;
  }, [
    selectedDifferentiator,
    selectedPhrase,
    selectedImage,
    personalMeaning,
  ]);

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <Link href="/toolkit" style={styles.back}>
          ← Back to Toolkit
        </Link>

        <span style={styles.eyebrow}>
          02 · VISION BOARD
        </span>

        <h1 style={styles.heroTitle}>
          Build the leader you can already see.
        </h1>

        <p style={styles.heroText}>
          Begin with identity. Choose the thought that keeps you aligned.
          Then select the visual that represents the future you are building.
        </p>

        <div style={styles.progress}>
          <span>VISION BOARD PROGRESS</span>
          <strong>{progress}/4</strong>
        </div>
      </section>

      <section style={styles.section}>
        <span style={styles.step}>STEP 1</span>

        <h2 style={styles.title}>
          Who do I need to become?
        </h2>

        <p style={styles.intro}>
          Select the leadership differentiator that most clearly describes
          the quality you want to strengthen or embody.
        </p>

        <div style={styles.differentiatorGrid}>
          {differentiators.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSelectedDifferentiator(item)}
              style={{
                ...styles.differentiator,
                ...(selectedDifferentiator === item
                  ? styles.differentiatorSelected
                  : {}),
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section style={styles.darkSection}>
        <div style={styles.inner}>
          <span style={styles.stepGold}>STEP 2</span>

          <h2 style={styles.darkTitle}>
            What thought will keep me aligned?
          </h2>

          <p style={styles.darkIntro}>
            Choose an Aligning Phrase. Each phrase carries a leadership
            message, not merely a slogan.
          </p>

          <div style={styles.phraseGrid}>
            {phraseCards.map((card) => (
              <button
                type="button"
                key={card.title}
                onClick={() => setSelectedPhrase(card)}
                style={{
                  ...styles.phraseCard,
                  ...(selectedPhrase?.title === card.title
                    ? styles.phraseSelected
                    : {}),
                }}
              >
                <strong>“{card.title}”</strong>
                <span>{card.meaning}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <span style={styles.step}>STEP 3</span>

        <h2 style={styles.title}>
          What does my future look like?
        </h2>

        <p style={styles.intro}>
          Select the image that best represents the future, possibility,
          achievement, relationship or state you want to make visible.
        </p>

        <div style={styles.imageGrid}>
          {imageCards.map((card) => (
            <button
              type="button"
              key={card.id}
              onClick={() => setSelectedImage(card)}
              style={{
                ...styles.imageCard,
                ...(selectedImage?.id === card.id
                  ? styles.imageSelected
                  : {}),
              }}
            >
              <span style={styles.imageNumber}>
                {String(card.id).padStart(2, '0')}
              </span>

              <strong>{card.title}</strong>

              <span style={styles.imageMeaning}>
                {card.meaning}
              </span>
            </button>
          ))}
        </div>

        <div style={styles.imageNotice}>
          The original photographs from Wezi Khoza&apos;s Image Card deck
          will replace these labelled selections once the image assets are
          placed in the application&apos;s public folder.
        </div>
      </section>

      <section style={styles.meaningSection}>
        <div>
          <span style={styles.stepGold}>STEP 4</span>

          <h2 style={styles.meaningTitle}>
            What does this combination mean to me?
          </h2>

          <p style={styles.meaningText}>
            Your Vision Board becomes meaningful when you explain the
            connection between who you want to become, what will guide you
            and what you can see.
          </p>
        </div>

        <textarea
          value={personalMeaning}
          onChange={(event) =>
            setPersonalMeaning(event.target.value)
          }
          rows="8"
          placeholder="Example: I want to become a more reliable leader. 'Set the tone' reminds me that consistency starts with my own behaviour. The boardroom represents the kind of calm, trusted executive presence I want to develop..."
          style={styles.textarea}
        />
      </section>

      <section style={styles.boardSection}>
        <span style={styles.step}>
          MY INSPIRED TO SUCCEED™ VISION BOARD
        </span>

        <h2 style={styles.boardTitle}>
          The leader I am becoming
        </h2>

        <div style={styles.boardGrid}>
          <article style={styles.boardCardGold}>
            <span style={styles.boardLabel}>
              MY DIFFERENTIATOR
            </span>

            <strong style={styles.boardBig}>
              {selectedDifferentiator || 'Not yet selected'}
            </strong>
          </article>

          <article style={styles.boardCardDark}>
            <span style={styles.boardLabelGold}>
              MY ALIGNING PHRASE
            </span>

            <strong style={styles.boardPhrase}>
              {selectedPhrase
                ? `“${selectedPhrase.title}”`
                : 'Not yet selected'}
            </strong>

            {selectedPhrase && (
              <p style={styles.boardSubtle}>
                {selectedPhrase.meaning}
              </p>
            )}
          </article>

          <article style={styles.boardCard}>
            <span style={styles.boardLabel}>
              MY VISUAL FUTURE
            </span>

            <strong style={styles.boardBig}>
              {selectedImage?.title || 'Not yet selected'}
            </strong>

            {selectedImage && (
              <p style={styles.boardBody}>
                {selectedImage.meaning}
              </p>
            )}
          </article>

          <article style={styles.boardCard}>
            <span style={styles.boardLabel}>
              WHAT THIS MEANS TO ME
            </span>

            <p style={styles.boardBody}>
              {personalMeaning.trim() ||
                'Add your personal meaning in Step 4.'}
            </p>
          </article>
        </div>

        {progress === 4 && (
          <div style={styles.complete}>
            <strong>Your Vision Board foundation is complete.</strong>

            <span>
              The next stage is to translate this leadership identity into
              your Ideal State and development pathway.
            </span>

            <Link href="/toolkit/ideal-state" style={styles.nextButton}>
              Continue to Ideal State →
            </Link>
          </div>
        )}
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
      '58px max(24px, calc((100vw - 1320px) / 2)) 64px',
    background:
      'linear-gradient(135deg,#17150f 0%,#2b2418 100%)',
    color: '#fff',
  },

  back: {
    display: 'inline-block',
    color: '#d8a12b',
    textDecoration: 'none',
    fontWeight: 800,
    marginBottom: '32px',
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
    margin: '16px 0',
    fontFamily: 'Georgia,serif',
    fontSize: 'clamp(44px,6vw,70px)',
    lineHeight: 1,
  },

  heroText: {
    maxWidth: '760px',
    color: 'rgba(255,255,255,.7)',
    lineHeight: 1.7,
    fontSize: '18px',
  },

  progress: {
    marginTop: '30px',
    display: 'inline-flex',
    gap: '18px',
    alignItems: 'center',
    padding: '14px 18px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,.08)',
  },

  section: {
    maxWidth: '1320px',
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
    fontFamily: 'Georgia,serif',
    fontSize: '42px',
    margin: '12px 0',
  },

  intro: {
    color: '#6d655c',
    maxWidth: '760px',
    lineHeight: 1.7,
    marginBottom: '30px',
  },

  differentiatorGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(190px,1fr))',
    gap: '11px',
  },

  differentiator: {
    minHeight: '95px',
    padding: '18px',
    border: '1px solid #d9c9ad',
    borderRadius: '14px',
    background:
      'linear-gradient(135deg,#f2dda4,#cf951c)',
    color: '#15120d',
    fontFamily: 'Georgia,serif',
    fontSize: '19px',
    fontWeight: 800,
    cursor: 'pointer',
  },

  differentiatorSelected: {
    outline: '4px solid #191611',
    transform: 'translateY(-2px)',
  },

  darkSection: {
    background: '#171612',
    color: '#fff',
  },

  inner: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '64px 24px',
  },

  darkTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '42px',
    margin: '12px 0',
  },

  darkIntro: {
    maxWidth: '760px',
    color: 'rgba(255,255,255,.68)',
    lineHeight: 1.7,
    marginBottom: '30px',
  },

  phraseGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(280px,1fr))',
    gap: '12px',
  },

  phraseCard: {
    minHeight: '170px',
    padding: '20px',
    border: '1px solid #333',
    borderRadius: '14px',
    background: '#050505',
    color: '#fff',
    cursor: 'pointer',
    display: 'grid',
    gap: '12px',
    textAlign: 'left',
    lineHeight: 1.55,
  },

  phraseSelected: {
    border: '3px solid #dda72c',
  },

  imageGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(210px,1fr))',
    gap: '12px',
  },

  imageCard: {
    minHeight: '150px',
    padding: '18px',
    border: '1px solid #ded3c4',
    borderRadius: '15px',
    background: '#fff',
    cursor: 'pointer',
    display: 'grid',
    alignContent: 'space-between',
    gap: '12px',
    textAlign: 'left',
  },

  imageSelected: {
    border: '3px solid #dda72c',
    boxShadow: '0 10px 25px rgba(0,0,0,.08)',
  },

  imageNumber: {
    color: '#a57819',
    fontWeight: 900,
    fontSize: '11px',
  },

  imageMeaning: {
    color: '#786f66',
    fontSize: '13px',
    lineHeight: 1.5,
  },

  imageNotice: {
    marginTop: '20px',
    padding: '16px',
    borderRadius: '12px',
    background: '#eee6da',
    color: '#6f675e',
    fontSize: '13px',
    lineHeight: 1.6,
  },

  meaningSection: {
    padding:
      '60px max(24px,calc((100vw - 1320px)/2))',
    background: '#211c15',
    color: '#fff',
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,.8fr) minmax(0,1.2fr)',
    gap: '40px',
  },

  meaningTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '42px',
  },

  meaningText: {
    color: 'rgba(255,255,255,.67)',
    lineHeight: 1.7,
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '16px',
    borderRadius: '14px',
    border: 0,
    font: 'inherit',
    lineHeight: 1.6,
  },

  boardSection: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '70px 24px 100px',
  },

  boardTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '48px',
    margin: '12px 0 30px',
  },

  boardGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(260px,1fr))',
    gap: '16px',
  },

  boardCardGold: {
    minHeight: '220px',
    padding: '24px',
    borderRadius: '18px',
    background:
      'linear-gradient(135deg,#efdaa2,#c68e16)',
    display: 'grid',
    alignContent: 'space-between',
  },

  boardCardDark: {
    minHeight: '220px',
    padding: '24px',
    borderRadius: '18px',
    background: '#111',
    color: '#fff',
    display: 'grid',
    alignContent: 'space-between',
  },

  boardCard: {
    minHeight: '220px',
    padding: '24px',
    borderRadius: '18px',
    background: '#fff',
    border: '1px solid #e1d6c7',
    display: 'grid',
    alignContent: 'space-between',
  },

  boardLabel: {
    fontSize: '10px',
    fontWeight: 900,
    letterSpacing: '.14em',
    color: '#8d6613',
  },

  boardLabelGold: {
    fontSize: '10px',
    fontWeight: 900,
    letterSpacing: '.14em',
    color: '#dda72c',
  },

  boardBig: {
    fontFamily: 'Georgia,serif',
    fontSize: '30px',
  },

  boardPhrase: {
    fontFamily: 'Georgia,serif',
    fontSize: '25px',
    lineHeight: 1.4,
  },

  boardSubtle: {
    color: 'rgba(255,255,255,.65)',
    lineHeight: 1.6,
  },

  boardBody: {
    color: '#6f675f',
    lineHeight: 1.7,
  },

  complete: {
    marginTop: '28px',
    padding: '22px',
    borderRadius: '15px',
    background: '#e4f1e6',
    color: '#315a39',
    display: 'grid',
    gap: '8px',
  },

  nextButton: {
    marginTop: '10px',
    width: 'fit-content',
    padding: '12px 17px',
    borderRadius: '9px',
    background: '#171612',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 800,
  },
};
