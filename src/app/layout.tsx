import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const professionalHeadshotUrl = "https://placehold.co/1200x630.png";

export const metadata: Metadata = {
  title: 'Rajure Ajay Kumar | Senior Data Engineer Portfolio',
  description: '6+ years as a Senior Data Engineer delivering $5M+ in savings and revenue growth with AWS, Snowflake, and Dataiku DSS. Explore my projects and skills.',
  keywords: ['data engineer portfolio', 'Rajure Ajay Kumar', 'Senior Data Engineer', 'Hyderabad', 'AWS', 'Snowflake', 'Dataiku DSS', 'Python', 'MLOps', 'AWS certified', 'Snowflake expert', 'data engineering projects', 'data engineer hyderabad', 'data engineering blog'],
  authors: [{ name: 'Rajure Ajay Kumar' }],
  openGraph: {
    title: 'Rajure Ajay Kumar | Senior Data Engineer Portfolio',
    description: 'Explore the portfolio of Rajure Ajay Kumar, a Senior Data Engineer with expertise in building scalable data solutions using AWS, Snowflake, and AI.',
    url: 'https://your-domain.com', // Replace with your actual domain
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rajure Ajay Kumar',
  url: 'https://your-domain.com', // Replace with your actual domain
  image: professionalHeadshotUrl,
  jobTitle: 'Senior Data Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Novartis',
  },
  alumniOf: 'Hyderabad',
  knowsAbout: ['Data Engineering', 'AWS', 'Snowflake', 'Dataiku DSS', 'Python', 'MLOps', 'SQL'],
  sameAs: [
    'https://linkedin.com/in/your-profile', // Replace with your actual LinkedIn
    'https://github.com/your-profile', // Replace with your actual GitHub
  ],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://your-domain.com" // Replace with your actual domain
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
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
