import { Calendar, CheckCircle, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  const benefits = [
    {
      icon: Clock,
      text: "わずか15分で現状課題を整理"
    },
    {
      icon: CheckCircle,
      text: "具体的な改善案をその場でご提案"
    },
    {
      icon: Users,
      text: "専門チームによる無料相談"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
              15分無料ヒアリングを
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                今すぐ予約
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8">
              あなたの会社に最適なAI活用法を、専門家が無料でご提案します
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/10 rounded-2xl p-6 backdrop-blur">
                <benefit.icon className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                <span className="text-left font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 mb-12">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all"
            >
              <Calendar className="w-6 h-6 mr-3" />
              無料ヒアリングを予約する
            </Button>
            <p className="text-blue-200 text-sm">
              ※ 無理な営業は一切いたしません
            </p>
          </div>

          {/* Trust Elements */}
          <div className="bg-white/5 rounded-3xl p-8 backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">48h</div>
                <div className="text-blue-200">最短納期</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">1,000+</div>
                <div className="text-blue-200">実装実績</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">85%</div>
                <div className="text-blue-200">改善成功率</div>
              </div>
            </div>
          </div>

          {/* Contact Alternative */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-200 mb-4">
              お急ぎの場合は直接お電話・メールでも承ります
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <a href="mailto:contact@example.com" className="text-white hover:text-yellow-300 transition-colors">
                ✉️ contact@madaladalarin.com
              </a>
              <a href="tel:+81-3-1234-5678" className="text-white hover:text-yellow-300 transition-colors">
                📞 03-1234-5678（平日 9:00-18:00）
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}