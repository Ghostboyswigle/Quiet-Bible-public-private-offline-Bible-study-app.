// Russian: add the Synodal from a file; Synodal numbering (Psalm 22), search in Cyrillic, references the way Russians write them, voices. Fake native side keeps its
// "disk" in sessionStorage so it survives the page reload that switching translations does.
const { chromium } = require('playwright');
const PACK = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/rstpack';
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
        SS.setItem('__tr', JSON.stringify([{id:'RST',name:'Синодальный перевод',abbr:'RST',lang:'ru',builtIn:false}]));
        window.__qbTranslationAdded({ok:true,id:'RST',name:'Синодальный перевод'}); }, 300); return true; },
    removeTranslation: function(id){ SS.setItem('__tr', JSON.stringify(installed().filter(function(t){return t.id!==id}))); return true; } };
  window.QuietBibleStorage = {
    getItem: function(k){ var d=disk(); return Object.prototype.hasOwnProperty.call(d,k) ? d[k] : null; },
    setItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); }, commitItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); },
    removeItem: function(k){ var d=disk(); delete d[k]; save(d); } };
  window.__spoken = []; window.__transport = []; var t=null;
  window.__langs = JSON.parse(SS.getItem('__langs') || '[]');
  window.QuietBibleSpeech = { ready: function(){ return true; },
    setLanguage: function(l){ window.__langs.push(l); SS.setItem('__langs', JSON.stringify(window.__langs)); window.__lang = l; },
    naturalSpeaksLanguage: function(){ return (window.__lang || 'en') === 'en' || SS.getItem('__ruvoice') === '1'; },
    getVoice: function(){ return (window.__lang || 'en') === 'en' ? 'john' : (SS.getItem('__ruvoice') === '1' ? 'denis' : 'system'); },
    voices: function(){ var v=[{id:'john',name:'John',note:'Male',lang:'en',builtIn:true}]; if (SS.getItem('__ruvoice') === '1') v.push({id:'denis',name:'Denis',note:'Male · Russian',lang:'ru',builtIn:false}); return JSON.stringify(v); },
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

const SHOTS = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/';
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 412, height: 915 }, locale: 'en-US' });
  await ctx.addInitScript(init);
  await ctx.route('**/translations/RST/**', route => {
    const rel = route.request().url().split('/translations/RST/')[1]; const f = PACK + '/' + rel;
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  const NAME = 'Синодальный перевод';

  console.log('Adding the Synodal');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(500);
  const added = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('added, then the app opens it', (added || '').includes(NAME + ' added'), added);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);

  console.log('Reading');
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  const v1 = await verse(page, 1), h = await header(page);
  check('Бытие 1:1 in Russian, header names the translation', /В начале сотворил Бог небо и землю\./.test(v1 || '') && h === NAME + ' · tap to change', [v1, h]);
  const langs = await page.evaluate(() => window.__langs);
  check('the speech side is told the text is Russian; left to right', langs[langs.length - 1] === 'ru' && !(await page.evaluate(() => document.documentElement.hasAttribute('data-qb-rtl'))), langs);
  await page.click('text=tap to change'); await page.waitForTimeout(300);
  const names = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('book names in Russian', names[0].startsWith('Бытие') && names[8].startsWith('1-я Царств') && names[18].startsWith('Псалтирь'), [names[0], names[8], names[18]]);
  await page.getByRole('button', { name: 'New Testament', exact: true }).click(); await page.waitForTimeout(200);
  const nt = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('New Testament names too', nt[0].startsWith('От Матфея') && nt[3].startsWith('От Иоанна') && nt[nt.length - 1].startsWith('Откровение'), [nt[0], nt[3], nt[nt.length - 1]]);
  await page.keyboard.press('Escape').catch(() => {});
  await page.getByRole('button', { name: 'Close', exact: true }).first().click().catch(() => {});
  await goTo(page, 'Old Testament', 'Псалтирь', 22);
  const ps = await verse(page, 1), psTitle = await page.evaluate(() => [...document.querySelectorAll('p.italic')].map(p => p.textContent));
  check('Synodal numbering: Псалом 22 is "Господь — Пастырь мой", title set apart', psTitle.includes('Псалом Давида.') && /^1Господь — Пастырь мой; я ни в чем не буду нуждаться:$/.test((ps || '').trim()), { psTitle, ps });
  await page.screenshot({ path: SHOTS + 'ru-ps22.png' });
  await goTo(page, 'Old Testament', 'Даниил', 3);
  const d3 = await page.evaluate(() => [...document.querySelectorAll('p[id^="v-"]')].length);
  check('Даниил 3 as in canonical Synodal editions (33 verses, no Greek additions)', d3 === 33, d3);
  await goTo(page, 'New Testament', 'От Иоанна', 3);
  check('От Иоанна 3:16', /Ибо так возлюбил Бог мир/.test(await verse(page, 16) || ''), await verse(page, 16));

  console.log('Search and references');
  await page.getByRole('button', { name: 'Search', exact: true }).click(); await page.waitForTimeout(400);
  const refLabel = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(800);
    return page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /Go to reference/.test(b.textContent)); return b ? b.querySelectorAll('span')[1].textContent : null; }); };
  const refs = {};
  for (const q of ['Ин 3:16', 'Иоанна 3:16', 'От Иоанна 3:16', 'Пс 22', 'Псалтирь 22', 'Быт 1', '1Кор 13', '1 Кор 13', '1 Коринфянам 13', 'Римлянам 8:28', 'Откр 22', '1Ин 4:8', 'John 3:16']) refs[q] = await refLabel(q);
  check('references the way Russians write them (Ин, Иоанна, 1 Коринфянам, Римлянам), and English names',
        refs['Ин 3:16'] === 'От Иоанна 3:16' && refs['Иоанна 3:16'] === 'От Иоанна 3:16' && refs['От Иоанна 3:16'] === 'От Иоанна 3:16' && refs['Пс 22'] === 'Псалтирь 22'
        && refs['Псалтирь 22'] === 'Псалтирь 22' && refs['Быт 1'] === 'Бытие 1' && refs['1Кор 13'] === '1-е Коринфянам 13' && refs['1 Кор 13'] === '1-е Коринфянам 13'
        && refs['1 Коринфянам 13'] === '1-е Коринфянам 13' && refs['Римлянам 8:28'] === 'К Римлянам 8:28' && refs['Откр 22'] === 'Откровение 22'
        && refs['1Ин 4:8'] === '1-е Иоанна 4:8' && refs['John 3:16'] === 'От Иоанна 3:16', refs);
  const hitsFor = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(1500);
    return page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText).filter(t => /\d+:\d+/.test(t))); };
  let hits = await hitsFor('Пастырь мой');
  check('search in Cyrillic', hits.some(t => /^Псалтирь 22:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor('так возлюбил бог мир');
  check('search ignores capital letters', hits.some(t => /^От Иоанна 3:16/.test(t)), hits.slice(0, 2));
  await page.getByRole('button', { name: 'Read', exact: true }).click(); await page.waitForTimeout(400);

  console.log('Listening');
  await goTo(page, 'Old Testament', 'Псалтирь', 22);
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const heard = await page.evaluate(() => ({ spoken: window.__spoken[0], sub: window.__transport[window.__transport.length - 1] }));
  check('reads the Russian text aloud, title included; lock screen names the translation', /^PSA\.22\.1\|Псалом Давида\. Господь — Пастырь мой/.test(heard.spoken || '') && (heard.sub || '').startsWith(NAME + ' · verse'), heard);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const hint = await page.evaluate(() => (document.querySelector('[data-qb-voice-hint]') || {}).textContent);
  check('no Russian voice yet: says so, and the phone voice reads', /no natural Russian voice on this phone yet/.test(hint || ''), hint);
  await page.evaluate(() => sessionStorage.setItem('__ruvoice', '1'));
  await page.reload(); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const radios = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Voice"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.querySelector('span').textContent));
  check('with a Russian voice added, it is listed and chosen', radios.join() === '*Denis,Phone voice', radios);
  await page.click('[aria-label="Translation"] [role="radio"]:has-text("King James")');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  const back = await page.evaluate(() => window.__langs);
  check('back to the KJV: speech is told English again', back[back.length - 1] === 'en', back.slice(-3));
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
