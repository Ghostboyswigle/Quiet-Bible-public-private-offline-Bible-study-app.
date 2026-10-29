package org.quietbible.app;
import com.k2fsa.sherpa.onnx.*;
/** Deterministic synthesis (no noise) with full vs English-only espeak data must be identical. */
public class PruneCheck {
    static float[] run(String dir, String data, String text) {
        OfflineTtsConfig c = new OfflineTtsConfig();
        c.model.vits.model = dir + "/en_US-john-medium.onnx"; c.model.vits.tokens = dir + "/tokens.txt";
        c.model.vits.dataDir = data; c.model.vits.noiseScale = 0; c.model.vits.noiseScaleW = 0; c.model.numThreads = 1;
        OfflineTts t = new OfflineTts(null, c); float[] s = t.generate(text, 0, 1f).samples; t.release(); return s;
    }
    public static void main(String[] a) {
        System.load(a[1] + "/libonnxruntime.so"); System.load(a[1] + "/libsherpa-onnx-jni.so");
        String text = "In the beginning God created the heavens and the earth. Melchizedek, Nebuchadnezzar, Zerubbabel and Mahershalalhashbaz; the LORD's 144,000 at 3 o'clock.";
        float[] full = run(a[0], a[0] + "/espeak-ng-data", text), pruned = run(a[0], a[2], text);
        double maxd = 0; if (full.length == pruned.length) for (int i = 0; i < full.length; i++) maxd = Math.max(maxd, Math.abs(full[i] - pruned[i]));
        System.out.println("full " + full.length + " samples, pruned " + pruned.length + " samples, max difference " + maxd);
        System.out.println(full.length == pruned.length && maxd < 1e-4 ? "IDENTICAL" : "DIFFERENT");
    }
}
