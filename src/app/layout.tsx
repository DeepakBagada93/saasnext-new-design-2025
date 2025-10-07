
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SaaSNext",
  "image": "https://saasnext.in/saaasnext.png",
  "@id": "https://saasnext.in/",
  "url": "https://saasnext.in/",
  "telephone": "+91 7016179234",
  "email": "connect@saasnext.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Junagadh",
    "addressLocality": "Junagadh",
    "addressRegion": "GJ",
    "postalCode": "362001",
    "addressCountry": "IN"
  },
  "description": "SaaSNext is a top-rated web design and digital marketing agency in Junagadh, specializing in custom website development, lead generation, and social media marketing to help local businesses grow.",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "http://instagram.com/saasnext",
    "https://www.facebook.com/profile.php?id=100095196226560",
    "https://x.com/Saasnext_db?t=fVDtCuBlY0FtNBWUofEl6A&s=09",
    "https://www.linkedin.com/company/saasnext-deepak-bagada/"
  ] 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{colorScheme: 'dark'}}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
