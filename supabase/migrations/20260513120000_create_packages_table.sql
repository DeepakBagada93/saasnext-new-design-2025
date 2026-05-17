
-- Migration to create pricing packages table

CREATE TABLE IF NOT EXISTS public.packages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    category text NOT NULL,
    title text NOT NULL,
    price text NOT NULL,
    price_usd text NOT NULL,
    description text NOT NULL,
    features jsonb NOT NULL DEFAULT '[]'::jsonb,
    cta text NOT NULL,
    popular boolean DEFAULT false,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Packages are viewable by everyone." ON public.packages
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage packages." ON public.packages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM client_profiles
      WHERE client_profiles.id = auth.uid() AND client_profiles.role = 'admin'
    )
  );

-- Seed Initial Data from src/lib/data.ts
INSERT INTO public.packages (category, title, price, price_usd, description, features, cta, popular, sort_order) VALUES
('AI Agent Development', 'Starter', '₹10,000 – ₹20,000', '$1,200 - $2,500', 'Automate basic customer support.', '["Basic FAQ agent (trained on your data)", "Website embedding", "24/7 automated responses", "Simple lead capture"]', 'Get Started', false, 10),
('AI Agent Development', 'Growth', '₹25,000 – ₹45,000', '$3,000 - $5,500', 'For lead qualification and booking.', '["Advanced conversational agents", "CRM integration (HubSpot, Zoho)", "Email notification workflows"]', 'Choose Growth Plan', true, 20),
('AI Agent Development', 'Pro', '₹50,000+', '$5,000+', 'Custom end-to-end automation.', '["Custom LLM solutions", "Multi-agent systems", "Voice capabilities", "API integrations for full automation", "Detailed conversation analytics"]', 'Contact Sales', false, 30),

('Web Development', '3-Day Launch Website', '₹5,000 – ₹15,000', '$60 - $180', 'Affordable rapid-launch package for Indian startups & local businesses', '["5–8 professionally designed pages", "Fully responsive modern UI/UX", "Live deployment included", "Domain & hosting setup", "Contact forms & WhatsApp integration", "7 days post-launch support"]', 'Launch in 3 Days', false, 40),
('Web Development', 'Starter Site', '₹19,999 – ₹49,999', '$250 - $600', 'Launch your business online with a modern, professional website.', '["1–5 premium pages", "Mobile-first responsive design", "Fast loading performance", "Contact form integration", "Security setup + backups", "1 month support included"]', 'Get Your Website', false, 50),
('Web Development', 'Growth Website System', '₹69,999 – ₹1,29,999', '$850 - $1,600', 'Designed to generate leads, bookings, and conversions.', '["5–15 custom-designed pages", "Advanced speed optimization", "SEO-ready architecture", "Lead capture & conversion sections", "Blog or CMS integration", "Priority support & updates"]', 'Choose Growth Plan', true, 60),
('Web Development', 'Pro Digital Platform', '₹1,50,000 – ₹3,00,000+', '$1,800 - $3,600+', 'Custom web apps, portals, and complex e-commerce platforms.', '["Unlimited pages / Custom App", "React/Next.js modern tech stack", "Advanced animations & 3D (WebGL)", "Custom API & database integrations", "E-commerce & payment gateways", "Dedicated account manager"]', 'Contact Sales', false, 70),

('Digital Marketing & Social Media', 'Local Dominance (Starter)', '₹14,999 /mo', '$200 /mo', 'Establish your brand locally.', '["15 Custom Social Media Posts", "Google My Business Optimization", "Basic Local SEO", "Monthly Performance Report"]', 'Get Started', false, 80),
('Digital Marketing & Social Media', 'Growth Engine', '₹29,999 /mo', '$400 /mo', 'Aggressive growth across multiple channels.', '["25 Custom Posts + 4 Reels/Shorts", "Advanced SEO (On-page & Off-page)", "Meta Ads Management (Ad spend extra)", "Lead Generation Funnels"]', 'Choose Growth Plan', true, 90),
('Digital Marketing & Social Media', 'Market Leader (Pro)', '₹59,999+ /mo', '$800+ /mo', 'Comprehensive digital takeover.', '["Daily Posts + 8 Reels/Video content", "Full-funnel Ad Management (Google & Meta)", "Dedicated SEO Strategy & PR", "Conversion Rate Optimization (CRO)", "Priority 24/7 Support"]', 'Contact Sales', false, 100),

('Bundled Packages', 'The "Zero to One" Startup Bundle', '₹49,999 (One-time) + ₹14,999/mo', '$600 + $200/mo', 'Everything you need to launch and start selling.', '["Starter Website (5 Pages)", "Brand Identity Kit (Logo, Colors, Fonts)", "Local Dominance Marketing (Month 1 included)", "Basic AI Lead Capture Bot"]', 'Launch Your Startup', false, 110),
('Bundled Packages', 'The Scaling Agency Bundle', 'Custom Quote', 'Custom Quote', 'Full digital transformation for established businesses.', '["Growth Website Redesign", "Custom AI Appointment Setter", "Growth Engine Marketing Plan", "CRM Setup & Automation"]', 'Request Quote', true, 120);
