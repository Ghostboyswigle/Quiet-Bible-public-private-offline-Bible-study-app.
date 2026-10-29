const { chromium } = require('playwright');
const H = require('./harness');
const BASE = 'http://127.0.0.1:8765/index.html';
async function scenario(name, during) {
  const browser = await chromium.launch();
  const launch = async (disk) => {
    const ctx = await browser.newContext({ viewport: { width: 412, height: 915 } });
    await ctx.addInitScript(H.bridges(disk));
    const page = await ctx.newPage();
    await page.goto(BASE); await page.waitForSelector('#v-1', { timeout: 15000 });
    return { ctx, page };
  };
  let { ctx, page } = await launch({});
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(250);
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(500);
  await page.click('button[aria-label="Play chapter"]');
  await page.waitForTimeout(150 * 7 + 60);
  const spoken = await page.evaluate(() => window.__spoken.slice());
  const listening = spoken[spoken.length - 1];
  await during(page);
  await page.waitForTimeout(700);
  const disk = await page.evaluate(() => JSON.parse(JSON.stringify(window.__nativeDisk)));
  await ctx.close();
  ({ ctx, page } = await launch(disk));
  await page.waitForTimeout(1800);
  const where = await page.evaluate(H.topVerse);
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(100);
  const started = (await page.evaluate(() => window.__spoken.slice()))[0];
  const ok = started === listening;
  console.log(`[${ok ? 'PASS' : 'FAIL'}] ${name}\n        listening at ${listening}  saved ${disk['qb-resume-v1']}\n        reopened at verse ${where.verse}, play started at ${started}`);
  await browser.close(); return ok;
}
const scrollBy = px => async page => page.evaluate(px => {
  const v = document.getElementById('v-1'); let sc = v.parentElement;
  while (sc && !(sc.scrollHeight > sc.clientHeight && getComputedStyle(sc).overflowY !== 'visible')) sc = sc.parentElement;
  sc.scrollTop += px; }, px);
(async () => {
  await scenario('listen, then kill (no touching)', async () => {});
  await scenario('listen, tap pause, kill', async p => { await p.click('button[aria-label="Pause audio"]'); });
  await scenario('listen, tiny 3px touch-scroll, kill', scrollBy(3));
  await scenario('listen, pause, glance up/down 1px, kill', async p => {
    await p.click('button[aria-label="Pause audio"]'); await scrollBy(1)(p); await scrollBy(-1)(p); });
})();
