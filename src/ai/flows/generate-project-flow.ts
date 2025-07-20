'use server';
/**
 * @fileOverview An AI flow to generate a complete project entry from a topic.
 *
 * - generateProject - A function that takes a topic and returns a full project object.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { ProjectSchema } from '@/lib/projects';

export const GenerateProjectInputSchema = z.object({
  topic: z.string().describe('The main topic or title of the project. This will be used to generate all project details.'),
});
export type GenerateProjectInput = z.infer<typeof GenerateProjectInputSchema>;

export type GenerateProjectOutput = z.infer<typeof ProjectSchema>;

const prompt = ai.definePrompt({
  name: 'generateProjectPrompt',
  input: { schema: GenerateProjectInputSchema },
  output: { schema: ProjectSchema },
  prompt: `You are an expert project manager and technical writer for a data engineering portfolio. Your task is to generate a complete, well-structured project entry based on the following topic. The project should sound professional and be suitable for a portfolio aimed at recruiters and hiring managers.

Topic: {{{topic}}}

Generate all the necessary fields for the project object. Follow these guidelines:
- **slug**: Create a URL-friendly slug from the title (e.g., 'real-time-analytics-dashboard').
- **title**: Create a compelling and professional title.
- **shortDescription**: A concise, one-sentence summary of the project.
- **longDescription**: A detailed paragraph (3-4 sentences) describing the project's context, goals, and solution.
- **tags**: An array of 3-5 relevant technology or skill tags.
- **imageUrl**: Use a placeholder image from 'https://placehold.co/1200x600.png'.
- **aiHint**: Provide 2-3 keywords for finding a relevant stock photo (e.g., 'data platform architecture').
- **demoUrl**: Use '#' as a placeholder.
- **repoUrl**: Use '#' as a placeholder.
- **keyOutcomes**: An array of 3-4 bullet points highlighting the key results and achievements.
- **techStack**: An array of technology stacks used, categorized into 'Languages', 'Cloud & DevOps', 'Data Tools', etc.
- **metrics**: An array of 1-2 key performance indicators (KPIs) with a label, value, unit ('percentage', 'USD', 'default'), and a brief description.

The generated content should be plausible, professional, and showcase strong data engineering skills.
`,
});

const generateProjectFlow = ai.defineFlow(
  {
    name: 'generateProjectFlow',
    inputSchema: GenerateProjectInputSchema,
    outputSchema: ProjectSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate project data.');
    }
    return output;
  }
);

export async function generateProject(input: GenerateProjectInput): Promise<GenerateProjectOutput> {
  return generateProjectFlow(input);
}
