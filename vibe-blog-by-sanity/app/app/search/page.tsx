import { Suspense } from 'react'
import { client } from '@/lib/sanity'
import { Post } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import SearchBox from '@/components/SearchBox'
import styles from './search.module.css'

interface SearchPageProps {
  searchParams: { q?: string }
}

async function searchPosts(query: string): Promise<Post[]> {
  if (!query.trim()) return []
  
  try {
    const searchQuery = `
      *[_type == "post" && defined(slug.current) && (
        title match "*${query}*" ||
        excerpt match "*${query}*" ||
        categories[]->title match "*${query}*"
      )] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        "author": author->{name, image},
        "categories": categories[]->{_id, title}
      }
    `
    const posts = await client.fetch(searchQuery)
    return posts
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

function SearchResults({ query }: { query: string }) {
  return (
    <Suspense fallback={<div className={styles.loading}>検索中...</div>}>
      <SearchResultsContent query={query} />
    </Suspense>
  )
}

async function SearchResultsContent({ query }: { query: string }) {
  const posts = await searchPosts(query)

  return (
    <div>
      <h2 className={styles.searchResultsTitle}>
        「{query}」の検索結果 ({posts.length}件)
      </h2>
      
      {posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p>該当する記事が見つかりませんでした。</p>
          <p>別のキーワードで検索してみてください。</p>
        </div>
      )}
    </div>
  )
}

export const metadata = {
  title: '検索 | Vibe Blog',
  description: 'Vibe Blogの記事を検索します。',
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className={styles.searchPage}>
            <h1 className={styles.searchPageTitle}>記事検索</h1>
            <SearchBox />
            
            {query && <SearchResults query={query} />}
            
            {!query && (
              <div className={styles.searchPlaceholder}>
                <p>検索したいキーワードを入力してください。</p>
                <p>記事のタイトル、本文、カテゴリーから検索できます。</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      
    </>
  )
}