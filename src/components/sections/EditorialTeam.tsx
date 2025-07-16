import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { TeamMember } from "@/types";
import { SPARKLES_CONFIG } from "@/config/constants";

const SECTION_CONFIG = {
  title: "編集局メンバー",
  subtitle: "バラエティ豊かなメンバーでお送りします",
  sparklesConfig: SPARKLES_CONFIG.editorial
} as const;

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
    <section className="py-20 md:py-32 bg-gray-50/80">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title={SECTION_CONFIG.title}
          subtitle={SECTION_CONFIG.subtitle}
          sparklesConfig={SECTION_CONFIG.sparklesConfig}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {team.map((member, index) => (
            <div 
              key={index}
              className={`enhanced-card rounded-3xl p-8 text-center h-full flex flex-col animate-on-scroll group/card relative`}
              style={{transitionDelay: `${index * 100}ms`}}
            >
              {/* Avatar with enhanced styling */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="relative w-full h-full">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover object-center shadow-xl ring-4 ring-white/50 group-hover/card:ring-teal-200/50 transition-all duration-300"
                    style={{ 
                      objectPosition: member.name === "読書ギャル卍頭よくなりたい" 
                        ? "50% 10%" 
                        : member.name === "だらリーヌ/ボス猫" 
                          ? "50% 5%" 
                          : "50% 50%" 
                    }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500/10 to-teal-600/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute -bottom-2 -right-2 text-3xl transform group-hover/card:scale-110 transition-transform duration-300 drop-shadow-lg">
                  {member.emoji}
                </div>
              </div>

              {/* Role Badge with enhanced styling */}
              <div className="inline-flex items-center bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
                {member.role}
              </div>

              {/* Name with enhanced typography */}
              <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover/card:text-teal-600 transition-colors duration-300">
                {member.name}
              </h3>

              {/* Description with enhanced styling */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1 group-hover/card:text-slate-700 transition-colors duration-300">
                {member.description}
              </p>

              {/* Subtle background pattern */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/5 to-teal-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* Floating accent */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform scale-0 group-hover/card:scale-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}