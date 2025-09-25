'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import AdminSidebar from '@/components/layout/admin-sidebar';
import ClientSidebar from '@/components/layout/client-sidebar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useUser } from '@/firebase';
import { Skeleton } from './ui/skeleton';
import { SidebarProvider } from './ui/sidebar';

const ADMIN_EMAIL = "deepakbagada25@gmail.com";

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();

    const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin-login';
    const isClientRoute = pathname.startsWith('/client');
    const isAuthRoute = ['/login', '/register', '/admin-login'].includes(pathname);

    useEffect(() => {
        if (!loading && isAdminRoute) {
            if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL) {
                router.replace('/admin-login');
            }
        }
    }, [user, loading, isAdminRoute, router, pathname]);

    if (loading && (isAdminRoute || isClientRoute)) {
        return (
             <div className="flex min-h-screen bg-muted/30">
                <div className="w-64 hidden md:block border-r p-4 space-y-4 bg-card">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
                <main className="flex-1 p-8">
                    <Skeleton className="h-12 w-1/2 mb-4" />
                    <Skeleton className="h-48 w-full" />
                </main>
            </div>
        );
    }
    
    if (isAdminRoute) {
        if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL) {
            // This can happen briefly on load, so we show a loader
            return (
                 <div className="flex min-h-screen bg-muted/30">
                    <div className="w-64 hidden md:block border-r p-4 space-y-4 bg-card">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                    <main className="flex-1 p-8">
                        <Skeleton className="h-12 w-1/2 mb-4" />
                        <Skeleton className="h-48 w-full" />
                    </main>
                </div>
            );
        }
        return (
            <SidebarProvider>
                <div className="flex min-h-screen bg-muted/30">
                    <AdminSidebar />
                    <main className="flex-1">
                        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
                    </main>
                </div>
            </SidebarProvider>
        );
    }
    
    if (isClientRoute) {
        return (
            <SidebarProvider>
                <div className="flex min-h-screen bg-muted/30">
                    <ClientSidebar />
                    <main className="flex-1">
                        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
                    </main>
                </div>
            </SidebarProvider>
        );
    }

    if (isAuthRoute) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                {children}
            </div>
        );
    }

    // Public routes default
    return (
        <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
