
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { AppLayout } from './app-layout';
import React, { useEffect } from 'react';

const ADMIN_EMAIL = "deeeepakbagada25@gmail.com";

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

        // --- AUTHENTICATION LOGIC ---
        if (currentLayout === 'admin') {
            if (!user) {
                router.replace('/admin-login');
            } else if (user.email?.toLowerCase() !== ADMIN_EMAIL) {
                router.replace('/client/dashboard');
            }
        } else if (currentLayout === 'client') {
            if (!user) {
                router.replace('/login');
            } else if (user.email?.toLowerCase() === ADMIN_EMAIL) {
                router.replace('/admin/dashboard');
            }
        } else if (currentLayout === 'auth') {
            if (user) {
                if (user.email?.toLowerCase() === ADMIN_EMAIL) {
                    router.replace('/admin/dashboard');
                } else {
                    router.replace('/client/dashboard');
                }
            }
        }
    }, [user, userLoading, pathname, router, currentLayout]);


    if (userLoading || (currentLayout !== 'public' && !user && currentLayout !== 'auth') || (currentLayout === 'auth' && user)) {
        return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
    }
    
    if (currentLayout === 'admin' && user && user.email?.toLowerCase() !== ADMIN_EMAIL) {
       return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
    }

    if (currentLayout === 'client' && user && user.email?.toLowerCase() === ADMIN_EMAIL) {
       return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
    }


    return <AppLayout layout={currentLayout}>{children}</AppLayout>;
}
