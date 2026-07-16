import Link from 'next/link';
export default function ExecutiveDashboard() {
  const priorities = [
    ['Strategic Thinking', 4.2, 82], ['Governance', 3.4, 67], ['Self-Mastery', 2.6, 48], ['Emotional Intelligence', 2.2, 39]
  ];
  return <section className="section container">
    <div className="page-heading"><span className="eyebrow">Executive portal</span><h1>Welcome back, Naledi.</h1><p>Your leadership journey is 68% complete.</p></div>
    <div className="metric-grid">
      <div className="metric"><span>Overall progress</span><strong>68%</strong><small>+12% this month</small></div>
      <div className="metric"><span>Average score</span><strong>3.4</strong><small>Across 18 completed modules</small></div>
      <div className="metric"><span>Actions on track</span><strong>5/7</strong><small>Two require attention</small></div>
      <div className="metric"><span>Next review</span><strong>28 Jul</strong><small>With assigned coach</small></div>
    </div>
    <div className="two-column">
      <section className="panel"><h2>Competency priorities</h2>{priorities.map(([name, score, width]) => <div className="bar-row" key={name}><div><span>{name}</span><strong>{score}/5</strong></div><div className="bar"><span style={{width: `${width}%`}} /></div></div>)}</section>
      <section className="panel"><h2>90-day commitments</h2><div className="task"><span className="status amber">Due soon</span><strong>Strengthen board-level challenge</strong><p>Prepare a governance decision log and discuss it at the next board meeting.</p></div><div className="task"><span className="status green">On track</span><strong>Protect strategic thinking time</strong><p>Maintain two uninterrupted strategic blocks every week.</p></div><Link className="button secondary" href="/toolkit">Continue toolkit</Link></section>
    </div>
  </section>;
}
