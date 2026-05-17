-- Create roles_admin table
create table if not exists public.roles_admin (
    id uuid default gen_random_uuid() primary key,
    admin_id uuid references auth.users not null unique,
    email text not null,
    role text default 'admin'
);

-- Enable RLS
alter table public.roles_admin enable row level security;

-- Policies
create policy "Admins can view all roles." on roles_admin
  for select using (
    exists (
      select 1 from client_profiles
      where client_profiles.id = auth.uid() and client_profiles.role = 'admin'
    )
  );

create policy "Allow upsert for admin setup." on roles_admin
  for all using (true) with check (true);
