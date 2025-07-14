import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative w-full py-20 md:py-32 lg:py-40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-center md:text-left">
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                        Senior Data Engineer
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                        Rajure Ajay Kumar
                    </h1>
                    <p className="max-w-xl mx-auto md:mx-0 text-lg text-muted-foreground">
                        I specialize in building robust and scalable data pipelines, leveraging cloud-native technologies like AWS and Snowflake to turn raw data into actionable insights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Button asChild size="lg" className="group">
                            <Link href="#projects">
                                View My Work
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                Download CV
                                <Download className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="relative flex justify-center items-center">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                        <Image
                            src="https://placehold.co/400x400.png"
                            alt="Rajure Ajay Kumar"
                            fill
                            className="rounded-full shadow-2xl object-cover"
                            data-ai-hint="professional portrait"
                        />
                        <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
