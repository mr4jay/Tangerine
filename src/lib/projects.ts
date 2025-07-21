
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
    title: 'Real-Time Campaign Analytics for PepsiCo and McDonald’s',
    shortDescription: 'Built a real-time analytics platform using Salesforce Datorama for 200+ campaigns, integrating Google Ads, Meta, and CRM data.',
    longDescription: 'At Omnicom, I built a real-time analytics platform using Salesforce Datorama for 200+ campaigns for top-tier clients like PepsiCo and McDonald\'s. The system integrated diverse data sources like Google Ads, Meta, and CRM data via APIs. The platform automated complex data workflows, providing stakeholders with immediate, actionable insights and aligning with Google India’s real-time analytics and Infosys Topaz’s precision marketing needs.',
    tags: ['Datorama', 'Real-Time Analytics', 'Marketing', 'API Integration'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&h=600&fit=crop',
    aiHint: 'data platform architecture',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Reduced report generation time by 70% and improved campaign ROI by 15% through custom metrics.',
      'Integrated diverse data from Google Ads, Meta, and CRM systems.',
      'Developed custom metrics and Python scripts to analyze performance across channels and regions.',
    ],
    techStack: [
      { category: 'Marketing Cloud', items: ['Salesforce Datorama'] },
      { category: 'Data Integration', items: ['TotalConnect', 'APIs'] },
      { category: 'Languages', items: ['Python', 'SQL'] },
      { category: 'Libraries', items: ['Pandas'] }
    ],
    metrics: [
        { label: 'Report Generation Reduction', value: 70, unit: 'percentage', description: 'Reduction in time to deliver campaign performance reports.' },
        { label: 'Campaign ROI Improvement', value: 15, unit: 'percentage', description: 'Increase in return on investment for supported campaigns.' }
    ]
  },
  {
    slug: 'customer-retention-models',
    title: 'Predictive Modeling for Novartis Customer Retention',
    shortDescription: 'Developed machine learning models using Dataiku DSS to predict customer churn, increasing retention by 20% for Novartis’s pharmaceutical brands.',
    longDescription: 'While engaged with Novartis, I developed and deployed predictive machine learning models using Dataiku DSS to identify at-risk customers for their pharmaceutical brands. This initiative involved migrating legacy Alteryx workflows, optimizing data pipelines, and leveraging AutoML capabilities. The models were successfully integrated into business workflows, enabling proactive interventions that increased customer retention by 20% and supported NVIDIA India’s healthcare AI initiatives.',
    tags: ['Dataiku DSS', 'Predictive Modeling', 'Python', 'MLOps'],
    imageUrl: 'https://images.unsplash.com/photo-1611095790444-1dfa3c131557?q=80&w=1200&h=600&fit=crop',
    aiHint: 'predictive model graph',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Increased retention by 20% through targeted interventions.',
      'Successfully migrated complex data workflows from Alteryx to Dataiku DSS.',
      'Leveraged Dataiku’s AutoML for predictive modeling and SQL for data warehousing.'
    ],
     techStack: [
      { category: 'AI/ML Platform', items: ['Dataiku DSS'] },
      { category: 'Languages', items: ['Python', 'Scikit-learn', 'SQL'] }
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
      'Automated the entire data ingestion and harmonization process using TotalConnect and LiteConnect.'
    ],
    techStack: [
      { category: 'Data Integration', items: ['TotalConnect', 'LiteConnect'] },
      { category: 'Marketing Cloud', items: ['Salesforce Datorama'] },
      { category: 'Languages', items: ['Python', 'APIs'] }
    ],
    metrics: [
        { label: 'Data Accuracy Improvement', value: 25, unit: 'percentage', description: 'Improvement in data accuracy for integrated data sources.' },
        { label: 'Data Sources Integrated', value: 10, unit: 'default', description: 'Number of distinct data sources successfully integrated.' },
    ]
  },
   {
    slug: 'sustainability-analytics-framework',
    title: 'Sustainability Analytics Framework',
    shortDescription: 'Configured Dataiku DSS on AWS for a retail client, optimizing energy usage analytics for sustainability reporting.',
    longDescription: 'As a freelance data analyst, I configured Dataiku DSS on an AWS virtual machine to build a sustainability analytics framework for a retail client. The project focused on optimizing energy usage analytics to support their environmental reporting goals. This initiative reduced analysis time by 50% and aligns with the AI-for-grid and IoT-for-solar initiatives at companies like ReNew Power.',
    tags: ['Sustainability', 'Dataiku DSS', 'AWS', 'Tableau'],
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&h=600&fit=crop',
    aiHint: 'renewable energy data',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Reduced sustainability report analysis time by 50%.',
      'Provided a scalable framework for ongoing energy usage analytics.',
      'Developed interactive Tableau dashboards to visualize key sustainability metrics.'
    ],
    techStack: [
      { category: 'AI/ML Platform', items: ['Dataiku DSS'] },
      { category: 'Cloud', items: ['AWS'] },
      { category: 'Visualization', items: ['Tableau'] },
      { category: 'Languages', items: ['Python'] }
    ],
    metrics: [
        { label: 'Analysis Time Reduction', value: 50, unit: 'percentage', description: 'Reduction in time required for sustainability data analysis and reporting.' }
    ]
  },
  {
    slug: 'automotive-data-visualization-ford',
    title: 'Automotive Data Visualization for Ford',
    shortDescription: 'Built Tableau dashboards to analyze campaign performance for Ford’s automotive marketing, cutting dashboard refresh time by 50%.',
    longDescription: 'For Ford at Omnicom, I developed a suite of interactive Tableau dashboards to analyze and visualize campaign performance for their automotive marketing initiatives. By optimizing the underlying SQL queries and data structures, I was able to cut the dashboard refresh time by 50%, providing faster insights to the marketing team. This project aligns with the ADAS and digital twin goals of companies like Tata Elxsi and L&T Technology Services.',
    tags: ['Tableau', 'Data Visualization', 'Automotive', 'SQL'],
    imageUrl: 'https://images.unsplash.com/photo-1553531384-411a247ccd78?q=80&w=1200&h=600&fit=crop',
    aiHint: 'car dashboard data',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Cut dashboard refresh and data update time by 50%.',
      'Provided the marketing team with near real-time insights into campaign performance.',
      'Developed and optimized complex SQL queries for performance.'
    ],
    techStack: [
      { category: 'Visualization', items: ['Tableau'] },
      { category: 'Languages', items: ['Python', 'SQL'] }
    ],
    metrics: [
        { label: 'Dashboard Refresh Speed-up', value: 50, unit: 'percentage', description: 'Improvement in the time taken for dashboards to refresh with new data.' }
    ]
  }
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
