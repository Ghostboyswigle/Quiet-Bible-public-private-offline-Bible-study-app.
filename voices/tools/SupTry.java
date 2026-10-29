import com.k2fsa.sherpa.onnx.*;
import java.io.*;
import java.nio.file.*;
import java.util.*;

/**
 * Tries a Supertonic model in several languages and voices through the app's own JNI classes.
 *   java -Djava.library.path=<linux jni lib> SupTry <model dir> <verses.tsv: lang\tref\ttext> <out dir> <sids e.g. 0,5> <steps> [speed]
 * Writes <out>/<lang>-<sid>-<ref>.wav (16-bit mono) and prints the real-time factor of each.
 */
public class SupTry {
    public static void main(String[] a) throws Exception {
        System.loadLibrary("onnxruntime"); System.loadLibrary("sherpa-onnx-jni");
        String dir = a[0];
        List<String> lines = Files.readAllLines(Paths.get(a[1]));
        File out = new File(a[2]); out.mkdirs();
        int steps = Integer.parseInt(a[4]);
        float speed = a.length > 5 ? Float.parseFloat(a[5]) : 1.0f;
        String seed = a.length > 6 ? a[6] : null;      // Supertonic: fixed noise for repeatable output
        OfflineTtsConfig c = new OfflineTtsConfig();
        boolean kokoro = new File(dir, "voices.bin").isFile() && !new File(dir, "tts.json").isFile();
        if (kokoro) {                     // Kokoro: model.int8.onnx, voices.bin, tokens.txt, lexicon-zh.txt, espeak-ng-data
            c.model.kokoro.model = dir + "/model.int8.onnx";
            c.model.kokoro.voices = dir + "/voices.bin";
            c.model.kokoro.tokens = dir + "/tokens.txt";
            c.model.kokoro.lexicon = dir + "/lexicon-zh.txt";
            c.model.kokoro.dataDir = dir + "/espeak-ng-data";
            c.ruleFsts = dir + "/date-zh.fst," + dir + "/number-zh.fst," + dir + "/phone-zh.fst";
        }
        if (!kokoro) c.model.supertonic.durationPredictor = dir + "/duration_predictor.int8.onnx";
        if (!kokoro) c.model.supertonic.textEncoder = dir + "/text_encoder.int8.onnx";
        c.model.supertonic.vectorEstimator = dir + "/vector_estimator.int8.onnx";
        c.model.supertonic.vocoder = dir + "/vocoder.int8.onnx";
        c.model.supertonic.ttsJson = dir + "/tts.json";
        c.model.supertonic.unicodeIndexer = dir + "/unicode_indexer.bin";
        c.model.supertonic.voiceStyle = dir + "/voice.bin";
        c.model.numThreads = 2;
        long t0 = System.nanoTime();
        OfflineTts tts = new OfflineTts(null, c);
        System.out.printf("loaded in %d ms, %d Hz, %d voices%n", (System.nanoTime() - t0) / 1000000, tts.getSampleRate(), tts.getNumSpeakers());
        double cpuAll = 0, audioAll = 0;
        for (String sidS : a[3].split(",")) {
            int sid = Integer.parseInt(sidS);
            for (String line : lines) {
                String[] p = line.split("\t", 3);
                if (p.length < 3) continue;
                GenerationConfig g = new GenerationConfig();
                g.sid = sid; g.numSteps = steps; g.speed = speed;
                g.extra = new HashMap<>(); g.extra.put("lang", p[0]);
                if (seed != null) g.extra.put("seed", seed);
                long g0 = System.nanoTime();
                GeneratedAudio audio = tts.generate(p[2], g);
                double cpu = (System.nanoTime() - g0) / 1e9, secs = audio.samples.length / (double) audio.sampleRate;
                cpuAll += cpu; audioAll += secs;
                System.out.printf("%s sid %d %s: %.2f s audio, RTF %.3f%n", p[0], sid, p[1], secs, cpu / secs);
                writeWav(new File(out, p[0] + "-" + sid + "-" + p[1] + ".wav"), audio.samples, audio.sampleRate);
            }
        }
        System.out.printf("overall RTF %.3f over %.0f s of audio%n", cpuAll / audioAll, audioAll);
        tts.release();
    }

    static void writeWav(File f, float[] s, int rate) throws IOException {
        try (DataOutputStream o = new DataOutputStream(new BufferedOutputStream(new FileOutputStream(f)))) {
            int n = s.length * 2;
            o.writeBytes("RIFF"); o.writeInt(Integer.reverseBytes(36 + n)); o.writeBytes("WAVEfmt ");
            o.writeInt(Integer.reverseBytes(16)); o.writeShort(Short.reverseBytes((short) 1)); o.writeShort(Short.reverseBytes((short) 1));
            o.writeInt(Integer.reverseBytes(rate)); o.writeInt(Integer.reverseBytes(rate * 2));
            o.writeShort(Short.reverseBytes((short) 2)); o.writeShort(Short.reverseBytes((short) 16));
            o.writeBytes("data"); o.writeInt(Integer.reverseBytes(n));
            for (float x : s) o.writeShort(Short.reverseBytes((short) Math.max(-32768, Math.min(32767, Math.round(x * 32767)))));
        }
    }
}
