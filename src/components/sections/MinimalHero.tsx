import { ANIMATION } from '@/config/constants';

export function MinimalHero() {
  return (
    <section className="relative h-[43vw] min-h-[400px] max-h-[80vh] mt-20 flex items-center justify-center text-white text-center overflow-hidden">
      <div className="absolute inset-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative z-10 px-6 animate-on-scroll is-visible">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wider" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)', letterSpacing: '0.1em'}}>
          AIとなかよく
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-200" style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}>
          AIのルール作りから生産性向上まで、専門家が実践的なノウハウであなたの会社を次のステージへ導きます。
        </p>
        <div className="mt-10">
          <a 
            href="#articles" 
            className="bg-white text-slate-800 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-slate-200 transition-all transform hover:scale-105"
            style={{ transitionDuration: `${ANIMATION.duration.normal}ms` }}
          >
            最新記事をチェック
          </a>
        </div>
      </div>
    </section>
  );
}