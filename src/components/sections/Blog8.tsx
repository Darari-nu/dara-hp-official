import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { BlogPost, SectionConfig } from "@/types";
import { SanityBlogPost } from "@/types/sanity";
import { transformSanityBlogPosts } from "@/lib/data-transform";

const SECTION_CONFIG: SectionConfig = {
  title: "最新記事",
  sparklesConfig: {
    colors: { first: "#4285F4", second: "#34A853" },
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
  }
];

// Sanityからのデータを受け取るように変更
interface Blog8Props {
  posts?: SanityBlogPost[]
}

export function Blog8({ posts }: Blog8Props) {
  // Sanityデータを安全に変換
  const transformResult = posts && posts.length > 0 
    ? transformSanityBlogPosts(posts.slice(0, 3))
    : { data: sampleBlogs, hasError: false };

  const blogsToDisplay = transformResult.hasError || transformResult.data.length === 0
    ? sampleBlogs
    : transformResult.data;
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title={SECTION_CONFIG.title}
          sparklesConfig={SECTION_CONFIG.sparklesConfig}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogsToDisplay.map((blog, index) => (
            <Link href={blog.url} key={blog.id} className="group">
              <article className={`enhanced-card rounded-3xl overflow-hidden h-full flex flex-col animate-on-scroll`}
                       style={{transitionDelay: `${index * 100}ms`}}>
                {/* Featured Image */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} className="bg-white/90 backdrop-blur-sm text-slate-800 font-medium text-xs px-3 py-1 shadow-lg border-0 hover:bg-white transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <ArrowRight className="w-5 h-5 text-slate-800" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                    {blog.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3 flex-1 text-sm">
                    {blog.summary}
                  </p>
                  
                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{blog.author}</div>
                        <div className="flex items-center space-x-1 text-slate-500">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{blog.published}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      <span className="text-sm">続きを読む</span>
                    </div>
                  </div>
                </div>

                {/* Hover highlight effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="btn-secondary inline-flex items-center space-x-2">
            <span>すべての記事を見る</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}