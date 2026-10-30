// Credits and licences screen (v1.0.0): opens from Settings > About, lists every
// translation and voice on the phone with its licence, the built-in components,
// and shows full licence texts read through QuietBibleAssets.licenseText.
// usage: node run19.js <port> <outdir> <trmeta.json>
const { chromium } = require('playwright');
const fs = require('fs');
const [port, out, metaFile] = process.argv.slice(2);
// The About line, "Version 1.4.3", from the version in web/app.js.
const APPJS = fs.readFileSync(require('path').join(__dirname, '..', 'web', 'app.js'), 'utf8');
const EXPECT_VERSION = `Version ${/var QB_VERSION=`([^`]*)`/.exec(APPJS)[1]}`;
const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
const TRS = [{ id: 'KJV', name: 'King James Version', abbr: 'KJV', lang: 'en', builtIn: true,
  license: 'Public domain, except in the United Kingdom, where the rights are held by the Crown',
  source: 'The Holy Bible, King James Version, 1769 standard text' }]
  .concat(meta.filter(m => m.id !== 'KJV').map(m => ({ id: m.id, name: m.name, abbr: m.abbr, lang: m.language, license: m.license, source: m.source, builtIn: false })));
const VOICES = [
  { id: 'john', name: 'John', note: 'Male', lang: 'en', builtIn: true, license: "Public domain recordings (LibriVox); voice by Bryce Beattie", source: 'Piper en_US-john-medium' },
  { id: 'kareem', name: 'Kareem', note: 'Male', lang: 'ar', builtIn: false, license: "Not stated by the voice's makers", source: 'Piper ar_JO-kareem-medium' },
  { id: 'old', name: 'Old Pack', note: '', lang: 'es', builtIn: false, license: '', source: '' },
];
const LIC = { 'espeak-ng-GPL-3.0.txt': 'GNU GENERAL PUBLIC LICENSE\n   Version 3, 29 June 2007\n' + 'x '.repeat(4000),
  'sherpa-onnx-Apache-2.0.txt': 'Apache License\nVersion 2.0, January 2004', 'onnxruntime-MIT.txt': 'MIT License',
  'piper-voices-MIT.txt': 'MIT License', 'THIRD-PARTY-NOTICES.txt': 'Quiet Bible - offline speech components', 'study-tools-notices.txt': 'Quiet Bible - study tools', 'voice-john-medium-model-card.txt': '# Model card for john (medium)' };

const init = (dark) => `
(function(){
  var mem = {'qb-translation':'KJV'};
  mem['quiet-bible-web-v1'] = ${JSON.stringify(JSON.stringify({ state: { book: 'GEN', chapter: 1, themeId: 'paper' }, version: 0 }))};
  function syncGet(p){ var x=new XMLHttpRequest(); x.open('GET','/'+p,false); x.send(null); return x.status===200?x.responseText:null; }
  window.__licAsked = [];
  window.QuietBibleNative = { isNative: function(){ return true; } };
  window.QuietBibleAssets = {
    read: function(p){ p=String(p).replace(/^\\//,''); return p.indexOf('bible/')===0 ? syncGet(p) : null; },
    translations: function(){ return ${JSON.stringify(JSON.stringify(TRS))}; },
    licenseText: function(f){ window.__licAsked.push(f); var L=${JSON.stringify(LIC)}; return L[f]||null; },
    addTranslation: function(){ return true; }, removeTranslation: function(){ return true; } };
  window.QuietBibleStorage = { getItem: function(k){ return Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null; },
    setItem: function(k,v){ mem[k]=String(v); }, commitItem: function(k,v){ mem[k]=String(v); }, removeItem: function(k){ delete mem[k]; } };
  window.QuietBibleSpeech = { ready: function(){ return true; }, setLanguage: function(){}, naturalSpeaksLanguage: function(){ return true; },
    getVoice: function(){ return 'john'; }, voices: function(){ return ${JSON.stringify(JSON.stringify(VOICES))}; },
    voiceStatus: function(){ return 'ready'; }, setVoice: function(){}, prefetch: function(){}, speak: function(){}, stop: function(){} };
  window.QuietBibleTransport = { update: function(){}, stop: function(){}, theme: function(){} };
})();`;

let pass = 0, total = 0;
const check = (n, ok, d) => { total++; if (ok) pass++; console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${n}${d === undefined ? '' : '  -> ' + d}`); };

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const scheme of ['light', 'dark']) {
    const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, reducedMotion: 'reduce', colorScheme: scheme });
    await ctx.addInitScript(init());
    const page = await ctx.newPage();
    const errors = []; page.on('pageerror', e => errors.push(String(e))); page.on('console', m => m.type() === 'error' && errors.push(m.text()));
    await page.goto(`http://127.0.0.1:${port}/index.html`); await page.waitForSelector('#v-1');
    await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
    const ver = await page.locator('[data-qb-version]').textContent();
    check(`${scheme}: version shown`, ver === EXPECT_VERSION, ver);
    check(`${scheme}: credits closed at first`, await page.locator('[data-qb-credits]').count() === 0);
    await page.locator('[data-qb-credits-open]').click(); await page.waitForTimeout(300);
    const txt = await page.locator('[data-qb-credits]').innerText();
    for (const t of TRS) check(`${scheme}: lists ${t.id}`, txt.includes(t.name) && txt.includes(t.license.slice(0, 40)));
    check(`${scheme}: Arabic text credit (CC BY-SA)`, /CC BY-SA 4\.0, STEPBible/.test(txt));
    check(`${scheme}: Bíblia Livre credit`, txt.includes('Diego Santos'));
    check(`${scheme}: voice with apostrophe shown`, txt.includes("Not stated by the voice's makers"));
    check(`${scheme}: voice language named`, txt.includes('Kareem · Arabic'));
    check(`${scheme}: missing licence flagged`, txt.includes('No licence is recorded in this file.'));
    check(`${scheme}: phone voice listed`, txt.includes('Phone voice'));
    for (const p of ['sherpa-onnx 1.13.8', 'ONNX Runtime', 'eSpeak NG', 'Piper', 'GNU General Public License, version 3 or later', 'Hebrew and Greek words for the KJV', 'Strong’s Hebrew and Greek dictionaries', 'OpenBible.info', 'Jamieson, Fausset & Brown', 'Easton’s, Smith’s and Hitchcock’s', 'Berean Standard Bible (built in)', 'Bible Cross-References (the map)', 'Oleksii Trekhleb'])
      check(`${scheme}: built-in part ${p}`, txt.includes(p));
    const btns = await page.locator('[data-qb-license]').evaluateAll(es => es.map(e => e.getAttribute('data-qb-license')));
    check(`${scheme}: one button per licence file`, btns.length === 10 && new Set(btns).size === 10, btns.join(','));
    await page.locator('[data-qb-license="espeak-ng-GPL-3.0.txt"]').click(); await page.waitForTimeout(200);
    const pre = page.locator('[data-qb-license-text] pre');
    check(`${scheme}: GPL text shown`, (await pre.textContent()).startsWith('GNU GENERAL PUBLIC LICENSE'));
    const box = await pre.evaluate(e => ({ h: e.clientHeight, sh: e.scrollHeight, w: e.scrollWidth, cw: e.clientWidth }));
    check(`${scheme}: long text scrolls inside its box`, box.sh > box.h && box.h <= 360, JSON.stringify(box));
    check(`${scheme}: no sideways scroll in text`, box.w <= box.cw + 1, JSON.stringify(box));
    const pageW = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    check(`${scheme}: page has no sideways scroll`, pageW.sw <= pageW.cw, JSON.stringify(pageW));
    await page.locator('[data-qb-credits]').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${out}/credits-${scheme}.png`, fullPage: false });
    await page.locator('[data-qb-license="onnxruntime-MIT.txt"]').click(); await page.waitForTimeout(150);
    check(`${scheme}: switching licence replaces text`, (await pre.textContent()) === 'MIT License');
    await page.getByRole('button', { name: 'Close licence' }).click(); await page.waitForTimeout(150);
    check(`${scheme}: close hides text`, await page.locator('[data-qb-license-text]').count() === 0);
    await page.getByRole('button', { name: 'Hide credits' }).click(); await page.waitForTimeout(150);
    check(`${scheme}: hide collapses panel`, await page.locator('[data-qb-credits]').count() === 0 && await page.locator('[data-qb-credits-open]').count() === 1);
    // a licence file the APK doesn't have
    await page.locator('[data-qb-credits-open]').click();
    await page.evaluate(() => { window.QuietBibleAssets.licenseText = () => null; });
    await page.locator('[data-qb-license="THIRD-PARTY-NOTICES.txt"]').click(); await page.waitForTimeout(150);
    check(`${scheme}: missing text explained`, (await pre.textContent()).includes('isn’t available'));
    check(`${scheme}: no page errors`, errors.length === 0, errors.join(' | '));
    await ctx.close();
  }
  // An old app shell without licenseText / license fields must not break.
  const ctx = await b.newContext({ viewport: { width: 412, height: 915 } });
  await ctx.addInitScript(init() + `;delete window.QuietBibleAssets.licenseText;window.QuietBibleAssets.translations=function(){return '[{"id":"KJV","name":"King James Version","abbr":"KJV","lang":"en","builtIn":true}]'};`);
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`http://127.0.0.1:${port}/index.html`); await page.waitForSelector('#v-1');
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.locator('[data-qb-credits-open]').click();
  await page.locator('[data-qb-license="sherpa-onnx-Apache-2.0.txt"]').click();
  check('old shell: degrades gracefully', (await page.locator('[data-qb-license-text] pre').textContent()).includes('isn’t available') && errors.length === 0, errors.join('|'));
  await b.close();
  console.log(`${pass}/${total} passed`);
  process.exit(pass === total ? 0 : 1);
})();
