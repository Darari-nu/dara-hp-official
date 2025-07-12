import { MinimalHero } from "@/components/sections/MinimalHero";
import { Blog8 } from "@/components/sections/Blog8";
import { EditorialTeam } from "@/components/sections/EditorialTeam";
import { SimpleWorkShowcase } from "@/components/sections/SimpleWorkShowcase";
import { UdemyComingSoon } from "@/components/sections/UdemyComingSoon";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MinimalHero />
      <SectionDivider />
      <Blog8 />
      <SectionDivider />
      <EditorialTeam />
      <SectionDivider />
      <SimpleWorkShowcase />
      <SectionDivider />
      <UdemyComingSoon />
    </div>
  );
}