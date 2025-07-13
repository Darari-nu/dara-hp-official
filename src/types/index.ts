// ===== Core Types =====

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  author: string;
  published: string;
  tags: string[];
  image: string;
  url: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatar: string;
  emoji: string;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
}

// ===== Component Props =====

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  sparklesConfig?: {
    colors: { first: string; second: string };
    sparklesCount: number;
  };
}

// ===== Configuration Types =====

export interface SparklesConfig {
  colors: { first: string; second: string };
  sparklesCount: number;
}

export interface SectionConfig {
  title: string;
  subtitle?: string;
  sparklesConfig?: SparklesConfig;
}

// ===== Data Transformation Types =====

export interface DataTransformResult<T> {
  data: T[];
  hasError: boolean;
  errorMessage?: string;
}