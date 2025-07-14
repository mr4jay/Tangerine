
"use client";

import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, Briefcase } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

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
    period: '2021 – Present',
    title: 'Enterprise Data Platform',
    impact: '$3M+ cost savings',
    description: 'Architected and deployed a scalable enterprise-level data platform, achieving substantial cost savings and reducing data processing latency by 45%.',
  },
];

const TimelineNode = ({ item, index, isMobile }: { item: typeof timelineData[0], index: number, isMobile: boolean }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 50 : 0, x: isMobile ? 0 : 50 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={cn("relative w-full flex justify-center", !isMobile && "w-1/2", isMobile ? "min-h-[120px]" : "")}
    >
      {!isMobile && (
        <div className={cn("absolute top-5 h-0.5 w-full",
          index === 0 ? "right-1/2 bg-gradient-to-l from-primary to-transparent" : "left-1/2 bg-gradient-to-r from-primary to-transparent"
        )} />
      )}
      {isMobile && (
        <div className="absolute left-5 top-5 h-full w-0.5 bg-primary/30" />
      )}
      <Popover>
        <PopoverTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
            className={cn("absolute z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background focus:outline-none focus:ring-ring",
              isMobile ? "left-0 -translate-x-1/2 top-5" : "top-0 -translate-y-1/2"
            )}
            aria-label={`View details for ${item.title}`}
          >
            <Briefcase className="h-5 w-5" />
          </motion.button>
        </PopoverTrigger>
        <div className={cn(
          "relative w-full rounded-lg bg-card p-4 transition-shadow hover:shadow-lg",
          isMobile ? 'ml-12' : 'flex flex-col items-center',
           !isMobile && isEven && "top-10",
           !isMobile && !isEven && "bottom-10"
        )}>
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


export default function ProjectTimeline() {
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
      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-primary/30" />
      <div className="relative flex w-full justify-between">
        {timelineData.map((item, index) => (
          <TimelineNode key={index} item={item} index={index} isMobile={false} />
        ))}
      </div>
    </div>
  );
}
