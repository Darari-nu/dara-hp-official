require('dotenv').config({ path: '../../.env' });
const { chromium } = require('playwright');

async function debugNotePostPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  const email = process.env.NOTE_EMAIL;
  const password = process.env.NOTE_PASSWORD;
  
  try {
    console.log('note.comにログイン中...');
    await page.goto('https://note.com/login');
    await page.waitForLoadState('domcontentloaded');
    
    await page.waitForSelector('#email', { timeout: 10000 });
    await page.fill('#email', email);
    await page.waitForSelector('#password', { timeout: 10000 });
    await page.fill('#password', password);
    
    // ログインボタンが有効になるまで待つ
    await page.waitForSelector('button:has-text("ログイン"):not([disabled])', { timeout: 10000 });
    await page.click('button:has-text("ログイン")');
    await page.waitForTimeout(3000);
    
    console.log('投稿ページに移動中...');
    await page.goto('https://note.com/new');
    await page.waitForLoadState('networkidle');
    
    console.log('タイトルを入力中...');
    await page.waitForSelector('textarea[placeholder="記事タイトル"]', { timeout: 10000 });
    await page.fill('textarea[placeholder="記事タイトル"]', 'テスト記事');
    
    console.log('スクリーンショットを撮影中...');
    await page.screenshot({ path: 'note-post-page.png', fullPage: true });
    
    console.log('すべてのボタンとアイコンを調査中...');
    
    // すべてのクリック可能な要素を調査
    const allClickable = await page.$$eval('button, [role="button"], .icon, [class*="icon"], [class*="image"], [class*="header"], [data-testid]', elements => 
      elements.map(el => ({
        tagName: el.tagName,
        className: el.className,
        textContent: el.textContent?.trim(),
        title: el.title,
        ariaLabel: el.ariaLabel,
        dataTestId: el.getAttribute('data-testid'),
        visible: el.offsetParent !== null,
        position: {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight
        }
      }))
    );
    
    console.log('見つかったクリック可能な要素:', JSON.stringify(allClickable.filter(el => el.visible), null, 2));
    
    // SVGアイコンも調査
    const svgElements = await page.$$eval('svg', elements => 
      elements.map(el => ({
        className: el.className.baseVal || el.className,
        parentClassName: el.parentElement?.className,
        visible: el.offsetParent !== null,
        position: {
          top: el.offsetTop,
          left: el.offsetLeft
        }
      }))
    );
    
    console.log('見つかったSVG要素:', JSON.stringify(svgElements.filter(el => el.visible), null, 2));
    
    await page.waitForTimeout(10000);
  } catch (error) {
    console.error('デバッグエラー:', error.message);
  } finally {
    await browser.close();
  }
}

debugNotePostPage();