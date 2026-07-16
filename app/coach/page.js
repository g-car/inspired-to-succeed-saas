import { users, interventions } from '@/lib/data';
export default function CoachPage() {
  const clients = users.filter(u => u.coach === 'Wezi Khoza');
  return <section className="section container">
    <div className="page-heading"><span className="eyebrow">Coach portal</span><h1>Client coaching workspace</h1><p>Review authorised client progress and prioritise meaningful intervention.</p></div>
    <div className="metric-grid"><div className="metric"><span>Assigned clients</span><strong>{clients.length}</strong></div><div className="metric"><span>High priority</span><strong>{clients.filter(c => c.risk === 'red').length}</strong></div><div className="metric"><span>Sessions this month</span><strong>8</strong></div><div className="metric"><span>Action completion</span><strong>74%</strong></div></div>
    <div className="panel table-panel"><h2>Assigned clients</h2><div className="table-wrap"><table><thead><tr><th>Client</th><th>Progress</th><th>Average</th><th>Priority</th><th>Status</th><th>Last active</th></tr></thead><tbody>{clients.map(c => <tr key={c.name}><td><strong>{c.name}</strong><small>{c.organisation}</small></td><td>{c.progress}%</td><td>{c.score}/5</td><td>{c.priority}</td><td><span className={`status ${c.risk}`}>{c.risk}</span></td><td>{c.lastActive}</td></tr>)}</tbody></table></div></div>
    <div className="panel"><h2>Recommended coaching actions</h2>{interventions.filter(i => clients.some(c => c.name === i.user)).map(i => <article className="intervention" key={i.user}><div><span className={`status ${i.level === 'High' ? 'red' : 'amber'}`}>{i.level}</span><strong>{i.user}</strong></div><p>{i.reason}</p><small>{i.recommendation}</small></article>)}</div>
  </section>;
}
