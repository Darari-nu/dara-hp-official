# 📰 だらリーヌブログ管理センター

## 🎯 このフォルダについて

だらリーヌ公式サイトのブログ運用に関するすべてのファイルを一箇所に集約した管理センターです。
記事の作成から公開まで、ブログ運用のすべてをここで管理できます。

## 📁 フォルダ構成

```
blog-management/
├── 📖 README.md                    # このファイル
├── 📋 rules/                       # ブログルール・ガイド
│   ├── writing-guide.md           # 記事の書き方ガイド
│   ├── seo-guide.md              # SEO最適化ガイド
│   ├── sanity-upload-guide.md    # Sanityアップロード手順
│   └── search-guide.md           # 検索機能ガイド
├── 📝 articles/                    # 記事管理
│   ├── published/                 # 公開済み記事
│   ├── drafts/                    # 下書き記事
│   └── archive/                   # アーカイブ記事
├── 🔧 scripts/                     # 自動化スクリプト
│   ├── create-post.js             # 記事作成スクリプト
│   ├── upload-images.js           # 画像アップロード
│   └── seo-check.js               # SEOチェック
├── 📋 templates/                   # 記事テンプレート
│   ├── blog-template.md           # 基本ブログテンプレート
│   ├── news-template.md           # ニューステンプレート
│   └── research-template.md       # リサーチテンプレート
└── 💾 assets/                      # ブログアセット
    ├── images/                    # ブログ用画像
    ├── sample-data/               # サンプルデータ
    └── backups/                   # バックアップ
```

## 🚀 クイックスタート

### 1. 新しい記事を書きたい場合
```bash
# Step 1: テンプレートをコピー
cp blog-management/templates/blog-template.md blog-management/articles/drafts/new-article.md

# Step 2: ルールを確認
cat blog-management/rules/writing-guide.md

# Step 3: 記事を執筆
# エディタで blog-management/articles/drafts/new-article.md を編集

# Step 4: Sanityにアップロード
node blog-management/scripts/create-post.js
```

### 2. 既存記事を管理したい場合
```bash
# 公開済み記事を確認
ls blog-management/articles/published/

# 下書き記事を確認
ls blog-management/articles/drafts/

# アーカイブ記事を確認
ls blog-management/articles/archive/
```

### 3. SEOをチェックしたい場合
```bash
# SEOチェック実行
node blog-management/scripts/seo-check.js

# SEOガイドを確認
cat blog-management/rules/seo-guide.md
```

## 📋 ワークフロー

### 記事作成から公開まで
```
1. テンプレート選択
   ↓
2. drafts/で記事執筆
   ↓
3. ルールに従って内容チェック
   ↓
4. スクリプトでSanityアップロード
   ↓
5. published/に移動
   ↓
6. サイトで公開確認
```

### 記事管理ルール
- **drafts/**: 執筆中・レビュー中の記事
- **published/**: 公開済みの記事（バックアップ用）
- **archive/**: 古い記事・削除予定記事

## 🎯 主な機能

### ✍️ 記事作成支援
- AIギャルアシスタント式ライティングガイド
- SEO最適化チェックリスト
- テンプレート活用で効率化

### 🚀 自動化ツール
- Sanity CMS自動投稿
- 画像一括アップロード
- SEO自動チェック

### 📊 管理機能
- 記事ステータス管理
- バックアップ・アーカイブ
- テンプレート管理

## 🔗 関連リンク

- **Sanity Studio**: http://localhost:3333 （記事管理）
- **開発サイト**: http://localhost:3000 （プレビュー）
- **メインサイト**: https://darahp.vercel.app （本番）

## 📝 使用上の注意

### ⚠️ 重要なポイント
1. **記事は必ずdrafts/で作成**してからpublished/に移動
2. **ルールガイドを必ず確認**してから執筆開始
3. **画像は適切なサイズ**でassets/images/に保存
4. **公開前にSEOチェック**を必ず実行

### 🚫 やってはいけないこと
- drafts/を飛ばしていきなりpublished/に記事作成
- ルールを無視した記事執筆
- 大きすぎる画像ファイルの使用
- SEOチェックなしでの公開

---

**このブログ管理センターで、効率的で質の高いブログ運用を実現しましょう！**