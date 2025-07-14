# Vibe Blog by Sanity

Next.js 14とSanity CMSを活用したモダンなヘッドレスブログシステムです。

## 🚀 特徴

- **Next.js 14** - 最新のReactフレームワーク
- **Sanity CMS** - 強力なヘッドレスCMS
- **TypeScript** - 型安全な開発
- **レスポンシブデザイン** - モバイルファーストアプローチ
- **SEO最適化** - 検索エンジン最適化済み
- **リアルタイム編集** - Sanity Studioでの直感的な編集

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example`を参考に`.env.local`ファイルを作成し、Sanityプロジェクトの設定を行ってください。

```bash
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
```

### 3. 開発サーバーの起動

#### Next.jsブログサイト
```bash
npm run dev
```
http://localhost:4005 でアクセス可能

#### Sanity Studio
```bash
npm run studio
```
http://localhost:3333 でアクセス可能

## 📝 コンテンツ管理

1. Sanity Studio (http://localhost:3333) にアクセス
2. 新しい記事を作成
3. カテゴリーや著者情報を設定
4. 記事を公開

## 🚢 デプロイメント

### Vercelへのデプロイ

```bash
npm run build
vercel --prod
```

### Sanity Studioのデプロイ

```bash
npm run studio:deploy
```

## 📁 プロジェクト構造

```
app/
├── app/                    # Next.js App Router
│   ├── (pages)/           # ページルート
│   ├── components/        # Reactコンポーネント
│   └── lib/              # ユーティリティ
├── schemaTypes/          # Sanityスキーマ定義
├── lib/                  # ライブラリとAPI設定
└── types/               # TypeScript型定義
```

## 🔗 参考リンク

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
