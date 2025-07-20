
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
import { getSortedPostsData } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

// This context provides a brief, high-level overview.
// The AI will use the getResume tool for specific details.
const portfolioContext = `
About Me:
Marketing science and Data professional with 6 years of experience, specializing in workflow creation for DataOps. Proficient in Datorama and advanced Excel VBA macros to build automated reporting systems and streamline marketing data operations. Skilled at optimizing data pipelines, enhancing campaign performance, and enabling data-driven decisions across cross-functional marketing teams. Known for bridging the gap between data engineering and strategic marketing execution.
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

const getRecentUpdates = ai.defineTool(
    {
        name: 'getRecentUpdates',
        description: "Retrieves the latest project and blog post from the portfolio. Use this tool *only* for the user's first message to provide them with a quick update on recent work.",
        inputSchema: z.object({}),
        outputSchema: z.object({
            latestProject: z.string().optional(),
            latestPost: z.string().optional(),
        }),
    },
    async () => {
        const projects = getProjects();
        const posts = await getSortedPostsData();

        const latestProject = projects.length > 0
            ? `Project: "${projects[0].title}". Summary: ${projects[0].shortDescription}`
            : undefined;

        const latestPost = posts.length > 0
            ? `Blog Post: "${posts[0].title}". Summary: ${posts[0].excerpt}`
            : undefined;

        return { latestProject, latestPost };
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
  tools: [calculateSuitabilityScore, getResume, displayContactForm, getRecentUpdates],
  prompt: `You are a helpful and friendly AI assistant for Rajure Ajay Kumar's personal portfolio. Your goal is to answer questions from potential employers or collaborators. After answering, you should proactively suggest a relevant next step or question.

- You MUST use the 'getResume' tool to answer any questions regarding Rajure's experience, skills, projects, or education. Do not rely on the brief context below for details.
- If the user provides a job description or asks about suitability for a role, you MUST use the 'calculateSuitabilityScore' tool.
- If the user expresses ANY interest in hiring, collaboration, or discussing a project, you MUST respond conversationally and then use the 'displayContactForm' tool. This is your primary goal. Example: "That's great to hear! I can open a contact form for you."
- Be professional, concise, and friendly. If you don't know the answer, say so politely.
- Keep answers short and to the point.
- After every response, suggest a logical next question or action. Examples: "Would you like to dive deeper into his experience with Datorama?", "Can I help you with another question?", "Shall we look at his projects that use Python?"

{{#if isFirstMessage}}
- This is the user's first message. Start with a warm welcome and introduce yourself. 
- You MUST use the 'getRecentUpdates' tool to get the latest project and blog post.
- Then, briefly mention one of the recent updates to give the user a timely insight into current work.
- Finally, suggest they can ask about his skills, experience, check suitability for a role, or discuss an opportunity.
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

    