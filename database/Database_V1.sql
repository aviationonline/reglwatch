-- ==========================================================
-- ReglWatch V1
-- Database Schema
-- Version : 1.0
-- ==========================================================

create extension if not exists pgcrypto;

-- ==========================================================
-- ENUMS
-- ==========================================================

do $$
begin

if not exists (
select 1 from pg_type where typname='regulation_status'
) then

create type regulation_status as enum
(
'draft',
'published',
'archived'
);

end if;

if not exists (
select 1 from pg_type where typname='document_status'
) then

create type document_status as enum
(
'pending',
'processing',
'processed',
'error'
);

end if;

if not exists (
select 1 from pg_type where typname='severity_level'
) then

create type severity_level as enum
(
'info',
'low',
'medium',
'high',
'critical'
);

end if;

end$$;

-- ==========================================================
-- SOURCES
-- ==========================================================

create table if not exists sources
(

id uuid primary key default gen_random_uuid(),

code text not null unique,

name text not null,

url text not null,

enabled boolean default true,

collector text not null,

frequency_minutes integer default 60,

last_run timestamptz,

created_at timestamptz default now(),

updated_at timestamptz default now()

);

create index if not exists idx_sources_enabled
on sources(enabled);

-- ==========================================================
-- RAW DOCUMENTS
-- ==========================================================

create table if not exists source_documents
(

id uuid primary key default gen_random_uuid(),

source_id uuid references sources(id),

external_id text,

title text not null,

source_name text,

source_url text,

published_at timestamptz,

content text not null,

sha256 text not null unique,

processed boolean default false,

processing_status document_status default 'pending',

processed_at timestamptz,

last_error text,

created_at timestamptz default now(),

updated_at timestamptz default now()

);

create index if not exists idx_documents_status
on source_documents(processing_status);

create index if not exists idx_documents_processed
on source_documents(processed);

create index if not exists idx_documents_sha
on source_documents(sha256);

-- ==========================================================
-- REGULATIONS
-- ==========================================================

create table if not exists regulations
(

id uuid primary key default gen_random_uuid(),

document_id uuid
references source_documents(id)
on delete cascade,

title text not null,

summary text,

ai_summary text,

official_reference text,

official_url text,

effective_date date,

severity severity_level default 'medium',

status regulation_status default 'published',

confidence numeric(5,2),

created_at timestamptz default now(),

updated_at timestamptz default now()

);

create index if not exists idx_regulations_status
on regulations(status);

create index if not exists idx_regulations_severity
on regulations(severity);

-- ==========================================================
-- COMPANY PROFILES
-- ==========================================================

create table if not exists companies
(

id uuid primary key default gen_random_uuid(),

user_id uuid,

name text not null,

legal_form text,

siret text,

naf_code text,

vat_number text,

employees integer,

turnover numeric,

country text default 'France',

region text,

department text,

city text,

collective_agreement text,

created_at timestamptz default now(),

updated_at timestamptz default now()

);

create index if not exists idx_company_naf
on companies(naf_code);

-- ==========================================================
-- COMPANY TAGS
-- ==========================================================

create table if not exists company_tags
(

id uuid primary key default gen_random_uuid(),

company_id uuid
references companies(id)
on delete cascade,

tag text not null,

created_at timestamptz default now()

);

create index if not exists idx_company_tags
on company_tags(company_id);

create index if not exists idx_company_tag
on company_tags(tag);

-- ==========================================================
-- REGULATION SECTORS
-- ==========================================================

create table if not exists regulation_sectors
(

id uuid primary key default gen_random_uuid(),

regulation_id uuid
references regulations(id)
on delete cascade,

naf_code text,

tag text

);

create index if not exists idx_reg_sector_reg
on regulation_sectors(regulation_id);

create index if not exists idx_reg_sector_naf
on regulation_sectors(naf_code);

-- ==========================================================
-- OBLIGATIONS
-- ==========================================================

create table if not exists obligations
(

id uuid primary key default gen_random_uuid(),

regulation_id uuid
references regulations(id)
on delete cascade,

title text not null,

description text,

deadline_days integer,

estimated_minutes integer,

risk_level severity_level default 'medium',

legal_reference text,

created_at timestamptz default now(),

updated_at timestamptz default now()

);

create index if not exists idx_obligation_reg
on obligations(regulation_id);

create index if not exists idx_obligation_risk
on obligations(risk_level);

-- ==========================================================
-- COMPANY OBLIGATIONS
-- ==========================================================

create table if not exists company_obligations
(

id uuid primary key default gen_random_uuid(),

company_id uuid
references companies(id)
on delete cascade,

obligation_id uuid
references obligations(id)
on delete cascade,

status text default 'todo',

due_date date,

completed_at timestamptz,

score numeric(5,2),

explanation text,

created_at timestamptz default now(),

updated_at timestamptz default now(),

unique(company_id,obligation_id)

);

create index if not exists idx_company_obligation
on company_obligations(company_id);

create index if not exists idx_company_status
on company_obligations(status);

-- ==========================================================
-- ALERTS
-- ==========================================================

create table if not exists alerts
(

id uuid primary key default gen_random_uuid(),

company_id uuid
references companies(id)
on delete cascade,

regulation_id uuid
references regulations(id)
on delete cascade,

obligation_id uuid
references obligations(id)
on delete cascade,

severity severity_level default 'medium',

title text not null,

message text,

read boolean default false,

emailed boolean default false,

created_at timestamptz default now()

);

create index if not exists idx_alert_company
on alerts(company_id);

create index if not exists idx_alert_read
on alerts(read);

create index if not exists idx_alert_email
on alerts(emailed);

-- ==========================================================
-- AI RUNS
-- ==========================================================

create table if not exists ai_runs
(

id uuid primary key default gen_random_uuid(),

document_id uuid
references source_documents(id)
on delete cascade,

model text,

prompt_version text,

tokens_input integer,

tokens_output integer,

duration_ms integer,

success boolean default true,

error_message text,

created_at timestamptz default now()

);

create index if not exists idx_ai_document
on ai_runs(document_id);

-- ==========================================================
-- WORKFLOW LOGS
-- ==========================================================

create table if not exists workflow_logs
(

id uuid primary key default gen_random_uuid(),

workflow text,

step text,

status text,

message text,

payload jsonb,

created_at timestamptz default now()

);

create index if not exists idx_workflow_status
on workflow_logs(status);

-- ==========================================================
-- AUDIT LOGS
-- ==========================================================

create table if not exists audit_logs
(

id uuid primary key default gen_random_uuid(),

entity text,

entity_id uuid,

action text,

user_id uuid,

details jsonb,

created_at timestamptz default now()

);

create index if not exists idx_audit_entity
on audit_logs(entity);

-- ==========================================================
-- EMAIL QUEUE
-- ==========================================================

create table if not exists email_queue
(

id uuid primary key default gen_random_uuid(),

company_id uuid
references companies(id)
on delete cascade,

recipient text,

subject text,

body text,

status text default 'pending',

attempts integer default 0,

last_attempt timestamptz,

sent_at timestamptz,

created_at timestamptz default now()

);

create index if not exists idx_email_status
on email_queue(status);

-- ==========================================================
-- SYSTEM SETTINGS
-- ==========================================================

create table if not exists settings
(

key text primary key,

value jsonb,

updated_at timestamptz default now()

);

insert into settings(key,value)

values

('database_version','{"version":"1.0"}')

on conflict(key) do nothing;

-- ==========================================================
-- UPDATED_AT TRIGGER
-- ==========================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as
$$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger trg_sources_updated_at
before update on sources
for each row
execute function set_updated_at();

create trigger trg_source_documents_updated_at
before update on source_documents
for each row
execute function set_updated_at();

create trigger trg_regulations_updated_at
before update on regulations
for each row
execute function set_updated_at();

create trigger trg_companies_updated_at
before update on companies
for each row
execute function set_updated_at();

create trigger trg_obligations_updated_at
before update on obligations
for each row
execute function set_updated_at();

create trigger trg_company_obligations_updated_at
before update on company_obligations
for each row
execute function set_updated_at();

-- ==========================================================
-- DASHBOARD VIEWS
-- ==========================================================

create or replace view vw_dashboard as

select

    (select count(*) from source_documents) as documents,

    (select count(*) from source_documents where processed=false) as pending,

    (select count(*) from source_documents where processed=true) as processed,

    (select count(*) from regulations) as regulations,

    (select count(*) from obligations) as obligations,

    (select count(*) from alerts where read=false) as unread_alerts;

create or replace view vw_pending_documents as

select

id,
title,
source_name,
published_at,
processing_status,
created_at

from source_documents

where processed=false

order by created_at;

create or replace view vw_company_alerts as

select

a.id,

c.name company,

a.title,

a.message,

a.severity,

a.read,

a.created_at

from alerts a

join companies c

on c.id=a.company_id

order by a.created_at desc;

-- ==========================================================
-- INITIAL SOURCES
-- ==========================================================

insert into sources
(
code,
name,
url,
collector,
frequency_minutes
)

values

(
'LEGIFRANCE',
'Légifrance',
'https://piste.gouv.fr',
'legifrance',
60
),

(
'JORF',
'Journal Officiel',
'https://www.legifrance.gouv.fr',
'jorf',
60
),

(
'URSSAF',
'URSSAF',
'https://www.urssaf.fr',
'urssaf',
360
),

(
'BOFIP',
'BOFiP',
'https://bofip.impots.gouv.fr',
'bofip',
720
),

(
'TRAVAIL',
'Ministère du Travail',
'https://travail-emploi.gouv.fr',
'travail',
360
)

on conflict(code)

do nothing;

-- ==========================================================
-- END OF DATABASE V1
-- ==========================================================
