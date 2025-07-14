import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Certifications from '@/components/sections/certifications';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import BackToTopButton from '@/components/layout/back-to-top-button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
