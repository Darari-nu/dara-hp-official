#!/bin/bash

# Sanity Uploader セットアップスクリプト

echo "🚀 Sanity Uploader セットアップを開始します..."

# 仮想環境の作成
echo "📦 仮想環境を作成中..."
python3 -m venv venv
source venv/bin/activate

# 依存関係のインストール
echo "📥 依存関係をインストール中..."
pip install -r requirements.txt

# ログディレクトリの作成
echo "📂 ログディレクトリを作成中..."
mkdir -p logs

# 設定ファイルのサンプル作成
echo "⚙️ 設定ファイルを作成中..."
mkdir -p ../../.windsurf/config

cat > ../../.windsurf/config/sanity-config.yaml << 'EOF'
sanity:
  project_id: "9kqjddwl"
  dataset: "production"

upload:
  source_dir: "03.data/04.Wordpress"
  backup_dir: "03.data/04.Wordpress/uploaded"
  image_dir: "03.data/XX.image"

logging:
  level: "INFO"
  file: "01.system/01.sanity_uploader/logs/sanity_upload.log"
EOF

# 環境変数の設定例
echo "🔑 環境変数の設定が必要です:"
echo "SANITY_TOKEN=your_sanity_token_here"
echo ""
echo "✅ セットアップが完了しました!"
echo ""
echo "📖 使用方法:"
echo "python sanity_uploader.py --file path/to/your/article.md"
echo "python sanity_uploader.py --directory path/to/your/articles/"
echo ""
echo "🔧 設定ファイル: ../../.windsurf/config/sanity-config.yaml"