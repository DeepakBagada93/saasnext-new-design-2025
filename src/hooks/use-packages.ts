import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';

export type Package = {
    id: string;
    category: string;
    title: string;
    price: string;
    price_usd: string;
    description: string;
    timeline: string;
    outcome: string;
    features: string[];
    cta: string;
    popular: boolean;
    sort_order: number;
};

export type GroupedPricingPlan = {
    category: string;
    plans: Package[];
};

export const FALLBACK_PACKAGES: Package[] = [
    {
        id: '1',
        category: 'Digital Systems',
        title: '01 — Launch System',
        price: 'Starting From ₹8,000',
        price_usd: '$100',
        description: 'Startups, creators, local businesses, personal brands, and early-stage companies launching online professionally.',
        timeline: '3–5 Days',
        outcome: 'Launch a professional digital presence that builds trust and converts visitors into leads.',
        features: ["Premium modern website", "Mobile responsive design", "5–8 custom pages", "Lead capture forms", "WhatsApp integration", "Booking/contact system", "Basic SEO setup", "Performance optimization", "Analytics integration", "Fast deployment"],
        cta: 'Launch My Website System',
        popular: false,
        sort_order: 10
    },
    {
        id: '2',
        category: 'Digital Systems',
        title: '02 — Growth System',
        price: 'Starting From ₹25,000',
        price_usd: '$300',
        description: 'Businesses that want automated lead generation and higher conversions.',
        timeline: '5–10 Days',
        outcome: 'Turn your website into a 24/7 lead generation engine.',
        features: ["High-converting landing pages", "AI chatbot integration", "CRM integration", "Automated lead capture", "Email automation workflows", "Conversion tracking", "Meta ads funnel pages", "Google ads funnel setup", "Lead dashboard", "Marketing automation"],
        cta: 'Build My Growth System',
        popular: true,
        sort_order: 20
    },
    {
        id: '3',
        category: 'Digital Systems',
        title: '03 — AI Business System',
        price: 'Starting From ₹80,000',
        price_usd: '$1,000',
        description: 'Businesses wanting to automate operations using AI workflows and intelligent systems.',
        timeline: '2–4 Weeks',
        outcome: 'Replace repetitive manual work with intelligent AI systems that scale operations.',
        features: ["AI customer support assistant", "Workflow automation", "Internal business dashboard", "CRM + automation setup", "AI follow-up system", "Custom business workflows", "Team management panel", "AI-powered operations", "Analytics & reporting", "Custom integrations"],
        cta: 'Automate My Business',
        popular: false,
        sort_order: 30
    },
    {
        id: '4',
        category: 'Digital Systems',
        title: '04 — SaaS MVP System',
        price: 'Starting From ₹50,000',
        price_usd: '$650',
        description: 'Founders building AI startups, SaaS products, or internal platforms.',
        timeline: '2–6 Weeks',
        outcome: 'Launch your scalable SaaS product in days instead of months.',
        features: ["Premium SaaS UI/UX", "Authentication system", "User dashboard", "Admin dashboard", "AI integration", "Subscription/payment setup", "Supabase backend", "Database architecture", "API integrations", "Deployment & launch"],
        cta: 'Build My SaaS Product',
        popular: false,
        sort_order: 40
    }
];

export function usePackages() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [groupedPlans, setGroupedPlans] = useState<GroupedPricingPlan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    const fetchPackages = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('packages')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) {
                throw error;
            }

            const packageData = data && data.length > 0 ? (data as Package[]) : FALLBACK_PACKAGES;
            setPackages(packageData);

            // Group by category
            const grouped: { [key: string]: Package[] } = {};
            packageData.forEach((pkg: Package) => {
                if (!grouped[pkg.category]) {
                    grouped[pkg.category] = [];
                }
                grouped[pkg.category].push(pkg);
            });

            const formattedGroups = Object.keys(grouped).map(category => ({
                category,
                plans: grouped[category]
            }));

            setGroupedPlans(formattedGroups);
        } catch (err: any) {
            console.error('Error fetching packages, using fallback:', err);
            
            // On error, use fallback
            setPackages(FALLBACK_PACKAGES);
            const grouped: { [key: string]: Package[] } = { 'Digital Systems': FALLBACK_PACKAGES };
            setGroupedPlans([{ category: 'Digital Systems', plans: FALLBACK_PACKAGES }]);
            
            setError(err.message || 'Failed to load packages from database');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    return { packages, groupedPlans, isLoading, error, refetch: fetchPackages };
}
