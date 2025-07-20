
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cardVariants, headerVariants } from '@/lib/motion';
import type { PostData } from '@/lib/posts';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function Blog({ posts }: { posts: PostData[] }) {
  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">From the Blog</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Sharing insights and experiences from the world of data engineering and AI.
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.slice(0, 4).map((post, index) => (
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
                      <Image 
                        src={post.imageUrl} 
                        alt={post.title} 
                        fill 
                        className="object-cover" 
                        data-ai-hint={post.aiHint} 
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy" 
                      />
                  </div>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                     <span>{format(new Date(post.publishDate), 'MMMM dd, yyyy')}</span>
                     <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime} min read</span>
                  </div>
                  <CardTitle className="mb-2 font-headline text-2xl text-foreground">{post.title}</CardTitle>
                   <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0,3).map((tag) => (
                      <Badge key={tag} variant="default" className="bg-primary/20 text-primary border-primary/40">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardDescription className="flex-grow text-base text-muted-foreground">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-start pt-4">
                  <Button asChild variant="default" aria-label={`Read more about ${post.title}`}>
                    <Link href={`/blog/${post.slug}`} className="group">
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
