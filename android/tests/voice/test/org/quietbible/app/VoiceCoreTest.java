package org.quietbible.app;

import java.util.*;
import java.util.concurrent.*;

/**
 * VoiceCore driving the REAL Piper voice (sherpa-onnx Linux JNI build of the same
 * version) with a sink that plays in real time, the way a phone would. The page is
 * simulated the way app.js drives it: speak a verse, prefetch the next, and on each
 * end callback move on.
 */
public class VoiceCoreTest {

    /** Plays in real time: sleeps for the audio's duration, checking the ticket like AudioTrackSink. */
    static final class RealtimeSink implements VoiceCore.Sink {
        final java.util.concurrent.atomic.AtomicInteger idles = new java.util.concurrent.atomic.AtomicInteger();
        public void idle() { idles.incrementAndGet(); }
        final List<String> heard = Collections.synchronizedList(new ArrayList<String>());
        volatile long lastEnd = 0;
        final List<Long> gapsMs = Collections.synchronizedList(new ArrayList<Long>());
        volatile float maxPeak = 0;
        public boolean play(float[] pcm, int sr, VoiceCore.Ticket t) {
            long start = System.nanoTime();
            if (lastEnd != 0) gapsMs.add((start - lastEnd) / 1_000_000);
            for (float x : pcm) maxPeak = Math.max(maxPeak, Math.abs(x));
            long durNs = (long) (pcm.length * 1e9 / sr);
            while (System.nanoTime() - start < durNs) {
                if (!t.live()) return false;
                try { Thread.sleep(5); } catch (InterruptedException e) { return false; }
            }
            lastEnd = System.nanoTime();
            return t.live();
        }
    }

    static final class Page implements VoiceCore.Listener {
        VoiceCore core; List<String[]> verses; int index = -1; final float rate = 0.92f;
        final List<String> ended = Collections.synchronizedList(new ArrayList<String>());
        final List<String> errors = Collections.synchronizedList(new ArrayList<String>());
        final CountDownLatch finished = new CountDownLatch(1);
        volatile boolean autoAdvance = true;
        void speakAt(int i) {
            index = i;
            String[] v = verses.get(i);
            core.speak(v[1], rate, v[0]);
            if (i + 1 < verses.size()) core.prefetch(verses.get(i + 1)[1], rate, verses.get(i + 1)[0]);
        }
        public void onDone(String id) {
            ended.add(id);
            if (!autoAdvance) return;
            if (index + 1 < verses.size()) speakAt(index + 1); else finished.countDown();
        }
        public void onError(String id, String text, float rate) { errors.add(id); }
    }

    static int pass = 0, total = 0;
    static void check(String name, boolean ok, Object detail) {
        total++; if (ok) pass++;
        System.out.println("  [" + (ok ? "PASS" : "FAIL") + "] " + name + (detail == null ? "" : "  -> " + detail));
    }

    public static void main(String[] a) throws Exception {
        final String voiceDir = a[0], lib = a[1], espeak = a[2], model = a[3];
        System.load(lib + "/libonnxruntime.so");
        System.load(lib + "/libsherpa-onnx-jni.so");
        List<String[]> verses = new ArrayList<>();
        for (String line : java.nio.file.Files.readAllLines(java.nio.file.Paths.get(a[4]))) {
            String[] p = line.split("\t", 2); verses.add(p);
        }
        VoiceCore.SynthFactory real = () -> {
            PiperSynth s = new PiperSynth(null, voiceDir + "/" + model, voiceDir + "/tokens.txt", espeak, 2);
            s.generate("Amen.", 1f);
            return s;
        };

        System.out.println("Reading a passage straight through");
        {
            RealtimeSink sink = new RealtimeSink(); Page page = new Page(); page.verses = verses.subList(0, 5);
            long t0 = System.nanoTime();
            page.core = new VoiceCore(real, sink, page, VoiceBridge.VOICE_GAIN);
            page.speakAt(0);                        // pressed play while the voice was still loading
            boolean done = page.finished.await(180, TimeUnit.SECONDS);
            long firstMs = -1;
            check("all verses read in order, each end reported once",
                  done && page.ended.equals(Arrays.asList("PSA.23.1", "PSA.23.2", "PSA.23.3", "PSA.23.4", "PSA.23.5")), page.ended);
            long maxGap = 0; for (long g : sink.gapsMs) maxGap = Math.max(maxGap, g);
            check("next verse is prepared while the current one plays (gaps between verses < 150 ms)",
                  maxGap < 150, "gaps ms=" + sink.gapsMs + " generated=" + page.core.generated.get() + " cache hits=" + page.core.cacheHits.get());
            check("loudness raised but never clipping (peak <= 1.0)", sink.maxPeak > 0.6f && sink.maxPeak <= 1.0f, "peak=" + sink.maxPeak);
            page.core.shutdown();
        }

        System.out.println("Pause, resume and skipping");
        {
            RealtimeSink sink = new RealtimeSink(); Page page = new Page(); page.verses = verses; page.autoAdvance = false;
            page.core = new VoiceCore(real, sink, page, VoiceBridge.VOICE_GAIN);
            page.speakAt(0);
            Thread.sleep(4000);                        // loading + into verse 1
            page.core.stop();                          // pause
            Thread.sleep(1500);
            check("pause silences the verse and it is not reported as finished", page.ended.isEmpty(), page.ended);
            int before = page.core.generated.get();
            long r0 = System.nanoTime();
            page.speakAt(0);                           // resume = same verse again
            Thread.sleep(300);
            check("resume replays the verse from memory, no new synthesis", page.core.generated.get() == before || page.core.cacheHits.get() > 0,
                  "generated " + before + " -> " + page.core.generated.get() + ", cache hits " + page.core.cacheHits.get());
            page.core.stop();
            // rapid skipping: 5 quick skips, only the last one should be heard
            for (int i = 1; i <= 5; i++) { page.speakAt(i); Thread.sleep(40); }
            page.autoAdvance = false;
            long deadline = System.currentTimeMillis() + 60000;
            while (page.ended.isEmpty() && System.currentTimeMillis() < deadline) Thread.sleep(50);
            check("skipping quickly through verses: only the verse you land on is read to the end",
                  page.ended.equals(Collections.singletonList(verses.get(5)[0])), page.ended);
            page.core.shutdown();
        }

        System.out.println("If the voice can't start");
        {
            RealtimeSink sink = new RealtimeSink(); Page page = new Page(); page.verses = verses; page.autoAdvance = false;
            page.core = new VoiceCore(() -> { throw new UnsatisfiedLinkError("no arm64 lib"); }, sink, page, 1f);
            page.speakAt(0);
            Thread.sleep(500);
            check("the verse is handed back to be read by the phone's voice", page.errors.equals(Collections.singletonList(verses.get(0)[0]))
                  && page.core.state() == VoiceCore.FAILED, page.errors);
            page.core.shutdown();
        }

        System.out.println("Text handling");
        check("\"the LORD\" / \"the Lord GOD\" read as words", VoiceCore.prepare("the LORD, the Lord GOD, LORD's").equals("the Lord, the Lord God, Lord's"),
              VoiceCore.prepare("the LORD, the Lord GOD, LORD's"));
        String[][] zh = {
            {"（大卫的诗）耶和华是我的牧者，我必不至缺乏。", "大卫的诗，耶和华是我的牧者，我必不至缺乏。"},
            {"亚伯兰听见他侄儿〔原文作「弟兄」〕被掳去，", "亚伯兰听见他侄儿，原文作弟兄，被掳去"},
            {"有许多人起来攻击我。（细拉）", "有许多人起来攻击我。细拉"},
            {"［新娘］愿他用口与我亲嘴；", "新娘，愿他用口与我亲嘴；"},
            {"写的是：「犹太人的王，拿撒勒人耶稣。」", "写的是：犹太人的王，拿撒勒人耶稣。"},
            {"（所有的族长都是以东人的始祖以扫的后代。）", "所有的族长都是以东人的始祖以扫的后代。"},
            {"Jehová es mi pastor; nada me faltará.", "Jehová es mi pastor; nada me faltará."}};
        boolean zhOk = true; StringBuilder zhOut = new StringBuilder();
        for (String[] c : zh) { String got = VoiceCore.prepare(c[0]); if (!got.equals(c[1])) { zhOk = false; zhOut.append(got).append(" | "); } }
        check("Chinese brackets read as pauses, quotation marks dropped, other languages untouched", zhOk, zhOut.length() == 0 ? null : zhOut);
        check("reading-speed slider default (0.92) is the voice's natural pace", Math.abs(VoiceCore.speedFor(0.92f) - 1f) < 1e-6, VoiceCore.speedFor(0.92f));
        check("callback id escaped for JavaScript", VoiceBridge.escape("a'b\\c").equals("a\\'b\\\\c"), VoiceBridge.escape("a'b\\c"));

        System.out.println();
        System.out.println((pass == total ? "RESULT: " : "RESULT (FAILURES): ") + pass + "/" + total + " passed");
        System.exit(pass == total ? 0 : 1);
    }
}
