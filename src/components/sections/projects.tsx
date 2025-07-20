
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '@/components/analytics';
import { cardVariants, headerVariants } from '@/lib/motion';
import { getProjects } from '@/lib/projects';

const projects = getProjects();

export default function Projects() {
  const handleProjectClick = (projectName: string) => {
    trackEvent('click', { category: 'Projects', label: `View Project - ${projectName}` });
  };

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-center md:text-left mb-12"
        >
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Projects Showcase</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my detailed project work, demonstrating my skills in data engineering, AI, and MLOps.
            </p>
          </div>
          <Button asChild>
            <Link href="/projects/new">
              <PlusCircle className="mr-2 h-5 w-5" />
              New Project with AI
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="h-full"
            >
              <Card className="flex flex-col h-full overflow-hidden bg-card transition-all duration-300 ease-in-out border border-transparent hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/20">
                <CardHeader className="p-0">
                  <div className="relative w-full h-48">
                      <Image 
                        src={project.imageUrl} 
                        alt={project.title} 
                        fill 
                        className="object-cover" 
                        data-ai-hint={project.aiHint} 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy" 
                      />
                  </div>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <CardTitle className="mb-2 font-headline text-2xl text-foreground">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-primary/30 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardDescription className="flex-grow text-base text-muted-foreground">{project.shortDescription}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-start gap-4 pt-4">
                  <Button asChild aria-label={`View details for ${project.title}`} onClick={() => handleProjectClick(`${project.title} - Details`)}>
                    <Link href={`/projects/${project.slug}`}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                  <Button asChild variant="outline" aria-label={`View GitHub repository for ${project.title}`} onClick={() => handleProjectClick(`${project.title} - GitHub`)}>
                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
