#!/bin/bash

# Vercel用デプロイスクリプト

set -e

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

# Vercel CLIがインストールされているか確認
check_vercel_cli() {
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLIがインストールされていません"
        echo ""
        echo "📝 Vercelアカウントをお持ちでない場合:"
        echo "   👉 https://vercel.com/signup から無料で作成できます"
        echo "   (GitHubアカウントでも登録可能)"
        echo ""
        echo "📦 CLIのインストール方法:"
        echo "   npm install -g vercel"
        echo ""
        exit 1
    fi
}

# Vercel認証のチェック
check_vercel_auth() {
    if ! vercel whoami &> /dev/null; then
        print_warning "Vercelにログインしていません"
        echo "ログインを開始します..."
        vercel login
    fi
}

# 環境変数の自動設定
setup_env_variables() {
    local project_name="$1"
    local force_update="${2:-false}"
    
    # スクリプトの位置からプロジェクトルートを特定
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local project_root="$(cd "${script_dir}/../.." && pwd)"
    local app_dir="${project_root}/app"
    
    print_info "環境変数を確認中..."
    
    # 既存の環境変数を取得（appディレクトリから実行）
    local existing_vars=$(cd "$app_dir" && vercel env ls production 2>/dev/null || echo "")
    
    # 環境変数を設定する関数
    set_env_var() {
        local key="$1"
        local value="$2"
        local env_type="${3:-production}"
        
        # 値から引用符を削除
        value=$(echo "$value" | sed 's/^"//;s/"$//')
        
        # 環境変数が既に設定されているかチェック
        if echo "$existing_vars" | grep -q "^$key" && [ "$force_update" != "true" ]; then
            return
        fi
        
        # 既存の変数を削除（force_updateの場合）
        if echo "$existing_vars" | grep -q "^$key" && [ "$force_update" = "true" ]; then
            (cd "$app_dir" && vercel env rm "$key" production --yes 2>/dev/null || true)
        fi
        
        # 環境変数を設定
        print_info "環境変数を設定: $key"
        echo "$value" | (cd "$app_dir" && vercel env add "$key" $env_type 2>/dev/null) || {
            print_warning "$key の設定に失敗しました"
        }
    }
    
    # 環境変数カウンター
    local env_count=0
    local env_set=false
    
    # .env.localファイルが存在する場合（優先度高）
    if [ -f "${app_dir}/.env.local" ]; then
        print_info ".env.localから環境変数を読み込み中..."
        
        # .env.localから環境変数を読み込んで設定
        while IFS='=' read -r key value || [ -n "$key" ]; do
            # コメント行と空行をスキップ
            if [[ "$key" =~ ^#.*$ ]] || [ -z "$key" ]; then
                continue
            fi
            
            # 前後の空白を削除
            key=$(echo "$key" | xargs)
            
            # キーが空の場合はスキップ
            if [ -z "$key" ]; then
                continue
            fi
            
            # 値を取得（改行を含む可能性があるため特別な処理）
            if [[ "$value" =~ ^\" ]]; then
                # ダブルクォートで始まる場合、閉じるクォートまで読む
                local full_value="$value"
                while ! [[ "$full_value" =~ \"$ ]] && IFS= read -r next_line; do
                    full_value="${full_value}
${next_line}"
                done
                value="$full_value"
            fi
            
            # 値が空でない場合のみ処理
            if [ -n "$value" ]; then
                set_env_var "$key" "$value" "production"
                env_set=true
                ((env_count++))
            fi
        done < "${app_dir}/.env.local"
    fi
    
    # config/deploy.confからVERCEL_ENV_で始まる環境変数を読み込む（補完用）
    if [ -f "${project_root}/tools/config/deploy.conf" ]; then
        while IFS='=' read -r key value || [ -n "$key" ]; do
            # コメント行と空行をスキップ
            if [[ "$key" =~ ^#.*$ ]] || [ -z "$key" ]; then
                continue
            fi
            
            # VERCEL_ENV_で始まる環境変数を処理
            if [[ "$key" =~ ^VERCEL_ENV_ ]]; then
                # プレフィックスを削除して実際の環境変数名を取得
                local env_key="${key#VERCEL_ENV_}"
                # 前後の空白と引用符を削除
                value=$(echo "$value" | xargs | sed 's/^["'"'"']//;s/["'"'"']$//')
                
                if [ -n "$value" ] && [ "$value" != "your-"* ]; then
                    set_env_var "$env_key" "$value" "production"
                    env_set=true
                    ((env_count++))
                fi
            fi
        done < "${project_root}/tools/config/deploy.conf"
    fi
    
    if [ "$env_set" = true ]; then
        print_success "環境変数の設定が完了しました（${env_count}個）"
    else
        print_warning "設定する環境変数が見つかりません"
        print_info "app/.env.localファイルを作成するか、"
        print_info "config/deploy.confにVERCEL_ENV_プレフィックスで環境変数を追加してください"
    fi
}

# デプロイの実行とURLの取得
deploy_to_vercel() {
    local deploy_output
    local deployment_url
    local inspect_url
    
    # スクリプトの位置からプロジェクトルートを特定
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local project_root="$(cd "${script_dir}/../.." && pwd)"
    local app_dir="${project_root}/app"
    
    # .vercelディレクトリが存在する場合は、リンクされたプロジェクトを使用
    if [ -f "${project_root}/.vercel/project.json" ] || [ -f "${app_dir}/.vercel/project.json" ]; then
        print_info "リンクされたプロジェクトにデプロイ中..."
        
        # プロジェクト名を設定から取得
        local project_name=$(read_config "VERCEL_PROJECT_NAME")
        if [ -z "$project_name" ] || [ "$project_name" = '""' ]; then
            # プロジェクトルートのディレクトリ名をデフォルトとして使用
            project_name=$(basename "$project_root")
        fi
        print_info "プロジェクト: $project_name"
        
        # デプロイ実行とログキャプチャ
        print_info "デプロイを実行中..."
        # appディレクトリから実行
        deploy_output=$(cd "$app_dir" && vercel --prod --yes 2>&1)
        local exit_code=$?
        
        if [ $exit_code -eq 0 ]; then
            # URLを抽出（複数のパターンを試す）
            deployment_url=$(echo "$deploy_output" | grep -E 'Production: https://[^ ]+' | sed 's/.*Production: //' | sed 's/\[.*//' | tr -d ' ')
            
            # URLが見つからない場合は別のパターンを試す
            if [ -z "$deployment_url" ]; then
                deployment_url=$(echo "$deploy_output" | grep -E 'https://[a-zA-Z0-9-]+\.vercel\.app' | head -1 | tr -d ' ')
            fi
            
            # それでも見つからない場合は最新のデプロイメントを取得
            if [ -z "$deployment_url" ]; then
                # jqが利用可能か確認
                if command -v jq &> /dev/null; then
                    deployment_url=$(cd "$app_dir" && vercel ls --json 2>/dev/null | jq -r '.[0].url' 2>/dev/null)
                fi
                # jqが無い場合、または失敗した場合は通常の出力から取得
                if [ -z "$deployment_url" ]; then
                    deployment_url=$(cd "$app_dir" && vercel ls 2>&1 | grep -E 'https://[^ ]+' | head -1 | tr -d ' ')
                fi
            fi
            
            inspect_url=$(echo "$deploy_output" | grep -E 'Inspect: https://[^ ]+' | sed 's/.*Inspect: //' | sed 's/\[.*//' | tr -d ' ')
            
            # プロジェクトのデフォルトエイリアス
            local alias_url=""
            if [ -n "$project_name" ]; then
                # プロジェクト名.vercel.appが一般的なエイリアス
                alias_url="$project_name.vercel.app"
                
                # エイリアスが実際に設定されているか確認
                if ! (cd "$app_dir" && vercel alias ls 2>/dev/null | grep -q "$alias_url"); then
                    # エイリアスが設定されていない場合は、設定を試みる
                    print_info "エイリアス $alias_url を設定中..."
                    (cd "$app_dir" && vercel alias set "$deployment_url" "$alias_url" &>/dev/null || true)
                fi
            fi
            
            # 成功メッセージ
            echo ""
            echo " ┌──────────────────────────────────────────────────────────────────────┐"
            echo " │                                                                      │"
            echo " │   ✅ デプロイが完了しました！                                        │"
            echo " │                                                                      │"
            # 実際のデプロイURLを表示
            if [ -n "$deployment_url" ]; then
                echo " │   Production:                                                        │"
                echo " │   $deployment_url"
                echo " │                                                                      │"
            fi
            # エイリアスが利用可能な場合は追加で表示
            if [ -n "$alias_url" ] && [ "$alias_url" != "" ] && (cd "$app_dir" && vercel alias ls 2>/dev/null | grep -q "$alias_url"); then
                echo " │   Alias:                                                             │"
                echo " │   https://$alias_url"
                echo " │                                                                      │"
            fi
            if [ -n "$inspect_url" ]; then
                echo " │   Inspect:                                                           │"
                echo " │   $inspect_url"
                echo " │                                                                      │"
            fi
            echo " └──────────────────────────────────────────────────────────────────────┘"
            echo ""
            
            return 0
        else
            print_error "デプロイに失敗しました (終了コード: $exit_code)"
            echo ""
            echo "=== エラー詳細 ==="
            echo "$deploy_output"
            echo "=================="
            echo ""
            
            # よくあるエラーのヒント
            if echo "$deploy_output" | grep -q "Build Failed"; then
                print_info "ビルドエラーが発生しました。以下を確認してください:"
                echo "  - 依存関係が正しくインストールされているか"
                echo "  - TypeScriptエラーがないか"
                echo "  - 環境変数が正しく設定されているか"
                
                # Firebase APIキーエラーのチェック
                if echo "$deploy_output" | grep -q "auth/invalid-api-key"; then
                    echo ""
                    print_error "Firebase APIキーが無効です"
                    print_info "環境変数を確認します..."
                    
                    # 環境変数の確認
                    local missing_vars=""
                    for var in "NEXT_PUBLIC_FIREBASE_API_KEY" "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" "NEXT_PUBLIC_FIREBASE_PROJECT_ID"; do
                        if ! (cd "$app_dir" && vercel env ls production 2>/dev/null | grep -q "^$var"); then
                            missing_vars="$missing_vars $var"
                        fi
                    done
                    
                    if [ -n "$missing_vars" ]; then
                        print_warning "不足している環境変数:$missing_vars"
                        echo ""
                        read -p "環境変数を自動設定しますか? (y/N): " -n 1 -r
                        echo ""
                        if [[ $REPLY =~ ^[Yy]$ ]]; then
                            setup_env_variables
                            echo ""
                            print_info "環境変数を設定しました。再度デプロイを実行してください。"
                        fi
                    fi
                fi
                
                # Stripeエラーのチェック
                if echo "$deploy_output" | grep -q "Stripe"; then
                    echo ""
                    print_error "Stripeの設定に問題があります"
                    print_info "STRIPE_SECRET_KEYが正しく設定されているか確認してください"
                fi
            elif echo "$deploy_output" | grep -q "Error:"; then
                print_info "エラーの詳細を確認して修正してください"
            fi
            
            # ログの確認オプション
            echo ""
            print_info "🔍 詳細なログを確認するには:"
            echo "   vercel logs --prod"
            echo "   またはブラウザでログを確認:"
            if [ -n "$inspect_url" ]; then
                echo "   $inspect_url"
            fi
            
            return 1
        fi
    else
        # プロジェクトがリンクされていない場合
        print_warning "プロジェクトがリンクされていません"
        echo ""
        
        # プロジェクト名を取得
        local project_name=$(read_config "VERCEL_PROJECT_NAME")
        if [ -z "$project_name" ] || [ "$project_name" = '""' ]; then
            # プロジェクトルートのディレクトリ名をデフォルトとして使用
            project_name=$(basename "$project_root")
        fi
        
        echo " ┌──────────────────────────────────────────────────────────────────────┐"
        echo " │                                                                      │"
        echo " │   🔗 Vercelプロジェクトを設定する必要があります                       │"
        echo " │                                                                      │"
        echo " │   プロジェクト名: $project_name"
        echo " │                                                                      │"
        echo " │   以下のいずれかを選択してください:                               │"
        echo " │                                                                      │"
        echo " │   1. 新しいプロジェクトを作成 (プロジェクト名: $project_name)         │"
        echo " │   2. 既存のプロジェクトにリンク                                          │"
        echo " │   3. キャンセルして設定を確認                                          │"
        echo " │                                                                      │"
        echo " └──────────────────────────────────────────────────────────────────────┘"
        echo ""
        
        read -p "選択してください (1/2/3): " -n 1 -r choice
        echo ""
        
        case $choice in
            1)
                # 新しいプロジェクトを作成
                print_info "新しいプロジェクト '$project_name' を作成します..."
                echo ""
                
                # 環境変数の設定を確認
                if [ -f "${app_dir}/.env.local" ]; then
                    echo ""
                    print_info ".env.localファイルが見つかりました"
                    echo "環境変数を自動的にVercelに設定します"
                    echo ""
                    read -p "続行しますか? (Y/n): " -n 1 -r
                    echo ""
                    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                        # プロジェクトを作成（appディレクトリから実行）
                        (cd "$app_dir" && vercel --yes --name "$project_name") || {
                            print_error "プロジェクトの作成に失敗しました"
                            return 1
                        }
                        
                        # 環境変数を設定
                        setup_env_variables "$project_name"
                        
                        echo ""
                        print_info "環境変数の設定が完了しました。本番環境にデプロイします..."
                        
                        # 本番環境にデプロイ
                        (cd "$app_dir" && vercel --prod --yes) || {
                            print_error "デプロイに失敗しました"
                            return 1
                        }
                    else
                        print_warning "キャンセルされました"
                        return 1
                    fi
                else
                    # .env.localがない場合は通常のフロー
                    (cd "$app_dir" && vercel --prod --yes --name "$project_name") || {
                        print_error "プロジェクトの作成に失敗しました"
                        return 1
                    }
                fi
                
                # デプロイ後の処理
                print_success "プロジェクトの作成とデプロイが完了しました"
                ;;
            2)
                # 既存のプロジェクトにリンク
                print_info "既存のプロジェクトにリンクします..."
                echo ""
                
                # vercel link を実行（appディレクトリから）
                (cd "$app_dir" && vercel link) || {
                    print_error "プロジェクトのリンクに失敗しました"
                    return 1
                }
                
                # 環境変数の設定を確認
                if [ -f "${app_dir}/.env.local" ]; then
                    echo ""
                    print_info ".env.localファイルが見つかりました"
                    read -p "環境変数をVercelに設定しますか? (Y/n): " -n 1 -r
                    echo ""
                    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                        setup_env_variables
                    fi
                else
                    print_warning ".env.localファイルが見つかりません"
                    print_info "環境変数は手動で設定してください"
                fi
                
                # リンクが成功したらデプロイ
                echo ""
                print_info "デプロイを実行中..."
                deploy_to_vercel
                ;;
            3)
                # キャンセル
                print_warning "デプロイをキャンセルしました"
                echo ""
                echo "📝 設定を確認してください:"
                echo "   - setting.js の vercel.projectName"
                echo "   - または 'vercel link' を実行してプロジェクトを接続"
                echo ""
                return 1
                ;;
            *)
                print_error "無効な選択です"
                return 1
                ;;
        esac
    fi
}

# メイン処理
main() {
    # コマンドライン引数を処理
    local env_only=false
    local force_update=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --env-only)
                env_only=true
                shift
                ;;
            --force-env)
                force_update=true
                shift
                ;;
            --help|-h)
                echo "使用方法: $0 [オプション]"
                echo ""
                echo "オプション:"
                echo "  --env-only    環境変数の設定のみ実行（デプロイしない）"
                echo "  --force-env   既存の環境変数を強制的に更新"
                echo "  --help, -h    このヘルプを表示"
                echo ""
                echo "例:"
                echo "  $0              # 通常のデプロイ"
                echo "  $0 --env-only   # 環境変数のみ設定"
                echo "  $0 --force-env  # 環境変数を強制更新してデプロイ"
                exit 0
                ;;
            *)
                print_error "不明なオプション: $1"
                echo "使用方法: $0 [--env-only] [--force-env] [--help]"
                exit 1
                ;;
        esac
    done
    
    echo "🚀 Vercelへのデプロイを開始..."
    
    # スクリプトの位置からプロジェクトルートを特定
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local project_root="$(cd "${script_dir}/../.." && pwd)"
    local app_dir="${project_root}/app"
    
    # appディレクトリに移動
    cd "${app_dir}"
    
    # CLIチェック
    check_vercel_cli
    
    # 認証チェック
    check_vercel_auth
    
    # 環境変数のみ設定モード
    if [ "$env_only" = true ]; then
        print_info "環境変数の設定のみを実行します"
        
        # プロジェクトがリンクされているか確認
        if [ ! -f ".vercel/project.json" ]; then
            print_error "プロジェクトがリンクされていません"
            print_info "先に 'vercel link' を実行してプロジェクトをリンクしてください"
            exit 1
        fi
        
        setup_env_variables "" "$force_update"
        exit 0
    fi
    
    # デプロイ実行
    deploy_to_vercel
    
    # 終了コード
    exit $?
}

# スクリプト実行
main "$@"