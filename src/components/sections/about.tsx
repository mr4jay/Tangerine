
"use client";

import { Button } from '@/components/ui/button';
import { Download, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { DataFlowAnimation } from './data-flow-animation';
import { trackEvent } from '@/components/analytics';
import { motion } from 'framer-motion';

const careerTimeline = [
  {
    company: 'Novartis',
    role: 'Senior Data Engineer',
    period: '2021 - Present',
  },
  {
    company: 'Spoors',
    role: 'Data Engineer',
    period: '2019 - 2021',
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const handleResumeDownload = () => {
    trackEvent('click', 'About', 'Download Resume');
  };

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="container mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24 max-w-7xl"
      >
        <div className="space-y-8">
          <motion.div variants={fadeIn} className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-foreground">About Me</h2>
            <p className="text-muted-foreground md:text-lg/relaxed">
              I am a results-driven Senior Data Engineer with over 6 years of experience in designing, developing, and deploying scalable data solutions. My work has generated over $5M in cost savings and revenue growth for leading companies.
            </p>
            <p className="text-muted-foreground md:text-lg/relaxed">
              My expertise spans the full data lifecycle, from ingestion and processing to warehousing and analytics, leveraging cutting-edge technologies like AWS, Snowflake, and Dataiku DSS. I am passionate about transforming complex datasets into actionable insights and building robust data infrastructures that empower data-driven decision-making. I thrive in collaborative environments and am always eager to tackle new challenges in the world of data and AI.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="space-y-4">
              <h3 className="text-2xl font-bold font-headline text-primary">Career Timeline</h3>
              <div className="space-y-6">
                  {careerTimeline.map((item) => (
                      <div key={item.company} className="flex items-start gap-4 group">
                           <div className="flex-shrink-0 mt-1">
                             <Briefcase className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                           </div>
                           <div>
                               <h4 className="font-semibold text-lg">{item.role}</h4>
                               <p className="text-muted-foreground">{item.company}</p>
                               <p className="text-sm text-muted-foreground/80">{item.period}</p>
                           </div>
                      </div>
                  ))}
              </div>
          </motion.div>
           <motion.div variants={fadeIn}>
            <Button asChild size="lg" className="group" onClick={handleResumeDownload}>
                <Link href="/resume.pdf" target="_blank" aria-label="Download my resume">
                  Download Resume
                  <Download className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
           </motion.div>
        </div>
         <motion.div variants={fadeIn} className="flex items-center justify-center p-4">
          <DataFlowAnimation />
        </motion.div>
      </motion.div>
    </section>
  );
}
