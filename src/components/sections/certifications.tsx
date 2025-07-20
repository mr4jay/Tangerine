
"use client";

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AwsLogo, AzureLogo, GcpLogo, DataikuLogo, DatabricksLogo } from './tech-logos';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';


const certifications = [
  {
    name: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    date: 'Issued Aug 2023',
    logo: AwsLogo,
    verifyUrl: '#',
  },
  {
    name: 'Azure Data Engineer Associate',
    issuer: 'Microsoft',
    date: 'Issued Mar 2023',
    logo: AzureLogo,
    verifyUrl: '#',
  },
  {
    name: 'Google Cloud Professional Data Engineer',
    issuer: 'Google',
    date: 'Issued Dec 2022',
    logo: GcpLogo,
    verifyUrl: '#',
  },
  {
    name: 'Dataiku Core Designer',
    issuer: 'Dataiku',
    date: 'Issued Nov 2022',
    logo: DataikuLogo,
    verifyUrl: '#',
  },
    {
    name: 'Dataiku Advanced Designer',
    issuer: 'Dataiku',
    date: 'Issued Jan 2023',
    logo: DataikuLogo,
    verifyUrl: '#',
  },
  {
    name: 'Dataiku ML Practitioner',
    issuer: 'Dataiku',
    date: 'Issued Feb 2023',
    logo: DataikuLogo,
    verifyUrl: '#',
  },
    {
    name: 'Dataiku MLOps Practitioner',
    issuer: 'Dataiku',
    date: 'Issued Apr 2023',
    logo: DataikuLogo,
    verifyUrl: '#',
  },
  {
    name: 'Databricks Certified Data Engineer Associate',
    issuer: 'Databricks',
    date: 'Issued Jun 2022',
    logo: DatabricksLogo,
    verifyUrl: '#',
  }
];

const CertificationCard = ({ cert, onClick }: { cert: typeof certifications[0], onClick: () => void }) => (
  <motion.div
    layoutId={`card-container-${cert.name}`}
    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    className="p-1 cursor-pointer"
    onClick={onClick}
    aria-label={`View details for ${cert.name}`}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') onClick()}}
  >
    <Card className="flex flex-col h-full overflow-hidden bg-card shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-300 pointer-events-none">
      <CardContent className="p-6 flex-grow flex flex-col items-center text-center">
        <motion.div layoutId={`card-logo-${cert.name}`} className="mb-4">
          <cert.logo className="h-16 w-16 text-primary" />
        </motion.div>
        <CardTitle className="font-headline text-xl text-foreground mb-2">{cert.name}</CardTitle>
        <p className="text-base text-muted-foreground">{cert.issuer}</p>
        <p className="text-sm text-muted-foreground/80 mb-4">{cert.date}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const ExpandedCard = ({ cert, onClick }: { cert: typeof certifications[0], onClick: () => void }) => {
  const isMobile = useIsMobile();
  const scale = isMobile ? 1.05 : 1.1;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClick}
    >
      <motion.div className="absolute inset-0 bg-black/80" onClick={onClick}></motion.div>
      <motion.div
        layoutId={`card-container-${cert.name}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
        className="relative z-10 w-11/12 max-w-md"
      >
        <Card className="flex flex-col h-full overflow-hidden bg-card shadow-2xl shadow-primary/30">
          <CardContent className="p-8 flex-grow flex flex-col items-center text-center">
            <motion.div layoutId={`card-logo-${cert.name}`} className="mb-6">
              <cert.logo className="h-24 w-24 text-primary" />
            </motion.div>
            <CardTitle className="font-headline text-2xl text-foreground mb-2">{cert.name}</CardTitle>
            <p className="text-lg text-muted-foreground">{cert.issuer}</p>
            <p className="text-base text-muted-foreground/80 mb-6">{cert.date}</p>
          </CardContent>
          <CardFooter className="flex justify-center p-6 bg-card-darker">
            <Button asChild className="w-full" size="lg">
              <Link href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${cert.name} credential`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Verify Credential
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Certifications() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCert = selectedId ? certifications.find(c => c.name === selectedId) : null;

  return (
    <section id="certifications" className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Certifications</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Validation of my expertise through industry-recognized certifications.
          </p>
        </motion.div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {certifications.map((cert, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <CertificationCard cert={cert} onClick={() => setSelectedId(cert.name)} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
      <AnimatePresence>
        {selectedCert && (
          <ExpandedCard cert={selectedCert} onClick={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
