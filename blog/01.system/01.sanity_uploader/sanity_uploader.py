#!/usr/bin/env python3
"""
Sanity CMS自動投稿システム
使用方法: python 01.system/01.sanity_uploader/sanity_uploader.py --file "filename.md"
"""

import os
import sys
import yaml
import requests
import json
import argparse
import re
import shutil
import logging
import mimetypes
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from dotenv import load_dotenv
from PIL import Image
import io

class SanityUploader:
    def __init__(self, config_path: str = None):
        # 環境変数を読み込み
        load_dotenv()
        
        # 設定ファイルを読み込み
        if config_path is None:
            config_path = Path(__file__).parent.parent.parent / ".windsurf" / "config" / "sanity-config.yaml"
        
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                self.config = yaml.safe_load(f)
        except FileNotFoundError:
            # デフォルト設定を使用
            self.config = self.get_default_config()
        
        # ログ設定
        self.setup_logging()
        
        # Sanity API設定
        self.project_id = self.config['sanity']['project_id']
        self.dataset = self.config['sanity']['dataset']
        self.token = os.getenv('SANITY_TOKEN')
        self.api_base = f"https://{self.project_id}.api.sanity.io"
        
        if not self.token:
            raise ValueError("SANITY_TOKEN環境変数が設定されていません")
        
        # ディレクトリ設定
        self.source_dir = Path(self.config['upload']['source_dir'])
        self.backup_dir = Path(self.config['upload']['backup_dir'])
        
        # バックアップディレクトリを作成
        self.backup_dir.mkdir(exist_ok=True)
        
        # 画像ディレクトリ設定
        self.image_dir = Path(self.config['upload']['image_dir'])
    
    def get_default_config(self) -> Dict:
        """デフォルト設定を返す"""
        return {
            'sanity': {
                'project_id': '9kqjddwl',
                'dataset': 'production'
            },
            'upload': {
                'source_dir': '03.data/04.Wordpress',
                'backup_dir': '03.data/04.Wordpress/uploaded',
                'image_dir': '03.data/XX.image'
            },
            'logging': {
                'level': 'INFO',
                'file': '01.system/01.sanity_uploader/logs/sanity_upload.log'
            }
        }
    
    def setup_logging(self):
        """ログ設定を初期化"""
        log_dir = Path(self.config['logging']['file']).parent
        log_dir.mkdir(parents=True, exist_ok=True)
        
        logging.basicConfig(
            level=getattr(logging, self.config['logging']['level']),
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(self.config['logging']['file'], encoding='utf-8'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def parse_markdown(self, content: str) -> Tuple[Dict, str]:
        """Markdownファイルからメタデータと本文を解析"""
        if content.startswith('---'):
            # YAMLフロントマターがある場合
            parts = content.split('---', 2)
            if len(parts) >= 3:
                try:
                    metadata = yaml.safe_load(parts[1])
                    article_content = parts[2].strip()
                    return metadata or {}, article_content
                except yaml.YAMLError:
                    pass
        
        # フロントマターがない場合、最初の行をタイトルとして使用
        lines = content.split('\n')
        title = lines[0].strip('# ').strip()
        metadata = {'title': title}
        
        # 本文は2行目以降（空行をスキップ）
        article_start = 1
        while article_start < len(lines) and not lines[article_start].strip():
            article_start += 1
        
        if article_start < len(lines):
            article_content = '\n'.join(lines[article_start:]).strip()
        else:
            article_content = content.strip()
        
        return metadata, article_content
    
    def create_auth_header(self) -> Dict[str, str]:
        """Sanity API用の認証ヘッダーを作成"""
        return {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
    
    def get_or_create_author(self, author_name: str) -> Optional[str]:
        """著者を取得または作成してIDを返す"""
        headers = self.create_auth_header()
        
        try:
            # 既存の著者を検索
            query = f'*[_type == "author" && name == "{author_name}"]'
            search_response = requests.get(
                f"{self.api_base}/v2022-11-17/data/query/{self.dataset}",
                params={'query': query},
                headers=headers,
                timeout=10
            )
            
            if search_response.status_code == 200:
                existing_authors = search_response.json()['result']
                if existing_authors:
                    return existing_authors[0]['_id']
            
            # 著者が存在しない場合は作成
            author_data = {
                '_type': 'author',
                'name': author_name,
                'bio': f'{author_name}の投稿です。',
                'emoji': '👤'
            }
            
            create_response = requests.post(
                f"{self.api_base}/v2022-11-17/data/mutate/{self.dataset}",
                json={'mutations': [{'create': author_data}]},
                headers=headers,
                timeout=10
            )
            
            if create_response.status_code == 200:
                result = create_response.json()
                if 'results' in result and result['results']:
                    author_id = result['results'][0]['id']
                    self.logger.info(f"新しい著者を作成: {author_name} (ID: {author_id})")
                    return author_id
                    
        except Exception as e:
            self.logger.error(f"著者の作成中にエラーが発生: {str(e)}")
        
        return None
    
    def get_or_create_category(self, category_name: str) -> Optional[str]:
        """カテゴリを取得または作成してIDを返す"""
        headers = self.create_auth_header()
        
        try:
            # 既存のカテゴリを検索
            query = f'*[_type == "category" && title == "{category_name}"]'
            search_response = requests.get(
                f"{self.api_base}/v2022-11-17/data/query/{self.dataset}",
                params={'query': query},
                headers=headers,
                timeout=10
            )
            
            if search_response.status_code == 200:
                existing_categories = search_response.json()['result']
                if existing_categories:
                    return existing_categories[0]['_id']
            
            # カテゴリが存在しない場合は作成
            category_data = {
                '_type': 'category',
                'title': category_name,
                'description': f'{category_name}に関する記事です。',
                'slug': {'_type': 'slug', 'current': category_name.lower().replace(' ', '-')}
            }
            
            create_response = requests.post(
                f"{self.api_base}/v2022-11-17/data/mutate/{self.dataset}",
                json={'mutations': [{'create': category_data}]},
                headers=headers,
                timeout=10
            )
            
            if create_response.status_code == 200:
                result = create_response.json()
                if 'results' in result and result['results']:
                    category_id = result['results'][0]['id']
                    self.logger.info(f"新しいカテゴリを作成: {category_name} (ID: {category_id})")
                    return category_id
                    
        except Exception as e:
            self.logger.error(f"カテゴリの作成中にエラーが発生: {str(e)}")
        
        return None
    
    def convert_markdown_to_portable_text(self, markdown_content: str) -> List[Dict]:
        """MarkdownをPortable Textに変換"""
        # 簡単なMarkdown→Portable Text変換
        # より高度な変換が必要な場合は、専用ライブラリを使用
        
        blocks = []
        lines = markdown_content.split('\n')
        current_block = []
        
        for line in lines:
            if line.strip() == '':
                if current_block:
                    blocks.append({
                        '_type': 'block',
                        'style': 'normal',
                        'children': [{'_type': 'span', 'text': '\n'.join(current_block)}]
                    })
                    current_block = []
            else:
                current_block.append(line)
        
        if current_block:
            blocks.append({
                '_type': 'block',
                'style': 'normal',
                'children': [{'_type': 'span', 'text': '\n'.join(current_block)}]
            })
        
        return blocks
    
    def upload_post(self, file_path: str, category_override: str = None) -> bool:
        """記事をSanityにアップロード"""
        try:
            # ファイルを読み込み
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # メタデータと本文を解析
            metadata, article_content = self.parse_markdown(content)
            
            # 必須フィールドの確認
            title = metadata.get('title', Path(file_path).stem)
            author_name = metadata.get('author', 'だらリーヌ')
            category_name = category_override or metadata.get('category', 'AI規制')
            
            # スラッグ生成
            slug = metadata.get('slug', re.sub(r'[^a-zA-Z0-9-]', '-', title.lower()))
            
            # 著者とカテゴリの取得/作成
            author_id = self.get_or_create_author(author_name)
            category_id = self.get_or_create_category(category_name)
            
            # Portable Textに変換
            body_blocks = self.convert_markdown_to_portable_text(article_content)
            
            # 投稿データを作成
            post_data = {
                '_type': 'blogPost',
                'title': title,
                'slug': {'_type': 'slug', 'current': slug},
                'author': {'_type': 'reference', '_ref': author_id} if author_id else None,
                'categories': [{'_type': 'reference', '_ref': category_id}] if category_id else [],
                'publishedAt': datetime.now().isoformat(),
                'summary': metadata.get('summary', title),
                'body': body_blocks
            }
            
            # 投稿を作成
            headers = self.create_auth_header()
            response = requests.post(
                f"{self.api_base}/v2022-11-17/data/mutate/{self.dataset}",
                json={'mutations': [{'create': post_data}]},
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                if 'results' in result and result['results']:
                    post_id = result['results'][0]['id']
                    self.logger.info(f"記事を正常にアップロード: {title} (ID: {post_id})")
                    
                    # ファイルをバックアップディレクトリに移動
                    backup_path = self.backup_dir / Path(file_path).name
                    shutil.move(file_path, backup_path)
                    self.logger.info(f"ファイルをバックアップ: {backup_path}")
                    
                    return True
                else:
                    self.logger.error(f"投稿の作成に失敗: レスポンスにresultsが含まれていません")
            else:
                self.logger.error(f"投稿の作成に失敗: {response.status_code} - {response.text}")
            
        except Exception as e:
            self.logger.error(f"記事のアップロード中にエラーが発生: {str(e)}")
        
        return False
    
    def upload_multiple_posts(self, directory: str = None) -> int:
        """指定されたディレクトリの全てのMarkdownファイルをアップロード"""
        if directory is None:
            directory = self.source_dir
        
        directory = Path(directory)
        if not directory.exists():
            self.logger.error(f"ディレクトリが見つかりません: {directory}")
            return 0
        
        markdown_files = list(directory.glob("*.md"))
        if not markdown_files:
            self.logger.info("アップロードするMarkdownファイルが見つかりません")
            return 0
        
        uploaded_count = 0
        for file_path in markdown_files:
            self.logger.info(f"アップロード中: {file_path.name}")
            if self.upload_post(str(file_path)):
                uploaded_count += 1
        
        self.logger.info(f"アップロード完了: {uploaded_count}/{len(markdown_files)} ファイル")
        return uploaded_count

def main():
    parser = argparse.ArgumentParser(description='Sanity CMS自動投稿システム')
    parser.add_argument('--file', type=str, help='アップロードするMarkdownファイルのパス')
    parser.add_argument('--directory', type=str, help='アップロードするディレクトリのパス')
    parser.add_argument('--category', type=str, help='カテゴリを上書き')
    parser.add_argument('--config', type=str, help='設定ファイルのパス')
    
    args = parser.parse_args()
    
    try:
        uploader = SanityUploader(args.config)
        
        if args.file:
            # 単一ファイルのアップロード
            if uploader.upload_post(args.file, args.category):
                print(f"✅ 記事のアップロードが完了しました: {args.file}")
            else:
                print(f"❌ 記事のアップロードに失敗しました: {args.file}")
                sys.exit(1)
        elif args.directory:
            # ディレクトリ内の全ファイルをアップロード
            uploaded_count = uploader.upload_multiple_posts(args.directory)
            print(f"✅ {uploaded_count} 件の記事をアップロードしました")
        else:
            # デフォルトディレクトリをアップロード
            uploaded_count = uploader.upload_multiple_posts()
            print(f"✅ {uploaded_count} 件の記事をアップロードしました")
            
    except Exception as e:
        print(f"❌ エラーが発生しました: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()