# Inspired to Succeed SaaS

A Vercel-ready Next.js prototype for executive leadership reflection, coaching and multi-organisation administration.

## Included

- Book-cover landing page
- Executive toolkit workspace
- Executive progress dashboard
- Coach portal
- Administrator usage dashboard
- Coaching Intervention Centre
- Multi-tenant Supabase schema starter
- Vercel health endpoint at `/api/health`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Create a new GitHub repository.
2. Upload every file and folder in this project.
3. In Vercel, select **Add New > Project**.
4. Import the GitHub repository.
5. Leave Framework Preset as **Next.js**.
6. Select **Deploy**.

No environment variables are required for this demonstration build.

## Production database phase

The `/supabase/schema.sql` file provides the starting multi-tenant database structure. Before connecting real users:

- create a Supabase project;
- run the schema;
- add organisation-scoped Row Level Security policies;
- add authentication and invitation workflows;
- replace demonstration arrays in `lib/data.js` with secure server queries;
- add explicit user consent controls for sharing reflections;
- keep coaching alerts as decision support, not diagnosis.

## Roles planned

- Platform super administrator
- Toolkit owner
- Organisation administrator
- Lead coach
- Coach
- Executive user
- Corporate sponsor
- Read-only reviewer
