
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';
import { cardVariants, headerVariants } from '@/lib/motion';

const testimonials = [
  {
    quote: "Ajay's work on our enterprise reporting ecosystems was transformative. His architectural vision for Datorama and execution led to a 70% reduction in report turnaround time. He is a top-tier analyst.",
    author: 'John Doe',
    role: 'Director of Analytics, Omnicom Media Group',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&fit=crop&crop=faces',
    aiHint: 'male portrait',
  },
  {
    quote: "The customer churn prediction model Ajay developed was a game-changer for our retention strategy, directly contributing to a 20% increase in customer retention. His machine learning skills are exceptional.",
    author: 'Jane Smith',
    role: 'Product Manager, Spoors Technologies',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop&crop=faces',
    aiHint: 'female portrait',
  },
  {
    quote: "Working with Ajay is a pleasure. He possesses a rare combination of deep technical expertise and strong communication skills. He can take a complex business problem and translate it into a robust, scalable data solution.",
    author: 'Samuel Green',
    role: 'Lead Data Scientist, Novartis',
    avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=100&h=100&fit=crop&crop=faces',
    aiHint: 'male portrait professional',
  },
    {
    quote: "Ajay consistently delivers high-quality work, and his attention to detail is remarkable. He optimized our data collection procedures, reducing report generation time by 20%.",
    author: 'Priya Patel',
    role: 'Senior Analyst, Spoors Technologies',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop&crop=faces',
    aiHint: 'female portrait professional',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">What Others Say</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Professional endorsements from colleagues and leaders who have witnessed my impact firsthand.
          </p>
        </motion.div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                 <motion.div
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
                    className="p-4 h-full"
                 >
                    <Card className="flex flex-col h-full overflow-hidden bg-card shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
                        <CardContent className="p-8 flex-grow flex flex-col justify-between">
                            <Quote className="h-8 w-8 text-primary mb-4" />
                            <blockquote className="text-lg text-foreground/90 flex-grow">
                                "{testimonial.quote}"
                            </blockquote>
                            <div className="mt-8 flex items-center gap-4">
                                <Image 
                                    src={testimonial.avatarUrl} 
                                    alt={testimonial.author} 
                                    width={64} 
                                    height={64} 
                                    className="rounded-full"
                                    data-ai-hint={testimonial.aiHint}
                                />
                                <div>
                                    <p className="font-bold text-lg text-foreground">{testimonial.author}</p>
                                    <p className="text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                 </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
