# WordPress自動投稿システム

このシステムを使用すると、Markdownファイルを自動でWordPressに投稿できます。

## 🚀 セットアップ

### 1. 依存関係をインストール
```bash
pip install -r 01.system/01.wordpress_uploader/requirements.txt
```

### 2. 設定確認
- `.env`ファイルにWordPressアプリケーションパスワードが設定済み ✅
- `.windsurf/config/wordpress-config.yaml`にサイト設定が設定済み ✅

## 📝 使用方法

### 基本的な使い方

**特定のファイルをアップロード:**
```bash
python 01.system/01.wordpress_uploader/wordpress_uploader.py --file "20250630_ai_dounyuu_joukyou.md"
```

**すべてのファイルをアップロード:**
```bash
python 01.system/01.wordpress_uploader/wordpress_uploader.py --all
```

**ドラフトとして投稿:**
```bash
python 01.system/01.wordpress_uploader/wordpress_uploader.py --file "filename.md" --status draft
```

**公開済みとして投稿:**
```bash
python 01.system/01.wordpress_uploader/wordpress_uploader.py --file "filename.md" --status publish
```

### あなたの理想的な使い方 🎯

Claude Codeで以下のように指示するだけ：

> 「20250630_ai_dounyuu_joukyou.mdをWordPressにアップして」

→ 以下のコマンドを実行：
```bash
python 01.system/01.wordpress_uploader/wordpress_uploader.py --file "20250630_ai_dounyuu_joukyou.md"
```

## 📁 ディレクトリ構造

```
/Users/watanabehidetaka/Claudecode/250629_Auto_blog_Writing/
├── Wordpress/              # アップロード待ちのMarkdownファイル
├── uploaded/               # アップロード済みファイル（自動作成）
├── 01.system/
│   └── 01.wordpress_uploader/
│       ├── wordpress_uploader.py  # メインプログラム
│       ├── requirements.txt       # 依存関係
│       ├── README.md             # このファイル
│       └── logs/                 # ログファイル（自動作成）
├── .windsurf/config/
│   └── wordpress-config.yaml # 設定ファイル
└── .env                     # 環境変数（Application Password）
```

## ⚙️ 設定項目

### wordpress-config.yaml
- **site_url**: あなたのWordPressサイトURL
- **username**: WordPressユーザー名  
- **default_status**: デフォルトの投稿ステータス (draft/publish/private)
- **category_mapping**: 記事のcategory_idとWordPressカテゴリーIDの対応

### .env
- **WP_APP_PASS**: WordPressアプリケーションパスワード

## 📋 対応するMarkdownフォーマット

システムは以下の形式のMarkdownファイルを処理します：

```markdown
---
title: "記事タイトル"
category_id: 44
tags: 
  - "タグ1"
  - "タグ2"
excerpt: "記事の要約"
meta_description: "SEO用メタディスクリプション"
---

# =================================================
#  記事本文 (ここから)
# =================================================

記事の内容...

# =================================================
#  記事本文 (ここまで)
# =================================================
```

## 🔄 処理フロー

1. **ファイル解析**: YAMLメタデータと記事本文を抽出
2. **HTML変換**: MarkdownをWordPress用HTMLに変換
3. **API投稿**: WordPress REST APIで記事を作成
4. **ファイル移動**: 成功したファイルを`uploaded/`フォルダに移動
5. **ログ記録**: 処理結果をログファイルに記録

## 🚨 トラブルシューティング

### よくあるエラー

**1. 認証エラー**
```
❌ 投稿失敗: 401 - {"code":"rest_cannot_create","message":"Sorry, you are not allowed to create posts as this user."}
```
→ WordPressのApplication Passwordが正しいか確認

**2. ファイルが見つからない**
```
❌ ファイルが見つかりません: /path/to/file.md
```
→ ファイル名とパスを確認

**3. YAMLエラー**
```
❌ YAMLフロントマターが見つかりません
```
→ Markdownファイルの先頭に正しいYAML形式のメタデータがあるか確認

### ログ確認
```bash
tail -f 01.system/logs/wordpress_upload.log
```

## 🔐 セキュリティ

- Application Passwordを使用（通常パスワードより安全）
- `.env`ファイルは`.gitignore`に追加推奨
- ログファイルには機密情報は記録されません

## 📞 サポート

問題が発生した場合は、ログファイル（`01.system/logs/wordpress_upload.log`）を確認してください。