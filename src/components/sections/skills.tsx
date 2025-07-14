"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    name: 'Programming',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 95 },
      { name: 'PySpark', level: 85 },
      { name: 'Scala', level: 75 },
      { name: 'Java', level: 70 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 90 },
      { name: 'Azure', level: 70 },
      { name: 'GCP', level: 65 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 80 },
      { name: 'Jenkins', level: 75 },
    ],
  },
  {
    name: 'Data Tools',
    skills: [
      { name: 'Dataiku DSS', level: 90 },
      { name: 'Snowflake', level: 95 },
      { name: 'Airflow', level: 85 },
      { name: 'Apache Spark', level: 88 },
    ],
  },
  {
    name: 'Marketing Platforms',
    skills: [
      { name: 'Salesforce Datorama', level: 80 },
      { name: 'Google Ads', level: 75 },
    ],
  },
];

const SkillProgressBar = ({ name, level }: { name: string, level: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => setProgress(level), 100);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <motion.div
      className="w-full space-y-2"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between">
        <span className="font-medium text-foreground/90">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <Progress value={progress} aria-label={`${name} proficiency`} />
    </motion.div>
  );
};


const SkillCategoryContent = ({ category }: { category: { name: string; skills: { name: string; level: number }[] } }) => (
    <Card className="bg-card border-border/60">
        <CardContent className="pt-6">
            <div className="space-y-6">
                {category.skills.map((skill) => (
                    <SkillProgressBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
            </div>
        </CardContent>
    </Card>
);

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Skills() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
              <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headerVariants}
                    className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Technical Skills</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    My proficiency in various technologies across the data engineering landscape.
                  </p>
                </motion.div>
                <Accordion type="single" collapsible className="w-full">
                  {skillCategories.map((category) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                    >
                      <AccordionItem value={category.name}>
                        <AccordionTrigger className="text-xl font-headline text-primary hover:no-underline">{category.name}</AccordionTrigger>
                        <AccordionContent>
                          <SkillCategoryContent category={category} />
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </div>
            </section>
        );
    }
    
    return (
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={headerVariants}
                className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Technical Skills</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                My proficiency in various technologies across the data engineering landscape.
              </p>
            </motion.div>
            <Tabs defaultValue={skillCategories[0].name} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                    {skillCategories.map((category) => (
                        <TabsTrigger key={category.name} value={category.name} className="text-base py-2.5">
                            {category.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {skillCategories.map((category) => (
                    <TabsContent key={category.name} value={category.name}>
                        <SkillCategoryContent category={category} />
                    </TabsContent>
                ))}
            </Tabs>
          </div>
        </section>
      );
}
