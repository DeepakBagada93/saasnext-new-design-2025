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
);

-- Set role to admin in profiles
update public.profiles 
set role = 'admin' 
where id = 'ae0bb9b6-2a1f-43c6-af8d-ea685f5948e0';

-- Seed Initial Data from price.md
INSERT INTO public.packages (category, title, price, price_usd, description, timeline, outcome, features, cta, popular, sort_order) VALUES
('AI Business OS', '01 — Starter AI OS', 'Starting From ₹9,999', '$299', 'Perfect for small businesses and professionals looking to automate their basic operations and lead capture with AI.', '3–5 Days', 'Establish a smart digital foundation that captures leads and automates basic customer interactions.', '["Core AI OS Foundation", "Premium Web Interface", "AI Lead Capture System", "WhatsApp Integration (Basic)", "Unified OS Dashboard", "Secure Cloud Hosting", "24/7 System Monitoring", "Basic AI Chatbot", "Google My Business AI", "Essential SEO/AEO"]', 'Initialize Starter OS', false, 10),
('AI Business OS', '02 — Growth AI OS', 'Starting From ₹24,999', '$699', 'Designed for scaling businesses that need advanced AI assistants, workflow automation, and a full growth engine.', '7–14 Days', 'Transform your business into a 24/7 autonomous operation that generates and nurtures opportunities.', '["Everything in Starter", "Advanced AI Assistants", "Full Workflow Automation", "Appointment Booking System", "AI Content Engine", "Advanced CRM Module", "AEO/SEO Growth Pack", "Automated Email Marketing", "Conversion Engine", "Performance Analytics"]', 'Upgrade to Growth OS', true, 20),
('AI Business OS', '03 — Enterprise AI OS', 'Starting From ₹49,999', '$1,499', 'The ultimate AI Operating System for established companies requiring custom AI employees and deep system integrations.', '2–4 Weeks', 'A fully custom AI-powered business ecosystem that handles complex workflows and high-volume operations.', '["Everything in Growth", "Custom AI Employees", "Voice AI Integration", "Multi-channel AI OS", "Dedicated Account Manager", "Priority Support & Updates", "Custom Security Protocols", "Client Management OS", "Advanced API Access", "Scalable Enterprise Infra"]', 'Deploy Enterprise OS', false, 30);
