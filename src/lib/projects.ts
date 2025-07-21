
import { z } from 'zod';

export const ProjectMetricSchema = z.object({
  label: z.string(),
  value: z.number(),
  unit: z.enum(['USD', 'percentage', 'hours', 'default']),
  description: z.string(),
});
export type ProjectMetric = z.infer<typeof ProjectMetricSchema>;

const TechStackSchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

export const ProjectSchema = z.object({
  slug: z.string().describe("A URL-friendly version of the project title (e.g., 'enterprise-reporting-ecosystem')."),
  title: z.string(),
  shortDescription: z.string().describe("A concise, one-sentence summary of the project."),
  longDescription: z.string().describe("A detailed paragraph describing the project's context, goals, and solution."),
  tags: z.array(z.string()).describe("An array of 3-5 relevant technology or skill tags."),
  imageUrl: z.string().describe("The URL of a relevant header image for the project."),
  aiHint: z.string().describe("2-3 keywords for finding a relevant stock photo (e.g., 'data platform architecture')."),
  demoUrl: z.string().url().or(z.literal('#')).describe("The URL to a live demo, or '#' if not available."),
  repoUrl: z.string().url().or(z.literal('#')).describe("The URL to the GitHub repository, or '#' if not available."),
  keyOutcomes: z.array(z.string()).describe("An array of 3-4 bullet points highlighting the key results and achievements."),
  techStack: z.array(TechStackSchema).describe("An array of technology stacks used, categorized appropriately."),
  metrics: z.array(ProjectMetricSchema).describe("An array of 1-2 key performance indicators (KPIs) that showcase the project's impact."),
});
export type Project = z.infer<typeof ProjectSchema>;


let projectsData: Project[] = [
  {
    slug: 'real-time-campaign-analytics',
    title: 'Real-Time Campaign Analytics',
    shortDescription: 'Built a real-time analytics platform for PepsiCo & McDonald’s, reducing report generation time by 70% and improving campaign ROI by 15%.',
    longDescription: 'At Omnicom, I built a real-time analytics platform using Salesforce Datorama for 200+ campaigns for top-tier clients like PepsiCo and McDonald\'s. The system integrated diverse data sources like Google Ads, Meta, and CRM data via APIs. The platform automated complex data workflows, providing stakeholders with immediate, actionable insights and aligning with Google India’s real-time analytics and Infosys Topaz’s precision marketing needs.',
    tags: ['Datorama', 'Real-Time Analytics', 'Marketing', 'API Integration'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&h=600&fit=crop',
    aiHint: 'data platform architecture',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Reduced report generation time by 70% through automated data workflows.',
      'Improved campaign ROI by 15% by providing timely, data-driven insights.',
      'Developed custom metrics and Python scripts to analyze performance across channels and regions.',
      'Integrated over 15 distinct data sources using TotalConnect, LiteConnect, and custom APIs.'
    ],
    techStack: [
      { category: 'Marketing Cloud', items: ['Salesforce Datorama'] },
      { category: 'Data Integration', items: ['TotalConnect', 'LiteConnect', 'APIs'] },
      { category: 'Languages', items: ['Python', 'SQL'] },
      { category: 'Libraries', items: ['Pandas', 'NumPy'] }
    ],
    metrics: [
        { label: 'Report Generation Reduction', value: 70, unit: 'percentage', description: 'Reduction in time to deliver campaign performance reports.' },
        { label: 'Campaign ROI Improvement', value: 15, unit: 'percentage', description: 'Increase in return on investment for supported campaigns.' }
    ]
  },
  {
    slug: 'customer-retention-models',
    title: 'Predictive Modeling for Novartis',
    shortDescription: 'Developed machine learning models using Dataiku DSS to predict customer churn, increasing retention by 20% for Novartis.',
    longDescription: 'While engaged with Novartis, I developed and deployed predictive machine learning models using Dataiku DSS to identify at-risk customers for their pharmaceutical brands. This initiative involved migrating legacy Alteryx workflows, optimizing data pipelines, and leveraging AutoML capabilities. The models were successfully integrated into business workflows, enabling proactive interventions that increased customer retention by 20% and supported NVIDIA India’s healthcare AI initiatives.',
    tags: ['Dataiku DSS', 'Predictive Modeling', 'Python', 'MLOps'],
    imageUrl: 'https://images.unsplash.com/photo-1611095790444-1dfa3c131557?q=80&w=1200&h=600&fit=crop',
    aiHint: 'predictive model graph',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Increased customer retention by 20% through targeted, proactive interventions.',
      'Improved workflow efficiency by 70% by migrating Alteryx workflows to Dataiku DSS.',
      'Managed and optimized data storage and access for three major Novartis brands.',
      'Leveraged Dataiku’s AutoML for predictive modeling and SQL for data warehousing.'
    ],
     techStack: [
      { category: 'AI/ML Platform', items: ['Dataiku DSS'] },
      { category: 'Data Migration', items: ['Alteryx'] },
      { category: 'Languages', items: ['Python', 'SQL'] },
      { category: 'Libraries', items: ['Scikit-learn', 'Pandas'] }
    ],
    metrics: [
        { label: 'Customer Retention Increase', value: 20, unit: 'percentage', description: 'Increase in customer retention rates post-deployment.' },
        { label: 'Workflow Efficiency Gain', value: 70, unit: 'percentage', description: 'Efficiency improvement from migrating Alteryx to Dataiku DSS.' }
    ]
  },
  {
    slug: 'iot-data-pipeline-att',
    title: 'IoT Data Pipeline for AT&T',
    shortDescription: 'Automated data ingestion for telecom campaign analytics, integrating 10+ IoT and marketing data sources and enhancing data accuracy by 25%.',
    longDescription: 'For AT&T at Omnicom, I designed and implemented an automated data ingestion pipeline to handle high-volume data from telecom and marketing sources. Using Datorama\'s TotalConnect and LiteConnect, I integrated over 10 sources, including IoT device data. This project enhanced data accuracy by 25% and provided a scalable solution for real-time analytics, directly aligning with the 5G and IoT data engineering focus of companies like Reliance Jio.',
    tags: ['IoT', 'Data Pipeline', 'Datorama', 'Automation'],
    imageUrl: 'https://images.unsplash.com/photo-1587593202952-f0764c754645?q=80&w=1200&h=600&fit=crop',
    aiHint: 'network iot data',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Enhanced data accuracy by 25% for critical campaign analytics.',
      'Successfully integrated over 10 distinct data sources, including high-volume IoT streams.',
      'Automated the entire data ingestion and harmonization process, reducing manual effort.',
      'Built a scalable data pipeline to support real-time telecom analytics.'
    ],
    techStack: [
      { category: 'Data Integration', items: ['TotalConnect', 'LiteConnect'] },
      { category: 'Marketing Cloud', items: ['Salesforce Datorama'] },
      { category: 'Languages', items: ['Python', 'SQL'] },
      { category: 'Data Sources', items: ['IoT', 'CRM', 'Google Ads'] }
    ],
    metrics: [
        { label: 'Data Accuracy Improvement', value: 25, unit: 'percentage', description: 'Improvement in data accuracy for integrated data sources.' },
        { label: 'Data Sources Integrated', value: 10, unit: 'default', description: 'Number of distinct data sources successfully integrated.' },
    ]
  },
];

// This function now returns a copy to prevent mutation issues during hot-reloading in dev.
export function getProjects(): Project[] {
  return [...projectsData];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(p => p.slug === slug);
}

// Function to add a new project to the in-memory array.
// This is for demonstration; it won't persist across server restarts.
export function addProject(project: Project) {
  // Add to the beginning of the array so it appears first
  projectsData.unshift(project);
}
