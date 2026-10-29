const { chromium } = require('playwright');
const H = require('./harness');
const BASE = 'http://127.0.0.1:8765/index.html';
(async () => {
  const browser = await chromium.launch();
  const launch = async (disk, label) => {
    const ctx = await browser.newContext({ viewport: { width: 412, height: 915 } });  // fresh = empty localStorage
    await ctx.addInitScript(H.bridges(disk));
    const page = await ctx.newPage();
    page.on('pageerror', e => console.log(`   [${label} page error] ${e.message}`));
    page.on('console', m => { if (m.type()==='error') console.log(`   [${label} console] ${m.text()}`); });
    await page.goto(BASE);
    await page.waitForSelector('#v-1', { timeout: 15000 });
    return { ctx, page };
  };

  console.log('--- Session 1: open, go to Genesis 3, listen a while ---');
  let { ctx, page } = await launch({}, 's1');
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(300);
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(600);
  console.log('   showing:', (await page.evaluate(H.topVerse)).heading);
  await page.click('button[aria-label="Play chapter"]');
  await page.waitForTimeout(150 * 7 + 60);
  const spoken1 = await page.evaluate(() => window.__spoken.slice());
  const disk = await page.evaluate(() => JSON.parse(JSON.stringify(window.__nativeDisk)));
  console.log('   verses spoken:', spoken1.join(' '));
  console.log('   saved resume point:', disk['qb-resume-v1']);
  await ctx.close();                                        // killed: no unload, web storage lost

  console.log('--- Session 2: reopen after the kill ---');
  ({ ctx, page } = await launch(disk, 's2'));
  await page.waitForTimeout(1800);
  const where = await page.evaluate(H.topVerse);
  console.log('   showing:', where.heading, '| verse at top of screen:', where.verse, '| scrollTop:', where.scrollTop);
  const beforePlay = await page.evaluate(() => window.__nativeDisk['qb-resume-v1']);
  console.log('   resume point on disk before pressing play:', beforePlay);
  await page.click('button[aria-label="Play chapter"]');
  await page.waitForTimeout(100);
  const spoken2 = await page.evaluate(() => window.__spoken.slice());
  console.log('   play started at:', spoken2[0]);
  const last = spoken1[spoken1.length - 1];
  console.log('\nRESULT: expected to continue at', last, '->', spoken2[0] === last ? 'PASS' : 'FAIL');
  await browser.close();
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
