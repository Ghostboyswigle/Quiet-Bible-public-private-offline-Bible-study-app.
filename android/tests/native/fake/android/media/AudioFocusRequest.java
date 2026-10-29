package android.media;
public class AudioFocusRequest {
    public AudioManager.OnAudioFocusChangeListener listener;
    public static class Builder {
        final AudioFocusRequest r = new AudioFocusRequest();
        public Builder(int gain) {}
        public Builder setAudioAttributes(AudioAttributes a) { return this; }
        public Builder setWillPauseWhenDucked(boolean b) { return this; }
        public Builder setOnAudioFocusChangeListener(AudioManager.OnAudioFocusChangeListener l, android.os.Handler h) { r.listener = l; return this; }
        public AudioFocusRequest build() { return r; }
    }
}
