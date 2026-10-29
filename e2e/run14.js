// Vietnamese: add the 1934 Bible from a file; read, search (with and without accents), references, voices. Fake native side keeps its
// "disk" in sessionStorage so it survives the page reload that switching translations does.
const { chromium } = require('playwright');
const PACK = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/viepack';
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
        SS.setItem('__tr', JSON.stringify([{id:'VIE1934',name:'Kinh Thánh 1934 (Bản Truyền Thống)',abbr:'VIE1934',lang:'vi',builtIn:false}]));
        window.__qbTranslationAdded({ok:true,id:'VIE1934',name:'Kinh Thánh 1934 (Bản Truyền Thống)'}); }, 300); return true; },
    removeTranslation: function(id){ SS.setItem('__tr', JSON.stringify(installed().filter(function(t){return t.id!==id}))); return true; } };
  window.QuietBibleStorage = {
    getItem: function(k){ var d=disk(); return Object.prototype.hasOwnProperty.call(d,k) ? d[k] : null; },
    setItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); }, commitItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); },
    removeItem: function(k){ var d=disk(); delete d[k]; save(d); } };
  window.__spoken = []; window.__transport = []; var t=null;
  window.__langs = JSON.parse(SS.getItem('__langs') || '[]');
  window.QuietBibleSpeech = { ready: function(){ return true; },
    setLanguage: function(l){ window.__langs.push(l); SS.setItem('__langs', JSON.stringify(window.__langs)); window.__lang = l; },
    naturalSpeaksLanguage: function(){ return (window.__lang || 'en') === 'en' || SS.getItem('__vivoice') === '1'; },
    getVoice: function(){ return (window.__lang || 'en') === 'en' ? 'john' : (SS.getItem('__vivoice') === '1' ? 'vais' : 'system'); },
    voices: function(){ var v=[{id:'john',name:'John',note:'Male',lang:'en',builtIn:true}]; if (SS.getItem('__vivoice') === '1') v.push({id:'vais',name:'Vais',note:'Female · Vietnamese',lang:'vi',builtIn:false}); return JSON.stringify(v); },
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
  await ctx.route('**/translations/VIE1934/**', route => {
    const rel = route.request().url().split('/translations/VIE1934/')[1]; const f = PACK + '/' + rel;
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  const NAME = 'Kinh Thánh 1934 (Bản Truyền Thống)';

  console.log('Adding the Vietnamese Bible');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(500);
  const added = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('added, then the app opens it', (added || '').includes(NAME + ' added'), added);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);

  console.log('Reading');
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  const v1 = await verse(page, 1), h = await header(page);
  check('Sáng Thế Ký 1:1 in Vietnamese, header names the translation', /Ban đầu Đức Chúa Trời dựng nên trời đất\./.test(v1 || '') && h === NAME + ' · tap to change', [v1, h]);
  const langs = await page.evaluate(() => window.__langs);
  check('the speech side is told the text is Vietnamese', langs[langs.length - 1] === 'vi', langs);
  const title = await page.evaluate(() => [...document.querySelectorAll('h1,h2')].map(e => e.textContent).join('|'));
  check('chapter heading in Vietnamese', /Sáng Thế Ký 1/.test(title), title);
  await page.click('text=tap to change'); await page.waitForTimeout(300);
  const names = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('book names in Vietnamese', names[0].startsWith('Sáng Thế Ký') && names[1].startsWith('Xuất Ê-díp-tô Ký') && names[18].startsWith('Thi Thiên'), [names[0], names[1], names[18]]);
  await page.getByRole('button', { name: 'New Testament', exact: true }).click(); await page.waitForTimeout(200);
  const nt = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('New Testament names too', nt[0].startsWith('Ma-thi-ơ') && nt[3].startsWith('Giăng') && nt[nt.length - 1].startsWith('Khải Huyền'), [nt[0], nt[3], nt[nt.length - 1]]);
  await page.screenshot({ path: SHOTS + 'vi-books.png' });
  await page.keyboard.press('Escape').catch(() => {});
  await page.getByRole('button', { name: 'Close', exact: true }).first().click().catch(() => {});
  await goTo(page, 'New Testament', 'Giăng', 3);
  const j316 = await verse(page, 16);
  check('Giăng 3:16', /Vì Đức Chúa Trời yêu thương thế gian/.test(j316 || ''), j316);
  await goTo(page, 'Old Testament', 'Sáng Thế Ký', 22);
  const g222 = await verse(page, 2), g221 = await verse(page, 1);
  check('names keep their accents (Áp-ra-ham), no stray verse markers', /Áp-ra-ham/.test(g221 || '') && !/Ap-ra-ham|\(\d/.test(g221 + g222), g221);
  await goTo(page, 'Old Testament', 'Thi Thiên', 23);
  const ps = await verse(page, 1);
  check('Thi Thiên 23:1', /Đức Giê-hô-va là Đấng chăn giữ tôi/.test(ps || ''), ps);
  await page.screenshot({ path: SHOTS + 'vi-ps23.png' });

  console.log('Search and references');
  await page.getByRole('button', { name: 'Search', exact: true }).click(); await page.waitForTimeout(400);
  const refLabel = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(800);
    return page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /Go to reference/.test(b.textContent)); return b ? b.querySelectorAll('span')[1].textContent : null; }); };
  const refs = {};
  for (const q of ['Giăng 3:16', 'Giang 3:16', 'Thi Thiên 23', 'Thi Thien 23', 'Rô-ma 8:28', 'Rô 8:28', 'Đa-ni-ên 6', 'Da-ni-en 6', '1 Giăng 4:8', 'John 3:16']) refs[q] = await refLabel(q);
  check('references with Vietnamese names or abbreviations, with or without accents, or English names',
        refs['Giăng 3:16'] === 'Giăng 3:16' && refs['Giang 3:16'] === 'Giăng 3:16' && refs['Thi Thiên 23'] === 'Thi Thiên 23' && refs['Thi Thien 23'] === 'Thi Thiên 23'
        && refs['Rô-ma 8:28'] === 'Rô-ma 8:28' && refs['Rô 8:28'] === 'Rô-ma 8:28' && refs['Đa-ni-ên 6'] === 'Đa-ni-ên 6' && refs['Da-ni-en 6'] === 'Đa-ni-ên 6'
        && refs['1 Giăng 4:8'] === '1 Giăng 4:8' && refs['John 3:16'] === 'Giăng 3:16', refs);
  const hitsFor = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(1500);
    return page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText).filter(t => /\d+:\d+/.test(t))); };
  let hits = await hitsFor('chăn giữ tôi');
  check('search with accents', hits.some(t => /^Thi Thiên 23:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor('chan giu toi');
  check('search typed without accents still finds it', hits.some(t => /^Thi Thiên 23:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor('Đức Chúa Trời yêu thương thế gian');
  check('a longer phrase', hits.some(t => /^Giăng 3:16/.test(t)), hits.slice(0, 2));
  await page.getByRole('button', { name: 'Read', exact: true }).click(); await page.waitForTimeout(400);

  console.log('Listening');
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const heard = await page.evaluate(() => ({ spoken: window.__spoken[0], sub: window.__transport[window.__transport.length - 1] }));
  check('reads the Vietnamese text aloud; lock screen names the translation', /^PSA\.23\.1\|Đức Giê-hô-va là Đấng chăn giữ tôi/.test(heard.spoken || '') && (heard.sub || '').startsWith(NAME + ' · verse'), heard);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const hint = await page.evaluate(() => (document.querySelector('[data-qb-voice-hint]') || {}).textContent);
  check('no Vietnamese voice yet: says so, and the phone voice reads', /no natural Vietnamese voice on this phone yet/.test(hint || ''), hint);
  await page.evaluate(() => sessionStorage.setItem('__vivoice', '1'));
  await page.reload(); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const radios = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Voice"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.querySelector('span').textContent));
  check('with the Vietnamese voice added, it is listed and chosen', radios.join() === '*Vais,Phone voice', radios);
  await page.evaluate(() => document.querySelector('[aria-label="Voice"]').scrollIntoView({ block: 'center' }));
  await page.screenshot({ path: SHOTS + 'vi-voice.png' });
  await page.click('[aria-label="Translation"] [role="radio"]:has-text("King James")');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  const back = await page.evaluate(() => window.__langs);
  check('back to the KJV: speech is told English again', back[back.length - 1] === 'en' && /The LORD is my shepherd/.test(await verse(page, 1) || ''), back.slice(-3));
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
