
'use client';

import { getResumeData } from '@/lib/resume-server';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import './resume.css';

// This is now a client component to handle the print functionality.

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<{ contentHtml: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getResumeData()
      .then((data) => {
        setResumeData(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);
  
  const handlePrint = () => {
    window.print();
  }

  return (
    <>
      <main className="w-full py-12 md:py-24 lg:py-32 bg-background print:py-0" role="main">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="flex justify-between items-center mb-8 print:hidden">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Resume</h1>
            <Button onClick={handlePrint} size="lg" aria-label="Download my resume in PDF format">
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
          </div>
           {isLoading ? (
             <div className="space-y-6 bg-card p-8 rounded-lg shadow-lg">
                <Skeleton className="h-8 w-1/2 mx-auto" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/4 mt-8" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-6 w-1/4 mt-8" />
                <Skeleton className="h-40 w-full" />
             </div>
           ) : (
             <div
                className="resume-content prose prose-lg dark:prose-invert max-w-none bg-card p-8 rounded-lg shadow-lg print:shadow-none print:p-0 print:bg-transparent"
                dangerouslySetInnerHTML={{ __html: resumeData!.contentHtml }}
              />
           )}
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}

