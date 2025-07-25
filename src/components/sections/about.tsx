
"use client";

import { Button } from '@/components/ui/button';
import { Download, Briefcase, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/components/analytics';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/motion';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { SkillsChart } from './skills-chart';


const careerTimeline = [
    {
    company: 'Omnicom Media Group',
    role: 'Senior Analyst',
    period: 'Sep 2023 - Feb 2025',
  },
  {
    company: 'Freelance',
    role: 'Data Analyst',
    period: 'Oct 2022 - Jul 2023',
  },
  {
    company: 'Technvision Ventures',
    role: 'Software Engineer',
    period: 'Jun 2022 - Sep 2022',
  },
  {
    company: 'Novartis (via Team Lease)',
    role: 'Data Scientist',
    period: 'May 2021 - May 2022',
  },
  {
    company: 'Spoors Technologies',
    role: 'Data Analyst',
    period: 'Sep 2018 - Mar 2021',
  },
];

export default function About() {
  const handleResumeDownload = () => {
    trackEvent('download_resume', { category: 'About', label: 'Resume' });
  };

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
      <motion.div 
        variants={staggerContainer(0.2, 0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24 max-w-7xl"
      >
        <div className="space-y-8">
          <motion.div variants={fadeIn('right', 'tween', 0.2, 0.6)} className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-foreground">About Me</h2>
            <p className="text-muted-foreground md:text-lg/relaxed">
              Dynamic data professional with a B.Tech in Information Technology and over 6 years of experience in data analytics, machine learning, and AI-driven solutions, with a focus on delivering impactful insights for global clients like Novartis, PepsiCo, Ford, and AT&T.
            </p>
            <p className="text-muted-foreground md:text-lg/relaxed">
              Proficient in Python, SQL, Salesforce Datorama, Dataiku DSS, and cloud platforms, I specialize in building predictive models and automating data pipelines. I am passionate about leveraging GenAI and IoT to drive innovation.
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
              <motion.h3 variants={fadeIn('right', 'tween', 0.1, 0.6)} className="text-2xl font-bold font-headline text-primary mb-4">Career Timeline</motion.h3>
              <div className="space-y-6">
                  {careerTimeline.map((item, index) => (
                      <motion.div 
                        key={item.company} 
                        variants={fadeIn('up', 'tween', index * 0.1, 0.5)}
                        className="flex items-start gap-4 group"
                      >
                           <div className="flex-shrink-0 mt-1">
                             <Briefcase className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                           </div>
                           <div>
                               <h4 className="font-semibold text-lg">{item.role}</h4>
                               <p className="text-muted-foreground">{item.company}</p>
                               <p className="text-sm text-muted-foreground/80">{item.period}</p>
                           </div>
                      </motion.div>
                  ))}
              </div>
          </motion.div>
           <motion.div variants={fadeIn('right', 'tween', 0.4, 0.6)} className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="group" onClick={handleResumeDownload}>
                <Link href="/resume" aria-label="View my interactive resume">
                  View Online Resume
                  <Download className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group">
                <Link href="/#contact" aria-label="Contact me">
                  <MessageSquare className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Hire Me
                </Link>
            </Button>
           </motion.div>
        </div>
         <motion.div variants={fadeIn('left', 'tween', 0.2, 0.6)} className="flex items-center justify-center p-4">
          <SkillsChart />
        </motion.div>
      </motion.div>
    </section>
  );
}
