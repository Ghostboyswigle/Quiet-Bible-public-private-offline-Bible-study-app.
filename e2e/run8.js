// Translations: add KJV from a file, read it, switch back, remove it. Fake native side keeps its
// "disk" in sessionStorage so it survives the page reload that switching translations does.
const { chromium } = require('playwright');
const PACK = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/kjvpack';
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
    translations: function(){ return JSON.stringify([{id:'BSB',name:'Berean Standard Bible',abbr:'BSB',builtIn:true}].concat(installed())); },
    addTranslation: function(){ setTimeout(function(){
        if (window.__nextPick === 'bad') { window.__qbTranslationAdded({ok:false,error:"That file isn't a Quiet Bible translation."}); return; }
        SS.setItem('__tr', JSON.stringify([{id:'KJV',name:'King James Version',abbr:'KJV',builtIn:false}]));
        window.__qbTranslationAdded({ok:true,id:'KJV',name:'King James Version'}); }, 300); return true; },
    removeTranslation: function(id){ SS.setItem('__tr', JSON.stringify(installed().filter(function(t){return t.id!==id}))); return true; } };
  window.QuietBibleStorage = {
    getItem: function(k){ var d=disk(); return Object.prototype.hasOwnProperty.call(d,k) ? d[k] : null; },
    setItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); }, commitItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); },
    removeItem: function(k){ var d=disk(); delete d[k]; save(d); } };
  window.__spoken = []; window.__transport = []; var t=null;
  window.QuietBibleSpeech = { ready: function(){ return true; },
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
  await ctx.route('**/translations/KJV/**', route => {
    const rel = route.request().url().split('/translations/KJV/')[1];
    const f = PACK + '/' + rel;
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);

  console.log('Before: the Berean Standard Bible');
  check('reads the BSB, labelled as such', /heavens and the earth/.test(await verse(page, 1)) && (await header(page)) === 'Berean Standard Bible · tap to change', [await verse(page, 1), await header(page)]);

  console.log('Adding the KJV');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  let radios = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Translation"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.textContent));
  check('Settings lists the built-in BSB', radios.join() === '*Berean Standard BibleBSB', radios);
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(100);
  const hintMsg = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('tapping Add says what to pick', /\.qbbible/.test(hintMsg || ''), hintMsg);
  await page.waitForTimeout(400);
  const added = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('KJV added, then the app opens it', /King James Version added/.test(added || ''), added);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);

  console.log('Reading the KJV');
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  const v1 = await verse(page, 1), h = await header(page);
  check('Genesis 1:1 in the KJV, header says King James Version', /In the beginning God created the heaven and the earth\./.test(v1) && h === 'King James Version · tap to change', [v1, h]);
  const top = await page.evaluate(() => [...document.querySelectorAll('p')].map(p => p.textContent).find(t => /^Offline · private/.test(t)));
  check('app header names the KJV too', top === 'Offline · private · King James Version', top);
  // go to John 3 via the saved reading place, the way the app restores it
  await goTo(page, 'New Testament', 'John', 3);
  const j316 = await verse(page, 16);
  check('John 3:16 in the KJV', /only begotten Son/.test(j316 || ''), j316);
  await goTo(page, 'New Testament', 'Matthew', 17);
  const m1721 = await verse(page, 21), count = await page.evaluate(() => document.querySelectorAll('[id^="v-"]').length);
  check('KJV verses the BSB leaves out are there (Matthew 17:21, 27 verses)', /prayer and fasting/.test(m1721 || '') && count === 27, [m1721, count]);
  await goTo(page, 'Old Testament', 'Psalms', 3);
  const ps = await page.evaluate(() => { const v = document.getElementById('v-1'); const prev = v.previousElementSibling; return { title: prev && prev.textContent, verse: v.textContent, cls: v.className }; });
  check('Psalm titles shown in italics above verse 1, not repeated in the verse', /when he fled from Absalom/.test(ps.title || '') && !/Absalom/.test(ps.verse) && /pl-6/.test(ps.cls), ps);

  console.log('Listening in the KJV');
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const heard = await page.evaluate(() => ({ spoken: window.__spoken[0], sub: window.__transport[window.__transport.length - 1] }));
  check('reads the KJV text aloud (title included) and the lock screen says King James Version', /^PSA\.3\.1\|A Psalm of David, when he fled from Absalom his son\. LORD, how are they increased/.test(heard.spoken) && /^King James Version · verse/.test(heard.sub), heard);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));

  console.log('Switching back and removing');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  radios = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Translation"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.textContent));
  check('both listed, KJV chosen', radios.join() === 'Berean Standard BibleBSB,*King James VersionKJV', radios);
  await page.click('[aria-label="Translation"] [role="radio"]:has-text("Berean")');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  const back = await verse(page, 1);
  check('back to the BSB with one tap (same place, Psalm 3)', /O LORD, how my foes have increased/.test(back || '') && (await header(page)) === 'Berean Standard Bible · tap to change', back);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('[aria-label="Translation"] [role="radio"]:has-text("King James")');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('text=Remove KJV');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  const afterRemove = await verse(page, 1);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  radios = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Translation"] [role="radio"]')].map(r => r.textContent));
  check('removing the KJV goes back to the BSB', /O LORD, how my foes/.test(afterRemove || '') && radios.join() === 'Berean Standard BibleBSB', [afterRemove, radios]);
  await page.evaluate(() => { window.__nextPick = 'bad'; });
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(600);
  const bad = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('a wrong file gets a plain explanation', /isn't a Quiet Bible translation/.test(bad || ''), bad);
  await page.evaluate(() => document.querySelector('[aria-label="Translation"]').scrollIntoView({ block: 'center' }));
  await page.screenshot({ path: '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/translation-setting.png' });
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
