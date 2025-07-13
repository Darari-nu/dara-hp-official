import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/ui/sparkles-text";

export function MinimalHero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1635070045095-2337f27a5391?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3')",
          filter: "blur(0.5px)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-purple-900/20" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{top: '20%', left: '10%', animationDelay: '0s'}}></div>
        <div className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse" style={{top: '60%', left: '80%', animationDelay: '1s'}}></div>
        <div className="absolute w-3 h-3 bg-purple-400/20 rounded-full animate-pulse" style={{top: '80%', left: '20%', animationDelay: '2s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 animate-on-scroll is-visible">
        <div className="mb-8">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-4" style={{textShadow: '0 4px 20px rgba(0,0,0,0.5)'}}>
            <SparklesText 
              text="AI"
              colors={{ first: "#4285F4", second: "#34A853" }}
              sparklesCount={3}
            />
            と、もっと軽やかに。
          </h1>
          
          <p className="text-xl lg:text-2xl font-light mb-8 max-w-4xl mx-auto leading-relaxed" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
            AIのルール作りから生産性向上まで、<br className="hidden sm:block" />
            専門家が実践的なノウハウで<span className="font-semibold text-blue-300">あなたの会社を次のステージへ</span>
          </p>
        </div>
        
        <div className="mb-12 space-y-3 text-base lg:text-lg opacity-90 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-2 group">
            <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform"></div>
            <p>社内ルール、まだ整備されてない？</p>
          </div>
          <div className="flex items-center justify-center space-x-2 group">
            <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:scale-125 transition-transform"></div>
            <p className="font-medium">AI使って大丈夫？その判断、誰がする？</p>
          </div>
          <div className="flex items-center justify-center space-x-2 group">
            <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></div>
            <p>いきなり&quot;AI導入しろ&quot;って言われても...</p>
          </div>
        </div>
        
        <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto font-medium" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
          現場目線で、<span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">一つずつ解決しましょう</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/blog">
            <Button 
              size="lg" 
              className="bg-white text-slate-800 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-2 px-10 py-5 text-xl rounded-full font-semibold transition-all duration-500 transform hover:scale-105 shadow-xl"
            >
              最新記事をチェック
            </Button>
          </Link>
          <a href="#works">
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:shadow-2xl hover:-translate-y-2 px-10 py-5 text-xl rounded-full font-semibold transition-all duration-500 transform hover:scale-105"
            >
              作例を見る
            </Button>
          </a>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">スクロール</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}