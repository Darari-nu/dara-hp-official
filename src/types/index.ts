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

// ===== Configuration Types (継承 from constants.ts) =====

export type SparklesConfig = {
  colors: { first: string; second: string };
  sparklesCount: number;
};

export type SectionConfig = {
  title: string;
  subtitle?: string;
  sparklesConfig?: SparklesConfig;
};

export type TeamMemberConfig = {
  id: string;
  name: string;
  role: string;
  description: string;
  emoji: string;
  detail: string;
};

// ===== Component Props =====

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  sparklesConfig?: SparklesConfig;
}

// ===== Utility Types =====

export interface DataTransformResult<T> {
  data: T[];
  hasError: boolean;
  errorMessage?: string;
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// ===== Animation & UI Types =====

export type AnimationDuration = 'fast' | 'normal' | 'slow';
export type AnimationEasing = 'standard' | 'easeOut';

export type ColorTheme = 'google' | 'teal' | 'slate';
export type ComponentVariant = 'default' | 'editorial' | 'minimal';