
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Bot, User, Send } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { headerVariants, fadeIn } from '@/lib/motion';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { askAssistant } from '@/ai/flows/portfolio-assistant';
import { cn } from '@/lib/utils';


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
        href: 'https://linkedin.com/in/rajure-ajay-kumar',
        cta: 'Connect on LinkedIn'
    },
    {
        icon: Github,
        name: 'GitHub',
        value: 'github.com/rajure-ajay',
        href: 'https://github.com/rajure-ajay',
        cta: 'View on GitHub'
    },
]

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const AIChatAssistant = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom when messages change
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await askAssistant({ question: input });
            const assistantMessage: Message = { role: 'assistant', content: result.answer };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Card className="bg-card border-none shadow-lg h-[600px] flex flex-col">
            <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-lg">AI Assistant</h3>
                        <p className="text-sm text-muted-foreground">Ask me about Rajure's skills and experience.</p>
                    </div>
                </div>
                <ScrollArea className="flex-grow pr-4 -mr-4 mb-4" ref={scrollAreaRef}>
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                                {message.role === 'assistant' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn("rounded-lg p-3 max-w-sm text-sm", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                                    <p>{message.content}</p>
                                </div>
                                 {message.role === 'user' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg p-3 bg-secondary flex items-center space-x-2">
                                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></span>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                 <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t pt-4">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., What is his experience with Snowflake?"
                        className="bg-background border-border/60 flex-grow"
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-5 w-5"/>
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Get In Touch</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a question? Ask my AI assistant, or connect with me directly through social media.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              variants={fadeIn('right', 'tween', 0.2, 0.6)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
                <AIChatAssistant />
            </motion.div>
             <motion.div 
                className="space-y-6 flex flex-col justify-center"
                variants={fadeIn('left', 'tween', 0.2, 0.6)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
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
