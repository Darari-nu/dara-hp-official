# Sanityインポートツール

## import-contents-to-sanity.js

このツールは、`vibe-blog`の`contents`ディレクトリにあるMarkdownファイルを、Sanityにインポートするためのスクリプトです。

### 前提条件

1. Sanity APIトークンの作成
   - [Sanity管理画面](https://www.sanity.io/manage)にアクセス
   - プロジェクトを選択
   - API → Tokensから新しいトークンを作成
   - 権限: Editor以上（書き込み権限が必要）

2. 環境変数の設定
   ```bash
   # app/.env.localファイルに追加
   SANITY_API_TOKEN=your-token-here
   ```

### 使い方

```bash
# 依存関係のインストール
cd app
npm install

# インポートの実行
node ../tools/import-contents-to-sanity.js
```

### 機能

- 著者情報の自動作成
- カテゴリの自動作成
- Markdownから Portable Textへの変換
- 画像参照の処理（実際の画像アップロードは別途必要）
- 日本語日付形式（2025年7月14日）からISO形式への変換
- 非公開記事（publish: false）のスキップ

### 注意事項

1. **画像のアップロード**
   - このツールは画像URLの参照を作成しますが、実際の画像アップロードは行いません
   - Sanity Studioから手動で画像をアップロードするか、別途画像アップロードスクリプトが必要です

2. **Portable Text変換**
   - 基本的なMarkdown要素（見出し、段落、リスト、コードブロック等）に対応
   - より複雑な要素（テーブル、脚注等）は追加実装が必要

3. **重複実行**
   - 同じIDで`createOrReplace`を使用するため、重複実行しても安全です
   - 既存のデータは上書きされます

### トラブルシューティング

**エラー: SANITY_API_TOKENが設定されていません**
→ `.env.local`ファイルにトークンを設定してください

**エラー: Permission denied**
→ APIトークンの権限を確認してください（Editor以上が必要）

**エラー: Project not found**
→ `SANITY_PROJECT_ID`と`SANITY_DATASET`が正しいか確認してください