// v1.1.0 voice packs in Settings: a pack added in parts, its voices offered for the
// translation's language, removing a pack, and one credits line per pack.
// usage: node run20.js <port> <outdir>
const { chromium } = require('playwright');
const fs = require('fs');
const [port, out] = process.argv.slice(2);
const LIC = 'BigScience Open RAIL-M (Supertone Inc.); commercial use allowed, with use restrictions';
const SRC = 'Supertonic 3 by Supertone Inc.';
const pack = (lang, style, name, note) => ({ id: `supertonic3-${lang}-${style}`, name, note, lang, license: LIC, source: SRC, pack: 'Supertonic 3', builtIn: false });
const ALL = [{ id: 'john', name: 'John', note: 'Male', lang: 'en', license: 'Public domain', source: 'Piper', pack: '', builtIn: true },
  pack('es', 2, 'Lucía', 'Female'), pack('es', 8, 'Mateo', 'Male'), pack('fr', 0, 'Claire', 'Female'), pack('ru', 5, 'Ivan', 'Male')];

const init = (voices, tr) => `
(function(){
  var mem = {'qb-translation': ${JSON.stringify(tr)}};
  mem['quiet-bible-web-v1'] = ${JSON.stringify(JSON.stringify({ state: { book: 'GEN', chapter: 1 }, version: 0 }))};
  function syncGet(p){ var x=new XMLHttpRequest(); x.open('GET','/'+p,false); x.send(null); return x.status===200?x.responseText:null; }
  window.__voices = ${JSON.stringify(voices)}; window.__cur = null; window.__removed = [];
  window.QuietBibleNative = { isNative: function(){ return true; } };
  window.QuietBibleAssets = {
    read: function(p){ p=String(p).replace(/^\\//,''); return (p.indexOf('bible/')===0 || p.indexOf('translations/')===0) ? syncGet(p) : null; },
    translations: function(){ return JSON.stringify([{id:'KJV',name:'King James Version',abbr:'KJV',lang:'en',builtIn:true},{id:'RV1909',name:'Reina-Valera 1909',abbr:'RV1909',lang:'es',builtIn:false}]); },
    licenseText: function(f){ return f==='supertonic-OpenRAIL-M.txt' ? 'Supertonic 3 voice model\\nBigScience Open RAIL-M License' : 'text'; },
    addTranslation: function(){ return true; }, removeTranslation: function(){ return true; } };
  window.QuietBibleStorage = { getItem: function(k){ return Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null; },
    setItem: function(k,v){ mem[k]=String(v); }, commitItem: function(k,v){ mem[k]=String(v); }, removeItem: function(k){ delete mem[k]; } };
  window.QuietBibleSpeech = { ready: function(){ return true; }, setLanguage: function(l){ window.__lang=l; },
    naturalSpeaksLanguage: function(){ return window.__voices.some(function(v){ return v.lang===(window.__lang||'en'); }); },
    getVoice: function(){ if (window.__cur) return window.__cur; var v = window.__voices.filter(function(v){ return v.lang===(window.__lang||'en'); })[0]; return v ? v.id : 'system'; },
    voices: function(){ return JSON.stringify(window.__voices); },
    voiceStatus: function(){ return 'ready'; }, setVoice: function(v){ window.__cur=v; },
    addVoice: function(){ return true; },
    removeVoice: function(id){ var v = window.__voices.filter(function(x){ return x.id===id; })[0]; window.__removed.push(id);
      window.__voices = window.__voices.filter(function(x){ return !(v.pack && x.pack===v.pack) && x.id!==id; }); window.__cur=null; return true; },
    prefetch: function(){}, speak: function(){}, stop: function(){} };
  window.QuietBibleTransport = { update: function(){}, stop: function(){}, theme: function(){} };
})();`;

let pass = 0, total = 0;
const check = (n, ok, d) => { total++; if (ok) pass++; console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${n}${d === undefined ? '' : '  -> ' + d}`); };

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(init(ALL, 'RV1909'));
  const RV = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/rvpack/';
  await ctx.route('**/translations/RV1909/**', route => {
    const f = RV + route.request().url().split('/translations/RV1909/')[1];
    fs.existsSync(f) ? route.fulfill({ status: 200, contentType: 'application/json', body: fs.readFileSync(f) }) : route.fulfill({ status: 404, body: '' });
  });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`http://127.0.0.1:${port}/index.html`); await page.waitForSelector('#v-1');
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(400);
  const group = page.locator('[role=radiogroup][aria-label=Voice]');
  const opts = await group.locator('button').allInnerTexts();
  check('Spanish reading offers the two Spanish pack voices and the phone voice', opts.length === 3 && opts[0].includes('Lucía') && opts[1].includes('Mateo') && opts[2].includes('Phone voice'), JSON.stringify(opts));
  check('the remove button names the pack', await page.getByRole('button', { name: 'Remove Supertonic 3 voices' }).count() === 1);
  await page.getByRole('button', { name: 'Add a voice from a file' }).click();
  check('adding says parts can be picked together', (await page.locator('[data-qb-voice-msg]').textContent()).includes('If a voice comes in parts, pick all of them.'));
  await page.evaluate(() => window.__qbVoiceAdded({ ok: false, partial: true, name: 'Supertonic 3', have: 1, parts: 2 }));
  await page.waitForTimeout(100);
  const m1 = await page.locator('[data-qb-voice-msg]').textContent();
  check('part 1 message asks for the other part', m1.includes('Part 1 of 2 of the Supertonic 3 voices is added') && m1.includes('Now add the other part ') && !m1.includes('parts —'), m1);
  await page.evaluate(() => window.__qbVoiceAdded({ ok: true, pack: 'Supertonic 3', id: 'supertonic3-es-2', name: 'Lucía', lang: 'es', langs: 'es,fr,pt,ru,vi,ar' }));
  await page.waitForTimeout(100);
  const m2 = await page.locator('[data-qb-voice-msg]').textContent();
  check('finished pack names its languages and the voice now reading', m2.includes('Supertonic 3 voices added for Spanish, French, Portuguese, Russian, Vietnamese, Arabic.') && m2.includes('Lucía is reading now.'), m2);
  await page.screenshot({ path: `${out}/voices-es.png` });
  // credits: one line for the pack
  await page.locator('[data-qb-credits-open]').click(); await page.waitForTimeout(200);
  const cr = await page.locator('[data-qb-credits]').innerText();
  check('credits list the pack once with its languages', (cr.match(/Supertonic 3 voices/g) || []).length === 1 && cr.includes('Supertonic 3 voices · Spanish, French, Russian') && cr.includes(LIC), cr.slice(0, 400));
  check('credits offer the Supertonic licence text', await page.locator('[data-qb-license="supertonic-OpenRAIL-M.txt"]').count() === 1);
  await page.locator('[data-qb-license="supertonic-OpenRAIL-M.txt"]').click(); await page.waitForTimeout(100);
  check('...and show it', (await page.locator('[data-qb-license-text] pre').textContent()).includes('Open RAIL-M'));
  await page.getByRole('button', { name: 'Hide credits' }).click();
  // removing
  await page.getByRole('button', { name: 'Remove Supertonic 3 voices' }).click(); await page.waitForTimeout(200);
  const m3 = await page.locator('[data-qb-voice-msg]').textContent();
  check('removing explains every language goes', m3.includes('The Supertonic 3 voices were removed from this phone, for every language.'), m3);
  const opts2 = await group.locator('button').allInnerTexts();
  check('only the phone voice remains for Spanish', opts2.length === 1 && opts2[0].includes('Phone voice'), JSON.stringify(opts2));
  check('no page errors', errors.length === 0, errors.join('|'));
  await ctx.close();

  // English reading: the pack's Spanish voices are not offered, single-voice wording unchanged
  const c2 = await b.newContext({ viewport: { width: 360, height: 800 } });
  await c2.addInitScript(init(ALL, 'KJV'));
  const p2 = await c2.newPage(); const e2 = []; p2.on('pageerror', e => e2.push(String(e)));
  await p2.goto(`http://127.0.0.1:${port}/index.html`); await p2.waitForSelector('#v-1');
  await p2.getByRole('button', { name: 'Settings', exact: true }).click(); await p2.waitForTimeout(300);
  const o3 = await p2.locator('[role=radiogroup][aria-label=Voice] button').allInnerTexts();
  check('English reading lists John and the phone voice only', o3.length === 2 && o3[0].includes('John'), JSON.stringify(o3));
  await p2.evaluate(() => window.__qbVoiceAdded({ ok: true, id: 'kristin', name: 'Kristin', lang: 'en' }));
  await p2.waitForTimeout(100);
  check('single voices keep their old message', (await p2.locator('[data-qb-voice-msg]').textContent()) === 'Kristin added. You can switch voices here any time.');
  await p2.evaluate(() => window.__qbVoiceAdded({ ok: true, pack: 'Supertonic 3', id: 'supertonic3-es-2', name: 'Lucía', lang: 'es', langs: 'es,fr' }));
  await p2.waitForTimeout(100);
  const m4 = await p2.locator('[data-qb-voice-msg]').textContent();
  check('a pack added while reading English does not claim it is reading', m4 === 'Supertonic 3 voices added for Spanish, French.', m4);
  check('no page errors (English)', e2.length === 0, e2.join('|'));
  await b.close();
  console.log(`${pass}/${total} passed`);
  process.exit(pass === total ? 0 : 1);
})();
