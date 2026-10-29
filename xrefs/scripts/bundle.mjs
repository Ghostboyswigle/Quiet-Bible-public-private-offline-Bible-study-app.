// Quiet Bible: bundles Bible Cross-References (src/app/main.tsx) into one classic script and one
// stylesheet with esbuild, in place of the project's Vite build, so the map loads from a file on
// the phone like the rest of the app (no modules, no service worker, no network).
//
//   node bundle.mjs <esbuild package folder> <project folder> <output folder>
import { createRequire } from 'node:module';
import { join } from 'node:path';

const [esbuildDir, project, out] = process.argv.slice(2);
if (!esbuildDir || !project || !out) {
  throw new Error('usage: bundle.mjs <esbuild package folder> <project folder> <output folder>');
}
const esbuild = createRequire(join(esbuildDir, 'package.json'))(esbuildDir);

const result = await esbuild.build({
  absWorkingDir: project,
  entryPoints: { app: 'src/app/main.tsx' },
  outdir: out,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  // Android System WebView updates with Chrome; Quiet Bible needs Android 8 or later.
  target: ['chrome89'],
  minify: true,
  legalComments: 'eof',
  jsx: 'automatic',
  loader: { '.module.css': 'local-css', '.css': 'css' },
  define: {
    'process.env.NODE_ENV': '"production"',
    'import.meta.env.BASE_URL': '"./"',
    'import.meta.env.PROD': 'false',
    'import.meta.env.DEV': 'false',
    'import.meta.env.SITE_NAME': '"Bible Cross-References"',
    'import.meta.env.SITE_URL': '"https://trekhleb.dev/bible-cross-references/"',
  },
  charset: 'utf8',
  logLevel: 'warning',
  metafile: true,
});
for (const [file, info] of Object.entries(result.metafile.outputs)) {
  console.log(`${file}: ${info.bytes} bytes`);
}
