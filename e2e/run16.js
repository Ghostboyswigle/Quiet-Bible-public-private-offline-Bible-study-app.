// Arabic: add the Smith & Van Dyck from a file; right-to-left reading, search without vowel marks, references (incl. Arabic digits), voices, and back to left-to-right. Fake native side keeps its
// "disk" in sessionStorage so it survives the page reload that switching translations does.
const { chromium } = require('playwright');
const PACK = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/svdpack';
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
        SS.setItem('__tr', JSON.stringify([{id:'SVD',name:'Smith & Van Dyck (Arabic)',abbr:'SVD',lang:'ar',builtIn:false}]));
        window.__qbTranslationAdded({ok:true,id:'SVD',name:'Smith & Van Dyck (Arabic)'}); }, 300); return true; },
    removeTranslation: function(id){ SS.setItem('__tr', JSON.stringify(installed().filter(function(t){return t.id!==id}))); return true; } };
  window.QuietBibleStorage = {
    getItem: function(k){ var d=disk(); return Object.prototype.hasOwnProperty.call(d,k) ? d[k] : null; },
    setItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); }, commitItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); },
    removeItem: function(k){ var d=disk(); delete d[k]; save(d); } };
  window.__spoken = []; window.__transport = []; var t=null;
  window.__langs = JSON.parse(SS.getItem('__langs') || '[]');
  window.QuietBibleSpeech = { ready: function(){ return true; },
    setLanguage: function(l){ window.__langs.push(l); SS.setItem('__langs', JSON.stringify(window.__langs)); window.__lang = l; },
    naturalSpeaksLanguage: function(){ return (window.__lang || 'en') === 'en' || SS.getItem('__arvoice') === '1'; },
    getVoice: function(){ return (window.__lang || 'en') === 'en' ? 'john' : (SS.getItem('__arvoice') === '1' ? 'kareem' : 'system'); },
    voices: function(){ var v=[{id:'john',name:'John',note:'Male',lang:'en',builtIn:true}]; if (SS.getItem('__arvoice') === '1') v.push({id:'kareem',name:'Kareem',note:'Male · Arabic',lang:'ar',builtIn:false}); return JSON.stringify(v); },
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
  await ctx.route('**/translations/SVD/**', route => {
    const rel = route.request().url().split('/translations/SVD/')[1]; const f = PACK + '/' + rel;
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  const NAME = 'Smith & Van Dyck (Arabic)';
  const layout = n => page.evaluate(n => { const el = document.getElementById('v-' + n); if (!el) return null;
    const t = el.querySelector('span').firstChild, r = document.createRange(); r.setStart(t, 0); r.setEnd(t, Math.max(1, t.textContent.indexOf(' ')));
    const w = r.getClientRects()[0], sup = el.querySelector('sup').getBoundingClientRect(), box = el.getBoundingClientRect();
    return { dir: getComputedStyle(el).direction, rtlFlag: document.documentElement.hasAttribute('data-qb-rtl'), firstWordRightEdge: Math.round(box.right - (w.x + w.width)), numberRightOfWord: sup.x > w.x, text: el.textContent.slice(0, 60) }; }, n);

  console.log('Before: the KJV reads left to right');
  const ltr0 = await layout(1);
  check('KJV verse is left-to-right, no right-to-left flag', ltr0.dir === 'ltr' && !ltr0.rtlFlag && !ltr0.numberRightOfWord, ltr0);

  console.log('Adding the Arabic Bible');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(500);
  const added = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('added, then the app opens it', (added || '').includes(NAME + ' added'), added);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);

  console.log('Reading right to left');
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  const v1 = await verse(page, 1), h = await header(page);
  check('التكوين 1:1 in Arabic, header names the translation', /فِي الْبَدْءِ خَلَقَ اللهُ السَّمَاوَاتِ وَالأَرْضَ/.test(v1 || '') && h === NAME + ' · tap to change', [v1, h]);
  const l1 = await layout(1);
  check('verses run right to left: number at the right, first word against the right edge', l1.dir === 'rtl' && l1.rtlFlag && l1.numberRightOfWord && l1.firstWordRightEdge < 40, l1);
  const langs = await page.evaluate(() => window.__langs);
  check('the speech side is told the text is Arabic', langs[langs.length - 1] === 'ar', langs);
  await page.click('text=tap to change'); await page.waitForTimeout(300);
  const names = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('book names in Arabic', names[0].startsWith('التكوين') && names[18].startsWith('المزامير'), [names[0], names[18]]);
  await page.getByRole('button', { name: 'New Testament', exact: true }).click(); await page.waitForTimeout(200);
  const nt = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('New Testament names too', nt[0].startsWith('متى') && nt[3].startsWith('يوحنا') && nt[nt.length - 1].startsWith('رؤيا يوحنا'), [nt[0], nt[3], nt[nt.length - 1]]);
  await page.keyboard.press('Escape').catch(() => {});
  await page.getByRole('button', { name: 'Close', exact: true }).first().click().catch(() => {});
  await goTo(page, 'Old Testament', 'المزامير', 23);
  const ps = await verse(page, 1), psTitle = await page.evaluate(() => [...document.querySelectorAll('p.italic')].map(p => ({ t: p.textContent, style: getComputedStyle(p).fontStyle })));
  check('Psalm 23: title set apart (upright, not slanted), verse 1 below it', psTitle.length && psTitle[0].t === 'مَزْمُورٌ لِدَاوُدَ.' && psTitle[0].style === 'normal' && /^1الرَّبُّ رَاعِيَّ فَلاَ يُعْوِزُنِي شَيْءٌ\.$/.test((ps || '').trim()), { psTitle, ps });
  const l23 = await layout(2);
  const indent = await page.evaluate(() => { const el = document.getElementById('v-2'), cs = getComputedStyle(el); return { pr: cs.paddingRight, pl: cs.paddingLeft }; });
  check('poetry indents from the right in Arabic', l23.dir === 'rtl' && indent.pr === '24px' && indent.pl === '8px', indent);

  console.log('Search and references');
  await page.getByRole('button', { name: 'Search', exact: true }).click(); await page.waitForTimeout(400);
  const refLabel = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(800);
    return page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /Go to reference/.test(b.textContent)); return b ? b.querySelectorAll('span')[1].textContent : null; }); };
  const refs = {};
  for (const q of ['يوحنا 3:16', 'يو 3:16', 'يو ٣:١٦', 'مز 23', 'المزامير ٢٣', 'إشعياء 53', 'اشعياء 53', '1كو 13', 'رؤ 22', 'يؤ 2', 'John 3:16']) refs[q] = await refLabel(q);
  check('references with Arabic names or abbreviations, Arabic or Western digits, with or without hamza, or English names',
        refs['يوحنا 3:16'] === 'يوحنا 3:16' && refs['يو 3:16'] === 'يوحنا 3:16' && refs['يو ٣:١٦'] === 'يوحنا 3:16' && refs['مز 23'] === 'المزامير 23'
        && refs['المزامير ٢٣'] === 'المزامير 23' && refs['إشعياء 53'] === 'إشعياء 53' && refs['اشعياء 53'] === 'إشعياء 53' && refs['1كو 13'] === 'كورنثوس الأولى 13'
        && refs['رؤ 22'] === 'رؤيا يوحنا 22' && refs['يؤ 2'] === 'يوئيل 2' && refs['John 3:16'] === 'يوحنا 3:16', refs);
  const hitsFor = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(1800);
    return page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText).filter(t => /\d+:\d+/.test(t))); };
  let hits = await hitsFor('الرب راعي');
  check('search typed without vowel marks finds the vowelled text', hits.some(t => /^المزامير 23:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor('هكذا احب الله العالم');
  check('a phrase from John 3:16 (no hamza on أحب)', hits.some(t => /^يوحنا 3:16/.test(t)), hits.slice(0, 2));
  hits = await hitsFor('love one another');
  check('an English search in the Arabic Bible finds nothing and does not break', Array.isArray(hits), hits.length);
  await page.screenshot({ path: SHOTS + 'ar-search.png' });
  await page.getByRole('button', { name: 'Read', exact: true }).click(); await page.waitForTimeout(400);

  console.log('Listening');
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const heard = await page.evaluate(() => ({ spoken: window.__spoken[0], sub: window.__transport[window.__transport.length - 1] }));
  check('reads the Arabic text aloud, title included; lock screen names the translation', /^PSA\.23\.1\|مَزْمُورٌ لِدَاوُدَ\. الرَّبُّ رَاعِيَّ/.test(heard.spoken || '') && (heard.sub || '').startsWith(NAME + ' · verse'), heard);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const hint = await page.evaluate(() => (document.querySelector('[data-qb-voice-hint]') || {}).textContent);
  check('no Arabic voice yet: says so, and the phone voice reads', /no natural Arabic voice on this phone yet/.test(hint || ''), hint);
  await page.evaluate(() => sessionStorage.setItem('__arvoice', '1'));
  await page.reload(); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const radios = await page.evaluate(() => [...document.querySelectorAll('[aria-label="Voice"] [role="radio"]')].map(r => (r.getAttribute('aria-checked') === 'true' ? '*' : '') + r.querySelector('span').textContent));
  check('with the Arabic voice added, it is listed and chosen', radios.join() === '*Kareem,Phone voice', radios);
  const uiDir = await page.evaluate(() => ({ settings: getComputedStyle(document.querySelector('h1')).direction, nav: getComputedStyle(document.querySelector('nav') || document.body).direction }));
  check('the English menus stay left to right', uiDir.settings === 'ltr' && uiDir.nav === 'ltr', uiDir);
  await page.screenshot({ path: SHOTS + 'ar-settings.png' });

  console.log('Back to the KJV');
  await page.click('[aria-label="Translation"] [role="radio"]:has-text("King James")');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  const back = await page.evaluate(() => window.__langs);
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  const ltr1 = await layout(1);
  check('KJV is left to right again (flag gone), speech told English', ltr1.dir === 'ltr' && !ltr1.rtlFlag && !ltr1.numberRightOfWord && back[back.length - 1] === 'en' && /The LORD is my shepherd/.test(ltr1.text), ltr1);
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
