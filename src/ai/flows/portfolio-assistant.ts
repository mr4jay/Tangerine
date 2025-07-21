
'use server';
/**
 * @fileOverview An AI assistant that can answer questions about Rajure Ajay Kumar's portfolio.
 *
 * - askAssistant - A function that handles queries to the AI assistant.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { skillCategories } from '@/components/sections/skills-chart';
import { getProjects } from '@/lib/projects';
import { getSortedPostsData } from '@/lib/posts-server';
import fs from 'fs';
import path from 'path';

// This context provides a brief, high-level overview.
// The AI will use the getResume tool for specific details.
const portfolioContext = `
Dynamic data professional with a B.Tech in Information Technology and over 6 years of experience in data analytics, machine learning, and AI-driven solutions, with a focus on delivering impactful insights for global clients like Novartis, PepsiCo, Ford, and AT&T. Proficient in Python, SQL, Salesforce Datorama, Dataiku DSS, Tableau, AWS, and GCP, I specialize in building predictive models, automating data pipelines, and optimizing processes for industries including pharmaceuticals, FMCG, automotive, telecom, and sustainability.

Key Projects:
- Real-Time Campaign Analytics for PepsiCo & McDonald's.
- Predictive Customer Retention Modeling for Novartis.
- IoT Data Pipeline for AT&T.

Recent Blog Posts:
- MLOps in Pharma: Deploying Models at Scale
- Optimizing Marketing Analytics with Datorama
- Scaling Data Pipelines with Snowflake
`;

const getResume = ai.defineTool(
    {
        name: 'getResume',
        description: 'Retrieves the full content of the portfolio owner\'s resume. You MUST use this to answer any specific questions about experience, skills, projects, and education.',
        inputSchema: z.object({}),
        outputSchema: z.string(),
    },
    async () => {
        const resumePath = path.join(process.cwd(), 'resume.md');
        return fs.readFileSync(resumePath, 'utf8');
    }
);

const displayContactForm = ai.defineTool(
    {
        name: 'displayContactForm',
        description: 'Presents the user with a contact form to discuss a job opportunity, project, or collaboration. Use this tool *any* time the user expresses interest in hiring, offering a job, or discussing a potential project. Do not ask for their details yourself; use this tool to show them the form.',
        inputSchema: z.object({}),
        outputSchema: z.object({ success: z.boolean() }),
    },
    async () => {
        // This tool's purpose is to be called by the AI.
        // The front-end will interpret the tool call and open the modal.
        // We just need to return a success indicator.
        return { success: true };
    }
);


const SuitabilityScoreInputSchema = z.object({
  jobDescription: z.string().describe('The full text of a job description.'),
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
        description: 'Analyzes a job description to extract key skills and calculates a suitability score based on how well the skills in the portfolio match. Use this tool whenever a user provides a job description or asks about suitability for a role.',
        inputSchema: SuitabilityScoreInputSchema,
        outputSchema: SuitabilityScoreOutputSchema,
    },
    async ({ jobDescription }) => {
        // Nested AI call to extract skills from the job description
        const skillExtractionResponse = await ai.generate({
            prompt: `You are an expert HR analyst. Extract the key technical skills and qualifications from the following job description. Focus on programming languages, cloud platforms, data tools, and specific software. Return a simple comma-separated list of these skills.

Job Description:
---
${jobDescription}
---`,
            output: {
                format: 'text',
            },
            config: {
                temperature: 0.1,
            },
        });
        
        const requiredSkills = skillExtractionResponse.text.split(',').map(s => s.trim()).filter(Boolean);

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
        
        let comment = `Based on the job description, the suitability score is ${finalScore}%. `;
        if (matchedSkills.length > 0) {
            comment += `Strong match in: ${matchedSkills.join(', ')}. `;
        }
        if (missingSkills.length > 0) {
            comment += `Skills not listed in portfolio: ${missingSkills.join(', ')}.`;
        } else if (matchedSkills.length > 0 && matchedSkills.length === requiredSkills.length) {
            comment += 'All identified skills are present in the portfolio.'
        } else {
            comment += "Could not identify specific required skills in the provided text."
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
    role: z.enum(['user', 'assistant', 'tool']),
    content: z.string(),
    toolResult: z.any().optional(),
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
        isTool: z.boolean().optional(),
    })).optional(),
});


const AskAssistantOutputSchema = z.object({
  answer: z.string().describe("The AI assistant's answer."),
  toolCalls: z.array(z.object({
      name: z.string(),
      args: z.any(),
  })).optional().describe("A list of tool calls made by the assistant."),
});
export type AskAssistantOutput = z.infer<typeof AskAssistantOutputSchema>;

export async function askAssistant(input: AskAssistantInput): Promise<AskAssistantOutput> {
  return portfolioAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioAssistantPrompt',
  input: {schema: PromptInputSchema},
  output: {schema: AskAssistantOutputSchema},
  tools: [calculateSuitabilityScore, getResume, displayContactForm],
  prompt: `You are a helpful and professional AI assistant for Rajure Ajay Kumar's personal portfolio. Your goal is to answer questions from potential employers or collaborators.

- Keep your answers concise and professional.
- Use the high-level context provided below for general questions.
- For very specific details about past roles, dates, or specific project outcomes, you MUST use the 'getResume' tool to get the full, detailed resume content.
- If the user provides a job description or asks about suitability for a role, you MUST use the 'calculateSuitabilityScore' tool.
- If the user expresses ANY interest in hiring, collaboration, or discussing a project, you MUST respond conversationally and then use the 'displayContactForm' tool. Example: "I can help with that. I'll bring up a contact form for you."

{{#if isFirstMessage}}
- This is the user's first message. Your initial response should be: "Hello! I'm an AI assistant for Rajure Ajay Kumar's portfolio. You can ask me about his experience, or provide a job description for a suitability analysis. How can I help?"
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
{{#if isTool}}
Tool: {{{content}}}
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
        isTool: message.role === 'tool'
    }));

    const promptInput = {
        ...input,
        history: historyWithFlags,
    };

    const {output, history} = await prompt(promptInput);
    if (!output) {
      return { answer: "I'm sorry, I couldn't generate a response. Please try again." };
    }
    
    // Check for tool calls in the last response
    const lastResponse = Array.isArray(history) ? history.at(-1) : undefined;
    const toolCalls = lastResponse?.message.toolRequest?.calls.map(req => ({
        name: req.name,
        args: req.input,
    }));


    return { ...output, toolCalls };
  }
);
