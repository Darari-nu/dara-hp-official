import Link from 'next/link'
import { client, categoriesQuery } from '@/lib/sanity'
import { Category } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

async function getCategories(): Promise<Category[]> {
  try {
    const categories = await client.fetch(categoriesQuery)
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export const metadata = {
  title: 'カテゴリー | Vibe Blog',
  description: 'Vibe Blogのカテゴリー一覧ページです。',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <section className="hero">
            <h1>カテゴリー</h1>
            <p>記事をカテゴリー別に分類しています。</p>
          </section>

          <section>
            <div className="posts-grid">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div key={category._id} className="post-card">
                    <div className="post-content">
                      <h2 className="post-title">
                        <Link href={`/categories/${category._id}`}>{category.title}</Link>
                      </h2>
                      {category.description && (
                        <p className="post-excerpt">{category.description}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="loading">
                  カテゴリーが見つかりません。Sanity Studioからカテゴリーを作成してください。
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