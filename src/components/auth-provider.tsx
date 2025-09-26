
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { Skeleton } from './ui/skeleton';

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();
    
    useEffect(() => {
        if (!loading) {
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
        }
    }, [user, loading, pathname, router]);

    if (loading) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}
