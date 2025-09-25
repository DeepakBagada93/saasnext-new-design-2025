'use client';
import { usePathname } from 'next/navigation';

import AdminSidebar from '@/components/layout/admin-sidebar';
import ClientSidebar from '@/components/layout/client-sidebar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from './ui/toaster';

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin-login';
    const isClientRoute = pathname.startsWith('/client');
    const isAuthRoute = ['/login', '/register', '/admin-login'].includes(pathname);

    if (isAdminRoute) {
        return (
            <div className="flex min-h-screen bg-muted/30">
                <AdminSidebar />
                <main className="flex-1">
                    <div className="p-4 sm:p-6 lg:p-8">{children}</div>
                </main>
            </div>
        );
    }
    
    if (isClientRoute) {
        return (
            <div className="flex min-h-screen bg-muted/30">
                <ClientSidebar />
                <main className="flex-1">
                    <div className="p-4 sm:p-6 lg:p-8">{children}</div>
                </main>
            </div>
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
