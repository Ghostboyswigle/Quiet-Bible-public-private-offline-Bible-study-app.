// Updating from a version that had the BSB built in: the KJV takes its place, the library and place are kept. Fake native side keeps its
// "disk" in sessionStorage so it survives the page reload that switching translations does.
const { chromium } = require('playwright');
const PACK = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/rvpack';
const fs = require('fs');
const init = `
(function(){
  var SS = window.sessionStorage;

  if (!SS.getItem('__seeded')) {
    SS.setItem('__seeded', '1');
    SS.setItem('__disk', JSON.stringify({ 'qb-translation': window.__seedTr || 'BSB',
      'quiet-bible-web-v1': JSON.stringify({ state: { book: 'PSA', chapter: 23, bookmarks: ['JHN.3.16'], highlights: ['PSA.23.1'], notes: { 'ROM.8.28': 'my note' }, showHeadings: false }, version: 0 }) }));
  }
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
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);

  console.log('First start after the update (was reading the BSB at Psalm 23)');
  const h = await header(page), v1 = await verse(page, 1);
  check('opens the King James Version, at the same place', h === 'King James Version · tap to change' && /The LORD is my shepherd; I shall not want\./.test(v1 || ''), [h, v1]);
  const title = await page.evaluate(() => [...document.querySelectorAll('p.italic')].map(p => p.textContent));
  check('the psalm title shows as a heading', title.includes('A Psalm of David.'), title);
  const saved = await page.evaluate(() => window.QuietBibleStorage.getItem('qb-translation'));
  check('the old BSB choice is forgotten (nothing points at a missing translation)', saved === null || saved === 'KJV', saved);
  const langs = await page.evaluate(() => window.__langs);
  check('speech is told the text is English', langs[langs.length - 1] === 'en', langs);
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const heard = await page.evaluate(() => ({ spoken: window.__spoken[0], sub: window.__transport[window.__transport.length - 1] }));
  check('reads the KJV aloud; lock screen says King James Version', /^PSA\.23\.1\|A Psalm of David\. The LORD is my shepherd/.test(heard.spoken || '') && /^King James Version · verse/.test(heard.sub || ''), heard);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));

  console.log('Library kept');
  await page.getByRole('button', { name: 'Library', exact: true }).click(); await page.waitForTimeout(600);
  const notes = await page.evaluate(() => document.body.innerText);
  await page.getByRole('button', { name: 'bookmarks', exact: true }).click(); await page.waitForTimeout(400);
  const marks = await page.evaluate(() => document.body.innerText);
  await page.screenshot({ path: '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/kjv-library.png' });
  await page.getByRole('button', { name: 'highlights', exact: true }).click(); await page.waitForTimeout(400);
  const lights = await page.evaluate(() => document.body.innerText);
  check('bookmark, highlight and note are all still there, now showing KJV words', /Romans 8:28[\s\S]*my note/.test(notes)
        && /John 3:16[\s\S]*only begotten Son/.test(marks) && /Psalms 23:1[\s\S]*shepherd; I shall not want/.test(lights), [marks.slice(150, 330), lights.slice(150, 330)]);

  console.log('Search');
  await page.getByRole('button', { name: 'Search', exact: true }).click(); await page.waitForTimeout(400);
  await page.locator('input').first().fill('love one another'); await page.waitForTimeout(1500);
  const hits = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText).filter(t => /\d+:\d+/.test(t)));
  check('search runs over the KJV text', hits.some(t => /^John 13:34[\s\S]*That ye love one another/.test(t)), hits.slice(0, 2));

  console.log('Settings');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const radios = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Translation"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.textContent));
  check('only the KJV is listed, chosen, with no remove button', radios.join() === '*King James VersionKJV' && !(await page.evaluate(() => /Remove/.test(document.querySelector('[aria-label="Translation"]').closest('section').innerText))), radios);
  const settingsText = await page.evaluate(() => document.body.innerText);
  check('no "Section headings" switch (nothing has headings now)', !/Section headings/.test(settingsText), null);
  check('About names the KJV as the main text, with its public-domain status (v1.4.0: the BSB is built in again, beside it)', /King James Version \(1769 standard text\), is built in and is the main text/.test(settingsText) && /Berean Standard Bible is built in beside it/.test(settingsText), null);
  await page.evaluate(() => [...document.querySelectorAll('h2')].find(h => /About Quiet Bible/.test(h.textContent)).scrollIntoView({ block: 'center' }));
  await page.screenshot({ path: '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/kjv-about.png' });

  console.log('Adding and removing another translation still returns to the KJV');
  await page.evaluate(() => document.querySelector('[aria-label="Translation"]').scrollIntoView({ block: 'center' }));
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(500);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);
  check('Reina-Valera opened', /Reina-Valera 1909 · tap to change/.test(await header(page) || ''), await header(page));
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  await page.getByRole('button', { name: /Remove Reina-Valera/ }).click().catch(async () => { await page.click('text=Remove'); });
  await page.waitForTimeout(300);
  const confirm = page.getByRole('button', { name: /^Remove$/ });
  if (await confirm.count()) await confirm.first().click();
  await page.waitForEvent('load').catch(() => {}); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  check('after removing it, back to the KJV', (await header(page)) === 'King James Version · tap to change', await header(page));
  check('no script errors', errors.length === 0, errors);
  await b.close();

  console.log('A phone that had chosen the KJV added from a file');
  const b2 = await chromium.launch(); const ctx2 = await b2.newContext({ viewport: { width: 412, height: 915 } });
  await ctx2.addInitScript('window.__seedTr = "KJV";'); await ctx2.addInitScript(init);
  const p2 = await ctx2.newPage(); const e2 = []; p2.on('pageerror', e => e2.push(String(e)));
  await p2.goto('http://127.0.0.1:8765/index.html'); await p2.waitForSelector('#v-1'); await p2.waitForTimeout(800);
  check('keeps reading the KJV, now the built-in one', (await header(p2)) === 'King James Version · tap to change' && /The LORD is my shepherd/.test(await verse(p2, 1) || '') && e2.length === 0, [await header(p2), e2]);
  await b2.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
