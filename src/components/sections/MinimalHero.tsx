export function MinimalHero() {
  // Midjourneyで生成した画像のURLをここに設定してください
  const heroImageUrl = 'https://images.unsplash.com/photo-1635070045095-2337f27a5391?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center justify-center text-white text-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImageUrl} alt="Abstract background image" className="w-full h-full object-cover scale-110 blur-sm"/>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 px-6 animate-on-scroll is-visible">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
          AIと、もっと軽やかに。
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-200" style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}>
          AIのルール作りから生産性向上まで、専門家が実践的なノウハウであなたの会社を次のステージへ導きます。
        </p>
        <div className="mt-10">
          <a href="#articles" className="bg-white text-slate-800 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-slate-200 transition-all duration-300 transform hover:scale-105">
            最新記事をチェック
          </a>
        </div>
      </div>
    </section>
  );
}