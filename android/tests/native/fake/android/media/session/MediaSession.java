package android.media.session;
public class MediaSession {
    public static class Token {}
    public static class Callback {
        public void onPlay() {} public void onPause() {} public void onSkipToNext() {} public void onSkipToPrevious() {} public void onStop() {}
    }
    public Callback callback; public boolean active, released; public PlaybackState state;
    public MediaSession(android.content.Context c, String tag) {}
    public void setCallback(Callback cb) { callback = cb; }
    public void setActive(boolean a) { active = a; }
    public boolean isActive() { return active; }
    public void release() { released = true; }
    public void setMetadata(android.media.MediaMetadata m) {}
    public void setPlaybackState(PlaybackState s) { state = s; }
    public Token getSessionToken() { return new Token(); }
}
