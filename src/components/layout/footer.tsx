import { Code, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-border/40 bg-card">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-6 max-w-7xl">
        <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">DataCraft Portfolio</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rajure Ajay Kumar. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon">
                <Link href="mailto:rajure.ajay.kumar@email.com" aria-label="Email">
                    <Mail className="h-5 w-5" />
                </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
                <Link href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                </Link>
            </Button>
             <Button asChild variant="ghost" size="icon">
                <Link href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </footer>
  );
}
