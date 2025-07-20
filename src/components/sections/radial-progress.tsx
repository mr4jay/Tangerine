"use client";

import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface RadialProgressProps {
  percentage: number;
  label: string;
  tooltipContent: string;
}

export function RadialProgress({ percentage, label, tooltipContent }: RadialProgressProps) {
  const isMobile = useIsMobile();
  const size = isMobile ? 80 : 100;
  const strokeWidth = isMobile ? 8 : 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-2 cursor-pointer" aria-label={`${label} proficiency: ${percentage}%`}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="hsl(var(--card))"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Foreground circle (progress) */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="hsl(var(--primary))"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: offset }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              {/* Text */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                className="text-lg sm:text-xl font-bold fill-foreground"
              >
                {`${percentage}%`}
              </text>
            </svg>
            <p className="text-sm text-center font-medium text-foreground">{label}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-card text-card-foreground border-border/60">
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
