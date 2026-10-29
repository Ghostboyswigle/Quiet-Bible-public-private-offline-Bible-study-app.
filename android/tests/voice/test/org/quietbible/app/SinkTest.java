package org.quietbible.app;

import android.media.AudioTrack;
import java.util.concurrent.atomic.AtomicBoolean;

/** AudioTrackSink against a real-time model of a streaming AudioTrack. */
public class SinkTest {
    static int pass = 0, total = 0;
    static void check(String name, boolean ok, Object detail) {
        total++; if (ok) pass++;
        System.out.println("  [" + (ok ? "PASS" : "FAIL") + "] " + name + (detail == null ? "" : "  -> " + detail));
    }
    public static void main(String[] a) throws Exception {
        final int sr = 22050;
        final VoiceCore core = new VoiceCore(() -> null, null, null, 1f); // only for tickets
        AudioTrackSink sink = new AudioTrackSink();

        VoiceCore.Ticket t1 = core.new Ticket(0);                         // generation starts at 0 → live
        float[] verse = new float[sr * 2];                                // 2 s of audio
        long s0 = System.nanoTime();
        boolean done = sink.play(verse, sr, t1);
        long ms = (System.nanoTime() - s0) / 1_000_000;
        long expect = 2000 + AudioTrackSink.GAP_MS;
        check("returns only after the verse and the short pause have been heard", done && ms >= expect - 30 && ms < expect + 250,
              ms + " ms (audio 2000 ms + pause " + AudioTrackSink.GAP_MS + " ms)");

        // stop in the middle
        final VoiceCore.Ticket t2 = core.new Ticket(0);
        final AtomicBoolean result = new AtomicBoolean(true);
        Thread player = new Thread(() -> result.set(sink.play(new float[sr * 3], sr, t2)));
        s0 = System.nanoTime();
        player.start();
        Thread.sleep(700);
        core.stop();                                                      // generation 1 → t2 dead
        long stopAt = System.nanoTime();
        player.join(2000);
        long reactMs = (System.nanoTime() - stopAt) / 1_000_000;
        check("pause stops the sound almost at once (within about one chunk)", !player.isAlive() && !result.get() && reactMs < 150,
              "returned " + result.get() + " after " + reactMs + " ms");

        // after a stop, the next verse starts cleanly from its beginning
        VoiceCore.Ticket t3 = core.new Ticket(1);
        s0 = System.nanoTime();
        done = sink.play(new float[sr / 2], sr, t3);
        ms = (System.nanoTime() - s0) / 1_000_000;
        check("the next verse starts fresh (no leftover audio from the stopped one)", done && ms < 500 + AudioTrackSink.GAP_MS + 250, ms + " ms for a 500 ms verse");
        check("one audio track reused for every verse", AudioTrack.built == 1, AudioTrack.built + " built");
        check("after a verse the track is paused, so Android doesn't think Quiet Bible is still playing", !AudioTrack.current_isPlaying(), null);
        VoiceCore.Ticket t4 = core.new Ticket(1);
        Thread p4 = new Thread(() -> sink.play(new float[sr * 3], sr, t4)); p4.start();
        Thread.sleep(400);
        core.stop(); p4.join(2000);
        sink.idle();
        check("stopping leaves the track paused too", !AudioTrack.current_isPlaying(), null);

        System.out.println();
        System.out.println((pass == total ? "RESULT: " : "RESULT (FAILURES): ") + pass + "/" + total + " passed");
        System.exit(pass == total ? 0 : 1);
    }
}
