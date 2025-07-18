// Sanity用の型定義
import type { BlogPost, TeamMember } from '@/types';
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SanityAuthor {
  _id: string
  name: string
  role: string
  description?: string
  avatar?: SanityImage
  emoji?: string
  isActive?: boolean
}

export interface SanityCategory {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
}

export interface SanityBlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  summary: string
  author: SanityAuthor
  mainImage: SanityImage
  categories?: SanityCategory[]
  tags?: string[]
  publishedAt: string
  content?: any[] // Portable Text
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  isPublished: boolean
}

export interface SanityFAQ {
  _id: string
  question: string
  answer: any[] // Portable Text
  category: 'service' | 'pricing' | 'regulation' | 'technology' | 'other'
  order: number
  isPublished: boolean
}

export interface SanitySiteSettings {
  title: string
  description?: string
  keywords?: string[]
  logo?: SanityImage
  favicon?: SanityImage
  socialMedia?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  contact?: {
    email?: string
    phone?: string
    address?: string
  }
  analytics?: {
    googleAnalyticsId?: string
  }
}

// ===== Data Transformation Types =====

export type SanityToBlogPost = (sanityPost: SanityBlogPost) => BlogPost;
export type SanityToTeamMember = (sanityAuthor: SanityAuthor) => TeamMember;

// ===== Query Result Types =====

export type SanityQueryResult<T> = {
  result: T[];
  query: string;
  ms: number;
};

// ===== Utility Types for Sanity Operations =====

export type SanityDocumentType = 'post' | 'author' | 'category' | 'faq' | 'siteSettings';

export type SanityOperation = 'create' | 'update' | 'delete' | 'patch';

export type SanityMutationResult = {
  transactionId: string;
  results: Array<{
    id: string;
    operation: SanityOperation;
  }>;
};