-- Sync client_profiles columns
alter table public.client_profiles
add column if not exists contact_phone text,
add column if not exists has_completed_onboarding boolean default false,
add column if not exists onboarding_completed_at timestamp with time zone;
