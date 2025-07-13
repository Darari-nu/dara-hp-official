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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogsToDisplay.map((blog) => (
            <Link href={blog.url} key={blog.id} className="group">
              <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 group/card relative h-full flex flex-col">
                {/* Featured Image */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} className="bg-blue-600 text-white font-medium text-xs px-2 py-1 shadow-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 flex-1">
                    {blog.summary}
                  </p>
                  
                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-700">{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">{blog.published}</span>
                    </div>
                  </div>
                  
                  {/* Read More Link */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      続きを読む
                    </span>
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
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