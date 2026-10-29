// v1.4.0: the built-in BSB beside the KJV, and the cross-reference map (Bible Cross-References by
// Oleksii Trekhleb) opened from the header and from a verse's cross-references.
// usage: node run24.js <port> <outdir>
const { chromium } = require('playwright');
const fs = require('fs');
const [port, out] = process.argv.slice(2);
const init = (book, chapter, theme, tr) => `
(function(){
  var mem = {'qb-translation':${JSON.stringify(tr)}};
  mem['quiet-bible-web-v1'] = ${JSON.stringify(JSON.stringify({ state: { book, chapter, themeId: theme }, version: 0 }))};
  function syncGet(p){ var x=new XMLHttpRequest(); x.open('GET','/'+p,false); x.send(null); return x.status===200?x.responseText:null; }
  window.__reads = [];
  window.QuietBibleNative = { isNative: function(){ return true; } };
  window.QuietBibleAssets = {
    read: function(p){ p=String(p).replace(/^\\//,''); window.__reads.push(p);
      var m = /^translations\\/BSB\\/((books\\/[A-Z0-9]{3}|meta)\\.json)$/.exec(p);
      if (m) return syncGet('bible/bsb/' + m[1]);
      return p.indexOf('bible/')===0 ? syncGet(p) : null; },
    translations: function(){ return '[{"id":"KJV","name":"King James Version","abbr":"KJV","lang":"en","builtIn":true},{"id":"BSB","name":"Berean Standard Bible","abbr":"BSB","lang":"en","builtIn":true}]'; },
    licenseText: function(){ return null; }, addTranslation: function(){ return true; }, removeTranslation: function(){ return false; } };
  window.QuietBibleStorage = { getItem: function(k){ return Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null; },
    setItem: function(k,v){ mem[k]=String(v); }, commitItem: function(k,v){ mem[k]=String(v); }, removeItem: function(k){ delete mem[k]; } };
  window.QuietBibleSpeech = { ready: function(){ return true; }, setLanguage: function(){}, naturalSpeaksLanguage: function(){ return true; },
    getVoice: function(){ return 'john'; }, voices: function(){ return '[]'; }, voiceStatus: function(){ return 'ready'; },
    setVoice: function(){}, prefetch: function(){}, speak: function(){}, stop: function(){} };
  window.QuietBibleTransport = { update: function(){}, stop: function(){}, theme: function(){} };
})();`;

let pass = 0, total = 0;
const check = (n, ok, d) => { total++; if (ok) pass++; console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${n}${d === undefined ? '' : '  -> ' + String(d).slice(0, 240)}`); };
const verse = (page, n) => page.locator(`#v-${n}`).innerText();
const mapFrame = page => page.frameLocator('[data-qb-map] iframe');
const waitMap = async page => {
  await page.waitForSelector('[data-qb-map] iframe');
  await mapFrame(page).getByRole('button', { name: 'Open in Quiet Bible' }).first().waitFor({ timeout: 90000 });
};
const mapUrl = page => page.evaluate(() => document.querySelector('[data-qb-map] iframe').contentWindow.location.href);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();

  console.log('KJV stays the main translation; the BSB is built in beside it');
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 800 }, reducedMotion: 'reduce', hasTouch: true });
    await ctx.addInitScript(init('JHN', 3, 'quiet', 'KJV'));
    const page = await ctx.newPage(), errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:${port}/index.html`); await page.waitForSelector('#v-16');
    check('the KJV is read by default', (await verse(page, 16)).includes('only begotten Son'), await verse(page, 16));
    check('the header names it', (await page.locator('header').innerText()).includes('King James Version'));
    await page.getByRole('button', { name: 'Settings', exact: true }).click();
    const radios = await page.locator('[role=radiogroup][aria-label=Translation] [role=radio]').allInnerTexts();
    check('Settings lists the KJV first, then the BSB', radios.length === 2 && radios[0].startsWith('King James Version') && radios[1].startsWith('Berean Standard Bible'), radios.join(' | '));
    check('neither can be removed', await page.getByRole('button', { name: /^Remove / }).count() === 0);
    await page.screenshot({ path: `${out}/settings-translations.png` });
    check('no page errors', errors.length === 0, errors.join(' | '));
    await ctx.close();
  }
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 800 }, reducedMotion: 'reduce', hasTouch: true });
    await ctx.addInitScript(init('PSA', 23, 'quiet', 'BSB'));
    const page = await ctx.newPage(), errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:${port}/index.html`); await page.waitForSelector('#v-1');
    check('the BSB reads from the APK', (await verse(page, 1)).includes('The LORD is my shepherd; I shall not want.'), await verse(page, 1));
    const title = await page.locator('p.italic', { hasText: 'A Psalm of David.' }).count();
    check('the psalm title shown once, above the verse', title === 1 && !(await verse(page, 1)).includes('A Psalm of David'), await verse(page, 1));
    check('the header names the BSB', (await page.locator('header').innerText()).includes('Berean Standard Bible'));
    await page.screenshot({ path: `${out}/bsb-psalm23.png` });
    await ctx.close();
    const ctx2 = await b.newContext({ viewport: { width: 390, height: 800 }, reducedMotion: 'reduce' });
    await ctx2.addInitScript(init('JHN', 5, 'quiet', 'BSB'));
    const p2 = await ctx2.newPage();
    await p2.goto(`http://127.0.0.1:${port}/index.html`); await p2.waitForSelector('#v-3');
    check('John 5:4 is left out, as in the BSB', await p2.locator('#v-4').count() === 0 && await p2.locator('#v-5').count() === 1);
    const heads = await p2.locator('h2').allInnerTexts();
    check('section headings shown', heads.includes('The Father and the Son') && heads.includes('Testimonies about Jesus'), heads.join(' | '));
    await ctx2.close();
    const ctx3 = await b.newContext({ viewport: { width: 390, height: 800 }, reducedMotion: 'reduce' });
    await ctx3.addInitScript(init('GEN', 4, 'quiet', 'BSB'));
    const p3 = await ctx3.newPage();
    await p3.goto(`http://127.0.0.1:${port}/index.html`); await p3.waitForSelector('#v-2');
    check('verses the old BSB cut short are whole (Genesis 4:2)', (await verse(p3, 2)).includes('Now Abel was a keeper of sheep, while Cain was a tiller of the soil.'), await verse(p3, 2));
    check('no page errors (BSB)', errors.length === 0, errors.join(' | '));
    await ctx3.close();
  }

  console.log('The map from the header');
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 800 }, reducedMotion: 'reduce', hasTouch: true });
    await ctx.addInitScript(init('ISA', 53, 'quiet', 'KJV'));
    const page = await ctx.newPage(), errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:${port}/index.html`); await page.waitForSelector('#v-5');
    const before = await page.evaluate(() => history.length);
    await page.getByRole('button', { name: 'Cross-reference map' }).click();
    await waitMap(page);
    const u = await mapUrl(page);
    check('opens on the chapter being read, in the KJV', u.includes('ref=Isa.53') && u.includes('t=kjv'), u);
    check('one history entry, so Back closes it', await page.evaluate(() => history.length) === before + 1);
    const ft = await mapFrame(page).locator('body').innerText();
    check('the chapter and its verses in the panel', /Isaiah 53/.test(ft) && /despised and rejected of men/.test(ft), ft.slice(0, 200).replace(/\n/g, ' / '));
    check('credits: the project and OpenBible.info', /Bible Cross-References by Oleksii Trekhleb/.test(ft) && /OpenBible\.info/.test(ft));
    const bg = await mapFrame(page).locator('html').evaluate(e => e.style.getPropertyValue('--color-background'));
    check('in the reader’s colours (Quiet)', bg === '#141311', bg);
    await page.screenshot({ path: `${out}/map-isaiah53.png` });
    await mapFrame(page).getByRole('link', { name: 'Threads' }).first().click();
    await page.waitForTimeout(1500);
    check('Threads view without adding history', (await mapUrl(page)).includes('view=threads') && await page.evaluate(() => history.length) === before + 1, await mapUrl(page));
    await page.screenshot({ path: `${out}/map-threads.png` });
    await page.goBack();
    await page.waitForTimeout(400);
    check('Back closes the map, the reader is where it was', await page.locator('[data-qb-map]').count() === 0 && await page.locator('#v-5').count() === 1);
    // Open again, pick a reference in the panel, open it in Quiet Bible
    await page.getByRole('button', { name: 'Cross-reference map' }).click();
    await waitMap(page);
    check('a fresh map each time (Arcs, not the Threads left open before)', !(await mapUrl(page)).includes('view=threads'), await mapUrl(page));
    await mapFrame(page).getByRole('searchbox').first().fill('Ps 22:1');
    await mapFrame(page).getByRole('searchbox').first().press('Enter');
    await page.waitForTimeout(1500);
    const u2 = await mapUrl(page);
    check('search in the map goes to Psalm 22:1', u2.includes('ref=Ps.22.1'), u2);
    await mapFrame(page).getByRole('button', { name: 'Open in Quiet Bible' }).first().click();
    await page.waitForTimeout(800);
    check('“Open in Quiet Bible” closes the map…', await page.locator('[data-qb-map]').count() === 0);
    await page.waitForSelector('#v-1');
    check('…and opens Psalm 22 in the reader', (await page.locator('header').innerText()).length > 0 && (await verse(page, 1)).includes('My God, my God, why hast thou forsaken me'), await verse(page, 1));
    check('the history entry is gone again', await page.evaluate(() => history.length) <= before + 1);
    check('no page errors (map)', errors.length === 0, errors.join(' | '));
    await ctx.close();
  }

  console.log('The map from a verse, in the BSB, on the Paper theme');
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 800 }, reducedMotion: 'reduce', hasTouch: true });
    await ctx.addInitScript(init('JHN', 3, 'paper', 'BSB'));
    const page = await ctx.newPage(), errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:${port}/index.html`); await page.waitForSelector('#v-16');
    await page.click('#v-16'); await page.waitForSelector('[data-qb-study]');
    await page.locator('[data-qb-study] button', { hasText: 'Cross-refs' }).first().click();
    await page.locator('[data-qb-map-open]').click();
    await waitMap(page);
    const u = await mapUrl(page);
    check('opens on the verse, in the BSB', u.includes('ref=John.3.16') && u.includes('t=bsb'), u);
    const ft = await mapFrame(page).locator('body').innerText();
    check('the BSB text of John 3:16 in the panel', ft.includes('He gave His one and only Son'), ft.slice(0, 300).replace(/\n/g, ' / '));
    const bg = await mapFrame(page).locator('html').evaluate(e => e.style.getPropertyValue('--color-background'));
    check('a light theme gets the dark map (its arcs glow)', bg === '#141311', bg);
    await page.screenshot({ path: `${out}/map-john316-bsb.png` });
    await mapFrame(page).getByRole('button', { name: 'Back to Quiet Bible' }).first().click();
    await page.waitForTimeout(600);
    check('the back arrow closes the map, the verse sheet is still open', await page.locator('[data-qb-map]').count() === 0 && await page.locator('[data-qb-study]').count() === 1);
    await page.locator('[data-qb-map-open]').click();
    await waitMap(page);
    await mapFrame(page).getByRole('button', { name: /^Genesis 22:12/ }).first().click();
    await page.waitForTimeout(1200);
    check('a reference in the map focuses it', (await mapUrl(page)).includes('ref=Gen.22.12'), await mapUrl(page));
    await mapFrame(page).getByRole('button', { name: 'Open in Quiet Bible' }).first().click();
    await page.waitForTimeout(800);
    check('from a verse sheet, the sheet closes and the reader goes there', await page.locator('[data-qb-map]').count() === 0 && await page.locator('[data-qb-study]').count() === 0);
    await page.waitForSelector('#v-12');
    check('Genesis 22:12 in the BSB', (await verse(page, 12)).includes('Do not lay a hand on the boy'), await verse(page, 12));
    check('no page errors (verse)', errors.length === 0, errors.join(' | '));
    await ctx.close();
  }
  await b.close();
  console.log(`\n${pass === total ? 'RESULT' : 'RESULT (FAILURES)'}: ${pass}/${total} passed`);
  process.exit(pass === total ? 0 : 1);
})();
