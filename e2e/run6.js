// Voice setting + prefetch, against fake native bridges (new bridge and an old one without the voice methods).
const { chromium } = require('playwright'); const H = require('./harness');
const voiceBridge = `
(function(){
  var S = window.QuietBibleSpeech, voice = 'natural', status = 'loading';
  window.__calls = []; window.__prefetched = [];
  setTimeout(function(){ status = 'ready'; }, 4000);
  S.getVoice = function(){ return voice; };
  S.setVoice = function(v){ window.__calls.push('setVoice:' + v); voice = v; status = v === 'natural' ? 'ready' : 'off'; };
  S.voiceStatus = function(){ return voice === 'natural' ? status : 'off'; };
  S.prefetch = function(text, rate, id){ window.__prefetched.push(id); };
  var sp = S.speak, st = S.stop;
  S.speak = function(t, r, id){ window.__calls.push('speak:' + id); return sp(t, r, id); };
  S.stop = function(){ window.__calls.push('stop'); return st(); };
})();`;
let pass = 0, total = 0;
const check = (name, ok, detail) => { total++; if (ok) pass++; console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${name}${detail !== undefined ? '  -> ' + JSON.stringify(detail) : ''}`); };

(async () => {
  const b = await chromium.launch();
  {
    const ctx = await b.newContext({ viewport: { width: 412, height: 915 } });
    await ctx.addInitScript(H.bridges({})); await ctx.addInitScript(voiceBridge);
    const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
    await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1');
    await page.evaluate(() => window.__verseMs = 300);

    console.log('Reading with the natural voice');
    await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(1200);
    const r = await page.evaluate(() => ({ spoken: window.__spoken.slice(0, 4), pre: window.__prefetched.slice(0, 4) }));
    check('each verse is spoken and the next one prepared in advance',
      r.spoken.length >= 3 && r.pre[0] === 'GEN.1.2' && r.pre[1] === 'GEN.1.3' && r.spoken[1] === 'GEN.1.2', r);
    await page.evaluate(() => { try { window.__qbTransport('pause'); } catch (e) {} });

    console.log('Settings > Listening');
    await page.click('text=Settings'); await page.waitForTimeout(400);
    const voiceUi = await page.evaluate(() => {
      const radios = [...document.querySelectorAll('[role="radio"]')].map(b => ({ t: b.textContent, on: b.getAttribute('aria-checked') }));
      const hint = document.querySelector('[data-qb-voice-hint]'); return { radios, hint: hint && hint.textContent };
    });
    check('a Voice choice appears with Natural selected', voiceUi.radios.length === 2 && voiceUi.radios[0].t === 'Natural' && voiceUi.radios[0].on === 'true', voiceUi.radios);
    check('while the voice loads it says so', /Getting the natural voice ready/.test(voiceUi.hint || ''), voiceUi.hint);
    await page.waitForTimeout(3000);
    const ready = await page.evaluate(() => document.querySelector('[data-qb-voice-hint]').textContent);
    check('...then describes the offline voice', /runs entirely on this phone/.test(ready), ready);
    await page.click('[role="radio"]:has-text("Phone voice")'); await page.waitForTimeout(300);
    const after = await page.evaluate(() => ({ calls: window.__calls.filter(c => c.startsWith('setVoice')),
      on: [...document.querySelectorAll('[role="radio"]')].map(b => b.getAttribute('aria-checked')),
      hint: document.querySelector('[data-qb-voice-hint]').textContent }));
    check('tapping "Phone voice" switches the app to the phone\'s voice', after.calls.join() === 'setVoice:system' && after.on.join() === 'false,true' && /installed on this phone/.test(after.hint), after);
    await page.click('[role="radio"]:has-text("Natural")'); await page.waitForTimeout(200);
    const back = await page.evaluate(() => window.__calls.filter(c => c.startsWith('setVoice')).join());
    check('and back to Natural', back === 'setVoice:system,setVoice:natural', back);
    const shot = '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/voice-setting.png';
    const box = await page.evaluate(() => { const el = document.querySelector('[role="radiogroup"]').closest('section') || document.querySelector('[role="radiogroup"]').parentElement.parentElement; el.scrollIntoView({block:'center'}); return true; });
    await page.waitForTimeout(200); await page.screenshot({ path: shot });
    check('no script errors', errors.length === 0, errors);
    await ctx.close();
  }
  {
    console.log('Older native bridge (no voice methods)');
    const ctx = await b.newContext({ viewport: { width: 412, height: 915 } });
    await ctx.addInitScript(H.bridges({}));
    const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
    await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1');
    await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(800);
    const n = await page.evaluate(() => window.__spoken.length);
    await page.click('text=Settings'); await page.waitForTimeout(300);
    const radios = await page.evaluate(() => document.querySelectorAll('[role="radio"]').length);
    check('reading still works and the Voice choice stays hidden', n >= 2 && radios === 0 && errors.length === 0, { spoken: n, radios, errors });
    await ctx.close();
  }
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
