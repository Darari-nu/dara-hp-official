#!/usr/bin/env python3
"""
WordPressのカテゴリ一覧を取得するスクリプト
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

def get_categories(config):
    api_base = f"{config['wordpress']['site_url']}{config['wordpress']['api_endpoint']}"
    headers = create_auth_header(config)
    
    response = requests.get(f"{api_base}/categories", headers=headers)
    
    if response.status_code == 200:
        categories = response.json()
        print("📂 利用可能なカテゴリ:")
        for cat in categories:
            print(f"  ID: {cat['id']} - 名前: {cat['name']} - スラッグ: {cat['slug']}")
        return categories
    else:
        print(f"❌ カテゴリ取得に失敗: {response.status_code}")
        return []

if __name__ == "__main__":
    config = load_config()
    get_categories(config)