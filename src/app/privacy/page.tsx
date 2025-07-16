import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | AI規制・ガイドライン専門サイト',
  description: 'AI規制・ガイドライン専門サイトのプライバシーポリシーページです。個人情報の取り扱いについて説明しています。',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            プライバシーポリシー
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. 個人情報の収集について</h2>
              <p>
                当サイトでは、お問い合わせフォームやメール送信時に、お名前、メールアドレス、お問い合わせ内容などの個人情報を収集する場合があります。
                これらの情報は、お客様からのお問い合わせに対する回答やサービス提供のためにのみ使用いたします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. 個人情報の利用目的</h2>
              <p>収集した個人情報は、以下の目的で利用いたします：</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>お問い合わせへの回答・対応</li>
                <li>サービス・コンテンツの提供</li>
                <li>重要なお知らせの配信</li>
                <li>サイト改善のための分析</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. 個人情報の第三者提供</h2>
              <p>
                当サイトでは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cookieの使用について</h2>
              <p>
                当サイトでは、サイトの利用状況の分析やユーザーエクスペリエンスの向上のため、Cookieを使用する場合があります。
                Cookieの使用を希望されない場合は、ブラウザの設定で無効にすることができます。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. アクセス解析ツール</h2>
              <p>
                当サイトでは、Google Analytics等のアクセス解析ツールを使用しています。
                これらのツールはCookieを使用してアクセス情報を収集しますが、個人を特定する情報は含まれません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. 個人情報の管理</h2>
              <p>
                お客様の個人情報は、不正アクセス、紛失、破損、改ざん、漏洩などを防ぐため、適切なセキュリティ対策を実施しています。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. 個人情報の開示・訂正・削除</h2>
              <p>
                お客様は、当サイトが保有する個人情報の開示・訂正・削除を求めることができます。
                ご希望の場合は、下記のお問い合わせ先までご連絡ください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. プライバシーポリシーの変更</h2>
              <p>
                当サイトでは、必要に応じてプライバシーポリシーを変更する場合があります。
                変更後のプライバシーポリシーは、当サイトに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. お問い合わせ先</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2">
                  <strong>AI規制・ガイドライン専門サイト</strong>
                </p>
                <p className="mb-2">
                  <strong>メール：</strong>
                  <a href="mailto:dararinu52@gmail.com" className="text-teal-600 hover:text-teal-800">
                    dararinu52@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Twitter：</strong>
                  <a 
                    href="https://x.com/madaladalarin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-800"
                  >
                    @madaladalarin
                  </a>
                </p>
              </div>
            </section>

            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                制定日：2025年7月16日<br />
                最終更新日：2025年7月16日
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}