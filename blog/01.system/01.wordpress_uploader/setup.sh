#!/bin/bash

# WordPress自動投稿システム セットアップスクリプト

echo "🚀 WordPress自動投稿システムをセットアップしています..."

# 必要なディレクトリを作成
echo "📁 ディレクトリを作成中..."
mkdir -p "uploaded"
mkdir -p "01.system/01.wordpress_uploader/logs"

# Python依存関係をインストール
echo "📦 Python依存関係をインストール中..."
pip install -r 01.system/01.wordpress_uploader/requirements.txt

# 実行権限を付与
echo "🔧 実行権限を設定中..."
chmod +x 01.system/01.wordpress_uploader/wordpress_uploader.py

echo "✅ セットアップ完了！"
echo ""
echo "📝 使用方法:"
echo "   python 01.system/01.wordpress_uploader/wordpress_uploader.py --file 'filename.md'"
echo "   python 01.system/01.wordpress_uploader/wordpress_uploader.py --all"
echo ""
echo "📖 詳細は 01.system/01.wordpress_uploader/README.md をご確認ください"