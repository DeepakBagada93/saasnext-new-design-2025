'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';

const ADMIN_EMAIL = "deepakbagada25@gmail.com";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();

    const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin-login';
    const isClientRoute = pathname.startsWith('/client');
    
    useEffect(() => {
        if (!loading) {
            // If it's an admin route, check for admin user
            if (isAdminRoute && (!user || user.email?.toLowerCase() !== ADMIN_EMAIL)) {
                router.replace('/admin-login');
            } 
            // If it's a client route, check for any user
            else if (isClientRoute && !user) {
                router.replace('/login');
            }
        }
    }, [user, loading, isAdminRoute, isClientRoute, router, pathname]);

    // Show a loading state only on protected routes while auth status is being checked
    if (loading && (isAdminRoute || isClientRoute)) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
    
    return <>{children}</>;
}
