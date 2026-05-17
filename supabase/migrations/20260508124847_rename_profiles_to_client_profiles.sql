-- Rename profiles to client_profiles
alter table public.profiles rename to client_profiles;

-- Update the handle_new_user function to use the new table name
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.client_profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'client')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Update policies to use the new table name
drop policy if exists "Public profiles are viewable by everyone." on client_profiles;
create policy "Public profiles are viewable by everyone." on client_profiles
  for select using (true);

drop policy if exists "Users can insert their own profile." on client_profiles;
create policy "Users can insert their own profile." on client_profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile." on client_profiles;
create policy "Users can update own profile." on client_profiles
  for update using (auth.uid() = id);

-- Update dependent policies that referenced 'profiles'
drop policy if exists "Admins can view all requests." on service_requests;
create policy "Admins can view all requests." on service_requests
  for select using (
    exists (
      select 1 from client_profiles
      where client_profiles.id = auth.uid() and client_profiles.role = 'admin'
    )
  );

drop policy if exists "Admins can manage all projects." on projects;
create policy "Admins can manage all projects." on projects
  for all using (
    exists (
      select 1 from client_profiles
      where client_profiles.id = auth.uid() and client_profiles.role = 'admin'
    )
  );
