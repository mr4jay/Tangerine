
'use server';
/**
 * @fileOverview An AI flow to suggest blog post topics based on the portfolio content.
 *
 * - suggestPostTopics - A function that suggests blog post titles.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { getProjects } from '@/lib/projects';
import { getSortedPostsData } from '@/lib/posts-server';

const SuggestPostTopicsOutputSchema = z.object({
  topics: z.array(z.string()).describe('An array of 3-5 engaging and relevant blog post titles.'),
});
export type SuggestPostTopicsOutput = z.infer<typeof SuggestPostTopicsOutputSchema>;

const prompt = ai.definePrompt({
  name: 'suggestPostTopicsPrompt',
  output: { schema: SuggestPostTopicsOutputSchema },
  prompt: `You are an expert content strategist for a leading data engineering professional. Your task is to generate a list of 3 to 5 highly relevant and engaging blog post titles based on the provided resume, project details, and a list of existing blog posts.

The new titles should:
- Showcase expertise in the skills and technologies mentioned (e.g., Datorama, Dataiku, Snowflake, MLOps, AWS, GCP).
- Be technical enough to appeal to hiring managers and recruiters in the data space.
- Be distinct from the titles of existing blog posts.

**Resume Summary:**
---
{{{resume}}}
---

**Project Details:**
---
{{#each projects}}
- **{{title}}**: {{shortDescription}} (Technologies: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}})
{{/each}}
---

**Existing Blog Post Titles:**
---
{{#each existingTitles}}
- {{{this}}}
{{/each}}
---

Generate 3 to 5 new, compelling blog post titles now.
`,
});

const suggestPostTopicsFlow = ai.defineFlow(
  {
    name: 'suggestPostTopicsFlow',
    outputSchema: SuggestPostTopicsOutputSchema,
  },
  async () => {
    const resumePath = path.join(process.cwd(), 'resume.md');
    const resume = fs.readFileSync(resumePath, 'utf8');

    const projects = getProjects();
    const existingPosts = await getSortedPostsData();
    const existingTitles = existingPosts.map(p => p.title);
    
    // We'll take a snippet of the resume to keep the prompt focused
    const resumeSnippet = resume.substring(0, 3000);

    const { output } = await prompt({
        resume: resumeSnippet,
        projects,
        existingTitles
    });
    
    if (!output) {
      throw new Error('Failed to generate post topics.');
    }
    return output;
  }
);

export async function suggestPostTopics(): Promise<SuggestPostTopicsOutput> {
  return suggestPostTopicsFlow();
}
