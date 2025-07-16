import { MinimalHero } from "@/components/sections/MinimalHero";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { Blog8 } from "@/components/sections/Blog8";
import { EditorialTeam } from "@/components/sections/EditorialTeam";
import { SimpleWorkShowcase } from "@/components/sections/SimpleWorkShowcase";
import { UdemyComingSoon } from "@/components/sections/UdemyComingSoon";
import { ScrollAnimations } from "@/components/ui/scroll-animations";
import { client, queries } from "@/lib/sanity";

// データを取得する関数
async function getPageData() {
  try {
    const posts = await client.fetch(queries.getLatestPosts);
    return { posts };
  } catch (error) {
    console.error('Sanityからのデータ取得に失敗:', error);
    return { posts: [] };
  }
}

export default async function Home() {
  const { posts } = await getPageData();

  return (
    <>
      <ScrollAnimations />
      <main className="bg-gradient-to-br from-slate-50 via-gray-50 to-gray-100 text-slate-700 relative">
        {/* 背景幾何学図形 */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-16 left-8 w-48 h-48 bg-teal-500 opacity-12 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-1/4 right-12 w-64 h-64 bg-teal-600 opacity-10 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-teal-400 opacity-15 rounded-full blur-lg animate-float-reverse"></div>
          <div className="absolute bottom-16 right-1/4 w-56 h-56 bg-teal-500 opacity-10 rounded-full blur-xl animate-fade-in-out"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-teal-300 opacity-8 rounded-full blur-lg animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        {/* --- ヒーローセクション --- */}
        <div className="relative z-10">
          <MinimalHero />
        </div>

        {/* --- お悩みセクション --- */}
        <div className="relative z-10">
          <ProblemsSection />
        </div>

        {/* --- 新着記事セクション --- */}
        <section id="articles" className="py-20 md:py-28 relative z-10 bg-gray-50/80">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">新着記事</h2>
              <p className="mt-4 text-lg text-slate-600">AI規制の最新動向から、ガバナンス整備のヒントをお届けします。</p>
            </div>
            <Blog8 posts={posts} />
          </div>
        </section>

        {/* --- 編集局メンバーセクション --- */}
        <section id="editorial" className="animate-on-scroll relative z-10">
          <EditorialTeam />
        </section>
        
        <section id="works" className="animate-on-scroll relative z-10">
          <SimpleWorkShowcase />
        </section>
        
        <section id="contact" className="animate-on-scroll relative z-10">
          <UdemyComingSoon />
        </section>
      </main>
    </>
  );
}