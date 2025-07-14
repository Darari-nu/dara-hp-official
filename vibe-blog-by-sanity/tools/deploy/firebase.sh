#!/bin/bash

# Firebase Hosting deployment script

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

# Firebase CLIのチェック
check_firebase_cli() {
    if ! command -v firebase &> /dev/null; then
        print_error "Firebase CLIがインストールされていません"
        echo ""
        echo " ┌──────────────────────────────────────────────────────────────────────┐"
        echo " │                                                                      │"
        echo " │   📝 Firebaseアカウントをお持ちでない場合:                          │"
        echo " │   👉 https://firebase.google.com から無料で作成できます              │"
        echo " │   (Googleアカウントが必要です)                                      │"
        echo " │                                                                      │"
        echo " │   📦 CLIのインストール方法:                                          │"
        echo " │   npm install -g firebase-tools                                      │"
        echo " │                                                                      │"
        echo " │   または:                                                            │"
        echo " │   curl -sL https://firebase.tools | bash                            │"
        echo " │                                                                      │"
        echo " └──────────────────────────────────────────────────────────────────────┘"
        echo ""
        exit 1
    fi
}

# Firebase認証のチェック
check_firebase_auth() {
    if ! firebase projects:list &> /dev/null; then
        print_warning "Firebaseにログインしていません"
        echo "ログインを開始します..."
        firebase login
    fi
}

# 設定の変更をチェックして更新
update_firebase_config() {
    local project_id="$1"
    local site_name="$2"
    local need_update=false
    
    # .firebasercのプロジェクトIDをチェック
    if [ -f ".firebaserc" ]; then
        local current_project=$(grep -o '"default": "[^"]*"' .firebaserc | cut -d'"' -f4)
        if [ -n "$project_id" ] && [ "$current_project" != "$project_id" ]; then
            print_warning "プロジェクトIDが変更されました: $current_project → $project_id"
            # .firebasercを更新
            cat > .firebaserc <<EOF
{
  "projects": {
    "default": "$project_id"
  }
}
EOF
            print_success ".firebasercを更新しました"
            need_update=true
        fi
    fi
    
    # firebase.jsonのサイト名をチェック
    if [ -f "firebase.json" ] && [ -n "$site_name" ]; then
        local current_site=$(grep -o '"site": "[^"]*"' firebase.json | cut -d'"' -f4)
        if [ "$current_site" != "$site_name" ]; then
            print_warning "サイト名が変更されました: ${current_site:-未設定} → $site_name"
            
            # firebase.jsonを更新
            if [ -z "$current_site" ]; then
                # site設定がない場合は追加（"hosting": { の後に追加）
                sed -i.bak 's/"hosting": {/"hosting": {\n    "site": "'$site_name'",/' firebase.json
            else
                # site設定がある場合は更新
                sed -i.bak "s/\"site\": \"$current_site\"/\"site\": \"$site_name\"/" firebase.json
            fi
            # バックアップファイルを削除
            rm -f firebase.json.bak
            print_success "firebase.jsonを更新しました"
            need_update=true
            
            # 新しいサイトを作成する必要があるかチェック
            if ! firebase hosting:sites:list 2>/dev/null | grep -q "$site_name"; then
                print_info "新しいサイト '$site_name' を作成します..."
                firebase hosting:sites:create "$site_name" 2>&1 || {
                    local error_msg=$?
                    if [ $error_msg -eq 1 ]; then
                        print_warning "サイト '$site_name' は既に存在している可能性があります"
                        print_info "続行します..."
                    else
                        print_error "サイトの作成に失敗しました。別の名前を試してください。"
                        exit 1
                    fi
                }
            fi
        fi
    elif [ -f "firebase.json" ] && [ -n "$site_name" ]; then
        # firebase.jsonにsite設定がない場合
        local current_site=$(grep -o '"site": "[^"]*"' firebase.json | cut -d'"' -f4)
        if [ -z "$current_site" ]; then
            print_info "firebase.jsonにsite設定を追加します..."
            sed -i.bak 's/"hosting": {/"hosting": {\n    "site": "'$site_name'",/' firebase.json
            rm -f firebase.json.bak
            print_success "firebase.jsonを更新しました"
            need_update=true
            
            # 新しいサイトを作成する必要があるかチェック
            if ! firebase hosting:sites:list 2>/dev/null | grep -q "$site_name"; then
                print_info "新しいサイト '$site_name' を作成します..."
                firebase hosting:sites:create "$site_name" 2>&1 || {
                    local error_msg=$?
                    if [ $error_msg -eq 1 ]; then
                        print_warning "サイト '$site_name' は既に存在している可能性があります"
                        print_info "続行します..."
                    else
                        print_error "サイトの作成に失敗しました。別の名前を試してください。"
                        exit 1
                    fi
                }
            fi
        fi
    fi
    
    if [ "$need_update" = true ]; then
        echo ""
    fi
}

# Firebase初期化のチェックと実行
check_firebase_init() {
    local project_id="$1"
    local site_name="$2"
    
    if [ ! -f "firebase.json" ] || [ ! -f ".firebaserc" ]; then
        print_warning "Firebaseプロジェクトが初期化されていません"
        print_info "自動的に初期化を行います..."
        
        # firebase.jsonの作成
        if [ ! -f "firebase.json" ]; then
            local config_template=$(read_config "FIREBASE_CONFIG_TEMPLATE")
            local output_dir=$(read_config "OUTPUT_DIR")
            output_dir=${output_dir:-"public"}  # デフォルトはpublic
            
            if [ "$config_template" = "multi-site" ] && [ -n "$site_name" ]; then
                # マルチサイト構成（サイト名指定あり）
                cat > firebase.json <<EOF
{
  "hosting": {
    "site": "$site_name",
    "public": "$output_dir",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
EOF
            else
                # シングルサイト構成（デフォルト）
                cat > firebase.json <<EOF
{
  "hosting": {
    "public": "$output_dir",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
EOF
            fi
            print_success "firebase.jsonを作成しました"
        fi
        
        # .firebasercの作成（プロジェクトIDが指定されている場合）
        if [ ! -f ".firebaserc" ] && [ -n "$1" ]; then
            cat > .firebaserc <<EOF
{
  "projects": {
    "default": "$1"
  }
}
EOF
            print_success ".firebasercを作成しました"
        fi
    fi
}

# プロジェクトIDの確認と設定
setup_project() {
    local project_id="$1"
    
    # .firebaserc から現在のプロジェクトIDを取得
    if [ -f ".firebaserc" ]; then
        local current_project=$(grep -o '"default": "[^"]*"' .firebaserc | cut -d'"' -f4)
        if [ -n "$current_project" ] && [ "$current_project" != "$project_id" ]; then
            print_warning "現在のプロジェクト: $current_project"
            print_warning "設定されたプロジェクト: $project_id"
            read -p "プロジェクトを変更しますか? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                firebase use "$project_id" || {
                    print_error "プロジェクトの切り替えに失敗しました"
                    exit 1
                }
            fi
        fi
    else
        # 新規プロジェクトの場合
        print_info "Firebaseプロジェクトを設定中..."
        
        # まず.firebasercを作成
        if [ ! -f ".firebaserc" ]; then
            cat > .firebaserc <<EOF
{
  "projects": {
    "default": "$project_id"
  }
}
EOF
            print_success ".firebasercを作成しました"
        fi
        
        # プロジェクトが存在するか確認
        if firebase projects:list 2>/dev/null | grep -q "$project_id"; then
            print_success "プロジェクト '$project_id' を使用します"
            
            # サイト名が指定されている場合はサイトを作成
            if [ -n "$site_name" ] && ! firebase hosting:sites:list 2>/dev/null | grep -q "$site_name"; then
                print_info "サイト '$site_name' を作成します..."
                firebase hosting:sites:create "$site_name" || {
                    print_error "サイトの作成に失敗しました。別の名前を試してください。"
                    exit 1
                }
            fi
        else
            print_warning "プロジェクト '$project_id' が見つかりません"
            echo ""
            echo " ┌──────────────────────────────────────────────────────────────────────┐"
            echo " │                                                                      │"
            echo " │   📝 Firebaseプロジェクトを作成する必要があります                    │"
            echo " │                                                                      │"
            echo " │   1. 以下のURLにアクセスしてください:                                │"
            echo " │   https://console.firebase.google.com/project/create                │"
            echo " │                                                                      │"
            echo " │   2. プロジェクトID: $project_id"
            echo " │      として作成してください                                          │"
            echo " │                                                                      │"
            echo " │   3. プロジェクト作成後、このコマンドを再実行してください            │"
            echo " │                                                                      │"
            echo " └──────────────────────────────────────────────────────────────────────┘"
            echo ""
            read -p "Firebaseコンソールを開きますか? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                # ブラウザでFirebaseコンソールを開く
                if command -v open &> /dev/null; then
                    open "https://console.firebase.google.com/project/create"
                elif command -v xdg-open &> /dev/null; then
                    xdg-open "https://console.firebase.google.com/project/create"
                fi
            fi
            exit 0
        fi
    fi
}

# プロジェクトタイプの判定
detect_project_type() {
    # まず設定ファイルから読み込み
    local project_type=$(read_config "PROJECT_TYPE")
    
    if [ -n "$project_type" ]; then
        # 設定ファイルで明示的に指定されている場合
        case "$project_type" in
            "nextjs")
                # Next.jsの場合、動的か静的かを判定
                if [ -d "app/api" ] || [ -d "pages/api" ] || [ -d "src/app/api" ] || [ -d "src/pages/api" ]; then
                    echo "nextjs-dynamic"
                else
                    echo "nextjs-static"
                fi
                ;;
            "static")
                echo "static"
                ;;
            *)
                echo "$project_type"
                ;;
        esac
    else
        # 設定ファイルに指定がない場合は自動判定（後方互換性）
        if [ -f "next.config.js" ] || [ -f "next.config.ts" ]; then
            # Next.jsプロジェクト
            if [ -d "app/api" ] || [ -d "pages/api" ] || [ -d "src/app/api" ] || [ -d "src/pages/api" ]; then
                echo "nextjs-dynamic"
            else
                echo "nextjs-static"
            fi
        else
            echo "static"
        fi
    fi
}

# Firebase設定の更新（動的サイト用）
update_firebase_config_for_dynamic() {
    local site_name="$1"
    
    # firebase.jsonをNext.js動的サイト用に更新
    if [ -f "firebase.json" ]; then
        # 既存のfirebase.jsonをバックアップ
        cp firebase.json firebase.json.bak
        
        # 動的サイト用の設定を作成
        if [ -n "$site_name" ]; then
            cat > firebase.json <<EOF
{
  "hosting": {
    "site": "$site_name",
    "source": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "frameworksBackend": {
      "region": "asia-northeast1"
    }
  },
  "functions": [
    {
      "source": ".",
      "codebase": "default",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log"
      ]
    }
  ]
}
EOF
        else
            cat > firebase.json <<EOF
{
  "hosting": {
    "source": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "frameworksBackend": {
      "region": "asia-northeast1"
    }
  },
  "functions": [
    {
      "source": ".",
      "codebase": "default",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log"
      ]
    }
  ]
}
EOF
        fi
        print_success "firebase.jsonを動的サイト用に更新しました"
    fi
}

# デプロイの実行
deploy_to_firebase() {
    local site_name="$1"
    local project_type=$(detect_project_type)
    
    print_info "プロジェクトタイプ: $project_type"
    
    case $project_type in
        "nextjs-dynamic")
            print_info "Next.js動的サイトを検出しました（API routes/Server Components）"
            print_info "Firebase FunctionsとHostingを使用してデプロイします"
            
            # firebase.jsonを動的サイト用に更新
            update_firebase_config_for_dynamic "$site_name"
            
            # Firebase Functionsが有効化されているか確認
            print_info "Firebase Functionsの設定を確認中..."
            
            # Firebase Web Frameworksは自動的にFunctionsを設定するため、
            # 手動での初期化は不要
            print_info "Firebase Web Frameworksが自動的にFunctionsを設定します"
            
            # デプロイ実行（Firebase Web Frameworksを使用）
            print_info "Next.jsアプリケーションをデプロイ中..."
            print_info "初回デプロイには時間がかかる場合があります（5-10分）"
            echo ""
            
            # デプロイコマンドを表示
            print_info "実行コマンド: firebase deploy"
            
            # デプロイを実行して出力をキャプチャ
            local temp_log="/tmp/firebase_deploy_$$.log"
            firebase deploy 2>&1 | tee "$temp_log"
            local exit_code=${PIPESTATUS[0]}
            local deploy_output=$(cat "$temp_log")
            rm -f "$temp_log"
            
            # エラーの場合は詳細を表示
            if [ $exit_code -ne 0 ]; then
                
                # Blazeプランエラーのチェック
                if [[ "$deploy_output" == *"Blaze"* ]] || [[ "$deploy_output" == *"pay-as-you-go"* ]] || [[ "$deploy_output" == *"billing"* ]]; then
                    echo ""
                    echo ""
                    echo " ┌──────────────────────────────────────────────────────────────────────┐"
                    echo " │                                                                      │"
                    echo " │   💳 Firebase Blazeプランへのアップグレードが必要です               │"
                    echo " │                                                                      │"
                    echo " │   Next.jsのAPIルートを含む動的サイトのデプロイには                  │"
                    echo " │   Firebase Functionsが必要で、Blazeプランが必須です                  │"
                    echo " │                                                                      │"
                    echo " │   🌟 Blazeプランの特徴:                                             │"
                    echo " │   • 従量課金制（使った分だけ支払い）                                │"
                    echo " │   • 無料枠があるため、小規模利用では実質無料                        │"
                    echo " │   • Functions: 月200万回まで無料                                    │"
                    echo " │   • Hosting: 月間転送量10GBまで無料                                 │"
                    echo " │                                                                      │"
                    # プロジェクトIDを取得
                    local pid="$project_id"
                    if [ -z "$pid" ] && [ -f ".firebaserc" ]; then
                        pid=$(grep -o '"default": "[^"]*"' .firebaserc | cut -d'"' -f4)
                    fi
                    local upgrade_url="https://console.firebase.google.com/project/$pid/usage/details"
                    echo " │   🔗 アップグレードURL:                                              │"
                    printf " │   %-66s │\n" "$upgrade_url"
                    echo " │                                                                      │"
                    echo " │   📝 アップグレード手順:                                            │"
                    echo " │   1. 上記URLにアクセス                                              │"
                    echo " │   2. \"プランをアップグレード\"をクリック                             │"
                    echo " │   3. クレジットカード情報を入力                                     │"
                    echo " │   4. 完了後、もう一度 npm run deploy を実行                         │"
                    echo " │                                                                      │"
                    echo " └──────────────────────────────────────────────────────────────────────┘"
                    echo ""
                    
                    read -p "🌐 Firebaseコンソールを開きますか? (y/N): " -n 1 -r
                    echo
                    if [[ $REPLY =~ ^[Yy]$ ]]; then
                        if command -v open &> /dev/null; then
                            open "$upgrade_url"
                        elif command -v xdg-open &> /dev/null; then
                            xdg-open "$upgrade_url"
                        fi
                    fi
                else
                    echo ""
                    print_error "デプロイ中にエラーが発生しました (終了コード: $exit_code)"
                    
                    # よくあるエラーの確認
                    print_info "トラブルシューティング:"
                    print_info "1. Firebase Blazeプランが必要な場合があります"
                    print_info "2. firebase experiments:enable webframeworks が実行済みか確認"
                    print_info "3. Node.js 16, 18, 20のいずれかが必要です"
                    echo ""
                fi
                
                return $exit_code
            fi
            
            local deploy_output=""
            ;;
            
        "nextjs-static")
            print_info "Next.js静的サイトを検出しました"
            
            # ビルドとエクスポート
            local build_required=$(read_config "BUILD_REQUIRED")
            local build_command=$(read_config "BUILD_COMMAND")
            
            if [ "$build_required" = "true" ] && [ -f "package.json" ]; then
                print_info "プロジェクトをビルド中..."
                # ビルドコマンドを実行（デフォルトはnpm run build）
                ${build_command:-npm run build} || {
                    print_error "ビルドに失敗しました"
                    exit 1
                }
                
                # エクスポートコマンドが存在するかチェック
                if grep -q '"export"' "package.json"; then
                    print_info "静的ファイルをエクスポート中..."
                    npm run export || {
                        print_error "エクスポートに失敗しました"
                        exit 1
                    }
                fi
            fi
            
            # デプロイ実行
            print_info "静的サイトをデプロイ中..."
            if [ -n "$site_name" ]; then
                print_info "サイト: $site_name"
            fi
            echo ""
            
            # デプロイを実行して出力をキャプチャ
            local temp_log="/tmp/firebase_deploy_$$.log"
            firebase deploy --only hosting 2>&1 | tee "$temp_log"
            local exit_code=${PIPESTATUS[0]}
            local deploy_output=$(cat "$temp_log")
            rm -f "$temp_log"
            ;;
            
        "static")
            print_info "静的サイトを検出しました"
            
            # 通常の静的サイトの場合
            if [ ! -d "public" ]; then
                print_error "publicディレクトリが見つかりません"
                exit 1
            fi
            
            # デプロイ実行
            print_info "静的サイトをデプロイ中..."
            if [ -n "$site_name" ]; then
                print_info "サイト: $site_name"
            fi
            echo ""
            
            # デプロイを実行して出力をキャプチャ
            local temp_log="/tmp/firebase_deploy_$$.log"
            firebase deploy --only hosting 2>&1 | tee "$temp_log"
            local exit_code=${PIPESTATUS[0]}
            local deploy_output=$(cat "$temp_log")
            rm -f "$temp_log"
            ;;
    esac
    
    if [ $exit_code -eq 0 ]; then
        # デプロイ成功
        print_success "デプロイが正常に完了しました"
        
        # デプロイ結果からURLを抽出
        local deployed_url=$(echo "$deploy_output" | grep -E 'Hosting URL:|Function URL' | head -1 | sed 's/.*URL: //' | tr -d ' ')
        if [ -n "$deployed_url" ]; then
            echo ""
            print_info "デプロイされたURL: $deployed_url"
        fi
        
        # 動的サイトの場合は追加情報を表示
        if [ "$project_type" = "nextjs-dynamic" ]; then
            echo ""
            print_info "📝 注意事項:"
            print_info "- 初回アクセス時は Cold Start のため少し時間がかかります"
            print_info "- Firebase Functions のログは以下で確認できます:"
            print_info "  firebase functions:log"
        fi
    else
        print_error "デプロイに失敗しました"
        echo "$deploy_output"
        
        # エラーの詳細を表示
        if [[ "$deploy_output" == *"404"* ]] && [[ "$deploy_output" == *"Requested entity was not found"* ]]; then
            echo ""
            print_error "⚠️ Firebaseサイト '$site_name' が見つかりません"
            print_info "自動的にサイトを作成します..."
            
            # サイトを作成
            if firebase hosting:sites:create "$site_name" 2>&1; then
                print_success "サイト '$site_name' を作成しました"
                print_info "もう一度デプロイを実行しています..."
                
                # 再度デプロイを試みる
                local temp_log2="/tmp/firebase_deploy_retry_$$.log"
                firebase deploy --only hosting 2>&1 | tee "$temp_log2"
                local retry_exit_code=${PIPESTATUS[0]}
                local retry_output=$(cat "$temp_log2")
                rm -f "$temp_log2"
                
                if [ $retry_exit_code -eq 0 ]; then
                    print_success "デプロイが正常に完了しました"
                    # デプロイ結果からURLを抽出
                    local deployed_url=$(echo "$retry_output" | grep -E 'Hosting URL:|Function URL' | head -1 | sed 's/.*URL: //' | tr -d ' ')
                    if [ -n "$deployed_url" ]; then
                        echo ""
                        print_info "デプロイされたURL: $deployed_url"
                    fi
                    return 0
                else
                    print_error "再デプロイにも失敗しました"
                    echo "$retry_output"
                fi
            else
                print_error "サイトの作成に失敗しました"
                print_info "Firebaseコンソールから手動でサイトを作成してください"
                print_info "サイト名: $site_name"
            fi
        elif [[ "$deploy_output" == *"billing account"* ]] || [[ "$deploy_output" == *"Blaze"* ]] || [[ "$deploy_output" == *"pay-as-you-go"* ]]; then
            echo ""
            echo " ┌──────────────────────────────────────────────────────────────────────┐"
            echo " │                                                                      │"
            echo " │   💳 Firebase Blazeプランへのアップグレードが必要です               │"
            echo " │                                                                      │"
            echo " │   Next.jsのAPIルートを含む動的サイトのデプロイには                │"
            echo " │   Firebase Functionsが必要で、Blazeプランが必須です              │"
            echo " │                                                                      │"
            echo " │   🌟 Blazeプランの特徴:                                             │"
            echo " │   • 従量課金制（使った分だけ支払い）                              │"
            echo " │   • 無料枠があるため、小規模利用では実質無料                    │"
            echo " │   • Functions: 月200万回まで無料                                  │"
            echo " │   • Hosting: 月間転送量10GBまで無料                               │"
            echo " │                                                                      │"
            echo " │   🔗 アップグレードURL:                                               │"
            local upgrade_url=""
            if [ -n "$project_id" ]; then
                upgrade_url="https://console.firebase.google.com/project/$project_id/usage/details"
            else
                upgrade_url="https://console.firebase.google.com"
            fi
            echo " │   $upgrade_url"
            echo " │                                                                      │"
            echo " │   📝 アップグレード手順:                                              │"
            echo " │   1. 上記URLにアクセス                                               │"
            echo " │   2. \"プランをアップグレード\"をクリック                               │"
            echo " │   3. クレジットカード情報を入力                                      │"
            echo " │   4. 完了後、もう一度 npm run deploy を実行                        │"
            echo " │                                                                      │"
            echo " └──────────────────────────────────────────────────────────────────────┘"
            echo ""
            
            read -p "🌐 Firebaseコンソールを開きますか? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                # ブラウザでFirebaseコンソールを開く
                if command -v open &> /dev/null; then
                    open "$upgrade_url"
                elif command -v xdg-open &> /dev/null; then
                    xdg-open "$upgrade_url"
                fi
            fi
        elif [[ "$deploy_output" == *"Node version"* ]] || [[ "$deploy_output" == *"expects Node"* ]]; then
            echo ""
            print_error "⚠️ Node.jsのバージョンに問題があります"
            print_info "Firebase FunctionsはNode.js 16, 18, 20をサポートしています"
            print_info "現在のNode.jsバージョン: $(node -v)"
            print_info "nvmやnなどを使用してNode.js 18をインストールしてください"
        fi
        
        exit 1
    fi
}

# メイン処理
main() {
    # 設定ファイルから読み込み
    local project_id=$(read_config "FIREBASE_PROJECT_ID")
    local site_name=$(read_config "FIREBASE_SITE")
    
    # 引数が渡された場合は上書き（後方互換性）
    project_id="${1:-$project_id}"
    site_name="${2:-$site_name}"
    
    echo "🚀 Firebaseへのデプロイを開始..."
    
    # CLIチェック
    check_firebase_cli
    
    # 認証チェック
    check_firebase_auth
    
    # Firebase初期化チェック
    # 現在のディレクトリ（appディレクトリ）で実行
    
    check_firebase_init "$project_id" "$site_name"
    
    # 設定の変更をチェックして更新
    update_firebase_config "$project_id" "$site_name"
    
    # プロジェクト設定
    if [ -n "$project_id" ]; then
        setup_project "$project_id"
    else
        # プロジェクトIDが指定されていない場合は現在の設定を使用
        if [ ! -f ".firebaserc" ]; then
            print_error "プロジェクトIDが設定されていません"
            echo ""
            echo " ┌──────────────────────────────────────────────────────────────────────┐"
            echo " │                                                                      │"
            echo " │   📝 以下のいずれかの方法で設定してください:                         │"
            echo " │                                                                      │"
            echo " │   1. config/deploy.conf で FIREBASE_PROJECT_ID を設定         │"
            echo " │   2. このコマンドを再実行してください                                │"
            echo " │                                                                      │"
            echo " └──────────────────────────────────────────────────────────────────────┘"
            echo ""
            exit 1
        fi
    fi
    
    # デプロイ
    deploy_to_firebase "$site_name"
    
    # プロジェクトタイプを取得
    local project_type=$(detect_project_type)
    
    # ホスティングURLを表示
    local hosting_url=""
    local firebase_url=""
    
    # プロジェクトIDを取得
    if [ -z "$project_id" ] && [ -f ".firebaserc" ]; then
        project_id=$(grep -o '"default": "[^"]*"' .firebaserc | cut -d'"' -f4)
    fi
    
    # サイト名がある場合はそれを使用
    if [ -f "firebase.json" ]; then
        local site=$(grep -o '"site": "[^"]*"' firebase.json | cut -d'"' -f4)
        if [ -n "$site" ]; then
            hosting_url="https://${site}.web.app"
            firebase_url="https://${site}.firebaseapp.com"
        fi
    fi
    
    # サイト名がパラメータで指定されている場合
    if [ -z "$hosting_url" ] && [ -n "$site_name" ]; then
        hosting_url="https://${site_name}.web.app"
        firebase_url="https://${site_name}.firebaseapp.com"
    fi
    
    # サイト名がない場合はプロジェクトIDを使用
    if [ -z "$hosting_url" ] && [ -n "$project_id" ]; then
        hosting_url="https://${project_id}.web.app"
        firebase_url="https://${project_id}.firebaseapp.com"
    fi
    
    # 成功メッセージを表示
    if [ -n "$hosting_url" ]; then
        echo ""
        echo " ┌──────────────────────────────────────────────────────────────────────┐"
        echo " │                                                                      │"
        echo " │   ✅ デプロイが完了しました！                                        │"
        echo " │                                                                      │"
        
        if [ "$project_type" = "nextjs-dynamic" ]; then
            echo " │   🚀 Next.js with API Routes on Firebase Functions                  │"
            echo " │                                                                      │"
        fi
        
        echo " │   Hosting URL:                                                       │"
        echo " │   $hosting_url"
        echo " │                                                                      │"
        echo " │   Alternative URL:                                                   │"
        echo " │   $firebase_url"
        echo " │                                                                      │"
        echo " │   Console:                                                           │"
        echo " │   https://console.firebase.google.com/project/$project_id/hosting"
        echo " │                                                                      │"
        
        if [ "$project_type" = "nextjs-dynamic" ]; then
            echo " │   Functions Console:                                                 │"
            echo " │   https://console.firebase.google.com/project/$project_id/functions"
            echo " │                                                                      │"
            echo " │   💡 ヒント:                                                         │"
            echo " │   - 初回アクセスは少し時間がかかります (Cold Start)                │"
            echo " │   - ログ確認: firebase functions:log                                │"
            echo " │                                                                      │"
        fi
        
        echo " └──────────────────────────────────────────────────────────────────────┘"
        echo ""
    else
        print_success "デプロイが完了しました！"
        print_warning "ホスティングURLの取得に失敗しました。Firebaseコンソールで確認してください。"
    fi
}

# スクリプト実行
main "$@"