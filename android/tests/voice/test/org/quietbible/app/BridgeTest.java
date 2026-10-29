package org.quietbible.app;

import android.content.*;
import android.content.res.AssetManager;
import android.webkit.*;
import java.io.File;
import java.lang.reflect.Method;
import java.util.*;

/**
 * VoiceBridge exactly as it ships, run on a JVM: assets come out of the built APK,
 * the natural voice is the real Piper model inside it (sherpa-onnx Linux build),
 * audio goes to a real-time AudioTrack model, and the page's end callback is
 * captured from the WebView.
 */
public class BridgeTest {
    static int pass = 0, total = 0;
    static void check(String name, boolean ok, Object detail) {
        total++; if (ok) pass++;
        System.out.println("  [" + (ok ? "PASS" : "FAIL") + "] " + name + (detail == null ? "" : "  -> " + detail));
    }
    static final class Prefs implements SharedPreferences {
        final Map<String, String> m = new HashMap<>();
        public String getString(String k, String d) { return m.containsKey(k) ? m.get(k) : d; }
        public Editor edit() { return new Editor() { public Editor putString(String k, String v) { m.put(k, v); return this; } public Editor remove(String k) { m.remove(k); return this; } public void apply() {} }; }
    }
    public static void main(String[] a) throws Exception {
        final String apk = a[0]; final File files = new File(a[1]); files.mkdirs();
        final AssetManager assets = new AssetManager(apk); final Prefs prefs = new Prefs();
        Context ctx = new Context() {
            public Context getApplicationContext() { return this; }
            public SharedPreferences getSharedPreferences(String n, int m) { return prefs; }
            public File getFilesDir() { return files; }
            public AssetManager getAssets() { return assets; }
        };
        WebView web = new WebView();
        MainActivity act = new MainActivity();
        Object systemBridge = act.new SpeechBridge();

        System.out.println("Starting up");
        Object bridge = VoiceBridge.wrap(ctx, web, systemBridge);
        VoiceBridge vb = (VoiceBridge) bridge;
        int js = 0; for (Method m : VoiceBridge.class.getDeclaredMethods()) if (m.isAnnotationPresent(JavascriptInterface.class)) js++;
        check("page sees ready/speak/prefetch/stop plus the voice and language calls", js == 12, js + " methods");
        check("Natural is the default and starts loading at once", "john".equals(vb.getVoice()) && "loading".equals(vb.voiceStatus()), vb.voiceStatus());
        long t0 = System.currentTimeMillis();
        while (!"ready".equals(vb.voiceStatus()) && !"failed".equals(vb.voiceStatus()) && System.currentTimeMillis() - t0 < 60000) Thread.sleep(50);
        check("voice loads from the APK's own files", "ready".equals(vb.voiceStatus()), vb.voiceStatus() + " after " + (System.currentTimeMillis() - t0) + " ms");
        File espeak = new File(files, "espeak-ng-data");
        check("pronunciation data copied out of the APK once", new File(espeak, "en_dict").isFile() && new File(espeak, "lang/gmw/en-US").isFile()
              && new File(espeak, ".qb-version-" + VoiceBridge.ESPEAK_VERSION).exists(), espeak.list().length + " entries");
        check("start-up guard cleared after a clean start", !new File(files, "voice-start.guard").exists(), null);
        File rebuilt = new File(files, "voice/voice.onnx");
        byte[] mine = java.nio.file.Files.readAllBytes(rebuilt.toPath());
        byte[] ref = java.nio.file.Files.readAllBytes(new File(a[2]).toPath());
        check("phone-side rebuild of the voice is bit-identical to the tested model", Arrays.equals(mine, ref), mine.length + " bytes");
        long stamp = rebuilt.lastModified();
        File again = VoiceBridge.prepareVoice(ctx, VoiceBridge.builtIn());
        check("rebuilt only once (next launches reuse it)", rebuilt.lastModified() == stamp && new File(again, "tokens.txt").isFile(), null);

        System.out.println("Reading");
        vb.speak("In the beginning God created the heavens and the earth.", 0.92f, "GEN.1.1");
        vb.prefetch("Now the earth was formless and void, and darkness was over the surface of the deep.", 0.92f, "GEN.1.2");
        t0 = System.currentTimeMillis();
        while (web.js.isEmpty() && System.currentTimeMillis() - t0 < 30000) Thread.sleep(20);
        long ms = System.currentTimeMillis() - t0;
        check("verse is read and the page told when it ends", web.js.size() == 1 && web.js.get(0).equals("window.__onQbSpeechEnd&&window.__onQbSpeechEnd('GEN.1.1')"), web.js + " after " + ms + " ms");
        check("heard for real, not skipped (took about as long as the audio)", ms > 2500, ms + " ms");
        check("phone's voice not used", !MainActivity.systemCalls.contains("speak:GEN.1.1"), MainActivity.systemCalls);

        System.out.println("Switching voices");
        vb.setVoice("system");
        vb.speak("Now the earth was formless and void.", 0.92f, "GEN.1.2");
        check("\"Phone voice\" hands reading to the phone's TTS", MainActivity.systemCalls.contains("speak:GEN.1.2") && "off".equals(vb.voiceStatus()), MainActivity.systemCalls);
        check("the choice is remembered", "system".equals(prefs.m.get("voice")), prefs.m);
        vb.setVoice("natural");
        check("back to Natural", "john".equals(vb.getVoice()) && "ready".equals(vb.voiceStatus()), vb.voiceStatus());

        System.out.println("Safety net");
        File guard = new File(files, "voice-start.guard");
        VoiceBridge.writeStrikes(guard, 2);
        check("two unfinished starts in a row are recognised", VoiceBridge.readStrikes(guard) == 2, VoiceBridge.readStrikes(guard));
        guard.delete();
        System.out.println();
        System.out.println((pass == total ? "RESULT: " : "RESULT (FAILURES): ") + pass + "/" + total + " passed");
        System.exit(pass == total ? 0 : 1);
    }
}
