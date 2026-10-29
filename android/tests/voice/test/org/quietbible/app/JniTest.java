package org.quietbible.app;

import com.k2fsa.sherpa.onnx.*;
import java.io.*;
import java.lang.reflect.*;

/** Real synthesis through libsherpa-onnx-jni.so (Linux build of the same version) using our Java classes. */
public class JniTest {
    public static void main(String[] a) throws Exception {
        String dir = a[0], model = a[1], out = a[2];
        System.load(a[3] + "/libonnxruntime.so");
        System.load(a[3] + "/libsherpa-onnx-jni.so");
        OfflineTtsConfig c = new OfflineTtsConfig();
        c.model.vits.model = dir + "/" + model;
        c.model.vits.tokens = dir + "/tokens.txt";
        c.model.vits.dataDir = a.length > 4 ? a[4] : dir + "/espeak-ng-data";
        c.model.numThreads = 2;

        long t0 = System.nanoTime();
        OfflineTts tts = new OfflineTts(null, c);                      // newFromFile path
        long t1 = System.nanoTime();
        System.out.println("loaded in " + (t1 - t0) / 1_000_000 + " ms, sample rate " + tts.getSampleRate());

        // newFromAsset binding: on Linux the asset manager argument is ignored, so this proves
        // the Java declaration links to the exported JNI symbol with our config classes.
        Method m = OfflineTts.class.getDeclaredMethod("newFromAsset", Object.class, OfflineTtsConfig.class);
        m.setAccessible(true);
        long p = (Long) m.invoke(tts, new Object(), c);
        System.out.println("newFromAsset binding returned " + (p != 0 ? "a voice" : "0"));

        String text = "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life.";
        for (float speed : new float[] {1.0f, 1.2f}) {
            long g0 = System.nanoTime();
            GeneratedAudio audio = tts.generate(text, 0, speed);
            long g1 = System.nanoTime();
            double secs = audio.samples.length / (double) audio.sampleRate;
            float peak = 0; for (float s : audio.samples) peak = Math.max(peak, Math.abs(s));
            System.out.printf("speed %.1f: %.2f s of audio in %d ms (RTF %.3f), peak %.2f%n",
                speed, secs, (g1 - g0) / 1_000_000, (g1 - g0) / 1e9 / secs, peak);
            if (speed == 1.0f) writeWav(out, audio.samples, audio.sampleRate);
        }
        tts.release();
        System.out.println("OK");
    }

    static void writeWav(String path, float[] s, int sr) throws IOException {
        try (DataOutputStream o = new DataOutputStream(new BufferedOutputStream(new FileOutputStream(path)))) {
            int n = s.length * 2;
            o.writeBytes("RIFF"); o.writeInt(Integer.reverseBytes(36 + n)); o.writeBytes("WAVEfmt ");
            o.writeInt(Integer.reverseBytes(16)); o.writeShort(Short.reverseBytes((short) 1)); o.writeShort(Short.reverseBytes((short) 1));
            o.writeInt(Integer.reverseBytes(sr)); o.writeInt(Integer.reverseBytes(sr * 2));
            o.writeShort(Short.reverseBytes((short) 2)); o.writeShort(Short.reverseBytes((short) 16));
            o.writeBytes("data"); o.writeInt(Integer.reverseBytes(n));
            for (float f : s) o.writeShort(Short.reverseBytes((short) Math.max(-32768, Math.min(32767, Math.round(f * 32767)))));
        }
    }
}
