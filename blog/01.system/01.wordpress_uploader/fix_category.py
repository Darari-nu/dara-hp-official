#!/usr/bin/env python3
"""
WordPressのカテゴリを修正するスクリプト
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

def set_category(post_id, category_id, config):
    api_base = f"{config['wordpress']['site_url']}{config['wordpress']['api_endpoint']}"
    headers = create_auth_header(config)
    
    response = requests.post(
        f"{api_base}/posts/{post_id}",
        json={'categories': [category_id]},
        headers=headers
    )
    
    if response.status_code == 200:
        post_data = response.json()
        print(f"✅ カテゴリを設定しました: {post_data['categories']}")
        return True
    else:
        print(f"❌ カテゴリ設定に失敗: {response.status_code} - {response.text}")
        return False

if __name__ == "__main__":
    config = load_config()
    
    print("記事ID 3441のカテゴリを設定...")
    set_category(3441, 12, config)  # ブログカテゴリ
    
    print("記事ID 3443のカテゴリを設定...")
    set_category(3443, 12, config)  # ブログカテゴリ