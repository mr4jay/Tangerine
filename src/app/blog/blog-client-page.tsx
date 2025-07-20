
'use client';

import { useState, useMemo } from 'react';
import { PostData } from '@/lib/posts';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cardVariants } from '@/lib/motion';

export default function BlogClientPage({ posts }: { posts: PostData[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const allTags = useMemo(() => {
    const tags = new Set(posts.flatMap(p => p.tags));
    return ['all', ...Array.from(tags)];
  }, [posts]);

  const filteredAndSortedPosts = useMemo(() => {
    return posts
      .filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
      })
      .sort((a, b) => {
        if (sortBy === 'oldest') {
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
        }
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      });
  }, [posts, searchTerm, selectedTag, sortBy]);

  return (
    <>
      <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search blog posts"
          />
        </div>
        <div className="md:col-span-1">
          <Select onValueChange={setSelectedTag} defaultValue="all">
            <SelectTrigger aria-label="Filter by tag">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>
                  {tag === 'all' ? 'All Tags' : tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1">
          <Select onValueChange={setSortBy} defaultValue="newest">
            <SelectTrigger aria-label="Sort by date">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Sort by Newest</SelectItem>
              <SelectItem value="oldest">Sort by Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredAndSortedPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {filteredAndSortedPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="h-full"
            >
              <Card className="flex flex-col h-full overflow-hidden bg-card transition-all duration-300 ease-in-out border border-transparent hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/20">
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
                      <Badge key={tag} variant="outline" className="border-primary/30 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardDescription className="flex-grow text-base text-muted-foreground">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-start pt-4">
                  <Button asChild variant="default" aria-label={`Read more about ${post.title}`} className="group">
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No posts found. Try adjusting your search or filters.</p>
        </div>
      )}
    </>
  );
}
