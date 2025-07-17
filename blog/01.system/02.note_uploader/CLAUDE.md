# ブログ自動投稿システム

## プロジェクト概要
指定されたMarkdownファイルをnote.comの下書きとして自動保存するブラウザ自動化システム

## 要件定義
- mdファイルの読み込み（1行目がタイトル、残りが本文）
- note.comへの自動ログイン
- 下書きとして保存
- 処理結果の表示

## 技術仕様
- Node.js + Playwright
- 認証情報は環境変数で管理
- macOS対応

## 使用方法

### noteへの投稿
```bash
# 環境変数設定
export NOTE_EMAIL="your_email@example.com"
export NOTE_PASSWORD="your_password"

# 実行
node note-uploader.js /path/to/article.md
```


## セキュリティ考慮事項
- 認証情報は環境変数で管理
- ブラウザセッションは実行後に完全終了
- パスワードをコードに直接記述しない

## 開発・テスト用コマンド
```bash
# 依存関係インストール
npm install

# テスト実行（実装後）
npm test

# リント（実装後）
npm run lint
```