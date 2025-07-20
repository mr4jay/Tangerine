'use server';
/**
 * @fileOverview An AI flow to generate blog post content from a title and tags.
 *
 * - generatePost - A function that takes a title and tags and returns Markdown content.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GeneratePostInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  tags: z.array(z.string()).describe('A list of relevant technical tags for context.'),
});
export type GeneratePostInput = z.infer<typeof GeneratePostInputSchema>;

const GeneratePostOutputSchema = z.object({
  content: z.string().describe('The full content of the blog post in well-structured Markdown format, including headings, lists, and code blocks where appropriate. The post should be at least 500 words.'),
});
export type GeneratePostOutput = z.infer<typeof GeneratePostOutputSchema>;


const prompt = ai.definePrompt({
  name: 'generatePostPrompt',
  input: { schema: GeneratePostInputSchema },
  output: { schema: GeneratePostOutputSchema },
  prompt: `You are an expert technical writer and data engineering blogger. Your task is to write a high-quality, engaging, and informative blog post based on the provided title and tags.

The article should be at least 500 words long and well-structured. Use Markdown for formatting. Include the following elements:
- A compelling introduction.
- Multiple sections with clear headings (using '###' for h3).
- Bulleted or numbered lists to break down complex information.
- At least one relevant code block (e.g., SQL, Python) formatted with Markdown syntax.
- A concluding summary.

Make the content practical, insightful, and tailored to an audience of technical professionals, recruiters, and hiring managers in the data space.

Blog Post Title: {{{title}}}
Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Generate the full blog post content now.
`,
});

const generatePostFlow = ai.defineFlow(
  {
    name: 'generatePostFlow',
    inputSchema: GeneratePostInputSchema,
    outputSchema: GeneratePostOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate blog post content.');
    }
    return output;
  }
);

export async function generatePost(input: GeneratePostInput): Promise<GeneratePostOutput> {
  return generatePostFlow(input);
}
