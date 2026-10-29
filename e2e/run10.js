// Chinese: add the CUV from a file, read it (book names, psalm titles, Chinese versification), voices. Fake native side keeps its
// "disk" in sessionStorage so it survives the page reload that switching translations does.
const { chromium } = require('playwright');
const PACK = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/cuvpack';
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
        SS.setItem('__tr', JSON.stringify([{id:'CUV',name:'Chinese Union Version (Traditional)',abbr:'CUV',lang:'zh',builtIn:false}]));
        window.__qbTranslationAdded({ok:true,id:'CUV',name:'Chinese Union Version (Traditional)'}); }, 300); return true; },
    removeTranslation: function(id){ SS.setItem('__tr', JSON.stringify(installed().filter(function(t){return t.id!==id}))); return true; } };
  window.QuietBibleStorage = {
    getItem: function(k){ var d=disk(); return Object.prototype.hasOwnProperty.call(d,k) ? d[k] : null; },
    setItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); }, commitItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); },
    removeItem: function(k){ var d=disk(); delete d[k]; save(d); } };
  window.__spoken = []; window.__transport = []; var t=null;
  window.__langs = JSON.parse(SS.getItem('__langs') || '[]');
  window.QuietBibleSpeech = { ready: function(){ return true; },
    setLanguage: function(l){ window.__langs.push(l); SS.setItem('__langs', JSON.stringify(window.__langs)); window.__lang = l; },
    naturalSpeaksLanguage: function(){ return (window.__lang || 'en') === 'en' || SS.getItem('__zhvoice') === '1'; },
    getVoice: function(){ return (window.__lang || 'en') === 'en' ? 'john' : (SS.getItem('__zhvoice') === '1' ? 'chaowen' : 'system'); },
    voices: function(){ var v=[{id:'john',name:'John',note:'Male',lang:'en',builtIn:true}]; if (SS.getItem('__zhvoice') === '1') v.push({id:'chaowen',name:'Chaowen',note:'Male · Mandarin',lang:'zh',builtIn:false},{id:'xiaoya',name:'Xiao Ya',note:'Female · Mandarin',lang:'zh',builtIn:false}); return JSON.stringify(v); },
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
  await ctx.route('**/translations/CUV/**', route => {
    const rel = route.request().url().split('/translations/CUV/')[1];
    const f = PACK + '/' + rel;
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);

  console.log('Adding the Chinese Union Version');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(500);
  const added = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('CUV added, then the app opens it', /Chinese Union Version \(Traditional\) added/.test(added || ''), added);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);

  console.log('Reading the CUV');
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  const v1 = await verse(page, 1), h = await header(page);
  check('創世記 1:1 in Chinese, header names the CUV', /起初神創造天地。/.test(v1 || '') && h === 'Chinese Union Version (Traditional) · tap to change', [v1, h]);
  const langs = await page.evaluate(() => window.__langs);
  check('the speech side is told the text is Chinese', langs[langs.length - 1] === 'zh', langs);
  const title = await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3,p,span,div')].map(e => e.textContent).find(t => /^創世記\s*1$/.test(t)) || [...document.querySelectorAll('h1,h2')].map(e => e.textContent).join('|'));
  check('chapter heading uses the Chinese book name', /創世記/.test(title || ''), title);
  await page.screenshot({ path: SHOTS + 'zh-gen1.png' });
  await page.click('text=tap to change'); await page.waitForTimeout(300);
  const names = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)).slice(0, 3));
  check('book names in Chinese', names[0] && names[0].startsWith('創世記') && names[1].startsWith('出埃及記'), names);
  await page.screenshot({ path: SHOTS + 'zh-books.png' });
  await page.keyboard.press('Escape').catch(() => {});
  await page.getByRole('button', { name: 'Close', exact: true }).first().click().catch(() => {});
  await goTo(page, 'New Testament', '約翰福音', 3);
  const j316 = await verse(page, 16);
  check('約翰福音 3:16', /神愛世人/.test(j316 || ''), j316);
  await goTo(page, 'New Testament', '約翰福音', 7);
  const j753 = await verse(page, 53), j752 = await verse(page, 52);
  check('John 7 ends at verse 52 (Chinese numbering), nothing blank', j752 && /加利利沒有出過先知/.test(j752) && j753 === null, [j752, j753]);
  await goTo(page, 'Old Testament', '詩篇', 23);
  const ps = await verse(page, 1);
  const psTitle = await page.evaluate(() => [...document.querySelectorAll('p.italic')].map(p => p.textContent));
  check('詩篇 23: title shown as a heading, verse 1 without it', psTitle.includes('（大衛的詩）') && /^1耶和華是我的牧者，我必不至缺乏。$/.test((ps || '').trim()), { psTitle, ps });
  await page.screenshot({ path: SHOTS + 'zh-ps23.png' });
  await page.getByRole('button', { name: 'Search', exact: true }).click(); await page.waitForTimeout(400);
  const search = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(1500);
    return page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText).filter(t => /\d+:\d+/.test(t))); };
  let hits = await search('牧者');
  check('search finds a two-character Chinese word', hits.some(t => /詩篇 23:1/.test(t)), hits.slice(0, 3));
  hits = await search('牧者 缺乏');
  check('search finds Chinese words that are apart in the verse', hits.some(t => /詩篇 23:1/.test(t)), hits.slice(0, 3));
  const refLabel = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(800);
    return page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /Go to reference/.test(b.textContent)); return b ? b.querySelectorAll('span')[1].textContent : null; }); };
  const refs = { '約 3:16': await refLabel('約 3:16'), '約翰福音3:16': await refLabel('約翰福音3:16'), '詩23': await refLabel('詩23'), '約壹 4：8': await refLabel('約壹 4：8'), 'John 3:16': await refLabel('John 3:16'), '1 John 4:8': await refLabel('1 John 4:8') };
  check('references typed with Chinese book names or abbreviations (or English) are understood',
        refs['約 3:16'] === '約翰福音 3:16' && refs['約翰福音3:16'] === '約翰福音 3:16' && refs['詩23'] === '詩篇 23'
        && refs['約壹 4：8'] === '約翰壹書 4:8' && refs['John 3:16'] === '約翰福音 3:16' && refs['1 John 4:8'] === '約翰壹書 4:8', refs);
  hits = await search('伯利恆');
  check('search reaches books not yet opened', hits.some(t => /^(路加福音|馬太福音|彌迦書|創世記|路得記)/.test(t)), hits.slice(0, 3));
  await page.screenshot({ path: SHOTS + 'zh-search.png' });
  await page.getByRole('button', { name: 'Read', exact: true }).click(); await page.waitForTimeout(400);
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const heard = await page.evaluate(() => ({ spoken: window.__spoken[0], sub: window.__transport[window.__transport.length - 1] }));
  check('reads the Chinese text aloud (title included); lock screen names the CUV', /^PSA\.23\.1\|（大衛的詩）耶和華是我的牧者/.test(heard.spoken || '') && /^Chinese Union Version \(Traditional\) · verse/.test(heard.sub || ''), heard);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const hint = await page.evaluate(() => (document.querySelector('[data-qb-voice-hint]') || {}).textContent);
  check('no Chinese voice yet: says so, and the phone voice reads', /no natural Chinese voice on this phone yet/.test(hint || ''), hint);
  await page.evaluate(() => sessionStorage.setItem('__zhvoice', '1'));
  await page.reload(); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const radiosZh = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Voice"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.querySelector('span').textContent));
  check('with Chinese voices added, only they are listed for the CUV, Chaowen chosen', radiosZh.join() === '*Chaowen,Xiao Ya,Phone voice', radiosZh);
  await page.evaluate(() => document.querySelector('[aria-label="Voice"]').scrollIntoView({ block: 'center' }));
  await page.screenshot({ path: SHOTS + 'zh-voices.png' });
  await page.click('[aria-label="Translation"] [role="radio"]:has-text("King James")');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  const back = await page.evaluate(() => window.__langs);
  check('back to the KJV: speech is told English again', back[back.length - 1] === 'en' && /The LORD is my shepherd/.test(await verse(page, 1) || ''), back.slice(-3));
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
