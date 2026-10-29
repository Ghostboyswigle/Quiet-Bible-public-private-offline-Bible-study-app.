// Library > Research: the other research documents (v1.3.0), their notes and warnings, and the reader.
// usage: node run23.js <port> <outdir>
const { chromium } = require('playwright');
const fs = require('fs');
const [port, out] = process.argv.slice(2);

const init = (book, chapter, theme = 'paper') => `
(function(){
  var mem = {'qb-translation':'KJV'};
  mem['quiet-bible-web-v1'] = ${JSON.stringify(JSON.stringify({ state: { book, chapter, themeId: theme }, version: 0 }))};
  function syncGet(p){ var x=new XMLHttpRequest(); x.open('GET','/'+p,false); x.send(null); return x.status===200?x.responseText:null; }
  window.__reads = [];
  window.QuietBibleNative = { isNative: function(){ return true; } };
  window.QuietBibleAssets = {
    read: function(p){ p=String(p).replace(/^\\//,''); window.__reads.push(p); return p.indexOf('bible/')===0 ? syncGet(p) : null; },
    translations: function(){ return '[{"id":"KJV","name":"King James Version","abbr":"KJV","lang":"en","builtIn":true}]'; },
    licenseText: function(){ return null; }, addTranslation: function(){ return true; }, removeTranslation: function(){ return true; } };
  window.QuietBibleStorage = { getItem: function(k){ return Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null; },
    setItem: function(k,v){ mem[k]=String(v); }, commitItem: function(k,v){ mem[k]=String(v); }, removeItem: function(k){ delete mem[k]; } };
  window.QuietBibleSpeech = { ready: function(){ return true; }, setLanguage: function(){}, naturalSpeaksLanguage: function(){ return true; },
    getVoice: function(){ return 'john'; }, voices: function(){ return '[]'; }, voiceStatus: function(){ return 'ready'; },
    setVoice: function(){}, prefetch: function(){}, speak: function(){}, stop: function(){} };
  window.QuietBibleTransport = { update: function(){}, stop: function(){}, theme: function(){} };
})();`;

let pass = 0, total = 0;
const check = (n, ok, d) => { total++; if (ok) pass++; console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${n}${d === undefined ? '' : '  -> ' + String(d).slice(0, 240)}`); };
const noSide = page => page.evaluate(() => { const m = [...document.querySelectorAll('*')].find(e => e.querySelector && e.querySelector('[data-qb-research]') && getComputedStyle(e).overflowY === 'auto'); return !m || m.scrollWidth <= m.clientWidth + 1; });

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const scheme of ['light', 'dark']) {
    console.log(scheme);
    const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, reducedMotion: 'reduce' });
    await ctx.addInitScript(init('GEN', 1, scheme === 'dark' ? 'quiet' : 'paper'));
    const page = await ctx.newPage(), errors = [];
    page.on('pageerror', e => errors.push(String(e))); page.on('console', m => m.type() === 'error' && errors.push(m.text()));
    await page.goto(`http://127.0.0.1:${port}/index.html`); await page.waitForSelector('#v-1');
    await page.getByRole('button', { name: 'Library', exact: true }).click(); await page.waitForTimeout(300);
    const tabs = await page.locator('button.capitalize').allTextContents();
    check('Library has a Research tab', tabs.join(',') === 'notes,highlights,bookmarks,research', tabs.join(','));
    await page.locator('button.capitalize', { hasText: 'research' }).click(); await page.waitForTimeout(300);
    const list = await page.locator('[data-qb-research-list]').innerText();
    check('section is called Other research documents', list.includes('Other research documents'));
    for (const g of ['The Old Testament: Septuagint and Masoretic text', 'Early Bibles', 'Early church writings', 'Historians', 'Texts the channel warns about'])
      check(`group: ${g}`, list.toUpperCase().includes(g.toUpperCase()));
    check('21 documents listed', (await page.locator('[data-qb-doc]').count()) === 21, await page.locator('[data-qb-doc]').count());
    check('documents that cannot be included are named', /can’t be included/.test(list) && /Dead Sea Scrolls/.test(list));
    check('the Zohar is listed', (await page.locator('[data-qb-doc="zohar"]').count()) === 1);
    await page.locator('[data-qb-doc="talmud"]').click(); await page.waitForTimeout(200);
    const tp = await page.locator('[data-qb-doc-page="talmud"]').innerText();
    const books = await page.locator('[data-qb-doc-page] button', { hasText: /^Book \d+/ }).allInnerTexts();
    check('all ten books of the Talmud; Books 1 and 4 marked non-commercial only, outside the GPL', books.length === 10
      && /Books 1 and 4 are for non-commercial use only and are not covered by Quiet Bible’s GPL licence\./.test(tp), books.length + ' | ' + tp.slice(-260).replace(/\n/g, ' / '));
    await page.locator('[data-qb-doc-page] button', { hasText: '‹ All documents' }).click(); await page.waitForTimeout(200);
    await page.locator('[data-qb-doc="zohar"]').click(); await page.waitForTimeout(200);
    const zp = await page.locator('[data-qb-doc-page="zohar"]').innerText();
    check('the Zohar marked non-commercial only, outside the GPL', /for non-commercial use only, and not covered by Quiet Bible’s GPL licence\./.test(zp), zp.slice(-220).replace(/\n/g, ' / '));
    await page.locator('[data-qb-doc-page] button', { hasText: '‹ All documents' }).click(); await page.waitForTimeout(200);
    check('no sideways scroll (list)', await noSide(page));
    await page.screenshot({ path: `${out}/research-list-${scheme}.png` });

    // the Septuagint: notes, channel view, a chapter
    await page.locator('[data-qb-doc="lxx"]').click(); await page.waitForTimeout(200);
    const lp = await page.locator('[data-qb-doc-page="lxx"]').innerText();
    check('Septuagint page: description and channel view', /Alexandria/.test(lp) && /WHAT THE CHANNEL SAYS/i.test(lp) && /Psalm 40:6/.test(lp), lp.slice(0, 120));
    await page.screenshot({ path: `${out}/research-lxx-${scheme}.png` });
    await page.locator('[data-qb-doc-page] button', { hasText: 'Psalms' }).click(); await page.waitForTimeout(200);
    await page.locator('[data-qb-doc-contents] button', { hasText: /^22$/ }).click(); await page.waitForTimeout(200);
    const ps = await page.locator('[data-qb-doc-reader]').innerText();
    check('LXX Psalm 22 is the Shepherd psalm (KJV 23), title shown', /The Lord tends me as a shepherd/.test(ps) && /\(23\) A Psalm of David/.test(ps), ps.slice(0, 160).replace(/\n/g, ' / '));
    await page.screenshot({ path: `${out}/research-psalm-${scheme}.png` });
    await page.locator('[data-qb-doc-reader] button', { hasText: 'Next ›' }).click(); await page.waitForTimeout(200);
    check('Next goes to the following chapter', (await page.locator('[data-qb-doc-reader] h2').textContent()).includes('Chapter 23'));
    await page.locator('[data-qb-doc-reader] button', { hasText: '‹ The Septuagint' }).click(); await page.waitForTimeout(200);
    check('Continue reading remembers the place', await page.locator('[data-qb-doc-page] button', { hasText: 'Continue reading' }).count() === 1);
    await page.locator('[data-qb-doc-page] button', { hasText: 'Continue reading' }).click(); await page.waitForTimeout(200);
    check('…and opens it', (await page.locator('[data-qb-doc-reader] h2').textContent()).includes('Psalms · Chapter 23'));
    await page.locator('[data-qb-doc-reader] button', { hasText: '‹ The Septuagint' }).click();
    await page.locator('[data-qb-doc-page] button', { hasText: '‹ All documents' }).click(); await page.waitForTimeout(200);

    // Hebrew, right to left
    await page.locator('[data-qb-doc="wlc"]').click();
    await page.locator('[data-qb-doc-page] button', { hasText: 'Genesis' }).click();
    await page.locator('[data-qb-doc-contents] button', { hasText: /^1$/ }).click(); await page.waitForTimeout(200);
    const heb = page.locator('[data-qb-doc-reader] [dir=rtl]');
    check('Masoretic text reads right to left in Hebrew', (await heb.count()) === 1 && (await heb.innerText()).normalize('NFC').includes('בְּרֵאשִׁ֖ית'.normalize('NFC')), await heb.count());
    await page.screenshot({ path: `${out}/research-hebrew-${scheme}.png` });
    await page.locator('[data-qb-doc-reader] button', { hasText: '‹ The Masoretic' }).click();
    await page.locator('[data-qb-doc-page] button', { hasText: '‹ All documents' }).click();

    // 1 Clement: one part, contents of sections; chapter 12 with the channel's point
    await page.locator('[data-qb-doc="1clement"]').click();
    check('1 Clement: channel quotes chapter 12', /chapter 12/.test(await page.locator('[data-qb-doc-page]').innerText()));
    await page.locator('[data-qb-doc-page] button', { hasText: 'Contents' }).click(); await page.waitForTimeout(200);
    await page.locator('[data-qb-doc-contents] button', { hasText: /^Chapter XII\./ }).click(); await page.waitForTimeout(200);
    const c12 = await page.locator('[data-qb-doc-reader]').innerText();
    check('1 Clement 12: Rahab and the spies, with notes', /Rahab/.test(c12) && /NOTES/i.test(c12), c12.slice(0, 120).replace(/\n/g, ' / '));
    await page.screenshot({ path: `${out}/research-clement-${scheme}.png` });
    await page.locator('[data-qb-doc-reader] button', { hasText: '‹ 1 Clement' }).click();
    await page.locator('[data-qb-doc-page] button', { hasText: '‹ All documents' }).click();

    // a warned-about text: warning first
    await page.locator('[data-qb-doc="goetia"]').click(); await page.waitForTimeout(200);
    const gp = await page.locator('[data-qb-doc-page="goetia"]').innerText();
    check('Lesser Key: warning shown before the description', gp.indexOf('WARNING') > -1 && gp.indexOf('WARNING') < gp.indexOf('17th-century'), gp.slice(0, 200).replace(/\n/g, ' / '));
    check('Lesser Key: credited without a non-commercial notice (its scan has none)', /scanned and proofed by sacred-texts\.com \(J\. B\. Hare\)\./.test(gp) && !/non-commercial/.test(gp));
    await page.screenshot({ path: `${out}/research-warning-${scheme}.png` });
    await page.locator('[data-qb-doc-page] button', { hasText: '‹ All documents' }).click();

    // Josephus, Antiquities 18.3 (the Testimonium)
    await page.locator('[data-qb-doc="josephus"]').click();
    await page.locator('[data-qb-doc-page] button', { hasText: 'Antiquities of the Jews' }).click(); await page.waitForTimeout(200);
    await page.locator('[data-qb-doc-contents] button', { hasText: /^Book 18, chapter 3$/ }).click(); await page.waitForTimeout(200);
    const jt = await page.locator('[data-qb-doc-reader]').innerText();
    check('Josephus, Antiquities 18.3 has the passage about Jesus', /Now there was about this time Jesus, a wise man/.test(jt), (jt.match(/Now there was about this time[^\n]{0,80}/) || [''])[0]);
    check('no sideways scroll (reader)', await noSide(page));
    check('no page errors', errors.length === 0, errors.join(' | '));
    await ctx.close();
  }
  await b.close();
  console.log(`${pass}/${total} passed`);
  process.exit(pass === total ? 0 : 1);
})();
