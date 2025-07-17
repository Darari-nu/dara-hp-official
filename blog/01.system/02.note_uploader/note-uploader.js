require('dotenv').config({ path: '../../.env' });
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

class NoteUploader {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    try {
      this.browser = await chromium.launch({ headless: false });
      this.page = await this.browser.newPage();
      console.log('ブラウザを初期化しました');
    } catch (error) {
      throw new Error(`ブラウザ初期化エラー: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      console.log('note.comにアクセス中...');
      await this.page.goto('https://note.com/login');
      await this.page.waitForLoadState('domcontentloaded');
      
      await this.page.waitForTimeout(2000);

      console.log('ログイン情報を入力中...');
      
      await this.page.waitForSelector('#email', { timeout: 10000 });
      await this.page.fill('#email', email);
      
      await this.page.waitForSelector('#password', { timeout: 10000 });
      await this.page.fill('#password', password);
      
      await this.page.click('button:has-text("ログイン")');
      await this.page.waitForTimeout(3000);

      const currentUrl = this.page.url();
      if (currentUrl.includes('/login')) {
        throw new Error('ログインに失敗しました。認証情報を確認してください。');
      }

      console.log('ログインに成功しました');
    } catch (error) {
      throw new Error(`ログインエラー: ${error.message}`);
    }
  }

  readMarkdownFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`ファイルが見つかりません: ${filePath}`);
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      
      if (lines.length === 0) {
        throw new Error('ファイルが空です');
      }

      const title = lines[0].replace(/^#\s*/, '').trim();
      const body = lines.slice(1).join('\n').trim();

      if (!title) {
        throw new Error('タイトルが見つかりません（1行目を確認してください）');
      }

      console.log(`記事を読み込みました: ${title}`);
      return { title, body };
    } catch (error) {
      throw new Error(`ファイル読み込みエラー: ${error.message}`);
    }
  }

  async createDraft(title, body, headerImagePath = null) {
    try {
      console.log('投稿ページに移動中...');
      await this.page.goto('https://note.com/new');
      await this.page.waitForLoadState('networkidle');

      console.log('記事内容を入力中...');
      
      await this.page.waitForSelector('textarea[placeholder="記事タイトル"]', { timeout: 10000 });
      await this.page.fill('textarea[placeholder="記事タイトル"]', title);
      
      // ヘッダー画像の設定（シンプル版）
      if (headerImagePath && fs.existsSync(headerImagePath)) {
        console.log('ヘッダー画像を設定中...');
        
        try {
          // AIアシスタントボタンの右側にある画像ボタンを探す
          const imageButton = this.page.locator('button:has-text("<<") + button').first();
          
          if (await imageButton.isVisible({ timeout: 5000 })) {
            await imageButton.click();
            console.log('ヘッダー画像ボタンをクリックしました');
            
            // ファイル入力を待つ
            await this.page.waitForSelector('input[type="file"]', { timeout: 10000 });
            const fileInput = this.page.locator('input[type="file"]').first();
            await fileInput.setInputFiles(headerImagePath);
            
            await this.page.waitForTimeout(3000);
            console.log('ヘッダー画像を設定しました');
          } else {
            console.log('ヘッダー画像ボタンが見つかりません');
          }
        } catch (error) {
          console.log('ヘッダー画像設定エラー:', error.message);
        }
      }
      
      await this.page.waitForSelector('.ProseMirror', { timeout: 10000 });
      await this.page.click('.ProseMirror');
      
      // クリップボード経由で貼り付け（元の方法）
      await this.page.evaluate((text) => {
        navigator.clipboard.writeText(text);
      }, body);
      await this.page.keyboard.press('Meta+V');

      console.log('下書きとして保存中...');
      await this.page.click('button:has-text("下書き保存")');
      
      await this.page.waitForTimeout(3000);

      console.log('下書きの保存が完了しました');
    } catch (error) {
      throw new Error(`記事作成エラー: ${error.message}`);
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('ブラウザを終了しました');
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1 || args.length > 2) {
    console.error('使用方法: node note-uploader.js <markdown-file-path> [header-image-path]');
    process.exit(1);
  }

  const filePath = args[0];
  const headerImagePath = args[1] || null;
  const email = process.env.NOTE_EMAIL;
  const password = process.env.NOTE_PASSWORD;

  if (!email || !password) {
    console.error('環境変数 NOTE_EMAIL と NOTE_PASSWORD を設定してください');
    process.exit(1);
  }

  const uploader = new NoteUploader();

  try {
    await uploader.init();
    
    const { title, body } = uploader.readMarkdownFile(filePath);
    
    await uploader.login(email, password);
    await uploader.createDraft(title, body, headerImagePath);
    
    console.log('✅ 処理が正常に完了しました');
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    process.exit(1);
  } finally {
    await uploader.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = NoteUploader;