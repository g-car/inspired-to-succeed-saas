'use client';

import { useMemo, useState } from 'react';

const themes = [
  {
    id: 'values',
    name: 'Values Driven',
    modules: [
      'Values',
      'Discipline',
      'Agility',
      'Courageous Leadership',
      'Citizenship',
    ],
  },
  {
    id: 'culture',
    name: 'Cultural Competence',
    modules: [
      'Collaboration',
      'Diversity, Equity, Inclusion & Belonging',
      'Environmental, Societal & Governance',
      'Globalisation',
      'Relations',
      'Competition',
      'Social Intelligence',
      'Emotional Intelligence',
    ],
  },
  {
    id: 'performance',
    name: 'Performance Centred',
    modules: [
      'Innovation',
      'Business Intelligence',
      'Change Leadership',
      'Decision Making',
      'Problem Solving',
      'Governance',
    ],
  },
  {
    id: 'strategy',
    name: 'Strategic & Integrative',
    modules: [
      'Positioning',
      'Artificial Intelligence',
      'Information, Communication & Technology',
      'Digital Transformation',
      'Infrastructure Development',
      'Knowledge Management',
      'Strategic Thinking',
    ],
  },
  {
    id: 'people',
    name: 'People Oriented',
    modules: [
      'Talent Attraction',
      'Corporate Health',
      'Reward',
      'Succession Planning',
      'Executive Coaching',
      'Executive Sponsorship',
      'Leading a Remote Workforce',
    ],
  },
  {
    id: 'personal',
    name: 'Personal Development',
    modules: [
      'Industry Expertise',
      'Understanding Data',
      'Growth Mindset',
      'Influence',
      'Self-Mastery',
      'Visualisation',
      'Imposter Syndrome',
    ],
  },
];

const moduleContent = {
  Values: {
    quote: 'Values before titles. Impact over ego.',
    author: 'Inspired to Succeed™',
    intro:
      'Clarify what truly guides you when responsibility, pressure and competing interests collide.',
    questions: [
      'Which values guide my leadership decisions most often?',
      'Where in my life or leadership do I need greater alignment with my values?',
      'How do my values show up in the way I treat power, authority and responsibility?',
      'What principles guide my decisions in uncertainty?',
      'Am I leading from conviction or convenience?',
    ],
  },

  Discipline: {
    quote: 'Discipline conquers stormy seas.',
    author: 'Wezi Khoza',
    intro:
      'Discipline turns intention into dependable leadership behaviour.',
    questions: [
      'Where do I need to say no more often to protect my energy and focus?',
      'How do I hold myself accountable when no one is watching?',
      'How do I want to show up when motivation fades but commitment remains?',
      'What non-negotiable routines anchor my mornings and evenings?',
      'What disciplined boundaries will I set around availability and decision-making?',
    ],
  },

  Agility: {
    quote: 'Intelligence is the ability to quickly adapt to change.',
    author: 'Inspired to Succeed™',
    intro:
      'Agility asks the executive to remain strategically anchored while adapting intelligently.',
    questions: [
      'How do I respond when priorities suddenly change?',
      'Which emerging trends or technologies should I pay attention to this year?',
      'Where can agility be modelled from executive level to the shopfloor?',
      'How do I balance long-term strategy with short-term adaptability?',
      'What would a genuinely agile organisation look like?',
    ],
  },

  'Courageous Leadership': {
    quote: 'Boldness is intentional.',
    author: 'Inspired to Succeed™',
    intro:
      'Courageous leadership concerns voice, visibility, conviction and difficult decisions.',
    questions: [
      'Where am I being called to use my voice more powerfully?',
      'How can I lead visibly without shrinking or over-explaining?',
      'What bold decision would move the organisation forward?',
      'Where am I choosing comfort over conviction?',
      'What perspective or insight do I bring that no one else can?',
    ],
  },

  Citizenship: {
    quote: 'Leadership reaches beyond the organisation.',
    author: 'Inspired to Succeed™',
    intro:
      'Executive citizenship connects leadership responsibility to community and the wider public good.',
    questions: [
      'What principles guide my decisions as a citizen and leader?',
      'How do I define responsible citizenship in my role?',
      'Which community issues are closest to my heart?',
      'Which partnerships could amplify my social impact?',
      'How can I balance profit, growth and social good?',
    ],
  },

  Collaboration: {
    quote: 'Going fast to get there quicker and going together to go far.',
    author: 'African Proverb',
    intro:
      'Collaboration becomes strategic when leaders intentionally share power, insight and responsibility.',
    questions: [
      'How does collaboration advance the mission and long-term vision?',
      'Where is collaboration a strategic advantage?',
      'How do I model collaboration through my decisions and behaviour?',
      'Where should competition be replaced with cooperation?',
      'What beliefs about power or control may be limiting collaboration?',
    ],
  },

  'Diversity, Equity, Inclusion & Belonging': {
    quote: 'Do not glorify the hunter until you hear the stories of the hunted.',
    author: 'Wezi Khoza',
    intro:
      'Inclusive leadership examines systems, resources, voice, fairness and belonging.',
    questions: [
      'Is DEIB leadership progressive or counter-productive for my organisation and why?',
      'How do I model inclusive leadership in everyday decisions?',
      'How am I resourcing equity beyond intention?',
      'What does the organisation look like when belonging is genuinely lived?',
      'What systems or mindsets need to be dismantled or rebuilt?',
    ],
  },

  'Environmental, Societal & Governance': {
    quote: 'Responsible leadership must create value beyond compliance.',
    author: 'Inspired to Succeed™',
    intro:
      'ESG becomes leadership when environmental and social responsibility are embedded into strategy.',
    questions: [
      'How does our business model actively regenerate rather than only reduce harm?',
      'How are ESG goals aligned with financial performance?',
      'How do we demonstrate transparency and accountability?',
      'How do we ensure ESG is strategic rather than merely compliance driven?',
      'How does ESG support long-term resilience and value creation?',
    ],
  },

  Globalisation: {
    quote: 'Keep sight of the shore while discovering the ocean.',
    author: 'Inspired to Succeed™',
    intro:
      'Global leadership requires expansion without losing relevance, identity or strategic anchoring.',
    questions: [
      'Which regions or markets am I strategically called to engage?',
      'How does my work contribute to a more connected world?',
      'How do I want my leadership to be experienced across cultures?',
      'How do I balance global standardisation with local relevance?',
      'What anchors me when global uncertainty rises?',
    ],
  },

  Relations: {
    quote: 'Presence is my mantra because presence is power.',
    author: 'Wezi Khoza',
    intro:
      'Relationships shape trust, influence, reputation and the capacity to achieve through others.',
    questions: [
      'How do my values influence the way I connect with others?',
      'What communication habits can strengthen trust and collaboration?',
      'How can I maintain mutually beneficial relationships?',
      'Which networks should I intentionally engage?',
      'How will I measure the success of my relationships?',
    ],
  },

  Competition: {
    quote: 'Know the field without losing yourself in it.',
    author: 'Inspired to Succeed™',
    intro:
      'Competitive intelligence should sharpen leadership without weakening values.',
    questions: [
      'Who are my main competitors and what are they doing differently?',
      'Who could disrupt our business in the next three to five years?',
      'Am I encouraging enough innovation from my team?',
      'How can I model resilience against competitive pressure?',
      'Which leadership qualities do I need to sharpen?',
    ],
  },

  'Social Intelligence': {
    quote: 'Leadership is experienced through relationships.',
    author: 'Inspired to Succeed™',
    intro:
      'Social intelligence develops awareness of people, context and the quality of interpersonal influence.',
    questions: [
      'What emotional triggers do I need to manage better?',
      'How can I create a culture where people feel heard and respected?',
      'Which limiting beliefs about social interaction should I release?',
      'What helps me connect more authentically?',
      'How can my organisation demonstrate empathy?',
    ],
  },

  'Emotional Intelligence': {
    quote: 'Emotional awareness strengthens leadership judgement.',
    author: 'Inspired to Succeed™',
    intro:
      'Emotional intelligence supports resilience, communication and judgement under pressure.',
    questions: [
      'How do I deal with situations that trigger frustration or impatience?',
      'How do I model resilience and adaptability?',
      'How do I respond to setbacks and criticism?',
      'How do I recognise when colleagues are struggling?',
      'How can I improve communication during conflict?',
    ],
  },

  Innovation: {
    quote: 'Traditions connect us to the past and innovation connects us to the future.',
    author: 'Inspired to Succeed™',
    intro:
      'Innovation requires environments where ideas can be tested, challenged and translated into value.',
    questions: [
      'If disruption is inevitable, how do I want to lead it?',
      'Where should innovation be incremental versus transformational?',
      'What kind of innovation culture do I want to model?',
      'What processes are currently stifling innovation?',
      'How do I empower people to think beyond their job titles?',
    ],
  },

  'Business Intelligence': {
    quote: 'Insight only matters when it improves decisions.',
    author: 'Inspired to Succeed™',
    intro:
      'Business Intelligence should translate evidence into executive understanding and action.',
    questions: [
      'How can I remain focused while managing high-level BI responsibilities?',
      'What knowledge can expand my BI expertise?',
      'How can I make data insights compelling and actionable?',
      'What new BI tools or analytics approaches should I explore?',
      'What important information cannot easily be counted?',
    ],
  },

  'Change Leadership': {
    quote: 'Change must be led, not merely announced.',
    author: 'Inspired to Succeed™',
    intro:
      'Change leadership connects purpose, people, culture and organisational movement.',
    questions: [
      'What should inform my decision to effect organisational change?',
      'What mindset shifts are required?',
      'Which priorities will determine successful implementation?',
      'Which cultural shifts are necessary?',
      'How do I ensure organisational values survive change?',
    ],
  },

  'Decision Making': {
    quote: 'Trust your gut but weigh your options.',
    author: 'Wezi Khoza',
    intro:
      'Executive decisions combine judgement, evidence, intuition and accountability.',
    questions: [
      'How would I describe my current decision-making style?',
      'What patterns exist in my best and worst decisions?',
      'What major decisions am I likely to face soon?',
      'Which decisions could create the greatest impact?',
      'What information do I rely on and is it sufficient?',
    ],
  },

  'Problem Solving': {
    quote: 'Complex problems require disciplined curiosity.',
    author: 'Inspired to Succeed™',
    intro:
      'Effective problem solving combines clarity, evidence, creativity and collective intelligence.',
    questions: [
      'How do I define a successful solution?',
      'How can I improve critical and creative thinking?',
      'Which tools can strengthen my problem-solving ability?',
      'What environment supports innovative problem solving?',
      'How will I know whether a solution has made a meaningful difference?',
    ],
  },

  Governance: {
    quote: 'Governance is stewardship made visible.',
    author: 'Inspired to Succeed™',
    intro:
      'Governance concerns trust, accountability, challenge and ethical boundaries.',
    questions: [
      'What governance legacy should this organisation be known for?',
      'How am I a steward of stakeholder trust?',
      'What governance blind spots must be addressed?',
      'How do I encourage constructive challenge?',
      'Which ethical line will I never cross?',
    ],
  },

  Positioning: {
    quote: 'Your brand is what people say about you when you are not in the room.',
    author: 'Jeff Bezos',
    intro:
      'Executive positioning connects identity, reputation and strategic visibility.',
    questions: [
      'What core strength must define my executive presence?',
      'How does my positioning serve people beyond status?',
      'What platforms align with my next level?',
      'What unique space could I occupy in my industry?',
      'Does my positioning reflect who I am becoming?',
    ],
  },

  'Artificial Intelligence': {
    quote: 'There is an island of opportunity in every complexity.',
    author: 'Wezi Khoza',
    intro:
      'AI leadership requires innovation, humanity, trust and responsible guardrails.',
    questions: [
      'How does my work in AI serve humanity?',
      'Where should my organisation be in five to ten years of AI evolution?',
      'How can AI remain inclusive and trustworthy?',
      'What guardrails are needed to prevent misuse or bias?',
      'What new AI capability or mindset must I master?',
    ],
  },

  'Information, Communication & Technology': {
    quote: 'You snooze, you lose.',
    author: 'Anonymous',
    intro:
      'ICT leadership requires technological awareness linked to strategic outcomes.',
    questions: [
      'Which technologies must I intentionally explore now?',
      'Where must I think bigger on ICT?',
      'How do I align ICT with business goals?',
      'How can ICT enable efficiency and sustainability?',
      'How do I prevent technology from overwhelming human wellbeing?',
    ],
  },

  'Digital Transformation': {
    quote: 'Transformation requires letting go before moving forward.',
    author: 'Inspired to Succeed™',
    intro:
      'Digital transformation changes systems, behaviour, collaboration and trust.',
    questions: [
      'Which legacy systems or mindsets must we release?',
      'How can I strengthen cross-silo collaboration?',
      'What values should drive transformation?',
      'Which metrics will demonstrate transformation value?',
      'How do cybersecurity, ethics and trust feature in our future?',
    ],
  },

  'Infrastructure Development': {
    quote: 'Build today for the future you intend to create.',
    author: 'Inspired to Succeed™',
    intro:
      'Infrastructure leadership connects future vision, innovation and partnerships.',
    questions: [
      'What is my infrastructure vision for the next five to ten years?',
      'Which projects would have the greatest transformative impact?',
      'How can AI and smart systems strengthen infrastructure?',
      'How can partnerships advance infrastructure goals?',
      'What images represent my ideal infrastructure future?',
    ],
  },

  'Knowledge Management': {
    quote: 'Knowledge is like a garden; if it is not cultivated, it cannot be harvested.',
    author: 'African Proverb',
    intro:
      'Knowledge must be preserved, shared and converted into better decisions.',
    questions: [
      'What knowledge should we preserve and share?',
      'How should knowledge management improve decision-making?',
      'What prevents effective knowledge sharing?',
      'Which processes need improvement?',
      'How can AI and ICT protect intellectual property?',
    ],
  },

  'Strategic Thinking': {
    quote: 'Some people wish it would happen, some want it to happen and others make it happen.',
    author: 'Michael Jordan',
    intro:
      'Strategic thinking connects long-term intent with environmental awareness and deliberate action.',
    questions: [
      'How can I inspire others to execute strategic vision?',
      'What long-term impact do I want to create?',
      'Which external factors could change our business?',
      'How can I balance short-term and long-term priorities?',
      'How do I turn complex challenges into opportunities?',
    ],
  },

  'Talent Attraction': {
    quote: 'Talent makes capital dance.',
    author: 'Inspired to Succeed™',
    intro:
      'Talent leadership concerns attraction, retention, development and reputation.',
    questions: [
      'Which strengths should I amplify to attract talent?',
      'How can we become an employer of choice?',
      'What gaps exist in our talent pipeline?',
      'Which practices will attract and retain top talent?',
      'How will we measure internal talent development?',
    ],
  },

  'Corporate Health': {
    quote: 'The first wealth is health.',
    author: 'Ralph Waldo Emerson',
    intro:
      'Corporate health supports sustainable human and organisational performance.',
    questions: [
      'How can I create a supportive and energised culture?',
      'Which initiatives will improve employee wellbeing?',
      'What role does innovation play in organisational health?',
      'Which metrics show that we are thriving?',
      'How can technology support holistic organisational health?',
    ],
  },

  Reward: {
    quote: 'Recognition gives meaning to contribution.',
    author: 'Inspired to Succeed™',
    intro:
      'Reward connects recognition, motivation, fairness and organisational value.',
    questions: [
      'What does a rewarding work experience look like?',
      'How can reward systems become more meaningful?',
      'Which factors influence our reward structure?',
      'How can rewards align with organisational goals?',
      'Which reward strategies suit our industry?',
    ],
  },

  'Succession Planning': {
    quote: 'A leader’s lasting value is measured by succession.',
    author: 'John C. Maxwell',
    intro:
      'Succession asks leaders to think beyond themselves toward continuity and future capability.',
    questions: [
      'How does succession planning benefit the organisation?',
      'How should the organisation evolve after I move on?',
      'What does a successful transition look like?',
      'How does succession support business continuity?',
      'How could AI strengthen succession planning?',
    ],
  },

  'Executive Coaching': {
    quote: 'The function of leadership is to produce more leaders, not more followers.',
    author: 'Ralph Nader',
    intro:
      'Coaching creates deliberate space for insight and behavioural change.',
    questions: [
      'Do I or members of my executive team require coaching?',
      'What benefits should coaching create?',
      'How should inclusion feature in executive coaching?',
      'How do I maintain wellbeing while leading and coaching?',
      'How can coaching inspire lasting impact?',
    ],
  },

  'Executive Sponsorship': {
    quote: 'Somebody opened the door for me; I entered and left it open while opening others.',
    author: 'Wezi Khoza',
    intro:
      'Sponsorship concerns advocacy, visibility, power structures and opportunity.',
    questions: [
      'Where do I need strategic advocacy rather than merit alone?',
      'What value makes sponsorship of me worthwhile?',
      'Which power structures must I better understand?',
      'What do I want sponsors to say when I am not in the room?',
      'Whom am I sponsoring and how visible is my advocacy?',
    ],
  },

  'Leading a Remote Workforce': {
    quote: 'Start where you are, use what you have, do what you can.',
    author: 'Arthur Ashe',
    intro:
      'Remote leadership requires trust, communication and psychological safety.',
    questions: [
      'Which values should guide remote interactions?',
      'How can I foster trust across distance?',
      'Which communication habits will keep the team connected?',
      'How can I balance transparency and efficiency?',
      'How can I encourage remote creativity?',
    ],
  },

  'Industry Expertise': {
    quote: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    intro:
      'Industry expertise requires continuous learning and anticipation of change.',
    questions: [
      'Which industry trends excite me most?',
      'How can I create knowledge that benefits others?',
      'Who are the thought leaders I can learn from?',
      'Which platforms could amplify my professional voice?',
      'How can I stay ahead of technological and market shifts?',
    ],
  },

  'Understanding Data': {
    quote: 'In God we trust; others must bring data.',
    author: 'W. Edwards Deming',
    intro:
      'Data becomes valuable when it strengthens executive judgement.',
    questions: [
      'What role does data play in organisational vision?',
      'How should data influence my decisions?',
      'What would a data-driven culture look like?',
      'Which insights matter most for strategic decisions?',
      'Which new technologies should I explore?',
    ],
  },

  'Growth Mindset': {
    quote: 'Believe you can, and you are halfway there.',
    author: 'Theodore Roosevelt',
    intro:
      'Growth mindset concerns learning, courage and reframing limitation.',
    questions: [
      'Which limiting thoughts have held me back?',
      'How do I respond to failure?',
      'How should my mindset influence others?',
      'Which bold goals stretch me?',
      'What practices keep me aligned with growth?',
    ],
  },

  Influence: {
    quote: 'The key to successful leadership is influence, not authority.',
    author: 'Ken Blanchard',
    intro:
      'Influence depends on credibility, relationships and impact.',
    questions: [
      'Who do I admire for their influence?',
      'Where can I have the greatest impact?',
      'Which stakeholders are critical for me to influence?',
      'How will I measure my influence?',
      'How do I balance influence with authenticity?',
    ],
  },

  'Self-Mastery': {
    quote: 'Do it right the first time, and make sure even the last time, it is right.',
    author: 'Wezi Khoza',
    intro:
      'Self-mastery begins with leading yourself before leading others.',
    questions: [
      'Who am I becoming beyond my title and achievements?',
      'How do I lead myself with integrity?',
      'How do I respond under pressure?',
      'How do I create calm and clarity in uncertainty?',
      'What boundaries reflect leadership maturity?',
    ],
  },

  Visualisation: {
    quote: 'Imagine it, go ahead and make it real.',
    author: 'Wezi Khoza',
    intro:
      'Visualisation asks you to see your next level clearly enough to move toward it.',
    questions: [
      'When I picture my highest self at work, what do I see?',
      'How do I want people to describe me?',
      'What parts of my identity am I ready to fully own?',
      'What does confidence look like in my posture and voice?',
      'Where am I seen, heard and recognised?',
    ],
  },

  'Imposter Syndrome': {
    quote: 'Fake it until there is no doubt.',
    author: 'Wezi Khoza',
    intro:
      'Examine achievement, confidence, evidence and visibility.',
    questions: [
      'Which achievements do I struggle to internalise?',
      'How do I respond to recognition?',
      'How does comparison affect my confidence?',
      'What evidence proves that I am capable and trusted?',
      'What does confident visibility look like?',
    ],
  },
};

const imageCards = [
  { id: 1, title: 'Leadership & Governance', symbol: '◈' },
  { id: 2, title: 'Achievement & Success', symbol: '★' },
  { id: 3, title: 'Knowledge & Learning', symbol: '◆' },
  { id: 4, title: 'Innovation & Technology', symbol: '◎' },
  { id: 5, title: 'People & Collaboration', symbol: '●' },
  { id: 6, title: 'Health & Wellbeing', symbol: '✦' },
  { id: 7, title: 'Growth & Possibility', symbol: '▲' },
  { id: 8, title: 'Legacy & Impact', symbol: '◇' },
];

const differentiators = [
  ['Authentic', '#6f946f'],
  ['Courageous', '#d5a52f'],
  ['Transformational', '#b86d4e'],
  ['Bold', '#273d59'],
  ['Purposeful', '#78638d'],
  ['Accountable', '#537c80'],
  ['Resilient', '#a65e5e'],
  ['Self-Aware', '#8b795d'],
  ['Decisive', '#416b59'],
  ['Collaborative', '#7b6a9e'],
  ['Confident', '#b98c31'],
  ['Trustworthy', '#4a758b'],
];

const aligningPhrases = [
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

const assessmentOptions = [
  'This is currently a leadership strength',
  'I demonstrate this fairly consistently',
  'I understand it but do not always practise it',
  'This requires deliberate development',
  'This is a significant leadership priority',
  'I need coaching or mentor support',
];

export default function ToolkitClient() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);

  const [ratings, setRatings] = useState({
    values: 3,
    culture: 3,
    performance: 3,
    strategy: 3,
    people: 3,
    personal: 3,
  });

  const [answers, setAnswers] = useState({});
  const [reflections, setReflections] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDifferentiator, setSelectedDifferentiator] = useState(null);
  const [selectedPhrase, setSelectedPhrase] = useState(null);

  const [cardMode, setCardMode] = useState('image');

  const [commitment, setCommitment] = useState('');
  const [deadline, setDeadline] = useState('');
  const [successEvidence, setSuccessEvidence] = useState('');
  const [savedRecords, setSavedRecords] = useState([]);

  const [mentorName, setMentorName] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorPrepared, setMentorPrepared] = useState(false);

  const theme = themes[themeIndex];
  const module = theme.modules[moduleIndex];
  const content = moduleContent[module];

  const rating = ratings[theme.id];

  const overallScore = useMemo(() => {
    const numbers = Object.values(ratings);

    return Math.round(
      (numbers.reduce((total, item) => total + item, 0) /
        (numbers.length * 5)) *
        100
    );
  }, [ratings]);

  function changeTheme(event) {
    setThemeIndex(Number(event.target.value));
    setModuleIndex(0);
    setAnswers({});
    setReflections({});
  }

  function changeModule(event) {
    setModuleIndex(Number(event.target.value));
    setAnswers({});
    setReflections({});
  }

  function updateRating(value) {
    setRatings((previous) => ({
      ...previous,
      [theme.id]: value,
    }));
  }

  function saveJourneyRecord() {
    const record = {
      id: Date.now(),
      theme: theme.name,
      module,
      rating,
      image: selectedImage,
      differentiator: selectedDifferentiator,
      phrase: selectedPhrase,
      commitment,
      deadline,
      successEvidence,
      createdAt: new Date().toLocaleString(),
    };

    setSavedRecords((previous) => [record, ...previous]);

    setCommitment('');
    setDeadline('');
    setSuccessEvidence('');
  }

  return (
    <div style={styles.shell}>
      <section style={styles.header}>
        <div>
          <span style={styles.eyebrow}>INSPIRED TO SUCCEED™</span>

          <h2 style={styles.headerTitle}>
            Reflection. Vision. Commitment.
          </h2>

          <p style={styles.headerText}>
            Work through Wezi Khoza&apos;s leadership framework and turn
            reflection into a visible personal leadership story.
          </p>
        </div>

        <div style={styles.journeyBadge}>
          <span>MY LEADERSHIP JOURNEY</span>
          <strong>{overallScore}%</strong>
          <small>Current Wheel of Success</small>
        </div>
      </section>

      <div style={styles.workspace}>
        <section style={styles.mainColumn}>
          <div style={styles.selectors}>
            <label style={styles.label}>
              Leadership theme
              <select
                value={themeIndex}
                onChange={changeTheme}
                style={styles.select}
              >
                {themes.map((item, index) => (
                  <option value={index} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Competency module
              <select
                value={moduleIndex}
                onChange={changeModule}
                style={styles.select}
              >
                {theme.modules.map((item, index) => (
                  <option value={index} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={styles.authorCard}>
            <span style={styles.eyebrow}>FROM THE TOOLKIT</span>

            <blockquote style={styles.quote}>
              “{content.quote}”
            </blockquote>

            <strong style={styles.author}>{content.author}</strong>

            <p style={styles.authorIntro}>{content.intro}</p>
          </div>

          <div style={styles.ratingCard}>
            <span style={styles.smallHeading}>CURRENT SELF-RATING</span>

            <strong style={styles.ratingNumber}>{rating}/5</strong>

            <input
              type="range"
              min="1"
              max="5"
              value={rating}
              onChange={(event) =>
                updateRating(Number(event.target.value))
              }
              style={styles.slider}
            />

            <div style={styles.ratingLabels}>
              <span>Needs attention</span>
              <span>Strong</span>
            </div>
          </div>

          {content.questions.map((question, index) => (
            <article style={styles.questionCard} key={question}>
              <span style={styles.questionNumber}>
                REFLECTION {String(index + 1).padStart(2, '0')}
              </span>

              <h3 style={styles.question}>{question}</h3>

              <label style={styles.label}>
                Where am I now?
                <select
                  value={answers[index] || ''}
                  onChange={(event) =>
                    setAnswers((previous) => ({
                      ...previous,
                      [index]: event.target.value,
                    }))
                  }
                  style={styles.select}
                >
                  <option value="">Choose an honest assessment...</option>

                  {assessmentOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}

                  <option>Other / Personal assessment</option>
                </select>
              </label>

              <label style={styles.label}>
                My own reflection
                <textarea
                  rows="3"
                  value={reflections[index] || ''}
                  onChange={(event) =>
                    setReflections((previous) => ({
                      ...previous,
                      [index]: event.target.value,
                    }))
                  }
                  placeholder="What does this mean in my own leadership context?"
                  style={styles.textarea}
                />
              </label>
            </article>
          ))}
        </section>

        <aside style={styles.visionStudio}>
          <span style={styles.eyebrow}>VISION BOARD STUDIO</span>

          <h2 style={styles.visionTitle}>
            Build my leadership story
          </h2>

          <p style={styles.sideText}>
            Connect what the book has awakened in you to an image, a leadership
            differentiator and an aligning phrase.
          </p>

          <div style={styles.tabs}>
            <button
              type="button"
              onClick={() => setCardMode('image')}
              style={{
                ...styles.tab,
                ...(cardMode === 'image' ? styles.activeTab : {}),
              }}
            >
              01 Image
            </button>

            <button
              type="button"
              onClick={() => setCardMode('differentiator')}
              style={{
                ...styles.tab,
                ...(cardMode === 'differentiator'
                  ? styles.activeTab
                  : {}),
              }}
            >
              02 Differentiator
            </button>

            <button
              type="button"
              onClick={() => setCardMode('phrase')}
              style={{
                ...styles.tab,
                ...(cardMode === 'phrase' ? styles.activeTab : {}),
              }}
            >
              03 Phrase
            </button>
          </div>

          {cardMode === 'image' && (
            <div>
              <h3 style={styles.cardInstruction}>
                Which image represents what you see?
              </h3>

              <div style={styles.imageGrid}>
                {imageCards.map((card) => {
                  const active = selectedImage?.id === card.id;

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setSelectedImage(card)}
                      style={{
                        ...styles.imageCard,
                        ...(active ? styles.selectedCard : {}),
                      }}
                    >
                      <span style={styles.imageSymbol}>
                        {card.symbol}
                      </span>

                      <strong>{card.title}</strong>

                      <small>
                        {active ? 'Selected ✓' : 'Select'}
                      </small>
                    </button>
                  );
                })}
              </div>

              <p style={styles.assetNote}>
                The original Wezi photographs will replace these visual
                placeholders when we upload the supplied image assets.
              </p>
            </div>
          )}

          {cardMode === 'differentiator' && (
            <div>
              <h3 style={styles.cardInstruction}>
                Who do I need to become?
              </h3>

              <div style={styles.differentiatorGrid}>
                {differentiators.map(([name, colour]) => {
                  const active =
                    selectedDifferentiator?.name === name;

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() =>
                        setSelectedDifferentiator({
                          name,
                          colour,
                        })
                      }
                      style={{
                        ...styles.differentiator,
                        background: colour,
                        outline: active
                          ? '4px solid #d6a42b'
                          : 'none',
                      }}
                    >
                      <strong>{name}</strong>

                      <span>
                        {active ? 'Selected ✓' : 'Choose'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {cardMode === 'phrase' && (
            <div>
              <h3 style={styles.cardInstruction}>
                Which thought should guide my action?
              </h3>

              <div style={styles.phraseList}>
                {aligningPhrases.map((phrase) => {
                  const active = selectedPhrase === phrase;

                  return (
                    <button
                      key={phrase}
                      type="button"
                      onClick={() => setSelectedPhrase(phrase)}
                      style={{
                        ...styles.phraseCard,
                        ...(active
                          ? styles.selectedPhrase
                          : {}),
                      }}
                    >
                      <span>“{phrase}”</span>

                      <small>
                        {active ? 'Selected ✓' : 'Choose this phrase'}
                      </small>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div style={styles.board}>
            <span style={styles.eyebrow}>MY VISION BOARD</span>

            <h3 style={styles.boardTitle}>
              The leader I am becoming
            </h3>

            {!selectedImage &&
            !selectedDifferentiator &&
            !selectedPhrase ? (
              <p style={styles.emptyText}>
                Select your three cards above. They will assemble here.
              </p>
            ) : (
              <div style={styles.boardItems}>
                {selectedImage && (
                  <div style={styles.boardImage}>
                    <span style={styles.boardSymbol}>
                      {selectedImage.symbol}
                    </span>
                    <strong>{selectedImage.title}</strong>
                  </div>
                )}

                {selectedDifferentiator && (
                  <div
                    style={{
                      ...styles.boardDifferentiator,
                      background:
                        selectedDifferentiator.colour,
                    }}
                  >
                    <small>I WILL BE</small>
                    <strong>
                      {selectedDifferentiator.name}
                    </strong>
                  </div>
                )}

                {selectedPhrase && (
                  <div style={styles.boardPhrase}>
                    <small>MY ALIGNING THOUGHT</small>
                    <strong>“{selectedPhrase}”</strong>
                  </div>
                )}
              </div>
            )}

            {(selectedImage ||
              selectedDifferentiator ||
              selectedPhrase) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedDifferentiator(null);
                  setSelectedPhrase(null);
                }}
                style={styles.clearButton}
              >
                Clear selections
              </button>
            )}
          </div>
        </aside>
      </div>

      <section style={styles.commitmentSection}>
        <div>
          <span style={styles.eyebrow}>
            DISCIPLINED COMMITMENT
          </span>

          <h2 style={styles.commitmentTitle}>
            What will change because of this reflection?
          </h2>

          <p style={styles.commitmentDescription}>
            Turn the book, your reflection and your chosen cards into one
            deliberate leadership action.
          </p>
        </div>

        <div style={styles.commitmentForm}>
          <label style={styles.label}>
            My leadership commitment
            <textarea
              rows="4"
              value={commitment}
              onChange={(event) =>
                setCommitment(event.target.value)
              }
              placeholder="I commit to..."
              style={styles.textarea}
            />
          </label>

          <label style={styles.label}>
            By when?
            <input
              value={deadline}
              onChange={(event) =>
                setDeadline(event.target.value)
              }
              placeholder="Example: 30 September"
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            What will prove success?
            <input
              value={successEvidence}
              onChange={(event) =>
                setSuccessEvidence(event.target.value)
              }
              placeholder="Evidence or observable result"
              style={styles.input}
            />
          </label>

          <button
            type="button"
            onClick={saveJourneyRecord}
            style={styles.goldButton}
          >
            Save to my leadership journey
          </button>
        </div>
      </section>

      <section style={styles.mentorSection}>
        <div>
          <span style={styles.eyebrow}>MENTOR CONNECTION</span>

          <h2 style={styles.mentorTitle}>
            Invite someone into my growth journey
          </h2>

          <p style={styles.sideText}>
            You will decide what a mentor can see. Private reflections remain
            private unless you choose to share them.
          </p>
        </div>

        <div style={styles.mentorForm}>
          <input
            value={mentorName}
            onChange={(event) =>
              setMentorName(event.target.value)
            }
            placeholder="Mentor name"
            style={styles.input}
          />

          <input
            type="email"
            value={mentorEmail}
            onChange={(event) => {
              setMentorEmail(event.target.value);
              setMentorPrepared(false);
            }}
            placeholder="Mentor email address"
            style={styles.input}
          />

          <button
            type="button"
            onClick={() =>
              mentorEmail.trim() &&
              setMentorPrepared(true)
            }
            style={styles.darkButton}
          >
            Prepare mentor invitation
          </button>

          {mentorPrepared && (
            <div style={styles.success}>
              Invitation prepared for{' '}
              <strong>
                {mentorName || mentorEmail}
              </strong>
              . Secure delivery will be connected when authentication is
              activated.
            </div>
          )}
        </div>
      </section>

      <section style={styles.savedSection}>
        <span style={styles.eyebrow}>
          MY LEADERSHIP EVIDENCE
        </span>

        <h2 style={styles.savedHeading}>
          Saved journey moments
        </h2>

        {savedRecords.length === 0 ? (
          <p style={styles.emptyState}>
            Nothing has been saved yet. Complete a reflection, select your
            cards and make a commitment.
          </p>
        ) : (
          <div style={styles.savedGrid}>
            {savedRecords.map((record) => (
              <article
                style={styles.savedCard}
                key={record.id}
              >
                <small style={styles.savedTheme}>
                  {record.theme}
                </small>

                <h3>{record.module}</h3>

                <p>
                  Self-rating:{' '}
                  <strong>{record.rating}/5</strong>
                </p>

                {record.differentiator && (
                  <p>
                    Leadership identity:{' '}
                    <strong>
                      {record.differentiator.name}
                    </strong>
                  </p>
                )}

                {record.phrase && (
                  <blockquote style={styles.savedQuote}>
                    “{record.phrase}”
                  </blockquote>
                )}

                {record.commitment && (
                  <div style={styles.savedCommitment}>
                    <small>MY COMMITMENT</small>
                    <p>{record.commitment}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  shell: {
    display: 'grid',
    gap: '28px',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '28px',
    padding: '30px',
    borderRadius: '22px',
    background:
      'linear-gradient(135deg,#171611,#292217)',
    color: '#fff',
  },

  eyebrow: {
    display: 'block',
    color: '#d6a42b',
    letterSpacing: '.16em',
    fontSize: '11px',
    fontWeight: 900,
    marginBottom: '10px',
  },

  headerTitle: {
    margin: 0,
    fontFamily: 'Georgia,serif',
    fontSize: '38px',
  },

  headerText: {
    maxWidth: '700px',
    lineHeight: 1.65,
    color: 'rgba(255,255,255,.68)',
  },

  journeyBadge: {
    display: 'grid',
    textAlign: 'center',
    placeContent: 'center',
    minWidth: '190px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,.14)',
    borderRadius: '18px',
    background: 'rgba(255,255,255,.07)',
  },

  workspace: {
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,1.45fr) minmax(360px,.7fr)',
    gap: '24px',
    alignItems: 'start',
  },

  mainColumn: {
    display: 'grid',
    gap: '18px',
  },

  selectors: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(220px,1fr))',
    gap: '15px',
  },

  label: {
    display: 'grid',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 800,
  },

  select: {
    width: '100%',
    minHeight: '48px',
    border: '1px solid #ded4c5',
    borderRadius: '11px',
    padding: '0 12px',
    background: '#fff',
    font: 'inherit',
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #ddd3c4',
    borderRadius: '11px',
    padding: '13px',
    font: 'inherit',
    resize: 'vertical',
  },

  input: {
    width: '100%',
    minHeight: '48px',
    boxSizing: 'border-box',
    border: '1px solid #ddd3c4',
    borderRadius: '11px',
    padding: '0 13px',
    font: 'inherit',
  },

  authorCard: {
    padding: '28px',
    borderRadius: '20px',
    background: '#171611',
    color: '#fff',
  },

  quote: {
    fontFamily: 'Georgia,serif',
    fontSize: '27px',
    lineHeight: 1.4,
    margin: '15px 0',
  },

  author: {
    color: '#d6a42b',
  },

  authorIntro: {
    color: 'rgba(255,255,255,.68)',
    lineHeight: 1.65,
  },

  ratingCard: {
    padding: '22px',
    borderRadius: '17px',
    background: '#f4efe6',
  },

  smallHeading: {
    fontSize: '10px',
    letterSpacing: '.14em',
    color: '#956d17',
    fontWeight: 900,
  },

  ratingNumber: {
    display: 'block',
    fontSize: '30px',
    margin: '6px 0 14px',
  },

  slider: {
    width: '100%',
  },

  ratingLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '7px',
    color: '#756e65',
    fontSize: '11px',
  },

  questionCard: {
    padding: '22px',
    border: '1px solid #e7ddd0',
    borderRadius: '17px',
    background: '#fffdfa',
  },

  questionNumber: {
    color: '#986e12',
    fontSize: '10px',
    letterSpacing: '.14em',
    fontWeight: 900,
  },

  question: {
    lineHeight: 1.5,
    marginBottom: '18px',
  },

  visionStudio: {
    padding: '26px',
    borderRadius: '22px',
    background: '#fff',
    border: '1px solid #e5dbce',
  },

  visionTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '31px',
    margin: '0 0 10px',
  },

  sideText: {
    color: '#6e675f',
    lineHeight: 1.65,
  },

  tabs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: '6px',
    margin: '22px 0',
  },

  tab: {
    border: '1px solid #ddd3c4',
    background: '#f5f0e7',
    padding: '11px 7px',
    borderRadius: '9px',
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: '11px',
  },

  activeTab: {
    background: '#d6a42b',
    borderColor: '#d6a42b',
  },

  cardInstruction: {
    fontFamily: 'Georgia,serif',
    fontSize: '21px',
  },

  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gap: '10px',
  },

  imageCard: {
    minHeight: '130px',
    padding: '15px',
    borderRadius: '14px',
    border: '1px solid #dfd5c6',
    background: '#f6f1e8',
    cursor: 'pointer',
    display: 'grid',
    gap: '7px',
    textAlign: 'left',
  },

  imageSymbol: {
    fontSize: '28px',
    color: '#b5841e',
  },

  selectedCard: {
    border: '2px solid #d6a42b',
    boxShadow: '0 8px 22px rgba(214,164,43,.18)',
  },

  assetNote: {
    color: '#8a8175',
    fontSize: '11px',
    lineHeight: 1.5,
    marginTop: '12px',
  },

  differentiatorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gap: '10px',
  },

  differentiator: {
    minHeight: '90px',
    border: 0,
    borderRadius: '13px',
    padding: '14px',
    cursor: 'pointer',
    display: 'grid',
    alignContent: 'space-between',
    textAlign: 'left',
    color: '#fff',
  },

  phraseList: {
    display: 'grid',
    gap: '9px',
    maxHeight: '480px',
    overflowY: 'auto',
  },

  phraseCard: {
    background: '#111',
    color: '#fff',
    border: '1px solid #2f2f2f',
    borderRadius: '12px',
    padding: '17px',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'grid',
    gap: '10px',
    lineHeight: 1.5,
  },

  selectedPhrase: {
    border: '2px solid #d6a42b',
    boxShadow: '0 6px 18px rgba(214,164,43,.25)',
  },

  board: {
    marginTop: '28px',
    padding: '20px',
    borderRadius: '17px',
    background: '#f4efe6',
  },

  boardTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '23px',
  },

  emptyText: {
    color: '#81786e',
    lineHeight: 1.5,
  },

  boardItems: {
    display: 'grid',
    gap: '10px',
  },

  boardImage: {
    minHeight: '110px',
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
    borderRadius: '13px',
    background:
      'linear-gradient(135deg,#e8dcc6,#f9f6ef)',
  },

  boardSymbol: {
    fontSize: '35px',
    color: '#af7b15',
  },

  boardDifferentiator: {
    padding: '18px',
    borderRadius: '13px',
    color: '#fff',
    display: 'grid',
    gap: '4px',
  },

  boardPhrase: {
    padding: '18px',
    borderRadius: '13px',
    background: '#111',
    color: '#fff',
    display: 'grid',
    gap: '7px',
  },

  clearButton: {
    marginTop: '13px',
    border: 0,
    background: 'transparent',
    textDecoration: 'underline',
    cursor: 'pointer',
  },

  commitmentSection: {
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,.8fr) minmax(0,1.2fr)',
    gap: '28px',
    padding: '30px',
    borderRadius: '22px',
    background: '#211c15',
    color: '#fff',
  },

  commitmentTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '35px',
  },

  commitmentDescription: {
    color: 'rgba(255,255,255,.68)',
    lineHeight: 1.65,
  },

  commitmentForm: {
    display: 'grid',
    gap: '14px',
    padding: '22px',
    background: '#fff',
    color: '#211c15',
    borderRadius: '17px',
  },

  goldButton: {
    minHeight: '48px',
    border: 0,
    borderRadius: '10px',
    background: '#d6a42b',
    color: '#17130c',
    fontWeight: 900,
    cursor: 'pointer',
  },

  mentorSection: {
    display: 'grid',
    gridTemplateColumns:
      'minmax(0,1fr) minmax(0,1fr)',
    gap: '28px',
    padding: '28px',
    borderRadius: '22px',
    background: '#f2eadc',
  },

  mentorTitle: {
    fontFamily: 'Georgia,serif',
    fontSize: '31px',
  },

  mentorForm: {
    display: 'grid',
    gap: '12px',
  },

  darkButton: {
    minHeight: '48px',
    border: 0,
    borderRadius: '10px',
    background: '#181714',
    color: '#fff',
    fontWeight: 800,
    cursor: 'pointer',
  },

  success: {
    padding: '14px',
    borderRadius: '10px',
    background: '#e3f1e4',
    color: '#315c39',
    lineHeight: 1.5,
  },

  savedSection: {
    padding: '28px',
    borderRadius: '22px',
    background: '#f5f0e8',
  },

  savedHeading: {
    fontFamily: 'Georgia,serif',
    fontSize: '32px',
  },

  emptyState: {
    padding: '18px',
    borderRadius: '11px',
    background: '#fff',
    color: '#746c62',
  },

  savedGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(240px,1fr))',
    gap: '13px',
  },

  savedCard: {
    padding: '18px',
    border: '1px solid #e3d9ca',
    borderRadius: '14px',
    background: '#fff',
  },

  savedTheme: {
    color: '#946b16',
    fontWeight: 900,
  },

  savedQuote: {
    margin: '12px 0',
    padding: '12px',
    borderRadius: '9px',
    background: '#111',
    color: '#fff',
    fontFamily: 'Georgia,serif',
  },

  savedCommitment: {
    marginTop: '12px',
    padding: '12px',
    borderRadius: '9px',
    background: '#f2ede5',
  },
};
