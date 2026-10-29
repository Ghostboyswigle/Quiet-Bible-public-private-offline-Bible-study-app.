package android.media.session;
public class PlaybackState {
    public static final long ACTION_STOP = 1, ACTION_PAUSE = 2, ACTION_PLAY = 4, ACTION_SKIP_TO_PREVIOUS = 16, ACTION_SKIP_TO_NEXT = 32, ACTION_PLAY_PAUSE = 512;
    public static final int STATE_PAUSED = 2, STATE_PLAYING = 3; public static final long PLAYBACK_POSITION_UNKNOWN = -1;
    public int state; public long actions;
    public static class Builder {
        final PlaybackState p = new PlaybackState();
        public Builder setActions(long a) { p.actions = a; return this; }
        public Builder setState(int s, long pos, float speed, long t) { p.state = s; return this; }
        public PlaybackState build() { return p; }
    }
}
