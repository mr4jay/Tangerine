import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'DataCraft Portfolio - Rajure Ajay Kumar',
  description: 'Senior Data Engineer portfolio for Rajure Ajay Kumar, based in Hyderabad. Specializing in building scalable data solutions with AWS, Snowflake, and AI.',
  keywords: ['data engineer portfolio', 'Hyderabad', 'Senior Data Engineer', 'AWS', 'Snowflake', 'Dataiku DSS', 'Rajure Ajay Kumar', 'Portfolio', 'AI', 'data engineer hyderabad', 'AI solutions', 'data engineering projects', 'AWS pipelines', 'data engineer skills', 'AWS expertise', 'data engineer certifications', 'AWS certified', 'contact data engineer'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
