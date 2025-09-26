
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { AppLayout } from './app-layout';

const ADMIN_EMAIL = "deepakbagada25@gmail.com";

type LayoutType = 'public' | 'admin' | 'client' | 'auth' | 'loading';

function getLayoutType(pathname: string): Omit<LayoutType, 'loading'> {
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();
    const [layout, setLayout] = useState<LayoutType>('loading');

    useEffect(() => {
        if (loading) {
            setLayout('loading');
            return;
        }

        const currentLayout = getLayoutType(pathname);
        const isAuthRoute = currentLayout === 'auth';

        if (currentLayout === 'admin') {
            if (!user) {
                router.replace('/admin-login');
                setLayout('auth');
            } else if (user.email?.toLowerCase() !== ADMIN_EMAIL) {
                router.replace('/client/dashboard');
                setLayout('client');
            } else {
                setLayout('admin');
            }
        } else if (currentLayout === 'client') {
            if (!user) {
                router.replace('/login');
                setLayout('auth');
            } else if (user.email?.toLowerCase() === ADMIN_EMAIL) {
                router.replace('/admin/dashboard');
                setLayout('admin');
            } else {
                setLayout('client');
            }
        } else if (isAuthRoute) {
            if (user) {
                if (user.email?.toLowerCase() === ADMIN_EMAIL) {
                    router.replace('/admin/dashboard');
                    setLayout('admin');
                } else {
                    router.replace('/client/dashboard');
                    setLayout('client');
                }
            } else {
                setLayout('auth');
            }
        } else { // Public route
            setLayout('public');
        }

    }, [user, loading, pathname, router]);

    return <AppLayout layout={layout}>{children}</AppLayout>;
}
