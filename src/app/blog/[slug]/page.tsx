
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

// Mock data - replace with your actual data fetching logic
const allPosts = [
  {
    title: 'Scaling Data Pipelines with Snowflake: A Deep Dive',
    slug: 'scaling-data-pipelines-with-snowflake',
    excerpt: 'Explore advanced techniques for building and scaling high-throughput data pipelines using Snowflake’s powerful architecture.',
    imageUrl: 'https://placehold.co/1200x600.png',
    aiHint: 'data pipeline architecture',
    publishDate: 'October 26, 2023',
    content: `
      <p>In the world of data engineering, scalability is king. As data volumes grow exponentially, the ability to process and analyze this data efficiently becomes a critical business advantage. This is where Snowflake shines. In this post, we'll take a deep dive into advanced techniques for building and scaling high-throughput data pipelines using Snowflake’s powerful architecture.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">Understanding Snowflake's Architecture</h3>
      <p>Snowflake's unique architecture separates compute from storage, allowing you to scale each independently. This means you can spin up virtual warehouses of various sizes to handle different workloads without affecting the underlying data. This is a game-changer for cost-efficiency and performance.</p>
      <ul class="list-disc list-inside my-4 space-y-2">
        <li><strong>Multi-cluster Warehouses:</strong> Automatically scale out to handle concurrency without performance degradation.</li>
        <li><strong>Zero-Copy Cloning:</strong> Instantly create copies of your data for development and testing without duplicating storage.</li>
        <li><strong>Time Travel:</strong> Query data as it existed at any point in the past, up to 90 days.</li>
      </ul>
      <h3 class="text-2xl font-bold mt-8 mb-4">Building a Scalable Pipeline</h3>
      <p>Let's walk through a typical data pipeline architecture. We'll ingest data from various sources like S3 and Kafka, transform it using DBT, and load it into Snowflake for analytics. We will leverage Snowpipe for continuous data ingestion, which provides a serverless and cost-effective way to load data as soon as it arrives.</p>
      <pre class="bg-gray-800 text-white p-4 rounded-md my-4 overflow-x-auto"><code>CREATE OR REPLACE PIPE my_pipe AUTO_INGEST = TRUE AS
COPY INTO my_table
FROM @my_stage
FILE_FORMAT = (TYPE = 'JSON');</code></pre>
      <p>By leveraging these features, you can build a robust, scalable, and cost-effective data platform that empowers your organization to make data-driven decisions faster than ever before.</p>
    `,
  },
  {
    title: 'Real-Time Analytics with Kafka and AWS Kinesis',
    slug: 'real-time-analytics-with-kafka-and-aws-kinesis',
    excerpt: 'A comprehensive guide to implementing a real-time analytics engine by integrating Apache Kafka with AWS Kinesis for live data streaming.',
    imageUrl: 'https://placehold.co/1200x600.png',
    aiHint: 'real time analytics',
    publishDate: 'September 15, 2023',
    content: `<p>Content for Real-Time Analytics with Kafka and AWS Kinesis.</p>`,
  },
  {
    title: 'The Art of MLOps: Deploying Models at Scale',
    slug: 'the-art-of-mlops-deploying-models-at-scale',
    excerpt: 'From development to deployment, this post covers the best practices for operationalizing machine learning models.',
    imageUrl: 'https://placehold.co/1200x600.png',
    aiHint: 'machine learning deployment',
    publishDate: 'August 05, 2023',
    content: `<p>Content for The Art of MLOps: Deploying Models at Scale.</p>`,
  },
  {
    title: 'Optimizing Data Warehouses for Performance',
    slug: 'optimizing-data-warehouses-for-performance',
    excerpt: 'Learn how to tune your data warehouse for maximum query performance and cost-efficiency in a cloud environment.',
    imageUrl: 'https://placehold.co/1200x600.png',
    aiHint: 'database performance graph',
    publishDate: 'July 12, 2023',
    content: `<p>Content for Optimizing Data Warehouses for Performance.</p>`,
  },
];


const RelatedPosts = ({ currentSlug }: { currentSlug: string }) => {
  const related = allPosts.filter(p => p.slug !== currentSlug).slice(0, 2);

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold font-headline text-primary">Related Posts</h3>
      {related.map(post => (
        <Card key={post.slug} className="bg-card border-border/60 transition-transform hover:scale-105">
          <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = encodeURIComponent(post.title);

  return (
    <>
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full py-12 md:py-24 lg:py-32 bg-background"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="mb-8">
                 <Link href="/#blog" className="inline-flex items-center text-primary hover:underline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                <article className="lg:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline text-foreground mb-4">{post.title}</h1>
                        <p className="text-muted-foreground mb-6">{post.publishDate}</p>
                        
                        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
                            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" data-ai-hint={post.aiHint} loading="lazy" />
                        </div>

                        <div 
                          className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-4"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                         <div className="mt-12 pt-8 border-t border-border/40">
                            <h3 className="text-xl font-bold mb-4">Share this post</h3>
                             <div className="flex items-center gap-4">
                                <Button asChild variant="outline" aria-label="Share on Twitter">
                                    <Link href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer">
                                        <Twitter className="mr-2 h-5 w-5" />
                                        Twitter
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" aria-label="Share on LinkedIn">
                                    <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`} target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="mr-2 h-5 w-5" />
                                        LinkedIn
                                    </Link>
                                </Button>
                            </div>
                        </div>

                    </motion.div>
                </article>
                <aside className="mt-12 lg:mt-0">
                    <div className="sticky top-24 space-y-8">
                        <RelatedPosts currentSlug={post.slug} />
                    </div>
                </aside>
            </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
