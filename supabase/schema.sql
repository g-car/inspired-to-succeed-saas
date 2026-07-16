-- Multi-tenant production schema for Inspired to Succeed.
create extension if not exists "pgcrypto";

create table organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  brand_colour text,
  plan text not null default 'starter',
  created_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('super_admin','owner','organisation_admin','lead_coach','coach','executive','sponsor','reviewer')),
  created_at timestamptz not null default now()
);

create table organisation_members (
  organisation_id uuid references organisations(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  role text not null,
  primary key (organisation_id, user_id)
);

create table coach_client_assignments (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  coach_id uuid not null references profiles(id),
  client_id uuid not null references profiles(id),
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (organisation_id, coach_id, client_id)
);

create table assessment_sessions (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  theme text not null,
  competency text not null,
  score int not null check (score between 1 and 5),
  reflection text,
  consent_to_share boolean not null default false,
  created_at timestamptz not null default now()
);

create table action_plans (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  competency text not null,
  outcome text not null,
  first_action text not null,
  success_indicator text not null,
  target_date date,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table coaching_alerts (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  severity text not null check (severity in ('green','amber','red')),
  rule_code text not null,
  evidence jsonb not null default '{}'::jsonb,
  recommendation text,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table coaching_interventions (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  alert_id uuid references coaching_alerts(id) on delete set null,
  client_id uuid not null references profiles(id),
  coach_id uuid references profiles(id),
  notes text,
  next_session_at timestamptz,
  outcome text,
  status text not null default 'assigned',
  created_at timestamptz not null default now()
);

alter table organisations enable row level security;
alter table organisation_members enable row level security;
alter table assessment_sessions enable row level security;
alter table action_plans enable row level security;
alter table coaching_alerts enable row level security;
alter table coaching_interventions enable row level security;

-- Production policies should verify organisation membership and role.
-- Keep service-role keys server-side only; never expose them in the browser.
