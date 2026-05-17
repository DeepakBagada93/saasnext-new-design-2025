-- Add milestones and updates columns to projects
alter table public.projects 
add column if not exists milestones jsonb default '[]'::jsonb,
add column if not exists updates jsonb default '[]'::jsonb,
add column if not exists budget numeric,
add column if not exists currency text default 'INR',
add column if not exists quick_call_number text,
add column if not exists whatsapp_link text,
add column if not exists notion_link text,
add column if not exists google_doc_link text;

-- Also update invoices table to have items as jsonb if not already there
-- (Checking initial_schema.sql, it didn't have items explicitly but the code used it)
alter table public.invoices
add column if not exists items jsonb default '[]'::jsonb,
add column if not exists upi_id text,
add column if not exists client_name text;
