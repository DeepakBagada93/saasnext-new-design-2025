'use client';

import AdminSidebar from '@/components/layout/admin-sidebar';
import ClientSidebar from '@/components/layout/client-sidebar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { DashboardLayout, SidebarProvider } from './ui/sidebar';

export function AppLayout({
    layout,
    children
}: {
    layout: 'admin' | 'client' | 'public' | 'auth',
    children: React.ReactNode
}) {

    if (layout === 'admin') {
        return (
            <SidebarProvider>
                <DashboardLayout sidebar={<AdminSidebar />}>
                    {children}
                </DashboardLayout>
            </SidebarProvider>
        );
    }
    
    if (layout === 'client') {
        return (
            <SidebarProvider>
                 <DashboardLayout sidebar={<ClientSidebar />}>
                    {children}
                </DashboardLayout>
            </SidebarProvider>
        );
    }

    if (layout === 'auth') {
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
