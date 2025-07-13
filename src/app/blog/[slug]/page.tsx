import { notFound } from 'next/navigation';
import { client, queries } from '@/lib/sanity';
import { SanityBlogPost } from '@/types/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { Calendar, User, Tag } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// 記事データを取得する関数
async function getBlogPost(slug: string): Promise<SanityBlogPost | null> {
  try {
    const post = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        summary,
        content,
        publishedAt,
        mainImage,
        author->{
          _id,
          name,
          role,
          avatar
        },
        categories[]->{
          _id,
          title,
          slug
        },
        tags
      }`,
      { slug }
    );
    return post;
  } catch (error) {
    console.error('記事の取得に失敗:', error);
    return null;
  }
}

// 静的生成のためのパスを生成
export async function generateStaticParams() {
  try {
    const posts = await client.fetch(
      `*[_type == "blogPost"]{
        slug
      }`
    );
    
    return posts.map((post: any) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error('パス生成に失敗:', error);
    return [];
  }
}

// メタデータを生成
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: `${post.title} | だらリーヌ`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー画像とタイトル */}
      <section className="relative">
        <div className="aspect-[21/9] relative overflow-hidden">
          <Image
            src={post.mainImage 
              ? urlFor(post.mainImage).width(1920).height(800).url()
              : `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=800&fit=crop`
            }
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container py-16">
          <div className="max-w-4xl mx-auto">
            {/* カテゴリとタグ */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories?.filter(Boolean).map((category) => (
                <span
                  key={category._id}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800"
                >
                  {category?.title}
                </span>
              ))}
              {post.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-gray-100 text-gray-700"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* タイトル */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* サマリー */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.summary}
            </p>

            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 border-b border-gray-200 pb-8 mb-12">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author?.name || 'Unknown Author'}</span>
                <span className="text-sm text-gray-400">({post.author?.role || 'Writer'})</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{publishedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 記事本文 */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg prose-gray max-w-none">
              <PortableText value={post.content} />
            </article>
          </div>
        </div>
      </section>

      {/* 関連記事セクション */}
      <section className="py-16 bg-white border-t">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              他の記事も読んでみませんか？
            </h3>
            <a
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-colors"
            >
              ブログ一覧に戻る
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}