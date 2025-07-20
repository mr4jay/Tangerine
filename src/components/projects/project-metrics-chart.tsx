
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";
import type { ProjectMetric } from "@/lib/projects";
import { motion } from "framer-motion";

const formatValue = (value: number, unit: ProjectMetric['unit']) => {
  if (unit === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(value);
  }
  if (unit === 'percentage') {
    return `${value}%`;
  }
  return value.toLocaleString();
};

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function ProjectMetricsChart({ metrics }: { metrics: ProjectMetric[] }) {
  const chartData = metrics.map(metric => ({
    name: metric.label,
    value: metric.value,
    unit: metric.unit,
    description: metric.description
  }));

  return (
    <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
      <Card className="bg-card border-border/60" role="figure" aria-label="Project Metrics Chart">
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
          <CardDescription>A visualization of the project's key performance indicators.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 40, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  className="text-sm text-muted-foreground fill-muted-foreground"
                  width={120}
                  
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--secondary))' }}
                  content={
                    <ChartTooltipContent
                        formatter={(value, name, props) => (
                        <div className="flex flex-col gap-1">
                            <span className="font-bold">{props.payload.name}: {formatValue(Number(value), props.payload.unit)}</span>
                            <span className="text-xs text-muted-foreground">{props.payload.description}</span>
                        </div>
                        )}
                        labelFormatter={() => ''}
                        indicator="dot"
                    />
                  }
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={4} isAnimationActive={true} animationDuration={800}>
                    <LabelList
                        dataKey="value"
                        position="right"
                        offset={10}
                        className="fill-foreground font-medium"
                        formatter={(value: number) => {
                            const entry = chartData.find(d => d.value === value);
                            return entry ? formatValue(value, entry.unit) : value;
                        }}
                    />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
