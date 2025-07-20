
import Projects from '@/components/sections/projects';
import Blog from '@/components/sections/blog';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import BackToTopButton from '@/components/layout/back-to-top-button';
import { getSortedPostsData } from '@/lib/posts-server';


export default async function Home() {
  const blogPosts = await getSortedPostsData();

  return (
    <div className="flex min-h-screen flex-col bg-background">
        <main>
          
          <div id="projects"><Projects /></div>
          <div id="blog"><Blog posts={blogPosts} /></div>
          <div id="contact"><Contact /></div>
        </main>
        <Footer />
        <BackToTopButton />
    </div>
  );
}
