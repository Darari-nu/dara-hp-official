#!/bin/bash

# config/deploy.confファイルから環境変数を読み込む関数
load_env_file() {
    local env_file="${1:-tools/config/deploy.conf}"
    
    # スクリプトの位置からプロジェクトルートを特定
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local project_root="$(cd "${script_dir}/../.." && pwd)"
    local env_path="${project_root}/${env_file}"
    
    if [ ! -f "$env_path" ]; then
        return 1
    fi
    
    # .envファイルを読み込み、環境変数をエクスポート
    while IFS='=' read -r key value || [ -n "$key" ]; do
        # コメント行と空行をスキップ
        if [[ "$key" =~ ^#.*$ ]] || [ -z "$key" ]; then
            continue
        fi
        
        # 前後の空白を削除
        key=$(echo "$key" | xargs)
        value=$(echo "$value" | xargs)
        
        # クォートを削除
        value=$(echo "$value" | sed 's/^["'\'']//;s/["'\'']$//')
        
        # 環境変数としてエクスポート
        export "$key=$value"
    done < "$env_path"
    
    return 0
}

# config/deploy.confを読み込み済みかどうかのフラグ
_ENV_LOADED=false

# 設定値を読み込む関数
read_config() {
    local key=$1
    
    # まだ読み込んでいない場合は読み込む
    if [ "$_ENV_LOADED" != "true" ]; then
        if load_env_file; then
            _ENV_LOADED=true
        else
            echo ""
            return
        fi
    fi
    
    # 環境変数名に変換（例: deploy.provider -> DEPLOY_PROVIDER）
    local env_key=$(echo "$key" | tr '.' '_' | tr '[:lower:]' '[:upper:]')
    
    # 環境変数の値を返す
    echo "${!env_key}"
}

# スクリプトが読み込まれた時点で自動的にconfig/deploy.confを読み込む
if [ "$_ENV_LOADED" != "true" ]; then
    load_env_file > /dev/null 2>&1 && _ENV_LOADED=true
fi