const { chromium } = require('playwright'); const H = require('./harness');
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 412, height: 915 } });
  await ctx.addInitScript(H.bridges({})); const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);
  await page.click('text=tap to change'); await page.waitForTimeout(500);
  console.log((await page.evaluate(() => [...document.querySelectorAll('button,[role="option"],input')].map(e => (e.getAttribute('aria-label') || e.placeholder || e.textContent || '').trim()).filter(Boolean))).slice(0, 80).join(' | '));
  await b.close();
})();
