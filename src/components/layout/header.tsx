
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Code, Home, User, Briefcase, Rss, Wrench, FileText, Star, Award, MessageSquare } from 'lucide-react';
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
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Projects', href: '/#projects', icon: Briefcase },
  { name: 'Blog', href: '/blog', icon: Rss },
  { name: 'Resume', href: '/resume', icon: FileText },
  { name: 'Contact', href: '/#contact', icon: MessageSquare },
];

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

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
      if (pathname.startsWith('/blog') || pathname.startsWith('/projects/') || pathname.startsWith('/resume') || pathname.startsWith('/about')) {
          setActiveLink(pathname);
          return;
      }
      
      if(pathname === '/') {
        const sections = navLinks
          .map(link => link.href.split('#')[1])
          .filter(Boolean)
          .map(id => document.getElementById(id));

        const handleScroll = () => {
          const scrollPosition = window.scrollY + 100;
          let currentSection = '/';
          
          for (const section of sections) {
              if (section && section.offsetTop <= scrollPosition) {
                  currentSection = `/#${section.id}`;
              }
          }
          setActiveLink(currentSection);
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
      }
      
  }, [pathname]);

  const getIsActive = (href: string) => {
    // Exact match for pages like /about or /blog
    if (['/about', '/blog', '/resume'].includes(href)) {
        return pathname.startsWith(href);
    }
    // Handle hash links for homepage
    if (href.includes('#')) {
        return activeLink === href;
    }
    // Handle homepage itself
    return pathname === href && activeLink === href;
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
                 <SidebarMenuButton 
                  asChild
                  onClick={() => setOpenMobile(false)}
                  isActive={getIsActive(link.href)}
                  tooltip={link.name}
                >
                  <Link href={link.href}>
                    <link.icon />
                    <span>{link.name}</span>
                  </Link>
                </SidebarMenuButton>
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
      <div className="flex-1 peer-[[data-sidebar]]:md:pl-[--sidebar-width-icon]" role="main">
        {children}
      </div>
    </SidebarProvider>
  )
}
