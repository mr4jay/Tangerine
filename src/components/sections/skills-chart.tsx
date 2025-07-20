
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const skillCategories = [
  {
    name: 'Programming',
    skills: [
      { name: 'Python', level: 90, description: "Advanced proficiency in Python for data analysis, pipeline development, and machine learning applications." },
      { name: 'SQL', level: 95, description: "Expert in complex queries, performance tuning, and database design across various SQL dialects." },
      { name: 'PySpark', level: 85, description: "Strong experience in large-scale data processing and analytics using PySpark." },
      { name: 'Scala', level: 75, description: "Proficient in Scala for building robust and scalable data engineering solutions on the JVM." },
      { name: 'Java', level: 70, description: "Solid foundation in Java for enterprise-level application development and data services." },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 90, description: "Expertise in AWS services like S3, Glue, Kinesis, Lambda, and EMR for building end-to-end data solutions." },
      { name: 'Azure', level: 70, description: "Experience with Azure Data Factory, Synapse Analytics, and Blob Storage." },
      { name: 'GCP', level: 65, description: "Familiarity with Google Cloud services including BigQuery, Dataflow, and Cloud Storage." },
      { name: 'Docker', level: 85, description: "Proficient in containerizing applications and services for consistent deployment environments." },
      { name: 'Kubernetes', level: 80, description: "Skilled in orchestrating containerized applications for high availability and scalability." },
      { name: 'Jenkins', level: 75, description: "Experienced in setting up CI/CD pipelines for automated build, test, and deployment." },
    ],
  },
  {
    name: 'Data Tools',
    skills: [
      { name: 'Dataiku DSS', level: 90, description: "Advanced user of Dataiku for visual data preparation, model building, and MLOps." },
      { name: 'Snowflake', level: 95, description: "Deep expertise in Snowflake for cloud data warehousing, performance optimization, and data sharing." },
      { name: 'Airflow', level: 85, description: "Proficient in authoring, scheduling, and monitoring complex data workflows with Airflow." },
      { name: 'Apache Spark', level: 88, description: "Strong understanding of Spark's architecture for distributed data processing." },
    ],
  },
  {
    name: 'Marketing Platforms',
    skills: [
      { name: 'Salesforce Datorama', level: 80, description: "Skilled in integrating and visualizing marketing data within the Datorama platform." },
      { name: 'Google Ads', level: 75, description: "Experience in leveraging Google Ads data for campaign analysis and performance reporting." },
    ],
  },
];

const chartData = skillCategories.find(c => c.name === 'Programming')?.skills || [];

const chartConfig = {
  level: {
    label: "Proficiency",
    color: "hsl(var(--primary))",
  },
}

export function SkillsChart() {
  return (
    <Card className="w-full max-w-lg bg-card/80 border-primary/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Programming Proficiency</CardTitle>
        <CardDescription>A visual representation of my core programming skills.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid horizontal={false} stroke="hsl(var(--border) / 0.5)" />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-muted-foreground text-xs"
            />
            <XAxis dataKey="level" type="number" hide />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--accent))' }}
              content={<ChartTooltipContent 
                  formatter={(value, name, props) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{props.payload.name} ({value}%)</span>
                      <span className="text-xs text-muted-foreground">{props.payload.description}</span>
                    </div>
                  )}
                  labelFormatter={() => ''}
                  indicator="dot" 
              />}
            />
            <Bar dataKey="level" fill="var(--color-level)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
