
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

const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number) => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
    y: direction === 'up' ? -20 : direction === 'down' ? 20 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: 'easeOut',
    },
  },
});

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <motion.main
        initial="hidden"
        animate="visible"
        className="w-full py-12 md:py-24 bg-background"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div variants={fadeIn('down', 0)} className="mb-8">
            <Link href="/#projects" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </motion.div>

          <motion.h1 
            variants={fadeIn('down', 0.1)} 
            className="text-4xl md:text-5xl font-bold tracking-tight font-headline text-foreground mb-4"
          >
            {project.title}
          </motion.h1>

          <motion.p 
            variants={fadeIn('down', 0.2)} 
            className="text-lg text-muted-foreground mb-8 max-w-3xl"
          >
            {project.shortDescription}
          </motion.p>
          
          <motion.div 
            variants={fadeIn('down', 0.3)} 
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <motion.div variants={fadeIn('up', 0.4)}>
                <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Overview</h2>
                <p className="text-foreground/90 leading-relaxed">{project.longDescription}</p>
              </motion.div>

              <motion.div variants={fadeIn('up', 0.5)}>
                <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Key Outcomes</h2>
                <ul className="space-y-3">
                  {project.keyOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-foreground/90">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <aside className="space-y-8">
               <motion.div variants={fadeIn('up', 0.6)}>
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
                             <Badge key={item} variant="default" className="bg-primary/20 text-primary border-primary/40">
                               {item}
                             </Badge>
                           ))}
                         </div>
                       </div>
                     ))}
                   </CardContent>
                 </Card>
               </motion.div>
                <motion.div variants={fadeIn('up', 0.7)} className="flex flex-col gap-4">
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
