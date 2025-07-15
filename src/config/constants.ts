// ==================================================
// Site Configuration & Constants
// ==================================================

import type { SparklesConfig, TeamMemberConfig, AnimationDuration, AnimationEasing } from '@/types';

export const SITE_CONFIG = {
  name: "DaraHP",
  title: "だらリーヌ公式サイト - AI規制・ガイドライン専門",
  description: "AI規制・ガイドラインを現場目線で翻訳します。法務担当者・AI推進者・活用模索中の方へ実践的な情報をお届け。",
  url: "https://darahp.vercel.app",
  locale: "ja-JP",
} as const;

// ==================================================
// Design System
// ==================================================

export const COLORS = {
  google: {
    blue: "#4285F4",
    red: "#EA4335", 
    yellow: "#FBBC05",
    green: "#34A853",
  },
  teal: {
    primary: "#14B8A6", // teal-500
    hover: "#0D9488",   // teal-600
  },
  slate: {
    text: "#1E293B",    // slate-800
    light: "#64748B",   // slate-500
  },
} as const;

export const SPARKLES_CONFIG: Record<'default' | 'editorial', SparklesConfig> = {
  default: {
    colors: { first: COLORS.google.blue, second: COLORS.google.green },
    sparklesCount: 2,
  },
  editorial: {
    colors: { first: COLORS.google.red, second: COLORS.google.yellow },
    sparklesCount: 3,
  },
} as const;

// ==================================================
// Animation & Timing
// ==================================================

export const ANIMATION = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  } as Record<AnimationDuration, number>,
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  } as Record<AnimationEasing, string>,
} as const;

// ==================================================
// Layout & Spacing
// ==================================================

export const LAYOUT = {
  maxWidth: "1200px",
  padding: {
    mobile: "1.5rem", // px-6
    desktop: "2rem",  // px-8
  },
  section: {
    spacing: {
      mobile: "5rem",   // py-20
      desktop: "7rem",  // py-28
    },
  },
} as const;

// ==================================================
// Editorial Team Data
// ==================================================

export const TEAM_MEMBERS: readonly TeamMemberConfig[] = [
  {
    id: "darine",
    name: "だらリーヌ",
    role: "編集長",
    description: "AI規制専門家",
    emoji: "👩‍💼",
    detail: "JTC社内AIガイドライン構築・保守を担当。現場が迷わないチェックリストを常時アップデート中。",
  },
  {
    id: "reading-gal",
    name: "読書ギャル卍頭よくなりたい", 
    role: "アシスタント",
    description: "勉強中",
    emoji: "📚",
    detail: "日々の学習で得た知識を実践的な形でお届け。わかりやすい解説がモットー。",
  },
  {
    id: "intern-ai-cat",
    name: "インターンAI猫",
    role: "アシスタント", 
    description: "技術調査担当",
    emoji: "🐱",
    detail: "最新AI技術の調査・分析を担当。技術的な詳細もかみ砕いて説明します。",
  },
  {
    id: "ai-robo",
    name: "AIろぼ",
    role: "アシスタント",
    description: "データ分析・技術解説",
    emoji: "🤖", 
    detail: "データ分析とシステム設計の視点から、実装可能なソリューションを提案。",
  },
] as const;

// ==================================================
// Blog & Content
// ==================================================

export const BLOG_CONFIG = {
  postsPerPage: 6,
  excerptLength: 150,
  readingTime: {
    wordsPerMinute: 400, // 日本語平均読書速度
  },
} as const;

// ==================================================
// External Links & URLs
// ==================================================

export const EXTERNAL_LINKS = {
  sanity: {
    studio: "http://localhost:3333",
    projectId: "9kqjddwl",
  },
  social: {
    twitter: "#",
    github: "#", 
    linkedin: "#",
  },
} as const;

// ==================================================
// Development & Environment
// ==================================================

export const ENV = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  sanityToken: process.env.SANITY_API_TOKEN,
} as const;