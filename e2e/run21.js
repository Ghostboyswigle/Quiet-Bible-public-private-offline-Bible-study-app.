// Study tools in the verse sheet (v1.2.0): Hebrew & Greek words with the lexicon, cross-references,
// commentary and the Bible dictionary, read from web/bible/study through QuietBibleAssets.read.
// usage: node run21.js <port> <outdir>
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
const check = (n, ok, d) => { total++; if (ok) pass++; console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${n}${d === undefined ? '' : '  -> ' + String(d).slice(0, 300)}`); };

async function open(b, scheme, book, chapter, verse, width = 360) {
  const ctx = await b.newContext({ viewport: { width, height: 800 }, reducedMotion: 'reduce', colorScheme: scheme });
  await ctx.addInitScript(init(book, chapter, scheme === 'dark' ? 'quiet' : 'paper'));
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', e => page.errors.push(String(e)));
  page.on('console', m => m.type() === 'error' && page.errors.push(m.text()));
  await page.goto(`http://127.0.0.1:${port}/index.html`);
  await page.waitForSelector('#v-1');
  await page.waitForTimeout(500);
  await page.click('#v-' + verse);
  await page.waitForSelector('[data-qb-study]');
  return { ctx, page };
}
const noSideScroll = page => page.evaluate(() => {
  const d = document.querySelector('[role=dialog]'); const s = d && d.querySelector('.overflow-y-auto');
  return { ok: !s || s.scrollWidth <= s.clientWidth + 1, sw: s && s.scrollWidth, cw: s && s.clientWidth };
});
const tab = (page, name) => page.locator('[data-qb-study] button', { hasText: name }).first().click();

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const scheme of ['light', 'dark']) {
    console.log(`Genesis 1:1 (${scheme})`);
    let { ctx, page } = await open(b, scheme, 'GEN', 1, 1);
    const tabs = await page.locator('[data-qb-study] .grid button').allTextContents();
    check('four study tabs', tabs.join('|') === 'Hebrew words|Cross-refs|Commentary|Dictionary', tabs.join('|'));
    check('nothing opened until asked', await page.locator('[data-qb-words],[data-qb-xrefs],[data-qb-commentary],[data-qb-dictionary]').count() === 0);

    await tab(page, 'Hebrew words');
    const rows = await page.locator('[data-qb-words] button[aria-expanded]').allTextContents();
    check('KJV phrases listed with Strong’s numbers', rows[0].includes('In the beginning') && rows[0].includes('H7225') && rows.some(r => r.includes('God') && r.includes('H430')), rows.slice(0, 3).join(' | '));
    await page.locator('[data-qb-words] button[aria-expanded]').first().click();
    const w = page.locator('[data-qb-word="H7225"]');
    await w.waitFor();
    const wt = (await w.innerText()).normalize('NFC');
    check('word: Hebrew, transliteration and gloss', wt.includes('be·re·sheet') && /[\u05d0-\u05ea]/.test(wt.split('\n')[0]) && wt.includes('in beginning'), wt.slice(0, 120));
    check('word: parsing decoded', wt.includes('Preposition + Common noun feminine singular absolute'), wt.split('\n').slice(0, 4).join(' / '));
    check('word: lemma and Strong’s definition', /Strong’s definition\s+the first, in place, time, order or rank/i.test(wt), (wt.match(/Strong’s definition[^\n]*\n[^\n]*/) || [''])[0]);
    check('word: meaning outline from STEPBible', /1\) first, beginning, best, chief/.test(wt));
    check('word: how the KJV translates it', /How the KJV translates it\s+beginning \(\d+×\)/i.test(wt), (wt.match(/How the KJV translates it\s+[^\n]*/i) || [''])[0]);
    const used = wt.match(/Used (\d+) times in (\d+) verses/i);
    check('word: occurrences counted', used && +used[1] >= 50 && +used[2] >= 48, used && used[0]);
    const chips = w.locator('button.rounded-full');
    check('word: verse list starts at Gen 1:1', (await chips.first().textContent()) === 'Gen 1:1', await chips.first().textContent());
    await page.screenshot({ path: `${out}/words-${scheme}.png` });
    check('no sideways scroll (words)', (await noSideScroll(page)).ok, JSON.stringify(await noSideScroll(page)));
    // "created" carries two numbers: the verb and the object marker
    await page.locator('[data-qb-words] button[aria-expanded]', { hasText: 'created' }).click();
    const picks = await page.locator('[data-qb-words] button', { hasText: /^H(1254|853)/ }).allTextContents();
    check('phrase with two Hebrew words offers both', picks.length === 2 && picks[0].startsWith('H1254'), picks.join(' | '));
    check('…and the verb is shown first', await page.locator('[data-qb-word="H1254"]').count() === 1);
    await page.locator('[data-qb-words] button', { hasText: /^H853/ }).click();
    check('…the other one on request', (await page.locator('[data-qb-word="H853"]').innerText()).includes('Particle, direct object marker'));

    await tab(page, 'Cross-refs');
    const x = page.locator('[data-qb-xrefs] button');
    const first = await x.first().innerText();
    check('cross-references: most voted first, with the verse text', first.startsWith('John 1:1–3') && first.includes('In the beginning was the Word'), first.replace(/\n/g, ' / ').slice(0, 120));
    check('cross-references: twelve, then Show all', (await page.locator('[data-qb-xrefs] .space-y-2 > button').count()) === 12 && await page.locator('[data-qb-xrefs] button', { hasText: /^Show all \d+$/ }).count() === 1);
    await page.screenshot({ path: `${out}/xrefs-${scheme}.png` });

    await tab(page, 'Commentary');
    const c = page.locator('[data-qb-commentary]');
    let ct = await c.innerText();
    check('commentary: Matthew Henry by default, the passage named', (await c.getAttribute('data-qb-commentary')) === 'mh' && /Gen 1:1–2/.test(ct), ct.slice(0, 160).replace(/\n/g, ' / '));
    const before = (await page.locator('[data-qb-commentary-text]').innerText()).length;
    const more = page.locator('[data-qb-commentary] button', { hasText: 'Read more' });
    if (await more.count()) { await more.click(); }
    const after = (await page.locator('[data-qb-commentary-text]').innerText()).length;
    check('commentary: Read more shows the rest', after > before, `${before} -> ${after}`);
    await page.locator('[data-qb-commentary] button', { hasText: 'Jamieson' }).click();
    ct = await c.innerText();
    check('commentary: Jamieson, Fausset & Brown on the verse', (await c.getAttribute('data-qb-commentary')) === 'jfb' && /Gen 1:1/.test(ct) && /beginning/i.test(ct), ct.slice(0, 200).replace(/\n/g, ' / '));
    await page.screenshot({ path: `${out}/commentary-${scheme}.png` });

    await tab(page, 'Dictionary');
    const terms = await page.locator('[data-qb-dictionary] > div button').allTextContents();
    check('dictionary: entries for words in the verse', terms.includes('Beginning') || terms.includes('Heaven') || terms.includes('Earth'), terms.join(', '));
    await page.fill('[data-qb-dictionary] input', 'bethle');
    await page.locator('[data-qb-dictionary] button', { hasText: /^Bethlehem$/ }).first().click();
    const de = await page.locator('[data-qb-dict-entry="BETHLEHEM"]').innerText();
    check('dictionary: look-up finds Bethlehem with Easton, Smith and Hitchcock', /House of bread/.test(de) && /Easton’s Bible Dictionary/i.test(de) && /Smith’s Bible Dictionary/i.test(de), de.slice(0, 160).replace(/\n/g, ' / '));
    await page.screenshot({ path: `${out}/dictionary-${scheme}.png` });
    check('no sideways scroll (dictionary)', (await noSideScroll(page)).ok);

    // jump from a cross-reference
    await tab(page, 'Cross-refs');
    await page.locator('[data-qb-xrefs] button').first().click();
    await page.waitForTimeout(600);
    const heading = await page.evaluate(() => document.body.innerText.slice(0, 400));
    check('tapping a cross-reference opens it', /John/.test(heading) && await page.locator('[role=dialog]').count() === 0, heading.slice(0, 80).replace(/\n/g, ' / '));
    check('no page errors', page.errors.length === 0, page.errors.join(' | '));
    await ctx.close();
  }

  console.log('John 3:16');
  let { ctx, page } = await open(b, 'light', 'JHN', 3, 16);
  check('New Testament says Greek', (await page.locator('[data-qb-study] .grid button').first().textContent()) === 'Greek words');
  await tab(page, 'Greek words');
  const god = page.locator('[data-qb-words] button[aria-expanded]', { hasText: /^God/ });
  check('"God" is θεός (G2316), not the article', (await god.innerText()).includes('G2316'), await god.innerText());
  await god.click();
  const gt = (await page.locator('[data-qb-word="G2316"]').innerText()).normalize('NFC');
  check('Greek word: θεὸς, theos, parsing', gt.includes('θεὸς'.normalize('NFC')) && gt.includes('theos') && gt.includes('Noun, nominative singular masculine'), gt.slice(0, 160).replace(/\n/g, ' / '));
  await page.locator('[data-qb-words] button[aria-expanded]', { hasText: /^loved/ }).click();
  const lt = (await page.locator('[data-qb-word="G25"]').innerText()).normalize('NFC');
  check('verb parsing: aorist active indicative 3rd person singular', lt.includes('Verb, aorist active indicative 3rd person singular'), lt.slice(0, 200).replace(/\n/g, ' / '));
  check('ἀγαπάω with Strong’s definition', lt.includes('ἀγαπάω'.normalize('NFC')) && /to love \(in a social or moral sense\)/.test(lt));
  check('lexicon part of speech spelled out', /to love · Verb/.test(lt), (lt.match(/to love · [^\n]*/) || [''])[0]);
  check('row shows θεὸς for "God", not the article', (await god.innerText()).normalize('NFC').includes('θεὸς'.normalize('NFC')));
  await page.screenshot({ path: `${out}/greek.png` });
  await tab(page, 'Commentary');
  let jt = await page.locator('[data-qb-commentary]').innerText();
  check('Matthew Henry: the passage around the verse', /John 3:1–21/.test(jt), jt.slice(0, 120).replace(/\n/g, ' / '));
  await page.locator('[data-qb-commentary] button', { hasText: 'Jamieson' }).click();
  jt = await page.locator('[data-qb-commentary]').innerText();
  check('JFB: the verse itself', /John 3:16\b/.test(jt) && !/John 3:16–/.test(jt), jt.slice(0, 120).replace(/\n/g, ' / '));
  await page.locator('[role=dialog] button[aria-label="Close dialog"]').click();
  await page.click('#v-17');
  await page.waitForSelector('[data-qb-commentary]');
  check('the sheet remembers the open tab and commentary for the next verse', (await page.locator('[data-qb-commentary]').getAttribute('data-qb-commentary')) === 'jfb');
  check('no page errors', page.errors.length === 0, page.errors.join(' | '));
  const big = await page.evaluate(() => window.__reads.filter(p => p.startsWith('bible/study/')));
  check('only the files needed were read', big.length <= 8, big.join(', '));
  await ctx.close();

  console.log('Song of Solomon 1:1 (no Matthew Henry)');
  ({ ctx, page } = await open(b, 'light', 'SNG', 1, 1));
  await tab(page, 'Commentary');
  await page.locator('[data-qb-commentary] button', { hasText: 'Matthew Henry' }).click();
  check('missing book explained', /doesn’t cover this book/.test(await page.locator('[data-qb-commentary]').innerText()));
  check('no page errors', page.errors.length === 0, page.errors.join(' | '));
  await ctx.close();

  await b.close();
  console.log(`${pass}/${total} passed`);
  process.exit(pass === total ? 0 : 1);
})();
