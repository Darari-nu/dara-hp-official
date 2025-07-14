# だらリーヌ公式サイト - プロジェクト構造

## 📁 整理後のディレクトリ構成

```
/Users/watanabehidetaka/Claudecode/Dara_HP/
├── 📋 CLAUDE.md                    # プロジェクト要件定義書
├── 📖 README.md                    # プロジェクト概要
├── ⚙️ package.json                 # Node.js依存関係
├── 🔧 next.config.mjs              # Next.js設定
├── 🎨 tailwind.config.ts           # Tailwind CSS設定
├── 📝 tsconfig.json                # TypeScript設定
├── 🚀 vercel.json                  # Vercel デプロイ設定
├── 🔑 .env.local                   # 環境変数（Sanity API等）
│
├── 📂 src/                         # メインソースコード
│   ├── 📂 app/                     # Next.js App Router
│   │   ├── 🏠 page.tsx             # ホームページ
│   │   ├── 🎨 layout.tsx           # ルートレイアウト
│   │   ├── 🌐 globals.css          # グローバルスタイル
│   │   ├── 📂 blog/                # ブログページ
│   │   │   ├── 📄 page.tsx         # ブログ一覧
│   │   │   └── 📂 [slug]/          # 動的ルート
│   │   │       └── 📄 page.tsx     # 記事詳細
│   │   └── 📂 studio/              # Sanity Studio統合
│   │       ├── 🎨 layout.tsx       # Studio レイアウト
│   │       └── 📄 page.tsx         # Studio ページ
│   │
│   ├── 📂 components/              # Reactコンポーネント
│   │   ├── 📂 layout/              # レイアウトコンポーネント
│   │   │   ├── 🧭 Header.tsx       # ヘッダー（ガラスモルフィズム）
│   │   │   └── 🦶 Footer.tsx       # フッター
│   │   │
│   │   ├── 📂 sections/            # ページセクション
│   │   │   ├── 🎯 MinimalHero.tsx  # ヒーローセクション
│   │   │   ├── ❓ ProblemsSection.tsx # お悩みセクション
│   │   │   ├── 📰 Blog8.tsx        # ブログカード表示
│   │   │   ├── 👥 EditorialTeam.tsx # 編集局メンバー
│   │   │   └── 🎨 SimpleWorkShowcase.tsx # 作例紹介
│   │   │
│   │   └── 📂 ui/                  # 共通UIコンポーネント
│   │       ├── ✨ sparkles-text.tsx # Google風グラデーション
│   │       ├── 🎞️ scroll-animations.tsx # スクロールアニメーション
│   │       ├── 📑 section-header.tsx # セクションヘッダー
│   │       └── 🔄 section-divider.tsx # セクション区切り
│   │
│   ├── 📂 lib/                     # ライブラリ・ユーティリティ
│   │   ├── 🗃️ sanity.ts            # Sanity CMS クライアント
│   │   ├── 🔄 data-transform.ts    # データ変換関数
│   │   └── 🛠️ utils.ts             # 共通ユーティリティ
│   │
│   └── 📂 types/                   # TypeScript型定義
│       ├── 📝 index.ts             # ローカル型定義
│       └── 🗃️ sanity.ts            # Sanity CMS型定義
│
├── 📂 sanity/                      # Sanity CMS設定
│   ├── ⚙️ sanity.config.ts         # Sanity設定ファイル
│   ├── 🖥️ sanity.cli.ts           # Sanity CLI設定
│   └── 📂 schemas/                 # Sanityスキーマ定義
│       ├── 📝 index.ts             # スキーマエクスポート
│       ├── 👤 author.ts            # 著者スキーマ
│       ├── 📰 blogPost.ts          # ブログ記事スキーマ
│       ├── 🏷️ category.ts          # カテゴリスキーマ
│       ├── ❓ faq.ts               # FAQ スキーマ
│       └── ⚙️ siteSettings.ts      # サイト設定スキーマ
│
├── 📂 public/                      # 静的アセット
│   └── 📂 images/                  # 画像ファイル
│       ├── 🖼️ 20250705_AI.png      # メイン画像
│       ├── 📂 blog/                # ブログ用画像
│       ├── 📂 team/                # チーム画像
│       │   ├── 👩‍💼 darane.jpg        # だらリーヌ
│       │   ├── 📚 reading-girl.jpg  # 読書ギャル
│       │   ├── 🐱 intern-cat.jpg    # インターンAI猫
│       │   └── 🤖 ai-robot.jpg      # AIろぼ
│       ├── 📂 hero/                # ヒーロー画像
│       ├── 📂 ui/                  # UI用画像
│       └── 📂 works/               # 作品画像
│
├── 📚 docs/                        # ドキュメント
│   ├── 📖 PROJECT_STRUCTURE.md     # このファイル
│   ├── 🚨 TROUBLESHOOTING.md       # トラブルシューティング
│   └── 📂 blog-operations/         # ブログ運用ガイド
│       ├── 📋 README.md            # 運用ガイド総合
│       ├── 📂 search/              # 検索機能関連
│       │   ├── 🔍 search-guide.md  # 検索使い方ガイド
│       │   └── 📈 search-optimization.md # 検索最適化
│       ├── 📂 writing-guide/       # 記事作成ガイド
│       │   ├── ✍️ writing-rules.md  # ライティングルール
│       │   ├── 🎯 seo-guide.md     # SEO最適化ガイド
│       │   └── 📊 content-strategy.md # コンテンツ戦略
│       ├── 📂 sanity-upload/       # Sanity操作ガイド
│       │   ├── 📤 upload-guide.md  # アップロード手順
│       │   ├── 🖼️ image-management.md # 画像管理ガイド
│       │   └── 🔌 api-reference.md # API操作リファレンス
│       └── 📂 templates/           # テンプレート集
│           ├── 📝 blog-template.md # ブログ記事テンプレート
│           ├── 📰 news-template.md # ニュース記事テンプレート
│           └── 🔬 research-template.md # リサーチ記事テンプレート
│
├── 🔧 scripts/                     # 自動化スクリプト
│   ├── 📂 sanity/                  # Sanity関連スクリプト
│   │   ├── 📝 create-blog-post.js  # ブログ記事作成
│   │   ├── 🖼️ upload-images.js     # 画像一括アップロード
│   │   └── 🔄 data-migration.js    # データ移行
│   ├── 📂 blog/                    # ブログ関連スクリプト
│   │   ├── 📊 seo-checker.js       # SEOチェック
│   │   └── 🔗 link-checker.js      # リンクチェック
│   └── 📂 deployment/              # デプロイメント
│       ├── 🚀 deploy-vercel.sh     # Vercel デプロイ
│       └── 🧹 cleanup.sh           # クリーンアップ
│
├── 💾 assets/                      # プロジェクトアセット
│   ├── 📂 sample-data/             # サンプルデータ
│   │   ├── 📄 sample-authors.ndjson # サンプル著者データ
│   │   ├── 📄 sample-blog-posts-fixed.ndjson # サンプル記事
│   │   ├── 📄 sample-categories.ndjson # サンプルカテゴリ
│   │   └── 🔄 update-blog-images.ndjson # 画像更新データ
│   └── 📂 backups/                 # バックアップ
│       ├── 📦 backup.bundle        # Gitバックアップ
│       ├── 📋 sanity.log           # Sanity ログ
│       └── 🖥️ server.log           # サーバーログ
│
└── 📂 vibe-blog-by-sanity/         # 参考プロジェクト
    ├── 📖 README.md                # 参考プロジェクト説明
    ├── 📂 app/                     # 参考アプリケーション
    ├── 📂 components/              # 参考コンポーネント
    ├── 📂 contents/                # 参考コンテンツ
    └── 📂 tools/                   # 参考ツール
```

## 🎯 主要ディレクトリの役割

### 📂 src/ - メインソースコード
Next.js 14 App Routerベースのモダンな構成。コンポーネントは用途別に整理され、型安全性を重視。

### 📚 docs/ - ドキュメント体系
ブログ運用に必要なすべてのガイドを体系化。検索、記事作成、Sanity操作まで網羅。

### 🔧 scripts/ - 自動化ツール
ブログ記事作成、画像アップロード、デプロイメントを自動化するスクリプト群。

### 💾 assets/ - プロジェクトアセット
サンプルデータとバックアップを適切に分離。開発とプロダクションデータの混在を防止。

### 🗃️ sanity/ - Sanity CMS設定
5つのスキーマ（Author, BlogPost, Category, FAQ, SiteSettings）で構造化されたCMS。

## 🚀 開発ワークフロー

### 1. 環境起動
```bash
npm run dev     # Next.js開発サーバー (http://localhost:3000)
npm run sanity  # Sanity Studio (http://localhost:3333)
```

### 2. 記事作成
```bash
# 手動: Sanity Studio使用
# 自動: scripts/sanity/create-blog-post.js 実行
```

### 3. デプロイ
```bash
npx vercel --prod  # 本番デプロイ
```

## 📋 現在の実装状況

### ✅ 完了済み
- **コア機能**: Next.js + Sanity CMS統合
- **UI/UX**: ミニマリストデザイン + ガラスモルフィズム
- **コンテンツ**: 4人著者システム + ブログ機能
- **インフラ**: Vercel デプロイ設定
- **ドキュメント**: 包括的な運用ガイド

### 🔄 進行中
- vibe-blog-by-sanity からの機能統合
- 検索機能の強化（GROQ → InstantSearch）
- SEO最適化（構造化データ等）

### 📅 今後の予定
- Algolia検索の代替実装
- パフォーマンス最適化
- アクセス解析統合

## 🔗 重要なファイル

### 設定ファイル
- **CLAUDE.md**: プロジェクト全体の要件定義
- **.env.local**: Sanity API認証情報
- **sanity.config.ts**: Sanity CMS設定

### コアコンポーネント
- **src/app/page.tsx**: ホームページ構成
- **src/lib/sanity.ts**: Sanity クライアント + GROQ クエリ
- **src/components/sections/Blog8.tsx**: ブログカード表示

### 運用ドキュメント
- **docs/blog-operations/README.md**: 運用ガイド総合
- **docs/blog-operations/writing-guide/writing-rules.md**: ライティングルール
- **docs/blog-operations/sanity-upload/upload-guide.md**: 投稿手順

## 📊 プロジェクト統計

- **Total Files**: ~150 ファイル
- **Components**: 20+ React コンポーネント
- **Documentation**: 10+ ガイドドキュメント
- **Scripts**: 5+ 自動化スクリプト
- **Schemas**: 5 Sanity スキーマ

---

**このプロジェクト構造により、効率的なブログ運用と継続的な機能拡張が可能になります。**