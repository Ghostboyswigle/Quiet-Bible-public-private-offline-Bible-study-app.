// Screenshots of the same screens in every translation, for before/after comparison.
// usage: node snap.js <port> <outdir> [only-id ...]
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

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const errors = [];
  for (const tr of RUN) {
    const screens = [
      { name: 'gen1', state: { book: 'GEN', chapter: 1 } },
      { name: 'psa23', state: { book: 'PSA', chapter: 23 } },
      { name: 'psa119', state: { book: 'PSA', chapter: 119 }, scroll: 1800 },
      { name: 'jhn3', state: { book: 'JHN', chapter: 3 }, scroll: 900 },
      { name: 'library', state: { book: 'JHN', chapter: 3, bookmarks: ['JHN.3.16', 'PSA.23.1'], highlights: ['ROM.8.28'], notes: { 'JHN.3.16': 'note' } }, tab: 'Library' },
      { name: 'search', state: { book: 'GEN', chapter: 1 }, tab: 'Search', q: tr.q },
      { name: 'books', state: { book: 'GEN', chapter: 1 }, books: true },
      { name: 'sheet', state: { book: 'JHN', chapter: 3 }, sheet: 16 },
      { name: 'settings', state: { book: 'GEN', chapter: 1 }, tab: 'Settings' },
    ];
    for (const sc of screens) {
      const ctx = await b.newContext({ viewport: { width: 412, height: 915 }, reducedMotion: 'reduce', locale: 'en-US' });
      await ctx.addInitScript(init(tr, sc.state));
      if (tr.pack) await ctx.route(`**/translations/${tr.id}/**`, route => {
        const f = S + tr.pack + '/' + route.request().url().split(`/translations/${tr.id}/`)[1];
        fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
      });
      const page = await ctx.newPage();
      page.on('pageerror', e => errors.push(`${tr.id}/${sc.name}: ${e}`));
      await page.goto(`http://127.0.0.1:${port}/index.html`); await page.waitForSelector('#v-1');
      await page.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })))); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(900);
      if (sc.scroll) { await page.evaluate(y => { const m = [...document.querySelectorAll('*')].find(e => e.scrollHeight > e.clientHeight + 50 && getComputedStyle(e).overflowY !== 'visible' && e.querySelector('#v-1')); (m || document.scrollingElement).scrollTop = y; }, sc.scroll); await page.waitForTimeout(400); }
      if (sc.tab) { await page.getByRole('button', { name: sc.tab, exact: true }).click(); await page.waitForTimeout(500); }
      if (sc.q) { await page.locator('input').first().fill(sc.q); await page.waitForTimeout(2000); }
      if (sc.tab === 'Library') { await page.getByRole('button', { name: 'bookmarks', exact: true }).click(); await page.waitForTimeout(400); }
      if (sc.books) { await page.click('text=tap to change'); await page.waitForTimeout(500); }
      if (sc.sheet) { await page.click('#v-' + sc.sheet); await page.waitForTimeout(700); }
      await page.screenshot({ path: `${out}/${tr.id}-${sc.name}.png` });
      await ctx.close();
    }
    console.log(tr.id, 'done');
  }
  await b.close();
  if (errors.length) console.log('PAGE ERRORS', errors);
})();
