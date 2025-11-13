
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { AppLayout } from './app-layout';
import React, { useEffect } from 'react';

const ADMIN_EMAIL = "deeepakbagada25@gmail.com";

type LayoutType = 'public' | 'admin' | 'client' | 'auth';

function getLayoutType(pathname: string): LayoutType {
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

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading: userLoading } = useUser();
    
    const currentLayout = getLayoutType(pathname);

    useEffect(() => {
        if (userLoading) {
            return; // Don't do anything while loading
        }

        const isUserAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

        // --- AUTHENTICATION LOGIC ---
        if (currentLayout === 'admin') {
            if (!user) {
                router.replace('/admin-login'); // Not logged in, go to admin login
            } else if (!isUserAdmin) {
                router.replace('/client/dashboard'); // Logged in but not admin, go to client dash
            }
        } else if (currentLayout === 'client') {
            if (!user) {
                router.replace('/login'); // Not logged in, go to client login
            } else if (isUserAdmin) {
                router.replace('/admin/dashboard'); // Is an admin, go to admin dash
            }
        } else if (currentLayout === 'auth') {
            if (user) {
                if (isUserAdmin) {
                    router.replace('/admin/dashboard');
                } else {
                    router.replace('/client/dashboard');
                }
            }
        }
    }, [user, userLoading, pathname, router, currentLayout]);


    // While loading, or if routing decision is pending, show a blank screen to prevent flicker
    if (userLoading || (currentLayout !== 'public' && !user && currentLayout !== 'auth') || (currentLayout === 'auth' && user)) {
        return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
    }
    
    // If the user is not an admin but trying to access an admin page, show blank screen while redirecting
    if (currentLayout === 'admin' && user && user.email?.toLowerCase() !== ADMIN_EMAIL) {
       return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
    }

    // If the user is an admin but trying to access a client page, show blank screen while redirecting
    if (currentLayout === 'client' && user && user.email?.toLowerCase() === ADMIN_EMAIL) {
       return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
    }


    return <AppLayout layout={currentLayout}>{children}</AppLayout>;
}
