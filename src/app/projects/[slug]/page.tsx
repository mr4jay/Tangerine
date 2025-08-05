import { getProjectBySlug, getProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectMetricsChart } from '@/components/projects/project-metrics-chart';
import { ArrowLeft, Github, ExternalLink, CheckCircle } from 'lucide-react';

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {};
  }
  return {
    title: `${project.title} | Projects`,
    description: project.shortDescription,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  const portfolioUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!project) {
    notFound();
  }

  const projectUrl = `${portfolioUrl}/projects/${project.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.longDescription,
    url: projectUrl,
    author: {
      '@type': 'Person',
      name: 'Rajure Ajay Kumar',
      url: portfolioUrl,
    },
    keywords: project.tags.join(', '),
  };

  return (
    <>
      <head>
        <title>{`${project.title} | Projects`}</title>
        <meta name="description" content={project.shortDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <main className="w-full py-12 md:py-24 bg-background overflow-hidden" role="main">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-8">
            <Link href="/#projects" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            {project.shortDescription}
          </p>

          <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint={project.aiHint}
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Project Impact</h2>
              <ProjectMetricsChart metrics={project.metrics} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Overview</h2>
                <p className="text-foreground/90 leading-relaxed">{project.longDescription}</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Key Outcomes</h2>
                <ul className="space-y-3">
                  {project.keyOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-foreground/90">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-8">
              <Card className="bg-card border-border/60">
                <CardHeader>
                  <CardTitle>Tech Stack</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.techStack.map(tech => (
                    <div key={tech.category}>
                      <h4 className="font-semibold mb-2 text-muted-foreground">{tech.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {tech.items.map(item => (
                          <Badge key={item} variant="outline" className="border-primary/30 text-primary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex flex-col gap-4">
                <Button asChild variant="outline" size="lg">
                  <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Live Demo
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
