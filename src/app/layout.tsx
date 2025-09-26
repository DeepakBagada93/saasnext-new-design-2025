
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { ThemeProvider } from '@/components/theme-provider';
import { ClientOnly } from '@/components/client-only';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { AuthProvider } from '@/components/auth-provider';
import { AppLayout } from '@/components/app-layout';

export const metadata: Metadata = {
  title: 'SaaSNext | Web Design & Digital Marketing in Junagadh',
  description: 'Top web design, development, and SEO agency in Junagadh. We help local businesses grow with high-performance websites and marketing solutions.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen font-body antialiased", "bg-background")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <ClientOnly>
              <CustomCursor />
              <Toaster />
            </ClientOnly>
            <AuthProvider>
              <AppLayout>{children}</AppLayout>
            </AuthProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
