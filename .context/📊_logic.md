# 📊 Logic

## Database Schema (PostgreSQL/Supabase)
- **`profiles` table**: Extends Auth.users. Stores company and contact details.
    - `id` (UUID, primary key)
    - `full_name` (text)
    - `company_name` (text)
    - `role` (enum: 'admin', 'client')
- **`service_requests` table**: Leads and initial project inquiries.
    - `id` (UUID, primary key)
    - `client_id` (foreign key to profiles.id)
    - `service_type` (text)
    - `description` (text)
    - `status` (text)
- **`projects` table**: Active and completed work.
    - `id` (UUID, primary key)
    - `client_id` (foreign key to profiles.id)
    - `title` (text)
    - `status` (text)
    - `progress` (integer)
- **`invoices` table**: Billing data linked to projects and clients.
    - `id` (UUID, primary key)
    - `project_id` (foreign key to projects.id)
    - `client_id` (foreign key to profiles.id)
    - `amount` (numeric)
    - `status` (text)
    - `due_date` (timestamp)

## Workflow Logic
- **Authentication:** Managed via `src/supabase/provider.tsx` and Supabase Auth.
- **Server Actions:** All mutations and side effects (like sending emails or DB updates) are handled via Server Actions using the Supabase Server Client.
- **Security:** Row Level Security (RLS) policies are used to restrict data access. Data validation is strictly enforced with Zod before processing.
- **Billing:** Professional HTML/A4 invoices generated from relational database records.
