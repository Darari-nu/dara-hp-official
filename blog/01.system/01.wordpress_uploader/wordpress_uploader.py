#!/usr/bin/env python3
"""
WordPress自動投稿システム
使用方法: python 01.system/01.wordpress_uploader/wordpress_uploader.py --file "filename.md"
"""

import os
import sys
import yaml
import requests
import base64
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

class WordPressUploader:
    def __init__(self, config_path: str = None):
        # 環境変数を読み込み
        load_dotenv()
        
        # 設定ファイルを読み込み
        if config_path is None:
            config_path = Path(__file__).parent.parent.parent / ".windsurf" / "config" / "wordpress-config.yaml"
        
        with open(config_path, 'r', encoding='utf-8') as f:
            self.config = yaml.safe_load(f)
        
        # ログ設定
        self.setup_logging()
        
        # WordPress API設定
        self.wp_url = self.config['wordpress']['site_url']
        self.wp_username = self.config['wordpress']['username']
        self.wp_password = os.getenv('WP_APP_PASS')
        self.api_base = f"{self.wp_url}{self.config['wordpress']['api_endpoint']}"
        
        if not self.wp_password:
            raise ValueError("WP_APP_PASS環境変数が設定されていません")
        
        # ディレクトリ設定
        self.source_dir = Path(self.config['upload']['source_dir'])
        self.backup_dir = Path(self.config['upload']['backup_dir'])
        self.backup_dir.mkdir(exist_ok=True)
        
        # ログディレクトリ作成
        log_dir = Path(self.config['logging']['file']).parent
        log_dir.mkdir(parents=True, exist_ok=True)
    
    def setup_logging(self):
        """ログ設定"""
        log_level = getattr(logging, self.config['logging']['level'])
        logging.basicConfig(
            level=log_level,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(self.config['logging']['file'], encoding='utf-8'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def parse_markdown_file(self, file_path: Path) -> Tuple[Dict, str]:
        """Markdownファイルからメタデータと本文を抽出"""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # YAMLフロントマターを抽出
        yaml_pattern = r'---\n(.*?)\n---'
        yaml_match = re.search(yaml_pattern, content, re.DOTALL)
        
        if not yaml_match:
            raise ValueError(f"YAMLフロントマターが見つかりません: {file_path}")
        
        yaml_content = yaml_match.group(1)
        metadata = yaml.safe_load(yaml_content)
        
        # ファイル名をメタデータに追加
        metadata['filename'] = file_path.name
        
        # 記事本文を抽出（=== 記事本文 (ここから) === 以降）
        article_start = content.find('# =================================================\n#  記事本文 (ここから)\n# =================================================')
        article_end = content.find('# =================================================\n#  記事本文 (ここまで)\n# =================================================')
        
        if article_start == -1:
            raise ValueError(f"記事本文の開始マーカーが見つかりません: {file_path}")
        
        # 記事本文を抽出
        article_start += len('# =================================================\n#  記事本文 (ここから)\n# =================================================\n')
        if article_end != -1:
            article_content = content[article_start:article_end].strip()
        else:
            article_content = content[article_start:].strip()
        
        return metadata, article_content
    
    def create_auth_header(self) -> Dict[str, str]:
        """WordPress REST API用の認証ヘッダーを作成"""
        credentials = f"{self.wp_username}:{self.wp_password}"
        encoded_credentials = base64.b64encode(credentials.encode()).decode()
        return {
            'Authorization': f'Basic {encoded_credentials}',
            'Content-Type': 'application/json'
        }
    
    def get_or_create_tags(self, tag_names: List[str]) -> List[int]:
        """タグを取得または作成してIDを返す"""
        tag_ids = []
        headers = self.create_auth_header()
        
        for tag_name in tag_names:
            if not isinstance(tag_name, str):
                continue
                
            try:
                # 既存のタグを検索
                search_response = requests.get(
                    f"{self.api_base}/tags",
                    params={'search': tag_name, 'per_page': 1},
                    headers=headers,
                    timeout=10
                )
                
                if search_response.status_code == 200:
                    existing_tags = search_response.json()
                    if existing_tags and existing_tags[0]['name'].lower() == tag_name.lower():
                        tag_ids.append(existing_tags[0]['id'])
                        continue
                
                # タグが存在しない場合は作成
                create_response = requests.post(
                    f"{self.api_base}/tags",
                    json={'name': tag_name},
                    headers=headers,
                    timeout=10
                )
                
                if create_response.status_code == 201:
                    new_tag = create_response.json()
                    tag_ids.append(new_tag['id'])
                    self.logger.info(f"新しいタグを作成: {tag_name} (ID: {new_tag['id']})")
                else:
                    self.logger.warning(f"タグの作成に失敗: {tag_name} - {create_response.status_code}")
                    
            except requests.exceptions.RequestException as e:
                self.logger.error(f"タグ処理エラー: {tag_name} - {e}")
                
        return tag_ids
    
    def generate_slug_from_filename(self, filename: str) -> str:
        """ファイル名からWordPress用スラッグを生成"""
        # ファイル拡張子を除去
        if filename.endswith('.md'):
            filename = filename[:-3]
        
        # 日付部分を除去（YYYYMMDD_形式）
        if re.match(r'^\d{8}_', filename):
            filename = filename[9:]  # YYYYMMDD_ を除去
        
        # 英数字とハイフン、アンダースコアのみ残す
        slug = re.sub(r'[^a-zA-Z0-9\-_]', '-', filename)
        slug = re.sub(r'-+', '-', slug)  # 連続するハイフンを統合
        slug = slug.strip('-').lower()  # 前後のハイフンを除去して小文字化
        
        return slug or 'ai-article'

    def convert_markdown_to_html(self, markdown_content: str) -> str:
        """MarkdownをWordPress用HTMLに変換"""
        # 基本的な変換
        html_content = markdown_content
        
        # 引用ブロックの処理（WordPress用に引用符を除去）
        html_content = re.sub(r'^> (.+)$', r'\1', html_content, flags=re.MULTILINE)
        html_content = re.sub(r'^>$', r'', html_content, flags=re.MULTILINE)
        
        # 見出しの変換
        html_content = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html_content, flags=re.MULTILINE)
        html_content = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html_content, flags=re.MULTILINE)
        
        # 強調の変換
        html_content = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html_content)
        html_content = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html_content)
        
        # リンクの変換（target="_blank"を削除）
        html_content = re.sub(r'\[(.+?)\]\((.+?)\)\{:target="_blank"\}', r'<a href="\2" target="_blank">\1</a>', html_content)
        html_content = re.sub(r'\[(.+?)\]\((.+?)\)', r'<a href="\2">\1</a>', html_content)
        
        # リストの変換
        html_content = re.sub(r'^- (.+)$', r'<li>\1</li>', html_content, flags=re.MULTILINE)
        html_content = re.sub(r'^(\d+)\. (.+)$', r'<li>\2</li>', html_content, flags=re.MULTILINE)
        
        # 段落の変換
        paragraphs = html_content.split('\n\n')
        html_paragraphs = []
        
        for p in paragraphs:
            p = p.strip()
            if p:
                if not (p.startswith('<h') or p.startswith('<li') or p.startswith('<')):
                    p = f'<p>{p}</p>'
                html_paragraphs.append(p)
        
        return '\n\n'.join(html_paragraphs)
    
    def convert_image_to_jpeg(self, image_path: Path, quality: int = 85, max_width: int = 1920) -> tuple:
        """画像をJPEGに変換してサイズを最適化"""
        try:
            with Image.open(image_path) as img:
                # RGBAをRGBに変換（JPEG対応）
                if img.mode in ('RGBA', 'LA', 'P'):
                    # 白背景でRGBに変換
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # 画像サイズを調整
                if img.width > max_width:
                    ratio = max_width / img.width
                    new_height = int(img.height * ratio)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
                # JPEGとしてメモリに保存
                img_buffer = io.BytesIO()
                img.save(img_buffer, format='JPEG', quality=quality, optimize=True)
                img_data = img_buffer.getvalue()
                
                # ファイル名を.jpgに変更
                safe_filename = re.sub(r'[^\w\-_\.]', '_', image_path.stem) + '.jpg'
                if not safe_filename or safe_filename == '.jpg':
                    safe_filename = f"image_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
                
                return img_data, safe_filename, 'image/jpeg'
                
        except Exception as e:
            self.logger.error(f"画像変換エラー: {e}")
            return None, None, None

    def upload_image_to_wordpress(self, image_path: Path) -> Optional[Dict]:
        """画像をJPEGに変換してWordPressメディアライブラリにアップロード"""
        if not image_path.exists():
            self.logger.error(f"画像ファイルが見つかりません: {image_path}")
            return None
        
        # MIMEタイプを取得して画像ファイルかチェック
        mime_type, _ = mimetypes.guess_type(str(image_path))
        if not mime_type or not mime_type.startswith('image/'):
            self.logger.error(f"画像ファイルではありません: {image_path}")
            return None
        
        # 画像をJPEGに変換
        image_data, safe_filename, jpeg_mime_type = self.convert_image_to_jpeg(image_path)
        if not image_data:
            self.logger.error(f"画像変換に失敗しました: {image_path}")
            return None
        
        # WordPress REST API用のファイルアップロード
        files = {
            'file': (safe_filename, image_data, jpeg_mime_type)
        }
        
        headers = {
            'Authorization': f'Basic {base64.b64encode(f"{self.wp_username}:{self.wp_password}".encode()).decode()}'
        }
        
        try:
            # WordPress REST APIでメディアをアップロード
            response = requests.post(
                f"{self.api_base}/media",
                files=files,
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 201:
                media_info = response.json()
                self.logger.info(f"画像アップロード成功: {safe_filename} (元: {image_path.name}) - ID: {media_info['id']}")
                return media_info
            else:
                self.logger.error(f"画像アップロード失敗: {response.status_code} - {response.text}")
                return None
                
        except requests.exceptions.RequestException as e:
            self.logger.error(f"画像アップロードエラー: {e}")
            return None
    
    def upload_to_wordpress(self, metadata: Dict, content: str, status: str = None, featured_image_path: str = None) -> Optional[str]:
        """WordPressに記事を投稿"""
        
        # スラッグをファイル名から生成
        file_slug = self.generate_slug_from_filename(metadata.get('filename', metadata['title']))
        
        # 投稿データを準備
        post_data = {
            'title': metadata['title'],
            'content': self.convert_markdown_to_html(content),
            'excerpt': metadata.get('excerpt', ''),
            'status': status or self.config['wordpress']['default_status'],
            'author': self.config['wordpress']['default_author'],
            'slug': file_slug
        }
        
        # カテゴリー設定
        if 'category_id' in metadata:
            category_id = self.config['category_mapping'].get(metadata['category_id'], metadata['category_id'])
            post_data['categories'] = [category_id]
        
        # タグ設定
        if 'tags' in metadata and metadata['tags']:
            # タグを作成または取得してIDを使用
            tag_ids = self.get_or_create_tags(metadata['tags'])
            if tag_ids:
                post_data['tags'] = tag_ids
        
        # メタディスクリプション設定（Yoast SEOプラグインを想定）
        if 'meta_description' in metadata:
            post_data['meta'] = {
                '_yoast_wpseo_metadesc': metadata['meta_description']
            }
        
        # アイキャッチ画像の設定
        if featured_image_path:
            image_path = Path(featured_image_path)
            media_info = self.upload_image_to_wordpress(image_path)
            if media_info:
                post_data['featured_media'] = media_info['id']
                self.logger.info(f"アイキャッチ画像を設定: {image_path.name} (JPEG変換済み) - ID: {media_info['id']}")
        
        # WordPress REST APIに投稿
        headers = self.create_auth_header()
        
        try:
            response = requests.post(
                f"{self.api_base}/posts",
                json=post_data,
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 201:
                post_info = response.json()
                post_url = post_info.get('link', f"{self.wp_url}/?p={post_info['id']}")
                self.logger.info(f"投稿成功: {metadata['title']} - URL: {post_url}")
                return post_url
            else:
                self.logger.error(f"投稿失敗: {response.status_code} - {response.text}")
                return None
                
        except requests.exceptions.RequestException as e:
            self.logger.error(f"接続エラー: {e}")
            return None
    
    def move_to_uploaded(self, file_path: Path) -> Path:
        """アップロード済みファイルをbackupディレクトリに移動"""
        backup_path = self.backup_dir / file_path.name
        
        # 同名ファイルが存在する場合はタイムスタンプを追加
        if backup_path.exists():
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            name_parts = backup_path.stem, timestamp, backup_path.suffix
            backup_path = self.backup_dir / f"{name_parts[0]}_{name_parts[1]}{name_parts[2]}"
        
        shutil.move(str(file_path), str(backup_path))
        self.logger.info(f"ファイルを移動: {file_path} -> {backup_path}")
        return backup_path
    
    def upload_file(self, filename: str, status: str = None, featured_image: str = None) -> bool:
        """指定されたファイルをWordPressにアップロード"""
        file_path = self.source_dir / filename
        
        if not file_path.exists():
            self.logger.error(f"ファイルが見つかりません: {file_path}")
            return False
        
        if not file_path.suffix.lower() == '.md':
            self.logger.error(f"Markdownファイルではありません: {file_path}")
            return False
        
        try:
            # ファイルを解析
            metadata, content = self.parse_markdown_file(file_path)
            
            # WordPressに投稿
            post_url = self.upload_to_wordpress(metadata, content, status, featured_image)
            
            if post_url:
                # アップロード済みディレクトリに移動
                self.move_to_uploaded(file_path)
                print(f"✅ 投稿成功: {metadata['title']}")
                print(f"📝 URL: {post_url}")
                if featured_image:
                    print(f"🖼️ アイキャッチ画像: {featured_image}")
                return True
            else:
                print(f"❌ 投稿失敗: {metadata['title']}")
                return False
                
        except Exception as e:
            self.logger.error(f"ファイル処理エラー: {e}")
            print(f"❌ エラー: {e}")
            return False
    
    def upload_all(self, status: str = None) -> List[str]:
        """sourceディレクトリ内のすべてのMarkdownファイルをアップロード"""
        md_files = list(self.source_dir.glob("*.md"))
        
        if not md_files:
            print("📁 アップロード対象のMarkdownファイルが見つかりません")
            return []
        
        uploaded_files = []
        
        print(f"📋 {len(md_files)}個のファイルを処理します...")
        
        for file_path in md_files:
            print(f"\n🔄 処理中: {file_path.name}")
            if self.upload_file(file_path.name, status):
                uploaded_files.append(file_path.name)
        
        print(f"\n✨ 完了: {len(uploaded_files)}/{len(md_files)}個のファイルをアップロードしました")
        return uploaded_files


def main():
    parser = argparse.ArgumentParser(description='WordPress自動投稿システム')
    parser.add_argument('--file', '-f', type=str, help='アップロードするMarkdownファイル名')
    parser.add_argument('--all', '-a', action='store_true', help='すべてのMarkdownファイルをアップロード')
    parser.add_argument('--status', '-s', type=str, choices=['draft', 'publish', 'private'], 
                        help='投稿ステータス (draft, publish, private)')
    parser.add_argument('--image', '-i', type=str, help='アイキャッチ画像のパス')
    parser.add_argument('--config', '-c', type=str, help='設定ファイルのパス')
    
    args = parser.parse_args()
    
    if not args.file and not args.all:
        parser.print_help()
        return
    
    try:
        uploader = WordPressUploader(args.config)
        
        if args.all:
            uploader.upload_all(args.status)
        elif args.file:
            uploader.upload_file(args.file, args.status, args.image)
            
    except Exception as e:
        print(f"❌ エラー: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()