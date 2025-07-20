

import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Blog from '@/components/sections/blog';
import Skills from '@/components/sections/skills';
import Certifications from '@/components/sections/certifications';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import BackToTopButton from '@/components/layout/back-to-top-button';
import { getSortedPostsData } from '@/lib/posts';
import HomeClient from './home-client';


export default async function Home() {
  const blogPosts = await getSortedPostsData();

  return (
    <HomeClient>
        <Header />
        <main>
          <Hero />
          <div id="about"><About /></div>
          <div id="projects"><Projects /></div>
          <div id="blog"><Blog posts={blogPosts} /></div>
          <div id="skills"><Skills /></div>
          <div id="certifications"><Certifications /></div>
          <div id="testimonials"><Testimonials /></div>
          <div id="contact"><Contact /></div>
        </main>
        <Footer />
        <BackToTopButton />
    </HomeClient>
  );
}
