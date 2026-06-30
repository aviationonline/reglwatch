create table if not exists public.ai_analysis (

    id uuid primary key default gen_random_uuid(),

    document_id uuid not null
        references public.source_documents(id)
        on delete cascade,

    model text not null,

    prompt_version text,

    raw_response jsonb not null,

    created_at timestamptz default now()

);

create index if not exists idx_ai_analysis_document
on public.ai_analysis(document_id);
