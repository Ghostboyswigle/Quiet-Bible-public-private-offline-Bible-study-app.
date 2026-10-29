package android.media;
public class MediaMetadata {
    public static final String METADATA_KEY_TITLE = "android.media.metadata.TITLE", METADATA_KEY_ARTIST = "android.media.metadata.ARTIST",
        METADATA_KEY_ALBUM = "android.media.metadata.ALBUM", METADATA_KEY_ALBUM_ART = "android.media.metadata.ALBUM_ART";
    public static class Builder {
        public Builder putString(String k, String v) { return this; }
        public Builder putBitmap(String k, android.graphics.Bitmap b) { return this; }
        public MediaMetadata build() { return new MediaMetadata(); }
    }
}
