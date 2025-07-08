import Link from "next/link";
import { Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: About */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display">
              だらリーヌ
            </h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                AI規制・ガイドライン専門コンサルタント。JTC企業でのAIルール策定経験を活かし、現場目線で複雑な法規制を翻訳します。
              </p>
              <p>
                企業のAI活用戦略から規制対応、ガバナンス構築まで、実践的なソリューションを提供しています。
              </p>
            </div>
          </div>
          
          {/* Right: Links & Social */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">リンク</h4>
                <ul className="space-y-3 text-gray-300">
                  <li>
                    <Link href="/blog" className="hover:text-white transition-colors">
                      ブログ
                    </Link>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-white transition-colors">
                      お問い合わせ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      プライバシーポリシー
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">SNS</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-all"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-all"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 だらリーヌ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}