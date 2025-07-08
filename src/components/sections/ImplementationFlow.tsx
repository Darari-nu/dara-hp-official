import { CheckCircle, ArrowRight } from "lucide-react";

export function ImplementationFlow() {
  const steps = [
    {
      number: 1,
      title: "現状分析",
      description: "既存業務とAI適用可能性の評価",
      details: "現在の業務フロー、課題、リソースを詳細に分析し、AI導入の最適なポイントを特定します。",
      duration: "1週間"
    },
    {
      number: 2,
      title: "戦略立案",
      description: "導入計画とROI試算の策定",
      details: "具体的な導入スケジュール、必要な投資額、期待効果を明確にした戦略を立案します。",
      duration: "1週間"
    },
    {
      number: 3,
      title: "プロトタイプ",
      description: "小規模実装による効果検証",
      details: "実際に動作するプロトタイプを構築し、現場での有効性を検証します。",
      duration: "2週間"
    },
    {
      number: 4,
      title: "本格導入",
      description: "段階的な機能拡張と浸透",
      details: "検証結果を基に本格的な導入を開始し、段階的に機能を拡張していきます。",
      duration: "1ヶ月"
    },
    {
      number: 5,
      title: "運用改善",
      description: "継続的な最適化とサポート",
      details: "導入後の効果測定と継続的な改善により、長期的な成果を確保します。",
      duration: "継続"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">
            確実な成果に導く
            <span className="google-gradient">5つのステップ</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            段階的で確実な導入プロセスにより、リスクを最小限に抑えながら最大の効果を実現します
          </p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-16 left-0 w-full h-0.5 bg-gray-200 hidden lg:block">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-4/5"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                  {/* Step Number */}
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold text-xl mb-6 mx-auto relative z-10">
                    {step.number}
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="text-center mb-4">
                    <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {step.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold font-display text-center mb-3 text-gray-900">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center mb-4 text-sm">
                    {step.description}
                  </p>
                  
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {step.details}
                  </p>
                </div>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-16 text-gray-400">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-xl font-bold text-gray-900">成功保証</h3>
            </div>
            <p className="text-gray-700 mb-4">
              各ステップで明確な成果物を定義し、段階的に価値を実証します。
            </p>
            <p className="text-gray-600 text-sm">
              万が一期待される効果が得られない場合は、追加サポートを無償で提供いたします。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}