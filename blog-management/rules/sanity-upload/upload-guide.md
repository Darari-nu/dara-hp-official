# Sanity CMS アップロード手順書

## 🎯 概要

だらリーヌ公式サイトのブログ記事をSanity CMSに投稿する包括的なガイドです。
手動投稿からAPI自動投稿まで、すべての方法を網羅しています。

## 🔑 アクセス情報

### Sanity Studio
- **URL**: http://localhost:3333
- **プロジェクトID**: 9kqjddwl
- **データセット**: production
- **API Version**: 2023-05-03

### 認証トークン
```bash
# .env.local に設定済み
SANITY_API_READ_TOKEN=sk2quzM3iWhkWT5g68tUu2tOaAS4FGwLEnmRxBaIgwwzePXixE4JfXcP6rjuouohVdW4DNde3KY0t6MQgCplq6qLRQnLXDhD6jM3phvOqRFnMWvmCJqy2j65mxSUugZo3JYhxtt8KS3pUW0AfBw3PiraH4fDEc1je4mnEM6dnx1GlpuaIYnf
```

## 📝 方法1: Sanity Studio手動投稿

### ステップ1: Sanity Studioにアクセス
```bash
# Sanity Studio起動
npm run sanity

# ブラウザで以下にアクセス
http://localhost:3333
```

### ステップ2: 新規記事作成
1. 左メニューの「Blog Post」をクリック
2. 右上の「Create」ボタンをクリック
3. 「Blog Post」を選択

### ステップ3: 基本情報入力
```markdown
【必須フィールド】
- Title: 記事タイトル
- Slug: URL用スラッグ（自動生成推奨）
- Summary: 記事概要（120文字以内）
- Content: 記事本文（Portable Text）
- Author: 著者選択
- Published: 公開フラグ

【任意フィールド】
- Main Image: アイキャッチ画像
- Categories: カテゴリ（複数選択可）
- Tags: タグ（文字列配列）
- SEO: メタタイトル・ディスクリプション
```

### ステップ4: 本文入力（Portable Text）
```markdown
【使用可能な要素】
- 見出し（H2, H3, H4）
- 段落
- リスト（箇条書き・番号付き）
- 引用
- 太字・イタリック
- リンク
- 画像（インライン）
- コードブロック
```

### ステップ5: 画像アップロード
1. 「Main Image」セクションをクリック
2. 「Upload」ボタンから画像を選択
3. Alt textを入力（SEO対応）
4. ホットスポットを設定（任意）

### ステップ6: SEO設定
```yaml
Meta Title: 記事タイトル（32文字以内推奨）
Meta Description: 記事説明（160文字以内）
```

### ステップ7: 公開
1. 「Published」チェックボックスをON
2. 右上の「Publish」ボタンをクリック
3. 確認メッセージで「Publish」を再度クリック

## 🤖 方法2: API自動投稿

### 事前準備
```bash
# 必要なパッケージがインストール済みか確認
npm list @sanity/client
```

### サンプルスクリプト作成
```javascript
// scripts/sanity/create-blog-post.js
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9kqjddwl',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_READ_TOKEN
});

async function createBlogPost(postData) {
  try {
    const doc = {
      _type: 'blogPost',
      title: postData.title,
      slug: {
        _type: 'slug',
        current: postData.slug
      },
      summary: postData.summary,
      content: postData.content, // Portable Text配列
      publishedAt: new Date().toISOString(),
      isPublished: true,
      tags: postData.tags || [],
      seo: {
        metaTitle: postData.metaTitle,
        metaDescription: postData.metaDescription
      }
    };

    const result = await client.create(doc);
    console.log('投稿完了:', result._id);
    return result;
  } catch (error) {
    console.error('投稿エラー:', error);
    throw error;
  }
}
```

### スクリプト実行
```bash
# 環境変数設定（必要に応じて）
export SANITY_API_READ_TOKEN="your-token-here"

# スクリプト実行
node scripts/sanity/create-blog-post.js
```

## 🖼️ 画像管理

### 画像アップロード（API）
```javascript
async function uploadImage(imagePath, filename) {
  const fs = require('fs');
  const imageBuffer = fs.readFileSync(imagePath);
  
  const imageAsset = await client.assets.upload('image', imageBuffer, {
    filename: filename,
    contentType: 'image/png' // または適切なMIMEタイプ
  });
  
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: imageAsset._id
    },
    alt: 'Alt text here'
  };
}
```

### 画像最適化
```markdown
【推奨仕様】
- 形式: PNG, JPG, WebP
- 最大サイズ: 1920x1080px
- ファイルサイズ: 2MB以下
- アスペクト比: 16:9（記事カード用）
```

## 📋 データ構造

### ブログ記事スキーマ
```typescript
interface BlogPost {
  _type: 'blogPost';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  summary: string;
  content: Block[]; // Portable Text
  mainImage?: Image;
  author?: Reference<Author>;
  categories?: Reference<Category>[];
  tags?: string[];
  publishedAt: string;
  isPublished: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}
```

### Portable Textブロック例
```javascript
const sampleContent = [
  {
    _type: 'block',
    _key: 'intro',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: 'こんにちは！AIギャルアシスタントです♪'
      }
    ]
  },
  {
    _type: 'block',
    _key: 'heading1',
    style: 'h2',
    children: [
      {
        _type: 'span',
        text: 'メインセクションタイトル'
      }
    ]
  },
  {
    _type: 'block',
    _key: 'content1',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: '通常の段落テキストです。',
        marks: []
      },
      {
        _type: 'span',
        text: '太字のテキスト',
        marks: ['strong']
      }
    ]
  }
];
```

## 🔧 トラブルシューティング

### よくあるエラーと解決法

#### 1. "Missing keys" エラー
```
原因: Portable Textブロックに_keyが不足
解決: 各ブロックに一意の_keyを追加
```

#### 2. "Unauthorized" エラー
```
原因: APIトークンが無効または未設定
解決: .env.localのトークンを確認
```

#### 3. "Validation Error" エラー
```
原因: 必須フィールドの不足
解決: title, slug, summaryが設定されているか確認
```

#### 4. 画像が表示されない
```
原因: 画像アセットの参照エラー
解決: 正しい_refとasset構造を確認
```

### デバッグ方法
```javascript
// Sanity Studioでクエリテスト
// Vision Tool (http://localhost:3333/vision)

// 投稿された記事を確認
*[_type == "blogPost"] | order(_createdAt desc)[0..5] {
  _id,
  title,
  slug,
  isPublished,
  _createdAt
}
```

## 📊 投稿後の確認

### 1. Sanity Studioで確認
```bash
# Studio URL
http://localhost:3333

# 確認項目
- 記事がBlog Post一覧に表示される
- 公開状態が「Published」
- 全フィールドが正しく入力されている
```

### 2. フロントエンドで確認
```bash
# 開発サーバー
npm run dev

# 確認URL
http://localhost:3000

# 確認項目
- トップページの新着記事に表示される
- ブログ一覧ページに表示される
- 記事詳細ページが正常に表示される
```

### 3. API確認
```javascript
// 記事取得テスト
const query = `*[_type == "blogPost" && slug.current == $slug][0]`;
const params = { slug: 'your-article-slug' };
const result = await client.fetch(query, params);
console.log(result);
```

## 🚀 高速投稿テンプレート

### 一括作成スクリプト
```javascript
// scripts/sanity/bulk-create-posts.js
const posts = [
  {
    title: '記事タイトル1',
    slug: 'article-slug-1',
    summary: '記事概要1',
    content: [/* Portable Text配列 */]
  },
  {
    title: '記事タイトル2',
    slug: 'article-slug-2',
    summary: '記事概要2',
    content: [/* Portable Text配列 */]
  }
];

async function bulkCreatePosts() {
  for (const post of posts) {
    await createBlogPost(post);
    console.log(`投稿完了: ${post.title}`);
  }
}
```

## 📝 チェックリスト

### 投稿前チェック
- [ ] タイトルが魅力的で検索キーワードを含む
- [ ] スラッグが適切（英数字とハイフン）
- [ ] 概要が120文字以内で魅力的
- [ ] 本文がAIギャルアシスタント式ルールに準拠
- [ ] アイキャッチ画像が設定済み
- [ ] 適切なカテゴリとタグが設定済み
- [ ] SEOメタ情報が設定済み

### 投稿後チェック
- [ ] Sanity Studioで正常表示
- [ ] フロントエンドで正常表示
- [ ] 画像が適切に表示
- [ ] リンクが正常に動作
- [ ] モバイル表示も問題なし

---

**このガイドに従って、効率的にブログ記事を投稿しましょう！**