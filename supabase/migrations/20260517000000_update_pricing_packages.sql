
-- Migration to update pricing packages with the new "Systems" including Timeline and Outcome

-- Clear existing packages
DELETE FROM public.packages;

-- Add columns if they don't exist (they shouldn't since we are updating the schema conceptually)
-- Note: In a real production scenario, we'd use ALTER TABLE, but for this migration we ensure they exist.
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='packages' AND column_name='timeline') THEN
        ALTER TABLE public.packages ADD COLUMN timeline text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='packages' AND column_name='outcome') THEN
        ALTER TABLE public.packages ADD COLUMN outcome text;
    END IF;
END $$;

-- Insert the new 5 systems with full data from price.md
INSERT INTO public.packages (category, title, price, price_usd, description, timeline, outcome, features, cta, popular, sort_order) VALUES
('AI Business OS', '01 — Starter AI OS', 'Starting From ₹9,999', '$299', 'Perfect for small businesses and professionals looking to automate their basic operations and lead capture with AI.', '3–5 Days', 'Establish a smart digital foundation that captures leads and automates basic customer interactions.', '["Core AI OS Foundation", "Premium Web Interface", "AI Lead Capture System", "WhatsApp Integration (Basic)", "Unified OS Dashboard", "Secure Cloud Hosting", "24/7 System Monitoring", "Basic AI Chatbot", "Google My Business AI", "Essential SEO/AEO"]', 'Initialize Starter OS', false, 10),
('AI Business OS', '02 — Growth AI OS', 'Starting From ₹24,999', '$699', 'Designed for scaling businesses that need advanced AI assistants, workflow automation, and a full growth engine.', '7–14 Days', 'Transform your business into a 24/7 autonomous operation that generates and nurtures opportunities.', '["Everything in Starter", "Advanced AI Assistants", "Full Workflow Automation", "Appointment Booking System", "AI Content Engine", "Advanced CRM Module", "AEO/SEO Growth Pack", "Automated Email Marketing", "Conversion Engine", "Performance Analytics"]', 'Upgrade to Growth OS', true, 20),
('AI Business OS', '03 — Enterprise AI OS', 'Starting From ₹49,999', '$1,499', 'The ultimate AI Operating System for established companies requiring custom AI employees and deep system integrations.', '2–4 Weeks', 'A fully custom AI-powered business ecosystem that handles complex workflows and high-volume operations.', '["Everything in Growth", "Custom AI Employees", "Voice AI Integration", "Multi-channel AI OS", "Dedicated Account Manager", "Priority Support & Updates", "Custom Security Protocols", "Client Management OS", "Advanced API Access", "Scalable Enterprise Infra"]', 'Deploy Enterprise OS', false, 30);
