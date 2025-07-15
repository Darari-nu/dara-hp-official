"use client";

import { SparklesText } from "@/components/ui/sparkles-text";
import { cn } from "@/lib/utils";
import { SPARKLES_CONFIG } from "@/config/constants";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  sparklesConfig?: {
    colors: { first: string; second: string };
    sparklesCount: number;
  };
}

export function SectionHeader({ 
  title, 
  subtitle, 
  className,
  sparklesConfig = SPARKLES_CONFIG.default
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-20", className)}>
      <SparklesText 
        text={title} 
        className="text-3xl font-semibold mb-6"
        colors={sparklesConfig.colors}
        sparklesCount={sparklesConfig.sparklesCount}
      />
      {subtitle && (
        <p className="text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}