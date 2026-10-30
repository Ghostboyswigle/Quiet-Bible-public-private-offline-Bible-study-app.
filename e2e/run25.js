// Asante Twi (v1.4.3): add the Twi Bible from a file; read (including the verses the eBible corpus lacks), search with
// or without the Twi letters ɛ and ɔ, references with Twi book names, study tools, the voice note and the credits. Fake native side keeps its
// "disk" in sessionStorage so it survives the page reload that switching translations does.
const { chromium } = require('playwright');
// usage: node run25.js <port> <outdir>
const PACK = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/twipack';
const fs = require('fs');
const PROPS = Object.fromEntries(fs.readFileSync(PACK + '/translation.properties', 'utf8').split('\n').filter(Boolean).map(l => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1)]));
const init = `
(function(){
  var TWI_LICENSE = ${JSON.stringify(PROPS.license)}, TWI_SOURCE = ${JSON.stringify(PROPS.source)};
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
        SS.setItem('__tr', JSON.stringify([{id:'TWI',name:'Asante Twi Bible (2020)',abbr:'TWI',lang:'tw',builtIn:false,license:TWI_LICENSE,source:TWI_SOURCE}]));
        window.__qbTranslationAdded({ok:true,id:'TWI',name:'Asante Twi Bible (2020)'}); }, 300); return true; },
    removeTranslation: function(id){ SS.setItem('__tr', JSON.stringify(installed().filter(function(t){return t.id!==id}))); return true; } };
  window.QuietBibleStorage = {
    getItem: function(k){ var d=disk(); return Object.prototype.hasOwnProperty.call(d,k) ? d[k] : null; },
    setItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); }, commitItem: function(k,v){ var d=disk(); d[k]=String(v); save(d); },
    removeItem: function(k){ var d=disk(); delete d[k]; save(d); } };
  window.__spoken = []; window.__transport = []; var t=null;
  window.__langs = JSON.parse(SS.getItem('__langs') || '[]');
  window.QuietBibleSpeech = { ready: function(){ return true; },
    setLanguage: function(l){ window.__langs.push(l); SS.setItem('__langs', JSON.stringify(window.__langs)); window.__lang = l; },
    naturalSpeaksLanguage: function(){ return (window.__lang || 'en') === 'en' || SS.getItem('__twvoice') === '1'; },
    getVoice: function(){ return (window.__lang || 'en') === 'en' ? 'john' : (SS.getItem('__twvoice') === '1' ? 'vais' : 'system'); },
    voices: function(){ var v=[{id:'john',name:'John',note:'Male',lang:'en',builtIn:true}]; if (SS.getItem('__twvoice') === '1') v.push({id:'vais',name:'Vais',note:'Female · Vietnamese',lang:'vi',builtIn:false}); return JSON.stringify(v); },
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

const [port, OUT] = process.argv.slice(2);
const SHOTS = (OUT || '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/shots') + '/';
(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 412, height: 915 }, locale: 'en-US' });
  await ctx.addInitScript(init);
  await ctx.route('**/translations/TWI/**', route => {
    const rel = route.request().url().split('/translations/TWI/')[1]; const f = PACK + '/' + rel;
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`http://127.0.0.1:${port || 8770}/index.html`); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  const NAME = 'Asante Twi Bible (2020)';

  console.log('Adding the Asante Twi Bible');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('text=Add a translation from a file'); await page.waitForTimeout(500);
  const added = await page.evaluate(() => (document.querySelector('[data-qb-tr-msg]') || {}).textContent);
  check('added, then the app opens it', (added || '').includes(NAME + ' added'), added);
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(800);

  console.log('Reading');
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  const v1 = await verse(page, 1), h = await header(page);
  check('1 Mose 1:1 in Twi, header names the translation', /Ahyɛaseɛ no Onyankopɔn bɔɔ ɔsoro ne asase\./.test(v1 || '') && h === NAME + ' · tap to change', [v1, h]);
  const langs = await page.evaluate(() => window.__langs);
  check('the speech side is told the text is Twi (tw)', langs[langs.length - 1] === 'tw', langs);
  const title = await page.evaluate(() => [...document.querySelectorAll('h1,h2')].map(e => e.textContent).join('|'));
  check('chapter heading in Twi', /1 Mose 1/.test(title), title);
  const font = await page.evaluate(() => { const el = document.getElementById('v-1'); const r = document.createRange(); r.selectNodeContents(el); return el.textContent.length > 20 && r.getBoundingClientRect().height > 0; });
  check('the letters ɛ and ɔ are drawn', font);
  await page.click('text=tap to change'); await page.waitForTimeout(300);
  const names = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('book names in Twi', names[0].startsWith('1 Mose') && names[14].startsWith('Ɛsra') && names[18].startsWith('Nnwom150') && names[20].startsWith('Ɔsɛnkafoɔ'), [names[0], names[14], names[18], names[20]]);
  await page.getByRole('button', { name: 'New Testament', exact: true }).click(); await page.waitForTimeout(200);
  const nt = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /chapters?$/.test(t)));
  check('New Testament names too', nt[0].startsWith('Mateo') && nt[3].startsWith('Yohane') && nt[nt.length - 1].startsWith('Adiyisɛm'), [nt[0], nt[3], nt[nt.length - 1]]);
  await page.screenshot({ path: SHOTS + 'tw-books.png' });
  await page.keyboard.press('Escape').catch(() => {});
  await page.getByRole('button', { name: 'Close', exact: true }).first().click().catch(() => {});
  await goTo(page, 'New Testament', 'Yohane', 3);
  const j316 = await verse(page, 16);
  check('Yohane 3:16', /Na sɛdeɛ Onyankopɔn dɔɔ ewiase nie/.test(j316 || ''), j316);
  await goTo(page, 'Old Testament', 'Yoɛl', 2);
  const jl = { 27: await verse(page, 27), 28: await verse(page, 28), 32: await verse(page, 32), 33: await verse(page, 33) };
  check('Yoɛl 2:28-32 are there (the corpus had no place for them), complete, and nothing after 32',
        /^28“Na akyire yi, mɛhwie me honhom agu nnipa nyinaa so,.*anisoadehunu\.$/.test(jl[28] || '') && /Yerusalem nyinaa/.test(jl[32] || '') && jl[27] && jl[33] === null, jl);
  await page.screenshot({ path: SHOTS + 'tw-joel2.png' });
  await goTo(page, 'Old Testament', 'Malaki', 4);
  const m = { 1: await verse(page, 1), 6: await verse(page, 6), 7: await verse(page, 7) };
  check('Malaki 4 has its six verses', /Ampa ara, ɛda no reba/.test(m[1] || '') && /mede nnome bɛba abɛsɛe asase no/.test(m[6] || '') && m[7] === null, m);
  await goTo(page, 'Old Testament', 'Hiob', 41);
  const job = await verse(page, 31);
  check('poetry keeps every line (Hiob 41:31)', /na ɔnunu ɛpo mu sɛ sradeɛ a ɛwɔ kukuo mu\./.test(job || ''), job);
  await goTo(page, 'Old Testament', 'Nnwom', 23);
  const ps = await verse(page, 1);
  check('Nnwom 23:1', /Awurade ne me hwɛfo, hwee renhia me\./.test(ps || ''), ps);
  await goTo(page, 'New Testament', 'Adiyisɛm', 12);
  const r17 = await verse(page, 17), r18 = await verse(page, 18);
  check('Adiyisɛm 12:18 ends 12:17, as in the BSB', /Na ɔwɔ no kɔgyinaa mpoano hɔ\.$/.test(r17 || '') && r18 === null, [r17 && r17.slice(-50), r18]);
  await page.screenshot({ path: SHOTS + 'tw-rev12.png' });

  console.log('Search and references');
  await page.getByRole('button', { name: 'Search', exact: true }).click(); await page.waitForTimeout(400);
  const refLabel = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(800);
    return page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /Go to reference/.test(b.textContent)); return b ? b.querySelectorAll('span')[1].textContent : null; }); };
  const refs = {};
  for (const q of ['Yohane 3:16', 'Yoh 3:16', '1 Yohane 4:8', 'Ɛsra 3', 'Esra 3', 'Ɔsɛnkafoɔ 3:1', 'Osenkafoo 3:1', 'Yoel 2:28', 'Nnwom 23', 'John 3:16'])
    refs[q] = await refLabel(q);
  check('references with Twi names or short forms, with or without ɛ and ɔ, or English names',
        refs['Yohane 3:16'] === 'Yohane 3:16' && refs['Yoh 3:16'] === 'Yohane 3:16' && refs['1 Yohane 4:8'] === '1 Yohane 4:8'
        && refs['Ɛsra 3'] === 'Ɛsra 3' && refs['Esra 3'] === 'Ɛsra 3' && refs['Ɔsɛnkafoɔ 3:1'] === 'Ɔsɛnkafoɔ 3:1' && refs['Osenkafoo 3:1'] === 'Ɔsɛnkafoɔ 3:1'
        && refs['Yoel 2:28'] === 'Yoɛl 2:28' && refs['Nnwom 23'] === 'Nnwom 23' && refs['John 3:16'] === 'Yohane 3:16', refs);
  const hitsFor = async q => { await page.locator('input').first().fill(q); await page.waitForTimeout(1500);
    return page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText).filter(t => /\d+:\d+/.test(t))); };
  let hits = await hitsFor('Awurade ne me hwɛfo');
  check('search with the Twi letters', hits.some(t => /^Nnwom 23:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor('awurade ne me hwefo');
  check('search typed with plain e and o still finds it', hits.some(t => /^Nnwom 23:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor("sɛdeɛ Onyankopɔn dɔɔ ewiase");
  check('a longer phrase', hits.some(t => /^Yohane 3:16/.test(t)), hits.slice(0, 2));
  hits = await hitsFor("onyankopon doo ewiase");
  check('...and the same phrase without the Twi letters', hits.some(t => /^Yohane 3:16/.test(t)), hits.slice(0, 2));
  hits = await hitsFor("m'atamfoo dooso");
  check("a typed ' finds the Twi apostrophe (mʼatamfoɔ)", hits.some(t => /^Nnwom 3:1/.test(t)), hits.slice(0, 2));
  hits = await hitsFor('mɛhwie me honhom agu nnipa nyinaa');
  check('a verse the corpus lacked is found too (Yoɛl 2:28)', hits.some(t => /^Yoɛl 2:28/.test(t)), hits.slice(0, 2));
  await page.screenshot({ path: SHOTS + 'tw-search.png' });
  await page.getByRole('button', { name: 'Read', exact: true }).click(); await page.waitForTimeout(400);

  console.log('Study tools');
  await goTo(page, 'Old Testament', 'Yoɛl', 2);
  await page.click('#v-28'); await page.waitForSelector('[data-qb-study]');
  await page.locator('[data-qb-study] .grid button').nth(1).click(); await page.waitForTimeout(500);
  const xr = await page.locator('[data-qb-xrefs]').innerText();
  check('cross-references for Yoɛl 2:28 (kept by English numbers) include Asomafoɔ 2:17, in Twi', /Aso 2:1[67]/.test(xr) && /Yoɛl hyɛɛ ho nkɔm/.test(xr) && !/I will pour out of my Spirit/.test(xr), xr.slice(0, 160).replace(/\n/g, ' / '));
  await page.screenshot({ path: SHOTS + 'tw-xrefs.png' });
  await page.keyboard.press('Escape').catch(() => {});
  await page.getByRole('button', { name: 'Close', exact: true }).first().click().catch(() => {});

  console.log('Listening');
  await goTo(page, 'Old Testament', 'Nnwom', 23);
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const heard = await page.evaluate(() => ({ spoken: window.__spoken[0], sub: window.__transport[window.__transport.length - 1] }));
  check('reads the Twi text with the phone voice, from verse 1; lock screen names the translation', /^PSA\.23\.1\|Awurade ne me hwɛfo/.test(heard.spoken || '') && (heard.sub || '').startsWith(NAME + ' · verse'), heard);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const hint = await page.evaluate(() => (document.querySelector('[data-qb-voice-hint]') || {}).textContent);
  check('no Twi voice: says the phone voice reads', /no natural Twi voice on this phone yet/.test(hint || ''), hint);

  console.log('A new chapter opens at its start (1.4.3)');
  await page.getByRole('button', { name: 'Read', exact: true }).click().catch(() => {}); await page.waitForTimeout(300);
  await goTo(page, 'Old Testament', 'Yoɛl', 2);
  await page.mouse.move(200, 500); for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 400); await page.waitForTimeout(80); } await page.waitForTimeout(800);
  const deep = await page.evaluate(() => document.getElementById('v-1').getBoundingClientRect().top);
  await goTo(page, 'Old Testament', 'Yesaia', 53);
  const top53 = await page.evaluate(() => document.getElementById('v-1').getBoundingClientRect().top);
  await page.evaluate(() => { window.__spoken.length = 0; });
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(700);
  const first53 = await page.evaluate(() => window.__spoken[0]);
  check('after reading far down Yoɛl 2, Yesaia 53 opens at verse 1 and Play starts there', deep < -1000 && top53 > 0 && /^ISA\.53\.1\|/.test(first53 || ''), [Math.round(deep), Math.round(top53), (first53 || '').slice(0, 40)]);
  await page.evaluate(() => window.__qbTransport && window.__qbTransport('pause'));
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);

  console.log('Credits');
  await page.click('text=Credits and licences').catch(() => {}); await page.waitForTimeout(600);
  const credits = await page.evaluate(() => document.body.innerText);
  check('the credits give the CC BY-SA licence, Biblica as the owner, the attribution line and the changes',
        credits.includes(NAME) && credits.includes('CC BY-SA 4.0') && credits.includes('Copyright © 1996, 2020 by Biblica, Inc.')
        && credits.includes('The original work by Biblica, Inc. is available for free at www.biblica.com and open.bible.')
        && credits.includes('Changed for Quiet Bible') && !/Biblica®/.test(credits), credits.slice(credits.indexOf(NAME), credits.indexOf(NAME) + 200));
  await page.evaluate(n => { const el = [...document.querySelectorAll('li')].find(l => l.textContent.includes(n)); el && el.scrollIntoView({ block: 'center' }); }, NAME);
  await page.screenshot({ path: SHOTS + 'tw-credits.png' });
  await page.goto(`http://127.0.0.1:${port || 8770}/index.html`); await page.waitForSelector('#v-1'); await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  await page.click('[aria-label="Translation"] [role="radio"]:has-text("King James")');
  await page.waitForEvent('load'); await page.waitForSelector('#v-1'); await page.waitForTimeout(600);
  const back = await page.evaluate(() => window.__langs);
  check('back to the KJV: speech is told English again', back[back.length - 1] === 'en', back.slice(-3));
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
