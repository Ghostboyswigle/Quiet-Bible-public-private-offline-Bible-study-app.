package org.quietbible.app;

import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.CRC32;

/**
 * Rebuilds the voice's .onnx file from the compact form shipped in the APK
 * ("QBQ8", made by voice/pack/pack.py): large weights travel as 8-bit codes with
 * a scale per group of values and are expanded back to float32 here, once, on the
 * phone. Everything else in the file is carried byte-for-byte. The result is an
 * ordinary float32 model, so the voice runs at full speed.
 *
 * Plain Java, so the JVM tests rebuild the model with this exact code.
 */
final class ModelPack {

    private ModelPack() {}

    static final class Header {
        long outLen;
        long crc;
    }

    /** Streams the rebuilt model to {@code out}; throws if the result is not bit-exact. */
    static Header rebuild(InputStream packed, OutputStream out) throws IOException {
        DataInputStream in = new DataInputStream(new BufferedInputStream(packed, 1 << 16));
        byte[] magic = new byte[4];
        in.readFully(magic);
        if (magic[0] != 'Q' || magic[1] != 'B' || magic[2] != 'Q' || magic[3] != '8') throw new IOException("not a voice pack");
        int version = readInt(in);
        if (version != 1) throw new IOException("voice pack version " + version);
        Header h = new Header();
        h.outLen = readLong(in);
        h.crc = readInt(in) & 0xffffffffL;
        int group = readInt(in);
        int regions = readInt(in);
        if (group <= 0 || regions < 0) throw new IOException("bad voice pack");
        long[] offsets = new long[regions];
        int[] counts = new int[regions];
        for (int i = 0; i < regions; i++) {
            offsets[i] = readLong(in);
            counts[i] = readInt(in);
        }
        long gapLen = readLong(in);
        if (gapLen < 0 || gapLen > Integer.MAX_VALUE) throw new IOException("bad voice pack");
        byte[] gap = new byte[(int) gapLen];
        in.readFully(gap);

        CRC32 crc = new CRC32();
        long written = 0;
        int gapPos = 0;
        byte[] buf = new byte[0];
        for (int r = 0; r < regions; r++) {
            int take = (int) (offsets[r] - written);
            if (take < 0 || gapPos + take > gap.length) throw new IOException("bad voice pack layout");
            out.write(gap, gapPos, take);
            crc.update(gap, gapPos, take);
            gapPos += take;
            written += take;

            int n = counts[r];
            int groups = (n + group - 1) / group;
            float[] scale = new float[groups];
            for (int g = 0; g < groups; g++) scale[g] = Float.intBitsToFloat(readInt(in));
            byte[] codes = new byte[n];
            in.readFully(codes);
            if (buf.length < n * 4) buf = new byte[n * 4];
            for (int i = 0, o = 0; i < n; i++, o += 4) {
                int bits = Float.floatToRawIntBits((float) codes[i] * scale[i / group]);
                buf[o] = (byte) bits;
                buf[o + 1] = (byte) (bits >>> 8);
                buf[o + 2] = (byte) (bits >>> 16);
                buf[o + 3] = (byte) (bits >>> 24);
            }
            out.write(buf, 0, n * 4);
            crc.update(buf, 0, n * 4);
            written += n * 4L;
        }
        int rest = gap.length - gapPos;
        out.write(gap, gapPos, rest);
        crc.update(gap, gapPos, rest);
        written += rest;

        if (written != h.outLen) throw new IOException("voice rebuilt to " + written + " bytes, expected " + h.outLen);
        if (crc.getValue() != h.crc) throw new IOException("voice checksum mismatch");
        return h;
    }

    /** Reads just the header's checksum, to name the rebuilt file's version marker. */
    static long checksum(InputStream packed) throws IOException {
        DataInputStream in = new DataInputStream(packed);
        byte[] head = new byte[4 + 4 + 8 + 4];
        in.readFully(head);
        return (head[16] & 0xffL) | (head[17] & 0xffL) << 8 | (head[18] & 0xffL) << 16 | (head[19] & 0xffL) << 24;
    }

    private static int readInt(DataInputStream in) throws IOException {
        int b0 = in.read(), b1 = in.read(), b2 = in.read(), b3 = in.read();
        if ((b0 | b1 | b2 | b3) < 0) throw new EOFException();
        return b0 | b1 << 8 | b2 << 16 | b3 << 24;
    }

    private static long readLong(DataInputStream in) throws IOException {
        return (readInt(in) & 0xffffffffL) | ((long) readInt(in)) << 32;
    }
}
