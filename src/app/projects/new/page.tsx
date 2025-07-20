
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateProject } from '@/ai/flows/generate-project-flow';
import { addProject } from '@/lib/projects';
import { BrainCircuit, Loader2 } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const formSchema = z.object({
  topic: z.string().min(10, {
    message: 'Please provide a descriptive topic for the project (at least 10 characters).',
  }),
});

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      toast({
        title: 'Generating Project...',
        description: 'The AI is crafting your new project. This may take a moment.',
      });

      const newProject = await generateProject({ topic: values.topic });
      
      // In a real app, you'd save this to a database.
      // For this demo, we're adding it to an in-memory array.
      addProject(newProject);

      toast({
        title: 'Project Generated Successfully!',
        description: `Redirecting you to the new project page for "${newProject.title}".`,
      });

      router.push(`/projects/${newProject.slug}`);

    } catch (error) {
      console.error('Failed to generate project:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem generating your project. Please try again.',
      });
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tighter font-headline flex items-center gap-2">
                <BrainCircuit className="h-8 w-8 text-primary" />
                Generate New Project with AI
              </CardTitle>
              <CardDescription>
                Describe your project in a few words. The AI will generate a complete, portfolio-ready project entry based on your topic.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Topic</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., A real-time data streaming pipeline for e-commerce analytics using Kafka and Snowflake"
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Project'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
