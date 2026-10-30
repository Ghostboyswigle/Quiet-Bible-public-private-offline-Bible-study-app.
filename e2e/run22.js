// Study tools while reading another translation (v1.2.0): the KJV's Hebrew/Greek words, cross-references
// shown in the translation being read, commentary and dictionary, with no page errors.
// usage: node run22.js <port> <outdir> [only-id ...]
const { chromium } = require('playwright');
const fs = require('fs');
const S = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/';
const port = process.argv[2], out = process.argv[3], only = process.argv.slice(4);
const TR = [
  { id: 'KJV', name: 'King James Version', lang: 'en', builtIn: true, q: 'love one another' },
  { id: 'RV1909', name: 'Reina-Valera 1909', lang: 'es', pack: 'rvpack', q: 'pastor' },
  { id: 'CUV', name: 'Chinese Union Version (Traditional)', lang: 'zh', pack: 'cuvpack', q: '牧者' },
  { id: 'CUVS', name: 'Chinese Union Version (Simplified)', lang: 'zh', pack: 'cuvspack', q: '牧者' },
  { id: 'ADB', name: 'Ang Dating Biblia (1905)', lang: 'tl', pack: 'adbpack', q: 'pastor' },
  { id: 'VIE1934', name: 'Kinh Thánh 1934 (Bản Truyền Thống)', lang: 'vi', pack: 'viepack', q: 'chăn giữ' },
  { id: 'LSG', name: 'Louis Segond 1910', lang: 'fr', pack: 'lsgpack', q: 'mon berger' },
  { id: 'BLIVRE', name: 'Bíblia Livre (Almeida)', lang: 'pt', pack: 'blvpack', q: 'meu pastor' },
  { id: 'RST', name: 'Синодальный перевод', lang: 'ru', pack: 'rstpack', q: 'Пастырь' },
  { id: 'SVD', name: 'Smith & Van Dyck (Arabic)', lang: 'ar', pack: 'svdpack', q: 'الرب راعي' },
  { id: 'TWI', name: 'Asante Twi Bible (2020)', lang: 'tw', pack: 'twipack', q: 'Awurade ne me hwɛfo' },
].filter(t => t.builtIn || fs.existsSync(S + t.pack + '/meta.json'));
const RUN = TR.filter(t => !only.length || only.includes(t.id));

const init = (tr, state) => `
(function(){
  var mem = {}; mem['qb-translation'] = ${JSON.stringify(tr.id)};
  mem['quiet-bible-web-v1'] = ${JSON.stringify(JSON.stringify({ state, version: 0 }))};
  function syncGet(p){ var x=new XMLHttpRequest(); x.open('GET','/'+p,false); x.send(null); return x.status===200?x.responseText:null; }
  window.QuietBibleNative = { isNative: function(){ return true; } };
  window.QuietBibleAssets = {
    read: function(p){ p=String(p).replace(/^\\//,''); return (p.indexOf('bible/')===0 || p.indexOf('translations/')===0) ? syncGet(p) : null; },
    translations: function(){ return JSON.stringify(${JSON.stringify(TR.map(t => ({ id: t.id, name: t.name, abbr: t.id, lang: t.lang, builtIn: !!t.builtIn })))}); },
    addTranslation: function(){ return true; }, removeTranslation: function(){ return true; } };
  window.QuietBibleStorage = { getItem: function(k){ return Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null; },
    setItem: function(k,v){ mem[k]=String(v); }, commitItem: function(k,v){ mem[k]=String(v); }, removeItem: function(k){ delete mem[k]; } };
  window.QuietBibleSpeech = { ready: function(){ return true; }, setLanguage: function(){}, naturalSpeaksLanguage: function(){ return false; },
    getVoice: function(){ return 'system'; }, voices: function(){ return '[{"id":"john","name":"John","note":"Male","lang":"en","builtIn":true}]'; },
    voiceStatus: function(){ return 'ready'; }, setVoice: function(){}, prefetch: function(){}, speak: function(){}, stop: function(){} };
  window.QuietBibleTransport = { update: function(){}, stop: function(){}, theme: function(){} };
})();`;

let pass = 0, total = 0;
const check = (n, ok, d) => { total++; if (ok) pass++; console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${n}${d === undefined ? '' : '  -> ' + String(d).slice(0, 200)}`); };
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const tr of RUN.filter(t => !t.builtIn)) {
    console.log(tr.id);
    const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, reducedMotion: 'reduce', locale: 'en-US' });
    await ctx.addInitScript(init(tr, { book: 'JHN', chapter: 3 }));
    await ctx.route(`**/translations/${tr.id}/**`, route => {
      const f = S + tr.pack + '/' + route.request().url().split(`/translations/${tr.id}/`)[1];
      fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
    });
    const page = await ctx.newPage(), errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:${port}/index.html`); await page.waitForSelector('#v-1'); await page.waitForTimeout(900);
    await page.click('#v-16'); await page.waitForSelector('[data-qb-study]');
    const t = n => page.locator('[data-qb-study] .grid button').nth(n).click();
    await t(0);
    const w = await page.locator('[data-qb-words]').innerText();
    check('words come from the KJV', w.startsWith('King James Version. Tap a word to see the Greek') && w.includes('G2316'), w.slice(0, 90).replace(/\n/g, ' / '));
    await t(1);
    const x = await page.locator('[data-qb-xrefs] button').first().innerText();
    const kjvWords = /whosoever|begotten|everlasting/i.test(x);
    check('cross-references show this translation’s text', x.split('\n').length >= 2 && !kjvWords, x.replace(/\n/g, ' / ').slice(0, 120));
    await page.screenshot({ path: `${out}/${tr.id}-xrefs.png` });
    await t(2);
    check('commentary shown', /John 3:16|Jhn|3:16/.test(await page.locator('[data-qb-commentary]').innerText()) || (await page.locator('[data-qb-commentary-text]').count()) === 1);
    await t(3);
    const d = await page.locator('[data-qb-dictionary]').innerText();
    check('dictionary terms from the KJV words', /World|Son|Life/.test(d), d.slice(0, 80).replace(/\n/g, ' / '));
    await page.locator('[data-qb-study] .grid button').nth(1).click();
    await page.locator('[data-qb-xrefs] button').first().click(); await page.waitForTimeout(700);
    check('jumping keeps the translation', await page.locator('[role=dialog]').count() === 0 && (await page.evaluate(() => document.body.innerText)).includes(tr.name.split(' ')[0]));
    check('no page errors', errors.length === 0, errors.join(' | '));
    await ctx.close();
  }
  await b.close();
  console.log(`${pass}/${total} passed`);
  process.exit(pass === total ? 0 : 1);
})();
