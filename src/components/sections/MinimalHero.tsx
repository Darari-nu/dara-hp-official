"use client";

import { ANIMATION } from '@/config/constants';

export function MinimalHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] max-h-[600px] mt-20 flex items-center justify-center text-white text-center overflow-hidden">
      <div className="absolute inset-0">
        <video 
          key="/hero-video.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata"
          controls={false}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ 
            backgroundColor: '#1e293b',
            objectPosition: 'center center'
          }}
          onError={(e) => console.error('Video error:', e)}
          onLoadedData={() => console.log('Video loaded successfully')}
          onCanPlay={() => console.log('Video can play')}
          poster="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=800&fit=crop&crop=center"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video-old.mp4" type="video/mp4" />
          あなたのブラウザは動画をサポートしていません。
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
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#articles" 
            className="text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 hover:shadow-xl whitespace-nowrap min-w-[200px] text-center"
            style={{ 
              transitionDuration: `${ANIMATION.duration.normal}ms`,
              background: 'linear-gradient(135deg, #14b8a6, #06b6d4, #0891b2) !important',
              backgroundImage: 'linear-gradient(135deg, #14b8a6, #06b6d4, #0891b2) !important'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.setProperty('background-image', 'linear-gradient(135deg, #0d9488, #0891b2, #0e7490)', 'important');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('background-image', 'linear-gradient(135deg, #14b8a6, #06b6d4, #0891b2)', 'important');
            }}
          >
            最新記事をチェック
          </a>
          <a 
            href="#works" 
            className="text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 hover:shadow-xl whitespace-nowrap min-w-[200px] text-center"
            style={{ 
              transitionDuration: `${ANIMATION.duration.normal}ms`,
              background: 'linear-gradient(135deg, #10b981, #14b8a6, #0d9488) !important',
              backgroundImage: 'linear-gradient(135deg, #10b981, #14b8a6, #0d9488) !important'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.setProperty('background-image', 'linear-gradient(135deg, #059669, #0d9488, #0f766e)', 'important');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('background-image', 'linear-gradient(135deg, #10b981, #14b8a6, #0d9488)', 'important');
            }}
          >
            AI事例をチェック
          </a>
        </div>
      </div>
    </section>
  );
}