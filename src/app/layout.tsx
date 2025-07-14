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

export const metadata: Metadata = {
  title: 'DataCraft Portfolio - Rajure Ajay Kumar',
  description: 'Senior Data Engineer portfolio for Rajure Ajay Kumar, based in Hyderabad. Specializing in building scalable data solutions with AWS, Snowflake, and AI.',
  keywords: ['data engineer portfolio', 'Hyderabad', 'Senior Data Engineer', 'AWS', 'Snowflake', 'Dataiku DSS', 'Rajure Ajay Kumar', 'Portfolio', 'AI', 'data engineer hyderabad', 'AI solutions', 'data engineering projects', 'AWS pipelines', 'data engineer skills', 'AWS expertise', 'data engineer certifications', 'AWS certified', 'contact data engineer', 'interactive data engineer portfolio', 'accessible data engineer portfolio', 'fast data engineer portfolio'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
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
