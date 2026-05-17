-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  company_name text,
  avatar_url text,
  role text check (role in ('admin', 'client')) default 'client'
);

-- Set up Realtime
-- Use a DO block to avoid error if already exists
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'profiles') then
    alter publication supabase_realtime add table profiles;
  end if;
end $$;

-- Create service_requests table
create table if not exists service_requests (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  client_id uuid references auth.users not null,
  service_type text not null,
  description text,
  status text default 'pending' not null,
  metadata jsonb default '{}'::jsonb
);

-- Create projects table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  client_id uuid references auth.users not null,
  title text not null,
  description text,
  status text default 'active' not null,
  progress integer default 0,
  start_date date,
  end_date date
);

-- Create invoices table
create table if not exists invoices (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_id uuid references projects on delete cascade,
  client_id uuid references auth.users not null,
  amount numeric not null,
  currency text default 'USD' not null,
  status text default 'unpaid' not null,
  due_date timestamp with time zone
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table service_requests enable row level security;
alter table projects enable row level security;
alter table invoices enable row level security;

-- Profiles policies
-- Drop if exists and recreate to avoid name conflicts
drop policy if exists "Public profiles are viewable by everyone." on profiles;
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

drop policy if exists "Users can insert their own profile." on profiles;
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile." on profiles;
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Service Requests policies
drop policy if exists "Clients can view their own requests." on service_requests;
create policy "Clients can view their own requests." on service_requests
  for select using (auth.uid() = client_id);

drop policy if exists "Admins can view all requests." on service_requests;
create policy "Admins can view all requests." on service_requests
  for select using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

drop policy if exists "Clients can insert their own requests." on service_requests;
create policy "Clients can insert their own requests." on service_requests
  for insert with check (auth.uid() = client_id);

-- Projects policies
drop policy if exists "Clients can view their own projects." on projects;
create policy "Clients can view their own projects." on projects
  for select using (auth.uid() = client_id);

drop policy if exists "Admins can manage all projects." on projects;
create policy "Admins can manage all projects." on projects
  for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'client')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
-- Create admin user
-- CEO Account
insert into auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, confirmation_token, email_change, email_change_token_new, recovery_token)
values (
    'ae0bb9b6-2a1f-43c6-af8d-ea685f5948e0', -- Using the ID from your logs
    'ceo@saasnext.in',
    crypt('password-saasnext@3093', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"CEO SaaSNext"}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    '',
    ''
)
on conflict (id) do update 
set 
    email = excluded.email,
    encrypted_password = excluded.encrypted_password,
    raw_user_meta_data = excluded.raw_user_meta_data;

-- Ensure the profile exists and set role to admin
insert into public.profiles (id, role, full_name)
values ('ae0bb9b6-2a1f-43c6-af8d-ea685f5948e0', 'admin', 'CEO SaaSNext')
on conflict (id) do update
set role = 'admin', full_name = 'CEO SaaSNext';
