import Link from "next/link";
import { Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: About */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display text-white">
              AI規制・ガイドライン専門サイト
            </h3>
            <div className="space-y-4 text-white leading-relaxed text-base">
              <p className="text-white">
                AI規制の最新動向から実践的なガバナンス構築まで、企業のAI活用を安全に進めるための情報をお届けします。
              </p>
              <p className="text-white">
                法規制対応、社内ルール策定、リスク管理など、現場で役立つソリューションを提供しています。
              </p>
            </div>
          </div>
          
          {/* Right: Links & Social */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-white">リンク</h4>
                <ul className="space-y-3 text-white">
                  <li>
                    <Link href="/blog" className="text-white hover:text-white transition-colors">
                      ブログ
                    </Link>
                  </li>
                  <li>
                    <a href="#contact" className="text-white hover:text-white transition-colors">
                      お問い合わせ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-white transition-colors">
                      プライバシーポリシー
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-white">SNS</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-500 transition-all"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-500 transition-all"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-white">
          <p className="text-white">&copy; 2025 AI規制・ガイドライン専門サイト. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}