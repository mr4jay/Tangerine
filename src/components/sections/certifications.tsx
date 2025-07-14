import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AwsLogo, AzureLogo, GcpLogo, DataikuLogo, DatabricksLogo } from './tech-logos';


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

export default function Certifications() {
  return (
    <section id="certifications" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Certifications</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Validation of my expertise through industry-recognized certifications.
          </p>
        </div>
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
                <div className="p-1">
                   <Card className="flex flex-col h-full overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-card">
                    <CardContent className="p-6 flex-grow flex flex-col items-center text-center">
                        <div className="mb-4">
                            <cert.logo className="h-16 w-16 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-xl text-foreground mb-2">{cert.name}</CardTitle>
                        <p className="text-base text-muted-foreground">{cert.issuer}</p>
                        <p className="text-sm text-muted-foreground/80 mb-4">{cert.date}</p>
                    </CardContent>
                    <CardFooter className="flex justify-center pt-0">
                         <Button asChild className="w-full">
                            <Link href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${cert.name} credential`}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Verify Credential
                            </Link>
                        </Button>
                    </CardFooter>
                   </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
