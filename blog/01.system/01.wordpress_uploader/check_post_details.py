#!/usr/bin/env python3
"""
WordPress投稿の詳細を確認するスクリプト
"""

import os
import yaml
import requests
import base64
from pathlib import Path
from dotenv import load_dotenv

def load_config():
    load_dotenv()
    config_path = Path(__file__).parent.parent.parent / ".windsurf" / "config" / "wordpress-config.yaml"
    with open(config_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def create_auth_header(config):
    username = config['wordpress']['username']
    password = os.getenv('WP_APP_PASS')
    credentials = f"{username}:{password}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    return {
        'Authorization': f'Basic {encoded_credentials}',
        'Content-Type': 'application/json'
    }

def check_post(post_id, config):
    api_base = f"{config['wordpress']['site_url']}{config['wordpress']['api_endpoint']}"
    headers = create_auth_header(config)
    
    response = requests.get(f"{api_base}/posts/{post_id}", headers=headers)
    if response.status_code != 200:
        print(f"❌ 投稿の取得に失敗: {response.status_code}")
        return
    
    post_data = response.json()
    
    print(f"📝 タイトル: {post_data['title']['rendered']}")
    print(f"🔗 スラッグ: {post_data['slug']}")
    print(f"🌐 URL: {post_data['link']}")
    print(f"📂 カテゴリID: {post_data['categories']}")
    print(f"🏷️ タグID: {post_data['tags']}")
    print(f"📊 ステータス: {post_data['status']}")
    
    # コンテンツの冒頭をチェック
    content = post_data['content']['rendered']
    lines = content.split('\n')[:5]
    print("\n📄 コンテンツ冒頭:")
    for i, line in enumerate(lines):
        print(f"  {i+1}: {line[:100]}...")

if __name__ == "__main__":
    config = load_config()
    print("=== 記事ID 3441の詳細 ===")
    check_post(3441, config)