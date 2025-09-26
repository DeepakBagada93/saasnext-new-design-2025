
'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/layout/admin-sidebar';
import ClientSidebar from '@/components/layout/client-sidebar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { DashboardLayout, SidebarProvider } from './ui/sidebar';

type LayoutType = 'public' | 'admin' | 'client' | 'auth';

export function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

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


  if (layout === 'admin') {
    return (
      <SidebarProvider>
        <DashboardLayout sidebar={<AdminSidebar />}>{children}</DashboardLayout>
      </SidebarProvider>
    );
  }

  if (layout === 'client') {
    return (
      <SidebarProvider>
        <DashboardLayout sidebar={<ClientSidebar />}>{children}</DashboardLayout>
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
