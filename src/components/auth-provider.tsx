
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { AppLayout } from './app-layout';

const ADMIN_EMAIL = "deepakbagada25@gmail.com";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin-login';
    const isClientRoute = pathname.startsWith('/client');
    const isAuthRoute = ['/login', '/register', '/admin-login'].includes(pathname);

    useEffect(() => {
        if (!loading && isMounted) {
            if (isAdminRoute && (!user || user.email?.toLowerCase() !== ADMIN_EMAIL)) {
                router.replace('/admin-login');
            } 
            else if (isClientRoute && !user) {
                router.replace('/login');
            }
        }
    }, [user, loading, isAdminRoute, isClientRoute, router, pathname, isMounted]);

    if (!isMounted) {
        // On the server and initial client render, render the public layout shell
        // to avoid hydration mismatch. The actual content will be protected by the useEffect.
        return <AppLayout layout="public">{children}</AppLayout>;
    }
    
    if (loading && (isAdminRoute || isClientRoute)) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
    
    let layout: 'public' | 'admin' | 'client' | 'auth' = 'public';
    if (isAdminRoute) {
        layout = 'admin';
    } else if (isClientRoute) {
        layout = 'client';
    } else if (isAuthRoute) {
        layout = 'auth';
    }

    return <AppLayout layout={layout}>{children}</AppLayout>;
}
