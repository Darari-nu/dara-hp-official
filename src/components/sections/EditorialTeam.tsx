import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { TeamMember, SectionConfig } from "@/types";

const SECTION_CONFIG: SectionConfig = {
  title: "編集局メンバー",
  subtitle: "バラエティ豊かなメンバーでお送りします",
  sparklesConfig: {
    colors: { first: "#4285F4", second: "#34A853" },
    sparklesCount: 2
  }
};

const team: TeamMember[] = [
  {
    name: "だらリーヌ/ボス猫",
    role: "編集長",
    description: "JTC企業でAIルール作ってます！現場目線で解説します！",
    avatar: "/images/team/darane.jpg",
    emoji: "👩‍💼"
  },
  {
    name: "読書ギャル卍頭よくなりたい",
    role: "アシスタント",
    description: "とりま勉強中！むずかしいAI話をわかりやすく書きます♪",
    avatar: "/images/team/reading-girl.jpg",
    emoji: "📚"
  },
  {
    name: "インターンAI猫",
    role: "アシスタント",
    description: "にゃーん。最新のAI技術について調査してるにゃん。",
    avatar: "/images/team/intern-cat.jpg",
    emoji: "🐱"
  },
  {
    name: "AIろぼ",
    role: "アシスタント",
    description: "01010111 技術解説担当デス。データ分析ガ得意デス。",
    avatar: "/images/team/ai-robot.jpg",
    emoji: "🤖"
  }
];

export function EditorialTeam() {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title={SECTION_CONFIG.title}
          subtitle={SECTION_CONFIG.subtitle}
          sparklesConfig={SECTION_CONFIG.sparklesConfig}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 group/card relative card-hover"
            >
              {/* Avatar */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover object-center"
                  style={{ 
                    objectPosition: member.name === "読書ギャル卍頭よくなりたい" 
                      ? "50% 10%" 
                      : member.name === "だらリーヌ/ボス猫" 
                        ? "50% 5%" 
                        : "50% 50%" 
                  }}
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
              <h3 className="font-bold text-gray-900 mb-3">
                {member.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed text-pretty">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}