
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, ArrowLeft, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const allPosts = await getSortedPostsData();

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

export async function generateStaticParams() {
  const paths = allPosts.map(p => ({ slug: p.slug }));
  return paths;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }
  
  const shareUrl = `https://your-domain.com/blog/${post.slug}`; // Replace with actual domain
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
                        <div className="flex flex-wrap gap-2 mb-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="default" className="bg-primary/20 text-primary border-primary/40 hover:bg-primary/30 cursor-pointer">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline text-foreground mb-4">{post.title}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground mb-6">
                            <span>{format(new Date(post.publishDate), 'MMMM dd, yyyy')}</span>
                            <span className='flex items-center gap-1'><Clock className="h-4 w-4" /> {post.readTime} min read</span>
                        </div>
                        
                        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
                            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" data-ai-hint={post.aiHint} loading="lazy" />
                        </div>

                        <div 
                          className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-4"
                          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
                        />
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
