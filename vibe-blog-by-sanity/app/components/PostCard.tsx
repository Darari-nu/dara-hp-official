import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types'
import { urlFor } from '@/lib/sanity'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }


  return (
    <Link href={`/posts/${post.slug.current}`} className="post-card">
      <div 
        className="post-image"
        style={{
          backgroundImage: post.mainImage 
            ? `url(${urlFor(post.mainImage).width(400).height(225).url()})`
            : 'none',
          backgroundColor: post.mainImage ? 'transparent' : 'var(--surface-color)'
        }}
      >
        {!post.mainImage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--text-light)',
            fontSize: '0.875rem'
          }}>
            No Image
          </div>
        )}
      </div>
      <div className="post-content" style={{ 
        padding: '20px', 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        color: '#0F172A'
      }}>
        <h2 className="post-title" style={{ 
          fontSize: '1.25rem', 
          fontWeight: 700, 
          marginBottom: '8px',
          color: '#0F172A',
          lineHeight: '1.3'
        }}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="post-excerpt" style={{
            marginBottom: '12px',
            color: '#64748B',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            {post.excerpt}
          </p>
        )}
        <div className="post-meta" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#64748B'
        }}>
          <span>{formatDate(post.publishedAt)}</span>
          {post.categories && post.categories.length > 0 && (
            <span className="category-tag" style={{
              background: '#5B47E0',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              {post.categories[0].title}
            </span>
          )}
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags" style={{ marginTop: '8px' }}>
            {post.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag._id} 
                className="tag"
                style={{
                  background: tag.color || 'var(--surface-color)',
                  color: tag.color ? 'white' : 'var(--text-secondary)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  marginRight: '4px',
                  fontWeight: '500'
                }}
              >
                #{tag.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}