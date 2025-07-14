# だらリーヌ公式サイト兼ブログ 要件定義書（詳細版）

## プロジェクト概要
だらリーヌの公式サイトとブログを統合した新サイトを構築し、WordPress の制約を克服して柔軟かつ高速な運用を実現する。

### サイト情報
- **利用可能ドメイン**: https://madaladalarin.com/（Xサーバー）
- **新サイト**: 完全新規構築（既存サイト移行なし）
- **目的**: AI規制・ガイドライン専門の法人向けサイト

## 技術スタック
- **フロントエンド**: Next.js (App Router, React + TypeScript)
- **スタイリング**: Tailwind CSS + shadcn/ui
- **CMS**: Sanity
- **ホスティング**: Vercel
- **検索**: Algolia DocSearch（InstantSearch モーダル）
- **分析**: Google Analytics 4

## サイト構成

### 1. トップページ

#### 1.1 ヒーローセクション
- **背景**: bg-gray-50（淡オフホワイト）
- **レイアウト**: 2カラム（左：テキスト、右：画像）
- **メインコピー**: 「**AI**使ってますか？」（AIをGoogle風グラデーション）
- **サブコピー**: 「AIガイドライン、現場目線で翻訳します。」
- **画像**: AI・テクノロジー関連のUnsplash画像 + フローティングバッヂ
- **ボタン**: 
  - Primary「今日のアップデートを見る」
  - Secondary「無料相談してみる」
- **ブランド表示**: 「だらリーヌ」ロゴは**削除**（ユーザー要望により）

#### 1.2 共感カルーセル（Tabs UI）
```
タブ1: 法規制担当者向け「改訂ラッシュで徹夜気味のあなたへ」
├─ 痛み：法規制更新に追われる…
├─ Gain：毎朝5分PDF＋チェックリスト  
└─ CTA：「法規制まとめをDL」→ PDFダウンロードページ

タブ2: AI推進を任された方へ「"AIやれ"指令で迷子のあなたへ」
├─ 痛み：ゴールも予算も不明…
├─ Gain：導入ロードマップ&同業事例集
└─ CTA：「ロードマップを見る」→ 事例カタログ

タブ3: AI活用を模索中の方へ「まず何から？と悩むあなたへ」
├─ 痛み：ユースケースが浮かばない…
├─ Gain：部署別ユースケース＋Slack Bot検証
└─ CTA：「ユースケースを探す」→ ユースケースカタログ
```

#### 1.3 サービス概要セクション
- 法規制ダイジェスト
- ロードマップ&事例集
- ユースケース集＋Slack Bot

#### 1.4 Trust Badges セクション
```
1. JTC社内AIガイドラインを構築・保守
   "現場が迷わない"チェックリストを常時アップデート

2. 元プロダクトリーダー目線のAI改善提案
   ビジネスKPIに直結する実装ステップを設計

3. SNSアイコン1,000枚以上の生成実績
   Midjourney活用で48h納品・ブランド統一もラク
```

#### 1.5 導入フロー（5 Step）
#### 1.6 最新ブログ記事（最新3件カード表示）
- **コンポーネント**: Blog8（shadcn/ui ベース）
- **表示内容**: 
  - アイキャッチ画像（16:9 アスペクト比）
  - タグ（カテゴリ）
  - 記事タイトル
  - 概要（サマリー）
  - 著者名・投稿日
  - 「Read more」リンク
- **レイアウト**: 画像とテキストの2カラム、レスポンシブ対応
#### 1.7 FAQ
#### 1.8 最終CTA「15分無料ヒアリングを予約」
#### 1.9 フッター（SNSアイコン・サイトマップ）

### 2. ブログセクション
- 一覧ページ
- 記事詳細ページ
- カテゴリページ
- タグページ

### 3. 共通コンポーネント
- ヘッダー（検索アイコン付き）
- フッター
- Algolia検索モーダル

## 機能要件

### 1. 検索機能（Algolia）
- **対象**: サイト全体（ブログ記事+固定ページ+FAQ）
- **フィルタ**: タグ・日付での絞り込み
- **表示項目**: タイトル、概要、カテゴリ、投稿日（詳細はお任せ）
- **UI**: ヘッダー検索アイコン → InstantSearch モーダル

### 2. Sanity CMS スキーマ設計

#### 2.1 著者管理
- **だらリーヌ（本人）**: メイン著者、AI・法規制の専門家
- **AIアシスタント**: 技術解説・ガイドライン分析担当
- **AIギャル**: ユーザーフレンドリーな解説・トレンド紹介担当
- **表示コンポーネント**: AnimatedTestimonials（アニメーション付き著者カード）

#### 2.2 ブログ記事管理
- **アイキャッチ画像**: 必須
- **記事内画像**: 最低1枚必須、その他は任意
- **関連記事**: 自動関連付け
- **カテゴリ・タグ**: 詳細設計はお任せ

#### 2.3 その他コンテンツ
- **FAQ**: Sanityで管理
- **Trust Badges**: Sanityで管理（数値の動的更新対応）

### 3. SEO・パフォーマンス
- Next.js 静的生成（SSG）
- next/image、WebP、自動遅延読み込み
- Google風グラデ文字のテキスト読み取り対応（bg-clip-text）

## デザイン要件

### カラーパレット
- **背景**: #F9FAFB（gray-50）
- **本文**: #1F2937（neutral-800）
- **アクセント**: Google4色グラデ（Blue: #4285F4, Red: #EA4335, Yellow: #FBBC05, Green: #34A853）

### フォント
- **本文**: Noto Sans JP
- **見出し**: Poppins

### UI要素
- **バッジ**: rounded-xl、shadow-sm
- **Trust Badges**: 詳細デザインはお任せ（3つのバッジ配置）

## 非機能要件
- ページ読み込み3秒以内
- Lighthouse 90以上
- 主要ブラウザ最新2世代対応

## 開発フェーズ
1. 環境構築（Next.js 13, Tailwind, shadcn/ui）
2. Sanity スキーマ設定
3. 共通レイアウト＆検索モーダル
4. トップページ実装（Hero〜Trust Badges）
5. ブログ機能実装（一覧・詳細）
6. Algolia 検索実装
7. SEO／パフォーマンス最適化
8. テスト & デバッグ
9. Vercel デプロイ設定
10. 本番リリース

## 保留項目
- **SplashCursor**: 流体シミュレーション背景エフェクト（将来的な機能拡張として保留）

## 参考コンポーネント

### ブログカード（Blog8）
```tsx
// だらリーヌサイト用のデータ例
const darineBlogs = [
  {
    id: "post-1",
    title: "AI規制対応の完全ガイド：2025年版",
    summary: "最新の AI ガイドライン改訂を踏まえた、企業が今すぐ取り組むべき対応策をまとめました。",
    author: "だらリーヌ",
    published: "2025年7月6日",
    tags: ["法規制", "AI ガイドライン"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
    url: "/blog/ai-regulation-guide-2025"
  }
];
```

### SparklesText（Google風グラデーション）
- ヒーローセクションの見出しに使用
- カラー: Google 4色グラデーション

### AnimatedTestimonials（著者紹介）
```tsx
// だらリーヌサイト用の著者データ例
const darineAuthors = [
  {
    quote: "AI規制の複雑さを、現場で使える形に変換します。法務と技術の橋渡し役として、皆さんの「困った」を解決したい。",
    name: "だらリーヌ",
    designation: "AI規制コンサルタント・元プロダクトリーダー",
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500"
  },
  {
    quote: "最新の技術動向とガイドライン改訂を分析し、企業が迷わない実装ステップを提案します。",
    name: "AIアシスタント",
    designation: "技術解説・ガイドライン分析担当",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500"
  },
  {
    quote: "難しいAI話も、わかりやすく楽しく！トレンドと実用性を両立した情報をお届けします♪",
    name: "AIギャル",
    designation: "ユーザーフレンドリー解説・トレンド紹介担当",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500"
  }
];
```

### SplashCursor
- **ステータス**: 保留（将来的な機能拡張として検討）

## 追記事項
- Trust Badges のデザイン・動作: 実装者にお任せ
- Google風グラデーション: SparklesText コンポーネントを参考に実装
- ブログカード: Blog8 コンポーネントを使用（shadcn/ui + lucide-react）
- 著者紹介: AnimatedTestimonials コンポーネントを使用（framer-motion + @tabler/icons-react）
- 各セクションの詳細デザイン: 基本方針に沿って実装者が決定

## 修正履歴
- **2025-07-06**: ヒーローセクションから「だらリーヌ」ロゴを削除（ユーザー要望）
- **2025-07-06**: メインコピーを「AI使ってますか？」に変更
- **2025-07-06**: レイアウトを2カラム（テキスト+画像）に変更
- **2025-07-07**: ミニマリストデザインに大幅リニューアル（ユーザー要望）
  - 9セクション → 4セクションに簡素化
  - フルスクリーン画像背景ヒーローに変更
  - 編集局メンバー紹介をカジュアルスタイルに変更
  - Udemyセクション削除、作例紹介セクション追加
  - 情報量を大幅削減してすっきりしたデザインに

## 現在の実装状況（2025-07-10時点）

### ✅ 実装済みセクション
1. **MinimalHero**: フルスクリーン画像背景ヒーロー
2. **Blog8**: 最新記事表示（簡素化版）
3. **EditorialTeam**: 編集局メンバー紹介（カジュアル）
4. **SimpleWorkShowcase**: 作例紹介（LP貼り付け対応）

### 📝 編集局メンバー構成
- **編集長**: だらリーヌ（AI規制専門家） 👩‍💼
- **アシスタント**: 読書ギャル卍頭よくなりたい（勉強中） 📚  
- **アシスタント**: インターンAI猫（技術調査担当） 🐱
- **アシスタント**: AIろぼ（データ分析・技術解説） 🤖

### 🎨 デザインコンセプト
- **ミニマリスト**: 情報量を最小限に抑制
- **親しみやすさ**: カジュアルで親近感のあるトーン
- **ビジュアル重視**: 画像中心のインパクトあるデザイン
- **現場目線**: 実践的で使いやすい情報提供

### 🔧 リファクタリング完了（2025-07-10）

#### 共通コンポーネント化
- **SectionHeader**: SparklesText付きの再利用可能なヘッダー
- **SectionDivider**: 一貫したセクション間ディバイダー
- **HoverCard**: 共通のカードホバー効果（作成済み、未実装）

#### 型定義の一元化
- `/src/types/index.ts` で共通インターフェースを管理
- BlogPost, TeamMember, Work, SectionHeaderProps

#### コード構成の最適化
- 各コンポーネントの設定定数を先頭に配置
- 重複コードの排除とDRY原則の適用
- TypeScript型安全性の向上

#### 保守性の向上
- スタイリングパターンの一元化
- 一貫したコンポーネント構造
- ビルドエラーの修正完了

## Sanity CMS実装完了（2025-07-12）

### ✅ 実装済み

#### Sanity設定
- **プロジェクトID**: `9kqjddwl`
- **Studio URL**: http://localhost:3333
- **データセット**: production

#### スキーマ設計
1. **Author**: 著者管理（名前、役割、説明、アバター、絵文字）
2. **BlogPost**: ブログ記事（タイトル、内容、アイキャッチ、著者、カテゴリ）
3. **Category**: カテゴリ管理（タイトル、説明、スラッグ）
4. **FAQ**: よくある質問（質問、回答、カテゴリ）
5. **SiteSettings**: サイト全体設定（タイトル、説明、ロゴ、SNSリンク）

#### Next.js連携
- **APIクライアント**: `/src/lib/sanity.ts`で設定完了
- **型定義**: `/src/types/sanity.ts`でTypeScript対応
- **クエリ**: 最新記事取得、著者一覧取得のクエリ実装
- **画像最適化**: `urlFor`ヘルパーでSanity画像の最適化対応

#### コンポーネント更新
- **Blog8**: SanityブログデータをProps経由で受け取り表示
- **EditorialTeam**: Sanity著者データをProps経由で受け取り表示
- **データ変換**: Sanityデータをローカルインターフェースに自動変換

#### 起動方法
```bash
# Next.js開発サーバー
npm run dev  # http://localhost:3001

# Sanity Studio  
npm run sanity  # http://localhost:3333
```

### ✅ 完了済みタスク
1. 著者データ作成（だらリーヌ、読書ギャル卍、インターンAI猫、AIろぼ）
2. サンプルブログ記事3件作成  
3. カテゴリ作成（AI規制、技術解説、トレンドなど）
4. Next.jsサイトでの表示確認

### 🔍 確認されたこと
- Sanity Studio: http://localhost:3333 で全データ管理可能
- Next.jsサイト: http://localhost:3000 でSanityデータが正常表示
- Blog8セクション: 3つの記事が表示（AI規制ガイド、ChatGPT活用、AI導入失敗談）
- EditorialTeamセクション: 4人の著者が表示（各々のアバター・絵文字付き）

### ⚠️ 注意点
- ブログ記事の個別ページ（/blog/[slug]）はまだ実装されていない（404エラー）
- 記事クリック時は詳細ページが必要

## ⚡ 緊急修正（2025-07-12）

### 🚨 サーバーエラー修正完了

#### 発生した問題
- **エラー**: `Invalid hook call. Hooks can only be called inside of the body of a function component`
- **原因**: Server ComponentとClient Componentの混在
- **影響**: ホームページが500エラーで表示されない

#### 根本原因分析
1. **SectionHeaderコンポーネント**:
   - SparklesText（Client Component）を使用
   - `"use client"`ディレクティブが不足
   
2. **UdemyComingSoonコンポーネント**:
   - 同様にSparklesTextを使用
   - `"use client"`ディレクティブが不足

#### 解決策実施
```typescript
// src/components/ui/section-header.tsx
"use client";  // 追加
import { SparklesText } from "@/components/ui/sparkles-text";

// src/components/sections/UdemyComingSoon.tsx  
"use client";  // 追加
import { SparklesText } from "@/components/ui/sparkles-text";
```

#### 修正結果
- ✅ ホームページ正常表示（HTTP 200）
- ✅ 編集局メンバーの画像・説明復活
- ✅ React Hooksエラー完全解決

#### 📋 対処法ルール
**Next.js App Routerでの注意点**:
1. Client Componentを使うコンポーネントには必ず`"use client"`を追加
2. SparklesText, framer-motion等のHooksを使うコンポーネントはClient Component
3. Server Componentからは直接的にHooksを使用不可
4. データフェッチはServer Component、UI動作はClient Componentで分離

---

## 🚀 Vercelデプロイトラブルシューティング

### 問題: サイトが404エラーでアクセスできない

#### 症状
- ✅ ローカルビルド成功 (`npm run build`)
- ✅ Vercelデプロイ完了表示
- ❌ HTTP 404/401エラーでサイトアクセス不可

#### 根本原因
**Next.js 14 App Routerの自動検出失敗**
- Vercelが`vercel.json`なしでNext.jsフレームワークを正しく認識できない
- デフォルト設定で静的サイトとして扱われる
- App Routerのルーティングが機能しない

#### 解決方法
```json
// vercel.json を追加
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

#### 検証手順
```bash
# 1. 設定ファイル追加後に再デプロイ
npx vercel --prod

# 2. フレームワーク検出確認
# ログに「Detected Next.js version: 14.2.5」が表示されること

# 3. HTTPステータス確認
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" https://your-app.vercel.app
# 期待値: HTTP Status: 200
```

#### 予防策
- **新規Next.jsプロジェクト**: 必ず`vercel.json`でフレームワーク明示
- **デプロイ前チェック**: ローカルビルド成功 + ログでフレームワーク検出確認
- **TDD原則**: エラー回避ではなく根本原因特定を優先

#### 失敗パターン（やってはいけない）
- ❌ プロジェクト名変更で回避しようとする
- ❌ 別URLでエラーを隠蔽する  
- ❌ 根本原因分析を飛ばす

---

## 🎨 デザイン大幅アップグレード実装

### 実装内容（2025-07-13）

#### 参考デザインコードの採用
- **参考元**: モダンミニマルデザインコード（ガラスモルフィズム・スクロールアニメーション）
- **方針**: 既存機能（SparklesText、編集局メンバー）は保持、デザインのみ刷新

#### ✨ 新規実装コンポーネント

1. **ガラスモルフィズム固定ヘッダー**
   ```tsx
   // src/components/layout/Header.tsx
   - DaraHPロゴ（だらリーヌ削除）
   - teal-500の「記事を読む」ボタン
   - glass-navクラスでガラス効果
   ```

2. **参考コード準拠ヒーローセクション**
   ```tsx
   // src/components/sections/MinimalHero.tsx
   - 「AIと、もっと軽やかに。」メインタイトル
   - blur-sm背景画像 + 黒オーバーレイ
   - 「最新記事をチェック」CTAボタン
   ```

3. **お悩みセクション（新規）**
   ```tsx
   // src/components/sections/ProblemsSection.tsx
   - 「こんなお悩み、ありませんか？」
   - 3つのCheckIcon付きカード
   - teal-100背景アイコン
   ```

4. **スクロールアニメーション**
   ```tsx
   // src/components/ui/scroll-animations.tsx
   - IntersectionObserver使用
   - .animate-on-scroll/.is-visibleクラス
   - enhanced-cardホバーエフェクト
   ```

#### 🔄 改良済みコンポーネント

- **Blog8**: 強化されたカードデザイン、グラデーション効果
- **EditorialTeam**: アニメーション付きアバター、リングエフェクト
- **page.tsx**: セクション構成の再編成

#### 📁 現在のサイト構成
```
ヒーローセクション (参考コード準拠)
　　↓
お悩みセクション (新規・参考コード準拠)
　　↓
新着記事セクション (改良版Blog8)
　　↓
編集局メンバー (SparklesText保持)
　　↓
作例紹介・お問い合わせ
```

---

## 🔧 新発見エラー: JSX構文エラートラブルシューティング

### 問題: Internal Server Error - JSX構文エラー

#### 症状
- ✅ Next.jsサーバー起動成功
- ❌ HTTP 500 Internal Server Error
- ❌ ブラウザで「このサイトにアクセスできません」

#### 根本原因
**JSX構文の重複タグエラー**
- 不要な`</div>`タグの存在
- React要素の不正な閉じタグ
- Expected ',' got 'className' エラー

#### 解決方法
```bash
# 1. エラーログ確認
cat /tmp/nextjs.log | grep -A 5 -B 5 "Parsing ecmascript"

# 2. 該当ファイルの構文修正
# 例: Blog8.tsx:136行目の不要なタグ削除

# 3. サーバー再起動不要（Hot Reload自動適用）
```

#### 具体的修正例
```tsx
// ❌ 間違い
          ))}
        </div>

      </div>  // <-- 不要な閉じタグ
      
      <div className="text-center mt-12">

// ✅ 正解  
          ))}
      </div>
      
      <div className="text-center mt-12">
```

#### 検証手順
```bash
# HTTPステータス確認
curl -I http://localhost:3001  # ポート注意（3000が使用中の場合3001に自動切り替え）
# 期待値: HTTP/1.1 200 OK

# ステータスコードのみ確認
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001
# 期待値: 200
```

#### ✅ 修正完了（2025-07-13 継続セッション）
- **対象ファイル**: Blog8.tsx
- **修正内容**: JSX構文の整理・フォーマット調整
- **結果**: サーバー正常起動確認済み（http://localhost:3001）
- **HTTPステータス**: 200 OK
- **所要時間**: 即座にHot Reload適用

#### 予防策
- **JSX構造の確認**: 開発時にカッコの対応をチェック
- **段階的修正**: 大幅変更時は小さく分けて実装
- **エラーログ監視**: /tmp/nextjs.logの定期確認

---

## 🚀 クイックスタートガイド

### 新しいターミナルでの起動手順
```bash
# 1. プロジェクトディレクトリに移動
cd /Users/watanabehidetaka/Claudecode/Dara_HP

# 2. 依存関係確認（初回のみ）
npm install

# 3. 開発サーバー起動
npm run dev

# 4. ブラウザで確認
# http://localhost:3000

# 5. エラー時のトラブルシューティング
# キャッシュクリア
rm -rf .next && npm run dev

# 6. Vercelデプロイ（本番）
npx vercel --prod
```

### 主要ファイル構成
```
src/
├── app/
│   ├── page.tsx (メインページ・セクション統合)
│   ├── blog/page.tsx (ブログ一覧)
│   └── layout.tsx (共通レイアウト)
├── components/
│   ├── layout/Header.tsx (ガラスモルフィズムヘッダー)
│   ├── sections/
│   │   ├── MinimalHero.tsx (参考コード準拠ヒーロー)
│   │   ├── ProblemsSection.tsx (お悩みセクション・新規)
│   │   ├── Blog8.tsx (強化されたブログカード)
│   │   └── EditorialTeam.tsx (SparklesText保持)
│   └── ui/
│       ├── scroll-animations.tsx (アニメーション・新規)
│       └── sparkles-text.tsx (キラキラ効果・保持)
└── lib/sanity.ts (CMS連携)
```

### デプロイ済みサイト
- **開発版**: http://localhost:3000
- **本番版**: https://darahp.vercel.app

---

**更新日**: 2025-07-13  
**作成者**: だらリーヌ  
**バージョン**: 2.5（デザイン刷新・JSXエラー対応版）