#!/usr/bin/env python3
"""
既存のWordPress投稿を修正するスクリプト
"""

import os
import sys
import yaml
import requests
import base64
import re
from pathlib import Path
from dotenv import load_dotenv

def load_config():
    """設定を読み込み"""
    load_dotenv()
    config_path = Path(__file__).parent.parent.parent / ".windsurf" / "config" / "wordpress-config.yaml"
    with open(config_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def create_auth_header(config):
    """認証ヘッダーを作成"""
    username = config['wordpress']['username']
    password = os.getenv('WP_APP_PASS')
    credentials = f"{username}:{password}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    return {
        'Authorization': f'Basic {encoded_credentials}',
        'Content-Type': 'application/json'
    }

def fix_content_quotes(content):
    """コンテンツから引用符を修正"""
    # 引用ブロックの処理
    content = re.sub(r'<p>&gt; (.+?)</p>', r'<p>\1</p>', content)
    content = re.sub(r'&gt; (.+)', r'\1', content)
    content = re.sub(r'&gt;<br />', r'', content)  # 空の引用行を削除
    content = re.sub(r'&gt;\n', r'', content)  # 改行付き引用行を削除
    return content

def update_post(post_id, config, new_slug=None, fix_quotes=True):
    """投稿を更新"""
    api_base = f"{config['wordpress']['site_url']}{config['wordpress']['api_endpoint']}"
    headers = create_auth_header(config)
    
    # 現在の投稿を取得
    response = requests.get(f"{api_base}/posts/{post_id}", headers=headers)
    if response.status_code != 200:
        print(f"❌ 投稿の取得に失敗: {response.status_code}")
        return False
    
    post_data = response.json()
    print(f"📝 現在の投稿: {post_data['title']['rendered']}")
    
    # 更新データを準備
    update_data = {}
    
    # スラッグの修正
    if new_slug:
        update_data['slug'] = new_slug
        print(f"🔗 新しいスラッグ: {new_slug}")
    
    # 引用符の修正
    if fix_quotes:
        original_content = post_data['content']['rendered']
        fixed_content = fix_content_quotes(original_content)
        if original_content != fixed_content:
            update_data['content'] = fixed_content
            print("✏️ 引用符を修正しました")
    
    # カテゴリの確認・修正（必ず修正）
    if 1 in post_data.get('categories', []):  # 未分類カテゴリが含まれている場合
        update_data['categories'] = [44]  # AI業界動向に変更
        print("📂 カテゴリを'AI業界動向'に修正しました")
    
    if not update_data:
        print("✅ 修正の必要はありません")
        return True
    
    # 投稿を更新
    response = requests.post(f"{api_base}/posts/{post_id}", json=update_data, headers=headers)
    if response.status_code == 200:
        updated_post = response.json()
        print(f"✅ 投稿を更新しました: {updated_post['link']}")
        return True
    else:
        print(f"❌ 更新に失敗: {response.status_code} - {response.text}")
        return False

def main():
    config = load_config()
    
    # 最初の記事を修正
    print("=== 記事ID 3441の修正 ===")
    update_post(3441, config, new_slug="ai-dounyuu-jyoukyou-2024", fix_quotes=True)
    
    print("\n=== 記事ID 3443の修正 ===")
    update_post(3443, config, new_slug="test-article", fix_quotes=True)

if __name__ == "__main__":
    main()