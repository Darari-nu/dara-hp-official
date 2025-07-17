# 検索ツール仕様

## 目的
"AI業界の最新ニュース" を 1 日 1 回収集し、リンク有効性を自動検証した Markdown レポートを ./02.prep/ に出力する。

## API仕様
- **Google Custom Search JSON API** (`key`,`cx`) 使用
- 無料枠対策: 1 日 90 クエリ上限、429 を検知したらバックオフ
- レートリミット: 100 requests/100 seconds per user

## 必須テスト
1. 取得リンクが HTTP 200
2. title にキーワード一致
3. ドメイン重複 2 件以下

## 出力仕様
- 保存名: `./02.prep/YYYYMMDD_AI_research.md`
- フォーマット: Markdown
- 構造:
  ```markdown
  # AI業界最新ニュース - YYYY/MM/DD
  
  ## 検証済みリンク
  - [記事タイトル](URL) - ドメイン名
  
  ## 統計情報
  - 検索クエリ数: N回
  - 有効リンク: N件
  - 無効リンク: N件
  ```

## エラーハンドリング
- 404/403/500: リンクをスキップ
- 429 Rate Limit: 指数バックオフ (1s, 2s, 4s, 8s)
- 3xx Redirect: 最終URLを追跡 (最大5回)
- タイムアウト: 30秒でリクエスト中断

## 技術制約
- Node.js/TypeScript
- 外部依存: minimal (axios, cheerio程度)
- 設定ファイル: .env