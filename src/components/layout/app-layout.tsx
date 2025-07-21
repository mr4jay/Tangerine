
"use client";

import Link from 'next/link';
import { Home, User, Briefcase, Rss, FileText, MessageSquare, Code, PanelLeft } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Preloader from './preloader';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navLinks = [
  { name: 'Home', href: '/', icon: Home, isPage: true },
  { name: 'About', href: '/about', icon: User, isPage: true },
  { name: 'Projects', href: '/#projects', icon: Briefcase, isPage: false },
  { name: 'Blog', href: '/blog', icon: Rss, isPage: true },
  { name: 'Resume', href: '/resume', icon: FileText, isPage: true },
  { name: 'Contact', href: '/#contact', icon: MessageSquare, isPage: false },
];

const NavContent = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [openMobile, setOpenMobile] = useState(false);

  const handleScroll = useCallback(() => {
    const sections = navLinks
      .filter(link => link.href.startsWith('/#'))
      .map(link => document.getElementById(link.href.substring(2)));
    
    let currentSectionId = '';
    const scrollOffset = window.innerHeight * 0.4;

    for (const section of sections) {
      if (section && section.offsetTop <= window.scrollY + scrollOffset) {
        currentSectionId = `/#${section.id}`;
      }
    }

    if (pathname === '/') {
        setActiveLink(currentSectionId || '/');
    } else {
        const base_path = `/${pathname.split('/')[1]}`;
        setActiveLink(base_path);
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const getIsActive = (href: string) => {
    if (href.startsWith('/#')) {
        return activeLink === href;
    }
    return pathname.startsWith(href) && href !== '/';
  };

  return (
    <nav className="flex flex-col gap-2 p-2">
      {navLinks.map((link) => (
        <Tooltip key={link.href}>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant={getIsActive(link.href) ? 'default' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setOpenMobile(false)}
            >
              <Link href={link.href}>
                <link.icon className="h-5 w-5" />
                <span className="group-data-[collapsed=true]:hidden">{link.name}</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" align="center" className="group-data-[collapsed=false]:hidden">
            {link.name}
          </TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
};


function SidebarNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
        <div 
            data-collapsed={isCollapsed}
            className={cn(
                "hidden md:flex flex-col border-r bg-background transition-[width] duration-300",
                isCollapsed ? "w-14" : "w-56",
                "group"
            )}
        >
            <div className="flex h-16 items-center justify-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-bold">
                    <Code className="h-6 w-6 text-primary" />
                    <span className={cn("truncate", isCollapsed && "hidden")}>Data Insight</span>
                </Link>
            </div>
            <NavContent />
            <div className="mt-auto flex flex-col items-center gap-2 p-2 border-t">
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsCollapsed(!isCollapsed)}>
                     <PanelLeft className="h-5 w-5" />
                </Button>
                <ThemeToggle />
            </div>
        </div>
    </TooltipProvider>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm md:hidden">
      <Link href="/" className="flex items-center gap-2 font-bold">
        <Code className="h-6 w-6 text-primary" />
        <span className="truncate">Data Insight</span>
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-56 p-0">
           <div className="flex h-16 items-center justify-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-bold">
                    <Code className="h-6 w-6 text-primary" />
                    <span className="truncate">Data Insight</span>
                </Link>
            </div>
          <NavContent />
        </SheetContent>
      </Sheet>
    </header>
  );
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
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <div className="flex min-h-screen">
        <SidebarNav />
        <div className="flex-1 flex flex-col">
          <MobileNav />
          <main role="main" className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
