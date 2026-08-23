'use client';

import { useMemo, useState } from 'react';

const leadershipThemes = [
  {
    name: 'Theme 1 — Values Driven',
    modules: [
      'Values',
      'Discipline',
      'Agility',
      'Courageous Leadership',
      'Citizenship',
    ],
  },
  {
    name: 'Theme 2 — Cultural Competence',
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
    name: 'Theme 3 — Performance Centred',
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
    name: 'Theme 4 — Strategic and Integrative',
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
    name: 'Theme 5 — People Oriented',
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
    name: 'Theme 6 — Personal Development',
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

const questionBank = {
  Values: [
    'Which values guide my leadership decisions most often?',
    'Where in my life or leadership do I need greater alignment with my values?',
    'How do my values show up in the way I treat power, authority, and responsibility?',
    'What principles guide my decisions in uncertainty?',
    'Am I leading from conviction or convenience?',
  ],

  Discipline: [
    'Where do I need to say no more often to protect my energy and focus?',
    'How do I hold myself accountable when no one is watching?',
    'How do I want to show up when motivation fades, but commitment remains?',
    'What non-negotiable routines anchor my mornings and evenings?',
    'What disciplined boundaries will I set around availability and decision-making?',
  ],

  Agility: [
    'How do I respond when priorities suddenly change or unexpected challenges arise?',
    'Which emerging trends or technologies should I pay attention to this year?',
    'In what situations can agility be modelled from executive levels down to the shopfloor?',
    'How do I ensure that there is balance between long-term strategy and short-term adaptability?',
    'What are the benefits of an agile organisation in the VUCA and BANI world?',
  ],

  'Courageous Leadership': [
    'Where am I being called to use my voice more powerfully?',
    'How can I lead visibly and unapologetically without shrinking or over-explaining?',
    'What bold decision would move the organisation forward, even if it is unpopular?',
    'Where am I choosing comfort over conviction?',
    'What perspective or insight do I bring that no one else can?',
  ],

  Citizenship: [
    'What principles guide my decisions as a citizen, both personally and professionally?',
    'How do I define responsible citizenship in my role as a leader?',
    'Which community issues are closest to my heart, and how can I address them as an organisation?',
    'Which partnerships or networks could amplify my impact on citizenship and civic engagement?',
    'How can I balance profit, growth, and social good in my role?',
  ],

  Collaboration: [
    'How does collaboration advance the mission, values, and long-term vision I am responsible for?',
    'Where or when is collaboration a strategic advantage, not just a soft skill?',
    'How do I model collaboration through my decisions, tone, and behaviour?',
    'Where does competition exist that should be replaced with cooperation?',
    'What beliefs do I have about power or control that may be limiting collaboration?',
  ],

  'Diversity, Equity, Inclusion & Belonging': [
    'Is DEIB leadership progressive or counter-productive for my organisation and why?',
    'How do I model inclusive leadership in everyday decisions?',
    'How am I resourcing equity beyond intention through budget, policy and accountability?',
    'What does my organisation look like when DEIB is fully lived, not labelled?',
    'What systems, mindsets, or structures need to be dismantled or rebuilt?',
  ],

  'Environmental, Societal & Governance': [
    'How does our business model actively regenerate, not just reduce harm to, the planet?',
    'How are we aligning ESG goals with financial performance and capital allocation?',
    'How do we show transparency and accountability on our ESG decisions to investors, employees, and society?',
    'How do we ensure ESG is embedded in strategy, not treated as a compliance exercise?',
    'How does ESG directly support long-term value creation and resilience?',
  ],

  Globalisation: [
    'Which regions, markets, or economies am I strategically called to engage or expand into?',
    'How does my work contribute to a more connected, equitable, and sustainable world?',
    'In what ways do I want my leadership to be felt across borders and cultures?',
    'How do I balance global standardisation with local relevance?',
    'What anchors me when global pressures and uncertainties rise, for example geopolitics?',
  ],

  Relations: [
    'How do my values influence the way I connect with others?',
    'What communication habits can I adopt to strengthen trust, collaboration and improve relations?',
    'What strategies can help me maintain long-term, mutually beneficial relationships?',
    'Which networks or communities should I engage with to achieve my relational goals?',
    'How will I measure the success of my relationships personally, professionally, and organisationally?',
  ],

  Competition: [
    'Who are my main competitors, and what are they doing differently from me?',
    'Which competitors are most likely to disrupt my business in the next 3–5 years?',
    'Am I encouraging more innovative ideas from my staff to stay ahead of competitors?',
    'How can I model resilience and adaptability for my team against competitors?',
    'Which leadership qualities do I need to sharpen to outperform rivals?',
  ],

  'Social Intelligence': [
    'What emotions or triggers do I want to manage better to respond thoughtfully rather than react impulsively?',
    'How can I create a work culture where everyone feels heard, respected, and motivated?',
    'Which limiting beliefs about social interactions do I want to let go of?',
    'What activities or environments help me connect more authentically with others?',
    'How can my organisation show empathy to topical societal ills?',
  ],

  'Emotional Intelligence': [
    'How do I deal with organisational situations that trigger stress, frustration, or impatience in me?',
    'How do I model and express resilience and adaptability in my leadership?',
    'How do I respond to setbacks and criticism so that I can help the organisation thrive amid turbulence?',
    'What signs indicate that someone or a team at work is struggling emotionally or professionally?',
    'How can I improve collaboration and communication across teams to manage potential conflicts?',
  ],

  Innovation: [
    'If disruption is inevitable, how do I want to lead it rather than react to it?',
    'Where or when should innovation be incremental versus transformational?',
    'What kind of innovation culture do I want to intentionally model?',
    'What processes are stifling innovation and need to be redesigned?',
    'How do I empower others to think beyond their job titles?',
    'What would innovation at scale look like in daily operations?',
  ],

  'Business Intelligence': [
    'How can I maintain energy and focus while managing high-level Business Intelligence responsibilities?',
    'Which thought leaders, books, or courses can expand my Business Intelligence expertise?',
    'What stories or data visualisations can I create to make insights actionable and compelling?',
    'What new Business Intelligence tools, AI, or analytics methods should I explore to create competitive advantage?',
    'What does the statement "Not everything that can be counted counts, and not everything that counts can be counted" mean in applying Business Intelligence?',
  ],

  'Change Leadership': [
    'What will inform my decision to effect change organisationally?',
    'What mindset shifts do I need to adopt to embrace change successfully?',
    'Which key priorities must I focus on to ensure successful change implementation?',
    'Which cultural or behavioural shifts are needed in my organisation to support change?',
    'How do I ensure organisational values are not compromised during a period of change?',
  ],

  'Decision Making': [
    'How would I describe my current approach to decision-making: analytical, intuitive, consultative, or decisive?',
    'What patterns in my past decisions have led to my greatest successes and failures?',
    'What are the most important decisions I will have to make in the near future both personally and organisationally?',
    'Which decisions, if made well, will have the greatest impact in my organisation or team?',
    'What information or data do I most rely on when making decisions, and is it sufficient?',
  ],

  'Problem Solving': [
    'How do I define a successful solution?',
    'How can I cultivate creativity, critical thinking, and strategic insight when engaging in problem solving?',
    'What tools, frameworks, or methodologies can enhance my problem-solving capabilities?',
    'What environment or organisational culture best supports innovative problem-solving?',
    'How will I know that my problem-solving efforts are making a meaningful difference?',
  ],

  Governance: [
    'What legacy of governance do I want this organisation to be known for?',
    'In what ways am I a steward of trust for shareholders, employees, and society?',
    'What governance blind spots must be addressed now, not later?',
    'How do I encourage constructive challenge rather than compliance even in the midst of crisis, disruption, or scrutiny?',
    'Where do I draw the ethical line that I will never cross, regardless of pressure or profit?',
  ],

  Positioning: [
    'What core strength must define my executive presence?',
    'How does my positioning serve people beyond profit or status?',
    'What platforms or conversations such as boards, media, conferences, policy or community align with my next level?',
    'In my industry, what space do or could I uniquely occupy?',
    'Does my positioning reflect who I am, who I am becoming, or who I used to be?',
  ],

  'Artificial Intelligence': [
    'How does my work in AI serve humanity, not just markets?',
    'Where do I want my organisation to be in the next 5–10 years of AI evolution?',
    'Beyond protecting human dignity, how am I shaping AI that is inclusive, explainable, and trustworthy?',
    'What guardrails am I setting to prevent misuse or bias?',
    'To stay ahead of rapid technological change, what new AI capability, domain, or mindset must I master next?',
  ],

  'Information, Communication & Technology': [
    'Which emerging trends or technologies must I intentionally explore now, such as AI, cloud, cybersecurity, data or automation?',
    'Where must I think bigger, bolder, and more futuristically on ICT?',
    'How do I align ICT strategy with overall business and national goals?',
    'How can ICT enable growth, efficiency, and sustainability?',
    'How do I optimise ICT to protect time for rest, family, and renewal organisationally?',
  ],

  'Digital Transformation': [
    'To make digital transformation a success, what legacy systems, processes, or mindsets must we let go of?',
    'How can I empower cross-silo collaboration without compromising key individual strengths?',
    'What values can drive a successful digital transformation journey?',
    'What are my value metrics for a thorough digital transformation ecosystem?',
    'How do cybersecurity, ethics, and trust feature in our digital future?',
  ],

  'Infrastructure Development': [
    'What is my vision for the infrastructure sector in my region or organisation over the next 5–10 years?',
    'Which infrastructure projects, if realised, would have the most transformative impact?',
    'How can I leverage data, AI, or smart systems to improve infrastructure efficiency and resilience?',
    'How can public-private partnerships enhance infrastructure goals?',
    'What images, symbols, or words represent my ideal future for infrastructure?',
  ],

  'Knowledge Management': [
    'What knowledge or expertise do we most want to preserve and share?',
    'How do we want Knowledge Management to impact decision-making, efficiency, and innovation?',
    'What challenges do we face in capturing, storing, and sharing knowledge?',
    'Which areas or processes need the most improvement in Knowledge Management?',
    'How can I leverage AI and ICT to ensure security of our intellectual property?',
  ],

  'Strategic Thinking': [
    'How can I inspire others to embrace and execute a strategic vision?',
    'What is the long-term impact I want to create in my organisation or industry?',
    'Which external factors could dramatically change my business in the next 1–3 years and how do I plan for them?',
    'How can I better balance short-term results with long-term strategic priorities?',
    'How do I turn complex challenges into strategic opportunities?',
  ],

  'Talent Attraction': [
    'Which personal strengths do I want to amplify to attract, retain, and grow talent?',
    'How can we position our organisation as the employer of choice?',
    'What gaps exist in our current talent pipeline, and how can I address them?',
    'What programmes, benefits, or practices will help attract and retain top talent?',
    'How will I measure success in developing internal talent?',
  ],

  'Corporate Health': [
    'How can I create a culture where employees feel supported, energised, and motivated?',
    'What programmes, benefits, or initiatives will improve mental, physical, occupational and emotional health at work?',
    'What role do innovation and adaptability play in sustaining a healthy organisation?',
    'Which key metrics or indicators will show that we are thriving, not just surviving?',
    'How can I leverage technology to ensure a holistically healthy organisation?',
  ],

  Reward: [
    'What does a rewarding work experience look like for me personally?',
    'What systems or practices could I implement to make rewards more meaningful and motivating for employees?',
    'What internal and external factors influence our organisation’s reward and benefit structure?',
    'How can I ensure that rewards align with both individual and organisational goals?',
    'Which types of reward strategies resonate most with the type of industry we operate in?',
  ],

  'Succession Planning': [
    'How does a succession plan benefit the organisation strategically?',
    'How do I envision the organisation evolving after I step into a new chapter or leave?',
    'What does a successful transition look like for me personally and for the organisation?',
    'What is the relationship between succession plans and business continuity?',
    'How can we optimise AI in driving succession plans organisationally?',
  ],

  'Executive Coaching': [
    'Do I or any of my executive leaders require Executive Coaching?',
    'What are the anticipated benefits of executive coaching for individuals and the organisation?',
    'Should Diversity, Equity, Inclusivity and Belonging be considered essential in Executive Coaching and why?',
    'How do I maintain my energy, focus, and well-being while leading and coaching?',
    'How can Executive Coaching inspire teams and make a lasting impact?',
  ],

  'Executive Sponsorship': [
    'In which areas do I need to rely on strategic advocacy and not on merit alone?',
    'What distinctive value do I bring that makes sponsorship a smart investment?',
    'What power structures do I need to better understand and navigate?',
    'What do I want my sponsors to say about me when I am not in the room?',
    'Whom am I sponsoring, and how visible is my advocacy for them?',
  ],

  'Leading a Remote Workforce': [
    'What core values should guide our interactions and decision-making when working remotely?',
    'How can I foster trust, collaboration, and psychological safety across distances?',
    'What communication habits or tools will help my team stay connected, informed, and motivated?',
    'How can I balance transparency with efficiency in a virtual environment?',
    'How will I encourage creativity and innovation when the team is not physically together?',
  ],

  'Industry Expertise': [
    'What emerging trends or innovations in my industry excite me the most right now?',
    'How can I create sustainable knowledge or influence that benefits others in my field?',
    'Who are the thought leaders I admire, and what can I learn from them to strengthen my expertise?',
    'Which platforms, networks or professional initiatives can amplify my industry voice?',
    'How can I stay ahead of technological or market shifts that affect my sector?',
  ],

  'Understanding Data': [
    'What role does data play in the vision of my organisation?',
    'How do I want data to influence decision-making in my leadership?',
    'What would a fully data-driven culture look like in my organisation?',
    'Which types of data insights do I want to rely on most for strategic decisions?',
    'What new tools, technologies, or platforms should I explore?',
  ],

  'Growth Mindset': [
    'Which limiting thoughts have held me back in my career, and how can I reframe them?',
    'How often have I embraced failure as a learning opportunity, and how can I do this more consistently?',
    'How do I want my mindset to influence my team and organisation?',
    'Which bold goals challenge me to stretch beyond my comfort zone?',
    'What practices keep me aligned with my vision for personal and professional growth?',
  ],

  Influence: [
    'Who are the people I admire for their influence, and what can I learn from them?',
    'In what areas of my organisation or industry can I have the most impact?',
    'Which stakeholders or networks are critical for me to influence, and how can I engage them effectively?',
    'What concrete goals can I set to measure my progress in influencing others?',
    'How do I balance influence with authenticity?',
  ],

  'Self-Mastery': [
    'Who am I becoming as a leader beyond my title and achievements?',
    'How do I lead myself with integrity before leading others?',
    'How do I respond under pressure, and how do I want to respond in hindsight?',
    'How do I create calm, clarity, and confidence in uncertain moments?',
    'What boundaries reflect self-respect and leadership maturity?',
  ],

  Visualisation: [
    'When I picture my highest self at work, what do I see first?',
    'How do I want people to describe me when I enter a room?',
    'What parts of my identity am I ready to fully own without apology?',
    'What does confidence look like on my face, in my posture, and in my voice?',
    'Where am I seen, heard, and recognised?',
  ],

  'Imposter Syndrome': [
    'Which of my achievements do I struggle to internalise, and why?',
    'How do I typically respond to praise or recognition: do I accept it, deflect it, or minimise it?',
    'In what ways do I compare myself to others, and how does that affect my confidence?',
    'What evidence proves I am qualified, capable, and trusted?',
    'What does confident visibility look like for me in boardrooms, media, or global spaces?',
  ],
};

const responseOptions = [
  'This is currently a leadership strength',
  'I am progressing, but need greater consistency',
  'This requires intentional attention',
  'This is a priority development area',
  'I need support, coaching or further reflection',
  'I am not yet sure',
];

export default function ToolkitClient() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [score, setScore] = useState(3);
  const [answers, setAnswers] = useState({});
  const [personalResponses, setPersonalResponses] = useState({});
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState([]);

  const theme = leadershipThemes[themeIndex];
  const module = theme.modules[moduleIndex];

  const questions = useMemo(() => questionBank[module] || [], [module]);

  function resetResponses() {
    setAnswers({});
    setPersonalResponses({});
    setReflection('');
  }

  function changeTheme(event) {
    setThemeIndex(Number(event.target.value));
    setModuleIndex(0);
    resetResponses();
  }

  function changeModule(event) {
    setModuleIndex(Number(event.target.value));
    resetResponses();
  }

  function updateAnswer(index, value) {
    setAnswers((previous) => ({
      ...previous,
      [index]: value,
    }));
  }

  function updatePersonalResponse(index, value) {
    setPersonalResponses((previous) => ({
      ...previous,
      [index]: value,
    }));
  }

  function saveReflection() {
    const hasResponse =
      Object.values(answers).some(Boolean) ||
      Object.values(personalResponses).some((value) => value?.trim()) ||
      reflection.trim();

    if (!hasResponse) return;

    const responses = questions.map((question, index) => ({
      question,
      assessment: answers[index] || 'No assessment selected',
      personalResponse:
        personalResponses[index]?.trim() || 'No personal response recorded',
    }));

    const record = {
      id: Date.now(),
      theme: theme.name,
      module,
      score,
      responses,
      reflection: reflection.trim(),
      createdAt: new Date().toLocaleString(),
    };

    setSaved((previous) => [record, ...previous]);
    resetResponses();
  }

  return (
    <div className="workspace-grid">
      <section className="panel">
        <span className="eyebrow">Inspired to Succeed™</span>

        <h2>{module}</h2>

        <p className="muted">
          Reflect honestly. This is not a test. The purpose is to help you see
          yourself clearly, identify what requires attention, and convert
          insight into intentional leadership action.
        </p>

        <label>
          Leadership theme
          <select value={themeIndex} onChange={changeTheme}>
            {leadershipThemes.map((item, index) => (
              <option key={item.name} value={index}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Competency module
          <select value={moduleIndex} onChange={changeModule}>
            {theme.modules.map((item, index) => (
              <option key={item} value={index}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Current self-rating: <strong>{score}/5</strong>
          <input
            type="range"
            min="1"
            max="5"
            value={score}
            onChange={(event) => setScore(Number(event.target.value))}
          />
        </label>

        <div className="prompt-list">
          {questions.map((question, index) => (
            <div
              key={`${module}-${index}`}
              style={{
                padding: '22px 0',
                borderBottom: '1px solid #e6ded3',
              }}
            >
              <p
                style={{
                  margin: '0 0 12px',
                  fontWeight: 700,
                  lineHeight: 1.55,
                }}
              >
                {index + 1}. {question}
              </p>

              <label
                style={{
                  display: 'grid',
                  gap: '7px',
                  marginBottom: '10px',
                  fontSize: '13px',
                }}
              >
                My current assessment
                <select
                  value={answers[index] || ''}
                  onChange={(event) =>
                    updateAnswer(index, event.target.value)
                  }
                  style={{
                    width: '100%',
                    minHeight: '48px',
                  }}
                >
                  <option value="">Select your response...</option>

                  {responseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}

                  <option value="Other">
                    Other — add my own assessment
                  </option>
                </select>
              </label>

              <label
                style={{
                  display: 'grid',
                  gap: '7px',
                  fontSize: '13px',
                }}
              >
                My personal reflection
                <textarea
                  rows="3"
                  value={personalResponses[index] || ''}
                  onChange={(event) =>
                    updatePersonalResponse(index, event.target.value)
                  }
                  placeholder="What does this question mean in your own leadership context?"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                />
              </label>
            </div>
          ))}
        </div>

        <label style={{ marginTop: '24px' }}>
          Executive reflection
          <textarea
            rows="7"
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            placeholder="What have you learnt about yourself? What needs to change, continue or become more intentional?"
          />
        </label>

        <button
          className="button primary"
          type="button"
          onClick={saveReflection}
        >
          Save my reflection
        </button>
      </section>

      <aside className="panel">
        <span className="eyebrow">My leadership journey</span>

        <h2>Development evidence</h2>

        <p className="muted">
          Your saved reflections build a record of the leader you are becoming.
        </p>

        {saved.length === 0 ? (
          <div
            style={{
              marginTop: '22px',
              padding: '24px',
              borderRadius: '16px',
              background: '#f6f1e8',
              border: '1px solid #e7ddcd',
            }}
          >
            <strong>No reflection saved yet.</strong>

            <p
              style={{
                marginBottom: 0,
                color: '#746a60',
                lineHeight: 1.6,
              }}
            >
              Complete a module on the left and save your reflection. Your
              leadership evidence will appear here.
            </p>
          </div>
        ) : (
          saved.map((item) => (
            <article
              className="saved-item"
              key={item.id}
              style={{
                marginTop: '18px',
              }}
            >
              <div>
                <strong>{item.module}</strong>

                <span
                  className={`status ${
                    item.score <= 2
                      ? 'red'
                      : item.score === 3
                      ? 'amber'
                      : 'green'
                  }`}
                >
                  {item.score}/5
                </span>
              </div>

              <small>{item.theme}</small>

              <small
                style={{
                  display: 'block',
                  marginTop: '5px',
                }}
              >
                {item.createdAt}
              </small>

              <div style={{ marginTop: '16px' }}>
                {item.responses.map((response, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    style={{
                      marginBottom: '16px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid #eee7de',
                    }}
                  >
                    <strong
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        lineHeight: 1.45,
                        marginBottom: '7px',
                      }}
                    >
                      {response.question}
                    </strong>

                    <span
                      style={{
                        display: 'block',
                        color: '#8b6517',
                        fontSize: '12px',
                        fontWeight: 700,
                        marginBottom: '7px',
                      }}
                    >
                      {response.assessment}
                    </span>

                    <span
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        lineHeight: 1.55,
                      }}
                    >
                      {response.personalResponse}
                    </span>
                  </div>
                ))}
              </div>

              {item.reflection && (
                <div
                  style={{
                    marginTop: '14px',
                    padding: '15px',
                    background: '#f6f1e8',
                    borderRadius: '12px',
                  }}
                >
                  <strong
                    style={{
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Executive reflection
                  </strong>

                  <p
                    style={{
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.reflection}
                  </p>
                </div>
              )}
            </article>
          ))
        )}
      </aside>
    </div>
  );
}
