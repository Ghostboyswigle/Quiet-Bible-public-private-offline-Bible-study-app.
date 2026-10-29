package org.quietbible.app;
import java.util.*;
/** Stands in for the real activity: its SpeechBridge is the phone's own TTS voice. */
public class MainActivity extends android.app.Activity {
    private android.speech.tts.TextToSpeech tts = new android.speech.tts.TextToSpeech();
    public android.speech.tts.TextToSpeech phoneTts() { return tts; }
    public static final List<String> systemCalls = Collections.synchronizedList(new ArrayList<String>());
    /** Like the real one: serves bible/... from the APK's assets/www. */
    public class AssetBridge {
        public String read(String path) {
            try {
                String p = path.startsWith("/") ? path.substring(1) : path;
                if (!p.startsWith("bible/") || p.contains("..")) return null;
                java.io.InputStream in = getAssets().open("www/" + p);
                java.io.ByteArrayOutputStream out = new java.io.ByteArrayOutputStream();
                byte[] b = new byte[16384]; int n; while ((n = in.read(b)) > 0) out.write(b, 0, n); in.close();
                return out.toString("UTF-8");
            } catch (Exception e) { return null; }
        }
    }

    public class SpeechBridge {
        public boolean ready() { return true; }
        public void speak(String text, float rate, String id) { systemCalls.add("speak:" + id); }
        public void stop() { systemCalls.add("stop"); }
    }
}
