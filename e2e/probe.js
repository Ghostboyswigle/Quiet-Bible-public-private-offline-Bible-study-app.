const { chromium } = require('playwright'); const H = require('./harness');
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 412, height: 915 } });
  await ctx.addInitScript(H.bridges({})); const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1');
  const labels = await page.evaluate(() => [...document.querySelectorAll('button,a')].map(e => (e.getAttribute('aria-label')||e.textContent||'').trim()).filter(Boolean).slice(0,40));
  console.log(labels.join(' | ')); await b.close();
})();
