package org.quietbible.app;
/** Compile-time stand-in only; the real MainActivity already ships in classes.dex. */
public class MainActivity extends android.app.Activity {
    public class AssetBridge {
        public String read(String path) { return null; }
    }

    public class SpeechBridge {
        public boolean ready() { return false; }
        public void speak(String text, float rate, String id) {}
        public void stop() {}
    }
}
