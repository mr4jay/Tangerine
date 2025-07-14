
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
import { skillCategories } from "./skills"

const chartData = skillCategories.find(c => c.name === 'Programming')?.skills || [];

const chartConfig = {
  level: {
    label: "Proficiency",
    color: "hsl(var(--primary))",
  },
}

export function SkillsChart() {
  return (
    <Card className="w-full max-w-lg">
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
            <CartesianGrid horizontal={false} />
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
              cursor={{ fill: 'hsl(var(--secondary))' }}
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
