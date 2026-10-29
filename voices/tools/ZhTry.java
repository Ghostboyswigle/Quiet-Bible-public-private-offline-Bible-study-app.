import com.k2fsa.sherpa.onnx.*;
import java.io.*;
import java.nio.file.*;
import java.util.*;

public class ZhTry {
    public static void main(String[] a) throws Exception {
        String lib = a[0], dir = a[1], model = a[2], outPrefix = a[3], mode = a[4];
        System.load(lib + "/libonnxruntime.so");
        System.load(lib + "/libsherpa-onnx-jni.so");
        OfflineTtsConfig c = new OfflineTtsConfig();
        c.model.vits.model = dir + "/" + model;
        c.model.vits.tokens = dir + "/tokens.txt";
        if (mode.equals("lexicon")) {
            c.model.vits.lexicon = dir + "/lexicon.txt";
            c.ruleFsts = dir + "/phone.fst," + dir + "/date.fst," + dir + "/number.fst";
        } else {
            c.model.vits.dataDir = a[5];
        }
        c.model.numThreads = 2;
        c.maxNumSentences = 1;
        long t0 = System.nanoTime();
        OfflineTts tts = new OfflineTts(null, c);
        System.out.println("loaded " + (System.nanoTime() - t0) / 1000000 + " ms rate " + tts.getSampleRate());
        List<String> lines = Files.readAllLines(Paths.get(a[a.length - 1]), java.nio.charset.StandardCharsets.UTF_8);
        int i = 0;
        for (String text : lines) {
            if (text.isEmpty()) continue;
            long g0 = System.nanoTime();
            GeneratedAudio au = tts.generate(text, System.getenv("SPK") == null ? 0 : Integer.parseInt(System.getenv("SPK")), 1.0f);
            long g1 = System.nanoTime();
            double secs = au.samples.length / (double) au.sampleRate;
            float peak = 0; for (float s : au.samples) peak = Math.max(peak, Math.abs(s));
            System.out.printf("%d: %.2fs audio, %d ms, peak %.2f  %s%n", i, secs, (g1 - g0) / 1000000, peak, text.substring(0, Math.min(20, text.length())));
            writeWav(outPrefix + "-" + i + ".wav", au.samples, au.sampleRate);
            i++;
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
