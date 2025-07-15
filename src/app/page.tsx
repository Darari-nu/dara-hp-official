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
      <main className="bg-gradient-to-br from-slate-50 via-gray-50 to-gray-100 text-slate-700 relative" style={{
        backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px'
      }}>
        {/* --- ヒーローセクション --- */}
        <MinimalHero />

        {/* --- お悩みセクション --- */}
        <ProblemsSection />

        {/* --- 新着記事セクション --- */}
        <section id="articles" className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">新着記事</h2>
              <p className="mt-4 text-lg text-slate-600">AI規制の最新動向から、ガバナンス整備のヒントをお届けします。</p>
            </div>
            <Blog8 posts={posts} />
          </div>
        </section>

        {/* --- 編集局メンバーセクション --- */}
        <section id="editorial" className="animate-on-scroll">
          <EditorialTeam />
        </section>
        
        <section id="works" className="animate-on-scroll">
          <SimpleWorkShowcase />
        </section>
        
        <section id="contact" className="animate-on-scroll">
          <UdemyComingSoon />
        </section>
      </main>
    </>
  );
}