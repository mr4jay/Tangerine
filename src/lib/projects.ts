
export type ProjectMetric = {
  label: string;
  value: number;
  unit: 'USD' | 'percentage' | 'hours' | 'default';
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  aiHint: string;
  demoUrl: string;
  repoUrl: string;
  keyOutcomes: string[];
  techStack: { category: string; items: string[] }[];
  metrics: ProjectMetric[];
};

const projectsData: Project[] = [
  {
    slug: 'enterprise-reporting-ecosystem',
    title: 'Enterprise Reporting Ecosystem',
    shortDescription: 'Architected and maintained enterprise-grade reporting ecosystems at Omnicom Media Group using Salesforce Datorama, reducing report turnaround time by 70%.',
    longDescription: 'At Omnicom Media Group, I architected and maintained enterprise-grade reporting ecosystems using Salesforce Datorama, supporting real-time insights for over 800 marketing campaigns. The system was designed to handle data from diverse sources such as Google Ads, Meta, and Amazon. By leveraging Datorama\'s capabilities, we were able to create a highly scalable, reliable, and cost-effective solution that served as the single source of truth for marketing analytics across multiple brands.',
    tags: ['Datorama', 'SQL', 'Marketing Analytics', 'Data Integration'],
    imageUrl: 'https://placehold.co/1200x600.png',
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
    imageUrl: 'https://placehold.co/1200x600.png',
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
    imageUrl: 'https://placehold.co/1200x600.png',
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

export function getProjects(): Project[] {
  return projectsData;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(p => p.slug === slug);
}
