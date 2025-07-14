import { PortableText as BasePortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import React from 'react'

// 画像のテキストパターンをマッチして画像に変換する関数
function processImageText(text: string): React.ReactNode[] {
  const imagePattern = /\[画像:\s*([^\]]+)\]\s*(https?:\/\/[^\s]+)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = imagePattern.exec(text)) !== null) {
    // マッチ前のテキスト
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // 画像をレンダリング
    const [, altText, imageUrl] = match
    parts.push(
      <img
        key={match.index}
        src={imageUrl}
        alt={altText.trim()}
        className="w-full h-auto my-8 rounded-lg shadow-md"
        loading="lazy"
      />
    )

    lastIndex = match.index + match[0].length
  }

  // 残りのテキスト
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      
      return (
        <div className="my-8">
          <img
            src={urlFor(value).width(1200).height(675).url()}
            alt={value.alt || 'Blog image'}
            className="w-full h-auto rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1>{children}</h1>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    normal: ({ children }: any) => {
      // 子要素がテキストの場合、画像パターンをチェック
      const processedChildren = React.Children.map(children, (child) => {
        if (typeof child === 'string') {
          return processImageText(child)
        }
        return child
      })
      
      return <p>{processedChildren}</p>
    },
    blockquote: ({ children }: any) => (
      <blockquote>
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    code: ({ children }: any) => (
      <code>{children}</code>
    ),
  },
}

interface PortableTextProps {
  value: any[]
}

export default function PortableText({ value }: PortableTextProps) {
  return <BasePortableText value={value} components={PortableTextComponents} />
}