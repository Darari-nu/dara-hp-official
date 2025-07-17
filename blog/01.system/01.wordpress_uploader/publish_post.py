#!/usr/bin/env python3
"""
WordPressの投稿を公開するスクリプト
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

def publish_post(post_id, config):
    api_base = f"{config['wordpress']['site_url']}{config['wordpress']['api_endpoint']}"
    headers = create_auth_header(config)
    
    response = requests.post(
        f"{api_base}/posts/{post_id}",
        json={'status': 'publish'},
        headers=headers
    )
    
    if response.status_code == 200:
        post_data = response.json()
        print(f"✅ 投稿を公開しました: {post_data['link']}")
        return post_data['link']
    else:
        print(f"❌ 公開に失敗: {response.status_code}")
        return None

if __name__ == "__main__":
    config = load_config()
    
    # 記事を公開
    print("記事ID 3441を公開します...")
    link = publish_post(3441, config)
    if link:
        print(f"📝 公開URL: {link}")