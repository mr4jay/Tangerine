
import { Code, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-3 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Turning Data into Insight</span>
            </Link>
             <p className="text-sm text-muted-foreground max-w-xs text-center lg:text-left">
                A showcase of my journey in data engineering, from complex pipelines to AI-driven insights.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h3 className="font-semibold text-foreground tracking-wider uppercase">Links</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-4">
             <h3 className="font-semibold text-foreground tracking-wider uppercase">Connect</h3>
             <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="icon" aria-label="Email"><Link href="mailto:rajaykumar5555@gmail.com"><Mail className="h-6 w-6 text-primary" /></Link></Button>
                <Button asChild variant="ghost" size="icon" aria-label="LinkedIn Profile"><Link href="https://linkedin.com/in/rajure-ajay-kumar" target="_blank" rel="noopener noreferrer"><Linkedin className="h-6 w-6 text-primary" /></Link></Button>
                <Button asChild variant="ghost" size="icon" aria-label="GitHub Profile"><Link href="https://github.com/rajure-ajay" target="_blank" rel="noopener noreferrer"><Github className="h-6 w-6 text-primary" /></Link></Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rajure Ajay Kumar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
