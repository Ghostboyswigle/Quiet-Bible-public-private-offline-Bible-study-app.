// Several voices in Settings > Listening, against a fake native bridge that behaves like VoiceBridge.
const { chromium } = require('playwright'); const H = require('./harness');
const bridge = `
(function(){
  var S = window.QuietBibleSpeech, cur = 'john', last = 'john', status = 'ready';
  var list = [{id:'john',name:'John',note:'Male \\u00b7 slower pace',builtIn:true}];
  var pending = [{id:'kristin',name:'Kristin',note:'Female \\u00b7 slower pace'},{id:'joe',name:'Joe',note:'Male \\u00b7 quicker pace'}];
  window.__calls = [];
  S.voices = function(){ return JSON.stringify(list); };
  S.getVoice = function(){ return cur; };
  S.setVoice = function(v){ window.__calls.push('set:' + v); cur = v === 'natural' ? last : v; if (cur !== 'system') last = cur; status = cur === 'system' ? 'off' : 'loading'; setTimeout(function(){ if (cur !== 'system') status = 'ready'; }, 1200); };
  S.voiceStatus = function(){ return status; };
  S.prefetch = function(){};
  S.addVoice = function(){ window.__calls.push('add');
    setTimeout(function(){
      if (window.__nextPick === 'bad') { window.__qbVoiceAdded({ok:false,error:"That file isn't a Quiet Bible voice."}); return; }
      if (window.__nextPick === 'cancel') { window.__qbVoiceAdded({ok:false,cancelled:true}); return; }
      var v = pending.shift(); v.builtIn = false; list.push(v); list = [list[0]].concat(list.slice(1).sort(function(a,b){return a.name.localeCompare(b.name)}));
      cur = last = v.id; status = 'loading'; setTimeout(function(){ status = 'ready'; }, 1200);
      window.__qbVoiceAdded({ok:true,id:v.id,name:v.name});
    }, 400); return true; };
  S.removeVoice = function(id){ window.__calls.push('remove:' + id); list = list.filter(function(x){ return x.id !== id; }); if (cur === id) cur = last = 'john'; return true; };
})();`;
let pass = 0, total = 0;
const check = (name, ok, detail) => { total++; if (ok) pass++; console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${name}${detail !== undefined ? '  -> ' + JSON.stringify(detail) : ''}`); };
const state = page => page.evaluate(() => ({
  radios: [...document.querySelectorAll('[role="radio"]')].map(b => (b.getAttribute('aria-checked') === 'true' ? '*' : '') + b.querySelector('span').textContent),
  hint: (document.querySelector('[data-qb-voice-hint]') || {}).textContent,
  msg: (document.querySelector('[data-qb-voice-msg]') || {}).textContent || '',
  buttons: [...document.querySelectorAll('button')].map(b => b.textContent).filter(t => /Add a voice|Remove /.test(t)) }));
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 412, height: 915 } });
  await ctx.addInitScript(H.bridges({})); await ctx.addInitScript(bridge);
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8765/index.html'); await page.waitForSelector('#v-1');
  await page.click('text=Settings'); await page.waitForTimeout(400);
  let s = await state(page);
  check('starts with John (built in) and Phone voice', s.radios.join() === '*John,Phone voice' && s.buttons.join() === 'Add a voice from a file', s);

  await page.click('text=Add a voice from a file'); await page.waitForTimeout(100);
  s = await state(page);
  check('tapping Add explains what to pick', /ends in \.qbvoice/.test(s.msg), s.msg);
  await page.waitForTimeout(500); s = await state(page);
  check('after picking Kristin\'s file she appears, selected, with a confirmation', s.radios.join() === 'John,*Kristin,Phone voice' && /Kristin added/.test(s.msg) && /Getting Kristin ready/.test(s.hint), s);
  await page.waitForTimeout(2500); s = await state(page);
  check('...then ready', /run entirely on this phone/.test(s.hint) && s.buttons.includes('Remove Kristin'), s);

  await page.click('text=Add a voice from a file'); await page.waitForTimeout(700);
  s = await state(page);
  check('a second voice (Joe) is added and listed in order', s.radios.join() === 'John,Joe,*Kristin,Phone voice'.replace('*Kristin', 'Kristin').replace('Joe', '*Joe'), s.radios);

  await page.click('[role="radio"]:has-text("John")'); await page.waitForTimeout(150);
  s = await state(page);
  check('switch to John any time', s.radios[0] === '*John' && !s.buttons.some(t => t.startsWith('Remove')), s);
  await page.click('[role="radio"]:has-text("Phone voice")'); await page.waitForTimeout(150);
  s = await state(page);
  check('switch to the phone voice', s.radios[3] === '*Phone voice' && /installed on this phone/.test(s.hint), s);
  await page.click('[role="radio"]:has-text("Kristin")'); await page.waitForTimeout(150);
  await page.click('text=Remove Kristin'); await page.waitForTimeout(150);
  s = await state(page);
  check('removing Kristin goes back to John', s.radios.join() === '*John,Joe,Phone voice' && /Kristin was removed/.test(s.msg), s);

  await page.evaluate(() => window.__nextPick = 'bad');
  await page.click('text=Add a voice from a file'); await page.waitForTimeout(600);
  s = await state(page);
  check('a wrong file gets a plain explanation', /isn't a Quiet Bible voice/.test(s.msg) && s.radios.join() === '*John,Joe,Phone voice', s);
  await page.evaluate(() => window.__nextPick = 'cancel');
  await page.click('text=Add a voice from a file'); await page.waitForTimeout(600);
  s = await state(page);
  check('backing out of the picker leaves no message', s.msg === '', s.msg);

  console.log('Playing while switching');
  await page.getByRole('button', { name: 'Read', exact: true }).click(); await page.waitForTimeout(400);
  await page.evaluate(() => window.__verseMs = 3000);
  await page.click('button[aria-label="Play chapter"]'); await page.waitForTimeout(500);
  const before = await page.evaluate(() => window.__spoken.slice());
  await page.getByRole('button', { name: 'Settings', exact: true }).click(); await page.waitForTimeout(300);
  await page.click('[role="radio"]:has-text("Joe")'); await page.waitForTimeout(300);
  const after = await page.evaluate(() => window.__spoken.slice());
  check('switching while reading restarts the same verse in the new voice', after.length === before.length + 1 && after[after.length - 1] === before[before.length - 1], { before, after });

  await page.evaluate(() => document.querySelector('[role="radiogroup"]').scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(200);
  await page.screenshot({ path: '/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad/voices-setting.png' });
  check('no script errors', errors.length === 0, errors);
  await b.close();
  console.log(`\nRESULT: ${pass}/${total} passed`); process.exitCode = pass === total ? 0 : 1;
})();
