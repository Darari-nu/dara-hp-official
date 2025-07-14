export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt?: string
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  body?: any[]
  author?: Author
  categories?: Category[]
  tags?: Tag[]
}

export interface Author {
  _id: string
  name: string
  image?: {
    asset: {
      _ref: string
    }
  }
  bio?: any[]
}

export interface Category {
  _id: string
  title: string
  description?: string
}

export interface Tag {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color?: string
}