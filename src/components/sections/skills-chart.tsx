
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const skillCategories = [
  {
    name: 'Programming',
    skills: [
      { name: 'Python', level: 90, description: "Advanced proficiency in Python for data analysis, pipeline development, and machine learning applications." },
      { name: 'SQL', level: 95, description: "Expert in complex queries, performance tuning, and database design across various SQL dialects." },
    ],
  },
  {
    name: 'Cloud & Automation',
    skills: [
      { name: 'AWS', level: 80, description: "Advanced knowledge of AWS services including S3, Glue, Lambda, and EMR for data solutions." },
      { name: 'GCP', level: 75, description: "Proficient with Google Cloud services like BigQuery, Dataflow, and Cloud Storage." },
      { name: 'APIs', level: 85, description: "Skilled in integrating systems and automating workflows using RESTful APIs and Webhooks." },
    ],
  },
  {
    name: 'Data Platforms',
    skills: [
      { name: 'Salesforce Datorama', level: 95, description: "Expert in Datorama for marketing data integration, harmonization, and visualization." },
      { name: 'Dataiku DSS', level: 90, description: "Advanced user of Dataiku for visual data preparation, model building, and MLOps." },
      { name: 'Tableau', level: 85, description: "Proficient in creating insightful and interactive dashboards for business intelligence." },
      { name: 'Alteryx Studio', level: 80, description: "Experienced in using Alteryx for data blending and advanced analytics workflows." },
    ],
  },
  {
    name: 'Machine Learning',
    skills: [
      { name: 'Predictive Modeling', level: 85, description: "Experienced in building and deploying models for tasks like customer churn and forecasting." },
      { name: 'GenAI', level: 75, description: "Familiarity with applying generative AI models for content and data augmentation tasks." },
      { name: 'Pandas & NumPy', level: 90, description: "Core data manipulation and analysis skills using Python's primary data science libraries." },
      { name: 'Scikit-learn', level: 85, description: "Strong ability to implement various ML algorithms for classification, regression, and clustering." },
    ],
  },
];

const chartConfig = {
  level: {
    label: "Proficiency",
    color: "hsl(var(--primary))",
  },
}

const SkillBarChart = ({ data }: { data: typeof skillCategories[0]['skills'] }) => (
  <ChartContainer config={chartConfig} className="h-64 w-full">
    <ResponsiveContainer>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ left: 10, right: 10 }}
      >
        <CartesianGrid horizontal={false} stroke="hsl(var(--border) / 0.5)" />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          className="text-muted-foreground text-xs"
          width={100}
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
        <Bar dataKey="level" fill="var(--color-level)" radius={4} isAnimationActive={true} animationDuration={800} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);

export function SkillsChart() {
  return (
    <Card className="w-full max-w-2xl bg-card/80 border-primary/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
        <CardDescription>An interactive overview of my technical proficiency across various domains.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={skillCategories[0].name} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            {skillCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>{category.name}</TabsTrigger>
            ))}
          </TabsList>
          {skillCategories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="mt-4">
              <SkillBarChart data={category.skills} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
