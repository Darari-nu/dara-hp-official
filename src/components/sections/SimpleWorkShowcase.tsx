import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Work } from "@/types";

const SECTION_CONFIG = {
  title: "作例",
  sparklesConfig: {
    colors: { first: "#9E7AFF", second: "#FE8BBB" },
    sparklesCount: 4
  }
};

// ユーザーが作成するLPの例（後で実際のものに差し替え）
const works: Work[] = [
  {
    id: "1",
    title: "サンプルLP 1",
    description: "準備中...",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    url: "#"
  },
  {
    id: "2", 
    title: "サンプルLP 2",
    description: "準備中...",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    url: "#"
  },
  {
    id: "3",
    title: "サンプルLP 3", 
    description: "準備中...",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    url: "#"
  }
];

export function SimpleWorkShowcase() {
  return (
    <section id="works" className="py-32 bg-white">
      <div className="container">
        <SectionHeader 
          title={SECTION_CONFIG.title}
          sparklesConfig={SECTION_CONFIG.sparklesConfig}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <div 
              key={work.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 group/card relative"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {work.url && work.url !== "#" && (
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-gray-700" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="relative">
                  <div className="absolute left-0 inset-y-0 h-5 group-hover/card:h-7 w-1 rounded-tr-full rounded-br-full bg-gray-200 group-hover/card:bg-green-500 transition-all duration-300 origin-center" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:translate-x-3 transition-all duration-300 pl-4">
                    {work.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {work.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}