import Image from "next/image";
import { SparklesText } from "@/components/ui/sparkles-text";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatar: string;
  emoji: string;
}

const team: TeamMember[] = [
  {
    name: "だらリーヌ/ボス猫",
    role: "編集長",
    description: "JTC企業でAIルール作ってます！現場目線で解説します！",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    emoji: "👩‍💼"
  },
  {
    name: "読書ギャル卍頭よくなりたい",
    role: "アシスタント",
    description: "とりま勉強中！むずかしいAI話をわかりやすく書きます♪",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    emoji: "📚"
  },
  {
    name: "インターンAI猫",
    role: "アシスタント",
    description: "にゃーん。最新のAI技術について調査してるにゃん。",
    avatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop&crop=face",
    emoji: "🐱"
  },
  {
    name: "AIろぼ",
    role: "アシスタント",
    description: "01010111 技術解説担当デス。データ分析ガ得意デス。",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face",
    emoji: "🤖"
  }
];

export function EditorialTeam() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container">
        <div className="text-center mb-20">
          <SparklesText 
            text="編集局メンバー" 
            className="text-3xl font-semibold mb-6"
            colors={{ first: "#4285F4", second: "#34A853" }}
            sparklesCount={2}
          />
          <p className="text-lg text-gray-600">
            バラエティ豊かなメンバーでお送りします
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 group/card relative"
            >
              {/* Avatar */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 text-2xl">
                  {member.emoji}
                </div>
              </div>

              {/* Role Badge */}
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                {member.role}
              </div>

              {/* Name */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 h-1 group-hover/card:h-2 w-8 group-hover/card:w-12 rounded-full bg-gray-200 group-hover/card:bg-purple-500 transition-all duration-300" />
                <h3 className="font-bold text-gray-900 mb-3 group-hover/card:translate-y-1 transition-all duration-300">
                  {member.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}