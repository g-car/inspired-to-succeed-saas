export const themes = [
  { name: 'Values Driven', modules: ['Values', 'Discipline', 'Agility', 'Courageous Leadership', 'Citizenship'] },
  { name: 'Cultural Competence', modules: ['Collaboration', 'DEIB', 'ESG', 'Globalisation', 'Relations', 'Competition', 'Social Intelligence', 'Emotional Intelligence'] },
  { name: 'Performance Centred', modules: ['Innovation', 'Business Intelligence', 'Change Leadership', 'Decision Making', 'Problem Solving', 'Governance'] },
  { name: 'Strategic and Integrative', modules: ['Positioning', 'Artificial Intelligence', 'ICT', 'Digital Transformation', 'Infrastructure Development', 'Knowledge Management', 'Strategic Thinking'] },
  { name: 'People Oriented', modules: ['Talent Attraction', 'Corporate Health', 'Reward', 'Succession Planning', 'Executive Coaching', 'Executive Sponsorship', 'Leading a Remote Workforce'] },
  { name: 'Personal Development', modules: ['Industry Expertise', 'Understanding Data', 'Growth Mindset', 'Influence', 'Self-Mastery', 'Visualisation', 'Imposter Syndrome'] }
];

export const users = [
  { name: 'Naledi Mokoena', organisation: 'Ubuntu Leadership Group', coach: 'Wezi Khoza', progress: 84, score: 4.1, risk: 'green', lastActive: 'Today', priority: 'Strategic Thinking' },
  { name: 'Thabo Ndlovu', organisation: 'Ubuntu Leadership Group', coach: 'Wezi Khoza', progress: 42, score: 2.2, risk: 'red', lastActive: '18 days ago', priority: 'Emotional Intelligence' },
  { name: 'Lerato Molefe', organisation: 'Mosaic Coaching', coach: 'Dineo Maseko', progress: 68, score: 3.0, risk: 'amber', lastActive: '3 days ago', priority: 'Courageous Leadership' },
  { name: 'Sibusiso Dlamini', organisation: 'Mosaic Coaching', coach: 'Dineo Maseko', progress: 25, score: 1.9, risk: 'red', lastActive: '31 days ago', priority: 'Governance' },
  { name: 'Ayanda Khumalo', organisation: 'Ubuntu Leadership Group', coach: 'Wezi Khoza', progress: 91, score: 4.5, risk: 'green', lastActive: 'Today', priority: 'Innovation' },
  { name: 'Palesa Seema', organisation: 'Independent Practice', coach: 'Kabelo Radebe', progress: 57, score: 2.8, risk: 'amber', lastActive: '6 days ago', priority: 'Self-Mastery' }
];

export const interventions = [
  { user: 'Thabo Ndlovu', reason: 'Low score and repeated stress indicators', level: 'High', recommendation: 'Schedule emotional-regulation coaching within 7 days', status: 'Open' },
  { user: 'Sibusiso Dlamini', reason: 'Governance score below 2 and 31 days inactivity', level: 'High', recommendation: 'Immediate re-engagement and governance coaching review', status: 'Open' },
  { user: 'Lerato Molefe', reason: 'Action plan overdue by 9 days', level: 'Medium', recommendation: 'Accountability check-in and action-plan reset', status: 'Monitoring' },
  { user: 'Palesa Seema', reason: 'Confidence-related reflections across three modules', level: 'Medium', recommendation: 'Executive presence and self-mastery session', status: 'Assigned' }
];
