package android.media;
/** Real-time model of a streaming AudioTrack: a buffer the hardware drains at the sample rate. */
public class AudioTrack {
    public static final int MODE_STREAM = 1, WRITE_BLOCKING = 0;
    public static int built = 0; static AudioTrack last;
    public static boolean current_isPlaying() { return last != null && last.isPlayingNow(); }
    public static volatile long framesHeard = 0;           // frames actually played, across all utterances
    final int rate, capacity; long written, played; long playStart; long playedAtStart; boolean playing; public boolean released;
    AudioTrack(int rate, int bytes) { this.rate = rate; this.capacity = bytes / 4; built++; last = this; }
    public static int getMinBufferSize(int r, int ch, int enc) { return 4096; }
    synchronized long head() {
        if (!playing) return played;
        long h = playedAtStart + (System.nanoTime() - playStart) * rate / 1_000_000_000L;
        return Math.min(h, written);
    }
    public synchronized void play() { if (!playing) { playedAtStart = played; playStart = System.nanoTime(); playing = true; } }
    public synchronized void pause() { if (playing) { long h = head(); framesHeard += h - played; played = h; playing = false; } }
    public synchronized void flush() { if (!playing) { written = played = 0; } }
    public int getPlaybackHeadPosition() { synchronized (this) { long h = head(); return (int) h; } }
    public int write(float[] d, int off, int n, int mode) {
        while (true) {
            synchronized (this) {
                if (released) return -1;
                if (written - head() + n <= capacity) { written += n; return n; }
            }
            try { Thread.sleep(2); } catch (InterruptedException e) { return -1; }
        }
    }
    public synchronized void release() { released = true; }
    public synchronized boolean isPlayingNow() { return playing; }
    /** frames heard by the listener so far (including the current play segment) */
    public synchronized long heardSoFar() { return framesHeard + (playing ? head() - played : 0); }
    public static class Builder {
        int rate, bytes;
        public Builder setAudioAttributes(AudioAttributes a) { return this; }
        public Builder setAudioFormat(AudioFormat f) { rate = f.rate; return this; }
        public Builder setTransferMode(int m) { return this; }
        public Builder setBufferSizeInBytes(int b) { bytes = b; return this; }
        public AudioTrack build() { return new AudioTrack(rate, bytes); }
    }
}
