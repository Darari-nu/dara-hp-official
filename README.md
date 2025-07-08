# だらリーヌ公式サイト

AI規制・ガイドライン専門コンサルタント「だらリーヌ」の公式サイト

## 🚀 技術スタック

- **フロントエンド**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + shadcn/ui
- **フォント**: Noto Sans JP + Poppins
- **デプロイ**: Vercel対応

## 📂 プロジェクト構成

```
src/
├── app/
│   ├── blog/           # ブログページ
│   ├── globals.css     # グローバルスタイル
│   ├── layout.tsx      # ルートレイアウト
│   └── page.tsx        # トップページ
├── components/
│   ├── layout/         # ヘッダー・フッター
│   ├── sections/       # セクションコンポーネント
│   └── ui/            # shadcn/ui コンポーネント
└── lib/
    └── utils.ts       # ユーティリティ関数
```

## 🎨 実装済み機能

### ✅ 完了項目

- **基本セットアップ**: Next.js + TypeScript + Tailwind CSS
- **レイアウト**: ヘッダー・フッター・ナビゲーション
- **トップページ全セクション**:
  - ヒーローセクション（Google風グラデーション）
  - 共感カルーセル（3つのペルソナ対応タブ）
  - サービス概要
  - Trust Badges
  - 5ステップ導入フロー
  - 最新ブログ記事表示
  - アニメーション付き著者紹介
  - FAQ（アコーディオン）
  - 最終CTA
- **ブログページ**: 記事一覧・検索機能・カテゴリ表示

### 🔄 実装予定項目

- Sanity CMS統合
- Algolia検索機能
- SEO最適化
- Vercelデプロイ設定

## 🎯 デザイン仕様

### カラーパレット
- **背景**: `bg-gray-50` (#F9FAFB)
- **本文**: `text-neutral-800` (#1F2937)
- **アクセント**: Googleカラー（Blue, Red, Yellow, Green）

### フォント
- **本文**: Noto Sans JP
- **見出し**: Poppins（`font-display`クラス）

### 特徴的な要素
- **Google風グラデーション**: `.google-gradient`クラス
- **レスポンシブデザイン**: モバイルファースト
- **アニメーション**: Framer Motion使用予定

## 🚀 開発・デプロイ

### 開発サーバー起動
```bash
npm run dev
```

### ビルド
```bash
npm run build
```

### 本番サーバー起動
```bash
npm run start
```

## 📝 更新履歴

- **2025-07-06**: プロジェクト初期セットアップ完了
- **2025-07-06**: 全メインセクション実装完了
- **2025-07-06**: ブログページ基本機能実装

## 🎯 次のステップ

1. Sanity CMS設定とスキーマ作成
2. Algolia検索機能実装
3. 動的コンテンツ管理機能
4. SEO最適化
5. Vercel本番デプロイ

---

**開発者**: Claude Code  
**最終更新**: 2025年7月6日