
'use server';
/**
 * @fileOverview An AI assistant that can answer questions about Rajure Ajay Kumar's portfolio.
 *
 * - askAssistant - A function that handles queries to the AI assistant.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { skillCategories } from '@/components/sections/skills-chart';
import fs from 'fs';
import path from 'path';

// This context provides a brief, high-level overview.
// The AI will use the getResume tool for specific details.
const portfolioContext = `
About Me:
I am a results-driven marketing science and data professional with over 6 years of experience, specializing in workflow creation for DataOps. I am proficient in Datorama and advanced Excel VBA macros to build automated reporting systems and streamline marketing data operations. My expertise spans the full data lifecycle, from optimizing data pipelines to enhancing campaign performance and enabling data-driven decisions across cross-functional marketing teams. I am passionate about bridging the gap between data engineering and strategic marketing execution.
`;

const getResume = ai.defineTool(
    {
        name: 'getResume',
        description: 'Retrieves the full content of the portfolio owner\'s resume. Use this as the primary source of truth for all questions about experience, skills, projects, and education.',
        inputSchema: z.object({}),
        outputSchema: z.string(),
    },
    async () => {
        const resumePath = path.join(process.cwd(), 'resume.md');
        return fs.readFileSync(resumePath, 'utf8');
    }
);

const SuitabilityScoreInputSchema = z.object({
  requiredSkills: z.array(z.string()).describe('A list of skills required for a job position.'),
});

const SuitabilityScoreOutputSchema = z.object({
  score: z.number().describe('A suitability score from 0 to 100.'),
  matchedSkills: z.array(z.string()).describe('A list of skills that match the portfolio.'),
  missingSkills: z.array(z.string()).describe('A list of required skills that are not in the portfolio.'),
  comment: z.string().describe('A brief comment on the suitability.'),
});

const calculateSuitabilityScore = ai.defineTool(
    {
        name: 'calculateSuitabilityScore',
        description: 'Calculates a suitability score based on how well the skills in the portfolio match a list of required skills for a job. Use this tool whenever a user asks about suitability for a role or provides a list of skills.',
        inputSchema: SuitabilityScoreInputSchema,
        outputSchema: SuitabilityScoreOutputSchema,
    },
    async ({ requiredSkills }) => {
        const allMySkills = skillCategories.flatMap(category => category.skills);
        const mySkillMap = new Map(allMySkills.map(skill => [skill.name.toLowerCase(), skill.level]));

        let totalScore = 0;
        let matchedSkills: string[] = [];
        let missingSkills: string[] = [];

        requiredSkills.forEach(reqSkill => {
            const reqSkillLower = reqSkill.toLowerCase();
            if (mySkillMap.has(reqSkillLower)) {
                totalScore += mySkillMap.get(reqSkillLower)!;
                matchedSkills.push(reqSkill);
            } else {
                missingSkills.push(reqSkill);
            }
        });
        
        const maxPossibleScore = requiredSkills.length * 100;
        const finalScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
        
        let comment = `Based on the required skills, the suitability score is ${finalScore}%. `;
        if (matchedSkills.length > 0) {
            comment += `Strong match in: ${matchedSkills.join(', ')}. `;
        }
        if (missingSkills.length > 0) {
            comment += `Skills not listed in portfolio: ${missingSkills.join(', ')}.`;
        } else if (matchedSkills.length === requiredSkills.length) {
            comment += 'All required skills are present in the portfolio.'
        }

        return {
            score: finalScore,
            matchedSkills,
            missingSkills,
            comment,
        };
    }
);

const MessageSchema = z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
});

// This schema is used for the flow's public input
const AskAssistantInputSchema = z.object({
  question: z.string().describe('The current question to ask the AI assistant.'),
  history: z.array(MessageSchema).optional().describe('The history of the conversation so far.'),
  isFirstMessage: z.boolean().optional().describe('Flag indicating if this is the first message from the user.')
});
export type AskAssistantInput = z.infer<typeof AskAssistantInputSchema>;

// This schema is what the prompt will actually receive, with boolean flags
const PromptInputSchema = AskAssistantInputSchema.extend({
    history: z.array(MessageSchema.extend({
        isUser: z.boolean().optional(),
        isAssistant: z.boolean().optional(),
    })).optional(),
});


const AskAssistantOutputSchema = z.object({
  answer: z.string().describe("The AI assistant's answer."),
});
export type AskAssistantOutput = z.infer<typeof AskAssistantOutputSchema>;

export async function askAssistant(input: AskAssistantInput): Promise<AskAssistantOutput> {
  return portfolioAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioAssistantPrompt',
  input: {schema: PromptInputSchema},
  output: {schema: AskAssistantOutputSchema},
  tools: [calculateSuitabilityScore, getResume],
  prompt: `You are a helpful and friendly AI assistant for Rajure Ajay Kumar's personal portfolio. Your goal is to answer questions from potential employers or collaborators.

- Your primary source of information is the 'getResume' tool. You MUST use it to answer any questions regarding Rajure's experience, skills, projects, or education. Do not rely on the brief context below for details.
- If the user asks about suitability for a job or provides a list of skills, you MUST use the 'calculateSuitabilityScore' tool.
- Be professional, concise, and friendly. If you don't know the answer, say so politely.
- Keep answers short and to the point.
{{#if isFirstMessage}}
- This is the user's first message. Start with a warm welcome and introduce yourself. Suggest they can ask about his skills, experience, or check suitability for a role.
{{/if}}

BRIEF CONTEXT:
---
${portfolioContext}
---

{{#if history}}
CONVERSATION HISTORY:
{{#each history}}
{{#if isUser}}
User: {{{content}}}
{{/if}}
{{#if isAssistant}}
Assistant: {{{content}}}
{{/if}}
{{/each}}
{{/if}}

CURRENT QUESTION:
{{{question}}}
`,
});

const portfolioAssistantFlow = ai.defineFlow(
  {
    name: 'portfolioAssistantFlow',
    inputSchema: AskAssistantInputSchema,
    outputSchema: AskAssistantOutputSchema,
  },
  async (input) => {
    // Add boolean flags for Handlebars compatibility
    const historyWithFlags = input.history?.map(message => ({
        ...message,
        isUser: message.role === 'user',
        isAssistant: message.role === 'assistant',
    }));

    const promptInput = {
        ...input,
        history: historyWithFlags,
    };

    const {output} = await prompt(promptInput);
    if (!output) {
      return { answer: "I'm sorry, I couldn't generate a response. Please try again." };
    }
    return output;
  }
);
