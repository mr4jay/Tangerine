
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { findRelatedPosts } from '@/ai/flows/find-related-posts-flow';
import { AlertTriangle, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PostData } from '@/lib/posts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const AIRelatedPosts = ({ currentPost, allPosts }: { currentPost: PostData; allPosts: PostData[] }) => {
  const [relatedPosts, setRelatedPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const otherPosts = allPosts
            .filter(p => p.slug !== currentPost.slug)
            .map(({ slug, title, excerpt }) => ({ slug, title, excerpt }));

        if (!currentPost.content) {
            throw new Error("Current post content is not available.");
        }

        const result = await findRelatedPosts({ 
            currentPostTitle: currentPost.title,
            currentPostContent: currentPost.content,
            allPosts: otherPosts,
         });

        const foundPosts = result.relatedPosts
            .map(slug => allPosts.find(p => p.slug === slug))
            .filter((p): p is PostData => !!p);
        
        setRelatedPosts(foundPosts);

      } catch (e) {
        console.error("Failed to fetch related posts:", e);
        setError("Could not generate AI-powered recommendations at this time.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRelatedPosts();
  }, [currentPost, allPosts]);

  return (
    <div className="space-y-8">
        <h3 className="text-2xl font-bold font-headline text-primary flex items-center gap-2">
            <BrainCircuit className="h-6 w-6" />
            AI-Powered Related Posts
        </h3>
        <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div key="loading" exit={{ opacity: 0 }} className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </motion.div>
            )}
            {error && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
            {!isLoading && !error && relatedPosts.length > 0 && (
                <motion.div 
                    key="related-posts" 
                    className="space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {relatedPosts.map(post => (
                        <motion.div key={post.slug} variants={itemVariants}>
                            <Card className="bg-card border-border/60 transition-transform hover:scale-105">
                            <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                                <CardHeader>
                                <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                                </CardContent>
                            </Link>
                            </Card>
                        </motion.div>
                    ))}
              </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default AIRelatedPosts;
