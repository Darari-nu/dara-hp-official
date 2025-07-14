import { client, postQuery } from '@/lib/sanity'
import { Post } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(postQuery)
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const metadata = {
  title: '記事一覧 | Vibe Blog',
  description: 'Vibe Blogの全記事一覧ページです。',
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <section className="hero">
            <h1>記事一覧</h1>
            <p>Vibe Blogの全記事を一覧でご覧いただけます。</p>
          </section>

          <section>
            <div className="posts-grid">
              {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <div className="loading">
                  まだ記事が投稿されていません。Sanity Studioから記事を作成してください。
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}