import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '9kqjddwl',
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03' // use a UTC date string
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries
export const queries = {
  // ブログ記事関連
  getAllPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    summary,
    "author": author->{name, role, avatar},
    mainImage,
    "categories": categories[]->{title, slug},
    tags,
    publishedAt
  }`,
  
  getPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    "author": author->{name, role, description, avatar, emoji},
    mainImage,
    "categories": categories[]->{title, slug},
    tags,
    content,
    publishedAt
  }`,
  
  getLatestPosts: `*[_type == "blogPost" && isPublished == true] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    summary,
    "author": author->name,
    mainImage,
    "categories": categories[]->{title},
    tags,
    publishedAt,
    isPublished
  }`,
  
  // 著者関連
  getAllAuthors: `*[_type == "author"] | order(_createdAt asc) {
    _id,
    name,
    role,
    description,
    avatar,
    emoji
  }`,
  
  // FAQ関連
  getAllFAQs: `*[_type == "faq" && isPublished == true] | order(order asc) {
    _id,
    question,
    answer,
    category
  }`,
  
  // サイト設定
  getSiteSettings: `*[_type == "siteSettings"][0] {
    title,
    description,
    keywords,
    logo,
    favicon,
    socialMedia,
    contact,
    analytics
  }`
}