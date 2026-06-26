-- ============================================================
-- ReglWatch
-- Migration 003
-- AI Engine
-- Compatible avec 001 + 002
-- ============================================================

------------------------------------------------------------
-- AI RUNS
------------------------------------------------------------

create table if not exists public.ai_runs (

    id uuid primary key default gen_random_uuid(),

    document_id uuid
        references public.source_documents(id)
        on delete cascade,

    regulation_id uuid
        references public.regulations(id)
        on delete set null,

    provider text not null default 'openai',

    model text not null,

    prompt_version text not null,

    tokens_input integer default 0,

    tokens_output integer default 0,

    latency_ms integer,

    estimated_cost numeric(10,6),

    success boolean default true,

    error_message text,

    created_at timestamptz default now()

);

------------------------------------------------------------
-- PROMPT VERSIONS
------------------------------------------------------------

create table if not exists public.prompt_versions (

    id uuid primary key default gen_random_uuid(),

    version text not null unique,

    description text,

    prompt text not null,

    active boolean default false,

    created_at timestamptz default now()

);

------------------------------------------------------------
-- AI PROVIDERS
------------------------------------------------------------

create table if not exists public.ai_providers (

    id uuid primary key default gen_random_uuid(),

    code text unique,

    name text,

    enabled boolean default true,

    created_at timestamptz default now()

);

------------------------------------------------------------
-- AI MODELS
------------------------------------------------------------

create table if not exists public.ai_models (

    id uuid primary key default gen_random_uuid(),

    provider_id uuid
        references public.ai_providers(id)
        on delete cascade,

    model text,

    input_price numeric(10,6),

    output_price numeric(10,6),

    enabled boolean default true,

    created_at timestamptz default now()

);

------------------------------------------------------------
-- DEFAULT PROVIDER
------------------------------------------------------------

insert into public.ai_providers
(
code,
name
)

values

(
'openai',
'OpenAI'
)

on conflict(code)

do nothing;

------------------------------------------------------------
-- DEFAULT PROMPT
------------------------------------------------------------

insert into public.prompt_versions
(
version,
description,
prompt,
active
)

values
(
'v1',

'Initial production prompt',

'placeholder',

true
)

on conflict(version)

do nothing;

------------------------------------------------------------
-- INDEXES
------------------------------------------------------------

create index if not exists idx_ai_document
on public.ai_runs(document_id);

create index if not exists idx_ai_regulation
on public.ai_runs(regulation_id);

create index if not exists idx_ai_success
on public.ai_runs(success);

create index if not exists idx_prompt_active
on public.prompt_versions(active);

------------------------------------------------------------
-- VIEW
------------------------------------------------------------

create or replace view public.vw_ai_dashboard as

select

count(*) total_runs,

count(*) filter(where success=true) successful_runs,

count(*) filter(where success=false) failed_runs,

sum(tokens_input) input_tokens,

sum(tokens_output) output_tokens,

sum(estimated_cost) total_cost

from public.ai_runs;

------------------------------------------------------------
-- END
------------------------------------------------------------
