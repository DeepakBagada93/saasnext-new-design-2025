
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { ClientOnly } from '@/components/client-only';
import { AuthProvider } from '@/components/auth-provider';
import Script from 'next/script';
import { PT_Sans, Space_Grotesk } from 'next/font/google';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});


export const metadata: Metadata = {
  title: 'SaaSNext: Best Web Design & Digital Marketing Company in Junagadh',
  description: 'SaaSNext is the top web design and digital marketing agency in Junagadh. We offer custom website development, AI solutions, SEO, SMM, and lead generation services to grow your business.',
  keywords: [
    "Web Design Junagadh", "Web Development Junagadh", "SEO Company Junagadh",
    "Digital Marketing Agency Junagadh", "AI Solutions Junagadh", "SMM Services Junagadh",
    "Lead Generation Junagadh", "B2B Marketing", "Affordable Web Design",
    "Best Web Developer Junagadh", "Custom Website Development", "E-commerce Website Junagadh",
    "WordPress Developer Junagadh", "Local SEO Junagadh", "Google Ads Agency Junagadh",
    "Facebook Ads Junagadh", "Social Media Marketing", "Business Automation", "AI Agents", "SaaSNext",
    "Website Maker in Junagadh", "IT Company Junagadh", "Software Company Junagadh"
  ],
  authors: [{ name: 'SaaSNext' }, { name: 'Deepak Bagada' }],
  creator: 'SaaSNext',
  publisher: 'SaaSNext',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://saasnext.in',
  },
  openGraph: {
    title: 'SaaSNext: Best Web Design & Digital Marketing Company in Junagadh',
    description: 'Transform your business with SaaSNext. We provide expert web design, SEO, AI automation, and digital marketing services in Junagadh, Gujarat.',
    url: 'https://saasnext.in',
    siteName: 'SaaSNext',
    images: [
      {
        url: 'https://saasnext.in/saaasnext.png',
        width: 1200,
        height: 630,
        alt: 'SaaSNext Web Design and Marketing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaSNext: Best Web Design & Digital Marketing Company in Junagadh',
    description: 'Transform your business with SaaSNext. Expert web design, SEO, and AI solutions in Junagadh.',
    images: ['https://saasnext.in/saaasnext.png'],
    creator: '@Saasnext_db',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "SaaSNext",
      "image": "https://saasnext.in/saaasnext.png",
      "@id": "https://saasnext.in/#localbusiness",
      "url": "https://saasnext.in/",
      "telephone": "+91 7016179234",
      "email": "connect@saasnext.in",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Junagadh",
        "addressLocality": "Junagadh",
        "addressRegion": "GJ",
        "postalCode": "362001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.5222,
        "longitude": 70.4579
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Junagadh"
        },
        {
          "@type": "City",
          "name": "Rajkot"
        },
        {
          "@type": "State",
          "name": "Gujarat"
        }
      ],
      "description": "SaaSNext is a top-rated web design and digital marketing agency in Junagadh, specializing in custom website development, lead generation, and social media marketing to help local businesses grow.",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        "http://instagram.com/saasnext",
        "https://www.facebook.com/profile.php?id=100095196226560",
        "https://x.com/Saasnext_db?t=fVDtCuBlY0FtNBWUofEl6A&s=09",
        "https://www.linkedin.com/company/saasnext-deepak-bagada/"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web Design & Development"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SEO & Digital Marketing"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Automation Solutions"
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of businesses do you work with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We work with a wide range of businesses in Junagadh, from early-stage startups to established local companies. Our AI automation and digital marketing for small business in Junagadh is particularly effective."
          }
        },
        {
          "@type": "Question",
          "name": "How much does a typical project cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Project costs vary depending on the scope. We provide custom quotes after an initial discovery call. Our goal is to offer affordable AI and web solutions in Junagadh that delivers a high return on investment."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a project usually take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A typical website project takes 8-12 weeks from kick-off to launch. AI automation projects can vary greatly based on complexity. We establish a clear timeline at the beginning of every project."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", ptSans.variable, spaceGrotesk.variable)} style={{ colorScheme: 'dark' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16689867019"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'AW-16689867019');
          `}
        </Script>
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
