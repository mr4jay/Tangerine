
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
    slug: 'enterprise-reporting-ecosystem',
    title: 'Enterprise Reporting Ecosystem',
    shortDescription: 'Architected reporting ecosystems for major clients like Omnicom Media Group, using Salesforce Datorama to reduce report turnaround time by 70%.',
    longDescription: 'As a data professional, I architected and maintained enterprise-grade reporting ecosystems using Salesforce Datorama, supporting real-time insights for over 800 marketing campaigns for clients like Omnicom Media Group. The system was designed to handle data from diverse sources such as Google Ads, Meta, and Amazon. By leveraging Datorama\'s capabilities, we were able to create a highly scalable, reliable, and cost-effective solution that served as the single source of truth for marketing analytics across multiple brands.',
    tags: ['Datorama', 'SQL', 'Marketing Analytics', 'Data Integration'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&h=600&fit=crop',
    aiHint: 'data platform architecture',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Reduced report turnaround time by 70% through automation and optimized data workflows.',
      'Led the full implementation cycle of Datorama solutions, from data source mapping to final dashboard delivery.',
      'Standardized data with Harmonization Center, unifying disparate campaign naming conventions and KPI structures.',
      'Designed dynamic dashboards for stakeholders across media planning, client services, and strategy teams.'
    ],
    techStack: [
      { category: 'Marketing Cloud', items: ['Salesforce Datorama'] },
      { category: 'Data Integration', items: ['TotalConnect', 'LiteConnect', 'API'] },
      { category: 'Data Modeling', items: ['Data Model Editor', 'Harmonization Center'] },
      { category: 'Languages', items: ['SQL'] }
    ],
    metrics: [
        { label: 'Report Turnaround Reduction', value: 70, unit: 'percentage', description: 'Reduction in time to deliver reports to stakeholders.' },
        { label: 'Campaigns Supported', value: 800, unit: 'default', description: 'Number of marketing campaigns supported by the system.' }
    ]
  },
  {
    slug: 'customer-retention-models',
    title: 'Customer Retention Models',
    shortDescription: 'Developed and deployed predictive models for Novartis (while at Team Lease), resulting in a 20% increase in customer retention rates.',
    longDescription: 'While engaged with Novartis via Team Lease, I developed and deployed predictive models to identify at-risk customers. The project involved exploring, developing, and evaluating customer-centric digital innovation solutions. The resulting models were integrated into business workflows, enabling proactive outreach and improving customer retention rates significantly. This work was primarily executed using Dataiku DSS, which facilitated rapid development and deployment.',
    tags: ['Dataiku DSS', 'Python', 'Scikit-learn', 'MLOps'],
    imageUrl: 'https://images.unsplash.com/photo-1611095790444-1dfa3c131557?q=80&w=1200&h=600&fit=crop',
    aiHint: 'predictive model graph',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Increased customer retention rates by 20% through proactive interventions.',
      'Successfully migrated Alteryx workflows to Dataiku DSS, improving workflow efficiency by 70%.',
      'Managed planning and development of metrics reports for three major brands.',
      'Collaborated with data engineering teams to optimize data storage and retrieval processes.'
    ],
     techStack: [
      { category: 'AI/ML Platform', items: ['Dataiku DSS'] },
      { category: 'Data Migration', items: ['Alteryx'] },
      { category: 'Languages', items: ['Python'] },
      { category: 'Libraries', items: ['Scikit-learn', 'Pandas', 'NumPy'] }
    ],
    metrics: [
        { label: 'Customer Retention Increase', value: 20, unit: 'percentage', description: 'Increase in customer retention rates post-deployment.' },
        { label: 'Workflow Efficiency Gain', value: 70, unit: 'percentage', description: 'Efficiency improvement from migrating Alteryx to Dataiku DSS.' }
    ]
  },
  {
    slug: 'analytical-reporting-optimization',
    title: 'Analytical Reporting Optimization',
    shortDescription: 'Created analytical reports using Alteryx at Spoors Technologies, improving data accuracy by 25% and reducing report generation time by 20%.',
    longDescription: 'At Spoors Technologies, I was responsible for creating analytical reports and optimizing data collection procedures. By leveraging Alteryx for data preparation and analysis, I was able to improve the accuracy of our reports by 25%. I also streamlined data collection processes, which resulted in a 20% reduction in the time required to generate key business reports. This allowed for more timely and reliable data-driven decision-making across the organization.',
    tags: ['Alteryx', 'SQL', 'Data Profiling', 'Reporting'],
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1200&h=600&fit=crop',
    aiHint: 'analytics dashboard',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Improved data accuracy in analytical reports by 25%.',
      'Reduced report generation time by 20% through optimized data collection.',
      'Delivered customized reports and ad-hoc analyses, enhancing data-driven decision-making.',
      'Created custom SQL queries and scripts to ensure data integrity and accuracy.'
    ],
    techStack: [
      { category: 'Data Analytics', items: ['Alteryx DSS'] },
      { category: 'Database', items: ['SQL'] },
      { category: 'BI', items: ['Tableau'] },
      { category: 'Languages', items: ['Python'] }
    ],
    metrics: [
        { label: 'Data Accuracy Improvement', value: 25, unit: 'percentage', description: 'Improvement in data accuracy for key analytical reports.' },
        { label: 'Report Generation Time Reduction', value: 20, unit: 'percentage', description: 'Reduction in time taken to generate reports.' },
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
