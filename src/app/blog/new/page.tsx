
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { createPost } from '@/lib/posts';
import { BrainCircuit, Loader2 } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const formSchema = z.object({
  title: z.string().min(10, {
    message: 'Please provide a descriptive title for the post (at least 10 characters).',
  }),
  tags: z.string().optional(),
});

export default function NewPostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      tags: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      toast({
        title: 'Generating Blog Post...',
        description: 'The AI is writing your new article. This may take a minute.',
      });

      const tagArray = values.tags ? values.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
      
      const { slug } = await createPost(values.title, tagArray);

      toast({
        title: 'Post Generated Successfully!',
        description: `Redirecting you to your new blog post.`,
      });

      router.push(`/blog/${slug}`);

    } catch (error: any) {
      console.error('Failed to generate post:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'There was a problem generating your post. Please try again.',
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
                Generate New Blog Post with AI
              </CardTitle>
              <CardDescription>
                Provide a title and optional tags. The AI will generate a complete, portfolio-ready blog post, including content and a header image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Scaling Data Pipelines with Snowflake: A Deep Dive"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Snowflake, Data Pipelines, Scalability"
                            {...field}
                          />
                        </FormControl>
                         <CardDescription className="text-xs pt-1">Provide a few comma-separated tags to guide the AI.</CardDescription>
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
                      'Generate Post'
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
