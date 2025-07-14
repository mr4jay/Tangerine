import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
    {
        icon: Mail,
        name: 'Email',
        value: 'rajure.ajay.kumar@email.com',
        href: 'mailto:rajure.ajay.kumar@email.com',
    },
    {
        icon: Linkedin,
        name: 'LinkedIn',
        value: 'linkedin.com/in/rajure-ajay-kumar',
        href: 'https://linkedin.com/in/your-profile',
    },
    {
        icon: Github,
        name: 'GitHub',
        value: 'github.com/rajure-ajay',
        href: 'https://github.com/your-profile',
    },
]

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Get In Touch</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I'm currently open to new opportunities. Feel free to reach out if you have a role that matches my skills or if you'd like to connect.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((link) => (
                 <Card key={link.name} className="text-center p-6 flex flex-col items-center justify-center bg-card">
                    <link.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-1">{link.name}</h3>
                    <p className="text-muted-foreground break-all">{link.value}</p>
                    <Button asChild variant="link" className="mt-2 text-primary">
                        <Link href={link.href} target="_blank" rel="noopener noreferrer">
                            Send a message
                        </Link>
                    </Button>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
