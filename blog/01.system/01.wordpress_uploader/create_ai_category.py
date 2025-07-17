#!/usr/bin/env python3
"""
AI関連カテゴリを作成するスクリプト
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

def create_category(name, slug, config):
    api_base = f"{config['wordpress']['site_url']}{config['wordpress']['api_endpoint']}"
    headers = create_auth_header(config)
    
    category_data = {
        'name': name,
        'slug': slug
    }
    
    response = requests.post(f"{api_base}/categories", json=category_data, headers=headers)
    
    if response.status_code == 201:
        category = response.json()
        print(f"✅ カテゴリを作成しました: {category['name']} (ID: {category['id']})")
        return category['id']
    else:
        print(f"❌ カテゴリ作成に失敗: {response.status_code} - {response.text}")
        return None

def update_post_category(post_id, category_id, config):
    api_base = f"{config['wordpress']['site_url']}{config['wordpress']['api_endpoint']}"
    headers = create_auth_header(config)
    
    response = requests.post(
        f"{api_base}/posts/{post_id}",
        json={'categories': [category_id]},
        headers=headers
    )
    
    if response.status_code == 200:
        print(f"✅ 記事ID {post_id} のカテゴリを更新しました")
        return True
    else:
        print(f"❌ カテゴリ更新に失敗: {response.status_code}")
        return False

if __name__ == "__main__":
    config = load_config()
    
    # AI業界動向カテゴリを作成
    print("AI業界動向カテゴリを作成...")
    ai_category_id = create_category("AI業界動向", "ai-industry-trends", config)
    
    if ai_category_id:
        # 記事のカテゴリを更新
        print(f"\n記事のカテゴリをID {ai_category_id} に変更...")
        update_post_category(3441, ai_category_id, config)
        update_post_category(3443, ai_category_id, config)
        
        print(f"\n📝 設定ファイルのカテゴリマッピングを更新してください:")
        print(f"category_mapping:")
        print(f"  44: {ai_category_id}  # AI業界動向")
    else:
        print("❌ カテゴリ作成に失敗したため、記事の更新をスキップします")