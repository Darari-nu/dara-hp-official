import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Search } from "lucide-react";
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
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">AI規制</span>と実践の
              <br />
              最新情報ブログ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              現場目線でAI活用をサポート。法規制から実装事例まで、今知りたい情報をお届けします。
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="記事を検索..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allBlogs.map((blog) => (
              <Link href={blog.url} key={blog.id} className="group">
                <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                  {/* Featured Image */}
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} className="bg-white/90 text-gray-800 hover:bg-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-display mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {blog.summary}
                    </p>
                    
                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{blog.published}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            カテゴリ別記事
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["法規制", "AI ガイドライン", "事例研究", "ユースケース", "技術解説", "導入支援"].map((category) => (
              <Link
                key={category}
                href={`/blog/category/${category}`}
                className="bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-800 px-6 py-3 rounded-full font-medium transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}