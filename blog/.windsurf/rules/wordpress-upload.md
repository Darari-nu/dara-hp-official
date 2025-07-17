---
trigger: phrase
phrases: 
  - "をWordPressに投稿して"
  - "をWordpressに投稿して"
  - "をwordpressに投稿して"
  - "をWordPressにアップして"
  - "をWordpressにアップして"
  - "をwordpressにアップして"
  - "WordPressに投稿して"
  - "Wordpressに投稿して"
  - "wordpressに投稿して"
  - "WordPressにアップして"
  - "Wordpressにアップして"
  - "wordpressにアップして"
---

# 🚀 WordPress自動投稿ルール

## あなたの役割
ユーザーが「○○のファイルをWordPressに投稿して」「○○をWordPressにアップして」などと指示した場合、以下の手順で自動的にWordPress投稿を実行してください。

## 実行手順

### 1. ファイル名の特定
ユーザーが指定したファイル名を正確に把握し、以下の場所を確認：
- `/Users/watanabehidetaka/Claudecode/250629_Auto_blog_Writing/Wordpress/` ディレクトリ内
- `.md`拡張子があることを確認

### 2. 投稿ステータスの判断
ユーザーの指示に応じて投稿ステータスを決定：
- **明示的に指定がない場合**: `--status draft` （下書き）
- **「公開して」「publishして」と言われた場合**: `--status publish`
- **「下書きで」「draftで」と言われた場合**: `--status draft`

### 3. コマンド実行
以下のBashコマンドを実行：

```bash
cd "/Users/watanabehidetaka/Claudecode/250629_Auto_blog_Writing"
python 01.system/01.wordpress_uploader/wordpress_uploader.py --file "ファイル名.md" --status draft
```

### 4. 結果報告
実行結果に応じて以下を報告：

**成功時:**
- ✅ 投稿完了メッセージ
- 📝 投稿されたWordPressの記事URL
- 📁 ファイルが`uploaded/`フォルダに移動されたことを確認

**失敗時:**
- ❌ エラー内容の説明
- 🔧 可能な解決策の提示
- 📋 ログファイルの確認を促す

## 例外処理

### ファイルが見つからない場合
1. `Wordpress/`フォルダ内のファイル一覧を表示
2. 似た名前のファイルがあれば候補として提示
3. 正確なファイル名の再確認を求める

### 複数のファイルが指定された場合
1. `--all`オプションを使用して一括アップロード
2. 各ファイルの処理結果を個別に報告

### エラーが発生した場合
1. ログファイル（`01.system/01.wordpress_uploader/logs/wordpress_upload.log`）の内容を確認
2. 一般的なトラブルシューティングを提示：
   - WordPressの接続確認
   - Application Passwordの確認
   - ファイル形式の確認

## 使用例

**ユーザー:** 「20250630_ai_dounyuu_joukyou.mdをWordPressに投稿して」

**あなたの応答:**
```
WordPress自動投稿を実行します！

[Bashコマンド実行]
cd "/Users/watanabehidetaka/Claudecode/250629_Auto_blog_Writing"
python 01.system/01.wordpress_uploader/wordpress_uploader.py --file "20250630_ai_dounyuu_joukyou.md" --status draft

✅ 投稿完了しました！
📝 記事URL: https://madaladalarin.com/?p=123
📁 ファイルを uploaded/ フォルダに移動しました
```

## 重要な注意事項

1. **セキュリティ**: Application Passwordやサイトの認証情報は絶対に表示しない
2. **ファイル管理**: 成功したファイルは自動的に`uploaded/`フォルダに移動される
3. **ログ記録**: すべての処理はログファイルに記録される
4. **エラーハンドリング**: 失敗した場合は元のファイルは移動されない

## 対応するファイル形式

システムが正しく処理できるMarkdownファイルの形式：

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

この形式に従っていないファイルの場合は、エラーメッセージと共に正しい形式を案内してください。