
"use client";

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { AwsLogo, AzureLogo, GcpLogo, DataikuLogo, DatabricksLogo } from './tech-logos';
import { motion } from 'framer-motion';

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

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
};

const CertificationCard = ({ cert, index }: { cert: typeof certifications[0], index: number }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    whileHover={{ y: -5, transition: { duration: 0.3 } }}
    className="h-full"
  >
    <Card className="flex flex-col h-full overflow-hidden bg-card shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 border border-border/60">
      <CardContent className="p-6 flex-grow flex flex-col items-center text-center">
        <cert.logo className="h-16 w-16 text-primary mb-4" />
        <CardTitle className="font-headline text-xl text-foreground mb-2 flex-grow">{cert.name}</CardTitle>
        <p className="text-base text-muted-foreground">{cert.issuer}</p>
        <p className="text-sm text-muted-foreground/80 mb-4">{cert.date}</p>
      </CardContent>
       <CardFooter className="p-4 bg-secondary/50">
          <Button asChild variant="secondary" size="sm" className="w-full">
            <Link href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${cert.name} credential`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Verify
            </Link>
          </Button>
      </CardFooter>
    </Card>
  </motion.div>
);


export default function Certifications() {
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
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {certifications.map((cert, index) => (
                <CertificationCard key={cert.name} cert={cert} index={index} />
            ))}
        </motion.div>
      </div>
    </section>
  );
}
