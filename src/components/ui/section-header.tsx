import { SparklesText } from "@/components/ui/sparkles-text";
import { cn } from "@/lib/utils";

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
  sparklesConfig = {
    colors: { first: "#4285F4", second: "#34A853" },
    sparklesCount: 2
  }
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