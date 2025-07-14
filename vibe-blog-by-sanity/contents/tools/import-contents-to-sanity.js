#!/usr/bin/env node

/**
 * contentsディレクトリのMarkdownファイルをSanityにインポートするツール
 * 
 * 使い方:
 * 1. 環境変数を設定（.env.localファイルまたは環境変数）
 *    - SANITY_PROJECT_ID
 *    - SANITY_DATASET
 *    - SANITY_API_TOKEN（書き込み権限必要）
 * 
 * 2. 実行
 *    node tools/import-contents-to-sanity.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// app ディレクトリの node_modules から読み込む
const appDir = path.join(__dirname, '../../app');
const { createClient } = require(path.join(appDir, 'node_modules/@sanity/client'));
const matter = require(path.join(appDir, 'node_modules/gray-matter'));
const { marked } = require(path.join(appDir, 'node_modules/marked'));

// 環境変数の読み込み
require(path.join(appDir, 'node_modules/dotenv')).config({ path: path.join(appDir, '.env.local') });

// Sanityクライアントの初期化
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// contentsディレクトリのパス
const CONTENTS_DIR = path.join(__dirname, '..');
const POSTS_DIR = path.join(CONTENTS_DIR, 'posts');
const COMMON_DIR = path.join(CONTENTS_DIR, 'common');

// ユーティリティ関数
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// MarkdownをPortable Textに変換（改良版）
function markdownToPortableText(markdown) {
  const blocks = [];
  const tokens = marked.lexer(markdown);
  
  function processInlineText(text) {
    // インライン要素の処理（太字、イタリック、リンクなど）
    const children = [];
    let remainingText = text;
    
    // 簡易的な処理（本番環境ではより高度な処理が必要）
    const patterns = [
      { regex: /\*\*([^*]+)\*\*/g, marks: ['strong'] },
      { regex: /_([^_]+)_/g, marks: ['em'] },
      { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: 'link' }
    ];
    
    // シンプルにテキストとして処理
    if (remainingText) {
      children.push({
        _type: 'span',
        text: remainingText.replace(/\*\*/g, '').replace(/_/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      });
    }
    
    return children;
  }
  
  tokens.forEach(token => {
    switch (token.type) {
      case 'heading':
        blocks.push({
          _type: 'block',
          _key: crypto.randomBytes(6).toString('hex'),
          style: `h${token.depth}`,
          children: processInlineText(token.text)
        });
        break;
        
      case 'paragraph':
        // 画像の確認
        if (token.text.startsWith('![')) {
          const match = token.text.match(/!\[([^\]]*)\]\(([^)]+)\)/);
          if (match) {
            // 画像URLを含むテキストブロックとして処理
            blocks.push({
              _type: 'block',
              _key: crypto.randomBytes(6).toString('hex'),
              style: 'normal',
              children: [{
                _type: 'span',
                text: `[画像: ${match[1] || 'Image'}] ${match[2]}`
              }]
            });
            break;
          }
        }
        
        blocks.push({
          _type: 'block',
          _key: crypto.randomBytes(6).toString('hex'),
          style: 'normal',
          children: processInlineText(token.text)
        });
        break;
        
      case 'list':
        token.items.forEach(item => {
          blocks.push({
            _type: 'block',
            _key: crypto.randomBytes(6).toString('hex'),
            listItem: token.ordered ? 'number' : 'bullet',
            level: 1,
            children: processInlineText(item.text)
          });
        });
        break;
        
      case 'code':
        blocks.push({
          _type: 'code',
          _key: crypto.randomBytes(6).toString('hex'),
          language: token.lang || 'text',
          code: token.text
        });
        break;
        
      case 'blockquote':
        blocks.push({
          _type: 'block',
          _key: crypto.randomBytes(6).toString('hex'),
          style: 'blockquote',
          children: processInlineText(token.text)
        });
        break;
        
      case 'hr':
        blocks.push({
          _type: 'block',
          _key: crypto.randomBytes(6).toString('hex'),
          style: 'normal',
          children: [{ _type: 'span', text: '---' }]
        });
        break;
    }
  });
  
  return blocks;
}

// 著者情報の読み込み
async function loadAuthor() {
  const authorPath = path.join(COMMON_DIR, 'author.md');
  if (!fs.existsSync(authorPath)) {
    console.log('著者情報ファイルが見つかりません');
    return null;
  }
  
  const content = fs.readFileSync(authorPath, 'utf-8');
  const { data } = matter(content);
  
  // 著者をSanityに作成または更新
  const authorDoc = {
    _id: `author-${slugify(data.name)}`,
    _type: 'author',
    name: data.name,
    bio: data.discription || data.description, // typoに対応
    // 画像は一旦スキップ（後で手動でアップロード）
  };
  
  try {
    await client.createOrReplace(authorDoc);
    console.log(`著者を作成/更新しました: ${data.name}`);
    return authorDoc._id;
  } catch (error) {
    console.error('著者の作成/更新に失敗しました:', error);
    return null;
  }
}

// カテゴリの作成または取得
async function getOrCreateCategory(categoryName) {
  const categorySlug = slugify(categoryName);
  const categoryId = `category-${categorySlug}`;
  
  try {
    // 既存のカテゴリを確認
    const existing = await client.getDocument(categoryId);
    if (existing) {
      return categoryId;
    }
  } catch (error) {
    // カテゴリが存在しない場合は作成
  }
  
  const categoryDoc = {
    _id: categoryId,
    _type: 'category',
    title: categoryName,
    description: `${categoryName}に関する記事`
  };
  
  try {
    await client.createOrReplace(categoryDoc);
    console.log(`カテゴリを作成しました: ${categoryName}`);
    return categoryId;
  } catch (error) {
    console.error('カテゴリの作成に失敗しました:', error);
    return null;
  }
}

// 記事のインポート
async function importPost(postDir, authorId) {
  const textPath = path.join(postDir, 'text.md');
  if (!fs.existsSync(textPath)) {
    console.log(`記事ファイルが見つかりません: ${postDir}`);
    return;
  }
  
  const content = fs.readFileSync(textPath, 'utf-8');
  const { data, content: markdown } = matter(content);
  
  // カテゴリの処理
  let categoryId = null;
  if (data.category) {
    categoryId = await getOrCreateCategory(data.category);
  }
  
  // 日付の処理（日本語形式をISO形式に変換）
  let publishedAt = new Date().toISOString();
  if (data.date) {
    const dateMatch = data.date.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (dateMatch) {
      publishedAt = new Date(
        parseInt(dateMatch[1]),
        parseInt(dateMatch[2]) - 1,
        parseInt(dateMatch[3])
      ).toISOString();
    }
  }
  
  // スラッグの生成
  const postNumber = path.basename(postDir);
  const slug = `${postNumber}-${slugify(data.title)}`;
  
  // 記事ドキュメントの作成
  const postDoc = {
    _id: `post-${postNumber}`,
    _type: 'post',
    title: data.title,
    slug: {
      _type: 'slug',
      current: slug
    },
    publishedAt: publishedAt,
    excerpt: data.excerpt,
    author: authorId ? {
      _type: 'reference',
      _ref: authorId
    } : undefined,
    categories: categoryId ? [{
      _type: 'reference',
      _ref: categoryId
    }] : [],
    // mainImageは一旦スキップ（後で手動でアップロード）
    body: markdownToPortableText(markdown)
  };
  
  // 公開フラグがfalseの場合はスキップ
  if (data.publish === false) {
    console.log(`非公開記事をスキップ: ${data.title}`);
    return;
  }
  
  try {
    await client.createOrReplace(postDoc);
    console.log(`記事をインポートしました: ${data.title}`);
  } catch (error) {
    console.error(`記事のインポートに失敗しました: ${data.title}`, error);
  }
}

// メイン処理
async function main() {
  console.log('Sanityへのインポートを開始します...');
  
  // 環境変数の確認
  if (!process.env.SANITY_API_TOKEN) {
    console.error('エラー: SANITY_API_TOKENが設定されていません');
    console.error('Sanity管理画面でトークンを作成し、.env.localファイルに設定してください');
    process.exit(1);
  }
  
  try {
    // 著者情報の読み込み
    const authorId = await loadAuthor();
    
    // 記事のインポート
    const postDirs = fs.readdirSync(POSTS_DIR)
      .filter(dir => fs.statSync(path.join(POSTS_DIR, dir)).isDirectory())
      .sort();
    
    for (const postDir of postDirs) {
      await importPost(path.join(POSTS_DIR, postDir), authorId);
    }
    
    console.log('\nインポートが完了しました！');
    console.log('Sanity Studioで確認してください: https://www.sanity.io/manage');
    
  } catch (error) {
    console.error('インポート中にエラーが発生しました:', error);
    process.exit(1);
  }
}

// 実行
if (require.main === module) {
  main();
}