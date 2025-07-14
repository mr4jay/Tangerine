'use server';
/**
 * @fileOverview An AI assistant that can answer questions about Rajure Ajay Kumar's portfolio.
 *
 * - askAssistant - A function that handles queries to the AI assistant.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// This context should be updated with the specific details from the portfolio
const portfolioContext = `
About Me:
I am a results-driven Senior Data Engineer with over 6 years of experience in designing, developing, and deploying scalable data solutions. My work has generated over $5M in cost savings and revenue growth for leading companies. My expertise spans the full data lifecycle, from ingestion and processing to warehousing and analytics, leveraging cutting-edge technologies like AWS, Snowflake, and Dataiku DSS. I am passionate about transforming complex datasets into actionable insights and building robust data infrastructures that empower data-driven decision-making.

Career Timeline:
- Senior Data Engineer at Novartis (2021 - Present)
- Data Engineer at Spoors (2019 - 2021)

Featured Projects:
1. Enterprise Data Platform (Novartis): Architected and deployed a scalable enterprise-level data platform, achieving over $3M in cost savings and reducing data processing latency by 45%. Technologies: AWS, Snowflake, DBT, Airflow, Kinesis.
2. Customer Churn Prediction Model (Spoors): Developed and deployed a machine learning model to predict customer churn, directly contributing to a $1.2M increase in retained revenue. Technologies: Dataiku DSS, Python, Scikit-learn, MLOps.
3. Real-time Analytics Dashboard: Built a real-time analytics dashboard using AWS Kinesis and Lambda to process millions of events per second, enabling live KPI monitoring. Technologies: AWS Kinesis, Lambda, Snowflake, React.

Skills:
- Programming: Python (90%), SQL (95%), PySpark (85%), Scala (75%), Java (70%)
- Cloud & DevOps: AWS (90%), Azure (70%), GCP (65%), Docker (85%), Kubernetes (80%), Jenkins (75%)
- Data Tools: Dataiku DSS (90%), Snowflake (95%), Airflow (85%), Apache Spark (88%)
- Marketing Platforms: Salesforce Datorama (80%), Google Ads (75%)

Certifications:
- AWS Certified Solutions Architect - Associate
- Azure Data Engineer Associate
- Google Cloud Professional Data Engineer
- Dataiku Core Designer, Advanced Designer, ML Practitioner, MLOps Practitioner
- Databricks Certified Data Engineer Associate

Testimonials:
- "Ajay's work on our enterprise data platform was transformative. His architectural vision and execution led to over $3M in cost savings and a 45% reduction in data processing latency." - John Doe, Director of Engineering, Novartis
- "The customer churn prediction model Ajay developed was a game-changer for our retention strategy, directly contributing to a $1.2M increase in retained revenue." - Jane Smith, Product Manager, Spoors
`;

const AskAssistantInputSchema = z.object({
  question: z.string().describe('The question to ask the AI assistant.'),
});
type AskAssistantInput = z.infer<typeof AskAssistantInputSchema>;

const AskAssistantOutputSchema = z.object({
  answer: z.string().describe("The AI assistant's answer."),
});
type AskAssistantOutput = z.infer<typeof AskAssistantOutputSchema>;

export async function askAssistant(input: AskAssistantInput): Promise<AskAssistantOutput> {
  return portfolioAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioAssistantPrompt',
  input: {schema: AskAssistantInputSchema},
  output: {schema: AskAssistantOutputSchema},
  prompt: `You are an AI assistant for Rajure Ajay Kumar's personal portfolio. Your goal is to answer questions from potential employers or collaborators based on the information provided in this portfolio.

You must answer questions based *only* on the context provided below. If the answer is not in the context, politely state that you do not have that information. Be friendly, professional, and concise.

Keep your answers short and to the point.

CONTEXT:
---
${portfolioContext}
---

QUESTION:
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
    const {output} = await prompt(input);
    if (!output) {
      return { answer: "I'm sorry, I couldn't generate a response. Please try again." };
    }
    return output;
  }
);
