// Stand-in for the parts of fflate used by scripts/data/lib/files.ts: reads a ZIP archive's
// central directory and inflates the entries the filter accepts. Stored (0) and deflated (8)
// entries only, which is all the pinned archives use.
import { inflateRawSync } from 'node:zlib';

export function strFromU8(bytes) {
  return new TextDecoder('utf-8').decode(bytes);
}

export function unzipSync(archive, options = {}) {
  const data = Buffer.from(archive.buffer, archive.byteOffset, archive.byteLength);
  let end = -1;
  for (let i = data.length - 22; i >= Math.max(0, data.length - 65557); i--) {
    if (data.readUInt32LE(i) === 0x06054b50) {
      end = i;
      break;
    }
  }
  if (end < 0) throw new Error('Not a ZIP archive');
  const count = data.readUInt16LE(end + 10);
  let at = data.readUInt32LE(end + 16);
  const out = {};
  for (let n = 0; n < count; n++) {
    if (data.readUInt32LE(at) !== 0x02014b50) throw new Error('Bad ZIP central directory');
    const method = data.readUInt16LE(at + 10);
    const compressed = data.readUInt32LE(at + 20);
    const size = data.readUInt32LE(at + 24);
    const nameLength = data.readUInt16LE(at + 28);
    const extraLength = data.readUInt16LE(at + 30);
    const commentLength = data.readUInt16LE(at + 32);
    const local = data.readUInt32LE(at + 42);
    const name = data.toString('utf8', at + 46, at + 46 + nameLength);
    at += 46 + nameLength + extraLength + commentLength;
    if (options.filter && !options.filter({ name, size, originalSize: size, compression: method })) {
      continue;
    }
    const start = local + 30 + data.readUInt16LE(local + 26) + data.readUInt16LE(local + 28);
    const raw = data.subarray(start, start + compressed);
    let bytes;
    if (method === 0) bytes = raw;
    else if (method === 8) bytes = inflateRawSync(raw);
    else throw new Error(`Unsupported ZIP compression ${method} for ${name}`);
    if (bytes.length !== size) throw new Error(`Wrong size for ${name}`);
    out[name] = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }
  return out;
}
