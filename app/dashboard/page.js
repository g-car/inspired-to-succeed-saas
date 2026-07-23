'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import styles from './dashboard.module.css';

const differentiators = [
  'Authentic','Courageous','Transformational','Confident','Bold','Reliable','Trustworthy','Ambitious','Purposeful','Values-driven',
  'Inspirational','Accessible','Accountable','Disciplined','Responsible','Sharing','Determined','Unrelenting','Resilient','Grateful',
  'Intentional','Qualified','Self-Aware','Socially Aware','Open-Minded','Curious','Forgiving','Abundance-oriented','Achiever','Mindful',
  'Diligent','Decisive','Respectful','Productive / Impactful','Resolute','Reasonable / Accommodative','Capable','Blessed','Collaborative','Intuitive'
];

const phrases = [
  'Worry ends when faith begins','Set the tone','Stick to your knitting','Trust your gut','Choose wisely',
  'Courage is not the volume of your voice','Work smart and do not pamper idleness','Shy away from idiots because of their tendency to criminalize intelligence',
  'Seven blunders of the world that lead to violence','Conserve your energy and know what to overlook','Plant a seed and own your legacy',
  'Accidental outcomes are short-lived','Speak your truth and enjoy a liberated conscience','Make reliability a reality','Run fast from ignorance',
  'Lift others as you climb up, because the top is lonely','Your daily routine determines your success','Embrace greatness','Apply situational ethics',
  'Dare to be different and dare to be you','Break your comfort zone and face challenges with your head held high','Immerse yourself in your purpose',
  'Get off the pity train before it derails','Life does not revolve around me','Stand by your truth','Trust but verify - Irvin Khoza',
  'Be ready to re-invent how you are','Surprise yourself and get started','Inside of you are treasures','Value what you have',
  'Learn to forgive and move on','Lock the doors of hell from the inside - C. S. Lewis','Stay away from negative people; they have a problem with every solution',
  'A bend in the road is not the end of the road','Traditions connect us to the past','Creative thinking and innovation result in a thriving environment',
  'Do not flinch in the face of adversity','Use your elbow grease to move ahead of the rest','Do not let the world take your hopes away','Action generates momentum'
];

const pad = (value) => String(value).padStart(2, '0');

function CardViewer({ type, index, title, onPrevious, onNext, children }) {
  const folder = type === 'visual' ? 'visual' : type === 'differentiator' ? 'differentiators' : 'phrases';
  const prefix = type === 'visual' ? 'visual' : type === 'differentiator' ? 'differentiator' : 'phrase';
  const imagePath = `/cards/${folder}/${prefix}-${pad(index + 1)}.png`;

  return (
    <section className={styles.viewerPanel}>
      <div className={styles.viewerHeader}>
        <div>
          <span className={styles.eyebrow}>Card {index + 1} of 40</span>
          <h2>{title}</h2>
        </div>
        <div className={styles.viewerControls}>
          <button type="button" onClick={onPrevious} aria-label="Previous card">&#8592;</button>
          <button type="button" onClick={onNext} aria-label="Next card">&#8594;</button>
        </div>
      </div>
      <div className={`${styles.cardStage} ${type === 'visual' ? styles.visualStage : ''}`}>
        <img src={imagePath} alt={title} className={styles.cardImage} />
      </div>
      {children}
    </section>
  );
}

export default function ExecutiveDashboard() {
  const [activeCollection, setActiveCollection] = useState('today');
  const [visualIndex, setVisualIndex] = useState(0);
  const [differentiatorIndex, setDifferentiatorIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(39);
  const [selectedDifferentiators, setSelectedDifferentiators] = useState([]);
  const [reflection, setReflection] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('its-selected-differentiators') || '[]');
      const savedReflection = localStorage.getItem('its-latest-reflection') || '';
      setSelectedDifferentiators(Array.isArray(saved) ? saved : []);
      setReflection(savedReflection);
    } catch {
      setSelectedDifferentiators([]);
    }
  }, []);

  const todayIndex = useMemo(() => {
    const day = Math.floor(Date.now() / 86400000);
    return day % 40;
  }, []);

  const cycle = (setter, direction) => setter((current) => (current + direction + 40) % 40);

  const toggleDifferentiator = (name) => {
    setSelectedDifferentiators((current) => {
      const updated = current.includes(name)
        ? current.filter((item) => item !== name)
        : current.length < 6 ? [...current, name] : current;
      localStorage.setItem('its-selected-differentiators', JSON.stringify(updated));
      return updated;
    });
  };

  const saveReflection = () => {
    localStorage.setItem('its-latest-reflection', reflection);
    setSavedMessage('Reflection saved to your executive diary.');
    window.setTimeout(() => setSavedMessage(''), 2800);
  };

  return (
    <main className={styles.pageShell}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>IS</span>
          <span><strong>Inspired to Succeed</strong><small>Executive Leadership Experience</small></span>
        </Link>
        <nav className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/toolkit">Toolkit</Link>
          <Link href="/coach">Coach</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Your private executive reflection room</span>
          <h1>Lead with clarity.<br />Choose with intention.</h1>
          <p>Explore the original Inspired to Succeed card collections, capture what each card awakens in you, and shape a leadership identity that is unmistakably your own.</p>
          <div className={styles.heroActions}>
            <button type="button" className={styles.primaryButton} onClick={() => setActiveCollection('today')}>Reveal today&apos;s card</button>
            <button type="button" className={styles.secondaryButton} onClick={() => setActiveCollection('differentiators')}>Build my Leadership DNA</button>
          </div>
        </div>
        <div className={styles.heroCardStack} aria-hidden="true">
          <img src={`/cards/visual/visual-${pad((todayIndex % 40) + 1)}.png`} alt="" className={styles.stackBack} />
          <img src={`/cards/differentiators/differentiator-${pad(((todayIndex + 9) % 40) + 1)}.png`} alt="" className={styles.stackMiddle} />
          <img src={`/cards/phrases/phrase-${pad(todayIndex + 1)}.png`} alt="" className={styles.stackFront} />
        </div>
      </section>

      <section className={styles.collectionBar} aria-label="Card collections">
        {[
          ['today', 'Today\'s Card', 'Daily executive prompt'],
          ['visual', 'Visual Reflections', '40 image cards'],
          ['differentiators', 'Differentiators', '40 leadership qualities'],
          ['phrases', 'Aligning Phrases', '40 wisdom cards']
        ].map(([id, label, detail]) => (
          <button key={id} type="button" className={activeCollection === id ? styles.activeCollection : ''} onClick={() => setActiveCollection(id)}>
            <strong>{label}</strong><span>{detail}</span>
          </button>
        ))}
      </section>

      <section className={styles.workspace}>
        {activeCollection === 'today' && (
          <div className={styles.todayGrid}>
            <CardViewer
              type="phrase"
              index={todayIndex}
              title={phrases[todayIndex]}
              onPrevious={() => { setPhraseIndex((todayIndex + 39) % 40); setActiveCollection('phrases'); }}
              onNext={() => { setPhraseIndex((todayIndex + 1) % 40); setActiveCollection('phrases'); }}
            >
              <div className={styles.cardCaption}>
                <span>Today&apos;s executive invitation</span>
                <strong>What will you do differently because of this card?</strong>
              </div>
            </CardViewer>

            <aside className={styles.reflectionPanel}>
              <span className={styles.eyebrow}>Executive Diary</span>
              <h2>Turn insight into action.</h2>
              <label htmlFor="reflection">My reflection and leadership commitment</label>
              <textarea id="reflection" value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="Write what this card is asking of you today..." />
              <button type="button" className={styles.primaryButton} onClick={saveReflection}>Save reflection</button>
              {savedMessage && <p className={styles.savedMessage}>{savedMessage}</p>}
              <div className={styles.coachPrompt}>
                <span>Coach conversation</span>
                <p>Take this reflection into your next coaching session and ask: “What might I be avoiding?”</p>
                <Link href="/coach">Open coach portal &#8594;</Link>
              </div>
            </aside>
          </div>
        )}

        {activeCollection === 'visual' && (
          <CardViewer type="visual" index={visualIndex} title={`Visual Reflection ${visualIndex + 1}`} onPrevious={() => cycle(setVisualIndex, -1)} onNext={() => cycle(setVisualIndex, 1)}>
            <div className={styles.promptGrid}>
              <article><span>Notice</span><p>What is the first detail that draws your attention?</p></article>
              <article><span>Connect</span><p>Where does this image meet your current leadership reality?</p></article>
              <article><span>Act</span><p>What decision, conversation or action does it invite?</p></article>
            </div>
          </CardViewer>
        )}

        {activeCollection === 'differentiators' && (
          <div className={styles.dnaGrid}>
            <CardViewer type="differentiator" index={differentiatorIndex} title={differentiators[differentiatorIndex]} onPrevious={() => cycle(setDifferentiatorIndex, -1)} onNext={() => cycle(setDifferentiatorIndex, 1)}>
              <button type="button" className={selectedDifferentiators.includes(differentiators[differentiatorIndex]) ? styles.selectedButton : styles.primaryButton} onClick={() => toggleDifferentiator(differentiators[differentiatorIndex])}>
                {selectedDifferentiators.includes(differentiators[differentiatorIndex]) ? 'Selected for my Leadership DNA' : 'Add to my Leadership DNA'}
              </button>
            </CardViewer>
            <aside className={styles.dnaPanel}>
              <span className={styles.eyebrow}>Leadership DNA</span>
              <h2>Choose up to six differentiators.</h2>
              <p>These are the qualities you want people to consistently experience when they are led by you.</p>
              <div className={styles.dnaTokens}>
                {selectedDifferentiators.length ? selectedDifferentiators.map((item, idx) => (
                  <button key={item} type="button" onClick={() => toggleDifferentiator(item)}><span>{idx + 1}</span>{item}<b>&times;</b></button>
                )) : <em>Your selected leadership qualities will appear here.</em>}
              </div>
              <div className={styles.dnaCount}>{selectedDifferentiators.length}<span>/ 6 selected</span></div>
            </aside>
          </div>
        )}

        {activeCollection === 'phrases' && (
          <CardViewer type="phrase" index={phraseIndex} title={phrases[phraseIndex]} onPrevious={() => cycle(setPhraseIndex, -1)} onNext={() => cycle(setPhraseIndex, 1)}>
            <div className={styles.cardCaption}>
              <span>Aligning question</span>
              <strong>How would your next decision change if you fully lived this phrase?</strong>
            </div>
          </CardViewer>
        )}
      </section>

      <section className={styles.bottomCollections}>
        <article><span>01</span><div><strong>See differently</strong><p>Use imagery to surface what ordinary conversation may miss.</p></div></article>
        <article><span>02</span><div><strong>Name your difference</strong><p>Choose the qualities that define your leadership signature.</p></div></article>
        <article><span>03</span><div><strong>Align your action</strong><p>Translate each phrase into a visible commitment.</p></div></article>
      </section>
    </main>
  );
}
