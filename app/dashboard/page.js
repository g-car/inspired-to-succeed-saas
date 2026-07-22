'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const starterCommitments = [
  {
    id: 1,
    title: 'Hold the courageous conversation',
    why: 'Resolve uncertainty and strengthen trust in the leadership team.',
    deadline: 'Today, 15:00',
    status: 'in-progress',
    measure: 'Conversation completed and next steps agreed.',
  },
  {
    id: 2,
    title: 'Protect strategic thinking time',
    why: 'Create space for decisions that shape the next 90 days.',
    deadline: 'Thursday, 10:00',
    status: 'not-started',
    measure: 'Two uninterrupted 90-minute strategy blocks completed.',
  },
  {
    id: 3,
    title: 'Recognise one emerging leader',
    why: 'Multiply leadership by affirming and developing others.',
    deadline: 'Friday, 16:00',
    status: 'completed',
    measure: 'Feedback shared and one development opportunity agreed.',
  },
];

const journey = [
  ['Discover', 'Know who you are today', 100],
  ['Dream', 'Clarify the future you are building', 86],
  ['Believe', 'Align your mindset and choices', 72],
  ['Become', 'Practise the leader you aspire to be', 58],
  ['Influence', 'Create meaningful impact through others', 34],
  ['Multiply', 'Develop leaders who develop leaders', 16],
  ['Legacy', 'Build what will remain after you', 4],
];

function statusLabel(status) {
  if (status === 'completed') return 'Completed';
  if (status === 'in-progress') return 'In progress';
  return 'Not started';
}

export default function ExecutiveDashboard() {
  const [commitments, setCommitments] = useState(starterCommitments);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    why: '',
    deadline: '',
    measure: '',
  });

  useEffect(() => {
    const saved = window.localStorage.getItem('its-commitments');

    if (saved) {
      try {
        setCommitments(JSON.parse(saved));
      } catch {
        setCommitments(starterCommitments);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      'its-commitments',
      JSON.stringify(commitments)
    );
  }, [commitments]);

  const completed = commitments.filter(
    (item) => item.status === 'completed'
  ).length;

  const commitmentRate = commitments.length
    ? Math.round((completed / commitments.length) * 100)
    : 0;

  const activeCommitment = useMemo(
    () =>
      commitments.find((item) => item.status !== 'completed') ||
      commitments[0],
    [commitments]
  );

  function updateStatus(id, status) {
    setCommitments((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  }

  function addCommitment(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.deadline.trim()) return;

    setCommitments((current) => [
      {
        id: Date.now(),
        title: form.title.trim(),
        why:
          form.why.trim() ||
          'This commitment supports my current leadership journey.',
        deadline: form.deadline.trim(),
        measure:
          form.measure.trim() ||
          'I will record clear evidence that the commitment was honoured.',
        status: 'not-started',
      },
      ...current,
    ]);

    setForm({
      title: '',
      why: '',
      deadline: '',
      measure: '',
    });

    setShowForm(false);
  }

  return (
    <main className="journey-dashboard">
      <section className="journey-hero">
        <div className="container journey-hero-grid">
          <div>
            <span className="eyebrow light">My leadership journey</span>

            <h1>Good morning, Naledi.</h1>

            <p>
              Leadership grows when inspiration becomes a promise, and a
              promise becomes consistent action.
            </p>

            <div className="hero-actions">
              <a
                className="button journey-primary"
                href="#today"
              >
                Continue today&apos;s journey
              </a>

              <Link
                className="button journey-ghost"
                href="/toolkit"
              >
                Open leadership toolkit
              </Link>
            </div>
          </div>

          <aside
            className="daily-card"
            aria-label="Today's aligning phrase"
          >
            <span>Today&apos;s aligning phrase</span>

            <blockquote>
              “Action generates momentum.”
            </blockquote>

            <p>
              Choose one meaningful action that moves your most important
              leadership goal forward today.
            </p>
          </aside>
        </div>
      </section>

      <section
        className="container journey-body"
        id="today"
      >
        <div className="journey-summary-grid">
          <article className="journey-stat featured">
            <span>Leadership momentum</span>
            <strong>68%</strong>

            <div className="momentum-track">
              <i style={{ width: '68%' }} />
            </div>

            <small>
              Momentum is increasing — 12% this month.
            </small>
          </article>

          <article className="journey-stat">
            <span>Promises honoured</span>
            <strong>
              {completed}/{commitments.length}
            </strong>
            <small>
              {commitmentRate}% current completion rate
            </small>
          </article>

          <article className="journey-stat">
            <span>Reflection streak</span>
            <strong>18 days</strong>
            <small>Your longest streak is 31 days</small>
          </article>

          <article className="journey-stat">
            <span>Current milestone</span>
            <strong>Become</strong>
            <small>
              Practising leadership through action
            </small>
          </article>
        </div>

        <div className="journey-main-grid">
          <section className="journey-panel current-focus">
            <div className="journey-panel-heading">
              <div>
                <span className="eyebrow">
                  Today&apos;s leadership focus
                </span>

                <h2>Turn intention into action</h2>
              </div>

              <span className="focus-badge">
                Courageous
              </span>
            </div>

            {activeCommitment ? (
              <div className="promise-card">
                <span className="promise-label">
                  My executive promise
                </span>

                <h3>{activeCommitment.title}</h3>

                <p>{activeCommitment.why}</p>

                <dl>
                  <div>
                    <dt>Deadline</dt>
                    <dd>{activeCommitment.deadline}</dd>
                  </div>

                  <div>
                    <dt>Success measure</dt>
                    <dd>{activeCommitment.measure}</dd>
                  </div>
                </dl>

                <div className="promise-actions">
                  <button
                    onClick={() =>
                      updateStatus(
                        activeCommitment.id,
                        'in-progress'
                      )
                    }
                    className="button secondary"
                  >
                    I am working on it
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        activeCommitment.id,
                        'completed'
                      )
                    }
                    className="button journey-primary"
                  >
                    I honoured this promise
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                Create your first leadership commitment for today.
              </div>
            )}
          </section>

          <section className="journey-panel check-in-panel">
            <span className="eyebrow">
              Midday check-in
            </span>

            <h2>How are you doing?</h2>

            <p>
              Select the response that best describes your progress.
              Commitments are saved locally in the browser during this
              prototype phase.
            </p>

            <div className="check-in-options">
              <button type="button">
                😀
                <span>On track</span>
              </button>

              <button type="button">
                😐
                <span>Some challenges</span>
              </button>

              <button type="button">
                🌱
                <span>I need support</span>
              </button>
            </div>
          </section>
        </div>

        <section className="journey-panel commitments-panel">
          <div className="journey-panel-heading">
            <div>
              <span className="eyebrow">
                Commitment and accountability
              </span>

              <h2>My leadership commitments</h2>

              <p>
                Every commitment has a purpose, a deadline and a visible
                measure of success.
              </p>
            </div>

            <button
              className="button journey-primary"
              onClick={() =>
                setShowForm((value) => !value)
              }
            >
              {showForm
                ? 'Close form'
                : '+ New commitment'}
            </button>
          </div>

          {showForm && (
            <form
              className="commitment-form"
              onSubmit={addCommitment}
            >
              <label>
                What exactly will you do?

                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      title: event.target.value,
                    })
                  }
                  placeholder="Example: Hold a coaching conversation with my team leader"
                  required
                />
              </label>

              <label>
                Why does this matter?

                <textarea
                  value={form.why}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      why: event.target.value,
                    })
                  }
                  placeholder="Connect the commitment to your purpose, values or goal."
                />
              </label>

              <div className="form-two-column">
                <label>
                  By when?

                  <input
                    value={form.deadline}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        deadline: event.target.value,
                      })
                    }
                    placeholder="Friday, 15:00"
                    required
                  />
                </label>

                <label>
                  How will success be measured?

                  <input
                    value={form.measure}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        measure: event.target.value,
                      })
                    }
                    placeholder="Clear evidence of completion"
                  />
                </label>
              </div>

              <button
                className="button journey-primary"
                type="submit"
              >
                Make this commitment
              </button>
            </form>
          )}

          <div className="commitment-list">
            {commitments.map((item) => (
              <article
                className={`commitment-item ${item.status}`}
                key={item.id}
              >
                <div
                  className="commitment-status-mark"
                  aria-hidden="true"
                >
                  {item.status === 'completed'
                    ? '✓'
                    : item.status === 'in-progress'
                    ? '→'
                    : '○'}
                </div>

                <div className="commitment-copy">
                  <div className="commitment-title-row">
                    <h3>{item.title}</h3>

                    <span className={`status ${item.status}`}>
                      {statusLabel(item.status)}
                    </span>
                  </div>

                  <p>{item.why}</p>

                  <small>
                    <b>By:</b> {item.deadline}
                    &nbsp;·&nbsp;
                    <b>Success:</b> {item.measure}
                  </small>
                </div>

                <select
                  value={item.status}
                  onChange={(event) =>
                    updateStatus(
                      item.id,
                      event.target.value
                    )
                  }
                  aria-label={`Update ${item.title}`}
                >
                  <option value="not-started">
                    Not started
                  </option>

                  <option value="in-progress">
                    In progress
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-panel milestones-panel">
          <div className="journey-panel-heading">
            <div>
              <span className="eyebrow">
                The Inspired to Succeed journey
              </span>

              <h2>Your seven milestones</h2>
            </div>

            <Link
              href="/toolkit"
              className="text-link"
            >
              Explore the full journey →
            </Link>
          </div>

          <div className="milestone-grid">
            {journey.map(
              ([name, description, progress], index) => (
                <article
                  className={
                    progress === 100
                      ? 'complete'
                      : progress > 0
                      ? 'active'
                      : ''
                  }
                  key={name}
                >
                  <div className="milestone-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3>{name}</h3>

                  <p>{description}</p>

                  <div className="milestone-progress">
                    <i
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <small>
                    {progress}% complete
                  </small>
                </article>
              )
            )}
          </div>
        </section>

        <section className="reflection-callout">
          <div>
            <span className="eyebrow light">
              Evening reflection
            </span>

            <h2>
              Did you honour the promise you made to yourself?
            </h2>

            <p>
              Review what happened, what you learnt, and what you will do
              differently tomorrow.
            </p>
          </div>

          <Link
            className="button journey-ghost"
            href="/toolkit"
          >
            Open executive diary
          </Link>
        </section>
      </section>
    </main>
  );
}
