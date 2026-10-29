import com.k2fsa.sherpa.onnx.*;
import java.io.*;
/**
 * Synthesizes each text n times with a Piper voice through the app's own JNI classes (the voices
 * are not deterministic, so compare several takes).
 *   java -Djava.library.path=<linux jni lib> PiperMany voice.onnx tokens.txt <espeak-ng-data dir> <gain> <out prefix> <n> <text>...
 * Writes <out prefix>-<text index>-<take>.wav (16-bit mono).
 */
public class PiperMany {
    public static void main(String[] a) throws Exception {
        System.loadLibrary("onnxruntime"); System.loadLibrary("sherpa-onnx-jni");
        OfflineTtsConfig c = new OfflineTtsConfig();
        c.model.vits.model = a[0]; c.model.vits.tokens = a[1]; c.model.vits.dataDir = a[2];
        c.model.numThreads = 2; c.maxNumSentences = 1;
        OfflineTts tts = new OfflineTts(null, c);
        float gain = Float.parseFloat(a[3]); int n = Integer.parseInt(a[5]);
        for (int t = 6; t < a.length; t++) for (int r = 0; r < n; r++) {
            GeneratedAudio g = tts.generate(a[t], 0, 1.0f);
            write(a[4] + "-" + (t - 6) + "-" + r + ".wav", g.samples, g.sampleRate, gain);
        }
        tts.release();
    }
    static void write(String fn, float[] x, int sr, float gain) throws IOException {
        DataOutputStream o = new DataOutputStream(new BufferedOutputStream(new FileOutputStream(fn)));
        int n = x.length;
        o.writeBytes("RIFF"); o.writeInt(Integer.reverseBytes(36 + n * 2)); o.writeBytes("WAVEfmt ");
        o.writeInt(Integer.reverseBytes(16)); o.writeShort(Short.reverseBytes((short) 1)); o.writeShort(Short.reverseBytes((short) 1));
        o.writeInt(Integer.reverseBytes(sr)); o.writeInt(Integer.reverseBytes(sr * 2)); o.writeShort(Short.reverseBytes((short) 2));
        o.writeShort(Short.reverseBytes((short) 16)); o.writeBytes("data"); o.writeInt(Integer.reverseBytes(n * 2));
        for (float f : x) { int s = Math.round(Math.max(-1f, Math.min(1f, f * gain)) * 32767f); o.writeShort(Short.reverseBytes((short) s)); }
        o.close();
    }
}
