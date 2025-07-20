
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AwsLogo, SnowflakeLogo, PythonLogo, DataikuLogo } from './tech-logos';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTypingEffect } from '@/hooks/use-typing-effect';

const techLogos = [
  { name: 'AWS', component: AwsLogo },
  { name: 'Snowflake', component: SnowflakeLogo },
  { name: 'Python', component: PythonLogo },
  { name: 'Dataiku', component: DataikuLogo },
];

const fadeIn = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const typedTitle = useTypingEffect("Marketing Science & Data Professional", 120);
  const typedSubtitle = useTypingEffect("Streamlining DataOps Workflows", 100, 4500); // Start after a delay

  return (
    <section ref={targetRef} id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 sm:py-16">
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-hero"
        style={{ y }}
      />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.2 } },
            }}
            className="flex flex-col items-center justify-center text-center"
        >
            <motion.div variants={fadeIn(0)} className="relative mb-6">
                <Image
                    src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=150&h=150&fit=crop&crop=faces"
                    alt="Rajure Ajay Kumar Headshot"
                    width={150}
                    height={150}
                    className="rounded-full shadow-lg"
                    data-ai-hint="professional portrait"
                    priority
                />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground h-24 md:h-16">
              {typedTitle}
              <span className="animate-pulse">|</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4 h-20 md:h-12">
              {typedSubtitle}
              <span className="animate-pulse opacity-0 data-[active=true]:opacity-100" data-active={typedSubtitle.length > 0}>|</span>
            </h2>
            <motion.p variants={fadeIn(0.4)} className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              6+ years of experience driving value with Datorama, Dataiku, and advanced marketing analytics.
            </motion.p>
            <motion.div variants={fadeIn(0.5)}>
              <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out">
                <Link href="#projects" aria-label="Explore My Work">
                  Explore My Work
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden bg-transparent">
        <div className="w-[200%] h-full flex items-center">
            <div className="w-full flex justify-around items-center animate-marquee">
                {[...techLogos, ...techLogos].map((logo, index) => (
                    <logo.component key={index} className="h-10 md:h-12 w-auto text-muted-foreground/60" />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
