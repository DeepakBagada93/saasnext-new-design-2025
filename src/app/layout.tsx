
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { ClientOnly } from '@/components/client-only';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: 'SaaSNext: Web Design Company & Digital Marketing in Junagadh',
  description: 'Top web design company in Junagadh offering affordable and custom website development, ecommerce solutions, SEO, and SMM services. Grow your small business with the best digital marketing agency in Junagadh.',
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
    <html lang="en" className="dark" style={{colorScheme: 'dark'}}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen font-body antialiased", "bg-background")}>
          <FirebaseClientProvider>
            <ClientOnly>
              <Toaster />
              <AuthProvider>
                {children}
              </AuthProvider>
            </ClientOnly>
          </FirebaseClientProvider>
      </body>
    </html>
  );
}
