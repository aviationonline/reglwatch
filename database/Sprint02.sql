-- =====================================================
-- ReglWatch MVP
-- Sprint 2
-- Base de données V1
-- =====================================================

create extension if not exists pgcrypto;

---------------------------------------------------------
-- SOURCES
---------------------------------------------------------

create table if not exists sources (

    id uuid primary key default gen_random_uuid(),

    name text not null,

    connector text not null,

    url text not null,

    enabled boolean default true,

    frequency_minutes integer default 60,

    created_at timestamptz default now()

);

---------------------------------------------------------
-- DOCUMENTS SOURCES
---------------------------------------------------------

create table if not exists source_documents (

    id uuid primary key default gen_random_uuid(),

    source_id uuid references sources(id) on delete cascade,

    external_id text,

    title text,

    url text,

    published_at timestamptz,

    content text,

    raw_payload jsonb,

    content_hash text unique,

    processing_status text default 'pending',

    error_message text,

    created_at timestamptz default now()

);

---------------------------------------------------------
-- REGULATIONS
---------------------------------------------------------

create table if not exists regulations (

    id uuid primary key default gen_random_uuid(),

    document_id uuid references source_documents(id) on delete cascade,

    title text not null,

    summary text,

    category text,

    sectors text[],

    urgency text default 'medium',

    effective_date date,

    ai_summary text,

    ai_actions jsonb,

    ai_confidence numeric(4,3),

    status text default 'published',

    created_at timestamptz default now()

);

---------------------------------------------------------
-- INDEX
---------------------------------------------------------

create index if not exists idx_documents_hash
on source_documents(content_hash);

create index if not exists idx_documents_status
on source_documents(processing_status);

create index if not exists idx_documents_published
on source_documents(published_at);

create index if not exists idx_regulations_status
on regulations(status);

create index if not exists idx_regulations_urgency
on regulations(urgency);

create index if not exists idx_regulations_effective_date
on regulations(effective_date);

create index if not exists idx_regulations_sectors
on regulations using gin(sectors);

---------------------------------------------------------
-- VUES
---------------------------------------------------------

create or replace view vw_pending_documents as

select
    id,
    title,
    published_at,
    processing_status
from source_documents
where processing_status='pending'
order by published_at desc;

create or replace view vw_latest_regulations as

select
    title,
    urgency,
    effective_date,
    created_at
from regulations
order by created_at desc;
