
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';

const ADMIN_EMAIL = "deepakbagada25@gmail.com";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();
    
    useEffect(() => {
        if (loading) return;

        const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin-login';
        const isClientRoute = pathname.startsWith('/client');
        const isAuthRoute = ['/login', '/register', '/admin-login'].includes(pathname);

        if (!user) {
            if (isAdminRoute) {
                router.replace('/admin-login');
            } else if (isClientRoute) {
                router.replace('/login');
            }
        } else {
            const isAdminUser = user.email?.toLowerCase() === ADMIN_EMAIL;
            if (isAuthRoute) {
                router.replace(isAdminUser ? '/admin/dashboard' : '/client/dashboard');
            } else if (isAdminRoute && !isAdminUser) {
                router.replace('/client/dashboard');
            } else if (isClientRoute && isAdminUser) {
                router.replace('/admin/dashboard');
            }
        }
    }, [user, loading, pathname, router]);

    // Immediately render children to match server render.
    // The useEffect hook will handle redirects after hydration.
    return <>{children}</>;
}
