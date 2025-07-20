
"use client";

import Link from 'next/link';
import { Home, User, Briefcase, Rss, FileText, MessageSquare, Code } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import Preloader from './preloader';
import { AnimatePresence } from 'framer-motion';


const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Projects', href: '/#projects', icon: Briefcase },
  { name: 'Blog', href: '/blog', icon: Rss },
  { name: 'Resume', href: '/resume', icon: FileText },
  { name: 'Contact', href: '/#contact', icon: MessageSquare },
];


export function PortfolioSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
      if (pathname.startsWith('/blog') || pathname.startsWith('/projects/') || pathname.startsWith('/resume') || pathname.startsWith('/about')) {
          const base_path = `/${pathname.split('/')[1]}`;
          setActiveLink(base_path);
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
        return activeLink.startsWith(href);
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
                  <span className="text-sm font-bold">Turning Data into Insight</span>
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0,0);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarProvider>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <PortfolioSidebar />
      <div className="flex-1 peer-[[data-sidebar]]:md:pl-[--sidebar-width-icon]" role="main">
        {children}
      </div>
    </SidebarProvider>
  )
}
