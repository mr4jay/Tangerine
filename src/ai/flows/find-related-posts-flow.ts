'use server';
/**
 * @fileOverview An AI flow to find related blog posts based on content.
 *
 * - findRelatedPosts - A function that takes a post and a list of other posts and returns related ones.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PostInfoSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
});

const FindRelatedPostsInputSchema = z.object({
  currentPostTitle: z.string().describe('The title of the current blog post.'),
  currentPostContent: z.string().describe('The full content of the current blog post.'),
  allPosts: z.array(PostInfoSchema).describe('A list of all other posts to search for related content.'),
});
export type FindRelatedPostsInput = z.infer<typeof FindRelatedPostsInputSchema>;

const FindRelatedPostsOutputSchema = z.object({
  relatedPosts: z.array(z.string()).describe('An array of 2-3 slugs of the most related posts.'),
});
export type FindRelatedPostsOutput = z.infer<typeof FindRelatedPostsOutputSchema>;

const prompt = ai.definePrompt({
  name: 'findRelatedPostsPrompt',
  input: { schema: FindRelatedPostsInputSchema },
  output: { schema: FindRelatedPostsOutputSchema },
  prompt: `You are an expert content curator for a technical blog. Your task is to identify the 2 or 3 most relevant blog posts from a provided list that are related to the current article the user is reading.

Base your decision on thematic relevance, shared technologies, and concepts. Do not just match keywords.

Current Article Title: {{{currentPostTitle}}}
Current Article Content:
---
{{{currentPostContent}}}
---

List of Available Posts (slug, title, and excerpt):
---
{{#each allPosts}}
- Slug: {{{slug}}}, Title: "{{{title}}}", Excerpt: "{{{excerpt}}}"
{{/each}}
---

Return a JSON object containing an array of the slugs for the 2-3 most related posts.
`,
});

const findRelatedPostsFlow = ai.defineFlow(
  {
    name: 'findRelatedPostsFlow',
    inputSchema: FindRelatedPostsInputSchema,
    outputSchema: FindRelatedPostsOutputSchema,
  },
  async (input) => {
    // To keep the prompt size manageable, let's limit the number of posts sent to the AI.
    // A more advanced implementation might use embeddings for a more scalable search.
    const postsForPrompt = input.allPosts.slice(0, 15);

    const { output } = await prompt({ ...input, allPosts: postsForPrompt });
    
    if (!output) {
      throw new Error('Failed to generate related posts.');
    }
    return output;
  }
);

export async function findRelatedPosts(input: FindRelatedPostsInput): Promise<FindRelatedPostsOutput> {
  return findRelatedPostsFlow(input);
}
