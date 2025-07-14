
"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Blog from '@/components/sections/blog';
import Skills from '@/components/sections/skills';
import Certifications from '@/components/sections/certifications';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import BackToTopButton from '@/components/layout/back-to-top-button';
import Preloader from '@/components/layout/preloader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000); // Simulate loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-screen flex-col bg-background"
        >
          <Header />
          <main className="flex-1">
            <Hero />
            <About />
            <Projects />
            <Blog />
            <Skills />
            <Certifications />
            <Contact />
          </main>
          <Footer />
          <BackToTopButton />
        </motion.div>
      )}
    </>
  );
}
