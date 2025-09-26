
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

        const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin-login';
        const isClientRoute = pathname.startsWith('/client');
        const isAuthRoute = ['/login', '/register', '/admin-login'].includes(pathname);

        if (isAdminRoute) {
            if (!user) {
                router.replace('/admin-login');
            } else if (user.email?.toLowerCase() !== ADMIN_EMAIL) {
                router.replace('/admin-login');
            }
        } else if (isClientRoute) {
            if (!user) {
                router.replace('/login');
            }
        } else if (isAuthRoute && user) {
            if (user.email?.toLowerCase() === ADMIN_EMAIL) {
                router.replace('/admin/dashboard');
            } else {
                router.replace('/client/dashboard');
            }
        }
    }, [user, loading, pathname, router, isMounted]);

    const getLayout = (): LayoutType => {
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
    }

    const layout = getLayout();
    
    // Render a loading screen only during server render or before mount.
    // After mount, the effect will handle redirects.
    if (!isMounted || (loading && (pathname.startsWith('/admin') || pathname.startsWith('/client')))) {
        return <LoadingScreen />;
    }

    return <AppLayout layout={layout}>{children}</AppLayout>;
}
