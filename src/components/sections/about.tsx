import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 max-w-7xl">
        <div className="relative w-full max-w-md mx-auto aspect-square">
            <Image
                src="https://placehold.co/600x600.png"
                alt="About me"
                fill
                className="rounded-xl shadow-lg object-cover"
                data-ai-hint="data visualization"
            />
        </div>
        <div className="space-y-4">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">About Me</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed">
              As a seasoned Senior Data Engineer with over 5 years of experience, I am passionate about designing, building, and maintaining scalable data infrastructures. My expertise lies in architecting solutions on AWS, implementing data warehouses with Snowflake, and orchestrating complex workflows using Dataiku DSS.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed">
              I thrive on solving complex data challenges and am committed to delivering high-quality, data-driven solutions that drive business value. My goal is to secure a challenging role with a top-tier company, aiming for a 60 LPA package, where I can contribute to innovative projects and continue to grow professionally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
