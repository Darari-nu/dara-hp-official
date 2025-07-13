import { MinimalHero } from "@/components/sections/MinimalHero";
import { Blog8 } from "@/components/sections/Blog8";
import { EditorialTeam } from "@/components/sections/EditorialTeam";
import { SimpleWorkShowcase } from "@/components/sections/SimpleWorkShowcase";
import { UdemyComingSoon } from "@/components/sections/UdemyComingSoon";
import { SectionDivider } from "@/components/ui/section-divider";
import { ScrollAnimations } from "@/components/ui/scroll-animations";
import { client, queries } from "@/lib/sanity";
import { SanityBlogPost } from "@/types/sanity";

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero takes full screen, no top padding needed */}
        <MinimalHero />
        
        {/* Flowing divider */}
        <div className="flowing-divider" />
        
        {/* Content sections with animation classes */}
        <section id="articles" className="animate-on-scroll">
          <Blog8 posts={posts} />
        </section>
        
        <div className="flowing-divider" />
        
        <section id="editorial" className="animate-on-scroll">
          <EditorialTeam />
        </section>
        
        <div className="flowing-divider" />
        
        <section id="works" className="animate-on-scroll">
          <SimpleWorkShowcase />
        </section>
        
        <div className="flowing-divider" />
        
        <section id="contact" className="animate-on-scroll">
          <UdemyComingSoon />
        </section>
      </div>
    </>
  );
}