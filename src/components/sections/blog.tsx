
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    title: 'Scaling Data Pipelines with Snowflake: A Deep Dive',
    excerpt: 'Explore advanced techniques for building and scaling high-throughput data pipelines using Snowflake’s powerful architecture.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'data pipeline illustration',
    postUrl: '#',
  },
  {
    title: 'Real-Time Analytics with Kafka and AWS Kinesis',
    excerpt: 'A comprehensive guide to implementing a real-time analytics engine by integrating Apache Kafka with AWS Kinesis for live data streaming.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'real-time data chart',
    postUrl: '#',
  },
  {
    title: 'The Art of MLOps: Deploying Models at Scale',
    excerpt: 'From development to deployment, this post covers the best practices for operationalizing machine learning models.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'machine learning deployment',
    postUrl: '#',
  },
  {
    title: 'Optimizing Data Warehouses for Performance',
    excerpt: 'Learn how to tune your data warehouse for maximum query performance and cost-efficiency in a cloud environment.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'database performance graph',
    postUrl: '#',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export default function Blog() {
  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">From the Blog</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Sharing insights and experiences from the world of data engineering and AI.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="h-full"
            >
              <Card className="flex flex-col h-full overflow-hidden bg-card transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/40">
                <CardHeader className="p-0">
                  <div className="relative w-full h-56">
                      <Image src={post.imageUrl} alt={post.title} fill className="object-cover" data-ai-hint={post.aiHint} sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <CardTitle className="mb-2 font-headline text-2xl text-foreground">{post.title}</CardTitle>
                  <CardDescription className="flex-grow text-base text-muted-foreground">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-start pt-4">
                  <Button asChild variant="default" aria-label={`Read more about ${post.title}`}>
                    <Link href={post.postUrl} className="group">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
