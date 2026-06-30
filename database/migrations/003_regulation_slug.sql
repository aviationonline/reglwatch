alter table public.regulations
add column if not exists slug text;

create unique index if not exists idx_regulation_slug
on public.regulations(slug);
