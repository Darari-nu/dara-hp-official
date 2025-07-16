import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { BlogPost, SectionConfig } from "@/types";
import { SanityBlogPost } from "@/types/sanity";
import { transformSanityBlogPosts } from "@/lib/data-transform";

const SECTION_CONFIG: SectionConfig = {
  title: "最新記事",
  sparklesConfig: {
    colors: { first: "#0f766e", second: "#5eead4" },
    sparklesCount: 2
  }
};

// Sample data based on CLAUDE.md specifications
const sampleBlogs: BlogPost[] = [
  {
    id: "post-1",
    title: "AI規制対応の完全ガイド：2025年版",
    summary: "最新の AI ガイドライン改訂を踏まえた、企業が今すぐ取り組むべき対応策をまとめました。",
    author: "だらリーヌ",
    published: "2025年7月16日",
    tags: ["法規制", "AI ガイドライン"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    url: "/blog/ai-regulation-guide-2025"
  },
  {
    id: "post-2",
    title: "Slack Bot導入事例：営業チームの生産性を30%向上",
    summary: "実際の企業での Slack Bot 導入事例を通じて、効果的な AI 活用方法を解説します。",
    author: "AIアシスタント",
    published: "2025年7月15日",
    tags: ["事例研究", "Slack Bot"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    url: "/blog/slack-bot-case-study"
  },
  {
    id: "post-3",
    title: "AI活用の第一歩：部署別ユースケース集",
    summary: "人事、営業、マーケティングなど、部署ごとの具体的な AI 活用アイデアを紹介します♪",
    author: "AIギャル",
    published: "2025年7月14日",
    tags: ["ユースケース", "部署別活用"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    url: "/blog/department-ai-use-cases"
  },
  {
    id: "post-4",
    title: "ChatGPT Enterprise導入で失敗しないための5つのポイント",
    summary: "企業でのChatGPT導入時によくある落とし穴と、その対策方法をまとめました。",
    author: "だらリーヌ",
    published: "2025年7月13日",
    tags: ["ChatGPT", "企業導入"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    url: "/blog/chatgpt-enterprise-guide"
  }
];

const categories = [
  { id: 'all', name: 'すべて' },
  { id: 'ai-regulation', name: 'AI規制' },
  { id: 'case-study', name: '導入事例' },
  { id: 'how-to', name: 'ハウツー' }
];

interface NewsLayoutBlogProps {
  sanityPosts?: SanityBlogPost[];
}

export function NewsLayoutBlog({ sanityPosts }: NewsLayoutBlogProps) {
  // Sanityのデータが利用可能な場合は変換、そうでなければサンプルデータを使用
  const transformResult = sanityPosts ? transformSanityBlogPosts(sanityPosts) : { success: false, data: [] };
  const blogsToDisplay = transformResult.success 
    ? transformResult.data
    : sampleBlogs;
    
  return (
    <section id="articles" className="py-16 md:py-24 relative z-10 bg-gray-50/80">
      {/* Desktop Layout */}
      <div className="hidden lg:block container mx-auto px-6 max-w-7xl">
        {/* Header with title and button */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <SectionHeader 
              title={SECTION_CONFIG.title}
              sparklesConfig={SECTION_CONFIG.sparklesConfig}
            />
          </div>
          <div className="text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center space-x-2 border-2 border-refined-teal text-refined-teal font-semibold py-2 px-6 rounded-full hover:bg-refined-teal-light/10 transition-all duration-300"
            >
              <span>記事一覧</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sticky top-24">
              <h3 className="font-display font-semibold text-base text-gray-900 mb-4">カテゴリ</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button className="w-full text-left group flex items-center py-2 px-3 rounded-lg hover:bg-refined-teal-light/10 transition-colors duration-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-refined-teal rounded-full"></div>
                        <span className="text-gray-700 group-hover:text-refined-teal font-medium text-sm">
                          {category.name}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content - Articles */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {blogsToDisplay.slice(0, 3).map((blog, index) => (
                <Link href={blog.url} key={blog.id} className="group">
                  <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      {/* Image */}
                      <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{blog.published}</span>
                          </div>
                          <div className="bg-refined-teal-light/20 text-refined-teal-dark px-2 py-1 rounded text-xs font-semibold">
                            AI規制
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-display font-semibold text-gray-900 mb-2 group-hover:text-refined-teal transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed mb-3 font-light line-clamp-2 text-sm">
                          {blog.summary}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 bg-gradient-to-br from-refined-teal to-refined-teal-dark rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs font-medium text-gray-700">{blog.author}</span>
                          </div>
                          
                          <div className="flex items-center text-refined-teal text-xs font-semibold group-hover:text-refined-teal-dark transition-colors">
                            <span>続きを読む</span>
                            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <SectionHeader 
            title={SECTION_CONFIG.title}
            sparklesConfig={SECTION_CONFIG.sparklesConfig}
          />
        </div>

        {/* Tab Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                category.id === 'all'
                  ? 'bg-refined-teal-light/20 text-refined-teal-dark border border-refined-teal-light/30'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Article List */}
        <div className="space-y-4">
          {blogsToDisplay.slice(0, 3).map((blog, index) => (
            <Link href={blog.url} key={blog.id} className="group">
              <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-300">
                {/* Date and Category */}
                <div className="flex items-center space-x-3 mb-3 text-sm">
                  <span className="text-gray-500">{blog.published.replace('年', '.').replace('月', '.').replace('日', '')}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    AI規制
                  </span>
                </div>

                {/* Content Container */}
                <div className="flex space-x-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-display font-semibold text-gray-900 leading-relaxed line-clamp-3 group-hover:text-refined-teal transition-colors">
                      {blog.title}
                    </h3>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link 
            href="/blog"
            className="inline-flex items-center space-x-2 border-2 border-refined-teal text-refined-teal font-semibold py-3 px-6 rounded-full hover:bg-refined-teal-light/10 transition-all duration-300"
          >
            <span>記事一覧</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}