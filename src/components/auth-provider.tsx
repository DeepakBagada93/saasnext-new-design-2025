
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { Skeleton } from './ui/skeleton';
import { AppLayout } from './app-layout';

function LoadingScreen() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
            <div className='w-full max-w-sm space-y-4'>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
}

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();
    const [isMounted, setIsMounted] = useState(false);
    
    const layout = getLayoutType(pathname);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (loading || !isMounted) return;

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
    }, [user, loading, layout, router, isMounted, pathname]);

    if (!isMounted || loading) {
        return <LoadingScreen />;
    }
    
    if (user) {
        const isAdminUser = user.email?.toLowerCase() === ADMIN_EMAIL;
        if (layout === 'admin' && !isAdminUser) return <LoadingScreen />;
        if (layout === 'client' && isAdminUser) return <LoadingScreen />;
    }
     if (!user && (layout === 'admin' || layout === 'client')) {
        return <LoadingScreen />;
    }

    return <AppLayout>{children}</AppLayout>;
}
