// Portuguese: add the Bíblia Livre from a file; read (psalm titles), search, references (Jo/Jó/Jn), voices. Fake native side keeps its
// "disk" in sessionStorage so it survives the page reload that switching translations does.
const { chromium } = require('playwright');
const PACK = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/blvpack';
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
        SS.setItem('__tr', JSON.stringify([{id:'BLIVRE',name:'Bíblia Livre (Almeida)',abbr:'BLIVRE',lang:'pt',builtIn:false}]));
        window.__qbTranslationAdded({ok:true,id:'BLIVRE',name:'Bíblia Livre (Almeida)'}); }, 300); return true; },
    removeTranslation: function(id){ SS.setItem('__tr', JSON.stringify(installed().filter(function(t){return t.id!==id}))); return true; } };
  window.QuietBibleStorage = {
    getItem: function(k){ var d=disk(); return Object.prototype.hasOwnProperty.call(d,k) ? d[k] : null; },
    setItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); }, commitItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); },
    removeItem: function(k){ var d=disk(); delete d[k]; save(d); } };
  window.__spoken = []; window.__transport = []; var t=null;
  window.__langs = JSON.parse(SS.getItem('__langs') || '[]');
  window.QuietBibleSpeech = { ready: function(){ return true; },
    setLanguage: function(l){ window.__langs.push(l); SS.setItem('__langs', JSON.stringify(window.__langs)); window.__lang = l; },
    naturalSpeaksLanguage: function(){ return (window.__lang || 'en') === 'en' || SS.getItem('__ptvoice') === '1'; },
    getVoice: function(){ return (window.__lang || 'en') === 'en' ? 'john' : (SS.getItem('__ptvoice') === '1' ? 'faber' : 'system'); },
    voices: function(){ var v=[{id:'john',name:'John',note:'Male',lang:'en',builtIn:true}]; if (SS.getItem('__ptvoice') === '1') v.push({id:'faber',name:'Faber',note:'Male · Brazilian Portuguese',lang:'pt',builtIn:false}); return JSON.stringify(v); },
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
  await ctx.route('**/translations/BLIVRE/**', route => {
    const rel = route.request().url().split('/translations/BLIVRE/')[1]; const f = PACK + '/' + rel;
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  const NAME = 'Bíblia Livre (Almeida)';

  console.log('Adding the Bíblia Livre');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(500);
  const added = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('added, then the app opens it', (added || '').includes(NAME + ' added'), added);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);

  console.log('Reading');
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  const v1 = await verse(page, 1), h = await header(page);
  check('Gênesis 1:1 in Portuguese, header names the translation', /No princípio criou Deus os céus e a terra\./.test(v1 || '') && h === NAME + ' · tap to change', [v1, h]);
  const langs = await page.evaluate(() => window.__langs);
  check('the speech side is told the text is Portuguese', langs[langs.length - 1] === 'pt', langs);
  check('left to right (no right-to-left flag)', !(await page.evaluate(() => document.documentElement.hasAttribute('data-qb-rtl'))), null);
  await page.click('text=tap to change'); await page.waitForTimeout(300);
  const names = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('book names in Portuguese', names[0].startsWith('Gênesis') && names[17].startsWith('Jó') && names[18].startsWith('Salmos'), [names[0], names[17], names[18]]);
  await page.getByRole('button', { name: 'New Testament', exact: true }).click(); await page.waitForTimeout(200);
  const nt = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('New Testament names too', nt[0].startsWith('Mateus') && nt[3].startsWith('João') && nt[nt.length - 1].startsWith('Apocalipse'), [nt[0], nt[3], nt[nt.length - 1]]);
  await page.keyboard.press('Escape').catch(() => {});
  await page.getByRole('button', { name: 'Close', exact: true }).first().click().catch(() => {});
  await goTo(page, 'Old Testament', 'Salmos', 23);
  const ps = await verse(page, 1), psTitle = await page.evaluate(() => [...document.querySelectorAll('p.italic')].map(p => p.textContent));
  check('Salmo 23: "Salmo de Davi." set apart, verse 1 below it', psTitle.includes('Salmo de Davi.') && /^1O SENHOR é meu pastor, nada me faltará\.$/.test((ps || '').trim()), { psTitle, ps });
  await page.screenshot({ path: SHOTS + 'pt-ps23.png' });
  await goTo(page, 'Old Testament', 'Salmos', 46);
  const p46 = [await verse(page, 2), await verse(page, 3)];
  check('Salmo 46: verses 2 and 3 both there', /ao interior dos mares;$/.test((p46[0] || '').trim()) && /^3Ainda que suas águas rujam/.test(p46[1] || ''), p46);

  console.log('Search and references');
  await page.getByRole('button', { name: 'Search', exact: true }).click(); await page.waitForTimeout(400);
  const refLabel = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(800);
    return page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /Go to reference/.test(b.textContent)); return b ? b.querySelectorAll('span')[1].textContent : null; }); };
  const refs = {};
  for (const q of ['João 3:16', 'Jo 3:16', 'Joao 3:16', 'Jó 1', 'Jn 1', 'Sl 23', 'Salmos 23', '1Co 13', '1 Co 13', 'Gn 1', 'Apocalipse 22', 'John 3:16', 'Psalm 23']) refs[q] = await refLabel(q);
  check('references: Jo = João, Jó = Jó, Jn = Jonas, accents optional, English names still work',
        refs['João 3:16'] === 'João 3:16' && refs['Jo 3:16'] === 'João 3:16' && refs['Joao 3:16'] === 'João 3:16' && refs['Jó 1'] === 'Jó 1' && refs['Jn 1'] === 'Jonas 1'
        && refs['Sl 23'] === 'Salmos 23' && refs['Salmos 23'] === 'Salmos 23' && refs['1Co 13'] === '1 Coríntios 13' && refs['1 Co 13'] === '1 Coríntios 13'
        && refs['Gn 1'] === 'Gênesis 1' && refs['Apocalipse 22'] === 'Apocalipse 22' && refs['John 3:16'] === 'João 3:16' && refs['Psalm 23'] === 'Salmos 23', refs);
  const hitsFor = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(1500);
    return page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText).filter(t => /\d+:\d+/.test(t))); };
  let hits = await hitsFor('O SENHOR é meu pastor');
  check('search exactly as printed', hits.some(t => /^Salmos 23:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor('o senhor e meu pastor');
  check('search typed plainly (no accents or capitals)', hits.some(t => /^Salmos 23:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor('Deus amou ao mundo');
  check('a phrase from João 3:16', hits.some(t => /^João 3:16/.test(t)), hits.slice(0, 2));
  await page.getByRole('button', { name: 'Read', exact: true }).click(); await page.waitForTimeout(400);

  console.log('Listening');
  await goTo(page, 'Old Testament', 'Salmos', 23);
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const heard = await page.evaluate(() => ({ spoken: window.__spoken[0], sub: window.__transport[window.__transport.length - 1] }));
  check('reads the Portuguese text aloud, title included; lock screen names the translation', /^PSA\.23\.1\|Salmo de Davi\. O SENHOR é meu pastor/.test(heard.spoken || '') && (heard.sub || '').startsWith(NAME + ' · verse'), heard);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const hint = await page.evaluate(() => (document.querySelector('[data-qb-voice-hint]') || {}).textContent);
  check('no Portuguese voice yet: says so, and the phone voice reads', /no natural Portuguese voice on this phone yet/.test(hint || ''), hint);
  await page.evaluate(() => sessionStorage.setItem('__ptvoice', '1'));
  await page.reload(); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const radios = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Voice"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.querySelector('span').textContent));
  check('with a Portuguese voice added, it is listed and chosen', radios.join() === '*Faber,Phone voice', radios);
  await page.click('[aria-label="Translation"] [role="radio"]:has-text("King James")');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  const back = await page.evaluate(() => window.__langs);
  check('back to the KJV: speech is told English again', back[back.length - 1] === 'en', back.slice(-3));
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
