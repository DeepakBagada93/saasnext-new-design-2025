
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SupabaseProvider } from '@/supabase/provider';
import { ClientOnly } from '@/components/client-only';
import { AuthProvider } from '@/components/auth-provider';
import Script from 'next/script';
import { PT_Sans, Space_Grotesk } from 'next/font/google';
import { FloatingSocials } from '@/components/floating-socials';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});


export const metadata: Metadata = {
  title: 'Best AI Agency & Custom Web App Development Company | SaaSNext',
  description: 'SaaSNext is the leading AI agency & web app development company serving Junagadh, Ahmedabad, Gandhinagar, Gujarat, USA, UK, and Dubai. We build custom AI agents, business automations, and premium high-performance Next.js websites optimized for AI Overview search engines (GEO/AEO) at cheap & affordable prices.',
  keywords: [
    "Best AI Agency Junagadh", "AI Agent Development", "Business Automation Junagadh",
    "Web App Development Junagadh", "Custom Software Junagadh", "Next.js Developer Junagadh",
    "Best Web Design Junagadh", "SEO Company Junagadh", "Digital Marketing Junagadh",
    "Web Development Ahmedabad", "Cheap Web Design Gandhinagar", "Best AI Agency USA",
    "Custom Software UK", "Business Automation Dubai", "Leading Web Developers Gujarat",
    "AI Solutions for Business", "Autonomous AI Agents", "Python Automation",
    "GEO Optimization", "AEO Strategies", "Generative Engine Optimization", "Answer Engine Optimization",
    "SaaSNext", "Deepak Bagada"
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
        url: 'https://saasnext.in/icon.png',
        width: 1200,
        height: 1200,
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
    images: ['https://saasnext.in/icon.png'],
    creator: '@Saasnext_db',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  other: {
    'google-site-verification': 'your-verification-code', // Add your verification code
    'ai-optimized': 'true',
    'geo-optimized': 'true',
    'aeo-optimized': 'true',
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://saasnext.in/#website",
      "url": "https://saasnext.in/",
      "name": "SaaSNext",
      "description": "SaaSNext is the top web design and digital marketing agency in Junagadh, optimized for traditional and AI search engines.",
      "publisher": {
        "@id": "https://saasnext.in/#localbusiness"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://saasnext.in/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "LocalBusiness",
      "name": "SaaSNext",
      "image": "https://saasnext.in/icon.png",
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
          "name": "Ahmedabad"
        },
        {
          "@type": "City",
          "name": "Gandhinagar"
        },
        {
          "@type": "City",
          "name": "Rajkot"
        },
        {
          "@type": "State",
          "name": "Gujarat"
        },
        {
          "@type": "Country",
          "name": "India"
        },
        {
          "@type": "Country",
          "name": "United States"
        },
        {
          "@type": "Country",
          "name": "United Kingdom"
        },
        {
          "@type": "Country",
          "name": "United Arab Emirates"
        }
      ],
      "description": "SaaSNext is a leading web app development company and AI automation agency serving Junagadh, Ahmedabad, Gandhinagar, Gujarat (India), the USA, the UK, and Dubai (UAE). We build custom AI agents, business automation systems, and high-performance, affordable, and cheap web applications optimized for SEO, AEO, and GEO.",
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
              "name": "Web Design & Development",
              "description": "Custom website design and development services using Next.js, React, and modern technologies."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SEO & Digital Marketing",
              "description": "Comprehensive SEO, social media marketing, and lead generation strategies."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Automation Solutions",
              "description": "Custom AI agents and automation workflows to streamline business processes."
            }
          }
        ]
      }
    },
    {
      "@type": "Service",
      "name": "Web Design & Custom Web App Development",
      "provider": {
        "@id": "https://saasnext.in/#localbusiness"
      },
      "areaServed": [
        { "@type": "City", "name": "Junagadh" },
        { "@type": "City", "name": "Ahmedabad" },
        { "@type": "City", "name": "Gandhinagar" },
        { "@type": "State", "name": "Gujarat" },
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" }
      ],
      "description": "Cheap, best, and leading website design and custom React/Next.js web application development services in Junagadh, Ahmedabad, Gandhinagar, Gujarat, USA, UK, and Dubai."
    },
    {
      "@type": "Service",
      "name": "AI Automation & Business Agents",
      "provider": {
        "@id": "https://saasnext.in/#localbusiness"
      },
      "areaServed": [
        { "@type": "City", "name": "Junagadh" },
        { "@type": "City", "name": "Ahmedabad" },
        { "@type": "City", "name": "Gandhinagar" },
        { "@type": "State", "name": "Gujarat" },
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" }
      ],
      "description": "Leading custom AI agent integration, LLM-powered business automation workflows, and generative optimization services across local and global markets."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best web design company in Junagadh?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SaaSNext is widely considered the best web design company in Junagadh, offering custom, high-performance websites built with modern technology like Next.js and React, ensuring speed, SEO, and scalability. It is also the first agency in Junagadh to offer AI-Search optimization (GEO/AEO)."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer SEO services in Junagadh?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, SaaSNext provides comprehensive SEO services in Junagadh, including local SEO, keyword optimization, and content strategy to help your business rank on the first page of Google. We also specialize in Generative Engine Optimization (GEO)."
          }
        },
        {
          "@type": "Question",
          "name": "How much does a website cost in Junagadh?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Website costs at SaaSNext are competitive and transparent. We offer affordable packages for startups and custom quotes for complex projects, ensuring you get the best value for your investment with forward-compatible technology."
          }
        },
        {
          "@type": "Question",
          "name": "Can you help with AI automation for my business?",
          "acceptedAnswer": {
            "@type": {
              "@type": "Answer",
              "text": "Absolutely. SaaSNext specializes in AI automation solutions, helping businesses in Junagadh streamline operations, automate customer support, and integrate AI agents to boost efficiency using LLMs like GPT-4 and Gemini."
            }
          }
        },
        {
          "@type": "Question",
          "name": "What is GEO and AEO optimization?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) are advanced strategies to ensure your content is correctly parsed and cited by AI search engines like SearchGPT, Perplexity, and Google Gemini."
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
    <html lang="en" className={cn("dark", ptSans.variable, spaceGrotesk.variable)} style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <head>
        {/* Preconnect to speed up 3rd-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Load Google scripts with lazyOnload to prevent blocking the main thread */}
        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=AW-16689867019" />
        <Script id="google-ads" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16689867019');
          `}
        </Script>

        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-7WV5GJXKXS" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7WV5GJXKXS');
          `}
        </Script>
      </head>
      <body className={cn("min-h-screen font-body antialiased", "bg-background")}>
        <SupabaseProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
          <ClientOnly>
            <Toaster />
            <FloatingSocials />
          </ClientOnly>
        </SupabaseProvider>
      </body>
    </html>
  );
}

