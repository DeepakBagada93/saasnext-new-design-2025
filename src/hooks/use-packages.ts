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
        category: 'AI Business OS',
        title: '01 — Starter AI OS',
        price: 'Starting From ₹9,999',
        price_usd: '$299',
        description: 'Perfect for small businesses and professionals looking to automate their basic operations and lead capture with AI.',
        timeline: '3–5 Days',
        outcome: 'Establish a smart digital foundation that captures leads and automates basic customer interactions.',
        features: ["Core AI OS Foundation", "Premium Web Interface", "AI Lead Capture System", "WhatsApp Integration (Basic)", "Unified OS Dashboard", "Secure Cloud Hosting", "24/7 System Monitoring", "Basic AI Chatbot", "Google My Business AI", "Essential SEO/AEO"],
        cta: 'Initialize Starter OS',
        popular: false,
        sort_order: 10
    },
    {
        id: '2',
        category: 'AI Business OS',
        title: '02 — Growth AI OS',
        price: 'Starting From ₹24,999',
        price_usd: '$699',
        description: 'Designed for scaling businesses that need advanced AI assistants, workflow automation, and a full growth engine.',
        timeline: '7–14 Days',
        outcome: 'Transform your business into a 24/7 autonomous operation that generates and nurtures opportunities.',
        features: ["Everything in Starter", "Advanced AI Assistants", "Full Workflow Automation", "Appointment Booking System", "AI Content Engine", "Advanced CRM Module", "AEO/SEO Growth Pack", "Automated Email Marketing", "Conversion Engine", "Performance Analytics"],
        cta: 'Upgrade to Growth OS',
        popular: true,
        sort_order: 20
    },
    {
        id: '3',
        category: 'AI Business OS',
        title: '03 — Enterprise AI OS',
        price: 'Starting From ₹49,999',
        price_usd: '$1,499',
        description: 'The ultimate AI Operating System for established companies requiring custom AI employees and deep system integrations.',
        timeline: '2–4 Weeks',
        outcome: 'A fully custom AI-powered business ecosystem that handles complex workflows and high-volume operations.',
        features: ["Everything in Growth", "Custom AI Employees", "Voice AI Integration", "Multi-channel AI OS", "Dedicated Account Manager", "Priority Support & Updates", "Custom Security Protocols", "Client Management OS", "Advanced API Access", "Scalable Enterprise Infra"],
        cta: 'Deploy Enterprise OS',
        popular: false,
        sort_order: 30
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
