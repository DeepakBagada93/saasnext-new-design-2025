-- Create meeting_requests table
create table if not exists public.meeting_requests (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    client_id uuid references auth.users,
    client_name text,
    client_email text,
    topic text,
    preferred_date date,
    preferred_time text,
    status text default 'Pending' check (status in ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    notes text
);

-- Enable RLS
alter table public.meeting_requests enable row level security;

-- Policies
create policy "Admins can view all meeting requests." on meeting_requests
  for select using (
    exists (
      select 1 from client_profiles
      where client_profiles.id = auth.uid() and client_profiles.role = 'admin'
    )
  );

create policy "Admins can update meeting requests." on meeting_requests
  for update using (
    exists (
      select 1 from client_profiles
      where client_profiles.id = auth.uid() and client_profiles.role = 'admin'
    )
  );

create policy "Users can view their own meeting requests." on meeting_requests
  for select using (auth.uid() = client_id);

create policy "Users can insert their own meeting requests." on meeting_requests
  for insert with check (auth.uid() = client_id);
