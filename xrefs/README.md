# The cross-reference map

The Map button in the app's header (and "See it on the cross-reference map" under a verse's
Cross-refs) opens **Bible Cross-References** by Oleksii Trekhleb
(<https://github.com/trekhleb/bible-cross-references>, MIT licence), the program behind
<https://trekhleb.dev/bible-cross-references/>: every verse of the Bible on one line with its
344,799 cross-references as arcs coloured by genre, and a Threads view that reads a chapter with
threads to where each verse's links land. It runs offline inside the app, on Quiet Bible's own
King James Version (the default) and Berean Standard Bible.

## What is here

| File | What it is |
|---|---|
| `build.py` | Builds everything below from the inputs listed after this table. |
| `quiet-bible.patch` | Quiet Bible's changes to the project (applied to commit `fc190ea`). |
| `index.html` | The page the app opens in a frame: takes the app's colours, reads the data files through the app's asset bridge, keeps links to websites from navigating. |
| `scripts/bundle.mjs` | Bundles the project with esbuild into one classic script and one stylesheet. |
| `scripts/qb-datasets.ts` | Builds the links and words datasets with the project's own importers and checks them against the project's `data/datasets.lock.json`. |
| `shims/fflate/` | The two functions of fflate the importers use, written on Node's zlib. |

`build.py` writes `web/xrefs/` (the page, `app.js`, `app.css`) and `web/bible/xrefs/` (the data).

## Inputs

| `build.py` option | Where it comes from |
|---|---|
| `--upstream` | `git clone https://github.com/trekhleb/bible-cross-references`, at commit `fc190ea` (22 October 2026). Its `data/raw/` carries the OpenBible.info file and `bsb.txt`. |
| `--three` | `https://github.com/mrdoob/three.js` at tag `r186` (version 0.186.1, as the project's lock file names); only `package.json` and `build/` are needed. |
| `--stepbible` | `https://github.com/STEPBible/STEPBible-Data` (commit `ed476a8` was used); the six TAHOT/TAGNT files and TBESH/TBESG. Their SHA-256 must match the project's `data/sources.json`, which `qb-datasets.ts` checks. |
| `--node-modules` | A folder with `react` and `react-dom` 19.2.6 and `react-icons` 5.6.0 (`npm install react@19.2.6 react-dom@19.2.6 react-icons@5.6.0`). |
| `--esbuild` | The `esbuild` package folder, version 0.27. |

Node 22.18 or newer runs the project's TypeScript importers directly.

## What Quiet Bible changed

- Only the KJV (first, and the default) and the BSB are offered, English only. Both texts are
  Quiet Bible's own (`web/bible/books/`, `web/bible/bsb/books/`), written in the project's verse
  order by `build.py`, so the map and the reader show the same words.
- The view (Arcs or Threads) is kept in the address's query instead of its path, because a page
  loaded from a file may change its query but not its path; links to the public site still use
  the path.
- The map never adds history entries; the app adds one when it opens the map, so the phone's
  Back gesture closes the map.
- A back button, and "Open in Quiet Bible" beside "Read in context", which opens the passage in
  the reader (and closes the verse sheet the map was opened from).
- The canvas and the controls wear the reader's theme colours; the Paper theme (light) gets the
  Quiet theme's, because the arcs are drawn to glow on a dark ground.
- No install guide, no offline cache (service worker), and no links in the footer: the app has
  no internet access. The footer names the project and its author; Settings > About > Credits
  and licences has the full notice (`android/extra/assets/licenses/bible-cross-references-notices.txt`).
- Bundled with esbuild (one classic script) instead of Vite (modules), which a page loaded from a
  file cannot use.

## Checks

`e2e/run24.js` opens the map from the header and from a verse, in both translations, follows a
reference, searches, switches to Threads, and opens a passage back in the reader.
