import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Real-time Analytics Platform',
    description: 'Developed a real-time analytics platform using AWS Kinesis, Lambda, and Snowflake for processing millions of events per second. Enabled live dashboarding for business KPIs.',
    tags: ['AWS', 'Snowflake', 'Kinesis', 'Lambda', 'React'],
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'analytics dashboard',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Data Warehouse Modernization',
    description: 'Led the migration of a legacy on-premise data warehouse to Snowflake, resulting in a 50% reduction in query times and significant cost savings.',
    tags: ['Snowflake', 'DBT', 'Airflow', 'Python'],
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'cloud migration',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'ML Pipeline with Dataiku DSS',
    description: 'Built an end-to-end machine learning pipeline using Dataiku DSS to predict customer churn. The model was deployed as a real-time API.',
    tags: ['Dataiku DSS', 'Machine Learning', 'Python', 'Scikit-learn'],
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'machine learning',
    demoUrl: '#',
    repoUrl: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Featured Projects</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A selection of my work in data engineering, showcasing my skills in building scalable and efficient data systems.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-card">
              <CardHeader className="p-0">
                <div className="relative w-full h-48">
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover" data-ai-hint={project.aiHint} />
                </div>
              </CardHeader>
              <CardContent className="pt-6 flex-grow flex flex-col">
                <CardTitle className="mb-2 font-headline">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <CardDescription className="flex-grow">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-start gap-4 pt-4">
                <Button asChild variant="outline">
                  <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
