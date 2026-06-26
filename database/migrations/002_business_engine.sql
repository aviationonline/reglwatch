-- ============================================================
-- ReglWatch
-- Migration 002
-- Business Engine
-- ============================================================

------------------------------------------------------------
-- OBLIGATIONS
------------------------------------------------------------

create table if not exists public.obligations (

    id uuid primary key default gen_random_uuid(),

    regulation_id uuid references public.regulations(id) on delete cascade,

    code text,

    title text not null,

    description text,

    legal_reference text,

    frequency text,

    deadline_days integer,

    mandatory boolean default true,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

------------------------------------------------------------
-- COMPANY OBLIGATIONS
------------------------------------------------------------

create table if not exists public.company_obligations (

    id uuid primary key default gen_random_uuid(),

    company_id uuid references public.companies(id) on delete cascade,

    obligation_id uuid references public.obligations(id) on delete cascade,

    status text not null default 'todo',

    due_date date,

    completed_at timestamptz,

    notes text,

    created_at timestamptz default now(),

    updated_at timestamptz default now(),

    unique(company_id, obligation_id)

);

------------------------------------------------------------
-- TASKS
------------------------------------------------------------

create table if not exists public.tasks (

    id uuid primary key default gen_random_uuid(),

    company_obligation_id uuid references public.company_obligations(id) on delete cascade,

    title text not null,

    description text,

    priority text default 'medium',

    status text default 'todo',

    assigned_to uuid,

    due_date date,

    completed_at timestamptz,

    created_at timestamptz default now()

);

------------------------------------------------------------
-- WORKFLOW LOGS
------------------------------------------------------------

create table if not exists public.workflow_logs (

    id uuid primary key default gen_random_uuid(),

    workflow text not null,

    step text,

    status text,

    message text,

    payload jsonb,

    created_at timestamptz default now()

);

------------------------------------------------------------
-- INDEXES
------------------------------------------------------------

create index if not exists idx_obligation_regulation
on public.obligations(regulation_id);

create index if not exists idx_company_obligation_company
on public.company_obligations(company_id);

create index if not exists idx_company_obligation_status
on public.company_obligations(status);

create index if not exists idx_tasks_status
on public.tasks(status);

create index if not exists idx_tasks_due
on public.tasks(due_date);

create index if not exists idx_workflow_logs_workflow
on public.workflow_logs(workflow);

------------------------------------------------------------
-- VIEW : DASHBOARD
------------------------------------------------------------

create or replace view public.vw_company_dashboard as

select

c.id as company_id,

c.company_name,

count(distinct co.id) as obligations,

count(distinct case when co.status='todo' then co.id end) as todo,

count(distinct case when co.status='done' then co.id end) as completed,

count(distinct case when t.priority='critical' and t.status<>'done' then t.id end) as critical_tasks

from public.companies c

left join public.company_obligations co
on co.company_id=c.id

left join public.tasks t
on t.company_obligation_id=co.id

group by
c.id,
c.company_name;
