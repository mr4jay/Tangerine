
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { RadialProgress } from './radial-progress';

const skillCategories = [
  {
    name: 'Programming',
    skills: [
      { name: 'Python', level: 90, description: "Advanced proficiency in Python for data analysis, pipeline development, and machine learning applications." },
      { name: 'SQL', level: 95, description: "Expert in complex queries, performance tuning, and database design across various SQL dialects." },
      { name: 'PySpark', level: 85, description: "Strong experience in large-scale data processing and analytics using PySpark." },
      { name: 'Scala', level: 75, description: "Proficient in Scala for building robust and scalable data engineering solutions on the JVM." },
      { name: 'Java', level: 70, description: "Solid foundation in Java for enterprise-level application development and data services." },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 90, description: "Expertise in AWS services like S3, Glue, Kinesis, Lambda, and EMR for building end-to-end data solutions." },
      { name: 'Azure', level: 70, description: "Experience with Azure Data Factory, Synapse Analytics, and Blob Storage." },
      { name: 'GCP', level: 65, description: "Familiarity with Google Cloud services including BigQuery, Dataflow, and Cloud Storage." },
      { name: 'Docker', level: 85, description: "Proficient in containerizing applications and services for consistent deployment environments." },
      { name: 'Kubernetes', level: 80, description: "Skilled in orchestrating containerized applications for high availability and scalability." },
      { name: 'Jenkins', level: 75, description: "Experienced in setting up CI/CD pipelines for automated build, test, and deployment." },
    ],
  },
  {
    name: 'Data Tools',
    skills: [
      { name: 'Dataiku DSS', level: 90, description: "Advanced user of Dataiku for visual data preparation, model building, and MLOps." },
      { name: 'Snowflake', level: 95, description: "Deep expertise in Snowflake for cloud data warehousing, performance optimization, and data sharing." },
      { name: 'Airflow', level: 85, description: "Proficient in authoring, scheduling, and monitoring complex data workflows with Airflow." },
      { name: 'Apache Spark', level: 88, description: "Strong understanding of Spark's architecture for distributed data processing." },
    ],
  },
  {
    name: 'Marketing Platforms',
    skills: [
      { name: 'Salesforce Datorama', level: 80, description: "Skilled in integrating and visualizing marketing data within the Datorama platform." },
      { name: 'Google Ads', level: 75, description: "Experience in leveraging Google Ads data for campaign analysis and performance reporting." },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SkillCategoryContent = ({ category }: { category: (typeof skillCategories)[0] }) => (
    <Card className="bg-card border-border/60">
        <CardContent className="pt-6">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
                {category.skills.map((skill) => (
                   <motion.div key={skill.name} variants={itemVariants}>
                     <RadialProgress 
                        percentage={skill.level} 
                        label={skill.name} 
                        tooltipContent={skill.description} 
                     />
                   </motion.div>
                ))}
            </motion.div>
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
                <Accordion type="single" collapsible className="w-full" defaultValue={skillCategories[0].name}>
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
                    <TabsContent key={category.name} value={category.name} className="mt-8">
                        <SkillCategoryContent category={category} />
                    </TabsContent>
                ))}
            </Tabs>
          </div>
        </section>
      );
}
