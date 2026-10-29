package org.quietbible.app;
import com.k2fsa.sherpa.onnx.*;
import java.nio.file.*; import java.util.*; import java.util.regex.*;
public class Loudness {
    public static void main(String[] a) throws Exception {
        System.load(a[1] + "/libonnxruntime.so"); System.load(a[1] + "/libsherpa-onnx-jni.so");
        OfflineTtsConfig c = new OfflineTtsConfig();
        c.model.vits.model = a[0] + "/" + a[3]; c.model.vits.tokens = a[0] + "/tokens.txt"; c.model.vits.dataDir = a[2]; c.model.numThreads = 2;
        OfflineTts t = new OfflineTts(null, c);
        List<String> verses = Files.readAllLines(Paths.get(a[4]));
        double maxPeak = 0, sumRms = 0, audio = 0, cpu = 0; int n = 0;
        for (String v : verses) {
            long t0 = System.nanoTime(); float[] s = t.generate(v, 0, 1f).samples; cpu += (System.nanoTime() - t0) / 1e9;
            double peak = 0, sq = 0; for (float x : s) { peak = Math.max(peak, Math.abs(x)); sq += x * x; }
            double rms = Math.sqrt(sq / Math.max(1, s.length)); audio += s.length / 22050.0;
            maxPeak = Math.max(maxPeak, peak); sumRms += rms; n++;
        }
        System.out.printf("%s: %d verses, %.0f s audio, RTF %.3f, max peak %.2f, mean RMS %.3f (%.1f dBFS)%n", a[3], n, audio, cpu / audio, maxPeak, sumRms / n, 20 * Math.log10(sumRms / n));
    }
}
