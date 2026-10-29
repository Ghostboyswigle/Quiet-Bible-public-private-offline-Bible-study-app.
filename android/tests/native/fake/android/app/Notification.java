package android.app;
public class Notification {
    public static final int VISIBILITY_PUBLIC = 1;
    public boolean ongoing; public int actions;
    public static class Style {}
    public static class MediaStyle extends Style {
        public MediaStyle setMediaSession(android.media.session.MediaSession.Token t) { return this; }
        public MediaStyle setShowActionsInCompactView(int... a) { return this; }
    }
    public static class Action {
        public static class Builder {
            public Builder(android.graphics.drawable.Icon i, CharSequence t, PendingIntent p) {}
            public Action build() { return new Action(); }
        }
    }
    public static class Builder {
        final Notification n = new Notification();
        public Builder(android.content.Context c, String ch) {}
        public Builder setStyle(Style s) { return this; }
        public Builder setContentTitle(CharSequence s) { return this; }
        public Builder setContentText(CharSequence s) { return this; }
        public Builder setSmallIcon(int i) { return this; }
        public Builder setContentIntent(PendingIntent p) { return this; }
        public Builder setVisibility(int v) { return this; }
        public Builder setOngoing(boolean b) { n.ongoing = b; return this; }
        public Builder setShowWhen(boolean b) { return this; }
        public Builder addAction(Action a) { n.actions++; return this; }
        public Builder setColor(int c) { return this; }
        public Builder setColorized(boolean b) { return this; }
        public Builder setLargeIcon(android.graphics.Bitmap b) { return this; }
        public Notification build() { return n; }
    }
}
