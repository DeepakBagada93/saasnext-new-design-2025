'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import AdminSidebar from '@/components/layout/admin-sidebar';
import ClientSidebar from '@/components/layout/client-sidebar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useUser } from '@/firebase';
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
        if (!loading) {
            if (isAdminRoute && (!user || user.email?.toLowerCase() !== ADMIN_EMAIL)) {
                router.replace('/admin-login');
            } else if (isClientRoute && !user) {
                router.replace('/login');
            }
        }
    }, [user, loading, isAdminRoute, isClientRoute, router, pathname]);

    if (loading && (isAdminRoute || isClientRoute)) {
        return (
             <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
    
    if (isAdminRoute) {
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
            <div className="flex min-h-screen items-center justify-center p-4 bg-background">
                {children}
            </div>
        );
    }

    // Public routes default
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
