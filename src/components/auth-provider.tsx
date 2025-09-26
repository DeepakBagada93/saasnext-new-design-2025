
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { AppLayout } from './app-layout';
import { Skeleton } from './ui/skeleton';

const ADMIN_EMAIL = "deepakbagada25@gmail.com";

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!loading && isMounted) {
            const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin-login';
            const isClientRoute = pathname.startsWith('/client');

            if (isAdminRoute && (!user || user.email?.toLowerCase() !== ADMIN_EMAIL)) {
                router.replace('/admin-login');
            } 
            else if (isClientRoute && !user) {
                router.replace('/login');
            }
        }
    }, [user, loading, pathname, router, isMounted]);

    if (!isMounted || loading) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}
