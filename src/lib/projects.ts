
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
};

const projectsData: Project[] = [
  {
    slug: 'enterprise-data-platform',
    title: 'Enterprise Data Platform',
    shortDescription: 'Architected and deployed a scalable enterprise-level data platform at Novartis, achieving over $3M in cost savings and reducing data processing latency by 45%.',
    longDescription: 'At Novartis, I led the architecture and deployment of a new enterprise-level data platform from the ground up. The system was designed to handle petabytes of data from various sources, including R&D, clinical trials, and sales. By leveraging a modern cloud-native stack, we were able to create a highly scalable, reliable, and cost-effective solution that served as the single source of truth for the entire organization. The platform empowered data scientists and analysts to derive insights faster, leading to significant business impact.',
    tags: ['AWS', 'Snowflake', 'DBT', 'Airflow', 'Kinesis'],
    imageUrl: 'https://placehold.co/1200x600.png',
    aiHint: 'data platform architecture',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Achieved over $3M in annual cost savings through optimized infrastructure and data processing workflows.',
      'Reduced data processing latency by 45%, enabling faster time-to-insight for business stakeholders.',
      'Successfully migrated over 50 legacy data pipelines to the new platform with zero downtime.',
      'Established a robust data governance framework, improving data quality and compliance.'
    ],
    techStack: [
      { category: 'Cloud', items: ['AWS S3', 'AWS Glue', 'AWS EMR', 'AWS Kinesis'] },
      { category: 'Data Warehouse', items: ['Snowflake'] },
      { category: 'Data Transformation', items: ['DBT'] },
      { category: 'Orchestration', items: ['Apache Airflow'] },
      { category: 'Languages', items: ['Python', 'SQL'] }
    ]
  },
  {
    slug: 'customer-churn-prediction',
    title: 'Customer Churn Prediction Model',
    shortDescription: 'Developed and deployed a machine learning model at Spoors to predict customer churn, directly contributing to a $1.2M increase in retained revenue.',
    longDescription: 'At Spoors, I developed a machine learning model to predict customer churn with high accuracy. The project involved the entire MLOps lifecycle, from data exploration and feature engineering to model training, validation, and deployment. The model was integrated into the company\'s CRM system, providing the customer success team with a prioritized list of at-risk customers and enabling proactive retention efforts. The system was built using Dataiku DSS, which streamlined the development process and allowed for rapid iteration.',
    tags: ['Dataiku DSS', 'Python', 'Scikit-learn', 'MLOps'],
    imageUrl: 'https://placehold.co/1200x600.png',
    aiHint: 'predictive model graph',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Increased retained revenue by $1.2M in the first year of deployment.',
      'Improved churn prediction accuracy by 25% compared to the previous rule-based system.',
      'Reduced customer support workload by allowing targeted, proactive interventions.',
      'Automated the end-to-end model retraining and deployment pipeline using MLOps best practices.'
    ],
     techStack: [
      { category: 'AI/ML Platform', items: ['Dataiku DSS'] },
      { category: 'Languages', items: ['Python'] },
      { category: 'Libraries', items: ['Scikit-learn', 'Pandas', 'NumPy'] },
      { category: 'Deployment', items: ['MLOps CI/CD', 'REST API'] }
    ]
  },
  {
    slug: 'real-time-analytics-dashboard',
    title: 'Real-time Analytics Dashboard',
    shortDescription: 'Built a real-time analytics dashboard using AWS Kinesis and Lambda to process millions of events per second, enabling live KPI monitoring.',
    longDescription: 'I designed and built a serverless, real-time analytics dashboard to provide live monitoring of key business KPIs. The system ingests millions of events per second from mobile and web applications using AWS Kinesis. A series of AWS Lambda functions process, aggregate, and enrich the data in real-time before loading it into Snowflake. The final dashboard, built with React, visualizes the live data, allowing business stakeholders to make informed decisions based on up-to-the-second information.',
    tags: ['AWS Kinesis', 'Lambda', 'Snowflake', 'React'],
    imageUrl: 'https://placehold.co/1200x600.png',
    aiHint: 'analytics dashboard',
    demoUrl: '#',
    repoUrl: '#',
    keyOutcomes: [
      'Enabled live monitoring of business KPIs with sub-second data latency.',
      'Processed over 1 million events per second during peak traffic.',
      'Provided a 360-degree view of user activity, leading to a 15% improvement in user engagement metrics.',
      'Built a cost-effective, serverless architecture that scales automatically with demand.'
    ],
    techStack: [
      { category: 'Data Streaming', items: ['AWS Kinesis'] },
      { category: 'Serverless Compute', items: ['AWS Lambda'] },
      { category: 'Data Warehouse', items: ['Snowflake'] },
      { category: 'Frontend', items: ['React', 'Recharts'] },
      { category: 'Languages', items: ['Python', 'JavaScript'] }
    ]
  },
];

export function getProjects(): Project[] {
  return projectsData;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(p => p.slug === slug);
}
