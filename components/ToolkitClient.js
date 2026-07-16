'use client';
import { useMemo, useState } from 'react';
import { themes } from '@/lib/data';

const prompts = {
  Values: ['Which values guide my leadership decisions most often?', 'Where do I need greater alignment with my values?', 'Am I leading from conviction or convenience?'],
  Governance: ['What governance legacy should this organisation be known for?', 'Which governance blind spots require attention now?', 'Which ethical line will I never cross?'],
  'Self-Mastery': ['Who am I becoming beyond my title?', 'How do I respond under pressure?', 'Which boundaries demonstrate leadership maturity?']
};

export default function ToolkitClient() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [score, setScore] = useState(3);
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState([]);
  const theme = themes[themeIndex];
  const module = theme.modules[moduleIndex];
  const questions = useMemo(() => prompts[module] || [
    `What does strong ${module.toLowerCase()} leadership look like in my current role?`,
    `Which evidence shows where I am currently strong or constrained in ${module.toLowerCase()}?`,
    `What will I do differently during the next 90 days?`
  ], [module]);

  function saveReflection() {
    if (!reflection.trim()) return;
    setSaved(prev => [{ theme: theme.name, module, score, reflection }, ...prev]);
    setReflection('');
  }

  return (
    <div className="workspace-grid">
      <section className="panel">
        <span className="eyebrow">Guided reflection</span>
        <h2>{module}</h2>
        <label>Leadership theme
          <select value={themeIndex} onChange={e => { setThemeIndex(Number(e.target.value)); setModuleIndex(0); }}>
            {themes.map((t, i) => <option key={t.name} value={i}>{t.name}</option>)}
          </select>
        </label>
        <label>Competency module
          <select value={moduleIndex} onChange={e => setModuleIndex(Number(e.target.value))}>
            {theme.modules.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
        </label>
        <label>Current self-rating: <strong>{score}/5</strong>
          <input type="range" min="1" max="5" value={score} onChange={e => setScore(Number(e.target.value))} />
        </label>
        <div className="prompt-list">
          {questions.map(q => <p key={q}>{q}</p>)}
        </div>
        <label>Executive reflection
          <textarea rows="8" value={reflection} onChange={e => setReflection(e.target.value)} placeholder="Record evidence, implications and the desired future state..." />
        </label>
        <button className="button primary" type="button" onClick={saveReflection}>Save reflection</button>
      </section>
      <aside className="panel">
        <span className="eyebrow">Session record</span>
        <h2>Development evidence</h2>
        {saved.length === 0 ? <p className="muted">Your saved reflections will appear here.</p> : saved.map((item, i) => (
          <article className="saved-item" key={`${item.module}-${i}`}>
            <div><strong>{item.module}</strong><span className={`status ${item.score <= 2 ? 'red' : item.score === 3 ? 'amber' : 'green'}`}>{item.score}/5</span></div>
            <small>{item.theme}</small>
            <p>{item.reflection}</p>
          </article>
        ))}
      </aside>
    </div>
  );
}
