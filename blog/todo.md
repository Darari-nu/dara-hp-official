# 実装タスク

## 必須実装
- [ ] search.ts で Google API 呼び出し (retry / backoff 付き)
- [ ] resolve.ts で 3xx 追跡 & HTTP 200 チェック
- [ ] scrape.ts で title キーワード検証
- [ ] report.ts で Markdown 生成
- [ ] tests/link.test.ts で 200 判定
- [ ] GitHub Actions で日次 00:30 実行

## Phase 0: 型定義
- [ ] SearchResult interface
- [ ] ValidLink interface  
- [ ] Report interface
- [ ] APIResponse interface

## Phase 1: CLI基盤
- [ ] main.ts - エントリーポイント
- [ ] config.ts - 環境変数読み込み
- [ ] logger.ts - ログ出力

## Phase 2: 検索パイプライン
- [ ] search.ts - Google Custom Search API
- [ ] resolve.ts - リンク解決 & 検証
- [ ] scrape.ts - コンテンツ取得 & タイトル検証
- [ ] report.ts - Markdown レポート生成

## Phase 3: テスト & CI
- [ ] unit tests - 各モジュール
- [ ] integration tests - API連携
- [ ] e2e tests - 全体フロー
- [ ] .github/workflows/daily.yml - 日次実行