const { chromium } = require('playwright');
const H = require('./harness');
const BASE = 'http://127.0.0.1:8765/index.html';
let browser;
const launch = async (disk) => {
  const ctx = await browser.newContext({ viewport: { width: 412, height: 915 } });
  await ctx.addInitScript(H.bridges(disk));
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto(BASE); await page.waitForSelector('#v-1', { timeout: 15000 });
  return { ctx, page, errs };
};
const scroller = () => { const v=document.getElementById('v-1'); let sc=v.parentElement;
  while (sc && !(sc.scrollHeight>sc.clientHeight && getComputedStyle(sc).overflowY!=='visible')) sc=sc.parentElement; return sc; };
const scrollBy = px => p => p.evaluate(([px, f]) => { eval('('+f+')')().scrollTop += px; }, [px, scroller.toString()]);
const scrollToVerse = n => p => p.evaluate(n => document.getElementById('v-'+n).scrollIntoView({block:'start'}), n);
const goChapter3 = async p => { await p.keyboard.press('ArrowRight'); await p.waitForTimeout(250);
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(500); };
const play = p => p.click('button[aria-label="Play chapter"]');
const pause = p => p.click('button[aria-label="Pause audio"]');

async function scenario(name, s1, expectFn, afterReopen = async () => {}) {
  let { ctx, page, errs } = await launch({});
  await goChapter3(page);
  await s1(page);
  await page.waitForTimeout(650);
  const spoken = await page.evaluate(() => window.__spoken.slice());
  const disk = await page.evaluate(() => JSON.parse(JSON.stringify(window.__nativeDisk)));
  const expected = expectFn(spoken);
  await ctx.close();                                                   // kill
  let r = await launch(disk); page = r.page; errs = errs.concat(r.errs);
  await page.waitForTimeout(1600);
  await afterReopen(page);
  const where = await page.evaluate(H.topVerse);
  await play(page); await page.waitForTimeout(80);
  const started = (await page.evaluate(() => window.__spoken.slice()))[0];
  const ok = started === expected && errs.length === 0;
  console.log(`[${ok?'PASS':'FAIL'}] ${name}\n        expected ${expected} | ${where.heading}, top of screen v${where.verse} | play started ${started}` +
              (errs.length ? `\n        PAGE ERRORS: ${errs.join('; ')}` : ''));
  await r.ctx.close(); return ok;
}
const last = sp => sp[sp.length - 1];
(async () => {
  browser = await chromium.launch(); const res = [];
  res.push(await scenario('listen, then killed mid-verse', async p => { await play(p); await p.waitForTimeout(1100); }, last));
  res.push(await scenario('listen, pause, killed', async p => { await play(p); await p.waitForTimeout(1100); await pause(p); }, last));
  res.push(await scenario('listen, pause, 1px touch on screen, killed   <- the reported bug', async p => {
    await play(p); await p.waitForTimeout(1100); await pause(p); await scrollBy(1)(p); await scrollBy(-1)(p); }, last));
  res.push(await scenario('listen, pause, scroll far down to read, killed', async p => {
    await play(p); await p.waitForTimeout(1100); await pause(p); await scrollToVerse(20)(p); }, last));
  res.push(await scenario('listen while scrolling around, killed', async p => {
    await play(p); await p.waitForTimeout(500); await scrollToVerse(18)(p); await p.waitForTimeout(600); await scrollBy(-400)(p); }, last));
  res.push(await scenario('listen past the end of the chapter into the next, killed', async p => {
    await p.evaluate(() => window.__verseMs = 40); await play(p); await p.waitForTimeout(1500); await pause(p); },
    sp => { const l = last(sp); if (!l.startsWith('GEN.4.')) throw new Error('did not reach chapter 4: '+l); return l; }));
  res.push(await scenario('reading only (never pressed play), scrolled to v15, killed', async p => {
    await scrollToVerse(15)(p); }, () => 'GEN.3.15'));
  res.push(await scenario('reopen, then touch the screen before pressing play', async p => {
    await play(p); await p.waitForTimeout(1100); await pause(p); }, last, async p => { await scrollBy(2)(p); await p.waitForTimeout(600); }));
  const n = res.filter(Boolean).length;
  console.log(`\n${n}/${res.length} scenarios passed`);
  await browser.close(); process.exitCode = n === res.length ? 0 : 1;
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
