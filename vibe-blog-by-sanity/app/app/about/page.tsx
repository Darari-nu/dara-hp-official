import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About | Vibe Blog',
  description: 'Vibe Blogについての詳細情報です。',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <article className="article">
            <header className="article-header">
              <h1 className="article-title">About Vibe Blog</h1>
              <p className="hero p">モダンな技術で構築されたブログシステム</p>
            </header>

            <div className="article-content">
              <h2>技術スタック</h2>
              <p>
                Vibe BlogはNext.js 14とSanity CMSを組み合わせた、モダンなヘッドレスCMSブログシステムです。
                以下の技術を使用して構築されています：
              </p>

              <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
                <li>Next.js 14 - React フレームワーク</li>
                <li>TypeScript - 型安全な開発</li>
                <li>Sanity CMS - ヘッドレスCMS</li>
                <li>Vercel - ホスティング・デプロイメント</li>
              </ul>

              <h2>特徴</h2>
              <p>
                このブログシステムは以下の特徴を持っています：
              </p>

              <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
                <li>🚀 高速なページ読み込み</li>
                <li>📱 レスポンシブデザイン</li>
                <li>✏️ リアルタイム編集機能</li>
                <li>🎨 カスタマイズ可能なデザイン</li>
                <li>🔍 SEO最適化済み</li>
                <li>📈 アナリティクス対応</li>
              </ul>

              <h2>Sanity Studio</h2>
              <p>
                コンテンツの管理はSanity Studioで行います。
                直感的なインターフェースで記事の作成・編集・公開が可能です。
              </p>

              <h2>お問い合わせ</h2>
              <p>
                ご質問やお問い合わせがございましたら、
                <a href="mailto:info@vibe-projects.com">info@vibe-projects.com</a>
                までご連絡ください。
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}