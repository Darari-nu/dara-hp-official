import Link from "next/link";
import { Calendar, User, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { BlogPost, SectionConfig } from "@/types";
import { SanityBlogPost } from "@/types/sanity";
import { transformSanityBlogPosts } from "@/lib/data-transform";

const SECTION_CONFIG: SectionConfig = {
  title: "最新ニュース",
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
    summary: "最新の AI ガイドライン改訂を踏まえた、企業が今すぐ取り組むべき対応策をまとめました。法務と技術の橋渡し役として、現場で使える実践的なノウハウを提供します。",
    author: "だらリーヌ",
    published: "2025年7月16日",
    tags: ["法規制", "AI ガイドライン"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    url: "/blog/ai-regulation-guide-2025"
  },
  {
    id: "post-2",
    title: "Slack Bot導入事例：営業チームの生産性を30%向上",
    summary: "実際の企業での Slack Bot 導入事例を通じて、効果的な AI 活用方法を解説します。ROI の測定方法から運用のコツまで。",
    author: "AIアシスタント",
    published: "2025年7月15日",
    tags: ["事例研究", "Slack Bot"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    url: "/blog/slack-bot-case-study"
  },
  {
    id: "post-3",
    title: "AI活用の第一歩：部署別ユースケース集",
    summary: "人事、営業、マーケティングなど、部署ごとの具体的な AI 活用アイデアを紹介します♪ 明日から使える実例満載！",
    author: "AIギャル",
    published: "2025年7月14日",
    tags: ["ユースケース", "部署別活用"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    url: "/blog/department-ai-use-cases"
  },
  {
    id: "post-4",
    title: "ChatGPT Enterprise導入で失敗しないための5つのポイント",
    summary: "企業でのChatGPT導入時によくある落とし穴と、その対策方法をまとめました。セキュリティ面での注意点も詳しく解説。",
    author: "だらリーヌ",
    published: "2025年7月13日",
    tags: ["ChatGPT", "企業導入"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    url: "/blog/chatgpt-enterprise-guide"
  }
];

interface NewsBlogProps {
  sanityPosts?: SanityBlogPost[];
}

export function NewsBlog({ sanityPosts }: NewsBlogProps) {
  // Sanityのデータが利用可能な場合は変換、そうでなければサンプルデータを使用
  const transformResult = sanityPosts ? transformSanityBlogPosts(sanityPosts) : { success: false, data: [] };
  const blogsToDisplay = transformResult.success 
    ? transformResult.data.slice(0, 4)
    : sampleBlogs;
    
  return (
    <section id="articles" className="py-24 md:py-32 relative z-10 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader 
          title={SECTION_CONFIG.title}
          sparklesConfig={SECTION_CONFIG.sparklesConfig}
        />

        <div className="mt-16">
          {/* Featured Article */}
          {blogsToDisplay[0] && (
            <div className="mb-12">
              <Link href={blogsToDisplay[0].url} className="group">
                <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="aspect-[16/10] lg:aspect-auto relative overflow-hidden">
                      <img
                        src={blogsToDisplay[0].image}
                        alt={blogsToDisplay[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-refined-teal text-white px-3 py-1 rounded-full text-sm font-semibold">
                          FEATURED
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{blogsToDisplay[0].published}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{blogsToDisplay[0].author}</span>
                        </div>
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-display font-semibold text-gray-900 mb-4 group-hover:text-refined-teal transition-colors">
                        {blogsToDisplay[0].title}
                      </h2>
                      
                      <p className="text-gray-600 leading-relaxed mb-6 font-light">
                        {blogsToDisplay[0].summary}
                      </p>
                      
                      <div className="flex items-center text-refined-teal font-semibold group-hover:text-refined-teal-dark transition-colors">
                        <span>続きを読む</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Other Articles */}
          <div className="space-y-6">
            {blogsToDisplay.slice(1).map((blog, index) => (
              <Link href={blog.url} key={blog.id} className="group">
                <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-6">
                  <div className="flex items-start space-x-6">
                    {/* Small Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{blog.published}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{blog.author}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-display font-semibold text-gray-900 mb-2 group-hover:text-refined-teal transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm font-light line-clamp-2 mb-3">
                        {blog.summary}
                      </p>
                      
                      <div className="flex items-center text-refined-teal text-sm font-semibold group-hover:text-refined-teal-dark transition-colors">
                        <span>続きを読む</span>
                        <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link 
              href="/blog"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-refined-teal to-refined-teal-dark text-white font-semibold py-3 px-8 rounded-xl hover:from-refined-teal-dark hover:to-refined-teal shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>すべてのニュースを見る</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}