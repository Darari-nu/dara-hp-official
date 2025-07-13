import { MinimalHero } from "@/components/sections/MinimalHero";
import { Blog8 } from "@/components/sections/Blog8";
import { EditorialTeam } from "@/components/sections/EditorialTeam";
import { SimpleWorkShowcase } from "@/components/sections/SimpleWorkShowcase";
import { UdemyComingSoon } from "@/components/sections/UdemyComingSoon";
import { SectionDivider } from "@/components/ui/section-divider";
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
    <div className="min-h-screen">
      <MinimalHero />
      
      <SectionDivider />
      
      <Blog8 posts={posts} />
      
      <SectionDivider />
      
      <EditorialTeam />
      
      <SectionDivider />
      
      <SimpleWorkShowcase />
      
      <SectionDivider />
      
      <UdemyComingSoon />
    </div>
  );
}