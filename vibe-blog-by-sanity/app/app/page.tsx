import { client, postQuery } from '@/lib/sanity'
import { Post } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import StructuredData from '@/components/StructuredData'

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(postQuery)
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <>
      <StructuredData type="website" data={{}} />
      <Header />
      <main className="main">
        <div className="container">
          <section className="hero">
            <h1>Vibe Blog</h1>
            <p>
              Next.js 14とSanity CMSで構築されたモダンなブログシステム。
              <br />
              最新の技術スタックで、パフォーマンスとユーザビリティを追求しました。
            </p>
          </section>

          <div className="blog-layout">
            <div className="blog-main">
              <section className="posts-grid" aria-label="記事一覧">
                {posts.length > 0 ? (
                  posts.slice(0, 6).map((post) => <PostCard key={post._id} post={post} />)
                ) : (
                  <div className="loading">
                    まだ記事が投稿されていません。Sanity Studioから記事を作成してください。
                  </div>
                )}
              </section>
            </div>

            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <h3 className="widget-title">このブログについて</h3>
                <div className="widget-content">
                  <p>
                    Vibe Blogは、Next.js 14とSanity CMSを使用したモダンなブログシステムです。
                    技術的な知識やプログラミングに関する記事を中心に発信しています。
                  </p>
                </div>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">最新記事</h3>
                <div className="widget-content">
                  {posts.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {posts.slice(0, 3).map((post) => (
                        <li key={post._id} style={{ marginBottom: '12px' }}>
                          <a 
                            href={`/posts/${post.slug.current}`}
                            style={{ 
                              fontSize: '0.875rem',
                              lineHeight: '1.4',
                              color: 'var(--text-color)',
                              textDecoration: 'none'
                            }}
                          >
                            {post.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>記事がありません</p>
                  )}
                </div>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">カテゴリー</h3>
                <div className="widget-content">
                  <p>記事はカテゴリー別に整理されています。詳細は<a href="/categories">カテゴリーページ</a>をご覧ください。</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}