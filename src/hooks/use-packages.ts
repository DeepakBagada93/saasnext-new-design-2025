import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';

export type Package = {
    id: string;
    category: string;
    title: string;
    price: string;
    price_usd: string;
    description: string;
    features: string[];
    cta: string;
    popular: boolean;
    sort_order: number;
};

export type GroupedPricingPlan = {
    category: string;
    plans: Package[];
};

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

            setPackages(data as Package[]);

            // Group by category
            const grouped: { [key: string]: Package[] } = {};
            data.forEach((pkg: Package) => {
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
            setError(err.message || 'Failed to load packages');
            console.error('Error fetching packages:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    return { packages, groupedPlans, isLoading, error, refetch: fetchPackages };
}
