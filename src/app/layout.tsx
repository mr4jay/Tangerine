

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import Analytics from '@/components/analytics';
import CookieConsent from '@/components/layout/cookie-consent';
import { AppLayout } from '@/components/layout/header';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const portfolioUrl = "https://ajay-kumar-portfolio.vercel.app";
const professionalHeadshotUrl = "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1200&h=630&fit=crop&crop=faces";

export const metadata: Metadata = {
  metadataBase: new URL(portfolioUrl),
  title: 'Rajure Ajay Kumar | Marketing Science and Data Professional Portfolio',
  description: '6+ years as a Marketing Science and Data Professional delivering value with Datorama, and advanced Excel VBA macros. Explore my projects and skills.',
  keywords: ['data professional portfolio', 'Rajure Ajay Kumar', 'Marketing Science', 'Hyderabad', 'Datorama', 'Excel VBA', 'Dataiku DSS', 'Python', 'MLOps', 'DataOps', 'data professional hyderabad', 'data engineering blog', 'fast data engineer portfolio', 'accessible data engineer portfolio', 'interactive data engineer portfolio', 'data engineer sitemap', 'data engineer performance monitoring', 'optimized data engineer portfolio', 'data engineer rich snippets'],
  authors: [{ name: 'Rajure Ajay Kumar' }],
  openGraph: {
    title: 'Rajure Ajay Kumar | Marketing Science and Data Professional Portfolio',
    description: 'Explore the portfolio of Rajure Ajay Kumar, a professional with expertise in building scalable data solutions using Datorama, and AI.',
    url: portfolioUrl,
    siteName: 'DataCraft Portfolio',
    images: [
      {
        url: professionalHeadshotUrl,
        width: 1200,
        height: 630,
        alt: 'Rajure Ajay Kumar, Marketing Science and Data Professional',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajure Ajay Kumar | Marketing Science and Data Professional Portfolio',
    description: 'Expert in Datorama and Dataiku DSS. Check out my work.',
    images: [professionalHeadshotUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#1A202C' },
  ],
}


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rajure Ajay Kumar',
  url: portfolioUrl,
  image: professionalHeadshotUrl,
  jobTitle: 'Marketing Science and Data Professional',
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'Omnicom Media Group',
    },
    {
      '@type': 'Organization',
      name: 'Spoors',
    }
  ],
  knowsAbout: ['Data Engineering', 'Datorama', 'Dataiku DSS', 'Python', 'MLOps', 'SQL', 'Data Pipelines', 'Excel VBA'],
  sameAs: [
    'https://linkedin.com/in/rajure-ajay-kumar',
    'https://github.com/rajure-ajay',
  ],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": portfolioUrl
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster />
          <CookieConsent />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
