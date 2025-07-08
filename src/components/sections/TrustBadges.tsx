import { Shield, TrendingUp, Zap } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "JTC社内AIガイドラインを構築・保守",
      description: "\"現場が迷わない\"チェックリストを常時アップデート",
      stats: "継続運用中",
      color: "bg-blue-500"
    },
    {
      icon: TrendingUp,
      title: "元プロダクトリーダー目線のAI改善提案",
      description: "ビジネスKPIに直結する実装ステップを設計",
      stats: "改善率 85%",
      color: "bg-green-500"
    },
    {
      icon: Zap,
      title: "SNSアイコン1,000枚以上の生成実績",
      description: "Midjourney活用で48h納品・ブランド統一もラク",
      stats: "1,000+ 枚",
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">
            実績と
            <span className="google-gradient">信頼</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            現場での経験と実績に基づいた、確実な成果をお約束します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="relative group animate-fade-in-scale" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="relative bg-white rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:scale-105 hover:-translate-y-2">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl ${badge.color} text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <badge.icon className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {badge.stats}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">実績</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold font-display mb-4 text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {badge.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {badge.description}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
                </div>
              </div>

              {/* Glow effect */}
              <div className={`absolute inset-0 ${badge.color} rounded-3xl filter blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-4">
              <strong>現場経験 × 技術知識 × 法規制理解</strong>
            </p>
            <p className="text-gray-600">
              単なるコンサルティングではなく、実際に手を動かして成果を出してきた実績があります。
              理論だけでなく、現場で本当に使える形での支援を提供します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}