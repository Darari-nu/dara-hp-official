# Sanity CMS自動投稿システム

## 概要
WordPress自動投稿システムをSanity CMS対応に書き換えたPythonスクリプトです。
MarkdownファイルをSanity CMSに自動アップロードします。

## 特徴
- ✅ Markdown → Sanity CMS自動投稿
- ✅ 著者・カテゴリ自動作成
- ✅ Portable Text変換
- ✅ バックアップ機能
- ✅ 一括アップロード対応

## セットアップ

### 1. 依存関係のインストール
```bash
cd 01.system/01.sanity_uploader
./setup.sh
```

### 2. 環境変数の設定
`.env`ファイルを作成し、以下を設定：
```bash
SANITY_TOKEN=your_sanity_token_here
```

### 3. 設定ファイルの確認
`../../.windsurf/config/sanity-config.yaml`を確認し、必要に応じて編集

## 使用方法

### 単一ファイルのアップロード
```bash
python sanity_uploader.py --file "path/to/article.md"
```

### ディレクトリ内の全ファイルをアップロード
```bash
python sanity_uploader.py --directory "path/to/articles/"
```

### カテゴリを指定してアップロード
```bash
python sanity_uploader.py --file "article.md" --category "AI規制"
```

## Markdownファイルの形式

### YAMLフロントマター対応
```markdown
---
title: "記事タイトル"
author: "だらリーヌ"
category: "AI規制"
summary: "記事の概要"
slug: "article-slug"
---

# 記事タイトル

記事の内容をここに書きます。
```

### 簡単な形式
```markdown
# 記事タイトル

記事の内容をここに書きます。
```

## ディレクトリ構造
```
01.system/01.sanity_uploader/
├── sanity_uploader.py     # メインスクリプト
├── requirements.txt       # 依存関係
├── setup.sh              # セットアップスクリプト
├── README.md             # このファイル
└── logs/                 # ログファイル
```

## 設定ファイル
```yaml
sanity:
  project_id: "9kqjddwl"
  dataset: "production"

upload:
  source_dir: "03.data/04.Wordpress"
  backup_dir: "03.data/04.Wordpress/uploaded"
  image_dir: "03.data/XX.image"

logging:
  level: "INFO"
  file: "01.system/01.sanity_uploader/logs/sanity_upload.log"
```

## 機能詳細

### 1. 著者管理
- 記事の著者を自動的に取得または作成
- デフォルト著者: "だらリーヌ"

### 2. カテゴリ管理
- カテゴリを自動的に取得または作成
- デフォルトカテゴリ: "AI規制"

### 3. Portable Text変換
- MarkdownをSanity CMS対応のPortable Textに変換
- 基本的な変換機能（今後拡張予定）

### 4. バックアップ機能
- アップロード完了後、ファイルをバックアップディレクトリに移動
- 重複アップロードを防止

## トラブルシューティング

### 認証エラー
- `SANITY_TOKEN`環境変数が正しく設定されているか確認
- Sanityプロジェクトの設定を確認

### アップロードエラー
- ログファイルを確認: `logs/sanity_upload.log`
- Sanity APIのレスポンスを確認

## 今後の拡張予定
- [ ] 画像アップロード機能
- [ ] より高度なMarkdown→Portable Text変換
- [ ] アップロード済み記事の更新機能
- [ ] タグ機能の追加