const { chromium } = require('playwright'); const H = require('./harness');
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 412, height: 915 } });
  await ctx.addInitScript(H.bridges({})); const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);
  await page.click('text=tap to change'); await page.waitForTimeout(400);
  await page.click('text=New Testament'); await page.waitForTimeout(300);
  await page.click('button:has-text("John21 chapters")'); await page.waitForTimeout(400);
  console.log((await page.evaluate(() => [...document.querySelectorAll('button')].map(e => (e.getAttribute('aria-label') || e.textContent || '').trim()).filter(Boolean))).slice(0, 60).join(' | '));
  await b.close();
})();
