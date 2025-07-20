
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, ArrowLeft, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { PostData } from '@/lib/posts';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import KeyTakeaways from '@/components/blog/key-takeaways';
import AIRelatedPosts from '@/components/blog/ai-related-posts';
import ListenToPost from '@/components/blog/listen-to-this-post';

export default function ClientBlogContent({ post, allPosts }: { post: PostData; allPosts: PostData[] }) {
  if (!post) {
    notFound();
  }

  const portfolioUrl = "https://ajay-kumar-portfolio.vercel.app"; // Replace with your actual domain
  const shareUrl = `${portfolioUrl}/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const professionalHeadshotUrl = "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1200&h=630&fit=crop&crop=faces";


  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': shareUrl,
    },
    'headline': post.title,
    'description': post.excerpt,
    'image': post.imageUrl,
    'author': {
      '@type': 'Person',
      'name': 'Rajure Ajay Kumar',
      'url': portfolioUrl,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'DataCraft Portfolio',
      'logo': {
        '@type': 'ImageObject',
        'url': professionalHeadshotUrl,
      },
    },
    'datePublished': post.publishDate,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full py-12 md:py-24 lg:py-32 bg-background"
        role="main"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
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
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-primary/30 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline text-foreground mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span>{format(new Date(post.publishDate), 'MMMM dd, yyyy')}</span>
                  <span className='flex items-center gap-1'><Clock className="h-4 w-4" /> {post.readTime} min read</span>
                </div>
                
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg shadow-primary/10">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    fill 
                    className="object-cover" 
                    data-ai-hint={post.aiHint} 
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                  />
                </div>

                {post.content && <ListenToPost content={post.content} />}

                <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-4">
                  {post.contentReact}
                </div>

                {post.content && <KeyTakeaways content={post.content} />}

                <div className="mt-12 pt-8 border-t border-border/40">
                  <h3 className="text-xl font-bold mb-4">Share this post</h3>
                  <div className="flex items-center gap-4">
                    <Button asChild variant="outline" aria-label="Share on Twitter">
                      <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer">
                        <Twitter className="mr-2 h-5 w-5" />
                        Twitter
                      </a>
                    </Button>
                    <Button asChild variant="outline" aria-label="Share on LinkedIn">
                      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-5 w-5" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>

              </motion.div>
            </article>
            <aside className="mt-12 lg:mt-0">
              <div className="sticky top-24 space-y-8">
                <AIRelatedPosts currentPost={post} allPosts={allPosts} />
              </div>
            </aside>
          </div>
        </div>
      </motion.main>
    </>
  );
}
