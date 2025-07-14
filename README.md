# だらリーヌ公式サイト

AI規制・ガイドライン専門の法人向けサイト。モダンミニマルデザインで実装。

## 🚀 クイックスタート

```bash
# プロジェクトディレクトリに移動
cd /Users/watanabehidetaka/Claudecode/Dara_HP

# 開発サーバー起動
npm run dev

# ブラウザで確認（ポート自動切り替えに注意）
open http://localhost:3001
```

## 📱 デプロイ済みサイト

- **開発版**: http://localhost:3001 （※ポート自動切り替え）
- **本番版**: https://darahp.vercel.app

## 🔧 技術スタック

- **フロントエンド**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS + shadcn/ui
- **CMS**: Sanity
- **ホスティング**: Vercel
- **言語**: TypeScript

## 📁 主要ファイル構成

```
src/
├── app/
│   ├── page.tsx              # メインページ
│   ├── blog/page.tsx         # ブログ一覧
│   └── layout.tsx            # 共通レイアウト
├── components/
│   ├── layout/
│   │   └── Header.tsx        # ガラスモルフィズムヘッダー
│   ├── sections/
│   │   ├── MinimalHero.tsx   # ヒーローセクション
│   │   ├── ProblemsSection.tsx # お悩みセクション
│   │   ├── Blog8.tsx         # ブログカード
│   │   └── EditorialTeam.tsx # 編集局メンバー
│   └── ui/
│       ├── scroll-animations.tsx # スクロールアニメーション
│       └── sparkles-text.tsx     # キラキラ効果
└── lib/
    └── sanity.ts             # CMS連携
```

## 🎨 デザイン特徴

- **ガラスモルフィズム**: 透明感のあるナビゲーション
- **スクロールアニメーション**: IntersectionObserver使用
- **SparklesText**: キラキラ効果（既存機能保持）
- **レスポンシブ**: モバイルファースト設計

## ✅ 実装済み機能

### 🎯 デザイン刷新（2025-07-13）
- **参考コード準拠ヒーロー**: 「AIと、もっと軽やかに。」
- **お悩みセクション**: 「こんなお悩み、ありませんか？」
- **強化されたブログカード**: グラデーション・ホバーエフェクト
- **編集局メンバー**: アニメーション付きアバター（SparklesText保持）

### 🔧 技術実装
- **Sanity CMS統合**: ブログ記事管理
- **Vercelデプロイ**: 本番環境構築
- **スクロールアニメーション**: IntersectionObserver
- **エラーバウンダリ**: 堅牢なエラーハンドリング

## 🔧 トラブルシューティング

### サーバーが起動しない場合

```bash
# キャッシュクリア
rm -rf .next
npm run dev
```

### JSX構文エラーの場合

```bash
# エラーログ確認
cat /tmp/nextjs.log | grep -A 5 "Parsing ecmascript"

# 該当ファイルのタグ構造をチェック
```

### Vercelデプロイエラーの場合

```bash
# vercel.jsonが存在することを確認
cat vercel.json

# 再デプロイ
npx vercel --prod
```

## 📝 詳細ドキュメント

詳細な実装内容・エラー対応については `CLAUDE.md` を参照してください。

## 🔄 開発フロー

1. ローカル開発: `npm run dev`
2. コミット: `git add . && git commit -m "message"`
3. プッシュ: `git push origin main`
4. デプロイ: `npx vercel --prod`

## 📝 更新履歴

- **2025-07-13**: デザイン大幅刷新・JSXエラー修正完了（サーバー正常稼働）
- **2025-07-10**: リファクタリング完了・共通コンポーネント化
- **2025-07-06**: プロジェクト初期セットアップ完了

---

**バージョン**: 2.5（デザイン刷新版）  
**最終更新**: 2025-07-13