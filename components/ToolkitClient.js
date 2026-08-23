'use client';

import { useMemo, useState } from 'react';

const themes = [
  {
    id: 'values',
    name: 'Values Driven',
    short: 'Values',
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
    short: 'Culture',
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
    short: 'Performance',
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
    short: 'Strategy',
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
    short: 'People',
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
    short: 'Personal',
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
      'Clarify who you are, how you lead, and what legacy you are building — not simply what you achieve.',
    questions: [
      'Which values guide my leadership decisions most often?',
      'Where in my life or leadership do I need greater alignment with my values?',
      'How do my values show up in the way I treat power, authority, and responsibility?',
      'What principles guide my decisions in uncertainty?',
      'Am I leading from conviction or convenience?',
    ],
  },

  Discipline: {
    quote: 'Discipline conquers stormy seas.',
    author: 'Wezi Khoza',
    intro:
      'Discipline turns intention into reliable behaviour, particularly when motivation is absent.',
    questions: [
      'Where do I need to say no more often to protect my energy and focus?',
      'How do I hold myself accountable when no one is watching?',
      'How do I want to show up when motivation fades, but commitment remains?',
      'What non-negotiable routines anchor my mornings and evenings?',
      'What disciplined boundaries will I set around availability and decision-making?',
    ],
  },

  Agility: {
    quote: 'Intelligence is the ability to quickly adapt to change.',
    author: 'Jonas Ridderstrale et al.',
    intro:
      'Agility asks the executive to remain strategically anchored while adapting intelligently to changing realities.',
    questions: [
      'How do I respond when priorities suddenly change or unexpected challenges arise?',
      'Which emerging trends or technologies should I pay attention to this year?',
      'In what situations can agility be modelled from executive levels down to the shopfloor?',
      'How do I ensure balance between long-term strategy and short-term adaptability?',
      'What are the benefits of an agile organisation in the VUCA and BANI world?',
    ],
  },

  'Courageous Leadership': {
    quote: 'Boldness is not second nature to everyone, it is intentionality.',
    author: 'Janna Cachola',
    intro:
      'Courageous leadership concerns voice, visibility, conviction and the willingness to make difficult decisions.',
    questions: [
      'Where am I being called to use my voice more powerfully?',
      'How can I lead visibly and unapologetically without shrinking or over-explaining?',
      'What bold decision would move the organisation forward, even if it is unpopular?',
      'Where am I choosing comfort over conviction?',
      'What perspective or insight do I bring that no one else can?',
    ],
  },

  Citizenship: {
    quote:
      'Ask not what the country can do for you — ask what you can do for your country.',
    author: 'John F. Kennedy',
    intro:
      'Executive citizenship connects leadership responsibility to community, society and the wider public good.',
    questions: [
      'What principles guide my decisions as a citizen, both personally and professionally?',
      'How do I define responsible citizenship in my role as a leader?',
      'Which community issues are closest to my heart, and how can I address them as an organisation?',
      'Which partnerships or networks could amplify my impact on citizenship and civic engagement?',
      'How can I balance profit, growth, and social good in my role?',
    ],
  },

  Collaboration: {
    quote: 'Going fast to get there quicker and going together to go far.',
    author: 'African Proverb',
    intro:
      'Collaboration becomes strategic when leaders intentionally share power, insight and responsibility.',
    questions: [
      'How does collaboration advance the mission, values, and long-term vision I am responsible for?',
      'Where or when is collaboration a strategic advantage, not just a soft skill?',
      'How do I model collaboration through my decisions, tone, and behaviour?',
      'Where does competition exist that should be replaced with cooperation?',
      'What beliefs do I have about power or control that may be limiting collaboration?',
    ],
  },

  'Diversity, Equity, Inclusion & Belonging': {
    quote: 'Do not glorify the hunter until you hear the stories of the hunted.',
    author: 'Wezi Khoza',
    intro:
      'Inclusive leadership asks executives to examine systems, resources, voice, fairness and belonging.',
    questions: [
      'Is DEIB leadership progressive or counter-productive for my organisation and why?',
      'How do I model inclusive leadership in everyday decisions?',
      'How am I resourcing equity beyond intention through budget, policy and accountability?',
      'What does my organisation look like when DEIB is fully lived, not labelled?',
      'What systems, mindsets, or structures need to be dismantled or rebuilt?',
    ],
  },

  'Environmental, Societal & Governance': {
    quote:
      'Doing ESG right can contribute to reducing poverty, inequality and unemployment.',
    author: 'Inspired to Succeed™',
    intro:
      'ESG should move beyond compliance and become part of strategy, value creation and responsible leadership.',
    questions: [
      'How does our business model actively regenerate, not just reduce harm to, the planet?',
      'How are we aligning ESG goals with financial performance and capital allocation?',
      'How do we show transparency and accountability on our ESG decisions?',
      'How do we ensure ESG is embedded in strategy, not treated as a compliance exercise?',
      'How does ESG directly support long-term value creation and resilience?',
    ],
  },

  Globalisation: {
    quote: 'Keep sight of the shore while discovering the ocean.',
    author: 'Anonymous',
    intro:
      'Global leadership requires expansion without losing identity, relevance or strategic anchoring.',
    questions: [
      'Which regions, markets, or economies am I strategically called to engage or expand into?',
      'How does my work contribute to a more connected, equitable, and sustainable world?',
      'In what ways do I want my leadership to be felt across borders and cultures?',
      'How do I balance global standardisation with local relevance?',
      'What anchors me when global pressures and uncertainties rise?',
    ],
  },

  Relations: {
    quote: 'Presence is my mantra because presence is power.',
    author: 'Wezi Khoza',
    intro:
      'Relationships shape trust, influence, reputation and the executive capacity to achieve through others.',
    questions: [
      'How do my values influence the way I connect with others?',
      'What communication habits can I adopt to strengthen trust, collaboration and relations?',
      'What strategies can help me maintain long-term, mutually beneficial relationships?',
      'Which networks or communities should I engage with to achieve my relational goals?',
      'How will I measure the success of my relationships personally, professionally, and organisationally?',
    ],
  },

  Competition: {
    quote: 'Competition brings out the best in products and the worst in people.',
    author: 'David Sarnoff',
    intro:
      'Competitive awareness should sharpen leadership without undermining values or collaborative intelligence.',
    questions: [
      'Who are my main competitors, and what are they doing differently from me?',
      'Which competitors are most likely to disrupt my business in the next 3–5 years?',
      'Am I encouraging innovative ideas from staff to stay ahead of competitors?',
      'How can I model resilience and adaptability for my team against competitors?',
      'Which leadership qualities do I need to sharpen to outperform rivals?',
    ],
  },

  'Social Intelligence': {
    quote: 'The new science of human relationships.',
    author: 'Daniel Goleman',
    intro:
      'Social intelligence develops awareness of people, context, emotion and the quality of interpersonal influence.',
    questions: [
      'What emotions or triggers do I want to manage better?',
      'How can I create a work culture where everyone feels heard, respected and motivated?',
      'Which limiting beliefs about social interactions do I want to let go of?',
      'What activities or environments help me connect more authentically with others?',
      'How can my organisation show empathy to topical societal ills?',
    ],
  },

  'Emotional Intelligence': {
    quote: 'IQ gets you hired. EQ gets you promoted.',
    author: 'Anonymous',
    intro:
      'Emotional intelligence supports resilience, judgement, communication and leadership under pressure.',
    questions: [
      'How do I deal with organisational situations that trigger stress, frustration or impatience in me?',
      'How do I model and express resilience and adaptability in my leadership?',
      'How do I respond to setbacks and criticism?',
      'What signs indicate that someone or a team is struggling emotionally or professionally?',
      'How can I improve collaboration and communication across teams to manage potential conflicts?',
    ],
  },

  Innovation: {
    quote: 'Traditions connect us to the past and innovation connects us to the future.',
    author: 'Anonymous',
    intro:
      'Innovation asks leaders to create environments where ideas can be tested, scaled and translated into value.',
    questions: [
      'If disruption is inevitable, how do I want to lead it rather than react to it?',
      'Where should innovation be incremental versus transformational?',
      'What kind of innovation culture do I want to intentionally model?',
      'What processes are stifling innovation and need to be redesigned?',
      'How do I empower others to think beyond their job titles?',
      'What would innovation at scale look like in daily operations?',
    ],
  },

  'Business Intelligence': {
    quote: 'The measure of intelligence is the ability to change.',
    author: 'Albert Einstein',
    intro:
      'Business intelligence requires executives to turn data into understanding and understanding into decisions.',
    questions: [
      'How can I maintain energy and focus while managing high-level BI responsibilities?',
      'Which thought leaders, books or courses can expand my BI expertise?',
      'What stories or data visualisations can I create to make insights actionable and compelling?',
      'What new BI tools, AI or analytics methods should I explore?',
      'What information matters even when it cannot easily be counted?',
    ],
  },

  'Change Leadership': {
    quote:
      'The only way to make sense out of change is to plunge into it, move with it, and join the dance.',
    author: 'Alan Watts',
    intro:
      'Change leadership requires deliberate decisions about why change is needed, how people experience it and what values must remain intact.',
    questions: [
      'What will inform my decision to effect change organisationally?',
      'What mindset shifts do I need to adopt to embrace change successfully?',
      'Which key priorities must I focus on to ensure successful change implementation?',
      'Which cultural or behavioural shifts are needed in my organisation?',
      'How do I ensure organisational values are not compromised during change?',
    ],
  },

  'Decision Making': {
    quote: 'Trust your gut but weigh your options.',
    author: 'Wezi Khoza',
    intro:
      'Executive decisions draw on judgement, evidence, intuition, consultation and accountability.',
    questions: [
      'How would I describe my current approach to decision-making?',
      'What patterns in my past decisions have led to my greatest successes and failures?',
      'What are the most important decisions I will have to make in the near future?',
      'Which decisions, if made well, will have the greatest impact?',
      'What information or data do I most rely on when making decisions, and is it sufficient?',
    ],
  },

  'Problem Solving': {
    quote: 'A problem shared is a problem halved.',
    author: 'Joanne Harris',
    intro:
      'Effective problem solving combines clarity, creativity, evidence and collective intelligence.',
    questions: [
      'How do I define a successful solution?',
      'How can I cultivate creativity, critical thinking and strategic insight when solving problems?',
      'What tools or methodologies can enhance my problem-solving capabilities?',
      'What environment best supports innovative problem-solving?',
      'How will I know that my problem-solving efforts are making a meaningful difference?',
    ],
  },

  Governance: {
    quote: 'The speed of decision making is the essence of good governance.',
    author: 'Piyush Goyal',
    intro:
      'Governance concerns stewardship, trust, accountability, constructive challenge and ethical boundaries.',
    questions: [
      'What legacy of governance do I want this organisation to be known for?',
      'In what ways am I a steward of trust for shareholders, employees and society?',
      'What governance blind spots must be addressed now, not later?',
      'How do I encourage constructive challenge rather than compliance?',
      'Where do I draw the ethical line that I will never cross?',
    ],
  },

  Positioning: {
    quote: 'Your brand is what people say about you when you are not in the room.',
    author: 'Jeff Bezos',
    intro:
      'Executive positioning connects identity, reputation, value and the spaces in which your leadership should be visible.',
    questions: [
      'What core strength must define my executive presence?',
      'How does my positioning serve people beyond profit or status?',
      'What platforms or conversations align with my next level?',
      'In my industry, what space do or could I uniquely occupy?',
      'Does my positioning reflect who I am, who I am becoming, or who I used to be?',
    ],
  },

  'Artificial Intelligence': {
    quote: 'There is an island of opportunity in every complexity.',
    author: 'Wezi Khoza',
    intro:
      'AI leadership requires executives to consider innovation, humanity, trust, capability and responsible guardrails.',
    questions: [
      'How does my work in AI serve humanity, not just markets?',
      'Where do I want my organisation to be in the next 5–10 years of AI evolution?',
      'How am I shaping AI that is inclusive, explainable and trustworthy?',
      'What guardrails am I setting to prevent misuse or bias?',
      'What new AI capability, domain or mindset must I master next?',
    ],
  },

  'Information, Communication & Technology': {
    quote: 'You snooze, you lose.',
    author: 'Anonymous',
    intro:
      'ICT leadership requires awareness of emerging technologies while keeping strategic, human and organisational outcomes in view.',
    questions: [
      'Which emerging technologies must I intentionally explore now?',
      'Where must I think bigger, bolder and more futuristically on ICT?',
      'How do I align ICT strategy with overall business and national goals?',
      'How can ICT enable growth, efficiency and sustainability?',
      'How do I optimise ICT to protect time for rest, family and renewal?',
    ],
  },

  'Digital Transformation': {
    quote:
      'Some people do not like change, but you need to embrace change if the alternative is disaster.',
    author: 'Elon Musk',
    intro:
      'Digital transformation demands changes in systems, behaviour, collaboration, values and trust.',
    questions: [
      'What legacy systems, processes or mindsets must we let go of?',
      'How can I empower cross-silo collaboration without compromising individual strengths?',
      'What values can drive a successful digital transformation journey?',
      'What are my value metrics for a thorough digital transformation ecosystem?',
      'How do cybersecurity, ethics and trust feature in our digital future?',
    ],
  },

  'Infrastructure Development': {
    quote: 'Invent yourself and then reinvent yourself.',
    author: 'Charles Bukowski',
    intro:
      'Infrastructure leadership considers long-term vision, transformation, technology and partnerships.',
    questions: [
      'What is my vision for infrastructure over the next 5–10 years?',
      'Which infrastructure projects would have the most transformative impact?',
      'How can I leverage data, AI or smart systems to improve resilience?',
      'How can public-private partnerships enhance infrastructure goals?',
      'What images, symbols or words represent my ideal future for infrastructure?',
    ],
  },

  'Knowledge Management': {
    quote: 'Knowledge is like a garden; if it is not cultivated, it cannot be harvested.',
    author: 'African Proverb',
    intro:
      'Knowledge must be preserved, shared, protected and converted into better decisions.',
    questions: [
      'What knowledge or expertise do we most want to preserve and share?',
      'How do we want Knowledge Management to impact decision-making, efficiency and innovation?',
      'What challenges do we face in capturing, storing and sharing knowledge?',
      'Which areas need the most improvement in Knowledge Management?',
      'How can I leverage AI and ICT to secure our intellectual property?',
    ],
  },

  'Strategic Thinking': {
    quote:
      'Some people wish it would happen, some want it to happen and others make it happen.',
    author: 'Michael Jordan',
    intro:
      'Strategic thinking connects long-term intent with environmental awareness and deliberate action.',
    questions: [
      'How can I inspire others to embrace and execute a strategic vision?',
      'What is the long-term impact I want to create?',
      'Which external factors could dramatically change my business in the next 1–3 years?',
      'How can I better balance short-term results with long-term priorities?',
      'How do I turn complex challenges into strategic opportunities?',
    ],
  },

  'Talent Attraction': {
    quote: 'Talent makes capital dance.',
    author: 'Jonas Ridderstrale & Kjell Nordstrom',
    intro:
      'Talent leadership concerns attraction, retention, development and organisational reputation.',
    questions: [
      'Which personal strengths do I want to amplify to attract, retain and grow talent?',
      'How can we position our organisation as the employer of choice?',
      'What gaps exist in our current talent pipeline?',
      'What programmes or practices will help attract and retain top talent?',
      'How will I measure success in developing internal talent?',
    ],
  },

  'Corporate Health': {
    quote: 'The first wealth is health.',
    author: 'Ralph Waldo Emerson',
    intro:
      'Corporate health considers the physical, mental, emotional and organisational conditions that support sustainable performance.',
    questions: [
      'How can I create a culture where employees feel supported, energised and motivated?',
      'What initiatives will improve mental, physical, occupational and emotional health?',
      'What role do innovation and adaptability play in sustaining a healthy organisation?',
      'Which indicators will show that we are thriving, not just surviving?',
      'How can I leverage technology to ensure a holistically healthy organisation?',
    ],
  },

  Reward: {
    quote:
      'People work for money but will go an extra mile for recognition and rewards.',
    author: 'Dale Carnegie',
    intro:
      'Reward asks how recognition, incentives and organisational value are aligned.',
    questions: [
      'What does a rewarding work experience look like for me personally?',
      'What systems could make rewards more meaningful for employees?',
      'What internal and external factors influence our reward structure?',
      'How can I ensure that rewards align with individual and organisational goals?',
      'Which reward strategies resonate most with our industry?',
    ],
  },

  'Succession Planning': {
    quote: 'A leader’s lasting value is measured by succession.',
    author: 'John C. Maxwell',
    intro:
      'Succession planning asks leaders to consider continuity, transition, talent and the organisation beyond themselves.',
    questions: [
      'How does a succession plan benefit the organisation strategically?',
      'How do I envision the organisation evolving after I move on?',
      'What does a successful transition look like?',
      'What is the relationship between succession and business continuity?',
      'How can we optimise AI in driving succession plans?',
    ],
  },

  'Executive Coaching': {
    quote: 'The function of leadership is to produce more leaders, not more followers.',
    author: 'Ralph Nader',
    intro:
      'Executive coaching creates deliberate space for insight, behavioural change and leadership multiplication.',
    questions: [
      'Do I or any of my executive leaders require Executive Coaching?',
      'What are the anticipated benefits of executive coaching?',
      'Should DEIB be considered essential in Executive Coaching and why?',
      'How do I maintain my energy, focus and well-being while leading and coaching?',
      'How can Executive Coaching inspire teams and make a lasting impact?',
    ],
  },

  'Executive Sponsorship': {
    quote:
      'Somebody opened the door for me; I entered and left it open while opening others.',
    author: 'Wezi Khoza',
    intro:
      'Sponsorship concerns advocacy, visibility, power structures and opening opportunities for others.',
    questions: [
      'In which areas do I need strategic advocacy and not merit alone?',
      'What distinctive value do I bring that makes sponsorship a smart investment?',
      'What power structures do I need to better understand and navigate?',
      'What do I want my sponsors to say about me when I am not in the room?',
      'Whom am I sponsoring, and how visible is my advocacy?',
    ],
  },

  'Leading a Remote Workforce': {
    quote: 'Start where you are, use what you have, do what you can.',
    author: 'Arthur Ashe',
    intro:
      'Remote leadership requires trust, communication, psychological safety, transparency and creativity.',
    questions: [
      'What core values should guide our interactions and decisions when working remotely?',
      'How can I foster trust, collaboration and psychological safety across distances?',
      'What communication habits or tools will keep my team connected and motivated?',
      'How can I balance transparency with efficiency?',
      'How will I encourage creativity when the team is not physically together?',
    ],
  },

  'Industry Expertise': {
    quote: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    intro:
      'Industry expertise requires curiosity, continuous learning, influence and anticipation of change.',
    questions: [
      'What emerging trends or innovations in my industry excite me most?',
      'How can I create sustainable knowledge that benefits others?',
      'Who are the thought leaders I admire?',
      'Which platforms can amplify my industry voice?',
      'How can I stay ahead of technological or market shifts?',
    ],
  },

  'Understanding Data': {
    quote: 'In God we trust; others must bring data.',
    author: 'W. Edwards Deming',
    intro:
      'Data becomes valuable when it strengthens judgement rather than replacing it.',
    questions: [
      'What role does data play in the vision of my organisation?',
      'How do I want data to influence decision-making in my leadership?',
      'What would a fully data-driven culture look like?',
      'Which data insights do I want to rely on most for strategic decisions?',
      'What new tools, technologies or platforms should I explore?',
    ],
  },

  'Growth Mindset': {
    quote: 'Believe you can, and you are halfway there.',
    author: 'Theodore Roosevelt',
    intro:
      'Growth mindset concerns reframing limitation, learning from failure and stretching beyond comfort.',
    questions: [
      'Which limiting thoughts have held me back, and how can I reframe them?',
      'How often have I embraced failure as a learning opportunity?',
      'How do I want my mindset to influence my team and organisation?',
      'Which bold goals challenge me beyond my comfort zone?',
      'What practices keep me aligned with my vision for growth?',
    ],
  },

  Influence: {
    quote: 'The key to successful leadership is influence, not authority.',
    author: 'Ken Blanchard',
    intro:
      'Influence is about credibility, relationships, visibility and impact rather than positional power.',
    questions: [
      'Who are the people I admire for their influence?',
      'In what areas can I have the most impact?',
      'Which stakeholders are critical for me to influence?',
      'What goals can I set to measure my progress in influencing others?',
      'How do I balance influence with authenticity?',
    ],
  },

  'Self-Mastery': {
    quote: 'Do it right the first time, and make sure even the last time, it is right.',
    author: 'Wezi Khoza',
    intro:
      'Self-mastery begins with leading yourself before attempting to lead others.',
    questions: [
      'Who am I becoming as a leader beyond my title and achievements?',
      'How do I lead myself with integrity before leading others?',
      'How do I respond under pressure, and how do I want to respond in hindsight?',
      'How do I create calm, clarity and confidence in uncertain moments?',
      'What boundaries reflect self-respect and leadership maturity?',
    ],
  },

  Visualisation: {
    quote: 'Imagine it, go ahead and make it real.',
    author: 'Wezi Khoza',
    intro:
      'Visualisation asks you to see your next level clearly enough to begin acting toward it deliberately.',
    questions: [
      'When I picture my highest self at work, what do I see first?',
      'How do I want people to describe me when I enter a room?',
      'What parts of my identity am I ready to fully own without apology?',
      'What does confidence look like in my face, posture and voice?',
      'Where am I seen, heard and recognised?',
    ],
  },

  'Imposter Syndrome': {
    quote: 'Fake it until there is no doubt.',
    author: 'Wezi Khoza',
    intro:
      'This reflection asks you to examine achievement, confidence, visibility and the evidence of your own capability.',
    questions: [
      'Which of my achievements do I struggle to internalise, and why?',
      'How do I respond to praise or recognition?',
      'In what ways do I compare myself to others?',
      'What evidence proves I am qualified, capable and trusted?',
      'What does confident visibility look like for me?',
    ],
  },
};

const assessmentOptions = [
  'This is currently a leadership strength',
  'I demonstrate this fairly consistently',
  'I understand it but do not always practise it',
  'This requires deliberate development',
  'This is a significant leadership priority',
  'I need coaching or mentor support',
];

const themeColours = [
  '#d5a52f',
  '#4f7f6b',
  '#bd7047',
  '#6577a3',
  '#845f87',
  '#4f7d8d',
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
  const [commitment, setCommitment] = useState('');
  const [deadline, setDeadline] = useState('');
  const [successEvidence, setSuccessEvidence] = useState('');
  const [savedRecords, setSavedRecords] = useState([]);

  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorName, setMentorName] = useState('');
  const [mentorPermissions, setMentorPermissions] = useState({
    wheel: true,
    commitments: true,
    reflections: false,
    visionBoard: true,
  });
  const [mentorPrepared, setMentorPrepared] = useState(false);

  const theme = themes[themeIndex];
  const module = theme.modules[moduleIndex];
  const content = moduleContent[module];

  const score = ratings[theme.id] || 3;

  const wheelScores = useMemo(
    () =>
      themes.map((item) => ({
        ...item,
        score: ratings[item.id] || 3,
        percentage: Math.round(((ratings[item.id] || 3) / 5) * 100),
      })),
    [ratings]
  );

  const overallScore = useMemo(() => {
    const values = Object.values(ratings);
    return Math.round(
      (values.reduce((total, value) => total + value, 0) /
        (values.length * 5)) *
        100
    );
  }, [ratings]);

  function selectTheme(event) {
    setThemeIndex(Number(event.target.value));
    setModuleIndex(0);
    setAnswers({});
    setReflections({});
  }

  function selectModule(event) {
    setModuleIndex(Number(event.target.value));
    setAnswers({});
    setReflections({});
  }

  function updateRating(value) {
    setRatings((current) => ({
      ...current,
      [theme.id]: value,
    }));
  }

  function saveModule() {
    const record = {
      id: Date.now(),
      theme: theme.name,
      module,
      rating: score,
      answers: content.questions.map((question, index) => ({
        question,
        assessment: answers[index] || 'Not selected',
        reflection: reflections[index] || '',
      })),
      commitment,
      deadline,
      successEvidence,
      createdAt: new Date().toLocaleString(),
    };

    setSavedRecords((current) => [record, ...current]);

    setCommitment('');
    setDeadline('');
    setSuccessEvidence('');
  }

  function prepareMentorInvite() {
    if (!mentorEmail.trim()) return;
    setMentorPrepared(true);
  }

  function toggleMentorPermission(name) {
    setMentorPermissions((current) => ({
      ...current,
      [name]: !current[name],
    }));
  }

  return (
    <div style={styles.shell}>
      <section style={styles.bookHeader}>
        <div>
          <span style={styles.goldEyebrow}>THE AUTHOR&apos;S JOURNEY</span>

          <h2 style={styles.mainTitle}>
            Work through Inspired to Succeed™
          </h2>

          <p style={styles.introText}>
            This digital workspace follows the leadership themes, competency
            reflections and vision-building philosophy of Wezi Khoza&apos;s
            executive toolkit.
          </p>
        </div>

        <div style={styles.bookBadge}>
          <span style={styles.bookBadgeSmall}>CURRENT JOURNEY</span>
          <strong>{theme.name}</strong>
          <span>{module}</span>
        </div>
      </section>

      <section style={styles.moduleWorkspace}>
        <div style={styles.reflectionColumn}>
          <div style={styles.selectorRow}>
            <label style={styles.label}>
              Leadership theme
              <select
                value={themeIndex}
                onChange={selectTheme}
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
                onChange={selectModule}
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
            <span style={styles.authorCardLabel}>FROM THE TOOLKIT</span>

            <blockquote style={styles.quote}>
              “{content.quote}”
            </blockquote>

            <strong style={styles.quoteAuthor}>{content.author}</strong>

            <p style={styles.moduleIntro}>{content.intro}</p>
          </div>

          <div style={styles.ratingBlock}>
            <div>
              <span style={styles.smallLabel}>CURRENT SELF-RATING</span>

              <strong style={styles.ratingNumber}>{score}/5</strong>
            </div>

            <input
              type="range"
              min="1"
              max="5"
              value={score}
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

          <div style={styles.questions}>
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
                      setAnswers((current) => ({
                        ...current,
                        [index]: event.target.value,
                      }))
                    }
                    style={styles.select}
                  >
                    <option value="">Choose an honest assessment...</option>

                    {assessmentOptions.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}

                    <option value="Other">Other / Personal assessment</option>
                  </select>
                </label>

                <label style={styles.label}>
                  What does this mean in my own leadership?
                  <textarea
                    rows="4"
                    value={reflections[index] || ''}
                    onChange={(event) =>
                      setReflections((current) => ({
                        ...current,
                        [index]: event.target.value,
                      }))
                    }
                    placeholder="Reflect using your own experience, evidence, concern, aspiration or insight..."
                    style={styles.textarea}
                  />
                </label>
              </article>
            ))}
          </div>
        </div>

        <aside style={styles.sideColumn}>
          <div style={styles.cardJourney}>
            <span style={styles.goldEyebrow}>VISION BOARD CONNECTION</span>

            <h3 style={styles.sideTitle}>
              Turn reflection into a visual leadership story
            </h3>

            <p style={styles.sideText}>
              Your next step is to connect this reflection to Wezi&apos;s
              original card decks.
            </p>

            <div style={styles.cardStep}>
              <span style={styles.cardStepNumber}>01</span>
              <div>
                <strong>Image Card</strong>
                <p>Choose the image that represents what you see.</p>
              </div>
            </div>

            <div style={styles.cardStep}>
              <span style={styles.cardStepNumber}>02</span>
              <div>
                <strong>Differentiator Card</strong>
                <p>Choose who you need to become.</p>
              </div>
            </div>

            <div style={styles.cardStep}>
              <span style={styles.cardStepNumber}>03</span>
              <div>
                <strong>Aligning Phrase</strong>
                <p>Choose the thought that will guide your action.</p>
              </div>
            </div>

            <div style={styles.comingSoon}>
              Original cards will appear here in their supplied colours in our
              next file step.
            </div>
          </div>

          <div style={styles.mentorCard}>
            <span style={styles.goldEyebrow}>MENTOR CONNECTION</span>

            <h3 style={styles.sideTitle}>Invite an outside mentor</h3>

            <p style={styles.sideText}>
              Decide what your mentor may see. Your private material should
              remain under your control.
            </p>

            <input
              value={mentorName}
              onChange={(event) => setMentorName(event.target.value)}
              placeholder="Mentor name"
              style={styles.input}
            />

            <input
              value={mentorEmail}
              onChange={(event) => {
                setMentorEmail(event.target.value);
                setMentorPrepared(false);
              }}
              placeholder="Mentor email address"
              type="email"
              style={styles.input}
            />

            <div style={styles.permissionList}>
              {[
                ['wheel', 'Wheel of Success'],
                ['commitments', 'Leadership commitments'],
                ['reflections', 'Selected reflections'],
                ['visionBoard', 'Vision Board'],
              ].map(([key, label]) => (
                <label style={styles.permission} key={key}>
                  <input
                    type="checkbox"
                    checked={mentorPermissions[key]}
                    onChange={() => toggleMentorPermission(key)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <button
              type="button"
              style={styles.darkButton}
              onClick={prepareMentorInvite}
            >
              Prepare mentor invitation
            </button>

            {mentorPrepared && (
              <div style={styles.successBox}>
                <strong>Mentor invitation prepared.</strong>
                <p style={{ marginBottom: 0 }}>
                  {mentorName || 'Your mentor'} will be invited to view only
                  the areas you selected. Secure email delivery will be
                  connected when authentication is added.
                </p>
              </div>
            )}
          </div>
        </aside>
      </section>

      <section style={styles.commitmentSection}>
        <div style={styles.commitmentIntro}>
          <span style={styles.goldEyebrow}>DISCIPLINED COMMITMENT</span>

          <h2 style={styles.commitmentTitle}>
            What will change because of this reflection?
          </h2>

          <p style={styles.commitmentText}>
            The vision board is not the end of the process. Turn insight into
            an action you can review with yourself or your mentor.
          </p>
        </div>

        <div style={styles.commitmentForm}>
          <label style={styles.label}>
            My leadership commitment
            <textarea
              rows="4"
              value={commitment}
              onChange={(event) => setCommitment(event.target.value)}
              placeholder="I commit to..."
              style={styles.textarea}
            />
          </label>

          <div style={styles.selectorRow}>
            <label style={styles.label}>
              By when?
              <input
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
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
          </div>

          <button
            type="button"
            onClick={saveModule}
            style={styles.goldButton}
          >
            Save reflection & commitment
          </button>
        </div>
      </section>

      <section style={styles.wheelSection}>
        <div style={styles.wheelIntro}>
          <span style={styles.goldEyebrow}>MY LEADERSHIP PORTRAIT</span>

          <h2 style={styles.wheelTitle}>
            Inspired to Succeed™ Wheel of Success
          </h2>

          <p style={styles.introText}>
            Your ratings across the six themes create a living visual picture
            of your leadership development.
          </p>
        </div>

        <div style={styles.wheelLayout}>
          <div style={styles.wheelWrap}>
            <div
              style={{
                ...styles.wheel,
                background: `conic-gradient(
                  ${themeColours[0]} 0deg 60deg,
                  ${themeColours[1]} 60deg 120deg,
                  ${themeColours[2]} 120deg 180deg,
                  ${themeColours[3]} 180deg 240deg,
                  ${themeColours[4]} 240deg 300deg,
                  ${themeColours[5]} 300deg 360deg
                )`,
              }}
            >
              <div style={styles.wheelCentre}>
                <span style={styles.wheelCentreSmall}>
                  LEADERSHIP
                </span>

                <strong style={styles.wheelCentreScore}>
                  {overallScore}%
                </strong>

                <span style={styles.wheelCentreSmall}>
                  OVERALL
                </span>
              </div>
            </div>
          </div>

          <div style={styles.scoreList}>
            {wheelScores.map((item, index) => (
              <div style={styles.scoreRow} key={item.id}>
                <span
                  style={{
                    ...styles.scoreDot,
                    background: themeColours[index],
                  }}
                />

                <div style={styles.scoreCopy}>
                  <strong>{item.name}</strong>

                  <div style={styles.progressTrack}>
                    <span
                      style={{
                        ...styles.progressFill,
                        width: `${item.percentage}%`,
                        background: themeColours[index],
                      }}
                    />
                  </div>
                </div>

                <strong style={styles.scorePercent}>
                  {item.percentage}%
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.savedSection}>
        <span style={styles.goldEyebrow}>MY GROWTH RECORD</span>

        <h2 style={styles.savedTitle}>Saved leadership evidence</h2>

        {savedRecords.length === 0 ? (
          <div style={styles.emptyState}>
            Complete your first reflection and commitment. It will become part
            of your leadership journey here.
          </div>
        ) : (
          <div style={styles.savedGrid}>
            {savedRecords.map((record) => (
              <article style={styles.savedCard} key={record.id}>
                <span style={styles.savedTheme}>{record.theme}</span>

                <h3 style={{ margin: '8px 0' }}>{record.module}</h3>

                <span style={styles.savedDate}>{record.createdAt}</span>

                <div style={styles.savedRating}>
                  Self-rating: <strong>{record.rating}/5</strong>
                </div>

                {record.commitment && (
                  <div style={styles.savedCommitment}>
                    <span style={styles.smallLabel}>MY COMMITMENT</span>
                    <p>{record.commitment}</p>

                    {record.deadline && (
                      <small>Review by: {record.deadline}</small>
                    )}
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

  bookHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '28px',
    alignItems: 'center',
    padding: '28px',
    borderRadius: '22px',
    background:
      'linear-gradient(135deg, #181714 0%, #292318 100%)',
    color: '#fff',
  },

  goldEyebrow: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 900,
    letterSpacing: '0.16em',
    color: '#d7a52e',
    marginBottom: '9px',
  },

  mainTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '36px',
    margin: '0 0 10px',
  },

  introText: {
    lineHeight: 1.65,
    color: '#6e675f',
    maxWidth: '720px',
  },

  bookBadge: {
    minWidth: '230px',
    display: 'grid',
    gap: '6px',
    padding: '20px',
    borderRadius: '16px',
    background: 'rgba(255,255,255,.07)',
    border: '1px solid rgba(255,255,255,.12)',
  },

  bookBadgeSmall: {
    fontSize: '10px',
    letterSpacing: '.13em',
    color: '#d7a52e',
  },

  moduleWorkspace: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.6fr) minmax(300px, .75fr)',
    gap: '24px',
    alignItems: 'start',
  },

  reflectionColumn: {
    padding: '26px',
    background: '#fff',
    border: '1px solid #e6ddd1',
    borderRadius: '22px',
  },

  sideColumn: {
    display: 'grid',
    gap: '20px',
  },

  selectorRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '14px',
  },

  label: {
    display: 'grid',
    gap: '8px',
    fontSize: '12px',
    fontWeight: 800,
    marginBottom: '16px',
  },

  select: {
    width: '100%',
    minHeight: '46px',
    padding: '0 12px',
    border: '1px solid #ded5c8',
    borderRadius: '10px',
    background: '#fff',
    font: 'inherit',
  },

  input: {
    width: '100%',
    minHeight: '46px',
    padding: '0 12px',
    border: '1px solid #ded5c8',
    borderRadius: '10px',
    boxSizing: 'border-box',
    font: 'inherit',
    marginBottom: '12px',
  },

  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ded5c8',
    borderRadius: '10px',
    boxSizing: 'border-box',
    resize: 'vertical',
    font: 'inherit',
  },

  authorCard: {
    margin: '22px 0',
    padding: '26px',
    borderRadius: '18px',
    background: '#181714',
    color: '#fff',
  },

  authorCardLabel: {
    color: '#d7a52e',
    fontSize: '10px',
    letterSpacing: '.15em',
    fontWeight: 900,
  },

  quote: {
    margin: '18px 0 8px',
    fontFamily: 'Georgia, serif',
    fontSize: '25px',
    lineHeight: 1.4,
  },

  quoteAuthor: {
    color: '#d7a52e',
    fontSize: '12px',
  },

  moduleIntro: {
    color: 'rgba(255,255,255,.68)',
    lineHeight: 1.6,
    marginTop: '18px',
  },

  ratingBlock: {
    padding: '20px',
    borderRadius: '16px',
    background: '#f6f2eb',
    marginBottom: '22px',
  },

  smallLabel: {
    display: 'block',
    fontSize: '10px',
    fontWeight: 900,
    letterSpacing: '.12em',
    color: '#8c6b24',
  },

  ratingNumber: {
    display: 'block',
    fontSize: '28px',
    marginTop: '4px',
  },

  slider: {
    width: '100%',
    margin: '16px 0 6px',
  },

  ratingLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#877f76',
  },

  questions: {
    display: 'grid',
    gap: '14px',
  },

  questionCard: {
    padding: '20px',
    borderRadius: '15px',
    border: '1px solid #e8dfd3',
    background: '#fffdfa',
  },

  questionNumber: {
    fontSize: '10px',
    fontWeight: 900,
    letterSpacing: '.13em',
    color: '#a57918',
  },

  question: {
    fontSize: '17px',
    lineHeight: 1.5,
  },

  cardJourney: {
    padding: '24px',
    background: '#fff',
    border: '1px solid #e6ddd1',
    borderRadius: '20px',
  },

  mentorCard: {
    padding: '24px',
    background: '#f2eadc',
    border: '1px solid #dfcfb5',
    borderRadius: '20px',
  },

  sideTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '25px',
    margin: '0 0 10px',
  },

  sideText: {
    color: '#70685f',
    lineHeight: 1.6,
  },

  cardStep: {
    display: 'flex',
    gap: '13px',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #eee6da',
  },

  cardStepNumber: {
    display: 'grid',
    placeItems: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: '#d7a52e',
    fontSize: '11px',
    fontWeight: 900,
    flex: '0 0 auto',
  },

  comingSoon: {
    marginTop: '18px',
    padding: '13px',
    borderRadius: '10px',
    background: '#181714',
    color: '#e7d6b1',
    fontSize: '12px',
    lineHeight: 1.5,
  },

  permissionList: {
    display: 'grid',
    gap: '9px',
    margin: '14px 0 18px',
  },

  permission: {
    display: 'flex',
    gap: '9px',
    alignItems: 'center',
    fontSize: '13px',
  },

  darkButton: {
    width: '100%',
    minHeight: '46px',
    border: 0,
    borderRadius: '10px',
    background: '#181714',
    color: '#fff',
    fontWeight: 800,
    cursor: 'pointer',
  },

  successBox: {
    marginTop: '14px',
    padding: '14px',
    borderRadius: '10px',
    background: '#e5f1e7',
    color: '#315b3b',
    fontSize: '12px',
    lineHeight: 1.5,
  },

  commitmentSection: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, .8fr) minmax(0, 1.2fr)',
    gap: '30px',
    padding: '30px',
    borderRadius: '22px',
    background: '#211c15',
    color: '#fff',
  },

  commitmentIntro: {},

  commitmentTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '34px',
    margin: '0 0 12px',
  },

  commitmentText: {
    color: 'rgba(255,255,255,.65)',
    lineHeight: 1.65,
  },

  commitmentForm: {
    padding: '22px',
    borderRadius: '16px',
    background: '#fff',
    color: '#26221c',
  },

  goldButton: {
    width: '100%',
    minHeight: '48px',
    border: 0,
    borderRadius: '10px',
    background: '#d7a52e',
    color: '#19150e',
    fontWeight: 900,
    cursor: 'pointer',
  },

  wheelSection: {
    padding: '30px',
    border: '1px solid #e5ddd1',
    borderRadius: '22px',
    background: '#fff',
  },

  wheelIntro: {
    marginBottom: '26px',
  },

  wheelTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '38px',
    margin: '0 0 10px',
  },

  wheelLayout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(260px, .7fr) minmax(0, 1.3fr)',
    gap: '42px',
    alignItems: 'center',
  },

  wheelWrap: {
    display: 'grid',
    placeItems: 'center',
  },

  wheel: {
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    boxShadow: '0 18px 50px rgba(0,0,0,.12)',
  },

  wheelCentre: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: '#181714',
    display: 'grid',
    placeItems: 'center',
    alignContent: 'center',
    color: '#fff',
    textAlign: 'center',
  },

  wheelCentreSmall: {
    fontSize: '9px',
    letterSpacing: '.14em',
    color: '#d7a52e',
  },

  wheelCentreScore: {
    fontSize: '35px',
    lineHeight: 1.1,
    margin: '5px 0',
  },

  scoreList: {
    display: 'grid',
    gap: '16px',
  },

  scoreRow: {
    display: 'grid',
    gridTemplateColumns: '16px 1fr 52px',
    gap: '12px',
    alignItems: 'center',
  },

  scoreDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },

  scoreCopy: {
    display: 'grid',
    gap: '7px',
    fontSize: '13px',
  },

  progressTrack: {
    height: '7px',
    borderRadius: '999px',
    background: '#eee9e2',
    overflow: 'hidden',
  },

  progressFill: {
    display: 'block',
    height: '100%',
    borderRadius: '999px',
  },

  scorePercent: {
    textAlign: 'right',
    fontSize: '13px',
  },

  savedSection: {
    padding: '30px',
    borderRadius: '22px',
    background: '#f4efe7',
  },

  savedTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '32px',
    margin: '0 0 20px',
  },

  emptyState: {
    padding: '20px',
    borderRadius: '12px',
    background: '#fff',
    color: '#776f66',
  },

  savedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '14px',
  },

  savedCard: {
    background: '#fff',
    padding: '18px',
    borderRadius: '14px',
    border: '1px solid #e4dbcf',
  },

  savedTheme: {
    color: '#9b731b',
    fontSize: '10px',
    fontWeight: 900,
    letterSpacing: '.1em',
  },

  savedDate: {
    color: '#8a8178',
    fontSize: '11px',
  },

  savedRating: {
    marginTop: '12px',
    fontSize: '13px',
  },

  savedCommitment: {
    marginTop: '15px',
    padding: '13px',
    borderRadius: '10px',
    background: '#f5f0e8',
  },
};
