'use server';
/**
 * @fileOverview An AI flow to summarize blog post content.
 *
 * - summarizePost - A function that takes post content and returns a summary.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizePostInputSchema = z.object({
  content: z.string().describe('The full content of the blog post in Markdown format.'),
});
export type SummarizePostInput = z.infer<typeof SummarizePostInputSchema>;

const SummarizePostOutputSchema = z.object({
  summary: z.string().describe('A concise, engaging summary of the blog post, approximately 50 words long.'),
});
export type SummarizePostOutput = z.infer<typeof SummarizePostOutputSchema>;


const prompt = ai.definePrompt({
  name: 'summarizePostPrompt',
  input: { schema: SummarizePostInputSchema },
  output: { schema: SummarizePostOutputSchema },
  prompt: `You are an expert technical writer. Your task is to create a concise and compelling summary for a blog post. The summary should be approximately 50 words and capture the main points of the article, enticing users to read more.

Blog Post Content:
---
{{{content}}}
---
`,
});

const summarizePostFlow = ai.defineFlow(
  {
    name: 'summarizePostFlow',
    inputSchema: SummarizePostInputSchema,
    outputSchema: SummarizePostOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate summary.');
    }
    return output;
  }
);

export async function summarizePost(input: SummarizePostInput): Promise<SummarizePostOutput> {
  return summarizePostFlow(input);
}
