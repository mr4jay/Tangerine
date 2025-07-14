"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const socialLinks = [
    {
        icon: Mail,
        name: 'Email',
        value: 'rajure.ajay.kumar@email.com',
        href: 'mailto:rajure.ajay.kumar@email.com',
        cta: 'Send an email'
    },
    {
        icon: Linkedin,
        name: 'LinkedIn',
        value: 'linkedin.com/in/rajure-ajay-kumar',
        href: 'https://linkedin.com/in/your-profile',
        cta: 'Connect on LinkedIn'
    },
    {
        icon: Github,
        name: 'GitHub',
        value: 'github.com/rajure-ajay',
        href: 'https://github.com/your-profile',
        cta: 'View on GitHub'
    },
]

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Get In Touch</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I'm currently open to new opportunities. Fill out the form below or connect with me on social media.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
                <Card className="bg-card border-none shadow-lg">
                    <CardContent className="p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Name" {...field} className="bg-background border-border/60"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your.email@example.com" {...field} className="bg-background border-border/60"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Your message here..." {...field} className="bg-background border-border/60" rows={5}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full transition-transform hover:scale-105" size="lg">Send Message</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>
             <motion.div 
                className="space-y-6 flex flex-col justify-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
             >
                {socialLinks.map((link) => (
                    <Card key={link.name} className="bg-card border-none shadow-lg p-4 transition-transform hover:scale-105">
                        <Link href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                            <link.icon className="h-8 w-8 text-primary" />
                            <div>
                                <h3 className="text-lg font-semibold">{link.name}</h3>
                                <p className="text-muted-foreground break-all text-sm">{link.value}</p>
                                <span className="text-primary text-sm font-medium mt-1 inline-block">{link.cta}</span>
                            </div>
                        </Link>
                    </Card>
                ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}
