
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { RadialProgress } from './radial-progress';
import { skillCategories } from './skills-chart';

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
