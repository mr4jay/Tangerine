
import { getResumeData } from '@/lib/resume';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Metadata } from 'next';
import './resume.css';

export const metadata: Metadata = {
  title: 'Resume | Rajure Ajay Kumar',
  description: 'Online resume for Rajure Ajay Kumar, a Senior Data Engineer with expertise in building scalable data solutions.',
};

export default async function ResumePage() {
  const { contentHtml } = await getResumeData();

  return (
    <>
      <main className="w-full py-12 md:py-24 lg:py-32 bg-background" role="main">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Resume</h1>
            <Button asChild size="lg">
              <a href="/resume.pdf" download="Rajure_Ajay_Kumar_Resume.pdf" aria-label="Download my resume in PDF format">
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </a>
            </Button>
          </div>
          <div
            className="resume-content prose prose-lg dark:prose-invert max-w-none bg-card p-8 rounded-lg shadow-lg"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
