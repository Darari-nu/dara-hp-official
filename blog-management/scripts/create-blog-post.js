#!/usr/bin/env node

/**
 * Sanity CMS ブログ記事作成スクリプト
 * 使用方法: node scripts/sanity/create-blog-post.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Sanity クライアント設定
const client = createClient({
  projectId: '9kqjddwl',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'sk2quzM3iWhkWT5g68tUu2tOaAS4FGwLEnmRxBaIgwwzePXixE4JfXcP6rjuouohVdW4DNde3KY0t6MQgCplq6qLRQnLXDhD6jM3phvOqRFnMWvmCJqy2j65mxSUugZo3JYhxtt8KS3pUW0AfBw3PiraH4fDEc1je4mnEM6dnx1GlpuaIYnf'
});

/**
 * 画像をSanityにアップロード
 * @param {string} imagePath - 画像ファイルのパス
 * @param {string} filename - ファイル名
 * @param {string} altText - Alt text
 * @returns {Object} Sanity Image オブジェクト
 */
async function uploadImage(imagePath, filename, altText = '') {
  try {
    if (!fs.existsSync(imagePath)) {
      console.warn(`画像ファイルが見つかりません: ${imagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const imageAsset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
      contentType: getContentType(imagePath)
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id
      },
      alt: altText
    };
  } catch (error) {
    console.error('画像アップロードエラー:', error);
    return null;
  }
}

/**
 * ファイル拡張子からContent-Typeを取得
 * @param {string} filePath - ファイルパス
 * @returns {string} Content-Type
 */
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
  };
  return types[ext] || 'image/jpeg';
}

/**
 * テキストをPortable Textブロックに変換
 * @param {string} text - 変換するテキスト
 * @param {string} style - ブロックスタイル
 * @returns {Object} Portable Text ブロック
 */
function createTextBlock(text, style = 'normal') {
  return {
    _type: 'block',
    _key: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    style: style,
    children: [
      {
        _type: 'span',
        text: text,
        marks: []
      }
    ]
  };
}

/**
 * 見出しブロックを作成
 * @param {string} text - 見出しテキスト
 * @param {string} level - 見出しレベル（h2, h3, h4）
 * @returns {Object} Portable Text ブロック
 */
function createHeadingBlock(text, level = 'h2') {
  return createTextBlock(text, level);
}

/**
 * 引用ブロックを作成
 * @param {string} text - 引用テキスト
 * @returns {Object} Portable Text ブロック
 */
function createQuoteBlock(text) {
  return createTextBlock(text, 'blockquote');
}

/**
 * ブログ記事をSanityに作成
 * @param {Object} postData - 記事データ
 * @returns {Object} 作成された記事
 */
async function createBlogPost(postData) {
  try {
    // 必須フィールドの検証
    if (!postData.title || !postData.slug || !postData.summary) {
      throw new Error('必須フィールド（title, slug, summary）が不足しています');
    }

    // メイン画像のアップロード
    let mainImage = null;
    if (postData.imagePath) {
      console.log('画像をアップロード中...');
      mainImage = await uploadImage(
        postData.imagePath,
        postData.imageFilename || 'blog-image.png',
        postData.imageAlt || postData.title
      );
      if (mainImage) {
        console.log('画像アップロード完了');
      }
    }

    // ブログ記事ドキュメント作成
    const doc = {
      _type: 'blogPost',
      title: postData.title,
      slug: {
        _type: 'slug',
        current: postData.slug
      },
      summary: postData.summary,
      content: postData.content || [],
      publishedAt: postData.publishedAt || new Date().toISOString(),
      isPublished: postData.isPublished !== false, // デフォルトtrue
      tags: postData.tags || [],
      seo: {
        metaTitle: postData.metaTitle || postData.title,
        metaDescription: postData.metaDescription || postData.summary
      }
    };

    // メイン画像を追加
    if (mainImage) {
      doc.mainImage = mainImage;
    }

    // 著者参照を追加（存在する場合）
    if (postData.authorId) {
      doc.author = {
        _type: 'reference',
        _ref: postData.authorId
      };
    }

    // カテゴリ参照を追加（存在する場合）
    if (postData.categoryIds && postData.categoryIds.length > 0) {
      doc.categories = postData.categoryIds.map(id => ({
        _type: 'reference',
        _ref: id
      }));
    }

    console.log('ブログ記事を作成中...');
    const result = await client.create(doc);
    console.log('ブログ記事作成完了:', result._id);
    
    return result;
  } catch (error) {
    console.error('ブログ記事作成エラー:', error);
    throw error;
  }
}

/**
 * 既存記事の更新
 * @param {string} documentId - ドキュメントID
 * @param {Object} updateData - 更新データ
 * @returns {Object} 更新された記事
 */
async function updateBlogPost(documentId, updateData) {
  try {
    console.log('記事を更新中...');
    const result = await client
      .patch(documentId)
      .set(updateData)
      .commit();
    
    console.log('記事更新完了:', result._id);
    return result;
  } catch (error) {
    console.error('記事更新エラー:', error);
    throw error;
  }
}

/**
 * サンプル記事作成の実行例
 */
async function createSamplePost() {
  const samplePost = {
    title: '【サンプル】AIギャルアシスタントのテスト記事♪',
    slug: 'sample-ai-gal-assistant-test-article',
    summary: 'これはSanity CMSの投稿テスト用サンプル記事です。AIギャルアシスタントの文体で書かれています♪',
    content: [
      createQuoteBlock('こんにちは！AIギャルアシスタントです♪\n\nこれはSanity CMSへの投稿テストです。'),
      createHeadingBlock('テスト記事について'),
      createTextBlock('この記事は、Sanity CMSへのブログ記事投稿機能をテストするために作成されました。\n\nAIギャルアシスタントの文体を維持しつつ、技術的な内容も分かりやすく解説していきます♪'),
      createHeadingBlock('機能テスト項目', 'h3'),
      createTextBlock('以下の機能が正常に動作するかテストします：\n\n1. タイトルと概要の表示\n2. メイン画像の表示\n3. 本文の表示（Portable Text）\n4. タグとカテゴリの表示\n5. SEOメタ情報の設定'),
      createQuoteBlock('テストが成功すれば、このメッセージが表示されているはずです♪')
    ],
    tags: ['テスト', 'Sanity CMS', 'AIギャルアシスタント'],
    metaTitle: '【サンプル】AIギャルアシスタントのテスト記事♪',
    metaDescription: 'Sanity CMSの投稿機能をテストするためのサンプル記事です。AIギャルアシスタントの文体で技術的な内容を分かりやすく解説します。',
    // imagePath: '/path/to/sample-image.png', // 画像パスを指定する場合
    isPublished: true
  };

  try {
    const result = await createBlogPost(samplePost);
    console.log('\n✅ サンプル記事の作成が完了しました！');
    console.log(`記事ID: ${result._id}`);
    console.log(`確認URL: http://localhost:3000/blog/${samplePost.slug}`);
  } catch (error) {
    console.error('\n❌ サンプル記事の作成に失敗しました:', error.message);
  }
}

// スクリプトが直接実行された場合のメイン処理
if (require.main === module) {
  console.log('🚀 Sanity CMS ブログ記事作成スクリプトを開始します...\n');
  
  createSamplePost()
    .then(() => {
      console.log('\n🎉 処理が完了しました！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 処理中にエラーが発生しました:', error);
      process.exit(1);
    });
}

// エクスポート（他のスクリプトから使用する場合）
module.exports = {
  createBlogPost,
  updateBlogPost,
  uploadImage,
  createTextBlock,
  createHeadingBlock,
  createQuoteBlock
};