import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MinimalHero() {
  return (
    <section className="relative aspect-video max-h-[80vh] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl lg:text-5xl font-semibold mb-8">
          <span className="google-gradient">AI</span>導入、何から始める？
        </h1>
        
        <div className="mb-4 space-y-1 text-sm lg:text-base opacity-80 max-w-2xl mx-auto">
          <p>• 社内ルール、まだ整備されてない？</p>
          <p className="font-medium">• AI使って大丈夫？その判断、誰がする？</p>
          <p>• いきなり&quot;AI導入しろ&quot;って言われても...</p>
        </div>
        
        <p className="text-base lg:text-lg mb-10 max-w-2xl mx-auto opacity-85 font-medium">
          現場目線で、一つずつ解決しましょう
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blog">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1 px-8 py-4 text-lg rounded-2xl font-medium transition-all duration-300"
            >
              記事を読む
            </Button>
          </Link>
          <a href="#works">
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hover:shadow-lg hover:-translate-y-1 px-8 py-4 text-lg rounded-2xl transition-all duration-300"
            >
              作例を見る
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}