
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Bot, User, Send, Loader2, Briefcase, Pencil, AtSign } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
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
        value: 'rajaykumar5555@gmail.com',
        href: 'mailto:rajaykumar5555@gmail.com',
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

const HireMeForm = ({ onOpenChange }: { onOpenChange: (open: boolean) => void }) => {
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Form submitted successfully:", values);
        
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. I'll get back to you at rajaykumar5555@gmail.com shortly.",
        });
        form.reset();
        onOpenChange(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Your Name" {...field} className="pl-10" />
                                </div>
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
                                <div className="relative">
                                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="your.email@example.com" {...field} className="pl-10" />
                                </div>
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
                                 <div className="relative">
                                    <Pencil className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                                    <Textarea placeholder="Tell me about your project or opportunity..." className="resize-none pl-10" rows={5} {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <DialogFooter className="pt-4">
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
    );
};

const sampleJobDescription = "We are looking for a Senior Data Engineer with experience in building scalable data pipelines. The ideal candidate will have strong skills in Python and SQL, and experience with cloud platforms like AWS or Azure. You should be proficient with tools like Snowflake, Airflow, and Apache Spark. Experience with dbt is a plus.";


const AIChatAssistant = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const hasStarted = useRef(false);
    const [isHireModalOpen, setIsHireModalOpen] = useState(false);

    const displayContactForm = useCallback(async () => {
        setIsHireModalOpen(true);
        return { success: true };
    }, []);

    const availableTools: Record<string, (args: any) => Promise<any>> = {
        displayContactForm
    };

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
                content: result.answer 
            };
            setMessages((prev) => [...prev, assistantMessage]);
            
            handleNewAudio(result.answer, assistantMessageId);

            if (result.toolCalls) {
                for (const toolCall of result.toolCalls) {
                    const tool = availableTools[toolCall.name];
                    if (tool) {
                        await tool(toolCall.args);
                    }
                }
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
        <Dialog open={isHireModalOpen} onOpenChange={setIsHireModalOpen}>
            <DialogContent className="sm:max-w-[480px] bg-card border-border/60">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-primary"/>
                        Contact Me
                    </DialogTitle>
                    <DialogDescription>
                        Interested in working together? Fill out the form below and I'll get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>
                <HireMeForm onOpenChange={setIsHireModalOpen} />
            </DialogContent>
        </Dialog>
        <Card className="bg-card border-primary/20 h-[600px] flex flex-col shadow-lg shadow-primary/10">
            <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                    <Avatar className='border-2 border-primary'>
                        <AvatarFallback className='bg-transparent'><Bot className='text-primary'/></AvatarFallback>
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
                                    <Avatar className="h-8 w-8 border-2 border-primary">
                                        <AvatarFallback className='bg-transparent'><Bot className="h-5 w-5 text-primary"/></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn("rounded-lg p-3 max-w-sm text-sm", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                                    {message.content}
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
                 <div className="pt-2 text-center">
                    <Button variant="link" size="sm" onClick={() => setInput(`Here is a job description, can you tell me how well I match? ${sampleJobDescription}`)}>
                        Test: Analyze a Job Description
                    </Button>
                </div>
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
                    <motion.div
                      key={link.name}
                      whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
                    >
                      <Card className="bg-card border-primary/20 p-4 transition-all duration-300 ease-in-out border hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/20">
                          <Link href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group" aria-label={`Connect via ${link.name}`}>
                              <link.icon className="h-8 w-8 text-primary" />
                              <div>
                                  <h3 className="text-lg font-semibold">{link.name}</h3>
                                  <p className="text-muted-foreground break-all text-sm">{link.value}</p>

                                  <span className="text-primary text-sm font-medium mt-1 inline-block group-hover:underline">{link.cta}</span>
                              </div>
                          </Link>
                      </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}
