'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { AppLayout } from './app-layout';
import { Skeleton } from './ui/skeleton';

function LoadingScreen() {
    // This component can be simpler as it's only shown on the client now
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
            <div className='w-full max-w-sm space-y-4'>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
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
                // if a non-admin user tries to access an admin route, send them to their dashboard
                router.replace('/client/dashboard');
            }
        } else if (layout === 'client') {
            if (!user) {
                router.replace('/login');
            } else if (user.email?.toLowerCase() === ADMIN_EMAIL) {
                // if an admin user tries to access a client route, send them to their dashboard
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

    // Until the component is mounted on the client, render nothing to prevent hydration mismatch.
    if (!isMounted) {
        return null;
    }
    
    // While firebase auth is loading, show a loading screen.
    // This is safe because it only happens on the client after mounting.
    if (loading) {
        return <LoadingScreen />;
    }

    // After mounting and loading, render the correct layout.
    // This logic now only runs on the client.
    return <AppLayout layout={layout}>{children}</AppLayout>;
}
