
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

const navLinks = [
  { name: 'Home', href: '/', icon: Code },
  { name: 'About', href: '/#about', icon: Code },
  { name: 'Projects', href: '/#projects', icon: Code },
  { name: 'Blog', href: '/blog', icon: Code },
  { name: 'Skills', href: '/#skills', icon: Code },
  { name: 'Resume', href: '/resume', icon: Code },
  { name: 'Certifications', href: '/#certifications', icon: Code },
  { name: 'Testimonials', href: '/#testimonials', icon: Code },
  { name: 'Contact', href: '/#contact', icon: Code },
];

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      hasScrolled ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
           <div className="md:hidden">
            <SidebarTrigger />
           </div>
          <Link href="/" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">DataCraft Portfolio</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function PortfolioSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
      if (pathname === '/') {
          const sections = navLinks
            .filter(link => link.href.includes('/#'))
            .map(link => document.getElementById(link.href.substring(2)))
            .filter(Boolean);

          const handleScroll = () => {
            let current = '/';
            for (const section of sections) {
              if (section && section.offsetTop <= window.scrollY + 100) {
                current = `/#${section.id}`;
              }
            }
            setActiveLink(current);
          }
          
          window.addEventListener('scroll', handleScroll, { passive: true });
          handleScroll();
          return () => window.removeEventListener('scroll', handleScroll);
      } else {
          setActiveLink(pathname);
      }

  }, [pathname]);

  const getIsActive = (href: string) => {
    if (href === '/') return activeLink === '/';
    return activeLink.startsWith(href)
  };

  return (
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
              <Link href="/" className="flex items-center gap-2" onClick={() => setOpenMobile(false)}>
                  <Code className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">DataCraft</span>
              </Link>
          </SidebarHeader>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                 <Link href={link.href} passHref legacyBehavior>
                    <SidebarMenuButton 
                      onClick={() => setOpenMobile(false)}
                      isActive={getIsActive(link.href)}
                      tooltip={link.name}
                    >
                      <link.icon />
                      <span>{link.name}</span>
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <main className="flex-1 peer-[[data-sidebar]]:md:pl-[--sidebar-width-icon]" role="main">
        {children}
      </main>
    </SidebarProvider>
  )
}
