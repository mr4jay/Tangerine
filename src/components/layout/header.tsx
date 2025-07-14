"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);

      const sections = navLinks.map(link => document.getElementById(link.href.substring(1))).filter(Boolean);
      let current = '#home';
      for (const section of sections) {
        if (section && section.offsetTop <= window.scrollY + 100) {
          current = `#${section.id}`;
        }
      }
      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (href: string) => cn(
    "text-sm font-semibold text-foreground/80 transition-all duration-300 hover:text-primary hover:scale-105 hover:opacity-90",
    "relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 after:origin-center",
    activeLink === href && "text-primary after:scale-x-100"
  );


  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      hasScrolled ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">DataCraft Portfolio</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={getLinkClass(link.href)}>
                {link.name}
              </Link>
            ))}
          </nav>
          
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <nav className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="#home" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <Code className="h-6 w-6 text-primary" />
                      <span className="text-lg font-bold">DataCraft</span>
                   </Link>
                   <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                   </Button>
                </div>
                <div className="flex flex-col p-4 space-y-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-semibold text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
                      {link.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
