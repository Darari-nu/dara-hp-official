import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { SparklesText } from "@/components/ui/sparkles-text";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  author: string;
  published: string;
  tags: string[];
  image: string;
  url: string;
}

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

export function Blog8() {
  return (
    <section className="py-32 bg-white">
      <div className="container">
        <div className="text-center mb-20">
          <SparklesText 
            text="最新記事" 
            className="text-3xl font-semibold mb-6"
            colors={{ first: "#4285F4", second: "#34A853" }}
            sparklesCount={2}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sampleBlogs.map((blog) => (
            <Link href={blog.url} key={blog.id} className="group">
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 group/card relative">
                {/* Featured Image */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} className="bg-white/90 text-gray-800 hover:bg-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="relative">
                    <div className="absolute left-0 inset-y-0 h-6 group-hover/card:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-200 group-hover/card:bg-blue-500 transition-all duration-300 origin-center" />
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover/card:text-blue-600 group-hover/card:translate-x-3 transition-all duration-300 line-clamp-2 pl-4">
                      {blog.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                  
                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.published}</span>
                    </div>
                  </div>
                  
                  {/* Read More Link */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      Read more
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
            <span>すべての記事を見る</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}