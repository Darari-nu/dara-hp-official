import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { client, postDetailQuery } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { Post } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PortableText from '@/components/PortableText'
import StructuredData from '@/components/StructuredData'

interface PostPageProps {
  params: { slug: string }
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(postDetailQuery, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Vibe Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const structuredData = {
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    author: post.author,
    categories: post.categories,
    tags: post.tags,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : null,
    url: `https://yourdomain.com/posts/${post.slug.current}`,
  }

  return (
    <>
      <StructuredData type="article" data={structuredData} />
      <Header />
      <main className="article-detail">
        <div className="container">
          <div className="article-detail-content">
            <Link href="/" className="back-link">
              ← 記事一覧に戻る
            </Link>
            
            <article className="full-article">
              {post.mainImage && (
                <div className="article-hero-wrapper">
                  <img 
                    src={urlFor(post.mainImage).width(1200).height(675).url()}
                    alt={post.title}
                    className="article-hero-image"
                  />
                </div>
              )}
              
              <h1>{post.title}</h1>
              
              <div className="article-meta">
                <span className="post-date">{formatDate(post.publishedAt)}</span>
                {post.author && <span className="post-author">{post.author.name}</span>}
                {post.categories && post.categories.length > 0 && (
                  <span className="category-tag">{post.categories[0].title}</span>
                )}
              </div>

              <div className="article-content">
                {post.body ? (
                  <PortableText value={post.body} />
                ) : (
                  <p>コンテンツが見つかりません。</p>
                )}
              </div>

              {post.author && (
                <div className="author-info">
                  <h3>著者について</h3>
                  <div className="author-card">
                    {post.author.image && (
                      <img 
                        src={urlFor(post.author.image).width(80).height(80).url()}
                        alt={post.author.name}
                        className="author-avatar"
                      />
                    )}
                    <div className="author-details">
                      <h4>{post.author.name}</h4>
                      <p className="author-role">ブログ執筆者</p>
                      {post.author.bio && (
                        <div className="author-bio">
                          <PortableText value={post.author.bio} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}