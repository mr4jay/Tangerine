

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
const professionalHeadshotUrl = `${portfolioUrl}/professional-headshot.png`;

export const metadata: Metadata = {
  metadataBase: new URL(portfolioUrl),
  title: 'Rajure Ajay Kumar | Senior Data Engineer Portfolio',
  description: '6+ years as a Senior Data Engineer delivering $5M+ in savings and revenue growth with AWS, Snowflake, and Dataiku DSS. Explore my projects and skills.',
  keywords: ['data engineer portfolio', 'Rajure Ajay Kumar', 'Senior Data Engineer', 'Hyderabad', 'AWS', 'Snowflake', 'Dataiku DSS', 'Python', 'MLOps', 'AWS certified', 'Snowflake expert', 'data engineering projects', 'data engineer hyderabad', 'data engineering blog', 'fast data engineer portfolio', 'accessible data engineer portfolio', 'interactive data engineer portfolio', 'data engineer sitemap', 'data engineer performance monitoring', 'optimized data engineer portfolio', 'data engineer rich snippets'],
  authors: [{ name: 'Rajure Ajay Kumar' }],
  openGraph: {
    title: 'Rajure Ajay Kumar | Senior Data Engineer Portfolio',
    description: 'Explore the portfolio of Rajure Ajay Kumar, a Senior Data Engineer with expertise in building scalable data solutions using AWS, Snowflake, and AI.',
    url: portfolioUrl,
    siteName: 'DataCraft Portfolio',
    images: [
      {
        url: professionalHeadshotUrl,
        width: 1200,
        height: 630,
        alt: 'Rajure Ajay Kumar, Senior Data Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajure Ajay Kumar | Senior Data Engineer Portfolio',
    description: 'Expert in AWS, Snowflake, and Dataiku DSS. Check out my work.',
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
  jobTitle: 'Senior Data Engineer',
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'Novartis',
    },
    {
      '@type': 'Organization',
      name: 'Spoors',
    }
  ],
  knowsAbout: ['Data Engineering', 'AWS', 'Snowflake', 'Dataiku DSS', 'Python', 'MLOps', 'SQL', 'Data Pipelines', 'Cloud Architecture'],
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
