
import { getProjectBySlug, getProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectMetricsChart } from '@/components/projects/project-metrics-chart';
import { staggerContainer, fadeIn } from '@/lib/motion';


export async function generateStaticParams() {
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
    keywords: [...project.tags, 'data engineer project metrics'],
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.imageUrl],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.shortDescription,
      images: [project.imageUrl],
    },
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
    'name': project.title,
    'description': project.longDescription,
    'url': projectUrl,
    'author': {
      '@type': 'Person',
      'name': 'Rajure Ajay Kumar',
      'url': portfolioUrl,
    },
    'keywords': project.tags.join(', ')
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <motion.main
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full py-12 md:py-24 bg-background overflow-hidden"
        role="main"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div variants={fadeIn('down', 'tween', 0, 0.5)} className="mb-8">
            <Link href="/#projects" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </motion.div>

          <motion.h1 
            variants={fadeIn('down', 'tween', 0.1, 0.5)} 
            className="text-4xl md:text-5xl font-bold tracking-tight font-headline text-foreground mb-4"
          >
            {project.title}
          </motion.h1>

          <motion.p 
            variants={fadeIn('down', 'tween', 0.2, 0.5)} 
            className="text-lg text-muted-foreground mb-8 max-w-3xl"
          >
            {project.shortDescription}
          </motion.p>
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.3, 0.5)} 
            className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint={project.aiHint}
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </motion.div>
          
          {project.metrics && project.metrics.length > 0 && (
            <motion.div variants={fadeIn('up', 'tween', 0.4, 0.5)} className="mb-12">
                <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Project Impact</h2>
                <ProjectMetricsChart metrics={project.metrics} />
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <motion.div variants={fadeIn('up', 'tween', 0.5, 0.5)}>
                <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Overview</h2>
                <p className="text-foreground/90 leading-relaxed">{project.longDescription}</p>
              </motion.div>

              <motion.div variants={fadeIn('up', 'tween', 0.6, 0.5)}>
                <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Key Outcomes</h2>
                <ul className="space-y-3">
                  {project.keyOutcomes.map((outcome, index) => (
                    <motion.li 
                      key={index} 
                      variants={fadeIn('up', 'tween', 0.7 + index * 0.1, 0.5)}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-foreground/90">{outcome}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <aside className="space-y-8">
               <motion.div variants={fadeIn('up', 'tween', 0.7, 0.5)}>
                 <Card className="bg-card border-border/60">
                   <CardHeader>
                     <CardTitle>Tech Stack</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                     {project.techStack.map((tech, techIndex) => (
                       <motion.div 
                          key={tech.category}
                          variants={fadeIn('up', 'tween', 0.8 + techIndex * 0.1, 0.5)}
                       >
                         <h4 className="font-semibold mb-2 text-muted-foreground">{tech.category}</h4>
                         <div className="flex flex-wrap gap-2">
                           {tech.items.map(item => (
                             <Badge key={item} variant="outline" className="border-primary/30 text-primary">
                               {item}
                             </Badge>
                           ))}
                         </div>
                       </motion.div>
                     ))}
                   </CardContent>
                 </Card>
               </motion.div>
                <motion.div 
                  variants={fadeIn('up', 'tween', 0.9, 0.5)} 
                  className="flex flex-col gap-4"
                >
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
                </motion.div>
            </aside>
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
