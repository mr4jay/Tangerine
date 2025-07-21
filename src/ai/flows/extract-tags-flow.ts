
'use server';
/**
 * @fileOverview An AI flow to extract relevant tags from blog post content.
 *
 * - extractTags - A function that takes post content and returns a list of tags.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExtractTagsInputSchema = z.object({
  content: z.string().describe('The full content of the blog post in Markdown format.'),
});
export type ExtractTagsInput = z.infer<typeof ExtractTagsInputSchema>;

const ExtractTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of 3-5 relevant technical tags for the blog post.'),
});
export type ExtractTagsOutput = z.infer<typeof ExtractTagsOutputSchema>;


const prompt = ai.definePrompt({
  name: 'extractTagsPrompt',
  input: { schema: ExtractTagsInputSchema },
  output: { schema: ExtractTagsOutputSchema },
  prompt: `You are an expert technical content categorizer. Your task is to analyze the following blog post content and generate 3 to 5 highly relevant technical tags. The tags should be concise keywords or short phrases that accurately represent the main technologies, concepts, and topics discussed in the article.

Blog Post Content:
---
{{{content}}}
---

Return the tags as a JSON array of strings.
`,
});

const extractTagsFlow = ai.defineFlow(
  {
    name: 'extractTagsFlow',
    inputSchema: ExtractTagsInputSchema,
    outputSchema: ExtractTagsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate tags.');
    }
    return output;
  }
);

export async function extractTags(input: ExtractTagsInput): Promise<ExtractTagsOutput> {
  return extractTagsFlow(input);
}
