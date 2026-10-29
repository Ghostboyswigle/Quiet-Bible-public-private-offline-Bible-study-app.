const { chromium } = require('playwright');
const H = require('./harness');
const BASE = 'http://127.0.0.1:8765/index.html';
const pos = () => {   // where the verse being read sits, as a fraction of the reading area
  const id = window.__spoken[window.__spoken.length - 1]; const v = +id.split('.')[2];
  const el = document.getElementById('v-' + v); let sc = el.parentElement;
  while (sc && !(sc.scrollHeight > sc.clientHeight && /(auto|scroll)/.test(getComputedStyle(sc).overflowY))) sc = sc.parentElement;
  const f = (el.getBoundingClientRect().top - sc.getBoundingClientRect().top) / sc.clientHeight;
  return { id, v, f: +f.toFixed(3), top: sc.scrollTop, max: sc.scrollHeight - sc.clientHeight };
};
let pass = 0, total = 0;
const ck = (l, c, x = '') => { total++; pass += c ? 1 : 0; console.log(`  [${c ? 'PASS' : 'FAIL'}] ${l}${x ? ' — ' + x : ''}`); };
(async () => {
  const browser = await chromium.launch();
  for (const mode of ['reduce', 'no-preference']) {
    const ms = mode === 'reduce' ? 150 : 1300, settle = mode === 'reduce' ? 50 : 750;

    console.log(`\n=== ${mode === 'reduce' ? 'instant scrolling (reduced motion)' : 'smooth scrolling'} ===`);
    const ctx = await browser.newContext({ viewport: { width: 412, height: 915 }, reducedMotion: mode });
    await ctx.addInitScript(H.bridges({}));
    const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(BASE); await page.waitForSelector('#v-1');
    const nextVerse = async () => { const n = await page.evaluate(() => window.__spoken.length);
      await page.waitForFunction(n => window.__spoken.length > n, n, { timeout: 8000 }); };
    await page.keyboard.press('ArrowRight'); await page.waitForTimeout(250);
    await page.keyboard.press('ArrowRight'); await page.waitForTimeout(500);
    await page.evaluate(ms => window.__verseMs = ms, ms);
    await page.click('button[aria-label="Play chapter"]');
    const seen = [];
    for (let i = 0; i < 6; i++) { await nextVerse(); await page.waitForTimeout(settle); seen.push(await page.evaluate(pos)); }
    const mid = seen.filter(s => s.v > 1 && s.top < s.max - 2);
    ck('each verse settles about a third of the way down', mid.length >= 3 && mid.every(s => Math.abs(s.f - 0.30) < 0.05),
       mid.map(s => `v${s.v}@${s.f}`).join(' '));
    ck('screen actually moved as verses advanced', seen[seen.length - 1].top > seen[0].top, `${seen[0].top}px -> ${seen[seen.length-1].top}px`);

    // hand scroll while playing: it should leave you alone
    await page.evaluate(() => document.body.dispatchEvent(new Event('touchmove', { bubbles: true })));
    const away = await page.evaluate(() => { const el = document.getElementById('v-1'); let sc = el.parentElement;
      while (sc && !(sc.scrollHeight > sc.clientHeight && /(auto|scroll)/.test(getComputedStyle(sc).overflowY))) sc = sc.parentElement;
      sc.scrollTop = sc.scrollHeight; return sc.scrollTop; });
    await page.waitForTimeout(ms * 2 + settle);
    const after = await page.evaluate(pos);
    ck('scrolling by hand while it plays is not overridden', Math.abs(after.top - away) < 2, `you left it at ${away}px, still ${after.top}px while ${after.id} plays`);

    // pause + play brings you back
    await page.click('button[aria-label="Pause audio"]'); await page.waitForTimeout(100);
    await page.click('button[aria-label="Resume audio"]'); await page.waitForTimeout(settle + 60);
    const back = await page.evaluate(pos);
    ck('pressing play brings the verse being read back into view', Math.abs(back.f - 0.30) < 0.05 || back.top >= back.max - 2, `${back.id} at ${back.f}`);

    // run on into chapter 4
    await page.evaluate(() => window.__verseMs = 40);
    await page.waitForFunction(() => /\b4$/.test(document.querySelector('h1').textContent.trim()), null, { timeout: 15000 });
    await page.evaluate(ms => window.__verseMs = ms, ms);
    await nextVerse(); await nextVerse(); await page.waitForTimeout(settle);
    const ch4 = await page.evaluate(pos);
    const heading = await page.evaluate(() => document.querySelector('h1').textContent);
    ck('follows into the next chapter', ch4.id.startsWith('GEN.4.') && /\b4$/.test(heading.trim()) && (Math.abs(ch4.f - 0.30) < 0.05 || ch4.v <= 2),
       `${heading}, ${ch4.id} at ${ch4.f}`);
    ck('no page errors', errs.length === 0, errs.join('; '));
    await ctx.close();
  }
  console.log(`\n${pass}/${total} passed`); await browser.close(); process.exitCode = pass === total ? 0 : 1;
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
