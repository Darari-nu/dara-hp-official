const { chromium } = require('playwright');

async function debugNoteLogin() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('note.comログインページにアクセス中...');
    await page.goto('https://note.com/login');
    await page.waitForLoadState('networkidle');
    
    console.log('スクリーンショットを撮影中...');
    await page.screenshot({ path: 'note-login-page.png', fullPage: true });
    
    console.log('ページの入力欄を調査中...');
    const allInputs = await page.$$eval('input', inputs => 
      inputs.map(input => ({
        type: input.type,
        name: input.name,
        id: input.id,
        placeholder: input.placeholder,
        className: input.className,
        visible: input.offsetParent !== null
      }))
    );
    
    console.log('見つかった入力欄:', JSON.stringify(allInputs, null, 2));
    
    const allButtons = await page.$$eval('button', buttons => 
      buttons.map(button => ({
        type: button.type,
        textContent: button.textContent?.trim(),
        className: button.className,
        visible: button.offsetParent !== null
      }))
    );
    
    console.log('見つかったボタン:', JSON.stringify(allButtons, null, 2));
    
    console.log('ページのURLを確認:', page.url());
    
    await page.waitForTimeout(10000);
  } catch (error) {
    console.error('デバッグエラー:', error.message);
  } finally {
    await browser.close();
  }
}

debugNoteLogin();