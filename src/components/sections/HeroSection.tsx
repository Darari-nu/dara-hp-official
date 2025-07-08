import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-slide-in-up">
            <div className="space-y-6">
              <div className="inline-block">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium animate-glow">
                  ✨ AI規制の専門家がサポート
                </Badge>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight">
                <span className="google-gradient animate-sparkle">AI</span>
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">使ってますか？</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium">
                AIガイドライン、
                <span className="text-blue-600 font-bold">現場目線</span>で翻訳します。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  今日のアップデートを見る
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="group gradient-border hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 px-8 py-4 text-lg rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  💬 無料相談してみる
                  <span className="group-hover:scale-110 transition-transform">✨</span>
                </span>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1,000+</div>
                <div className="text-sm text-gray-500">実装実績</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-500">改善成功率</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">48h</div>
                <div className="text-sm text-gray-500">最短納期</div>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Image with Effects */}
          <div className="relative animate-fade-in-scale" style={{animationDelay: "0.3s"}}>
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl filter blur-xl opacity-20 animate-pulse"></div>
              
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 animate-float">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
                  alt="AI Technology"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
            
            {/* Enhanced Floating Badges */}
            <div className="absolute -top-6 -right-6 animate-bounce">
              <Badge className="glassmorphism bg-blue-600/90 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
                <span className="flex items-center gap-2">
                  🛡️ AI規制対応
                </span>
              </Badge>
            </div>
            
            <div className="absolute top-1/2 -left-6 animate-float">
              <Badge className="glassmorphism bg-green-600/90 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
                <span className="flex items-center gap-2">
                  🎯 現場目線
                </span>
              </Badge>
            </div>
            
            <div className="absolute -bottom-6 right-1/4 animate-bounce" style={{animationDelay: "0.5s"}}>
              <Badge className="glassmorphism bg-purple-600/90 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
                <span className="flex items-center gap-2">
                  ⚖️ 法規制サポート
                </span>
              </Badge>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-12 right-8 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}