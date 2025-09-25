import type {Metadata} from 'next';
import './globals.css';
import { AppLayout } from '@/components/app-layout';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'SaaSNext Platform',
  description: 'The web application for SaaSNext.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen font-body antialiased", "bg-background")}>
        <FirebaseProvider>
          <AppLayout>{children}</AppLayout>
        </FirebaseProvider>
        <Toaster />
      </body>
    </html>
  );
}
