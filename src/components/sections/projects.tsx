
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '@/components/analytics';
import ProjectTimeline from './project-timeline';

const projects = [
  {
    title: 'Enterprise Data Platform',
    description: 'Architected and deployed a scalable enterprise-level data platform at Novartis, achieving over $3M in cost savings and reducing data processing latency by 45%.',
    tags: ['AWS', 'Snowflake', 'DBT', 'Airflow', 'Kinesis'],
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'data platform architecture',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Customer Churn Prediction Model',
    description: 'Developed and deployed a machine learning model at Spoors to predict customer churn, directly contributing to a $1.2M increase in retained revenue.',
    tags: ['Dataiku DSS', 'Python', 'Scikit-learn', 'MLOps'],
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'predictive model graph',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Real-time Analytics Dashboard',
    description: 'Built a real-time analytics dashboard using AWS Kinesis and Lambda to process millions of events per second, enabling live KPI monitoring for business stakeholders.',
    tags: ['AWS Kinesis', 'Lambda', 'Snowflake', 'React'],
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'analytics dashboard',
    demoUrl: '#',
    repoUrl: '#',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export default function Projects() {
  const handleProjectClick = (projectName: string) => {
    trackEvent('click', 'Projects', `View Project - ${projectName}`);
  };

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Featured Projects</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A selection of my work in data engineering, showcasing my skills in building scalable and efficient data systems.
          </p>
        </div>
        
        <ProjectTimeline />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
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
              <Card className="flex flex-col h-full overflow-hidden bg-card transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/40">
                <CardHeader className="p-0">
                  <div className="relative w-full h-48">
                      <Image src={project.imageUrl} alt={project.title} fill className="object-cover" data-ai-hint={project.aiHint} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <CardTitle className="mb-2 font-headline text-2xl text-foreground">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="default" className="bg-primary/20 text-primary border-primary/40 hover:bg-primary/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardDescription className="flex-grow text-base text-muted-foreground">{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-start gap-4 pt-4">
                  <Button asChild variant="outline" aria-label={`View GitHub repository for ${project.title}`} onClick={() => handleProjectClick(`${project.title} - GitHub`)}>
                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild aria-label={`View details for ${project.title}`} onClick={() => handleProjectClick(`${project.title} - Details`)}>
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
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
