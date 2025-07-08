import { SparklesText } from "@/components/ui/sparkles-text";

export function UdemyComingSoon() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container text-center">
        <div className="space-y-12">
          <SparklesText 
            text="Udemy 講座" 
            className="text-3xl lg:text-4xl font-semibold text-gray-900"
            colors={{ first: "#4285F4", second: "#9E7AFF" }}
            sparklesCount={5}
          />
          
          <div className="text-3xl lg:text-4xl font-light text-gray-400 tracking-wide">
            Coming Soon...
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            企業のAI活用戦略から規制対応、ガバナンスサイクルの構築、マネジメント手法まで。現場で使える実践的知識を体系的に学べるコースを準備中です。
          </p>
        </div>
      </div>
    </section>
  );
}