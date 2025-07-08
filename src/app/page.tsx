import { MinimalHero } from "@/components/sections/MinimalHero";
import { Blog8 } from "@/components/sections/Blog8";
import { EditorialTeam } from "@/components/sections/EditorialTeam";
import { SimpleWorkShowcase } from "@/components/sections/SimpleWorkShowcase";
import { UdemyComingSoon } from "@/components/sections/UdemyComingSoon";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MinimalHero />
      
      {/* Subtle divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <Blog8 />
      
      {/* Subtle divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <EditorialTeam />
      
      {/* Subtle divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <SimpleWorkShowcase />
      
      {/* Subtle divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <UdemyComingSoon />
    </div>
  );
}