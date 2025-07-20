
"use client";

import Link from 'next/link';
import { Home, User, Briefcase, Rss, FileText, MessageSquare, Code } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Preloader from './preloader';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';


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
  const { setOpenMobile, isMobile } = useSidebar();
  const [activeLink, setActiveLink] = useState(pathname);

  const handleScroll = useCallback(() => {
    const sections = navLinks
      .map(link => (link.href.startsWith('/#') ? link.href.substring(2) : null))
      .filter(Boolean)
      .map(id => document.getElementById(id as string));

    let currentSection = '/';
    // Add a bit of offset to trigger the active link earlier
    const scrollOffset = window.innerHeight / 3;

    for (const section of sections) {
        if (section && section.offsetTop <= window.scrollY + scrollOffset) {
            currentSection = `/#${section.id}`;
        }
    }
    setActiveLink(currentSection);
  }, []);


  useEffect(() => {
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Call on mount to set initial state
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // For other pages, just match the base path
      const base_path = `/${pathname.split('/')[1]}`;
      setActiveLink(base_path);
    }
  }, [pathname, handleScroll]);


  const getIsActive = (href: string) => {
    if (href.startsWith('/#')) {
        return activeLink === href;
    }
    if (href === '/') {
        return activeLink === '/';
    }
    // For nested pages like /blog/some-post
    return activeLink.startsWith(href) && href !== '/';
  };

  const handleClick = (href: string) => {
    if (isMobile) {
        setOpenMobile(false);
    }
    if (href.startsWith('/#')) {
        setActiveLink(href);
    }
  };


  return (
      <Sidebar>
        <SidebarContent>
          <SidebarHeader className="p-4">
              <Link href="/" className="flex items-center gap-2" onClick={() => handleClick('/')}>
                  <Code className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold group-data-[collapsible=icon]:hidden">
                    Turning Data into Insight
                  </span>
              </Link>
          </SidebarHeader>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton 
                  asChild
                  onClick={() => handleClick(link.href)}
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

function MainContentHeader() {
    return (
        <header className={cn(
            "sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            "border-b border-border/40 h-14 flex items-center px-4 md:hidden"
        )}>
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Link href="/" className="flex items-center gap-2">
                    <Code className="h-6 w-6 text-primary" />
                    <span className="font-bold">Turning Data into Insight</span>
                </Link>
            </div>
        </header>
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
      <div className="flex min-h-screen">
        <PortfolioSidebar />
        <div className="flex-1 flex flex-col">
          <MainContentHeader />
          <main role="main" className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
