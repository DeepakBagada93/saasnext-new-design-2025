-- 1. Ensure client_profiles table is fully prepared
alter table public.client_profiles
add column if not exists contact_name text,
add column if not exists has_completed_onboarding boolean default false,
add column if not exists onboarding_data jsonb default '{}'::jsonb;

-- 2. Fix RLS policies for registration/onboarding
-- Drop existing to ensure a clean slate
drop policy if exists "Users can insert their own profile." on client_profiles;
drop policy if exists "Users can update own profile." on client_profiles;

-- Allow authenticated users to insert their own profile (crucial for registration)
create policy "Users can insert their own profile." on client_profiles
  for insert with check (auth.uid() = id);

-- Allow authenticated users to update their own profile (crucial for onboarding)
create policy "Users can update own profile." on client_profiles
  for update using (auth.uid() = id);

-- 3. Fix service_requests policies
drop policy if exists "Clients can insert their own requests." on service_requests;
create policy "Clients can insert their own requests." on service_requests
  for insert with check (auth.uid() = client_id);

-- 4. Function to ensure profile exists on signup (Database-side safety)
-- This ensures that even if the frontend call fails or is cancelled, a profile record is created.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.client_profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'client')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;
