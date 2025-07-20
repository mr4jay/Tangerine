
import Footer from '@/components/layout/footer';
import About from '@/components/sections/about';
import Certifications from '@/components/sections/certifications';
import Testimonials from '@/components/sections/testimonials';
import BackToTopButton from '@/components/layout/back-to-top-button';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
        <main>
          <div id="about"><About /></div>
          <div id="certifications"><Certifications /></div>
          <div id="testimonials"><Testimonials /></div>
        </main>
        <Footer />
        <BackToTopButton />
    </div>
  );
}
