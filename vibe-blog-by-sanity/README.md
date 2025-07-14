# vibe blog by sanity

Sanityを活用したヘッドレスCMSブログシステム

## 概要

vibe blog by sanityは、Sanity CMSをバックエンドに使用したモダンなブログシステムです。ヘッドレスCMSの柔軟性と、静的サイトのパフォーマンスを両立しています。

## 特徴

- **Sanity CMS統合**: ヘッドレスCMSでコンテンツを柔軟に管理
- **リアルタイムプレビュー**: Sanity Studioで即座に変更を確認
- **画像最適化**: Sanityの画像パイプラインで自動最適化
- **構造化コンテンツ**: ブロックエディタでリッチなコンテンツ作成
- **APIファースト**: GROQクエリで必要なデータのみ取得
- **マルチユーザー対応**: 複数の編集者で同時作業可能

## ディレクトリ構造

```
vibe-blog-by-sanity/
├── app/                      # アプリケーションコード
│   ├── public/              # 公開ディレクトリ
│   │   ├── index.html      # トップページ
│   │   ├── p/              # 記事ページ（短縮URL）
│   │   ├── css/            # スタイルシート
│   │   ├── js/             # JavaScript
│   │   └── images/         # 画像ファイル
│   │       └── posts/      # 記事別画像
│   └── package.json        # プロジェクト設定
├── contents/                # ブログコンテンツ
│   ├── common/             # 共通設定
│   │   ├── author.md       # 著者情報
│   │   └── setting.md      # サイト設定
│   ├── posts/              # 記事ソース
│   │   └── 0001/           # 記事ID
│   │       ├── text.md     # 記事本文
│   │       └── og-image.png # OGP画像
│   └── tools/              # 生成スクリプト
├── Makefile                 # Makeコマンド
└── README.md                # このファイル
```

## 使い方

### クイックスタート

```bash
# コマンド一覧を表示
make

# 開発サーバーを起動（記事生成も自動実行）
make dev

# デプロイ（記事生成も自動実行）
make deploy
```

### Makeコマンド一覧

#### 基本コマンド
- `make` または `make help` - コマンド一覧を表示
- `make setup` - 初期セットアップ
- `make preview` - ローカルでプレビュー
- `make dev` - 開発サーバーを起動
- `make deploy` - プロジェクトをデプロイ
- `make clean` - ビルドファイルを削除

#### ローカルコマンド
- `make build` - プロジェクトをビルド
- `make studio` - Sanity Studioを起動
- `make import-contents` - vibe-blogのcontentsをSanityにインポート
- `make deploy-studio` - Sanity Studioをデプロイ
- `make deploy-app` - Next.jsアプリケーションのみデプロイ

### 1. 記事の作成

`contents/posts/`に記事IDのディレクトリを作成し、`text.md`を配置：

```markdown
---
title: 記事タイトル
date: 2025年7月5日
author: Hiroki Takaba
category: AI活用
thumbnail: https://example.com/image.jpg
excerpt: 記事の概要をここに書きます
publish: true
---

# 見出し

記事の本文をMarkdown形式で書きます。
```

### 2. OGP画像の設定（オプション）

記事ディレクトリに`og-image.png`を配置すると、その記事専用のOGP画像として使用されます。

### 3. サイトの生成と確認

```bash
# 開発サーバーを起動
make dev

# Sanity Studioを起動（別のターミナルで実行）
make studio

# ビルドのみ実行したい場合
make build

# プレビューを開く
make preview
```

### 4. コンテンツのインポート

vibe-blogのcontentsディレクトリからSanity CMSに記事をインポート：

```bash
# vibe-blogのcontentsをSanityにインポート
make import-contents
```

このコマンドは、`contents/posts/`ディレクトリの記事をSanity CMSにインポートします。

### 5. デプロイ

```bash
# 全体のデプロイ（Sanity StudioとNext.jsアプリ）
make deploy

# Sanity Studioのみデプロイ
make deploy-studio

# Next.jsアプリケーションのみデプロイ
make deploy-app
```

## 設定

### サイト設定

`contents/common/setting.md`でサイト全体の設定を管理：

```yaml
---
site_name: vibe blog
site_url: https://vibe-products-blog.web.app
google_analytics_id: G-XXXXXXXXXX
default_category: 未分類
---
```

### 著者情報

`contents/common/author.md`で著者プロフィールを設定：

```yaml
---
name: Hiroki Takaba
role: エンジニア
avatar: /images/takaba.png
social:
  twitter: https://x.com/username
  github: https://github.com/username
---

自己紹介文をここに書きます。
```

### デプロイ設定

デプロイはMakefileコマンドで簡単に実行できます。Firebase、Vercel、Netlifyなどの主要なホスティングサービスに対応しています。

## 機能

### SEO対策
- Open Graphタグの自動生成
- Twitter Cardの設定
- 構造化データ（Schema.org）の埋め込み
- サイトマップの生成（予定）

### パフォーマンス
- 画像の遅延読み込み
- 静的ファイルの最適化
- レスポンシブ画像の自動生成（予定）

### カスタマイズ
- CSS変数によるテーマカスタマイズ
- レイアウトの柔軟な変更
- プラグインシステム（予定）

## 必要環境

- Node.js 16以上
- npm または yarn

## ライセンス

このプロジェクトはvibe-codingテンプレートの一部として提供されています。