import { BlogPost, DataTransformResult } from '@/types';
import { SanityBlogPost } from '@/types/sanity';
import { urlFor } from '@/lib/sanity';

/**
 * Sanityブログデータをローカル形式に変換（柔軟な型対応）
 */
export function transformSanityBlogPost(sanityPost: any): BlogPost {
  // プレースホルダー画像のマッピング
  const placeholderImages = [
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop'
  ];
  
  // 安全にデータを抽出
  const author = typeof sanityPost.author === 'string' 
    ? sanityPost.author 
    : sanityPost.author?.name || 'Unknown Author';
    
  const tags = sanityPost.categories?.map((cat: any) => cat?.title).filter(Boolean) || 
               sanityPost.tags || 
               [];
               
  const image = sanityPost.mainImage 
    ? (typeof sanityPost.mainImage === 'string' 
        ? sanityPost.mainImage 
        : urlFor(sanityPost.mainImage).width(800).height(600).url())
    : placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    
  const slug = typeof sanityPost.slug === 'string' 
    ? sanityPost.slug 
    : sanityPost.slug?.current;
  
  return {
    id: sanityPost._id,
    title: sanityPost.title,
    summary: sanityPost.summary,
    author,
    published: new Date(sanityPost.publishedAt).toLocaleDateString('ja-JP'),
    tags,
    image,
    url: `/blog/${slug}`
  };
}

/**
 * 複数のSanityブログデータを安全に変換
 */
export function transformSanityBlogPosts(sanityPosts: any[]): DataTransformResult<BlogPost> {
  try {
    if (!Array.isArray(sanityPosts) || sanityPosts.length === 0) {
      return {
        data: [],
        hasError: false
      };
    }

    const validPosts = sanityPosts.filter(post => 
      post && 
      post.title && 
      post.slug?.current && 
      post.summary
    );

    const transformedPosts = validPosts.map(transformSanityBlogPost);

    return {
      data: transformedPosts,
      hasError: false
    };
  } catch (error) {
    console.error('ブログデータ変換エラー:', error);
    return {
      data: [],
      hasError: true,
      errorMessage: 'ブログデータの変換に失敗しました'
    };
  }
}

/**
 * nullやundefinedを安全に処理するヘルパー
 */
export function safeExtract<T>(
  data: T | null | undefined,
  fallback: T
): T {
  return data ?? fallback;
}

/**
 * 配列データの安全な処理
 */
export function safeArray<T>(
  data: T[] | null | undefined
): T[] {
  return Array.isArray(data) ? data : [];
}

/**
 * 画像URLの安全な取得
 */
export function safeImageUrl(
  image: any,
  fallbackUrl: string,
  width = 800,
  height = 600
): string {
  try {
    if (image && image.asset) {
      return urlFor(image).width(width).height(height).url();
    }
    return fallbackUrl;
  } catch (error) {
    console.warn('画像URL生成エラー:', error);
    return fallbackUrl;
  }
}