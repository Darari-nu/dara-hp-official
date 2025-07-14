import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Vibe Blog - Next.js & Sanity CMS',
    template: '%s | Vibe Blog'
  },
  description: 'Next.js 14とSanity CMSで構築されたモダンなブログシステム。技術記事やプログラミング情報を発信しています。',
  keywords: ['blog', 'nextjs', 'sanity', 'cms', 'typescript', 'react', 'programming', 'technology'],
  authors: [{ name: 'Vibe Projects', url: 'https://vibe-projects.com' }],
  creator: 'Vibe Projects',
  publisher: 'Vibe Projects',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://yourdomain.com',
    siteName: 'Vibe Blog',
    title: 'Vibe Blog - Next.js & Sanity CMS',
    description: 'Next.js 14とSanity CMSで構築されたモダンなブログシステム',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Blog - Next.js & Sanity CMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Blog - Next.js & Sanity CMS',
    description: 'Next.js 14とSanity CMSで構築されたモダンなブログシステム',
    images: ['/og-image.png'],
    creator: '@vibe_projects',
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#5B47E0" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}