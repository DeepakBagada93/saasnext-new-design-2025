
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { AppLayout } from './app-layout';

const ADMIN_EMAIL = "deepakbagada25@gmail.com";

type LayoutType = 'public' | 'admin' | 'client' | 'auth';

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

function LoadingScreen() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background" />
    );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (loading || !isMounted) return;

        const layout = getLayoutType(pathname);
        const isAdminRoute = layout === 'admin';
        const isClientRoute = layout === 'client';
        const isAuthRoute = layout === 'auth';

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
    }, [user, loading, pathname, router, isMounted]);

    if (!isMounted || loading) {
        return <LoadingScreen />;
    }
    
    const layout = getLayoutType(pathname);

    if (!user && (layout === 'admin' || layout === 'client')) {
        return <LoadingScreen />;
    }

    return <AppLayout>{children}</AppLayout>;
}
