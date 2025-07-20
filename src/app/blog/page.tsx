
import Footer from '@/components/layout/footer';
import { getSortedPostsData } from '@/lib/posts-server';
import BlogClientPage from './blog-client-page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default async function BlogPage() {
  const allPosts = await getSortedPostsData();

  return (
    <>
      <main className="w-full py-12 md:py-24 lg:py-32 bg-background" role="main">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl font-headline">Data Engineering & AI Blog</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore insights on data, technology, and professional growth. Use the filters below to find what you're looking for.
            </p>
          </div>

          <BlogClientPage posts={allPosts} />
          
        </div>
      </main>
      <Footer />
    </>
  );
}
