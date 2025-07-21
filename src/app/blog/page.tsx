
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 text-center md:text-left mb-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl font-headline">Data Engineering & AI Blog</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore insights on data, technology, and professional growth. Use the filters below to find what you're looking for.
              </p>
            </div>
            <Button asChild>
              <Link href="/blog/new">
                <PlusCircle className="mr-2 h-5 w-5" />
                Generate New Post
              </Link>
            </Button>
          </div>

          <BlogClientPage posts={allPosts} />
          
        </div>
      </main>
      <Footer />
    </>
  );
}
