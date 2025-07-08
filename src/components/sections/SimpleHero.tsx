import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SimpleHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold font-display leading-tight">
                <span className="google-gradient">AI</span>
                <span className="text-gray-900">使ってますか？</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                現場目線でAI活用をサポート。<br />
                法規制から実装事例まで、実践的な情報をお届けします。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/blog">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  ブログを見る →
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg rounded-2xl border-2 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
              >
                💬 相談してみる
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1,000+</div>
                <div className="text-sm text-gray-500">SNSアイコン生成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">48h</div>
                <div className="text-sm text-gray-500">最短納期</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">90%</div>
                <div className="text-sm text-gray-500">満足度</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
                alt="AI Technology"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium">
              🛡️ AI規制対応
            </div>
            <div className="absolute top-1/2 -left-4 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium">
              🎯 現場目線
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}