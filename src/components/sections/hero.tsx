import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AwsLogo, SnowflakeLogo, PythonLogo, DataikuLogo } from './tech-logos';

const techLogos = [
  { name: 'AWS', component: AwsLogo },
  { name: 'Snowflake', component: SnowflakeLogo },
  { name: 'Python', component: PythonLogo },
  { name: 'Dataiku', component: DataikuLogo },
];

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center bg-gradient-hero animate-fade-in">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col items-center justify-center text-center">
            <div className="relative mb-6">
                <Image
                    src="https://placehold.co/150x150.png"
                    alt="Rajure Ajay Kumar Headshot"
                    width={150}
                    height={150}
                    className="rounded-full shadow-lg"
                    data-ai-hint="professional portrait"
                    priority
                />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#F7FAFC]">
              Senior Data Engineer
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              Building Scalable Data Solutions
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-[#E2E8F0] mb-8">
              6+ years driving impact with AWS, Snowflake, and AI
            </p>
            <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out">
              <Link href="#projects" aria-label="Explore My Work">
                Explore My Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden bg-transparent">
        <div className="w-[200%] h-full flex items-center">
            <div className="w-full flex justify-around items-center animate-marquee">
                {[...techLogos, ...techLogos].map((logo, index) => (
                    <logo.component key={index} className="h-10 md:h-12 w-auto text-muted-foreground/60" />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
