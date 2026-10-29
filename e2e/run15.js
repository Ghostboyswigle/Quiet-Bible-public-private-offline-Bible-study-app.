// French: add the Louis Segond 1910 from a file; read (Segond numbering, psalm titles, words of Jesus), search, references, voices. Fake native side keeps its
// "disk" in sessionStorage so it survives the page reload that switching translations does.
const { chromium } = require('playwright');
const PACK = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/lsgpack';
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
        SS.setItem('__tr', JSON.stringify([{id:'LSG',name:'Louis Segond 1910',abbr:'LSG',lang:'fr',builtIn:false}]));
        window.__qbTranslationAdded({ok:true,id:'LSG',name:'Louis Segond 1910'}); }, 300); return true; },
    removeTranslation: function(id){ SS.setItem('__tr', JSON.stringify(installed().filter(function(t){return t.id!==id}))); return true; } };
  window.QuietBibleStorage = {
    getItem: function(k){ var d=disk(); return Object.prototype.hasOwnProperty.call(d,k) ? d[k] : null; },
    setItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); }, commitItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); },
    removeItem: function(k){ var d=disk(); delete d[k]; save(d); } };
  window.__spoken = []; window.__transport = []; var t=null;
  window.__langs = JSON.parse(SS.getItem('__langs') || '[]');
  window.QuietBibleSpeech = { ready: function(){ return true; },
    setLanguage: function(l){ window.__langs.push(l); SS.setItem('__langs', JSON.stringify(window.__langs)); window.__lang = l; },
    naturalSpeaksLanguage: function(){ return (window.__lang || 'en') === 'en' || SS.getItem('__frvoice') === '1'; },
    getVoice: function(){ return (window.__lang || 'en') === 'en' ? 'john' : (SS.getItem('__frvoice') === '1' ? 'siwis' : 'system'); },
    voices: function(){ var v=[{id:'john',name:'John',note:'Male',lang:'en',builtIn:true}]; if (SS.getItem('__frvoice') === '1') v.push({id:'pierre',name:'Pierre',note:'Male · French',lang:'fr',builtIn:false},{id:'siwis',name:'Siwis',note:'Female · French',lang:'fr',builtIn:false}); return JSON.stringify(v); },
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
  await ctx.route('**/translations/LSG/**', route => {
    const rel = route.request().url().split('/translations/LSG/')[1]; const f = PACK + '/' + rel;
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  const NAME = 'Louis Segond 1910';

  console.log('Adding the Louis Segond');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(500);
  const added = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('added, then the app opens it', (added || '').includes(NAME + ' added'), added);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);

  console.log('Reading');
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  const v1 = await verse(page, 1), h = await header(page);
  check('Genèse 1:1 in French, header names the translation', /Au commencement, Dieu créa les cieux et la terre\./.test(v1 || '') && h === NAME + ' · tap to change', [v1, h]);
  const langs = await page.evaluate(() => window.__langs);
  check('the speech side is told the text is French', langs[langs.length - 1] === 'fr', langs);
  await page.click('text=tap to change'); await page.waitForTimeout(300);
  const names = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('book names in French', names[0].startsWith('Genèse') && names[18].startsWith('Psaumes') && names[21].startsWith('Cantique des Cantiques'), [names[0], names[18], names[21]]);
  await page.getByRole('button', { name: 'New Testament', exact: true }).click(); await page.waitForTimeout(200);
  const nt = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('New Testament names too', nt[0].startsWith('Matthieu') && nt[3].startsWith('Jean') && nt[nt.length - 1].startsWith('Apocalypse'), [nt[0], nt[3], nt[nt.length - 1]]);
  await page.keyboard.press('Escape').catch(() => {});
  await page.getByRole('button', { name: 'Close', exact: true }).first().click().catch(() => {});
  await goTo(page, 'New Testament', 'Jean', 14);
  const jesus = await page.evaluate(() => { const el = document.getElementById('v-6'); return el ? { text: el.textContent, red: !!el.querySelector('.text-jesus') } : null; });
  check('Jean 14:6, words of Jesus marked', jesus && /Je suis le chemin, la vérité, et la vie/.test(jesus.text) && jesus.red, jesus);
  await goTo(page, 'Old Testament', 'Psaumes', 23);
  const ps = await verse(page, 1);
  const psTitle = await page.evaluate(() => [...document.querySelectorAll('p.italic')].map(p => p.textContent));
  check('Psaume 23: "Cantique de David." as a heading, verse 1 below it', psTitle.includes('Cantique de David.') && /^1L’Éternel est mon berger: je ne manquerai de rien\.$/.test((ps || '').trim()), { psTitle, ps });
  await page.screenshot({ path: SHOTS + 'fr-ps23.png' });
  await goTo(page, 'Old Testament', 'Malachie', 4);
  const mal = await verse(page, 5);
  check('Segond numbering kept: Malachie 4:5 (Élie)', /je vous enverrai Élie/.test(mal || ''), mal);
  await goTo(page, 'Old Testament', 'Psaumes', 3);
  const p3 = [await verse(page, 1), await verse(page, 9)];
  check('Psaume 3: title is verse 1, as Segond prints it (9 verses)', /^1Psaume de David\./.test(p3[0] || '') && /Le salut est auprès de l’Éternel/.test(p3[1] || ''), p3);

  console.log('Search and references');
  await page.getByRole('button', { name: 'Search', exact: true }).click(); await page.waitForTimeout(400);
  const refLabel = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(800);
    return page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /Go to reference/.test(b.textContent)); return b ? b.querySelectorAll('span')[1].textContent : null; }); };
  const refs = {};
  for (const q of ['Jean 3:16', 'Jn 3:16', 'Psaumes 23', 'Ps 23', 'Ésaïe 53', 'Esaie 53', 'Genese 1', '1 Co 13', '1 Corinthiens 13:4', 'Hé 11', 'John 3:16']) refs[q] = await refLabel(q);
  check('references with French names or abbreviations, with or without accents, or English names',
        refs['Jean 3:16'] === 'Jean 3:16' && refs['Jn 3:16'] === 'Jean 3:16' && refs['Psaumes 23'] === 'Psaumes 23' && refs['Ps 23'] === 'Psaumes 23'
        && refs['Ésaïe 53'] === 'Ésaïe 53' && refs['Esaie 53'] === 'Ésaïe 53' && refs['Genese 1'] === 'Genèse 1' && refs['1 Co 13'] === '1 Corinthiens 13'
        && refs['1 Corinthiens 13:4'] === '1 Corinthiens 13:4' && refs['Hé 11'] === 'Hébreux 11' && refs['John 3:16'] === 'Jean 3:16', refs);
  const hitsFor = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(1500);
    return page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText).filter(t => /\d+:\d+/.test(t))); };
  let hits = await hitsFor('L’Éternel est mon berger');
  check('search exactly as printed', hits.some(t => /^Psaumes 23:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor("l'eternel est mon berger");
  check('search typed plainly (straight apostrophe, no accents) still finds it', hits.some(t => /^Psaumes 23:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor('Dieu a tant aimé le monde');
  check('a phrase from Jean 3:16', hits.some(t => /^Jean 3:16/.test(t)), hits.slice(0, 2));
  await page.getByRole('button', { name: 'Read', exact: true }).click(); await page.waitForTimeout(400);

  console.log('Listening');
  await goTo(page, 'Old Testament', 'Psaumes', 23);
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const heard = await page.evaluate(() => ({ spoken: window.__spoken[0], sub: window.__transport[window.__transport.length - 1] }));
  check('reads the French text aloud, title included; lock screen names the translation', /^PSA\.23\.1\|Cantique de David\. L’Éternel est mon berger/.test(heard.spoken || '') && (heard.sub || '').startsWith(NAME + ' · verse'), heard);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const hint = await page.evaluate(() => (document.querySelector('[data-qb-voice-hint]') || {}).textContent);
  check('no French voice yet: says so, and the phone voice reads', /no natural French voice on this phone yet/.test(hint || ''), hint);
  await page.evaluate(() => sessionStorage.setItem('__frvoice', '1'));
  await page.reload(); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const radios = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Voice"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.querySelector('span').textContent));
  check('both French voices listed, one chosen', radios.join() === 'Pierre,*Siwis,Phone voice', radios);
  await page.evaluate(() => document.querySelector('[aria-label="Voice"]').scrollIntoView({ block: 'center' }));
  await page.screenshot({ path: SHOTS + 'fr-voice.png' });
  await page.click('[aria-label="Translation"] [role="radio"]:has-text("King James")');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  const back = await page.evaluate(() => window.__langs);
  check('back to the KJV: speech is told English again', back[back.length - 1] === 'en', back.slice(-3));
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
