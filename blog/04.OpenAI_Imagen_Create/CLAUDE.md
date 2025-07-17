# Universal AI画像生成システム - Claude用設定

## プロジェクト概要
OpenAI GPT-image-1を使用したYAMLテンプレートベースの画像生成システム。
汎用的なライブラリ構成により他のAI画像生成サービスとの統合も可能。

## 主な特徴
- **独自プロンプト強化システム**: 簡単なテーマから詳細なプロンプトへ自動変換
- **固定キャラクター設定**: ボス猫、インターン猫、ロボ助手の一貫したキャラクター
- **シーンバリエーション**: テーマに応じたランダムなシーン生成
- **粘土フィギュア風表現**: 統一された質感とティルトシフト効果
- **汎用ライブラリ設計**: 他システムへの組み込み可能

## ディレクトリ構造
```
src/
├── lib/                    # 汎用ライブラリ
│   ├── prompt-enhancer.ts  # プロンプト強化エンジン
│   ├── file-manager.ts     # ファイル管理システム
│   └── cost-tracker.ts     # コスト追跡システム
├── templates/              # テンプレート管理
│   └── scene-variations.ts # シーンバリエーション定義
├── integrations/           # 統合レイヤー
│   └── openai-integration.ts # OpenAI統合システム
├── modules/                # 既存モジュール
└── types/                  # 型定義
```

## 設定情報

### APIキー設定
- APIキーはプロジェクトルートの`.env`ファイルで管理
- 変数名: `OPENAI_API_KEY`
- 統合された環境変数設定

### 画像保存設定
- 保存先: `/Users/watanabehidetaka/Claudecode/250629_Auto_blog_Writing/03.data/XX.image/`フォルダ
- 構造: 日付別フォルダ（YYYYMMDD）
- ファイル名: YYYYMMDD_タイトル.png

### プロンプト設定
- テンプレート: `prompt_guide.md`
- キャラクター設定: 三毛猫ボス、子猫インターン、ミントロボ
- 質感: 手作り粘土フィギュア、超詳細テクスチャ
- 効果: ティルトシフト写真風、浅い被写界深度

### 主要コマンド
```bash
# 依存関係のインストール
npm install

# システム実行（テーマ指定）
npm start "会議"
npm start "最新AI情報"
npm start "プレゼン"

# ビルド
npm run build

# テスト実行
npm test

# リント実行
npm run lint

# 型チェック
npm run typecheck
```

## 技術スタック
- Node.js / TypeScript
- OpenAI GPT-image-1 API
- dotenv（環境変数管理）
- fs-extra（ファイル操作）
- axios（HTTP通信）

## 使用方法

### 基本的な画像生成
```bash
npm start "会議"
```

### 環境変数設定
```env
OPENAI_API_KEY=your_api_key_here
COST_PER_IMAGE=0.04
DAILY_BUDGET_LIMIT=5.00
MONTHLY_BUDGET_LIMIT=50.00
```

### カスタムテーマの追加
`src/templates/scene-variations.ts`でバリエーションを追加可能。

## 他システムでの利用方法

### 汎用ライブラリとして使用
```typescript
import { UniversalPromptEnhancer } from './src/lib/prompt-enhancer';
import { UniversalFileManager } from './src/lib/file-manager';
import { UniversalCostTracker } from './src/lib/cost-tracker';

// プロンプト強化
const enhancer = new UniversalPromptEnhancer(config);
await enhancer.loadTemplate();
const enhancedPrompt = enhancer.enhancePrompt("会議");

// ファイル管理
const fileManager = new UniversalFileManager(config);
await fileManager.saveFile(buffer, "title", ".png");

// コスト追跡
const costTracker = new UniversalCostTracker(config);
const canProceed = await costTracker.checkBudgetLimits();
```

### 統合システムとして使用
```typescript
import { OpenAIImageGenerationSystem } from './src/integrations/openai-integration';

const system = new OpenAIImageGenerationSystem(config);
await system.initialize();
const result = await system.generateImage("AI導入状況");
```

## 開発時の注意点
- APIキーは絶対にコミットしない
- 予算上限を必ず設定する
- エラーハンドリングを適切に行う
- YAMLテンプレートの変更は`prompt_guide.md`で行う
- 新しいシーンバリエーションは`scene-variations.ts`に追加
- 汎用性を保つため、OpenAI固有の処理は`integrations/`に分離

## 拡張性
- 他のAI画像生成API（Stable Diffusion、Midjourney等）との統合可能
- カスタムキャラクター設定の追加可能
- Webインターフェースの追加可能
- REST API化による外部システム連携可能