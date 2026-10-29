package android.media;
public class AudioTrack {
    public static final int MODE_STATIC = 0, PLAYSTATE_PAUSED = 2, PLAYSTATE_PLAYING = 3, PLAYSTATE_STOPPED = 1;
    public static int created = 0; public static AudioTrack current;
    int state = PLAYSTATE_STOPPED; public boolean released; public int loopCount;
    public int getPlayState() { return state; }
    public void play() { if (released) throw new IllegalStateException(); state = PLAYSTATE_PLAYING; }
    public void pause() { state = PLAYSTATE_PAUSED; }
    public void stop() { state = PLAYSTATE_STOPPED; }
    public void release() { released = true; state = PLAYSTATE_STOPPED; }
    public int write(short[] d, int off, int n) { return n; }
    public int setLoopPoints(int s, int e, int count) { loopCount = count; return 0; }
    public static class Builder {
        public Builder setAudioAttributes(AudioAttributes a) { return this; }
        public Builder setAudioFormat(AudioFormat f) { return this; }
        public Builder setTransferMode(int m) { return this; }
        public Builder setBufferSizeInBytes(int b) { return this; }
        public AudioTrack build() { created++; current = new AudioTrack(); return current; }
    }
    public static boolean silentPlaying() { return current != null && !current.released && current.state == PLAYSTATE_PLAYING; }
}
