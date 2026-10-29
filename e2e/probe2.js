const { chromium } = require('playwright'); const H = require('./harness');
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 412, height: 915 } });
  await ctx.addInitScript(H.bridges({})); const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);
  console.log(await page.evaluate(() => JSON.stringify(Object.keys(window.__nativeDisk)) + '\n' + (window.__nativeDisk['quiet-bible-web-v1'] || '').slice(0, 600)));
  await b.close();
})();
