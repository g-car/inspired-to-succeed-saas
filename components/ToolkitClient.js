'use client';

import { useMemo, useState } from 'react';
import { themes } from '@/lib/data';

const promptBank = {
  Values: [
    {
      question: 'Which values guide my leadership decisions most often?',
      options: [
        'Integrity',
        'Accountability',
        'Respect',
        'Fairness',
        'Courage',
        'Service',
        'Excellence',
        'Transparency',
        'Compassion',
        'Trust',
      ],
    },
    {
      question: 'Where do I need greater alignment with my values?',
      options: [
        'Decision making',
        'Communication',
        'Managing people',
        'Conflict situations',
        'Performance management',
        'Ethical choices',
        'Time and priorities',
        'Relationships with colleagues',
        'Board or governance responsibilities',
        'Personal conduct',
      ],
    },
    {
      question: 'Am I leading from conviction or convenience?',
      options: [
        'Mostly from conviction',
        'Usually from conviction',
        'A balance of both',
        'Sometimes from convenience',
        'Mostly from convenience',
        'I am not yet sure',
      ],
    },
  ],

  Governance: [
    {
      question: 'What governance legacy should this organisation be known for?',
      options: [
        'Ethical leadership',
        'Transparency',
        'Accountability',
        'Responsible decision making',
        'Strong oversight',
        'Stakeholder trust',
        'Compliance excellence',
        'Fairness and consistency',
        'Sustainable governance',
      ],
    },
    {
      question: 'Which governance blind spot requires attention now?',
      options: [
        'Board oversight',
        'Risk management',
        'Ethics',
        'Compliance',
        'Conflicts of interest',
        'Delegation of authority',
        'Performance accountability',
        'Stakeholder communication',
        'Succession planning',
      ],
    },
    {
      question: 'Which ethical line will I never cross?',
      options: [
        'Dishonesty',
        'Abuse of authority',
        'Conflicts of interest',
        'Discrimination',
        'Corruption',
        'Manipulation of information',
        'Unfair treatment',
        'Ignoring wrongdoing',
        'Compromising organisational values',
      ],
    },
  ],

  'Self-Mastery': [
    {
      question: 'Who am I becoming beyond my title?',
      options: [
        'A more authentic leader',
        'A more courageous leader',
        'A more disciplined leader',
        'A more compassionate leader',
        'A more strategic leader',
        'A more resilient leader',
        'A more self-aware leader',
        'A more purposeful leader',
        'A more balanced leader',
      ],
    },
    {
      question: 'How do I respond under pressure?',
      options: [
        'I remain calm and focused',
        'I become more decisive',
        'I seek advice before acting',
        'I become impatient',
        'I avoid difficult decisions',
        'I become overly controlling',
        'I withdraw',
        'My response depends on the situation',
      ],
    },
    {
      question: 'Which boundaries demonstrate leadership maturity?',
      options: [
        'Protecting strategic thinking time',
        'Saying no when necessary',
        'Delegating appropriately',
        'Separating work and personal recovery time',
        'Avoiding unnecessary conflict',
        'Maintaining ethical boundaries',
        'Respecting confidentiality',
        'Managing availability to others',
        'Protecting health and wellbeing',
      ],
    },
  ],
};

function buildDefaultPrompts(module) {
  const name = module.toLowerCase();

  return [
    {
      question: `What does strong ${name} leadership look like in my current role?`,
      options: [
        'I demonstrate this consistently',
        'I demonstrate this most of the time',
        'I demonstrate this sometimes',
        'This is an important growth area',
        'I need significant development here',
        'I am not yet sure',
      ],
    },
    {
      question: `Which evidence best describes where I am currently strong or constrained in ${name}?`,
      options: [
        'My behaviour consistently demonstrates strength',
        'Feedback from others confirms strength',
        'Results demonstrate strength',
        'I understand it but do not apply it consistently',
        'I struggle in demanding situations',
        'I need more experience or support',
        'I do not yet have enough evidence',
      ],
    },
    {
      question: 'What should be my primary development focus during the next 90 days?',
      options: [
        'Build greater consistency',
        'Develop a new leadership habit',
        'Improve decision making',
        'Strengthen communication',
        'Seek coaching or mentoring',
        'Practise this competency in real situations',
        'Request feedback from others',
        'Set a measurable leadership goal',
      ],
    },
  ];
}

export default function ToolkitClient() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [score, setScore] = useState(3);
  const [answers, setAnswers] = useState({});
  const [otherAnswers, setOtherAnswers] = useState({});
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState([]);

  const theme = themes[themeIndex];
  const module = theme.modules[moduleIndex];

  const questions = useMemo(
    () => promptBank[module] || buildDefaultPrompts(module),
    [module]
  );

  function resetResponses() {
    setAnswers({});
    setOtherAnswers({});
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
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));

    if (value !== 'Other') {
      setOtherAnswers((prev) => ({
        ...prev,
        [index]: '',
      }));
    }
  }

  function updateOtherAnswer(index, value) {
    setOtherAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  }

  function finalAnswer(index) {
    if (answers[index] === 'Other') {
      return otherAnswers[index]?.trim() || 'Other — not specified';
    }

    return answers[index] || 'No response selected';
  }

  function saveReflection() {
    const hasAnyResponse =
      Object.values(answers).some(Boolean) || reflection.trim();

    if (!hasAnyResponse) return;

    const responseRecord = questions.map((item, index) => ({
      question: item.question,
      answer: finalAnswer(index),
    }));

    setSaved((prev) => [
      {
        theme: theme.name,
        module,
        score,
        responses: responseRecord,
        reflection: reflection.trim(),
      },
      ...prev,
    ]);

    resetResponses();
  }

  return (
    <div className="workspace-grid">
      <section className="panel">
        <span className="eyebrow">Guided reflection</span>

        <h2>{module}</h2>

        <label>
          Leadership theme
          <select value={themeIndex} onChange={changeTheme}>
            {themes.map((item, index) => (
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
          {questions.map((item, index) => (
            <div
              key={`${module}-${index}`}
              style={{
                padding: '18px 0',
                borderBottom: '1px solid #e6ded3',
              }}
            >
              <p
                style={{
                  marginTop: 0,
                  marginBottom: '10px',
                  fontWeight: 700,
                }}
              >
                {item.question}
              </p>

              <select
                value={answers[index] || ''}
                onChange={(event) =>
                  updateAnswer(index, event.target.value)
                }
                style={{
                  width: '100%',
                  minHeight: '48px',
                  marginTop: '4px',
                }}
              >
                <option value="">Select your response...</option>

                {item.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}

                <option value="Other">
                  Other — add my own response
                </option>
              </select>

              {answers[index] === 'Other' && (
                <input
                  type="text"
                  value={otherAnswers[index] || ''}
                  onChange={(event) =>
                    updateOtherAnswer(index, event.target.value)
                  }
                  placeholder="Type your personal response..."
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    marginTop: '10px',
                    padding: '12px 14px',
                    border: '1px solid #ddd4c9',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                    font: 'inherit',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <label style={{ marginTop: '22px' }}>
          Executive reflection
          <textarea
            rows="8"
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            placeholder="Record additional evidence, implications, lessons or the desired future state..."
          />
        </label>

        <button
          className="button primary"
          type="button"
          onClick={saveReflection}
        >
          Save reflection
        </button>
      </section>

      <aside className="panel">
        <span className="eyebrow">Session record</span>

        <h2>Development evidence</h2>

        {saved.length === 0 ? (
          <p className="muted">
            Your saved reflections will appear here.
          </p>
        ) : (
          saved.map((item, recordIndex) => (
            <article
              className="saved-item"
              key={`${item.module}-${recordIndex}`}
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

              <div style={{ marginTop: '14px' }}>
                {item.responses.map((response, index) => (
                  <div
                    key={`${response.question}-${index}`}
                    style={{
                      marginBottom: '13px',
                      paddingBottom: '13px',
                      borderBottom: '1px solid #eee7de',
                    }}
                  >
                    <strong
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        marginBottom: '5px',
                      }}
                    >
                      {response.question}
                    </strong>

                    <span style={{ fontSize: '13px' }}>
                      {response.answer}
                    </span>
                  </div>
                ))}
              </div>

              {item.reflection && (
                <p>
                  <strong>Additional reflection:</strong>
                  <br />
                  {item.reflection}
                </p>
              )}
            </article>
          ))
        )}
      </aside>
    </div>
  );
}
