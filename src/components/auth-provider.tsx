
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { AppLayout } from './app-layout';

const ADMIN_EMAIL = "deepakbagada25@gmail.com";

type LayoutType = 'public' | 'admin' | 'client' | 'auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const getLayoutType = (pathname: string): LayoutType => {
        if (pathname.startsWith('/admin') && pathname !== '/admin-login') {
            return 'admin';
        }
        if (pathname.startsWith('/client')) {
            return 'client';
        }
        if (['/login', '/register', '/admin-login'].includes(pathname)) {
            return 'auth';
        }
        return 'public';
    };

    const layout = getLayoutType(pathname);

    useEffect(() => {
        if (!isMounted || loading) return;

        const isAuthRoute = layout === 'auth';

        if (layout === 'admin') {
            if (!user) {
                router.replace('/admin-login');
            } else if (user.email?.toLowerCase() !== ADMIN_EMAIL) {
                router.replace('/client/dashboard');
            }
        } else if (layout === 'client') {
            if (!user) {
                router.replace('/login');
            } else if (user.email?.toLowerCase() === ADMIN_EMAIL) {
                router.replace('/admin/dashboard');
            }
        } else if (isAuthRoute && user) {
            if (user.email?.toLowerCase() === ADMIN_EMAIL) {
                router.replace('/admin/dashboard');
            } else {
                router.replace('/client/dashboard');
            }
        }
    }, [isMounted, user, loading, layout, pathname, router]);

    if (!isMounted) {
        return null;
    }
    
    return <>{children}</>;
}
