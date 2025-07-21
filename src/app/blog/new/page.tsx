
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { BrainCircuit, Loader2, Sparkles, Wand2 } from 'lucide-react';
import Footer from '@/components/layout/footer';
import { createPostAction } from './actions';
import { Textarea } from '@/components/ui/textarea';
import { suggestPostTopics } from '@/ai/flows/suggest-post-topics-flow';
import { Skeleton } from '@/components/ui/skeleton';

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
  const [isSuggesting, setIsSuggesting] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      tags: '',
    },
  });

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        setIsSuggesting(true);
        const { topics } = await suggestPostTopics();
        setSuggestions(topics);
      } catch (error) {
        console.error("Failed to fetch suggestions", error);
        toast({
            variant: "destructive",
            title: "Could not load suggestions",
            description: "There was an error fetching AI topic suggestions."
        })
      } finally {
        setIsSuggesting(false);
      }
    }
    fetchSuggestions();
  }, [toast]);

  const handleSuggestionClick = (topic: string) => {
    form.setValue('title', topic);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      toast({
        title: 'Generating Blog Post...',
        description: 'The AI is writing your new article. This may take a minute.',
      });

      const tagArray = values.tags ? values.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
      
      const { slug } = await createPostAction(values.title, tagArray);

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
      <main className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tighter font-headline flex items-center gap-2">
                <BrainCircuit className="h-8 w-8 text-primary" />
                Generate New Blog Post with AI
              </CardTitle>
              <CardDescription>
                Provide a title or select a suggestion. The AI will generate a complete, portfolio-ready blog post, including content and a header image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-muted-foreground">
                        <Sparkles className="h-5 w-5 text-primary" />
                        AI-Suggested Topics
                    </h3>
                    {isSuggesting ? (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-5/6" />
                            <Skeleton className="h-8 w-3/4" />
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((topic, index) => (
                                <Button 
                                    key={index} 
                                    variant="outline"
                                    type="button"
                                    size="sm"
                                    onClick={() => handleSuggestionClick(topic)}
                                    className="text-left h-auto"
                                >
                                    {topic}
                                </Button>
                            ))}
                        </div>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Title</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Scaling Data Pipelines with Snowflake: A Deep Dive"
                            className="resize-none"
                            rows={3}
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
                      <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate Post
                      </>
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
