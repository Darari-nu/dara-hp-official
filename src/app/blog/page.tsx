"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Calendar, User, Search, ArrowRight, Filter } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { BlogPost } from "@/types";

// Extended blog post data
const allBlogs: BlogPost[] = [
  {
    id: "post-1",
    title: "AI規制対応の完全ガイド：2025年版",
    summary: "最新の AI ガイドライン改訂を踏まえた、企業が今すぐ取り組むべき対応策をまとめました。",
    author: "だらリーヌ",
    published: "2025年7月6日",
    tags: ["法規制", "AI ガイドライン"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    url: "/blog/ai-regulation-guide-2025"
  },
  {
    id: "post-2",
    title: "Slack Bot導入事例：営業チームの生産性を30%向上",
    summary: "実際の企業での Slack Bot 導入事例を通じて、効果的な AI 活用方法を解説します。",
    author: "AIアシスタント",
    published: "2025年7月5日",
    tags: ["事例研究", "Slack Bot"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    url: "/blog/slack-bot-case-study"
  },
  {
    id: "post-3",
    title: "AI活用の第一歩：部署別ユースケース集",
    summary: "人事、営業、マーケティングなど、部署ごとの具体的な AI 活用アイデアを紹介します♪",
    author: "AIギャル",
    published: "2025年7月4日",
    tags: ["ユースケース", "部署別活用"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    url: "/blog/department-ai-use-cases"
  },
  {
    id: "post-4",
    title: "ChatGPTとGeminiの企業利用比較：2025年最新版",
    summary: "主要なAIサービスの特徴と企業での活用シーンを詳しく比較。どれを選ぶべきかがわかります。",
    author: "だらリーヌ",
    published: "2025年7月3日",
    tags: ["比較検討", "ChatGPT", "Gemini"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    url: "/blog/chatgpt-vs-gemini-enterprise"
  },
  {
    id: "post-5",
    title: "AI導入時の法的リスク回避：チェックリスト付き",
    summary: "AI導入時に見落としがちな法的リスクを詳解。すぐに使えるチェックリスト付きです。",
    author: "AIアシスタント",
    published: "2025年7月2日",
    tags: ["法的リスク", "チェックリスト"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    url: "/blog/ai-legal-risk-checklist"
  },
  {
    id: "post-6",
    title: "画像生成AIの商用利用ガイド：著作権対策も完璧",
    summary: "MidjourneyやDALL-Eの商用利用時の注意点と、著作権リスクを回避する方法を解説！",
    author: "AIギャル",
    published: "2025年7月1日",
    tags: ["画像生成AI", "著作権", "商用利用"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    url: "/blog/image-ai-commercial-guide"
  },
  {
    id: "post-7",
    title: "企業のAI導入ロードマップ：6ヶ月で成果を出す方法",
    summary: "段階的なAI導入アプローチで確実に成果を出すための実践的なロードマップを公開します。",
    author: "だらリーヌ",
    published: "2025年6月30日",
    tags: ["導入支援", "ロードマップ"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    url: "/blog/ai-roadmap-6months"
  },
  {
    id: "post-8",
    title: "AIプロンプトエンジニアリング実践講座",
    summary: "効果的なプロンプト設計のコツと、業務で使える実践的なテンプレート集をまとめました。",
    author: "AIアシスタント",
    published: "2025年6月29日",
    tags: ["技術解説", "プロンプト"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    url: "/blog/prompt-engineering-guide"
  },
  {
    id: "post-9",
    title: "AI活用事例：製造業のDX成功ストーリー",
    summary: "従来の製造プロセスにAIを組み込んで効率を40%向上させた実際の導入事例を紹介♪",
    author: "AIギャル",
    published: "2025年6月28日",
    tags: ["事例研究", "製造業"],
    image: "https://images.unsplash.com/photo-1565087784016-39b5c35b4ce1?w=800&h=600&fit=crop",
    url: "/blog/manufacturing-ai-case"
  }
];

const categories = [
  { id: 'all', name: 'すべて', count: allBlogs.length },
  { id: 'ai-regulation', name: 'AI規制', count: 4 },
  { id: 'case-study', name: '導入事例', count: 3 },
  { id: 'how-to', name: 'ハウツー', count: 2 },
  { id: 'technical', name: '技術解説', count: 2 }
];

const SECTION_CONFIG = {
  title: "ブログ記事一覧",
  sparklesConfig: {
    colors: { first: "#0f766e", second: "#5eead4" },
    sparklesCount: 3
  }
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = allBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           blog.tags.some(tag => tag.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-gray-100 text-slate-700 relative">
      {/* 背景幾何学図形 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-16 left-8 w-48 h-48 bg-refined-teal opacity-12 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-1/4 right-12 w-64 h-64 bg-refined-teal-dark opacity-10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-refined-teal-light opacity-15 rounded-full blur-lg animate-float-reverse"></div>
        <div className="absolute bottom-16 right-1/4 w-56 h-56 bg-refined-teal opacity-10 rounded-full blur-xl animate-fade-in-out"></div>
      </div>

      {/* Hero Section */}
      <section className="py-24 relative z-10">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionHeader 
              title={SECTION_CONFIG.title}
              sparklesConfig={SECTION_CONFIG.sparklesConfig}
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed">
              現場目線でAI活用をサポート。法規制から実装事例まで、今知りたい情報をお届けします。
            </p>
          </div>

          {/* Search & Filter */}
          <div className="max-w-4xl mx-auto mb-16">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-refined-teal focus:border-transparent bg-white/80 backdrop-blur-sm shadow-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-sm ${
                    selectedCategory === category.id
                      ? 'bg-refined-teal text-white shadow-md'
                      : 'bg-white/80 text-gray-700 hover:bg-refined-teal-light/20 hover:text-refined-teal-dark backdrop-blur-sm'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-24 relative z-10">
        <div className="container max-w-7xl mx-auto px-6">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">記事が見つかりませんでした</h3>
              <p className="text-gray-500">検索条件を変更してみてください。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <Link href={blog.url} key={blog.id} className="group">
                  <article className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-200/50 group-hover:transform group-hover:scale-[1.02] animate-on-scroll">
                    {/* Featured Image */}
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="bg-refined-teal-light/20 text-refined-teal-dark px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-refined-teal-light/30">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold font-display mb-3 text-gray-900 group-hover:text-refined-teal transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-sm">
                        {blog.summary}
                      </p>
                      
                      {/* Author and Date */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-refined-teal to-refined-teal-dark rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                          <span className="font-medium">{blog.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{blog.published}</span>
                        </div>
                      </div>
                      
                      {/* Read More */}
                      <div className="flex items-center justify-end mt-4 text-refined-teal text-sm font-semibold group-hover:text-refined-teal-dark transition-colors">
                        <span>続きを読む</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredBlogs.length > 6 && (
            <div className="text-center mt-16">
              <button className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-2 border-refined-teal text-refined-teal font-semibold py-3 px-8 rounded-full hover:bg-refined-teal hover:text-white transition-all duration-300 shadow-sm">
                <span>さらに記事を読む</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Back to Top Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <Link
          href="/"
          className="bg-refined-teal text-white p-3 rounded-full shadow-lg hover:bg-refined-teal-dark transition-all duration-300 hover:scale-110"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Link>
      </div>
    </div>
  );
}