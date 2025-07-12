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

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}