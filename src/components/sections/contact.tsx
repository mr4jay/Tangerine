
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Bot, User, Send, Loader2, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { headerVariants, fadeIn } from '@/lib/motion';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { askAssistant } from '@/ai/flows/portfolio-assistant';
import { textToSpeech } from '@/ai/flows/tts-flow';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


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
    id: number;
    role: 'user' | 'assistant' | 'tool';
    content: string;
    audioUrl?: string;
    isAudioLoading?: boolean;
    toolResult?: any;
};

const hireMeFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message cannot exceed 1000 characters." }),
});


const HireMeModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof hireMeFormSchema>>({
        resolver: zodResolver(hireMeFormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof hireMeFormSchema>) => {
        // This is where you would typically send the form data to a backend.
        // For demonstration, we'll simulate a network request.
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Form submitted successfully:", values);
        
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. I'll get back to you shortly.",
        });
        form.reset();
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] bg-card border-border/60">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline">Contact Me</DialogTitle>
                    <DialogDescription>
                        Interested in working together? Fill out the form below and I'll get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name-input">Name</FormLabel>
                                    <FormControl>
                                        <Input id="name-input" placeholder="Your Name" {...field} />
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
                                    <FormLabel htmlFor="email-input">Email</FormLabel>
                                    <FormControl>
                                        <Input id="email-input" placeholder="your.email@example.com" {...field} />
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
                                    <FormLabel htmlFor="message-input">Message</FormLabel>
                                    <FormControl>
                                        <Textarea id="message-input" placeholder="Tell me about your project or opportunity..." className="resize-none" rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                Send Message
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


const AIChatAssistant = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isHireModalOpen, setIsHireModalOpen] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const hasStarted = useRef(false);


    useEffect(() => {
        const getInitialGreeting = async () => {
            if (hasStarted.current) return;
            hasStarted.current = true;
            setIsLoading(true);
            try {
                const result = await askAssistant({ question: 'Hello', isFirstMessage: true });
                const assistantMessageId = Date.now();
                const assistantMessage: Message = {
                    id: assistantMessageId,
                    role: 'assistant',
                    content: result.answer,
                    isAudioLoading: true
                };
                setMessages([assistantMessage]);
                handleNewAudio(result.answer, assistantMessageId);
            } catch (error) {
                 console.error("AI Assistant Error:", error);
                 const errorMessage: Message = { id: Date.now(), role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
                 setMessages([errorMessage]);
            } finally {
                setIsLoading(false);
            }
        };

        getInitialGreeting();
    }, []);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleNewAudio = async (text: string, messageId: number) => {
        try {
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === messageId
                        ? { ...m, isAudioLoading: true }
                        : m
                )
            );
            const result = await textToSpeech({ text });
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === messageId
                        ? { ...m, audioUrl: result.audio, isAudioLoading: false }
                        : m
                )
            );
        } catch (error) {
            console.error("Error generating audio:", error);
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === messageId ? { ...m, isAudioLoading: false } : m
                )
            );
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now(), role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const conversationHistory = newMessages.slice(0, -1).map(({ role, content, toolResult }) => ({ role, content, toolResult }));
            const result = await askAssistant({ question: input, history: conversationHistory });
            const assistantMessageId = Date.now() + 1;
            const assistantMessage: Message = { 
                id: assistantMessageId, 
                role: 'assistant', 
                content: result.answer,
                isAudioLoading: true
            };
            setMessages((prev) => [...prev, assistantMessage]);
            
            handleNewAudio(result.answer, assistantMessageId);

            if (result.shouldHire) {
                setIsHireModalOpen(true);
            }

        } catch (error) {
            console.error("AI Assistant Error:", error);
            const errorMessage: Message = { id: Date.now() + 1, role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
        <HireMeModal open={isHireModalOpen} onOpenChange={setIsHireModalOpen} />
        <Card className="bg-card border-none shadow-lg h-[600px] flex flex-col">
            <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-lg">AI Assistant</h3>
                        <p className="text-sm text-muted-foreground">Ask me about skills, experience, or check suitability for a role.</p>
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
                                    {message.role === 'assistant' && (
                                        <div className="mt-2">
                                            {message.isAudioLoading && <div className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Generating audio...</div>}
                                            {message.audioUrl && (
                                                <audio controls src={message.audioUrl} className="w-full h-8" />
                                            )}
                                        </div>
                                    )}
                                </div>
                                 {message.role === 'user' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                         {isLoading && messages.length > 0 && (
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
                        placeholder="e.g., Let's discuss a project"
                        className="bg-background border-border/60 flex-grow"
                        disabled={isLoading}
                        aria-label="Ask the AI assistant a question"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send question">
                        <Send className="h-5 w-5"/>
                    </Button>
                </form>
            </CardContent>
        </Card>
        </>
    )
}

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Get In Touch</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a question or an opportunity? Ask my AI assistant, or connect with me directly.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div 
              variants={fadeIn('right', 'tween', 0.2, 0.6)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="h-full"
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
                        <Link href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4" aria-label={`Connect via ${link.name}`}>
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
