import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "AI規制対応はどの程度の期間が必要ですか？",
    answer: "企業の規模や業種により異なりますが、基本的なガイドライン策定であれば2-3週間、包括的な社内体制構築には1-2ヶ月程度が目安です。まずは現状分析を行い、具体的なスケジュールをご提案いたします。"
  },
  {
    id: "faq-2",
    question: "技術的な知識がなくても導入は可能ですか？",
    answer: "はい、技術的な専門知識は不要です。私たちが技術面は全てサポートし、現場の方々には業務に集中していただけるよう、わかりやすい形でご提案いたします。専門用語は使わず、実際の業務改善効果を重視したアプローチを取ります。"
  },
  {
    id: "faq-3",
    question: "費用はどの程度かかりますか？",
    answer: "プロジェクトの規模と内容により変動しますが、初期相談は無料です。具体的なご要望をお聞きした上で、明確な見積もりをご提示いたします。ROIを重視し、投資に見合う価値を必ずお届けします。"
  },
  {
    id: "faq-4",
    question: "遠隔地からでも支援を受けられますか？",
    answer: "はい、オンラインでの支援も可能です。Zoom等のビデオ会議ツールを活用し、対面と同等のサポートを提供いたします。必要に応じて現地訪問も対応いたします。"
  },
  {
    id: "faq-5",
    question: "既存システムとの連携は可能ですか？",
    answer: "既存システムとの連携も考慮したご提案をいたします。現在お使いのツールやシステムを最大限活用し、スムーズな導入を実現します。Slack、Microsoft Teams、各種SaaSツールとの連携実績も豊富です。"
  },
  {
    id: "faq-6",
    question: "導入後のサポートはありますか？",
    answer: "はい、導入後の継続サポートも提供しています。定期的な効果測定、改善提案、追加機能の実装など、長期的なパートナーとして伴走いたします。サポート内容は個別にカスタマイズ可能です。"
  }
];

export function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">
            よくある
            <span className="google-gradient">ご質問</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI導入に関してお客様からよくいただくご質問にお答えします
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="bg-gray-50 rounded-2xl border border-gray-200 px-6 data-[state=open]:bg-white data-[state=open]:shadow-lg transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors [&[data-state=open]]:text-blue-600">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold font-display mb-4 text-gray-900">
                他にご質問がございますか？
              </h3>
              <p className="text-gray-600 mb-6">
                お気軽にお問い合わせください。専門スタッフが丁寧にお答えいたします。
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors">
                お問い合わせする
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}