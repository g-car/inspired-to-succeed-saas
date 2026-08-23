'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const themes = [
  {
    id: 'values-driven',
    number: '01',
    title: 'Values Driven',
    statement:
      'Leadership begins with clarity about values, discipline, adaptability, courage and responsible citizenship.',
    modules: [
      {
        number: '1.1',
        title: 'Values',
        quote: 'I measure time through the value it provides.',
        author: 'Anonymous',
      },
      {
        number: '1.2',
        title: 'Discipline',
        quote: 'Discipline conquers stormy seas.',
        author: 'Wezi Khoza',
      },
      {
        number: '1.3',
        title: 'Agility',
        quote: 'Intelligence is the ability to quickly adapt to change.',
        author: 'Jonas Ridderstrale et al.',
      },
      {
        number: '1.4',
        title: 'Courageous Leadership',
        quote:
          'Boldness is not second nature to everyone, it is intentionality.',
        author: 'Janna Cachola',
      },
      {
        number: '1.5',
        title: 'Citizenship',
        quote:
          'Ask not what the country can do for you – ask what you can do for your country.',
        author: 'John F. Kennedy',
      },
    ],
  },

  {
    id: 'cultural-competence',
    number: '02',
    title: 'Cultural Competence',
    statement:
      'Leadership is strengthened through collaboration, inclusion, relationships, emotional awareness and responsible engagement with society.',
    modules: [
      {
        number: '2.1',
        title: 'Collaboration',
        quote:
          'Going fast to get there quicker and going together to go far.',
        author: 'African Proverb',
      },
      {
        number: '2.2',
        title: 'Diversity, Equity, Inclusion & Belonging',
        quote:
          'Do not glorify the Hunter until you hear the stories of the Hunted.',
        author: 'Wezi Khoza',
      },
      {
        number: '2.3',
        title: 'Environmental, Societal & Governance',
        quote:
          'Doing ESG right can tip poverty, inequality and unemployment to lower counts.',
        author: 'Anonymous',
      },
      {
        number: '2.4',
        title: 'Globalisation',
        quote: 'Keep sight of the shore while discovering the ocean.',
        author: 'Anonymous',
      },
      {
        number: '2.5',
        title: 'Relations',
        quote: 'Presence is my mantra because presence is power.',
        author: 'Wezi Khoza',
      },
      {
        number: '2.6',
        title: 'Competition',
        quote:
          'Competition brings out the best in products and the worst in people.',
        author: 'David Sarnoff',
      },
      {
        number: '2.7',
        title: 'Social Intelligence',
        quote: 'The New Science of Human Relationships.',
        author: 'Daniel Goleman',
      },
      {
        number: '2.8',
        title: 'Emotional Intelligence',
        quote: 'IQ gets you hired. EQ gets you promoted.',
        author: 'Anonymous',
      },
    ],
  },

  {
    id: 'performance-centred',
    number: '03',
    title: 'Performance Centred',
    statement:
      'Executive performance requires innovation, intelligence, change leadership, decision-making, problem solving and governance.',
    modules: [
      {
        number: '3.1',
        title: 'Innovation',
        quote:
          'Traditions connect us to the past and innovation connects us to the future.',
        author: 'Anonymous',
      },
      {
        number: '3.2',
        title: 'Business Intelligence',
        quote: 'The measure of intelligence is the ability to change.',
        author: 'Albert Einstein',
      },
      {
        number: '3.3',
        title: 'Change Leadership',
        quote:
          'The only way to make sense out of change is to plunge into it, move with it, and join the dance.',
        author: 'Alan Watts',
      },
      {
        number: '3.4',
        title: 'Decision Making',
        quote: 'Trust your gut but weigh your options.',
        author: 'Wezi Khoza',
      },
      {
        number: '3.5',
        title: 'Problem Solving',
        quote: 'A problem shared is a problem halved.',
        author: 'Joanne Harris',
      },
      {
        number: '3.6',
        title: 'Governance',
        quote:
          'The speed of decision making is the essence of good governance.',
        author: 'Piyush Goyal',
      },
    ],
  },

  {
    id: 'strategic-integrative',
    number: '04',
    title: 'Strategic & Integrative',
    statement:
      'Strategic leadership requires positioning, technological understanding, foresight, knowledge and the ability to translate complexity into direction.',
    modules: [
      {
        number: '4.1',
        title: 'Positioning',
        quote:
          'Your brand is what people say about you when you’re not in the room.',
        author: 'Jeff Bezos',
      },
      {
        number: '4.2',
        title: 'Artificial Intelligence',
        quote: 'There is an island of opportunity in every complexity.',
        author: 'Wezi Khoza',
      },
      {
        number: '4.3',
        title: 'Information, Communication & Technology',
        quote: 'You snooze, you lose.',
        author: 'Anonymous',
      },
      {
        number: '4.4',
        title: 'Digital Transformation',
        quote:
          'Some people don’t like change, but you need to embrace change if the alternative is disaster.',
        author: 'Elon Musk',
      },
      {
        number: '4.5',
        title: 'Infrastructure Development',
        quote:
          'Invent yourself and then reinvent yourself, don’t swim in the same slough.',
        author: 'Charles Bukowski',
      },
      {
        number: '4.6',
        title: 'Knowledge Management',
        quote:
          'Knowledge is like a garden, if it is not cultivated, it cannot be harvested.',
        author: 'African Proverb',
      },
      {
        number: '4.7',
        title: 'Strategic Thinking',
        quote:
          'Some people wish it would happen, some want it to happen and others make it happen.',
        author: 'Michael Jordan',
      },
    ],
  },

  {
    id: 'people-oriented',
    number: '05',
    title: 'People Oriented',
    statement:
      'Leadership is sustained through talent, health, reward, succession, coaching, sponsorship and effective leadership across changing work environments.',
    modules: [
      {
        number: '5.1',
        title: 'Talent Attraction',
        quote: 'Talent makes capital dance.',
        author: 'Jonas Ridderstrale & Kjell Nordstrom',
      },
      {
        number: '5.2',
        title: 'Corporate Health',
        quote: 'The first wealth is health.',
        author: 'Ralph Waldo Emerson',
      },
      {
        number: '5.3',
        title: 'Reward',
        quote:
          'People work for money but will go an extra mile for recognition and rewards.',
        author: 'Dale Carnegie',
      },
      {
        number: '5.4',
        title: 'Succession Planning',
        quote: 'A leader’s lasting value is measured by succession.',
        author: 'John C. Maxwell',
      },
      {
        number: '5.5',
        title: 'Executive Coaching',
        quote:
          'The function of leadership is to produce more leaders, not more followers.',
        author: 'Ralph Nader',
      },
      {
        number: '5.6',
        title: 'Executive Sponsorship',
        quote:
          'Somebody opened the door for me; I entered and left it open while opening others.',
        author: 'Wezi Khoza',
      },
      {
        number: '5.7',
        title: 'Leading a Remote Workforce',
        quote: 'Start where you are, use what you have, do what you can.',
        author: 'Arthur Ashe',
      },
    ],
  },

  {
    id: 'personal-development',
    number: '06',
    title: 'Personal Development',
    statement:
      'The executive journey also requires expertise, data literacy, growth, influence, self-mastery, visualisation and confidence.',
    modules: [
      {
        number: '6.1',
        title: 'Industry Expertise',
        quote:
          'The future belongs to those who believe in the beauty of their dreams.',
        author: 'Eleanor Roosevelt',
      },
      {
        number: '6.2',
        title: 'Understanding Data',
        quote: 'In God we trust, others must bring data.',
        author: 'W. Edward Deming',
      },
      {
        number: '6.3',
        title: 'Growth Mindset',
        quote: 'Believe you can, and you are halfway there.',
        author: 'Theodore Roosevelt',
      },
      {
        number: '6.4',
        title: 'Influence',
        quote:
          'The key to successful leadership is influence, not authority.',
        author: 'Ken Blanchard',
      },
      {
        number: '6.5',
        title: 'Self-Mastery',
        quote:
          'Do it right the first time, and make sure even the last time, it is right.',
        author: 'Wezi Khoza',
      },
      {
        number: '6.6',
        title: 'Visualisation',
        quote: 'Imagine it, go ahead and make it real.',
        author: 'Wezi Khoza',
      },
      {
        number: '6.7',
        title: 'Imposter Syndrome',
        quote: 'Fake it until there is no doubt.',
        author: 'Wezi Khoza',
      },
    ],
  },
];

export default function LeadershipReflectionsPage() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);

  const theme = themes[themeIndex];
  const module = theme.modules[moduleIndex];

  const totalModules = useMemo(
    () => themes.reduce((total, item) => total + item.modules.length, 0),
    []
  );

  function chooseTheme(index) {
    setThemeIndex(index);
    setModuleIndex(0);
  }

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <Link href="/toolkit" style={styles.back}>
            ← Back to Toolkit
          </Link>

          <span style={styles.eyebrow}>
            01 · EXECUTIVE COMPETENCY REFLECTIONS
          </span>

          <h1 style={styles.heroTitle}>
            Explore the leader you are becoming.
          </h1>

          <p style={styles.heroText}>
            Move through Wezi Khoza&apos;s six leadership themes and forty
            competency modules as a deliberate executive reflection journey.
          </p>

          <div style={styles.heroMetrics}>
            <div style={styles.metric}>
              <strong>6</strong>
              <span>Leadership themes</span>
            </div>

            <div style={styles.metric}>
              <strong>{totalModules}</strong>
              <span>Competency modules</span>
            </div>

            <div style={styles.metric}>
              <strong>1</strong>
              <span>Leadership journey</span>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.themeSection}>
        <span style={styles.sectionLabel}>
          CHOOSE A LEADERSHIP THEME
        </span>

        <h2 style={styles.sectionTitle}>
          Where should your reflection begin?
        </h2>

        <div style={styles.themeGrid}>
          {themes.map((item, index) => {
            const active = index === themeIndex;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => chooseTheme(index)}
                style={{
                  ...styles.themeCard,
                  ...(active ? styles.themeCardActive : {}),
                }}
              >
                <span style={styles.themeNumber}>
                  {item.number}
                </span>

                <strong style={styles.themeName}>
                  {item.title}
                </strong>

                <span style={styles.moduleCount}>
                  {item.modules.length} modules
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section style={styles.workspace}>
        <div style={styles.themeOverview}>
          <span style={styles.sectionLabel}>
            THEME {theme.number}
          </span>

          <h2 style={styles.workspaceTitle}>
            {theme.title}
          </h2>

          <p style={styles.workspaceDescription}>
            {theme.statement}
          </p>

          <div style={styles.moduleList}>
            {theme.modules.map((item, index) => {
              const active = index === moduleIndex;

              return (
                <button
                  type="button"
                  key={item.number}
                  onClick={() => setModuleIndex(index)}
                  style={{
                    ...styles.moduleButton,
                    ...(active ? styles.moduleButtonActive : {}),
                  }}
                >
                  <span>{item.number}</span>
                  <strong>{item.title}</strong>
                </button>
              );
            })}
          </div>
        </div>

        <div style={styles.currentModule}>
          <span style={styles.goldLabel}>
            CURRENT REFLECTION
          </span>

          <div style={styles.moduleHeader}>
            <span style={styles.largeNumber}>
              {module.number}
            </span>

            <div>
              <h2 style={styles.moduleTitle}>
                {module.title}
              </h2>

              <p style={styles.quote}>
                “{module.quote}”
              </p>

              <span style={styles.quoteAuthor}>
                {module.author}
              </span>
            </div>
          </div>

          <div style={styles.reflectionPrompt}>
            <span style={styles.promptLabel}>
              YOUR EXECUTIVE REFLECTION
            </span>

            <h3 style={styles.promptTitle}>
              What does this competency require from you at this stage of your
              leadership journey?
            </h3>

            <p style={styles.promptText}>
              Consider your current behaviour, the impact on others, what is
              working, what requires greater alignment and the leader you want
              to become.
            </p>

            <textarea
              rows="7"
              placeholder="Write your reflection here..."
              style={styles.textarea}
            />

            <div style={styles.reflectionActions}>
              <button type="button" style={styles.secondaryButton}>
                Save reflection
              </button>

              <button type="button" style={styles.goldButton}>
                Continue with this module →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.authorSection}>
        <div>
          <span style={styles.goldLabel}>
            THE INSPIRED TO SUCCEED™ APPROACH
          </span>

          <h2 style={styles.authorTitle}>
            Clarity precedes performance.
          </h2>
        </div>

        <p style={styles.authorText}>
          This is not intended to be a passive questionnaire. Your reflections
          should progressively reveal your leadership posture, areas requiring
          development, the values guiding your decisions and the future you are
          intentionally creating.
        </p>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f7f4ee',
    color: '#171511',
  },

  hero: {
    background:
      'linear-gradient(135deg,#17150f 0%,#282117 100%)',
    color: '#fff',
  },

  heroInner: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '56px 24px 64px',
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
    margin: '15px 0 20px',
    fontFamily: 'Georgia,serif',
    fontSize: 'clamp(44px,6vw,70px)',
    lineHeight: 1.02,
  },

  heroText: {
    maxWidth: '760px',
    margin: 0,
    color: 'rgba(255,255,255,.72)',
    fontSize: '18px',
    lineHeight: 1.7,
  },

  heroMetrics: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '34px',
  },

  metric: {
    minWidth: '150px',
    padding: '16px 20px',
    borderRadius: '13px',
    border: '1px solid rgba(255,255,255,.13)',
    background: 'rgba(255,255,255,.06)',
    display: 'grid',
    gap: '4px',
  },

  themeSection: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '58px 24px 30px',
  },

  sectionLabel: {
    color: '#986d12',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '.15em',
  },

  sectionTitle: {
    margin: '12px 0 28px',
    fontFamily: 'Georgia,serif',
    fontSize: '38px',
  },

  themeGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(190px,1fr))',
    gap: '12px',
  },

  themeCard: {
    minHeight: '160px',
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid #ddd2c2',
    background: '#fff',
    cursor: 'pointer',
    display: 'grid',
    alignContent: 'space-between',
    gap: '10px',
    textAlign: 'left',
  },

  themeCardActive: {
    background: '#dda72c',
    borderColor: '#dda72c',
    transform: 'translateY(-2px)',
  },

  themeNumber: {
    fontSize: '11px',
    fontWeight: 900,
    color: '#7d5a10',
  },

  themeName: {
    fontFamily: 'Georgia,serif',
    fontSize: '22px',
    lineHeight: 1.2,
  },

  moduleCount: {
    color: '#70675d',
    fontSize: '12px',
  },

  workspace: {
    maxWidth: '1320px',
    margin: '0 auto',
    padding: '34px 24px 80px',
    display: 'grid',
    gridTemplateColumns:
      'minmax(300px,.75fr) minmax(0,1.25fr)',
    gap: '22px',
    alignItems: 'start',
  },

  themeOverview: {
    padding: '26px',
    borderRadius: '20px',
    background: '#fff',
    border: '1px solid #e2d7c9',
  },

  workspaceTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '34px',
    margin: '12px 0',
  },

  workspaceDescription: {
    color: '#70685f',
    lineHeight: 1.7,
  },

  moduleList: {
    display: 'grid',
    gap: '8px',
    marginTop: '24px',
  },

  moduleButton: {
    minHeight: '54px',
    padding: '10px 13px',
    borderRadius: '10px',
    border: '1px solid #e1d8cc',
    background: '#f7f3ed',
    cursor: 'pointer',
    display: 'grid',
    gridTemplateColumns: '45px 1fr',
    gap: '7px',
    alignItems: 'center',
    textAlign: 'left',
  },

  moduleButtonActive: {
    background: '#191713',
    color: '#fff',
    borderColor: '#191713',
  },

  currentModule: {
    padding: '30px',
    borderRadius: '22px',
    background: '#fff',
    border: '1px solid #e2d7c9',
  },

  goldLabel: {
    color: '#dda72c',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '.15em',
  },

  moduleHeader: {
    display: 'grid',
    gridTemplateColumns: '90px 1fr',
    gap: '20px',
    marginTop: '18px',
    paddingBottom: '26px',
    borderBottom: '1px solid #eee5da',
  },

  largeNumber: {
    fontFamily: 'Georgia,serif',
    fontSize: '48px',
    color: '#dda72c',
  },

  moduleTitle: {
    margin: 0,
    fontFamily: 'Georgia,serif',
    fontSize: '38px',
  },

  quote: {
    margin: '14px 0 6px',
    fontFamily: 'Georgia,serif',
    fontSize: '20px',
    lineHeight: 1.5,
  },

  quoteAuthor: {
    color: '#8a7e70',
    fontSize: '12px',
  },

  reflectionPrompt: {
    marginTop: '28px',
  },

  promptLabel: {
    color: '#986d12',
    fontSize: '10px',
    fontWeight: 900,
    letterSpacing: '.14em',
  },

  promptTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '26px',
    lineHeight: 1.35,
  },

  promptText: {
    color: '#6f675d',
    lineHeight: 1.7,
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    marginTop: '14px',
    padding: '15px',
    border: '1px solid #ddd2c3',
    borderRadius: '12px',
    font: 'inherit',
    lineHeight: 1.6,
    resize: 'vertical',
  },

  reflectionActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '14px',
  },

  secondaryButton: {
    minHeight: '48px',
    padding: '0 18px',
    borderRadius: '10px',
    border: '1px solid #1b1916',
    background: '#fff',
    fontWeight: 800,
    cursor: 'pointer',
  },

  goldButton: {
    minHeight: '48px',
    padding: '0 18px',
    borderRadius: '10px',
    border: 0,
    background: '#dda72c',
    fontWeight: 900,
    cursor: 'pointer',
  },

  authorSection: {
    padding:
      '60px max(24px,calc((100vw - 1320px)/2))',
    background: '#181612',
    color: '#fff',
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,.8fr) minmax(0,1.2fr)',
    gap: '40px',
    alignItems: 'center',
  },

  authorTitle: {
    margin: '12px 0',
    fontFamily: 'Georgia,serif',
    fontSize: '38px',
  },

  authorText: {
    margin: 0,
    color: 'rgba(255,255,255,.7)',
    lineHeight: 1.8,
    fontSize: '17px',
  },
};
