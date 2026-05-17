
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
('Digital Systems', '01 — Launch System', 'Starting From ₹8,000', '$100', 'Startups, creators, local businesses, personal brands, and early-stage companies launching online professionally.', '3–5 Days', 'Launch a professional digital presence that builds trust and converts visitors into leads.', '["Premium modern website", "Mobile responsive design", "5–8 custom pages", "Lead capture forms", "WhatsApp integration", "Booking/contact system", "Basic SEO setup", "Performance optimization", "Analytics integration", "Fast deployment"]', 'Launch My Website System', false, 10),

('Digital Systems', '02 — Growth System', 'Starting From ₹25,000', '$300', 'Businesses that want automated lead generation and higher conversions.', '5–10 Days', 'Turn your website into a 24/7 lead generation engine.', '["High-converting landing pages", "AI chatbot integration", "CRM integration", "Automated lead capture", "Email automation workflows", "Conversion tracking", "Meta ads funnel pages", "Google ads funnel setup", "Lead dashboard", "Marketing automation"]', 'Build My Growth System', true, 20),

('Digital Systems', '03 — AI Business System', 'Starting From ₹80,000', '$1,000', 'Businesses wanting to automate operations using AI workflows and intelligent systems.', '2–4 Weeks', 'Replace repetitive manual work with intelligent AI systems that scale operations.', '["AI customer support assistant", "Workflow automation", "Internal business dashboard", "CRM + automation setup", "AI follow-up system", "Custom business workflows", "Team management panel", "AI-powered operations", "Analytics & reporting", "Custom integrations"]', 'Automate My Business', false, 30),

('Digital Systems', '04 — SaaS MVP System', 'Starting From ₹50,000', '$650', 'Founders building AI startups, SaaS products, or internal platforms.', '2–6 Weeks', 'Launch your scalable SaaS product in days instead of months.', '["Premium SaaS UI/UX", "Authentication system", "User dashboard", "Admin dashboard", "AI integration", "Subscription/payment setup", "Supabase backend", "Database architecture", "API integrations", "Deployment & launch"]', 'Build My SaaS Product', false, 40);
