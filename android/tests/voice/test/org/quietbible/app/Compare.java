package org.quietbible.app;
import com.k2fsa.sherpa.onnx.*;
import java.nio.file.*; import java.util.*;
/** Same verses, deterministic (no noise), through two models; writes raw float32 files for analysis. */
public class Compare {
    public static void main(String[] a) throws Exception {
        System.load(a[0] + "/libonnxruntime.so"); System.load(a[0] + "/libsherpa-onnx-jni.so");
        List<String> verses = Files.readAllLines(Paths.get(a[1]));
        for (int m = 2; m < a.length; m += 2) {
            OfflineTtsConfig c = new OfflineTtsConfig();
            c.model.vits.model = a[m]; c.model.vits.tokens = Paths.get(a[m]).getParent() + "/tokens.txt"; c.model.vits.dataDir = "/home/claude/voice/espeak-en";
            c.model.vits.noiseScale = 0; c.model.vits.noiseScaleW = 0; c.model.numThreads = 2;
            OfflineTts t = new OfflineTts(null, c); double cpu = 0, dur = 0;
            for (int i = 0; i < verses.size(); i++) {
                long t0 = System.nanoTime(); float[] s = t.generate(verses.get(i), 0, 1f).samples; cpu += (System.nanoTime() - t0) / 1e9; dur += s.length / 22050.0;
                java.nio.ByteBuffer bb = java.nio.ByteBuffer.allocate(s.length * 4).order(java.nio.ByteOrder.LITTLE_ENDIAN); for (float x : s) bb.putFloat(x);
                Files.write(Paths.get(a[m + 1] + "-" + i + ".f32"), bb.array());
            }
            System.out.printf("%s RTF %.3f%n", a[m + 1], cpu / dur); t.release();
        }
    }
}
