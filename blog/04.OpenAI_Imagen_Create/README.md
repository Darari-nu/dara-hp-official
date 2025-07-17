# OpenAI画像生成システム

OpenAI GPT-image-1を使用した画像生成システムです。シンプルなプロンプトを入力すると、自動的に詳細なプロンプトに変換して高品質な画像を生成します。

## 機能

- **プロンプト強化**: シンプルな日本語プロンプトを詳細なOpenAI用プロンプトに自動変換
- **画像生成**: OpenAI GPT-image-1を使用した高品質画像生成
- **ファイル管理**: 日付別フォルダに自動保存（YYYYMMDD_タイトル.png形式）
- **料金監視**: 日次・月次予算制限と使用量追跡
- **ログ機能**: 詳細なログ記録とエラーハンドリング

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. 環境変数の設定
`.env.example`を参考に`.env`ファイルを作成し、OpenAI APIキーを設定してください。

```bash
cp .env.example .env
# .envファイルを編集してOPENAI_API_KEYを設定
```

3. TypeScriptのコンパイル
```bash
npm run build
```

## 使用方法

コマンドラインから以下のように実行します：

```bash
npm start "美しい夕焼けの風景"
```

または

```bash
npm run dev "猫が草原で遊んでいる写真"
```

## プロンプトガイド

`prompt_guide.md`ファイルを編集して、プロンプト強化のルールをカスタマイズできます。

## 料金制限

- 日次上限: $5.00（デフォルト）
- 月次上限: $50.00（デフォルト）
- 画像1枚あたり: $0.04（デフォルト）

上限に達すると自動的に生成が停止されます。

## ファイル構成

```
src/
├── modules/          # 各機能モジュール
│   ├── sdxl-api.ts          # SDXL API連携
│   ├── file-manager.ts      # ファイル管理
│   ├── cost-tracker.ts      # 料金監視
│   └── prompt-enhancer.ts   # プロンプト強化
├── types/            # 型定義
├── utils/            # ユーティリティ
│   └── logger.ts            # ログ機能
├── index.ts          # メインエントリーポイント
└── sdxl-image-generator.ts  # 画像生成統合クラス
```

## 開発

```bash
# 開発モード
npm run dev

# テスト実行
npm test

# リント実行
npm run lint

# 型チェック
npm run typecheck
```

## 生成される画像

画像は以下の形式で保存されます：
- フォルダ: `images/YYYYMMDD/`
- ファイル名: `YYYYMMDD_タイトル.png`
- 重複時は自動的に連番が付与されます

## ログ

- アプリケーションログ: `logs/app.log`
- 料金追跡データ: `cost-tracking.json`

## 注意事項

- APIキーは絶対にコミットしないでください
- 予算上限は適切に設定してください
- 生成された画像のライセンスはSDXL APIの利用規約に準拠します