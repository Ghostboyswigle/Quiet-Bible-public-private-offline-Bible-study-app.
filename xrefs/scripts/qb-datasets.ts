/**
 * Quiet Bible: builds the two shared datasets (the OpenBible.info links and the STEPBible
 * original words) with this project's own importers, and checks each against the fingerprint the
 * project committed in data/datasets.lock.json, so the files match the ones the site serves.
 * The two texts (KJV and BSB) are written by Quiet Bible's xrefs/build.py from the app's own text.
 *
 *   node scripts/data/qb-datasets.ts <output folder>
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { DATASET_BUILDERS, type RawSourceReader } from './datasets.ts';
import { readFileIfExists } from './lib/files.ts';
import { rawFilePath, MANIFEST_FILE } from './lib/paths.ts';
import { findSource, pinnedDigest, readSources } from './lib/sources.ts';

const out = process.argv[2];
if (!out) throw new Error('usage: qb-datasets.ts <output folder>');
const WANTED = ['data/cross-references/openbible.json', 'data/words/stepbible.json'];
const sources = await readSources();
const readSource: RawSourceReader = async (sourceId) => {
  const source = findSource(sources, sourceId);
  const content = await readFileIfExists(rawFilePath(source.fileName));
  if (content === undefined) throw new Error(`Missing raw file ${source.fileName}`);
  if (pinnedDigest(source, content) !== source.sha256) {
    throw new Error(`Raw file for "${sourceId}" does not match its pinned checksum.`);
  }
  return { source, content };
};
const lock = JSON.parse(await readFile(MANIFEST_FILE, 'utf8')) as Record<string, { sha256: string }>;
for (const builder of DATASET_BUILDERS) {
  if (!WANTED.includes(builder.outputPath)) continue;
  const json = JSON.stringify(await builder.build(readSource));
  const sha = createHash('sha256').update(json).digest('hex');
  const expected = lock[builder.outputPath]?.sha256;
  if (sha !== expected) {
    throw new Error(`${builder.outputPath}: sha256 ${sha} differs from the lock file's ${expected}`);
  }
  const file = join(out, builder.outputPath.replace(/^data\//, ''));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, json);
  console.log(`✓ ${builder.outputPath} (${json.length} bytes, matches the lock file)`);
}
