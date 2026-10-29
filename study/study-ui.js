/* Quiet Bible study tools (v1.2): Hebrew & Greek words, cross-references, commentary and a Bible
   dictionary, shown in the verse sheet. study/tools/insert_ui.py puts this file into web/app.js
   between the QB-STUDY markers, at the bundle's top level, so it uses the bundle's own names:
   F (react/jsx-runtime), C (react), hr (Button), ir (class names), We (synchronous asset read),
   ke (toast). Data comes from web/bible/study/, built by study/tools/build_study.py. */
var QB_STUDY_CACHE = new Map();
/* JSON under web/bible/ (study/..., docs/...), read through the APK's asset bridge (which only
   serves paths starting with "bible/" and without ".."), keeping the last 14 files in memory. */
function qbAssetJson(p) {
  if (QB_STUDY_CACHE.has(p)) { let v = QB_STUDY_CACHE.get(p); QB_STUDY_CACHE.delete(p); QB_STUDY_CACHE.set(p, v); return v }
  let t = null;
  try { t = We(`bible/${p}`) } catch { t = null }
  if (t == null && !(typeof window < `u` && window.QuietBibleAssets)) {
    try { let x = new XMLHttpRequest(); x.open(`GET`, `/bible/${p}`, !1); x.send(null); t = x.status === 200 ? x.responseText : null } catch { t = null }
  }
  let v = null;
  try { v = t == null ? null : JSON.parse(t) } catch { v = null }
  QB_STUDY_CACHE.set(p, v);
  while (QB_STUDY_CACHE.size > 14) QB_STUDY_CACHE.delete(QB_STUDY_CACHE.keys().next().value);
  return v
}
function qbStudyRead(p) { return qbAssetJson(`study/${p}`) }
function qbH(t, p, ...k) {
  let c = k.flat(9).filter(x => x != null && x !== !1 && x !== ``), q = { ...(p || {}) }, key = q.key;
  delete q.key;
  if (c.length) q.children = c.length > 1 ? c : c[0];
  return c.length > 1 ? (0, F.jsxs)(t, q, key) : (0, F.jsx)(t, q, key)
}
function qbStudyBooks() { return qbStudyRead(`meta.json`)?.books || [] }
function qbStudyAbbr(data, id) { let m = data?.meta?.find(e => e.id === id); return m?.abbr || m?.name || id }
function qbStudyLabel(data, id, c, v, ec, ev) {
  let b = qbStudyAbbr(data, id);
  if (ec != null && ev != null) return ec === c ? `${b} ${c}:${v}–${ev}` : `${b} ${c}:${v}–${ec}:${ev}`;
  return `${b} ${c}:${v}`
}
function qbStudyVerseText(data, id, c, v) { return data?.books?.[id]?.find(e => e.n === c)?.v?.find(e => e.n === v)?.t || `` }
function qbTranslit(s) { return String(s || ``).replace(/\.\//g, `·`).replace(/[./]/g, `·`).toLowerCase() }
function qbIsHebrew(s) { return /[֐-׿]/.test(s || ``) }
/* STEPBible text: \n line breaks and <b>/<i> only, rendered without innerHTML. */
function qbRich(s, key) {
  let out = [], b = !1, i = !1, n = 0;
  for (let line of String(s || ``).split(`\n`)) {
    let parts = [];
    for (let tok of line.split(/(<\/?[bi]>)/)) {
      if (tok === `<b>`) b = !0; else if (tok === `</b>`) b = !1; else if (tok === `<i>`) i = !0; else if (tok === `</i>`) i = !1;
      else if (tok) parts.push(qbH(`span`, { key: n++, style: { fontWeight: b ? 600 : void 0, fontStyle: i ? `italic` : void 0 } }, tok))
    }
    out.push(qbH(`p`, { key: `${key}-${n++}`, className: `mt-1` }, parts))
  }
  return out
}

/* ---- parsing codes: OpenScriptures Hebrew (as in STEPBible TAHOT) and Robinson Greek ---- */
var QB_HEB = {
  pos: { A: `Adjective`, C: `Conjunction`, D: `Adverb`, N: `Noun`, P: `Pronoun`, R: `Preposition`, S: `Suffix`, T: `Particle`, V: `Verb` },
  stemH: { q: `Qal`, N: `Niphal`, p: `Piel`, P: `Pual`, h: `Hiphil`, H: `Hophal`, t: `Hithpael`, o: `Polel`, O: `Polal`, r: `Hithpolel`, m: `Poel`, M: `Poal`, k: `Palel`, K: `Pulal`, Q: `Qal passive`, l: `Pilpel`, L: `Polpal`, f: `Hithpalpel`, D: `Nithpael`, j: `Pealal`, i: `Pilel`, u: `Hothpaal`, c: `Tiphil`, v: `Hishtaphel`, w: `Nithpalel`, y: `Nithpoel`, z: `Hithpoel` },
  stemA: { q: `Peal`, Q: `Peil`, u: `Hithpeel`, p: `Pael`, P: `Ithpaal`, M: `Hithpaal`, a: `Aphel`, h: `Haphel`, s: `Saphel`, e: `Shaphel`, H: `Hophal`, i: `Ithpeel`, t: `Hishtaphel`, v: `Ishtaphel`, w: `Hithaphel`, o: `Polel`, z: `Ithpoel`, r: `Hithpolel`, f: `Hithpalpel`, b: `Hephal`, c: `Tiphel`, m: `Poel`, l: `Palpel`, L: `Ithpalpel`, O: `Ithpolel`, G: `Ittaphal` },
  vtype: { p: `perfect`, q: `sequential perfect`, i: `imperfect`, w: `sequential imperfect`, h: `cohortative`, j: `jussive`, v: `imperative`, r: `participle`, s: `passive participle`, a: `infinitive absolute`, c: `infinitive construct` },
  person: { 1: `1st person`, 2: `2nd person`, 3: `3rd person` },
  gender: { m: `masculine`, f: `feminine`, c: `common`, b: `both genders` },
  number: { s: `singular`, p: `plural`, d: `dual` },
  state: { a: `absolute`, c: `construct`, d: `determined` },
  ntype: { c: `common`, g: `gentilic`, p: `proper name` },
  atype: { a: ``, c: `cardinal number`, g: `gentilic`, o: `ordinal number` },
  ptype: { d: `demonstrative`, f: `indefinite`, i: `interrogative`, p: `personal`, r: `relative` },
  stype: { d: `directional he`, h: `paragogic he`, n: `paragogic nun`, p: `pronominal` },
  ttype: { a: `affirmation`, d: `definite article`, e: `exhortation`, i: `interrogative`, j: `interjection`, m: `demonstrative`, n: `negative`, o: `direct object marker`, r: `relative` }
};
function qbParseHeb(code) {
  let H = QB_HEB, aram = code[0] === `A`, segs = code.slice(1).split(`/`), out = [];
  for (let s of segs) {
    if (!s) continue;
    let p = s[0], r = s.slice(1), w = [];
    if (p === `V`) {
      w.push((aram ? H.stemA : H.stemH)[r[0]] || ``, H.vtype[r[1]] || ``);
      let t = r[1], rest = r.slice(2);
      if (t === `r` || t === `s`) w.push(H.gender[rest[0]], H.number[rest[1]], H.state[rest[2]]);
      else if (t !== `a` && t !== `c`) w.push(H.person[rest[0]], H.gender[rest[1]], H.number[rest[2]]);
      out.push(`Verb, ` + w.filter(Boolean).join(` `));
    } else if (p === `N`) {
      if (r[0] === `p`) { out.push(`Proper name`); continue }
      w.push(H.ntype[r[0]], `noun`, H.gender[r[1]], H.number[r[2]], H.state[r[3]]);
      out.push(w.filter(Boolean).join(` `).replace(/^./, c => c.toUpperCase()));
    } else if (p === `A`) {
      w.push(H.atype[r[0]] || `adjective`, H.gender[r[1]], H.number[r[2]], H.state[r[3]]);
      out.push(`Adjective` + (w.filter(Boolean).length ? `, ` + w.filter(Boolean).join(` `) : ``));
    } else if (p === `P`) {
      w.push(H.ptype[r[0]], `pronoun`, H.person[r[1]], H.gender[r[2]], H.number[r[3]]);
      out.push(w.filter(Boolean).join(` `).replace(/^./, c => c.toUpperCase()));
    } else if (p === `S`) {
      w.push(H.stype[r[0]], `suffix`, H.person[r[1]], H.gender[r[2]], H.number[r[3]]);
      out.push(w.filter(Boolean).join(` `).replace(/^./, c => c.toUpperCase()));
    } else if (p === `T`) out.push(`Particle` + (H.ttype[r[0]] ? `, ` + H.ttype[r[0]] : ``));
    else if (p === `R`) out.push(r[0] === `d` ? `Preposition with article` : `Preposition`);
    else out.push(H.pos[p] || s);
  }
  return (aram ? `Aramaic. ` : ``) + out.join(` + `)
}
var QB_GRK = {
  pos: { N: `Noun`, A: `Adjective`, T: `Article`, P: `Personal pronoun`, R: `Relative pronoun`, C: `Reciprocal pronoun`, D: `Demonstrative pronoun`, K: `Correlative pronoun`, I: `Interrogative pronoun`, X: `Indefinite pronoun`, Q: `Correlative or interrogative pronoun`, F: `Reflexive pronoun`, S: `Possessive pronoun` },
  word: { CONJ: `Conjunction`, ADV: `Adverb`, PREP: `Preposition`, PRT: `Particle`, INJ: `Interjection`, COND: `Conditional`, HEB: `Hebrew word`, ARAM: `Aramaic word` },
  tense: { P: `present`, I: `imperfect`, F: `future`, A: `aorist`, R: `perfect`, L: `pluperfect` },
  voice: { A: `active`, M: `middle`, P: `passive`, D: `middle deponent`, O: `passive deponent`, N: `middle or passive deponent`, E: `middle or passive`, Q: `impersonal active`, X: `no voice` },
  mood: { I: `indicative`, S: `subjunctive`, O: `optative`, M: `imperative`, N: `infinitive`, P: `participle`, R: `imperative participle` },
  kase: { N: `nominative`, G: `genitive`, D: `dative`, A: `accusative`, V: `vocative` },
  num: { S: `singular`, P: `plural` },
  gen: { M: `masculine`, F: `feminine`, N: `neuter` }
};
function qbParseGrk(code) {
  let G = QB_GRK, parts = code.split(`-`), p = parts[0];
  if (G.word[p]) return G.word[p] + (parts[1] === `N` ? `, negative` : parts[1] === `I` ? `, interrogative` : ``);
  let cng = s => s ? [G.kase[s[0]], G.num[s[1]], G.gen[s[2]]].filter(Boolean).join(` `) : ``;
  if (p === `V`) {
    let m = (parts[1] || ``).match(/^(2?)([PIFARL])([A-Z])([A-Z])$/);
    if (!m) return `Verb`;
    let w = [(m[1] ? `second ` : ``) + G.tense[m[2]], G.voice[m[3]], G.mood[m[4]]];
    let pn = parts[2] || ``, x = pn.match(/^([123])([SP])$/);
    if (x) w.push(`${x[1]}${x[1] === `1` ? `st` : x[1] === `2` ? `nd` : `rd`} person ${G.num[x[2]]}`);
    else if (pn) w.push(cng(pn));
    return `Verb, ` + w.filter(Boolean).join(` `)
  }
  if (G.pos[p]) {
    let rest = parts.slice(1).filter(s => !/^[TPLCSI]$|^ATT$|^PRI$|^NUI$|^LI$|^OI$/.test(s)), s = rest[0] || ``, x = s.match(/^([123])([NGDAV][SP][MFN]?)$/);
    let d = x ? `${x[1]}${x[1] === `1` ? `st` : x[1] === `2` ? `nd` : `rd`} person ` + cng(x[2]) : cng(s);
    let tag = parts.includes(`PRI`) || parts.includes(`NUI`) ? `, indeclinable` : ``;
    return G.pos[p] + (d ? `, ${d}` : ``) + tag
  }
  return code
}
function qbParse(code) {
  if (!code) return ``;
  try { return code.includes(`-`) || QB_GRK.word[code] || !/^[HA][A-Z]/.test(code) ? qbParseGrk(code) : qbParseHeb(code) } catch { return code }
}

/* ---- lexicon ---- */
var QB_LEXPOS = { N: `Noun`, V: `Verb`, A: `Adjective`, ADV: `Adverb`, PREP: `Preposition`, CONJ: `Conjunction`, PART: `Particle`, PRT: `Particle`, INTJ: `Interjection`, INJ: `Interjection`,
  COND: `Conditional`, INTG: `Interrogative`, DEMP: `Demonstrative pronoun`, RELP: `Relative pronoun`, PERP: `Personal pronoun`, NEG: `Negative`, D: `Demonstrative pronoun`, R: `Relative pronoun`,
  P: `Personal pronoun`, T: `Article`, X: `Indefinite pronoun`, I: `Interrogative pronoun`, F: `Reflexive pronoun`, S: `Possessive pronoun`, C: `Reciprocal pronoun`, K: `Correlative pronoun`, Q: `Correlative pronoun` };
var QB_LEXSUF = { M: `masculine`, F: `feminine`, N: `neuter`, "M/F": `masculine or feminine`, "M/N": `masculine or neuter`, PRI: `proper name`, LI: `letter`, NUI: `number`, C: `comparative`, I: `interrogative`, T: `time`, 1: `1st person`, 2: `2nd person`, 3: `3rd person` };
function qbLexPos(code) {
  return String(code || ``).split(/\s*[/+]\s*(?=[HAG]:)/).map(alt => {
    let m = /^([HAG]):(.*)$/.exec(alt.trim());
    if (!m) return alt;
    let [p, ...rest] = m[2].split(`-`).filter(Boolean), head = QB_LEXPOS[(p || ``).toUpperCase()] || p;
    if (p === `PRT` && rest[0] === `N`) return `Negative particle`;
    if (p === `ADV` && rest[0] === `N`) return `Negative adverb`;
    let suf = rest.map(r => QB_LEXSUF[r] || ``).filter(Boolean);
    return (m[1] === `A` ? `Aramaic ` + head.toLowerCase() : head) + (suf.length ? `, ${suf.join(` `)}` : ``)
  }).join(` or `)
}
function qbLex(s) {
  let m = /^([HG])(\d+)/.exec(s || ``);
  if (!m) return null;
  let n = Number(m[2]), f = qbStudyRead(`lex/${m[1]}${String(Math.floor(n / 100)).padStart(2, `0`)}.json`);
  return f ? f[String(n)] || null : null
}
function qbLexRefs(e) {
  let out = [], k = 0;
  for (let d of e?.r || []) { k += d; out.push([Math.floor(k / 1e6), Math.floor(k / 1e3) % 1e3, k % 1e3]) }
  return out
}
function QbWord({ data, strong, orig, onJump }) {
  let [all, setAll] = (0, C.useState)(!1), e = qbLex(strong), books = qbStudyBooks();
  let m = /^([HG])(\d+)([A-Z]?)/.exec(orig?.[4] || ``), letter = m && m[2] === String(strong).slice(1) ? m[3] : ``;
  if (!e) return qbH(`p`, { className: `mt-2 text-sm text-muted` }, `No dictionary entry for ${strong}.`);
  let senses = e.t || [], sense = senses.find(t => t[0] === letter) || senses[0], heb = strong[0] === `H`;
  let refs = qbLexRefs(e), shown = all ? refs : refs.slice(0, 40), head = (t) => qbH(`p`, { className: `mt-3 text-xs font-medium uppercase text-accent` }, t);
  return qbH(`div`, { className: `mt-2 rounded-[var(--radius-md)] bg-bg p-3 text-sm leading-relaxed`, "data-qb-word": strong },
    orig ? qbH(`div`, { className: `flex flex-wrap items-center gap-2` },
      qbH(`span`, { className: `text-2xl`, dir: qbIsHebrew(orig[0]) ? `rtl` : `ltr`, lang: heb ? `he` : `grc` }, orig[0]),
      qbH(`span`, { className: `text-muted` }, qbTranslit(orig[1])),
      orig[2] ? qbH(`span`, { className: `text-muted` }, `“${orig[2]}”`) : null) : null,
    orig?.[3] ? qbH(`p`, { className: `text-xs text-muted` }, qbParse(orig[3])) : null,
    head(`${heb ? `Hebrew` : `Greek`} ${strong}`),
    qbH(`p`, null, qbH(`span`, { className: `text-lg`, dir: heb ? `rtl` : `ltr`, lang: heb ? `he` : `grc` }, e.l || sense?.[1] || ``), ` `,
      qbH(`span`, { className: `text-muted` }, [e.x, e.p ? `(${e.p})` : ``].filter(Boolean).join(` `))),
    sense?.[4] ? qbH(`p`, null, qbH(`span`, { className: `font-medium` }, sense[4]), sense[3] ? qbH(`span`, { className: `text-muted` }, ` · ${qbLexPos(sense[3])}`) : null) : null,
    e.s ? [head(`Strong’s definition`), qbH(`p`, null, e.s), e.d ? qbH(`p`, { className: `text-xs text-muted` }, e.d) : null] : null,
    sense?.[5] ? [head(`Meaning`), qbH(`div`, { className: `text-muted` }, qbRich(sense[5], `m`))] : null,
    e.u?.length ? [head(`How the KJV translates it`), qbH(`p`, null, (e.u.filter(u => u[1] > 1).length ? e.u.filter(u => u[1] > 1).slice(0, 8) : e.u.slice(0, 6)).map(([w, c]) => `${w} (${c}×)`).join(`, `))] : null,
    e.k ? qbH(`p`, { className: `text-xs text-muted` }, `Strong’s lists: ${e.k}`) : null,
    refs.length ? [head(`Used ${e.n || refs.length} times in ${refs.length} verse${refs.length === 1 ? `` : `s`}`),
      qbH(`div`, { className: `mt-1 flex flex-wrap gap-1` }, shown.map(([b, c, v]) => {
        let id = books[b - 1];
        return qbH(`button`, { type: `button`, key: `${b}.${c}.${v}`, className: `rounded-full bg-surface px-2 py-1 text-xs text-fg`, onClick: () => id && onJump(id, c, v) }, qbStudyLabel(data, id, c, v))
      })),
      refs.length > shown.length ? qbH(hr, { size: `sm`, className: `mt-2`, onClick: () => setAll(!0) }, `Show all ${refs.length}`) : null] : null)
}
function QbWords({ data, book, chapter, verse, onJump }) {
  let [open, setOpen] = (0, C.useState)(null), [pick, setPick] = (0, C.useState)(0);
  let ph = qbStudyRead(`w/${book}.json`)?.[`${chapter}:${verse}`];
  if (!ph) return qbH(`p`, { className: `text-sm text-muted` }, `Hebrew and Greek words aren’t available for this verse.`);
  let nt = qbStudyBooks().indexOf(book) >= 39, kjv = qbTrInfo().id === `KJV`;
  return qbH(`div`, { "data-qb-words": `` },
    qbH(`p`, { className: `text-xs text-muted` }, `${kjv ? `` : `King James Version. `}Tap a word to see the ${nt ? `Greek` : `Hebrew`} behind it.`),
    qbH(`div`, { className: `mt-2` }, ph.map((p, i) => {
      let [eng, s = ``, fl = 0, origs = []] = p, ss = s ? s.split(` `) : [], on = open === i;
      let o = origs.find(x => String(x[4] || ``).replace(/[A-Z]$/, ``) === ss[0]) || origs[0];
      let row = qbH(`button`, {
        type: `button`, key: `r${i}`, disabled: !ss.length, "aria-expanded": ss.length ? on : void 0,
        className: ir(`flex w-full items-center justify-between gap-3 border-b border-border py-2 text-left`, ss.length ? `text-fg` : `text-muted`),
        onClick: () => { setOpen(on ? null : i); setPick(0) }
      },
        qbH(`span`, { className: `min-w-0 font-scripture text-base`, style: { fontStyle: fl & 1 ? `italic` : void 0, fontVariant: fl & 2 ? `small-caps` : void 0 } }, eng.replace(/[,;:.?!]+$/, ``)),
        ss.length ? qbH(`span`, { className: `flex shrink-0 items-center gap-2` },
          o ? qbH(`span`, { className: `text-base`, dir: qbIsHebrew(o[0]) ? `rtl` : `ltr` }, o[0]) : null,
          qbH(`span`, { className: `text-xs text-accent tabular-nums` }, ss[0])) : (fl & 1 ? qbH(`span`, { className: `shrink-0 text-xs text-muted` }, `added`) : null));
      if (!on) return row;
      let choices = ss.map(st => [st, origs.find(x => x[4] && x[4].replace(/[A-Z]$/, ``) === st) || null]);
      let [sn, so] = choices[Math.min(pick, choices.length - 1)];
      return qbH(`div`, { key: `o${i}` }, row,
        choices.length > 1 ? qbH(`div`, { className: `mt-2 flex flex-wrap gap-2` }, choices.map(([c, oo], j) =>
          qbH(hr, { key: c, size: `sm`, variant: j === Math.min(pick, choices.length - 1) ? `primary` : `secondary`, onClick: () => setPick(j) }, `${c}${oo?.[2] ? ` · ${oo[2]}` : ``}`))) : null,
        qbH(QbWord, { data, strong: sn, orig: so || o, onJump, key: sn }))
    })),
    qbH(`p`, { className: `mt-2 text-xs text-muted` }, `Words in italics were added by the translators.`))
}

/* ---- cross-references ---- */
function QbRefs({ data, book, chapter, verse, onJump }) {
  let [all, setAll] = (0, C.useState)(!1), books = qbStudyBooks();
  let list = qbStudyRead(`x/${book}.json`)?.[`${chapter}:${verse}`] || [];
  let map = qbH(hr, { size: `sm`, className: `mb-3`, "data-qb-map-open": ``, onClick: () => qbOpenMap({ book, chapter, verse, onRead: onJump }) }, qbMapIcon(), `See it on the cross-reference map`);
  if (!list.length) return qbH(`div`, null, map, qbH(`p`, { className: `text-sm text-muted` }, `No cross-references for this verse.`));
  let shown = all ? list : list.slice(0, 12);
  return qbH(`div`, null, map, qbH(`div`, { "data-qb-xrefs": `` },
    qbH(`div`, { className: `space-y-2` }, shown.map(([b, c, v, ec, ev]) => {
      let id = books[b - 1], t = qbStudyVerseText(data, id, c, v);
      return qbH(`button`, { type: `button`, key: `${b}.${c}.${v}.${ec || ``}.${ev || ``}`, className: `block w-full rounded-[var(--radius-md)] bg-bg px-3 py-2 text-left`, onClick: () => id && onJump(id, c, v) },
        qbH(`span`, { className: `block text-sm font-medium text-accent` }, qbStudyLabel(data, id, c, v, ec, ev)),
        t ? qbH(`span`, { className: `block font-scripture text-sm text-fg`, style: { display: `-webkit-box`, WebkitLineClamp: 2, WebkitBoxOrient: `vertical`, overflow: `hidden` } }, t) : null)
    })),
    list.length > shown.length ? qbH(hr, { size: `sm`, className: `mt-3`, onClick: () => setAll(!0) }, `Show all ${list.length}`) : null,
    qbH(`p`, { className: `mt-3 text-xs text-muted` }, `From OpenBible.info, most useful first.`)))
}

/* ---- commentary ---- */
var QB_COMMENTARIES = [[`mh`, `Matthew Henry`], [`jfb`, `Jamieson, Fausset & Brown`]];
function qbCommentaryText(text, key) {
  return String(text || ``).split(/\n\s*\n|\n/).filter(s => s.trim()).map((p, i) => qbH(`p`, { key: `${key}${i}`, className: `mt-2` }, p.trim()))
}
function QbCommentary({ data, book, chapter, verse }) {
  let [which, setWhich] = (0, C.useState)(() => { try { return localStorage.getItem(`qb-commentary`) || `mh` } catch { return `mh` } });
  let [more, setMore] = (0, C.useState)(!1), [intro, setIntro] = (0, C.useState)(!1);
  let choose = w => { setWhich(w); setMore(!1); setIntro(!1); try { localStorage.setItem(`qb-commentary`, w) } catch { } };
  let name = QB_COMMENTARIES.find(c => c[0] === which)?.[1] || ``, has = (qbStudyRead(`meta.json`)?.commentaries?.[which] || []).includes(book);
  let f = has ? qbStudyRead(`c/${which}/${book}.json`) : null, ch = f?.c?.[String(chapter)];
  let e = ch?.e?.find(x => x[0] <= verse && verse <= x[1]), limit = 1400, txt = e ? e[2] : ``, long = txt.length > limit + 200;
  return qbH(`div`, { "data-qb-commentary": which },
    qbH(`div`, { className: `flex flex-wrap gap-2` }, QB_COMMENTARIES.map(([k, n]) => qbH(hr, { key: k, size: `sm`, variant: k === which ? `primary` : `secondary`, onClick: () => choose(k) }, n))),
    e ? [qbH(`p`, { className: `mt-3 text-sm font-medium text-fg` }, qbStudyLabel(data, book, chapter, e[0], e[1] !== e[0] ? chapter : null, e[1] !== e[0] ? e[1] : null)),
      qbH(`div`, { className: `text-sm leading-relaxed text-muted`, "data-qb-commentary-text": `` }, qbCommentaryText(long && !more ? txt.slice(0, limit).replace(/\s+\S*$/, ``) + `…` : txt, `t`)),
      long ? qbH(hr, { size: `sm`, className: `mt-2`, onClick: () => setMore(!more) }, more ? `Show less` : `Read more`) : null]
      : qbH(`p`, { className: `mt-3 text-sm text-muted` }, f ? `${name} has no note on this verse.` : `${name}’s commentary doesn’t cover this book.`),
    ch?.i ? [qbH(hr, { size: `sm`, className: `mt-2`, onClick: () => setIntro(!intro) }, intro ? `Hide chapter introduction` : `Chapter introduction`),
      intro ? qbH(`div`, { className: `text-sm leading-relaxed text-muted` }, qbCommentaryText(ch.i, `i`)) : null] : null)
}

/* ---- dictionary ---- */
function qbDictIndex() {
  let x = window.__qbDictIdx;
  if (x) return x;
  let rows = qbStudyRead(`d/index.json`) || [];
  x = { rows, map: new Map(rows.map(r => [r[1], r])) };
  window.__qbDictIdx = x;
  return x
}
function qbDictEntry(key) {
  let c = /^[A-Z]/.test(key) ? key[0] : `_`;
  return qbStudyRead(`d/${c}.json`)?.[key] || null
}
function qbDictTerms(words) {
  let idx = qbDictIndex().map, out = [], seen = new Set();
  let w = words.map(s => s.replace(/[’']s$/i, ``).replace(/[^A-Za-z-]/g, ``).toUpperCase()).filter(Boolean);
  for (let i = 0; i < w.length; i++) for (let n = 3; n >= 1; n--) {
    if (i + n > w.length) continue;
    let k = w.slice(i, i + n).join(` `), r = idx.get(k);
    if (r && !(r[2] & 8) && !seen.has(k)) { seen.add(k); out.push(r) }
  }
  return out
}
function QbDictionary({ data, book, chapter, verse, text, onJump }) {
  let [term, setTerm] = (0, C.useState)(null), [q, setQ] = (0, C.useState)(``), books = qbStudyBooks();
  let ph = qbStudyRead(`w/${book}.json`)?.[`${chapter}:${verse}`];
  let words = ph ? ph.map(p => p[0]).join(` `).split(/\s+/) : qbTrInfo().lang === `en` ? String(text || ``).split(/\s+/) : [];
  let terms = qbDictTerms(words), qq = q.trim().toUpperCase(), found = qq.length >= 2 ? qbDictIndex().rows.filter(r => r[1].startsWith(qq)).slice(0, 30) : [];
  let e = term ? qbDictEntry(term[1]) : null;
  let src = (k, n) => e?.[k] ? [qbH(`p`, { key: `h${k}`, className: `mt-3 text-xs font-medium uppercase text-accent` }, n), qbCommentaryText(e[k], k)] : null;
  let chip = (r) => qbH(`button`, { type: `button`, key: r[1], className: ir(`rounded-full px-3 py-1.5 text-sm`, term?.[1] === r[1] ? `bg-accent text-accent-fg` : `bg-bg text-fg`), onClick: () => setTerm(term?.[1] === r[1] ? null : r) }, r[0]);
  return qbH(`div`, { "data-qb-dictionary": `` },
    terms.length ? qbH(`div`, { className: `flex flex-wrap gap-2` }, terms.map(chip)) : qbH(`p`, { className: `text-sm text-muted` }, `No dictionary entries for the words in this verse.`),
    qbH(`input`, { type: `search`, value: q, placeholder: `Look up a word or name`, "aria-label": `Look up a word or name in the dictionary`, onChange: ev => setQ(ev.target.value),
      className: `mt-3 w-full rounded-[var(--radius-md)] bg-bg px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)]`, style: { outline: `none` } }),
    found.length ? qbH(`div`, { className: `mt-2 flex flex-wrap gap-2` }, found.map(chip)) : qq.length >= 2 ? qbH(`p`, { className: `mt-2 text-sm text-muted` }, `Nothing found.`) : null,
    e ? qbH(`div`, { className: `mt-3 rounded-[var(--radius-md)] bg-bg p-3 text-sm leading-relaxed text-muted`, "data-qb-dict-entry": term[1] },
      qbH(`p`, { className: `text-base font-medium text-fg` }, e.n),
      src(`h`, `Meaning of the name (Hitchcock)`), src(`e`, `Easton’s Bible Dictionary`), src(`s`, `Smith’s Bible Dictionary`),
      e.r?.length ? [qbH(`p`, { key: `rh`, className: `mt-3 text-xs font-medium uppercase text-accent` }, `Verses`),
        qbH(`div`, { key: `rr`, className: `mt-1 flex flex-wrap gap-1` }, e.r.slice(0, 40).map(([b, c, v]) => {
          let id = books[b - 1];
          return qbH(`button`, { type: `button`, key: `${b}.${c}.${v}`, className: `rounded-full bg-surface px-2 py-1 text-xs text-fg`, onClick: () => id && onJump(id, c, v) }, qbStudyLabel(data, id, c, v))
        }))] : null) : null)
}

/* ---- the Study section of the verse sheet ---- */
var QB_STUDY_TABS = [[`w`, `Hebrew & Greek`], [`x`, `Cross-refs`], [`c`, `Commentary`], [`d`, `Dictionary`]];
function QbStudy({ data, book, chapter, verse, onJump }) {
  let [tab, setTab] = (0, C.useState)(() => { try { return localStorage.getItem(`qb-study-tab`) || `` } catch { return `` } });
  if (!verse || !qbStudyRead(`meta.json`)) return null;
  let nt = qbStudyBooks().indexOf(book) >= 39, choose = t => { let n = tab === t ? `` : t; setTab(n); try { localStorage.setItem(`qb-study-tab`, n) } catch { } };
  let p = { data, book, chapter, verse: verse.n, text: verse.t, onJump };
  return qbH(`section`, { className: `mt-5 border-t border-border pt-4`, "data-qb-study": `` },
    qbH(`h3`, { className: `mb-2 text-xs font-medium uppercase tracking-[0.14em] text-accent` }, `Study`),
    qbH(`div`, { className: `grid grid-cols-2 gap-2` }, QB_STUDY_TABS.map(([k, n]) =>
      qbH(hr, { key: k, size: `sm`, variant: tab === k ? `primary` : `secondary`, "aria-pressed": tab === k, onClick: () => choose(k) }, k === `w` ? (nt ? `Greek words` : `Hebrew words`) : n))),
    tab ? qbH(`div`, { className: `mt-4` },
      tab === `w` ? qbH(QbWords, { ...p, key: `w` }) : tab === `x` ? qbH(QbRefs, { ...p, key: `x` }) : tab === `c` ? qbH(QbCommentary, { ...p, key: `c` }) : qbH(QbDictionary, { ...p, key: `d` })) : null)
}

/* ---- Other research documents (Library > Research), v1.3: web/bible/docs, built by study/tools/build_docs.py ---- */
function qbDocsRead(p) { return qbAssetJson(`docs/${p}`) }
function qbInline(s, key) {
  let parts = [], b = !1, i = !1, sup = !1, n = 0;
  for (let tok of String(s || ``).split(/(<\/?(?:b|i|sup)>)/)) {
    if (tok === `<b>`) b = !0; else if (tok === `</b>`) b = !1; else if (tok === `<i>`) i = !0; else if (tok === `</i>`) i = !1;
    else if (tok === `<sup>`) sup = !0; else if (tok === `</sup>`) sup = !1;
    else if (tok) parts.push(sup ? qbH(`sup`, { key: `${key}-${n++}`, className: `text-accent`, style: { fontSize: `0.7em`, padding: `0 1px` } }, tok)
      : qbH(`span`, { key: `${key}-${n++}`, style: { fontWeight: b ? 600 : void 0, fontStyle: i ? `italic` : void 0 } }, tok))
  }
  return parts
}
function qbDocPos(id) { try { let v = localStorage.getItem(`qb-doc-${id}`); let m = /^(\d+)\.(\d+)$/.exec(v || ``); return m ? [Number(m[1]), Number(m[2])] : null } catch { return null } }
function qbDocSavePos(id, p, s) { try { localStorage.setItem(`qb-doc-${id}`, `${p}.${s}`) } catch { } }
function qbScrollTop(el) {
  let n = el;
  while (n && n !== document.body) { let o = getComputedStyle(n).overflowY; if ((o === `auto` || o === `scroll`) && n.scrollHeight > n.clientHeight) { n.scrollTop = 0; return } n = n.parentElement }
  window.scrollTo(0, 0)
}
var QB_CARD = `block w-full rounded-[var(--radius-md)] bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]`;
function QbResearch() {
  let idx = qbDocsRead(`index.json`), [view, setView] = (0, C.useState)(null), top = (0, C.useRef)(null);
  let go = v => { setView(v); setTimeout(() => qbScrollTop(top.current), 0) };
  if (!idx) return qbH(`p`, { className: `mt-8 text-sm text-muted` }, `The research documents aren’t in this copy of the app.`);
  let doc = view && idx.documents.find(d => d.id === view.id);
  return qbH(`div`, { className: `mt-6`, ref: top, "data-qb-research": view ? view.id : `` },
    !doc ? qbH(QbResearchList, { idx, open: id => go({ id }) })
      : view.part == null ? qbH(QbDocPage, { doc, back: () => go(null), open: (part, sec) => go({ id: doc.id, part, sec }), pick: part => go({ id: doc.id, part, sec: -1 }) })
        : view.sec < 0 ? qbH(QbDocContents, { doc, part: view.part, back: () => go({ id: doc.id }), open: sec => go({ id: doc.id, part: view.part, sec }) })
          : qbH(QbDocReader, { doc, part: view.part, sec: view.sec, back: () => go({ id: doc.id }), contents: () => go({ id: doc.id, part: view.part, sec: -1 }), open: (part, sec) => go({ id: doc.id, part, sec }) }))
}
function QbResearchList({ idx, open }) {
  return qbH(`div`, { "data-qb-research-list": `` },
    qbH(`h2`, { className: `font-display text-xl font-medium tracking-tight` }, `Other research documents`),
    qbH(`p`, { className: `mt-1 text-sm leading-relaxed text-muted` }, idx.intro),
    idx.groups.map(g => {
      let docs = idx.documents.filter(d => d.group === g.id);
      if (!docs.length) return null;
      return qbH(`section`, { key: g.id, className: `mt-6` },
        qbH(`h3`, { className: `text-xs font-medium uppercase tracking-[0.14em] text-accent` }, g.title),
        qbH(`p`, { className: `mt-1 text-sm text-muted` }, g.about),
        qbH(`div`, { className: `mt-3 space-y-2` }, docs.map(d => qbH(`button`, { key: d.id, type: `button`, className: QB_CARD, onClick: () => open(d.id), "data-qb-doc": d.id },
          qbH(`span`, { className: `block text-base font-medium text-fg` }, d.title),
          qbH(`span`, { className: `mt-1 block text-xs text-muted` }, [d.by, d.date].filter(Boolean).join(` · `)),
          d.warning ? qbH(`span`, { className: `mt-1 block text-xs text-accent` }, `Warning: read the note before opening`) : null))))
    }),
    idx.missing ? qbH(`p`, { className: `mt-6 text-xs leading-relaxed text-muted` }, idx.missing) : null)
}
function QbDocPage({ doc, back, open, pick }) {
  let pos = qbDocPos(doc.id), box = (title, text, accent) => qbH(`div`, { className: `mt-4 rounded-[var(--radius-md)] bg-surface px-4 py-3 shadow-[var(--shadow-border)]`, style: accent ? { borderLeft: `3px solid var(--color-accent)` } : void 0 },
    qbH(`p`, { className: `text-xs font-medium uppercase tracking-[0.14em] text-accent` }, title), qbH(`p`, { className: `mt-1 text-sm leading-relaxed text-fg` }, text));
  let one = doc.parts.length === 1;
  return qbH(`div`, { "data-qb-doc-page": doc.id },
    qbH(hr, { size: `sm`, variant: `ghost`, onClick: back }, `‹ All documents`),
    qbH(`h2`, { className: `mt-2 font-display text-xl font-medium tracking-tight` }, doc.title),
    qbH(`p`, { className: `mt-1 text-sm text-muted` }, [doc.by, doc.date].filter(Boolean).join(` · `)),
    doc.warning ? box(`Warning`, doc.warning, !0) : null,
    qbH(`p`, { className: `mt-4 text-sm leading-relaxed text-fg` }, doc.about),
    doc.channel ? box(`What the channel says`, doc.channel) : null,
    qbH(`div`, { className: `mt-4 flex flex-wrap gap-2` },
      pos ? qbH(hr, { variant: `primary`, onClick: () => open(pos[0], pos[1]) }, `Continue reading`) : null,
      qbH(hr, { variant: pos ? `secondary` : `primary`, onClick: () => one ? pick(0) : open(0, 0) }, one ? `Contents` : `Start reading`)),
    !one ? [qbH(`h3`, { key: `ch`, className: `mt-6 text-xs font-medium uppercase tracking-[0.14em] text-accent` }, `Contents`),
      qbH(`div`, { key: `cl`, className: `mt-2 space-y-2` }, doc.parts.map((p, i) => qbH(`button`, { key: i, type: `button`, className: QB_CARD, onClick: () => p.n === 1 ? open(i, 0) : pick(i) },
        qbH(`span`, { className: `block text-sm font-medium text-fg` }, p.t),
        p.n > 1 ? qbH(`span`, { className: `block text-xs text-muted` }, `${p.n} ${doc.kind === `verses` ? `chapters` : `sections`}`) : null)))] : null,
    qbH(`p`, { className: `mt-6 text-xs leading-relaxed text-muted` }, `${doc.credit} ${doc.license}.`))
}
function QbDocContents({ doc, part, back, open }) {
  let p = qbDocsRead(`${doc.id}/${part}.json`);
  if (!p) return qbH(`p`, { className: `text-sm text-muted` }, `This part couldn’t be opened.`);
  let verses = doc.kind === `verses`;
  return qbH(`div`, { "data-qb-doc-contents": `${doc.id}.${part}` },
    qbH(hr, { size: `sm`, variant: `ghost`, onClick: back }, `‹ ${doc.title}`),
    qbH(`h2`, { className: `mt-2 font-display text-xl font-medium tracking-tight` }, p.t),
    verses ? qbH(`div`, { className: `mt-4 grid gap-2`, style: { gridTemplateColumns: `repeat(auto-fill, minmax(3rem, 1fr))` } },
      p.s.map((s, i) => qbH(`button`, { key: i, type: `button`, className: `h-11 rounded-[var(--radius-md)] bg-surface text-sm text-fg shadow-[var(--shadow-border)] tabular-nums`, onClick: () => open(i) }, s.t.replace(/^Chapter /, ``))))
      : qbH(`div`, { className: `mt-4 space-y-2` }, p.s.map((s, i) => qbH(`button`, { key: i, type: `button`, className: QB_CARD, onClick: () => open(i) }, qbH(`span`, { className: `block text-sm text-fg` }, s.t)))))
}
function QbDocReader({ doc, part, sec, back, contents, open }) {
  let p = qbDocsRead(`${doc.id}/${part}.json`), s = p?.s?.[sec];
  (0, C.useEffect)(() => { s && qbDocSavePos(doc.id, part, sec) }, [doc.id, part, sec]);
  if (!s) return qbH(`p`, { className: `text-sm text-muted` }, `This section couldn’t be opened.`);
  let rtl = doc.dir === `rtl`, prevP = sec > 0 ? [part, sec - 1] : part > 0 ? [part - 1, Math.max(0, (doc.parts[part - 1]?.n || 1) - 1)] : null;
  let nextP = sec + 1 < p.s.length ? [part, sec + 1] : part + 1 < doc.parts.length ? [part + 1, 0] : null;
  let nav = k => qbH(`div`, { key: k, className: `mt-6 grid grid-cols-2 gap-2` },
    qbH(hr, { disabled: !prevP, onClick: () => prevP && open(prevP[0], prevP[1]) }, `‹ Previous`),
    qbH(hr, { disabled: !nextP, onClick: () => nextP && open(nextP[0], nextP[1]) }, `Next ›`));
  let label = (doc.parts.length > 1 ? `${p.t} · ` : ``) + s.t;
  return qbH(`div`, { "data-qb-doc-reader": `${doc.id}.${part}.${sec}` },
    qbH(`div`, { className: `flex flex-wrap items-center gap-2` },
      qbH(hr, { size: `sm`, variant: `ghost`, onClick: back }, `‹ ${doc.title}`),
      qbH(hr, { size: `sm`, variant: `ghost`, onClick: contents }, `Contents`)),
    qbH(`h2`, { className: `mt-2 font-display text-xl font-medium tracking-tight` }, label),
    qbH(`div`, { className: ir(`mt-4 font-scripture leading-relaxed text-fg`, rtl ? `text-2xl` : `text-lg`), dir: rtl ? `rtl` : `ltr`, lang: doc.lang },
      s.v ? s.v.map(([n, t], i) => qbH(`p`, { key: i, className: `mt-2` }, n ? qbH(`sup`, { className: `text-accent tabular-nums`, style: { fontSize: `0.6em`, padding: `0 4px 0 2px` } }, n) : null, qbInline(t, `v${i}`)))
        : s.b.map(([k, t], i) => k === `h` ? qbH(`p`, { key: i, className: `mt-5 text-base font-medium text-accent` }, qbInline(t, `h${i}`)) : qbH(`p`, { key: i, className: `mt-3` }, qbInline(t, `p${i}`)))),
    s.f?.length ? qbH(`div`, { className: `mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted` },
      qbH(`p`, { className: `font-medium uppercase tracking-[0.14em] text-accent` }, `Notes`),
      s.f.map((t, i) => qbH(`p`, { key: i, className: `mt-2` }, qbH(`span`, { className: `text-accent` }, `${i + 1}. `), qbInline(t, `f${i}`)))) : null,
    nav(`n`))
}

/* ---- cross-reference map ----
   Bible Cross-References by Oleksii Trekhleb (MIT licence), built into web/xrefs/ by
   xrefs/build.py and shown full screen in a frame. It reads its data from web/bible/xrefs/, with
   Quiet Bible's own KJV and BSB. The frame never adds history entries; opening the map adds one
   here, so the phone's Back gesture closes it. */
var QB_MAP_BOOKS = `GEN,EXO,LEV,NUM,DEU,JOS,JDG,RUT,1SA,2SA,1KI,2KI,1CH,2CH,EZR,NEH,EST,JOB,PSA,PRO,ECC,SNG,ISA,JER,LAM,EZK,DAN,HOS,JOL,AMO,OBA,JON,MIC,NAM,HAB,ZEP,HAG,ZEC,MAL,MAT,MRK,LUK,JHN,ACT,ROM,1CO,2CO,GAL,EPH,PHP,COL,1TH,2TH,1TI,2TI,TIT,PHM,HEB,JAS,1PE,2PE,1JN,2JN,3JN,JUD,REV`.split(`,`);
var QB_MAP_OSIS = `Gen,Exod,Lev,Num,Deut,Josh,Judg,Ruth,1Sam,2Sam,1Kgs,2Kgs,1Chr,2Chr,Ezra,Neh,Esth,Job,Ps,Prov,Eccl,Song,Isa,Jer,Lam,Ezek,Dan,Hos,Joel,Amos,Obad,Jonah,Mic,Nah,Hab,Zeph,Hag,Zech,Mal,Matt,Mark,Luke,John,Acts,Rom,1Cor,2Cor,Gal,Eph,Phil,Col,1Thess,2Thess,1Tim,2Tim,Titus,Phlm,Heb,Jas,1Pet,2Pet,1John,2John,3John,Jude,Rev`.split(`,`);
var QB_MAP_DARK = { bg: `#141311`, surface: `#211f1b`, fg: `#f2ebdd`, muted: `#b0a79a`, accent: `#c8a96b`, divider: `#423e37`, highlight: `#4a3c24` };
function qbMapRef(book, chapter, verse) {
  let i = QB_MAP_BOOKS.indexOf(book);
  if (i < 0 || !(chapter > 0)) return null;
  return `${QB_MAP_OSIS[i]}.${chapter}` + (verse > 0 ? `.${verse}` : ``)
}
function qbMapParse(ref) {
  let m = /^([1-3]?[A-Za-z]+)\.(\d+)(?:\.(\d+))?$/.exec(String(ref || ``)), i = m ? QB_MAP_OSIS.indexOf(m[1]) : -1;
  return i < 0 ? null : { book: QB_MAP_BOOKS[i], chapter: +m[2], verse: m[3] ? +m[3] : null }
}
// The reader's colours, read from the page. The map is drawn on a dark ground (its arcs glow), so
// a light theme such as Paper gets the Quiet theme's colours instead.
function qbMapTheme() {
  let st = document.documentElement.style, t = {};
  for (let k of [`bg`, `surface`, `fg`, `muted`, `accent`, `divider`, `highlight`]) {
    let v = (st.getPropertyValue(`--qb-${k}`) || ``).trim().toLowerCase();
    if (!/^#[0-9a-f]{6}$/.test(v)) return QB_MAP_DARK;
    t[k] = v
  }
  let n = parseInt(t.bg.slice(1), 16), lum = (0.2126 * (n >> 16) + 0.7152 * (n >> 8 & 255) + 0.0722 * (n & 255)) / 255;
  return lum > 0.35 ? QB_MAP_DARK : t
}
function qbOpenMap(target) {
  window.dispatchEvent(new CustomEvent(`qb-map`, { detail: target || {} }))
}
function qbMapIcon(size = 18) {
  return qbH(`svg`, { width: size, height: size, viewBox: `0 0 24 24`, fill: `none`, stroke: `currentColor`, strokeWidth: 1.8, strokeLinecap: `round`, "aria-hidden": `true`, style: { flex: `none` } },
    qbH(`path`, { d: `M2.5 18.5h19` }), qbH(`path`, { d: `M4 18.5a8 8 0 0 1 16 0` }), qbH(`path`, { d: `M8 18.5a4 4 0 0 1 8 0` }), qbH(`path`, { d: `M14.5 18.5a3.5 3.5 0 0 1 5.5-2.9` }))
}
function QbMapButton() {
  let open = () => { let s = I.getState(); qbOpenMap({ book: s.book, chapter: s.chapter }) };
  return qbH(`button`, { type: `button`, onClick: open, "aria-label": `Cross-reference map`, "data-qb-map-button": ``, className: `flex h-10 items-center gap-1.5 rounded-[var(--radius-md)] bg-bg px-3 text-sm text-fg shadow-[var(--shadow-border)]` }, qbMapIcon(), `Map`)
}
function QbMapHost({ onRead }) {
  let [map, setMap] = (0, C.useState)(null), frame = (0, C.useRef)(null), cur = (0, C.useRef)(null), pushed = (0, C.useRef)(!1);
  cur.current = map;
  (0, C.useEffect)(() => {
    let close = () => { if (pushed.current) { try { history.back() } catch { pushed.current = !1; setMap(null) } } else setMap(null) };
    let open = e => {
      let d = e.detail || {}, ref = qbMapRef(d.book, d.chapter, d.verse), theme = qbMapTheme();
      let src = `xrefs/index.html?` + (ref ? `ref=${ref}&` : ``) + `t=${qbTr() === `BSB` ? `bsb` : `kjv`}#qbtheme=` + encodeURIComponent(JSON.stringify(theme));
      if (!pushed.current) { try { history.pushState({ qbMap: 1 }, ``); pushed.current = !0 } catch { } }
      setMap({ src, theme, onRead: typeof d.onRead === `function` ? d.onRead : null })
    };
    let pop = () => { if (pushed.current) { pushed.current = !1; setMap(null) } };
    let msg = e => {
      let f = frame.current, d = e.data;
      if (!f || e.source !== f.contentWindow || !d || typeof d !== `object`) return;
      if (d.type === `qb-map-close`) close();
      else if (d.type === `qb-map-read`) {
        let p = qbMapParse(d.ref), m = cur.current;
        if (!p) return;
        if (m && m.onRead) m.onRead(p.book, p.chapter, p.verse);
        else { try { kt.stop() } catch { } I.getState().jumpTo(p.book, p.chapter, p.verse); onRead && onRead() }
        close()
      }
    };
    window.addEventListener(`qb-map`, open); window.addEventListener(`popstate`, pop); window.addEventListener(`message`, msg);
    return () => { window.removeEventListener(`qb-map`, open); window.removeEventListener(`popstate`, pop); window.removeEventListener(`message`, msg) }
  }, [onRead]);
  if (!map) return null;
  return qbH(`div`, { role: `dialog`, "aria-label": `Cross-reference map`, "data-qb-map": ``, style: { position: `fixed`, inset: 0, zIndex: 70, display: `flex`, flexDirection: `column`, background: map.theme.bg, paddingTop: `env(safe-area-inset-top)`, paddingBottom: `env(safe-area-inset-bottom)` } },
    qbH(`iframe`, { ref: frame, src: map.src, title: `Cross-reference map`, style: { flex: `1 1 auto`, width: `100%`, border: 0, background: map.theme.bg } }))
}

