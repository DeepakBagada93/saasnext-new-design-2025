-- Align Supabase schema with the migrated Next.js portal code.

alter table public.client_profiles
add column if not exists full_name text,
add column if not exists avatar_url text,
add column if not exists role text default 'client',
add column if not exists contact_name text,
add column if not exists contact_phone text,
add column if not exists has_completed_onboarding boolean default false,
add column if not exists onboarding_completed_at timestamp with time zone,
add column if not exists onboarding_data jsonb default '{}'::jsonb;

alter table public.service_requests
add column if not exists client_email text,
add column if not exists client_name text,
add column if not exists type text,
add column if not exists budget numeric,
add column if not exists currency text default 'INR',
add column if not exists metadata jsonb default '{}'::jsonb,
add column if not exists website_type text,
add column if not exists ai_requirements text,
add column if not exists company_name text,
add column if not exists website_url text,
add column if not exists contact_number text,
add column if not exists whatsapp_number text;

alter table public.projects
add column if not exists name text,
add column if not exists milestones jsonb default '[]'::jsonb,
add column if not exists updates jsonb default '[]'::jsonb,
add column if not exists budget numeric,
add column if not exists currency text default 'INR',
add column if not exists quick_call_number text,
add column if not exists whatsapp_link text,
add column if not exists notion_link text,
add column if not exists google_doc_link text;

update public.projects
set name = title
where name is null and title is not null;

alter table public.invoices
add column if not exists items jsonb default '[]'::jsonb,
add column if not exists upi_id text,
add column if not exists client_name text;

alter table public.roles_admin
add column if not exists created_at timestamp with time zone default timezone('utc'::text, now());

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.client_profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'client')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;
