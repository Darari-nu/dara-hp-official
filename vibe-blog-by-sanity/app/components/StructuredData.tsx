interface StructuredDataProps {
  type: 'website' | 'article'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
    }

    if (type === 'website') {
      return {
        ...baseSchema,
        '@type': 'WebSite',
        name: 'Vibe Blog',
        description: 'Next.js 14とSanity CMSで構築されたモダンなブログシステム',
        url: 'https://yourdomain.com',
        publisher: {
          '@type': 'Organization',
          name: 'Vibe Projects',
          url: 'https://vibe-projects.com',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://yourdomain.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }
    }

    if (type === 'article') {
      return {
        ...baseSchema,
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.excerpt || data.title,
        image: data.image ? [data.image] : [],
        datePublished: data.publishedAt,
        dateModified: data.publishedAt,
        author: {
          '@type': 'Person',
          name: data.author?.name || 'Vibe Projects',
          url: 'https://vibe-projects.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Vibe Projects',
          logo: {
            '@type': 'ImageObject',
            url: 'https://yourdomain.com/logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url,
        },
        articleSection: data.categories?.[0]?.title || 'Technology',
        keywords: data.tags?.map((tag: any) => tag.title).join(', ') || 'technology, programming',
      }
    }

    return baseSchema
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateSchema()),
      }}
    />
  )
}