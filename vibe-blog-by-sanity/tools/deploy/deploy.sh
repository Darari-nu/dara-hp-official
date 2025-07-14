#!/bin/bash

# プロバイダー非依存のデプロイメインスクリプト

# 色の定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ヘルパー関数
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# 環境設定を読み込む
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"

# デプロイ前の事前チェック
run_pre_deploy_checks() {
    local provider="$1"
    local errors=0
    
    print_info "デプロイ前のチェックを実行中..."
    
    # Node.jsのバージョンチェック
    if command -v node &> /dev/null; then
        local node_version=$(node -v | cut -d'v' -f2)
        print_success "Node.js v$node_version"
    else
        print_error "Node.jsがインストールされていません"
        errors=$((errors + 1))
    fi
    
    # 設定ファイルの確認
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local config_path="${script_dir}/../../tools/config/deploy.conf"
    
    if [ -f "$config_path" ]; then
        print_success "設定ファイル (config/deploy.conf) が存在します"
    else
        print_error "設定ファイルが見つかりません"
        errors=$((errors + 1))
    fi
    
    # プロバイダー固有のチェック
    case "$provider" in
        "firebase")
            # Firebase固有のチェック（現在のディレクトリで実行）
            if [ -d "public" ]; then
                print_success "publicディレクトリが存在します"
            else
                # Next.jsプロジェクトの場合は問題なし
                if [ -f "next.config.js" ] || [ -f "next.config.ts" ]; then
                    print_info "Next.jsプロジェクトを検出"
                else
                    print_warning "publicディレクトリがありません"
                fi
            fi
            ;;
        "vercel")
            # Vercel固有のチェック
            if [ -f "package.json" ]; then
                print_success "package.jsonが存在します"
                
                # ビルドコマンドの確認
                if grep -q '"build"' "package.json"; then
                    print_success "ビルドコマンドが定義されています"
                else
                    print_warning "ビルドコマンドが定義されていません"
                fi
                
                # .env.localの確認
                if [ -f ".env.local" ]; then
                    print_success ".env.localが存在します"
                else
                    print_warning ".env.localがありません（環境変数の手動設定が必要になる場合があります）"
                fi
            else
                print_error "package.jsonが見つかりません"
                errors=$((errors + 1))
            fi
            ;;
    esac
    
    echo ""
    
    if [ $errors -gt 0 ]; then
        print_error "チェックに失敗しました。上記のエラーを修正してください。"
        return 1
    else
        print_success "全てのチェックが成功しました"
        return 0
    fi
}

# デプロイプロバイダーを取得
# 環境変数が設定されている場合は優先
if [ -n "$DEPLOY_PROVIDER" ]; then
    echo "🔧 環境変数からプロバイダーを使用: $DEPLOY_PROVIDER"
else
    DEPLOY_PROVIDER=$(read_config "DEPLOY_PROVIDER")
fi

# デフォルトはfirebase
if [ -z "$DEPLOY_PROVIDER" ]; then
    DEPLOY_PROVIDER="firebase"
fi

# プロバイダー固有のスクリプトが存在するか確認
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROVIDER_SCRIPT="${SCRIPT_DIR}/${DEPLOY_PROVIDER}.sh"

if [ ! -f "$PROVIDER_SCRIPT" ]; then
    echo "❌ プロバイダー '${DEPLOY_PROVIDER}' のスクリプトが見つかりません。"
    echo "利用可能なプロバイダー:"
    echo "  - firebase"
    echo "  - vercel"
    echo ""
    echo "config.js の deploy.provider を設定してください。"
    exit 1
fi

# プロバイダー固有のスクリプトを実行
echo "🚀 ${DEPLOY_PROVIDER}へのデプロイを開始します..."

# 事前チェックを実行
if ! run_pre_deploy_checks "$DEPLOY_PROVIDER"; then
    exit 1
fi

echo ""

# Firebaseの場合はプロジェクトIDとサイト名を渡す
if [ "$DEPLOY_PROVIDER" = "firebase" ]; then
    PROJECT_ID=$(read_config "FIREBASE_PROJECT_ID")
    SITE_NAME=$(read_config "FIREBASE_SITE")
    bash "$PROVIDER_SCRIPT" "$PROJECT_ID" "$SITE_NAME"
else
    bash "$PROVIDER_SCRIPT"
fi