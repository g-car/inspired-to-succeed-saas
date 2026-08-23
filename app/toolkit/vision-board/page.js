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
    title: 'Dare to be different and Dare to be You',
    meaning:
      'Have the courage to own your individuality rather than conforming unnecessarily.',
  },
  {
    title: 'Stand by your truth',
    meaning:
      'Do not knowingly surrender truth simply because falsehood feels easier or more convenient.',
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
];

const visionCards = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  src: `/wezi_vision_cards/vision-card-${String(index + 1).padStart(
    2,
    '0'
  )}.webp`,
}));

export default function VisionBoardPage() {
  const [selectedDifferentiator, setSelectedDifferentiator] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [personalMeaning, setPersonalMeaning] = useState('');
  const [futureShift, setFutureShift] = useState('');

  const progress = useMemo(() => {
    let completed = 0;

    if (selectedDifferentiator) completed++;
    if (selectedPhrase) completed++;
    if (selectedImages.length > 0) completed++;
    if (personalMeaning.trim()) completed++;

    return completed;
  }, [
    selectedDifferentiator,
    selectedPhrase,
    selectedImages,
    personalMeaning,
  ]);

  function toggleImage(card) {
    const alreadySelected = selectedImages.some(
      (item) => item.id === card.id
    );

    if (alreadySelected) {
      setSelectedImages((previous) =>
        previous.filter((item) => item.id !== card.id)
      );
      return;
    }

    if (selectedImages.length >= 6) {
      return;
    }

    setSelectedImages((previous) => [...previous, card]);
  }

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <Link href="/toolkit" style={styles.back}>
          ← Back to Toolkit
        </Link>

        <span style={styles.eyebrow}>02 · VISION BOARD</span>

        <h1 style={styles.heroTitle}>
          Build the leader you can already see.
        </h1>

        <p style={styles.heroText}>
          Begin with identity. Choose the thought that keeps you aligned.
          Then select the images that make your future visible.
        </p>

        <div style={styles.progress}>
          <span>VISION BOARD PROGRESS</span>
          <strong>{progress}/4</strong>
        </div>
      </section>

      <section style={styles.section}>
        <span style={styles.step}>STEP 1</span>

        <h2 style={styles.title}>Who do I need to become?</h2>

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
            Choose the phrase that best anchors the way you want to lead.
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

        <h2 style={styles.title}>What does my future look like?</h2>

        <p style={styles.intro}>
          Browse the original image cards and choose up to six images that
          best represent the life, leadership, relationships, achievements
          or future you are working towards.
        </p>

        <div style={styles.counter}>
          <strong>{selectedImages.length} of 6 selected</strong>

          {selectedImages.length === 6 && <span>Maximum reached</span>}
        </div>

        <div style={styles.imageGrid}>
          {visionCards.map((card) => {
            const selected = selectedImages.some(
              (item) => item.id === card.id
            );

            return (
              <button
                type="button"
                key={card.id}
                onClick={() => toggleImage(card)}
                style={{
                  ...styles.imageCard,
                  ...(selected ? styles.imageSelected : {}),
                }}
              >
                <img
                  src={card.src}
                  alt={`Vision board card ${card.id}`}
                  style={styles.image}
                />

                <div
                  style={{
                    ...styles.imageOverlay,
                    ...(selected
                      ? styles.imageOverlaySelected
                      : {}),
                  }}
                >
                  <span>
                    {selected ? '✓ Selected for my future' : 'Select'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section style={styles.futureBoardSection}>
        <span style={styles.stepGold}>MY FUTURE BOARD</span>

        <h2 style={styles.futureBoardTitle}>
          The future I am choosing
        </h2>

        {selectedImages.length === 0 ? (
          <div style={styles.emptyBoard}>
            Your selected images will appear here.
          </div>
        ) : (
          <div style={styles.collage}>
            {selectedImages.map((card) => (
              <div style={styles.collageItem} key={card.id}>
                <img
                  src={card.src}
                  alt={`Selected vision card ${card.id}`}
                  style={styles.collageImage}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={styles.meaningSection}>
        <div>
          <span style={styles.stepGold}>STEP 4</span>

          <h2 style={styles.meaningTitle}>
            When I look at this future, what do I see?
          </h2>

          <p style={styles.meaningText}>
            Describe the meaning behind your choices. What do these images
            say about the leader, life and legacy you are trying to build?
          </p>
        </div>

        <div>
          <textarea
            value={personalMeaning}
            onChange={(event) =>
              setPersonalMeaning(event.target.value)
            }
            rows="7"
            placeholder="Example: These images represent the kind of leader I want to become, the environments I want to create, the impact I want to have and the quality of life I want to protect..."
            style={styles.textarea}
          />

          <label style={styles.shiftLabel}>
            What must change in my present life or leadership for this future
            to become possible?
          </label>

          <textarea
            value={futureShift}
            onChange={(event) =>
              setFutureShift(event.target.value)
            }
            rows="5"
            placeholder="What needs to change now?"
            style={styles.textarea}
          />
        </div>
      </section>

      <section style={styles.boardSection}>
        <span style={styles.step}>
          MY INSPIRED TO SUCCEED™ VISION BOARD
        </span>

        <h2 style={styles.boardTitle}>
          The leader I am becoming
        </h2>

        <div style={styles.summaryGrid}>
          <article style={styles.goldCard}>
            <span style={styles.summaryLabel}>
              MY DIFFERENTIATOR
            </span>

            <strong style={styles.summaryBig}>
              {selectedDifferentiator || 'Not yet selected'}
            </strong>
          </article>

          <article style={styles.darkCard}>
            <span style={styles.summaryLabelGold}>
              MY ALIGNING PHRASE
            </span>

            <strong style={styles.summaryPhrase}>
              {selectedPhrase
                ? `“${selectedPhrase.title}”`
                : 'Not yet selected'}
            </strong>
          </article>
        </div>

        {selectedImages.length > 0 && (
          <div style={styles.finalBoard}>
            {selectedImages.map((card) => (
              <img
                key={card.id}
                src={card.src}
                alt={`Vision card ${card.id}`}
                style={styles.finalImage}
              />
            ))}
          </div>
        )}

        <div style={styles.reflectionSummary}>
          <div>
            <span style={styles.summaryLabel}>
              WHAT THIS FUTURE MEANS TO ME
            </span>

            <p>
              {personalMeaning.trim() ||
                'Complete your reflection in Step 4.'}
            </p>
          </div>

          <div>
            <span style={styles.summaryLabel}>
              WHAT MUST CHANGE NOW
            </span>

            <p>
              {futureShift.trim() ||
                'Identify the shift required in your present leadership.'}
            </p>
          </div>
        </div>

        {progress === 4 && (
          <div style={styles.complete}>
            <strong>Your Vision Board foundation is complete.</strong>

            <span>
              You have identified who you want to become, what will guide you
              and the future you want to make visible. Your next step is to
              assess yourself across the six leadership themes.
            </span>

            <Link
              href="/toolkit/assessment"
              style={styles.nextButton}
            >
              Continue to Leadership Assessment →
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
    maxWidth: '820px',
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
    fontSize: '18px',
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
    minHeight: '165px',
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

  counter: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '18px',
    color: '#8c681a',
  },

  imageGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(190px,1fr))',
    gap: '14px',
  },

  imageCard: {
    position: 'relative',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    borderRadius: '16px',
    border: '2px solid transparent',
    padding: 0,
    background: '#fff',
    cursor: 'pointer',
  },

  imageSelected: {
    border: '4px solid #dda72c',
    boxShadow: '0 12px 30px rgba(0,0,0,.12)',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: '12px',
    background:
      'linear-gradient(transparent,rgba(0,0,0,.72))',
    color: '#fff',
    fontWeight: 800,
    textAlign: 'left',
  },

  imageOverlaySelected: {
    background:
      'linear-gradient(transparent,rgba(193,139,24,.94))',
  },

  futureBoardSection: {
    padding:
      '64px max(24px,calc((100vw - 1320px)/2))',
    background: '#1f1b15',
    color: '#fff',
  },

  futureBoardTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '42px',
  },

  emptyBoard: {
    padding: '30px',
    border: '1px dashed rgba(255,255,255,.25)',
    borderRadius: '16px',
    color: 'rgba(255,255,255,.6)',
  },

  collage: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(210px,1fr))',
    gap: '12px',
  },

  collageItem: {
    overflow: 'hidden',
    borderRadius: '16px',
    aspectRatio: '1 / 1',
  },

  collageImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  meaningSection: {
    padding:
      '60px max(24px,calc((100vw - 1320px)/2))',
    background: '#ede5d8',
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
    color: '#6c645b',
    lineHeight: 1.7,
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '16px',
    borderRadius: '14px',
    border: '1px solid #d7cbbb',
    font: 'inherit',
    lineHeight: 1.6,
    marginBottom: '18px',
  },

  shiftLabel: {
    display: 'block',
    fontWeight: 800,
    marginBottom: '10px',
    lineHeight: 1.5,
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

  summaryGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(280px,1fr))',
    gap: '16px',
  },

  goldCard: {
    minHeight: '180px',
    padding: '24px',
    borderRadius: '18px',
    background:
      'linear-gradient(135deg,#efdaa2,#c68e16)',
    display: 'grid',
    alignContent: 'space-between',
  },

  darkCard: {
    minHeight: '180px',
    padding: '24px',
    borderRadius: '18px',
    background: '#111',
    color: '#fff',
    display: 'grid',
    alignContent: 'space-between',
  },

  summaryLabel: {
    color: '#8a6310',
    fontSize: '10px',
    fontWeight: 900,
    letterSpacing: '.14em',
  },

  summaryLabelGold: {
    color: '#dda72c',
    fontSize: '10px',
    fontWeight: 900,
    letterSpacing: '.14em',
  },

  summaryBig: {
    fontFamily: 'Georgia,serif',
    fontSize: '32px',
  },

  summaryPhrase: {
    fontFamily: 'Georgia,serif',
    fontSize: '26px',
    lineHeight: 1.4,
  },

  finalBoard: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(200px,1fr))',
    gap: '10px',
    marginTop: '18px',
  },

  finalImage: {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '14px',
  },

  reflectionSummary: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(280px,1fr))',
    gap: '16px',
    marginTop: '18px',
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
