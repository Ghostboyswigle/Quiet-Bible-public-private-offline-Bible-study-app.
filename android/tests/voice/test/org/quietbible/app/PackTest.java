package org.quietbible.app;

import android.content.*;
import android.content.res.AssetManager;
import android.net.Uri;
import android.webkit.WebView;
import java.io.*;
import java.util.*;
import java.util.zip.*;

/**
 * Many-language voice packs (Supertonic 3), added in two parts through the same
 * file-picker path the phone uses, then read with the real speech engine.
 *   PackTest <apk> <scratch dir> <dir with QuietBible-voices-Supertonic-part1/2.qbvoice>
 */
public class PackTest {
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
    static WebView web;
    static String waitJs(String prefix, long ms) throws InterruptedException {
        long t0 = System.currentTimeMillis();
        while (System.currentTimeMillis() - t0 < ms) {
            synchronized (web.js) { for (String s : web.js) if (s.startsWith(prefix)) { web.js.remove(s); return s; } }
            Thread.sleep(20);
        }
        return null;
    }
    static String waitStatus(VoiceBridge vb, long ms) throws InterruptedException {
        long t0 = System.currentTimeMillis(); String s;
        while (!(s = vb.voiceStatus()).equals("ready") && !s.equals("failed") && System.currentTimeMillis() - t0 < ms) Thread.sleep(50);
        return s;
    }
    static String pick(MainActivity act, String... paths) throws InterruptedException {
        Intent result = new Intent("result");
        if (paths.length == 1) result.data = new Uri(paths[0]);
        else { Uri[] u = new Uri[paths.length]; for (int i = 0; i < paths.length; i++) u[i] = new Uri(paths[i]); result.clip = new ClipData(u); }
        VoiceBridge.onActivityResult(act, VoiceBridge.REQUEST_ADD_VOICE, android.app.Activity.RESULT_OK, result);
        return waitJs("window.__qbVoiceAdded", 120000);
    }
    /** A copy of a pack part with one entry changed. */
    static String altered(String src, File to, String entry, int flipAt, String propFrom, String propTo) throws IOException {
        try (ZipInputStream in = new ZipInputStream(new FileInputStream(src)); ZipOutputStream out = new ZipOutputStream(new FileOutputStream(to))) {
            ZipEntry e; byte[] buf = new byte[1 << 16];
            while ((e = in.getNextEntry()) != null) {
                ByteArrayOutputStream b = new ByteArrayOutputStream(); int n; while ((n = in.read(buf)) > 0) b.write(buf, 0, n);
                byte[] d = b.toByteArray();
                if (e.getName().equals(entry) && flipAt >= 0) d[flipAt] ^= 0x5a;
                if (e.getName().equals("voice.properties") && propFrom != null) d = new String(d, "UTF-8").replace(propFrom, propTo).getBytes("UTF-8");
                out.putNextEntry(new ZipEntry(e.getName())); out.write(d); out.closeEntry();
            }
        }
        return to.getPath();
    }
    static String anyPackVoice(VoiceBridge vb) {
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("\"id\":\"(supertonic3-[a-z]+-[0-9]+)\"").matcher(vb.voices());
        return m.find() ? m.group(1) : "none";
    }
    static int count(String json, String what) { return json.split(java.util.regex.Pattern.quote(what), -1).length - 1; }

    static final String[][] SAY = {
        {"es", "JHN.3.16", "Porque de tal manera amó Dios al mundo, que ha dado á su Hijo unigénito."},
        {"fr", "JHN.3.16", "Car Dieu a tant aimé le monde qu’il a donné son Fils unique."},
        {"pt", "JHN.3.16", "Porque Deus amou ao mundo de tal maneira, que deu o seu Filho unigênito."},
        {"ru", "JHN.3.16", "Ибо так возлюбил Бог мир, что отдал Сына Своего Единородного."},
        {"vi", "JHN.3.16", "Vì Đức Chúa Trời yêu thương thế gian, đến nỗi đã ban Con một của Ngài."},
        {"ar", "JHN.3.16", "لأَنَّهُ هكَذَا أَحَبَّ اللهُ الْعَالَمَ حَتَّى بَذَلَ ابْنَهُ الْوَحِيدَ."},
    };

    public static void main(String[] a) throws Exception {
        final String apk = a[0]; final File files = new File(a[1]); files.mkdirs();
        final String p1 = a[2] + "/QuietBible-voices-Supertonic-part1.qbvoice", p2 = a[2] + "/QuietBible-voices-Supertonic-part2.qbvoice";
        final AssetManager assets = new AssetManager(apk); final Prefs prefs = new Prefs();
        final Context ctx = new Context() {
            public Context getApplicationContext() { return this; }
            public SharedPreferences getSharedPreferences(String n, int m) { return prefs; }
            public File getFilesDir() { return files; }
            public AssetManager getAssets() { return assets; }
        };
        MainActivity act = new MainActivity(); act.ctx = ctx;
        web = new WebView();
        VoiceBridge vb = (VoiceBridge) VoiceBridge.wrap(act, web, act.new SpeechBridge());
        File voicesDir = new File(files, "voices");

        System.out.println("Adding a pack in two parts");
        vb.addVoice(); Thread.sleep(100);
        check("the file picker lets several files be chosen at once", act.lastStarted != null && Boolean.TRUE.equals(act.lastStarted.extras.get(Intent.EXTRA_ALLOW_MULTIPLE)), null);
        String r = pick(act, p1);
        check("part 1 alone waits for part 2", r != null && r.contains("\"partial\":true") && r.contains("\"have\":1") && r.contains("\"parts\":2") && r.contains("Supertonic 3"), r);
        check("...and no voice appears yet", count(vb.voices(), "\"id\"") == 1 && !new File(voicesDir, "supertonic3").exists(), vb.voices());
        r = pick(act, p1);
        check("adding part 1 again still waits", r != null && r.contains("\"have\":1"), r);
        r = pick(act, p2);
        check("part 2 completes the pack", r != null && r.contains("\"ok\":true") && r.contains("\"pack\":\"Supertonic 3\""), r);
        for (String l : new String[] {"es", "fr", "pt", "ru", "vi", "ar"})
            check("pack lists voices for " + l, vb.voices().contains("\"id\":\"supertonic3-" + l + "-") && r.contains(l), null);
        File live = new File(voicesDir, "supertonic3");
        String[] kept = live.list(); Arrays.sort(kept);
        check("joined files in place, pieces and markers gone", kept != null && Arrays.asList(kept).containsAll(Arrays.asList(SupertonicSynth.FILES))
              && Arrays.stream(kept).noneMatch(n -> n.contains(".part") || n.startsWith(".have")) && !new File(voicesDir, ".parts-supertonic3").exists(), Arrays.toString(kept));
        check("licence travels with the voices", new File(live, "license.txt").length() > 10000, null);
        check("every pack voice names its pack and licence", count(vb.voices(), "\"pack\":\"Supertonic 3\"") >= 6 && vb.voices().contains("Open RAIL-M"), null);
        check("reading English keeps John", "john".equals(vb.getVoice()), vb.getVoice());

        System.out.println("Reading in each language");
        Set<String> chosen = new HashSet<>();
        for (String[] s : SAY) {
            vb.setLanguage(s[0]);
            String v = vb.getVoice();
            check(s[0] + ": a Supertonic voice is chosen", v.startsWith("supertonic3-" + s[0] + "-") && vb.naturalSpeaksLanguage(), v);
            chosen.add(v);
            String st = waitStatus(vb, 120000);
            MainActivity.systemCalls.clear();
            long f0 = android.media.AudioTrack.framesHeard;
            long t0 = System.currentTimeMillis();
            vb.speak(s[2], 1.0f, s[1]);
            String end = waitJs("window.__onQbSpeechEnd", 120000); Thread.sleep(300);
            long heard = android.media.AudioTrack.framesHeard - f0;
            check(s[0] + ": read by the natural voice (" + st + ", " + (System.currentTimeMillis() - t0) + " ms)", end != null && end.contains(s[1])
                  && MainActivity.systemCalls.isEmpty() && heard > 44100 * 2, end + " " + heard + " frames");
        }
        check("each language got its own voice", chosen.size() == 6, chosen);

        System.out.println("Choosing voices");
        vb.setLanguage("es");
        String other = null;
        for (String part : vb.voices().split("\\},\\{")) if (part.contains("\"id\":\"supertonic3-es-") && !part.contains("\"id\":\"" + vb.getVoice() + "\"")) {
            other = part.replaceAll("(?s).*\"id\":\"([^\"]+)\".*", "$1"); break;
        }
        check("Spanish offers a second voice", other != null, vb.voices());
        vb.setVoice(other);
        check("the second Spanish voice can be chosen", other != null && other.equals(vb.getVoice()) && "ready".equals(waitStatus(vb, 120000)), vb.getVoice());
        vb.setLanguage("fr"); vb.setLanguage("es");
        check("Spanish remembers it after French", other != null && other.equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("en");
        check("English still John", "john".equals(vb.getVoice()), vb.getVoice());

        System.out.println("Removing");
        boolean removed = vb.removeVoice(other);
        check("removing one pack voice removes the pack", removed && !live.exists() && count(vb.voices(), "\"id\"") == 1, vb.voices());
        vb.setLanguage("es");
        check("Spanish falls back to the phone's voice", "system".equals(vb.getVoice()) && !vb.naturalSpeaksLanguage(), vb.getVoice());
        vb.setLanguage("en");

        System.out.println("Damaged and mismatched parts");
        File tmp = new File(files, "t"); tmp.mkdirs();
        String bad = altered(p2, new File(tmp, "bad.qbvoice"), "vocoder.int8.onnx", 4096, null, null);
        pick(act, p1);
        r = pick(act, bad);
        check("a damaged part is refused", r != null && r.contains("damaged") && count(vb.voices(), "\"id\"") == 1 && !new File(voicesDir, "supertonic3").exists(), r);
        check("...and nothing half-made is kept", !new File(voicesDir, ".parts-supertonic3").exists(), null);
        String other1 = altered(p1, new File(tmp, "other1.qbvoice"), "", -1, "build=", "build=x");
        pick(act, other1);
        r = pick(act, p2);
        check("parts from different builds are not mixed", r != null && r.contains("\"partial\":true") && r.contains("\"have\":1"), r);
        r = pick(act, p1);
        check("...the matching part then completes it", r != null && r.contains("\"ok\":true"), r);
        check("removing clears the way for a fresh add", vb.removeVoice(anyPackVoice(vb)) && !new File(voicesDir, "supertonic3").exists(), null);

        System.out.println("Both parts at once");
        vb.setLanguage("ru");
        r = pick(act, p1, p2);
        check("picking both files together adds the pack", r != null && r.contains("\"ok\":true") && r.contains("\"pack\":\"Supertonic 3\""), r);
        check("...and it reads the current language", vb.getVoice().startsWith("supertonic3-ru-") && r.contains("\"lang\":\"ru\""), vb.getVoice());
        check("not a Piper voice file, so Piper voices are untouched", !new File(voicesDir, "supertonic3/voice.qb8").exists(), null);
        vb.setLanguage("en");

        waitStatus(vb, 60000);
        System.out.println();
        System.out.println((pass == total ? "RESULT: " : "RESULT (FAILURES): ") + pass + "/" + total + " passed");
        System.exit(pass == total ? 0 : 1);
    }
}
