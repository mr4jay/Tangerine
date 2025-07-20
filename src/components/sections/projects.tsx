
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink, Calendar, DollarSign, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '@/components/analytics';
import { cardVariants, headerVariants } from '@/lib/motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { getProjects } from '@/lib/projects';

const projects = getProjects();

const timelineData = [
  {
    company: 'Spoors',
    period: '2019 – 2021',
    title: 'Customer Churn Prediction',
    impact: '$1.2M revenue retained',
    description: 'Developed and deployed a machine learning model to predict customer churn, directly contributing to a significant increase in retained revenue.',
  },
  {
    company: 'Novartis',
    period: '2021 – 2022',
    title: 'Enterprise Data Platform',
    impact: '$3M+ cost savings',
    description: 'Architected and deployed a scalable enterprise-level data platform, achieving substantial cost savings and reducing data processing latency by 45%.',
  },
];

const TimelineNode = ({ item, index, isMobile }: { item: typeof timelineData[0], index: number, isMobile: boolean }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 50 : 0, x: isMobile ? 0 : isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={cn("relative w-full flex", isMobile ? "justify-start pl-12" : (isEven ? "justify-end pr-8" : "justify-start pl-8"), "min-h-[150px]")}
    >
      <div className={cn("absolute h-full w-0.5 bg-primary/30", isMobile ? "left-5" : "left-1/2 -translate-x-1/2")} />
      
      <Popover>
        <PopoverTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
            className={cn("absolute z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background focus:outline-none focus:ring-ring",
              isMobile ? "left-5 -translate-x-1/2 top-5" : "top-1/2 -translate-y-1/2",
              !isMobile && (isEven ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2')
            )}
            aria-label={`View details for ${item.title}`}
          >
            <Briefcase className="h-5 w-5" />
          </motion.button>
        </PopoverTrigger>
        
        <div className={cn("w-full max-w-sm rounded-lg bg-card p-4 transition-shadow hover:shadow-lg", isMobile ? 'mt-0' : 'mt-auto mb-auto')}>
          <p className="text-sm font-semibold text-primary">{item.period}</p>
          <h4 className="text-lg font-bold">{item.title}</h4>
          <p className="text-muted-foreground text-sm">{item.company}</p>
        </div>

        <PopoverContent className="w-80 bg-card border-border/80 shadow-2xl">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold font-headline">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.company}</p>
            </div>
            <p className="text-base text-foreground/90">{item.description}</p>
            <div className="flex flex-col space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{item.period}</span>
                </div>
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{item.impact}</span>
                </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  );
};


const ProjectTimeline = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative w-full max-w-md mx-auto py-8">
        {timelineData.map((item, index) => (
          <TimelineNode key={index} item={item} index={index} isMobile={true} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full py-16">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-primary/30" />
      <div className="relative flex flex-col w-full items-center">
        {timelineData.map((item, index) => (
          <TimelineNode key={index} item={item} index={index} isMobile={false} />
        ))}
      </div>
    </div>
  );
}


export default function Projects() {
  const handleProjectClick = (projectName: string) => {
    trackEvent('click', 'Projects', `View Project - ${projectName}`);
  };

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Career Highlights & Projects</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A visual timeline of my key achievements, followed by a selection of my detailed project work.
          </p>
        </motion.div>
        
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
              whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 20px -5px hsl(var(--primary) / 0.4)", transition: { duration: 0.3, ease: 'easeOut' } }}
              className="h-full"
            >
              <Card className="flex flex-col h-full overflow-hidden bg-card transition-shadow duration-300 ease-in-out">
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
                      <Badge key={tag} variant="default" className="bg-primary/20 text-primary border-primary/40 hover:bg-primary/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardDescription className="flex-grow text-base text-muted-foreground">{project.shortDescription}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-start gap-4 pt-4">
                  <Button asChild variant="outline" aria-label={`View GitHub repository for ${project.title}`} onClick={() => handleProjectClick(`${project.title} - GitHub`)}>
                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild aria-label={`View details for ${project.title}`} onClick={() => handleProjectClick(`${project.title} - Details`)}>
                    <Link href={`/projects/${project.slug}`}>
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
