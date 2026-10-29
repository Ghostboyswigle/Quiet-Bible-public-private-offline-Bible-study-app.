package android.media;
public class AudioFormat {
    public static final int ENCODING_PCM_FLOAT = 4, CHANNEL_OUT_MONO = 4;
    public static class Builder {
        int rate;
        public Builder setEncoding(int e) { return this; }
        public Builder setSampleRate(int r) { rate = r; return this; }
        public Builder setChannelMask(int m) { return this; }
        public AudioFormat build() { AudioFormat f = new AudioFormat(); f.rate = rate; return f; }
    }
    int rate;
}
