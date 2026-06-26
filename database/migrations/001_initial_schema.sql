-- ============================================================
-- ReglWatch
-- Migration 001
-- Initial Schema
-- ============================================================

create extension if not exists pgcrypto;

------------------------------------------------------------
-- SOURCES
------------------------------------------------------------

create table if not exists public.sources (

    id uuid primary key default gen_random_uuid(),

    name text not null,

    connector text not null,

    url text not null,

    enabled boolean not null default true,

    frequency_minutes integer not null default 60,

    created_at timestamptz not null default now()

);

------------------------------------------------------------
-- SOURCE DOCUMENTS
------------------------------------------------------------

create table if not exists public.source_documents (

    id uuid primary key default gen_random_uuid(),

    source_id uuid references public.sources(id) on delete cascade,

    external_id text,

    title text not null,

    url text,

    published_at timestamptz,

    content text,

    raw_payload jsonb,

    content_hash text not null unique,

    processing_status text not null default 'pending',

    error_message text,

    collected_at timestamptz default now(),

    processed_at timestamptz,

    created_at timestamptz default now()

);

------------------------------------------------------------
-- REGULATIONS
------------------------------------------------------------

create table if not exists public.regulations (

    id uuid primary key default gen_random_uuid(),

    document_id uuid references public.source_documents(id) on delete cascade,

    title text not null,

    summary text,

    category text,

    sectors text[],

    urgency text not null default 'medium',

    effective_date date,

    status text not null default 'draft',

    ai_summary text,

    ai_actions jsonb,

    ai_confidence numeric(4,3),

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

------------------------------------------------------------
-- INDEXES
------------------------------------------------------------

create index if not exists idx_sd_hash
on public.source_documents(content_hash);

create index if not exists idx_sd_status
on public.source_documents(processing_status);

create index if not exists idx_sd_source
on public.source_documents(source_id);

create index if not exists idx_sd_published
on public.source_documents(published_at desc);

create index if not exists idx_reg_status
on public.regulations(status);

create index if not exists idx_reg_urgency
on public.regulations(urgency);

create index if not exists idx_reg_effective
on public.regulations(effective_date);

create index if not exists idx_reg_sector
on public.regulations using gin(sectors);

------------------------------------------------------------
-- VIEWS
------------------------------------------------------------

create or replace view public.vw_pending_documents as

select

id,

title,

published_at,

processing_status

from public.source_documents

where processing_status='pending'

order by published_at desc;

create or replace view public.vw_latest_regulations as

select

title,

urgency,

effective_date,

status,

created_at

from public.regulations

order by created_at desc;
