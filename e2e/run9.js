// Translations: add KJV from a file, read it, switch back, remove it. Fake native side keeps its
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
    const rel = route.request().url().split('/translations/RV1909/')[1];
    const f = PACK + '/' + rel;
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);

  console.log('Before: the built-in King James Version');
  check('reads the KJV, labelled as such', /God created the heaven and the earth/.test(await verse(page, 1)) && (await header(page)) === 'King James Version · tap to change', [await verse(page, 1), await header(page)]);

  console.log('Adding the Reina-Valera 1909');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  let radios = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Translation"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.textContent));
  check('Settings lists the built-in KJV', radios.join() === '*King James VersionKJV', radios);
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(100);
  const hintMsg = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('tapping Add says what to pick', /\.qbbible/.test(hintMsg || ''), hintMsg);
  await page.waitForTimeout(400);
  const added = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('Reina-Valera 1909 added, then the app opens it', /Reina-Valera 1909 added/.test(added || ''), added);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);

  console.log('Reading the Reina-Valera 1909');
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  const v1 = await verse(page, 1), h = await header(page);
  check('Génesis 1:1 in Spanish, header says Reina-Valera 1909', /En el principio crió Dios los cielos y la tierra\./.test(v1) && h === 'Reina-Valera 1909 · tap to change', [v1, h]);
  const langs = await page.evaluate(() => window.__langs);
  check('the speech side is told the text is Spanish', langs[langs.length - 1] === 'es', langs);
  await page.click('text=tap to change'); await page.waitForTimeout(300);
  const names = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /capítulos|chapters$/.test(t)).slice(0, 3));
  check('book names in Spanish', names[0] && names[0].startsWith('Génesis') && names[1].startsWith('Éxodo'), names);
  await page.keyboard.press('Escape').catch(() => {});
  await page.getByRole('button', { name: 'Close', exact: true }).first().click().catch(() => {});
  await goTo(page, 'New Testament', 'Juan', 3);
  const j316 = await verse(page, 16);
  check('Juan 3:16', /Porque de tal manera amó Dios al mundo/.test(j316 || ''), j316);
  await goTo(page, 'Old Testament', 'Salmos', 23);
  const ps = await verse(page, 1);
  check('Salmo 23:1 reads naturally (no shouting capitals)', /Jehová es mi pastor; nada me faltará\./.test(ps || '') && !/JEHOVÁ/.test(ps), ps);
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const heard = await page.evaluate(() => ({ spoken: window.__spoken[0], sub: window.__transport[window.__transport.length - 1] }));
  check('reads the Spanish text aloud; lock screen says Reina-Valera 1909', /^PSA\.23\.1\|Salmo de David\. Jehová es mi pastor/.test(heard.spoken) && /^Reina-Valera 1909 · verse/.test(heard.sub), heard);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const hint = await page.evaluate(() => (document.querySelector('[data-qb-voice-hint]') || {}).textContent);
  const radiosNo = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Voice"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.querySelector('span').textContent));
  check('no Spanish voice yet: English voices are hidden, the phone voice reads, and it says how to add one',
        /no natural Spanish voice on this phone yet, so your phone’s own voice reads the Reina-Valera 1909/.test(hint || '') && radiosNo.join() === '*Phone voice', { hint, radiosNo });
  await page.evaluate(() => sessionStorage.setItem('__esvoice', '1'));
  await page.reload(); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const radiosEs = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Voice"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.querySelector('span').textContent));
  const hintEs = await page.evaluate(() => (document.querySelector('[data-qb-voice-hint]') || {}).textContent);
  check('with a Spanish voice added, reading Spanish lists only Spanish voices, Ald chosen', radiosEs.join() === '*Ald,Phone voice' && /run entirely on this phone/.test(hintEs || ''), { radiosEs, hintEs });
  await page.evaluate(() => document.querySelector('[aria-label="Voice"]').scrollIntoView({ block: 'center' }));
  await page.screenshot({ path: '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/voice-es.png' });
  await page.click('[aria-label="Translation"] [role="radio"]:has-text("King James")');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  const back = await page.evaluate(() => window.__langs);
  check('back to the KJV: speech is told English again', back[back.length - 1] === 'en' && /The LORD is my shepherd/.test(await verse(page, 1) || ''), back.slice(-3));
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
