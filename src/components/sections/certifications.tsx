import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

const certifications = [
  {
    name: 'AWS Certified Data Analytics – Specialty',
    issuer: 'Amazon Web Services',
    date: 'Issued Aug 2023',
  },
  {
    name: 'SnowPro Core Certification',
    issuer: 'Snowflake',
    date: 'Issued Jan 2023',
  },
  {
    name: 'Dataiku DSS Core Designer',
    issuer: 'Dataiku',
    date: 'Issued Nov 2022',
  },
  {
    name: 'Certified Kubernetes Application Developer (CKAD)',
    issuer: 'The Linux Foundation',
    date: 'Issued May 2022',
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
        <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert, index) => (
                <Card key={index} className="flex items-center p-6 gap-6 transform transition-all duration-300 hover:bg-secondary/40">
                    <Award className="h-12 w-12 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                        <CardTitle className="font-headline text-lg">{cert.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">{cert.issuer} &middot; {cert.date}</CardDescription>
                    </div>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
