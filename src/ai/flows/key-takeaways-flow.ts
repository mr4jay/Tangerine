'use server';
/**
 * @fileOverview An AI flow to extract key takeaways from blog post content.
 *
 * - getKeyTakeaways - A function that takes post content and returns a list of takeaways.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const KeyTakeawaysInputSchema = z.object({
  content: z.string().describe('The full content of the blog post in Markdown format.'),
});
export type KeyTakeawaysInput = z.infer<typeof KeyTakeawaysInputSchema>;

const KeyTakeawaysOutputSchema = z.object({
  takeaways: z.array(z.string()).describe('An array of 3-5 concise key takeaways from the blog post.'),
});
export type KeyTakeawaysOutput = z.infer<typeof KeyTakeawaysOutputSchema>;


const prompt = ai.definePrompt({
  name: 'keyTakeawaysPrompt',
  input: { schema: KeyTakeawaysInputSchema },
  output: { schema: KeyTakeawaysOutputSchema },
  prompt: `You are an expert technical content analyst. Your task is to analyze the following blog post content and extract the 3 to 5 most important key takeaways. Each takeaway should be a single, concise sentence that summarizes a critical point, finding, or conclusion from the article.

Blog Post Content:
---
{{{content}}}
---

Return the takeaways as a JSON array of strings.
`,
});

const keyTakeawaysFlow = ai.defineFlow(
  {
    name: 'keyTakeawaysFlow',
    inputSchema: KeyTakeawaysInputSchema,
    outputSchema: KeyTakeawaysOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate key takeaways.');
    }
    return output;
  }
);

export async function getKeyTakeaways(input: KeyTakeawaysInput): Promise<KeyTakeawaysOutput> {
  return keyTakeawaysFlow(input);
}
