// Search and references: English (KJV) as before, Spanish book names and accents. Fake native side keeps its
// "disk" in sessionStorage so it survives the page reload that switching translations does.
const { chromium } = require('playwright');
const PACK = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/rvpack';
const fs = require('fs');
const init = `
(function(){
  var SS = window.sessionStorage;
  function disk(){ try { return JSON.parse(SS.getItem('__disk') || '{}'); } catch(e) { return {}; } }
  function save(d){ SS.setItem('__disk', JSON.stringify(d)); }
  function syncGet(p){ var x=new XMLHttpRequest(); x.open('GET','/'+p,false); x.send(null); return x.status===200?x.responseText:null; }
  window.QuietBibleNative = { isNative: function(){ return true; } };
  var installed = function(){ return JSON.parse(SS.getItem('__tr') || '[]'); };
  window.QuietBibleAssets = {
    read: function(p){ p=String(p).replace(/^\\//,''); return (p.indexOf('bible/')===0 || p.indexOf('translations/')===0) ? syncGet(p) : null; },
    translations: function(){ return JSON.stringify([{id:'KJV',name:'King James Version',abbr:'KJV',lang:'en',builtIn:true}].concat(installed())); },
    addTranslation: function(){ setTimeout(function(){
        if (window.__nextPick === 'bad') { window.__qbTranslationAdded({ok:false,error:"That file isn't a Quiet Bible translation."}); return; }
        SS.setItem('__tr', JSON.stringify([{id:'RV1909',name:'Reina-Valera 1909',abbr:'RV1909',lang:'es',builtIn:false}]));
        window.__qbTranslationAdded({ok:true,id:'RV1909',name:'Reina-Valera 1909'}); }, 300); return true; },
    removeTranslation: function(id){ SS.setItem('__tr', JSON.stringify(installed().filter(function(t){return t.id!==id}))); return true; } };
  window.QuietBibleStorage = {
    getItem: function(k){ var d=disk(); return Object.prototype.hasOwnProperty.call(d,k) ? d[k] : null; },
    setItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); }, commitItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); },
    removeItem: function(k){ var d=disk(); delete d[k]; save(d); } };
  window.__spoken = []; window.__transport = []; var t=null;
  window.__langs = JSON.parse(SS.getItem('__langs') || '[]');
  window.QuietBibleSpeech = { ready: function(){ return true; },
    setLanguage: function(l){ window.__langs.push(l); SS.setItem('__langs', JSON.stringify(window.__langs)); window.__lang = l; },
    naturalSpeaksLanguage: function(){ return (window.__lang || 'en') === 'en' || SS.getItem('__esvoice') === '1'; },
    getVoice: function(){ return (window.__lang || 'en') === 'en' ? 'john' : (SS.getItem('__esvoice') === '1' ? 'ald' : 'system'); },
    voices: function(){ var v=[{id:'john',name:'John',note:'Male',lang:'en',builtIn:true}]; if (SS.getItem('__esvoice') === '1') v.push({id:'ald',name:'Ald',note:'Male · Latin American Spanish',lang:'es',builtIn:false}); return JSON.stringify(v); },
    voiceStatus: function(){ return 'ready'; }, setVoice: function(){}, prefetch: function(){},
    speak: function(text,rate,id){ window.__spoken.push(id + '|' + text); clearTimeout(t); t=setTimeout(function(){ window.__onQbSpeechEnd && window.__onQbSpeechEnd(id); }, 400); },
    stop: function(){ clearTimeout(t); } };
  window.QuietBibleTransport = { update: function(p,a,b){ window.__transport.push(b); }, stop: function(){}, theme: function(){} };
})();`;
let pass = 0, total = 0;
const check = (name, ok, detail) => { total++; if (ok) pass++; console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${name}${detail !== undefined ? '  -> ' + JSON.stringify(detail).slice(0, 300) : ''}`); };
const verse = (page, n) => page.evaluate(n => { const el = document.getElementById('v-' + n); return el ? el.textContent : null; }, n);
async function goTo(page, testament, book, chapter) {
  await page.getByRole('button', { name: 'Read', exact: true }).click(); await page.waitForTimeout(200);
  await page.click('text=tap to change'); await page.waitForTimeout(300);
  const all = page.getByRole('button', { name: 'All books', exact: true });
  if (await all.count()) { await all.click(); await page.waitForTimeout(200); }
  await page.getByRole('button', { name: testament, exact: true }).click(); await page.waitForTimeout(200);
  await page.locator('button', { hasText: new RegExp('^' + book + '\\d+ chapters$') }).click(); await page.waitForTimeout(250);
  await page.getByRole('button', { name: String(chapter), exact: true }).click(); await page.waitForTimeout(600);
}
const header = page => page.evaluate(() => [...document.querySelectorAll('span')].map(s => s.textContent).find(t => / · tap to change$/.test(t)));
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 412, height: 915 } });
  await ctx.addInitScript(init);
  await ctx.route('**/translations/RV1909/**', route => {
    const rel = route.request().url().split('/translations/RV1909/')[1]; const f = PACK + '/' + rel;
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  const refLabel = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(800);
    return page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /Go to reference/.test(b.textContent)); return b ? b.querySelectorAll('span')[1].textContent : null; }); };
  const hitsFor = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(1500);
    return page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText).filter(t => /\d+:\d+/.test(t))); };
  console.log('English (KJV)');
  await page.getByRole('button', { name: 'Search', exact: true }).click(); await page.waitForTimeout(400);
  const en = {};
  for (const q of ['John 3:16', '1 Cor 13:4', 'Song of Solomon 2:1', 'Psalm 23', 'ps 23:1-3', 'Genesis 1', '2 Kings 2:11', 'Rev 22']) en[q] = await refLabel(q);
  check('English references as before', en['John 3:16'] === 'John 3:16' && en['1 Cor 13:4'] === '1 Corinthians 13:4' && en['Song of Solomon 2:1'] === 'Song of Solomon 2:1'
        && en['Psalm 23'] === 'Psalms 23' && /^Psalms? 23:1–3$/.test(en['ps 23:1-3'] || '') && en['Genesis 1'] === 'Genesis 1' && en['2 Kings 2:11'] === '2 Kings 2:11' && en['Rev 22'] === 'Revelation 22', en);
  const words = { 'love one another': await refLabel('love one another'), 'the 12 tribes': await refLabel('the 12 tribes'), 'faith hope love': await refLabel('faith hope love') };
  check('phrases are not mistaken for references', Object.values(words).every(v => v === null), words);
  let h = await hitsFor('love one another');
  check('English phrase search still finds John 13:34', h.some(t => /^John 13:34/.test(t)), h.slice(0, 2));
  h = await hitsFor('shepherd want');
  check('English word search still works', h.some(t => /^Psalms 23:1/.test(t)), h.slice(0, 2));
  console.log('Spanish (Reina-Valera 1909)');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(500);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);
  await page.getByRole('button', { name: 'Search', exact: true }).click(); await page.waitForTimeout(400);
  const es = {};
  for (const q of ['Juan 3:16', 'Génesis 1:1', 'Genesis 1:1', 'Gn 1', '1 Juan 4:8', 'Salmos 23', 'Ap 22', 'John 3:16']) es[q] = await refLabel(q);
  check('Spanish book names, abbreviations, with or without accents, and English names', es['Juan 3:16'] === 'Juan 3:16' && es['Génesis 1:1'] === 'Génesis 1:1' && es['Genesis 1:1'] === 'Génesis 1:1'
        && es['Gn 1'] === 'Génesis 1' && es['1 Juan 4:8'] === '1 Juan 4:8' && es['Salmos 23'] === 'Salmos 23' && es['Ap 22'] === 'Apocalipsis 22' && es['John 3:16'] === 'Juan 3:16', es);
  h = await hitsFor('Jehová pastor');
  check('Spanish word search with accents', h.some(t => /^Salmos 23:1/.test(t)), h.slice(0, 2));
  h = await hitsFor('Jehova es mi pastor');
  check('Spanish phrase typed without accents', h.some(t => /^Salmos 23:1/.test(t)), h.slice(0, 2));
  h = await hitsFor('crió');
  check('accented word on its own', h.some(t => /^Génesis 1:1/.test(t)), h.slice(0, 2));
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
