import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div className={cn(
      "h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent",
      className
    )} />
  );
}