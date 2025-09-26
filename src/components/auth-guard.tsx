'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { AppLayout } from './app-layout';

const ADMIN_EMAIL = "deepakbagada25@gmail.com";

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
    
    if (userLoading) {
        return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
    }

    const currentLayout = getLayoutType(pathname);

    // --- AUTHENTICATION LOGIC ---
    if (currentLayout === 'admin') {
        if (!user) {
            router.replace('/admin-login');
            return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
        }
        if (user.email?.toLowerCase() !== ADMIN_EMAIL) {
            router.replace('/client/dashboard');
             return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
        }
    } else if (currentLayout === 'client') {
        if (!user) {
            router.replace('/login');
            return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
        }
        if (user.email?.toLowerCase() === ADMIN_EMAIL) {
            router.replace('/admin/dashboard');
            return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
        }
    } else if (currentLayout === 'auth') {
        if (user) {
             if (user.email?.toLowerCase() === ADMIN_EMAIL) {
                router.replace('/admin/dashboard');
            } else {
                router.replace('/client/dashboard');
            }
            return <div className="flex min-h-screen items-center justify-center p-4 bg-background" />;
        }
    }

    return <AppLayout layout={currentLayout}>{children}</AppLayout>;
}
