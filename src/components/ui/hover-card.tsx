import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: "blue" | "green" | "purple";
}

export function HoverCard({ 
  children, 
  className, 
  accentColor = "blue" 
}: HoverCardProps) {
  const accentColorMap = {
    blue: "group-hover/card:bg-blue-500",
    green: "group-hover/card:bg-green-500", 
    purple: "group-hover/card:bg-purple-500"
  };

  return (
    <div className={cn(
      "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 group/card relative",
      className
    )}>
      <div className={cn(
        "absolute left-0 inset-y-0 h-6 group-hover/card:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-200 transition-all duration-300 origin-center",
        accentColorMap[accentColor]
      )} />
      {children}
    </div>
  );
}