import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface WorkItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
}

const works: WorkItem[] = [
  {
    id: "1",
    title: "企業向けAIガイドライン策定",
    description: "大手IT企業のAI活用ガイドラインを現場目線で作成。従業員1000人が迷わず使える実践的な内容に。",
    category: "ガイドライン策定",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    tags: ["ガイドライン", "大企業", "1000人規模"]
  },
  {
    id: "2", 
    title: "SNSアイコン大量生成プロジェクト",
    description: "Midjourney活用で1,000枚以上のSNSアイコンを48時間で納品。ブランド統一も完璧に実現。",
    category: "画像生成",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    tags: ["Midjourney", "1000枚", "48h納品"]
  },
  {
    id: "3",
    title: "営業チーム向けSlack Bot開発",
    description: "日報作成とタスク管理を自動化するSlack Botで、営業チームの生産性を30%向上させました。",
    category: "Bot開発", 
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    tags: ["Slack Bot", "生産性30%向上", "営業支援"]
  }
];

export function WorkShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">
            実績・<span className="google-gradient">作例紹介</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            実際に企業で導入・活用されている事例をご紹介します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <div 
              key={work.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                    {work.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold font-display mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {work.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {work.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            あなたの会社でも同様の成果を出してみませんか？
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
            無料相談を予約する
          </button>
        </div>
      </div>
    </section>
  );
}