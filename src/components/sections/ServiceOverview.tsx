import { FileText, Map, Search, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ServiceOverview() {
  const services = [
    {
      icon: FileText,
      title: "法規制ダイジェスト",
      description: "複雑な法規制情報を現場で使える形に要約。毎朝5分で最新動向をキャッチアップ。",
      features: [
        "毎日の法規制アップデート",
        "現場向けチェックリスト",
        "重要度別の情報整理"
      ],
      badge: "毎日更新",
      color: "bg-blue-500"
    },
    {
      icon: Map,
      title: "ロードマップ&事例集",
      description: "AI導入の具体的な進め方と同業他社の成功事例をセットで提供。",
      features: [
        "段階的な導入計画",
        "業界別成功事例",
        "ROI測定手法"
      ],
      badge: "実績重視",
      color: "bg-green-500"
    },
    {
      icon: Search,
      title: "ユースケース集",
      description: "部署別・業務別のAI活用アイデアを豊富に収録。すぐに試せる具体例付き。",
      features: [
        "部署別ユースケース",
        "実装難易度付き",
        "効果測定指標"
      ],
      badge: "即実践",
      color: "bg-purple-500"
    },
    {
      icon: Bot,
      title: "Slack Bot検証",
      description: "実際にSlack Botを構築・運用して、現場での使い勝手を検証。",
      features: [
        "カスタムBot開発",
        "48時間以内の納品",
        "運用サポート付き"
      ],
      badge: "実機検証",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">
            <span className="google-gradient">現場目線</span>のサービス
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            理論だけでなく、実際に現場で使える形でAI導入をサポートします
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative animate-fade-in-scale" style={{animationDelay: `${index * 0.15}s`}}>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:scale-105 hover:-translate-y-3">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl ${service.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-blue-100 hover:to-purple-100 hover:text-blue-800 transition-all duration-300 px-3 py-1 rounded-full font-medium">
                      {service.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold font-display mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3 group/item">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Outer glow effect */}
              <div className={`absolute inset-0 ${service.color} rounded-3xl filter blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-8">
            すべてのサービスを組み合わせて、包括的なAI導入支援を提供
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              法規制対応
            </Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
              戦略立案
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
              具体的実装
            </Badge>
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
              運用支援
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}