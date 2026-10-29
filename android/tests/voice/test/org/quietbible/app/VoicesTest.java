package org.quietbible.app;

import android.app.Activity;
import android.content.*;
import android.content.res.AssetManager;
import android.net.Uri;
import android.webkit.WebView;
import java.io.*;
import java.util.*;
import java.util.zip.*;

/**
 * Several voices, run on a JVM exactly as shipped: the built-in voice from the APK,
 * the other voices added from their .qbvoice files through the same file-picker
 * path the phone uses (onActivityResult), real Piper synthesis, real-time playback
 * model, and the page callbacks captured from the WebView.
 */
public class VoicesTest {
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
    static String pick(Activity act, String path) throws InterruptedException {
        Intent result = new Intent("result"); result.data = new Uri(path);
        VoiceBridge.onActivityResult(act, act.lastRequest, Activity.RESULT_OK, result);
        return waitJs("window.__qbVoiceAdded", 60000);
    }

    public static void main(String[] a) throws Exception {
        final String apk = a[0]; final File files = new File(a[1]); files.mkdirs(); final String voices = a[2];
        final AssetManager assets = new AssetManager(apk); final Prefs prefs = new Prefs();
        prefs.m.put("voice", "natural");                           // what v0.7.0 saved
        final Context ctx = new Context() {
            public Context getApplicationContext() { return this; }
            public SharedPreferences getSharedPreferences(String n, int m) { return prefs; }
            public File getFilesDir() { return files; }
            public AssetManager getAssets() { return assets; }
        };
        MainActivity act = new MainActivity(); act.ctx = ctx;
        web = new WebView();
        VoiceBridge vb = (VoiceBridge) VoiceBridge.wrap(act, web, act.new SpeechBridge());

        System.out.println("Updating from 0.7.0");
        check("John is still chosen and loads", "john".equals(vb.getVoice()) && "ready".equals(waitStatus(vb, 60000)), vb.getVoice());
        check("only John is listed before anything is added", vb.voices().startsWith("[{\"id\":\"john\",\"name\":\"John\",\"note\":\"Male · slower pace\",\"lang\":\"en\",")
              && vb.voices().endsWith("\"builtIn\":true}]") && vb.voices().split("\"id\"").length - 1 == 1, vb.voices());
        check("John's credit is in the list (public-domain LibriVox recordings)", vb.voices().contains("\"license\":\"Public domain recordings (LibriVox)")
              && vb.voices().contains("\"source\":\"Piper en_US-john-medium"), vb.voices());

        System.out.println("Adding voices from their files");
        check("\"Add a voice\" opens the phone's file picker", vb.addVoice() && act.lastStarted != null
              && Intent.ACTION_OPEN_DOCUMENT.equals(act.lastStarted.action) && act.lastRequest == VoiceBridge.REQUEST_ADD_VOICE, act.lastStarted == null ? null : act.lastStarted.action);
        String r = pick(act, voices + "/QuietBible-voice-Kristin.qbvoice");
        check("Kristin added, and switched to", r != null && r.contains("\"ok\":true") && r.contains("Kristin") && "kristin".equals(vb.getVoice()), r);
        check("...and she loads", "ready".equals(waitStatus(vb, 60000)), vb.voiceStatus());
        vb.speak("The LORD is my shepherd; I shall not want.", 0.92f, "PSA.23.1");
        String end = waitJs("window.__onQbSpeechEnd", 30000);
        check("reads with the new voice", end != null && end.contains("PSA.23.1"), end);
        File clearT = new File(files, "espeak-ng-data-clear-t"), shared = new File(files, "espeak-ng-data");
        byte[] kd = java.nio.file.Files.readAllBytes(new File(clearT, "en_dict").toPath());
        byte[] sd = java.nio.file.Files.readAllBytes(new File(shared, "en_dict").toPath());
        check("Kristin reads with her own English dictionary (a clear t in \"water\")",
              new File(clearT, ".qb-version-" + VoiceBridge.ESPEAK_VERSION + "-clear-t-" + VoiceBridge.ESPEAK_CLEAR_T_VERSION).exists()
              && new File(clearT, "lang/gmw/en-US").isFile() && kd.length > 100000 && !Arrays.equals(kd, sd), kd.length + " vs " + sd.length);
        check("...and the shared one the other voices use is untouched", sd.length == 166944, sd.length);
        r = pick(act, voices + "/QuietBible-voice-Norman.qbvoice");
        check("Norman added", r != null && r.contains("\"ok\":true"), r);
        r = pick(act, voices + "/QuietBible-voice-Joe.qbvoice");
        check("Joe added", r != null && r.contains("\"ok\":true"), r);
        String list = vb.voices();
        check("all four listed: John first, then the added ones by name", list.indexOf("john") < list.indexOf("joe") && list.indexOf("joe") < list.indexOf("kristin")
              && list.indexOf("kristin") < list.indexOf("norman") && list.split("\\{").length - 1 == 4, list);

        System.out.println("Switching at any time");
        String[] order = {"norman", "john", "joe", "kristin", "system", "john"};
        List<String> heard = new ArrayList<>();
        for (String v : order) {
            vb.setVoice(v);
            if (!"system".equals(v)) {
                String st = waitStatus(vb, 60000);
                vb.speak("He makes me lie down in green pastures.", 0.92f, "v-" + v);
                String e = waitJs("window.__onQbSpeechEnd", 30000);
                heard.add(v + ":" + (e != null && e.contains("v-" + v) ? "read" : "MISSING") + "(" + st + ")");
            } else {
                vb.speak("He leads me beside quiet waters.", 0.92f, "v-system");
                heard.add("system:" + (MainActivity.systemCalls.contains("speak:v-system") ? "phone voice" : "MISSING"));
            }
        }
        check("every voice reads when chosen, including switching back and forth", !heard.toString().contains("MISSING") && !heard.toString().contains("failed"), heard);
        check("the choice is remembered (for English)", "john".equals(prefs.m.get("voice.natural.en")) && "natural".equals(prefs.m.get("voice")), prefs.m);

        System.out.println("Storage");
        File expanded = new File(files, "voice");
        String[] markers = expanded.list((d, n) -> n.startsWith(".qb-model-"));
        check("only the voice in use is expanded (one full model on the phone)", markers != null && markers.length == 1 && markers[0].startsWith(".qb-model-john-"), Arrays.toString(markers));
        long packed = 0; for (File f : new File(files, "voices").listFiles()) for (File g : f.listFiles()) packed += g.length();
        check("added voices kept packed (~16 MB each)", packed < 3 * 18_000_000L, packed / 1_000_000 + " MB for 3 voices");

        System.out.println("Removing");
        vb.setVoice("norman"); waitStatus(vb, 60000);
        check("removing the voice in use falls back to John", vb.removeVoice("norman") && "john".equals(vb.getVoice()) && !vb.voices().contains("norman"), vb.voices());
        check("the built-in voice can't be removed", !vb.removeVoice("john"), null);

        System.out.println("Files that aren't voices");
        File junk = new File(files, "notes.zip");
        try (ZipOutputStream z = new ZipOutputStream(new FileOutputStream(junk))) { z.putNextEntry(new ZipEntry("hello.txt")); z.write("hi".getBytes()); }
        r = pick(act, junk.getPath());
        check("a random zip is refused politely", r != null && r.contains("isn\\'t a Quiet Bible voice"), r);
        File cut = new File(files, "cut.qbvoice");
        byte[] whole = java.nio.file.Files.readAllBytes(new File(voices, "QuietBible-voice-Joe.qbvoice").toPath());
        java.nio.file.Files.write(cut.toPath(), Arrays.copyOf(whole, whole.length / 2));
        vb.removeVoice("joe");
        r = pick(act, cut.getPath());
        check("a half-downloaded voice file is refused, nothing half-installed", r != null && r.contains("incomplete") && !vb.voices().contains("joe")
              && new File(files, "voices").list().length == 1, r);
        File txt = new File(files, "photo.jpg"); java.nio.file.Files.write(txt.toPath(), "not a zip".getBytes());
        r = pick(act, txt.getPath());
        check("any other file is refused", r != null && r.contains("isn\\'t a Quiet Bible voice"), r);
        VoiceBridge.onActivityResult(act, VoiceBridge.REQUEST_ADD_VOICE, Activity.RESULT_CANCELED, null);
        r = waitJs("window.__qbVoiceAdded", 5000);
        check("backing out of the picker changes nothing", r != null && r.contains("cancelled") && "john".equals(vb.getVoice()), r);

        System.out.println("Reading a Spanish translation");
        vb.setLanguage("es");
        MainActivity.systemCalls.clear();
        vb.speak("En el principio crió Dios los cielos y la tierra.", 0.92f, "GEN.1.1");
        check("Spanish text goes to the phone's voice, set to Spanish", MainActivity.systemCalls.contains("speak:GEN.1.1")
              && "es".equals(act.phoneTts().language.getLanguage()) && !vb.naturalSpeaksLanguage(), MainActivity.systemCalls + " " + act.phoneTts().language);
        check("the natural voice isn't handed Spanish text", waitJs("window.__onQbSpeechEnd", 1500) == null, null);
        check("with no Spanish voice added, the voice setting shows the phone voice", "system".equals(vb.getVoice()), vb.getVoice());

        System.out.println("Adding Spanish voices");
        r = pick(act, voices + "/QuietBible-voice-Ald-Spanish.qbvoice");
        check("Ald (Spanish) added", r != null && r.contains("\"ok\":true") && r.contains("\"lang\":\"es\""), r);
        check("...and becomes the voice for Spanish", "ald".equals(vb.getVoice()) && vb.naturalSpeaksLanguage() && "ready".equals(waitStatus(vb, 60000)), vb.getVoice() + " " + vb.voiceStatus());
        check("its Spanish pronunciation dictionary is in place", new File(files, "espeak-ng-data/es_dict").isFile(), null);
        MainActivity.systemCalls.clear();
        vb.speak("En el principio crió Dios los cielos y la tierra.", 0.92f, "GEN.1.1");
        String es = waitJs("window.__onQbSpeechEnd", 30000);
        check("Spanish is now read by the natural voice", es != null && es.contains("GEN.1.1") && MainActivity.systemCalls.isEmpty(), es);
        r = pick(act, voices + "/QuietBible-voice-Sharvard-Spanish.qbvoice");
        check("Sharvard (Spanish, female) added and chosen", r != null && r.contains("\"ok\":true") && "sharvard".equals(vb.getVoice()) && "ready".equals(waitStatus(vb, 60000)), vb.getVoice());
        vb.speak("Jehová es mi pastor; nada me faltará.", 0.92f, "PSA.23.1");
        String es2 = waitJs("window.__onQbSpeechEnd", 30000);
        check("...and reads (the female voice of a two-voice model)", es2 != null && es2.contains("PSA.23.1"), es2);
        String listed = vb.voices();
        check("voices list says which language each speaks", listed.contains("\"id\":\"ald\",\"name\":\"Ald\",\"note\":\"Male · Latin American Spanish\",\"lang\":\"es\"")
              && listed.contains("\"id\":\"john\",\"name\":\"John\",\"note\":\"Male · slower pace\",\"lang\":\"en\""), listed);

        System.out.println("Each language keeps its own voice");
        vb.setVoice("kristin");                                  // English choice while reading Spanish
        check("choosing an English voice while reading Spanish doesn't change the Spanish voice", "sharvard".equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("en");
        check("back to English: Kristin", "kristin".equals(vb.getVoice()) && "ready".equals(waitStatus(vb, 60000)), vb.getVoice());
        MainActivity.systemCalls.clear();
        vb.speak("In the beginning God created the heavens and the earth.", 0.92f, "GEN.1.1");
        String back = waitJs("window.__onQbSpeechEnd", 30000);
        check("back to an English translation: the natural voice reads again", back != null && MainActivity.systemCalls.isEmpty() && vb.naturalSpeaksLanguage(), back);
        vb.setLanguage("es");
        check("and Spanish again: Sharvard", "sharvard".equals(vb.getVoice()), vb.getVoice());
        vb.setVoice("system");
        check("the phone voice is one choice for every language", "system".equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("en");
        check("...English too", "system".equals(vb.getVoice()), vb.getVoice());
        vb.setVoice("john"); vb.setLanguage("es");
        check("picking a natural voice again brings back each language's own", "sharvard".equals(vb.getVoice()), vb.getVoice());
        vb.removeVoice("sharvard");
        check("removing the Spanish voice in use falls back to the other Spanish voice", "ald".equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("en");
        waitStatus(vb, 60000);

        System.out.println("Chinese (dictionary voices)");
        vb.setLanguage("zh");
        MainActivity.systemCalls.clear();
        vb.speak("起初神创造天地。", 0.92f, "GEN.1.1");
        check("no Chinese voice yet: the phone's voice reads, set to Chinese", MainActivity.systemCalls.contains("speak:GEN.1.1")
              && "zh".equals(act.phoneTts().language.getLanguage()) && "system".equals(vb.getVoice()), MainActivity.systemCalls + " " + act.phoneTts().language);
        r = pick(act, voices + "/QuietBible-voice-Chaowen-Chinese.qbvoice");
        File cw = new File(files, "voices/chaowen");
        check("Chaowen (Mandarin) added with its pronunciation dictionary and number rules", r != null && r.contains("\"ok\":true") && r.contains("\"lang\":\"zh\"")
              && new File(cw, "lexicon.txt").length() > 1_000_000 && new File(cw, "number.fst").isFile() && new File(cw, "date.fst").isFile() && new File(cw, "phone.fst").isFile(), r);
        String rules = VoiceBridge.ruleFsts(VoiceBridge.find(ctx, "chaowen"));
        check("number/date rules handed to the engine in the voice's own order", rules != null && rules.endsWith("phone.fst," + cw.getAbsolutePath() + "/date.fst," + cw.getAbsolutePath() + "/number.fst"), rules);
        check("...becomes the Chinese voice and loads", "chaowen".equals(vb.getVoice()) && vb.naturalSpeaksLanguage() && "ready".equals(waitStatus(vb, 60000)), vb.getVoice() + " " + vb.voiceStatus());
        MainActivity.systemCalls.clear();
        long heard0 = android.media.AudioTrack.framesHeard;
        vb.speak("（大卫的诗）耶和华是我的牧者，我必不至缺乏。", 0.92f, "PSA.23.1");
        String zh = waitJs("window.__onQbSpeechEnd", 30000);
        Thread.sleep(300);
        long heardZh = android.media.AudioTrack.framesHeard - heard0;
        check("Chinese is read by the natural voice (a whole verse of speech)", zh != null && zh.contains("PSA.23.1") && MainActivity.systemCalls.isEmpty()
              && heardZh > 22050 * 2, zh + ", " + heardZh / 22050.0 + " s heard");
        r = pick(act, voices + "/QuietBible-voice-XiaoYa-Chinese.qbvoice");
        check("Xiao Ya (Mandarin, female) added and chosen", r != null && r.contains("\"ok\":true") && "xiaoya".equals(vb.getVoice()) && "ready".equals(waitStatus(vb, 60000)), vb.getVoice());
        vb.speak("神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不至灭亡，反得永生。", 0.92f, "JHN.3.16");
        String zh2 = waitJs("window.__onQbSpeechEnd", 30000);
        check("...and reads", zh2 != null && zh2.contains("JHN.3.16"), zh2);
        vb.setLanguage("es");
        check("Spanish keeps its own voice", "ald".equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("zh");
        check("...and Chinese keeps Xiao Ya", "xiaoya".equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("en");

        System.out.println("Tagalog (no natural voice: the phone's Filipino voice reads)");
        vb.setLanguage("tl");
        MainActivity.systemCalls.clear();
        vb.speak("Nang pasimula ay nilikha ng Dios ang langit at ang lupa.", 0.92f, "GEN.1.1");
        check("Tagalog goes to the phone's voice, asked for as Filipino (how phones list it)", MainActivity.systemCalls.contains("speak:GEN.1.1")
              && "fil_PH".equals(act.phoneTts().language.toString()) && "system".equals(vb.getVoice()) && !vb.naturalSpeaksLanguage(), MainActivity.systemCalls + " " + act.phoneTts().language);
        vb.setLanguage("en"); vb.speak("In the beginning.", 0.92f, "GEN.1.1"); waitJs("window.__onQbSpeechEnd", 30000);
        android.speech.tts.TextToSpeech.unsupported.add("fil_PH");
        android.speech.tts.TextToSpeech.unsupported.add("fil");
        vb.setLanguage("tl");
        java.lang.reflect.Field wl = VoiceBridge.class.getDeclaredField("workingLocale"); wl.setAccessible(true); ((Map<?, ?>) wl.get(null)).clear();
        MainActivity.systemCalls.clear();
        vb.speak("Ang Panginoon ay aking pastor; hindi ako mangangailangan.", 0.92f, "PSA.23.1");
        check("a phone that only knows the older Tagalog code still gets Tagalog", "tl_PH".equals(act.phoneTts().language.toString()), act.phoneTts().language);
        android.speech.tts.TextToSpeech.unsupported.clear();
        vb.setLanguage("en");

        System.out.println("Vietnamese");
        vb.setLanguage("vi");
        check("no Vietnamese voice yet: the phone's voice, set to Vietnamese", "system".equals(vb.getVoice()) && !vb.naturalSpeaksLanguage(), vb.getVoice());
        r = pick(act, voices + "/QuietBible-voice-Vais-Vietnamese.qbvoice");
        check("Vais (Vietnamese) added and chosen for Vietnamese", r != null && r.contains("\"ok\":true") && r.contains("\"lang\":\"vi\"") && "vais".equals(vb.getVoice())
              && "ready".equals(waitStatus(vb, 60000)), r + " " + vb.voiceStatus());
        check("its Vietnamese pronunciation dictionary is in place", new File(files, "espeak-ng-data/vi_dict").isFile(), null);
        MainActivity.systemCalls.clear();
        long h0 = android.media.AudioTrack.framesHeard;
        vb.speak("Vì Đức Chúa Trời yêu thương thế gian, đến nỗi đã ban Con một của Ngài.", 0.92f, "JHN.3.16");
        String vi = waitJs("window.__onQbSpeechEnd", 30000);
        Thread.sleep(300);
        long heardVi = android.media.AudioTrack.framesHeard - h0;
        check("Vietnamese is read by the natural voice", vi != null && vi.contains("JHN.3.16") && MainActivity.systemCalls.isEmpty() && heardVi > 22050 * 2, vi + ", " + heardVi / 22050.0 + " s");
        vb.setLanguage("zh");
        check("Chinese still has its own voice", "xiaoya".equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("en");

        System.out.println("French");
        vb.setLanguage("fr");
        r = pick(act, voices + "/QuietBible-voice-Siwis-French.qbvoice");
        check("Siwis (French, female) added and chosen for French", r != null && r.contains("\"ok\":true") && r.contains("\"lang\":\"fr\"") && "siwis".equals(vb.getVoice())
              && "ready".equals(waitStatus(vb, 60000)), r + " " + vb.voiceStatus());
        check("French pronunciation dictionary in place", new File(files, "espeak-ng-data/fr_dict").isFile(), null);
        MainActivity.systemCalls.clear();
        long f0 = android.media.AudioTrack.framesHeard;
        vb.speak("Car Dieu a tant aimé le monde qu’il a donné son Fils unique.", 0.92f, "JHN.3.16");
        String fr1 = waitJs("window.__onQbSpeechEnd", 30000); Thread.sleep(300);
        check("French is read by the natural voice", fr1 != null && fr1.contains("JHN.3.16") && MainActivity.systemCalls.isEmpty() && android.media.AudioTrack.framesHeard - f0 > 22050 * 2, fr1);
        r = pick(act, voices + "/QuietBible-voice-Pierre-French.qbvoice");
        check("Pierre (French, male) added and chosen", r != null && r.contains("\"ok\":true") && "pierre".equals(vb.getVoice()) && "ready".equals(waitStatus(vb, 60000)), vb.getVoice());
        vb.speak("L’Éternel est mon berger: je ne manquerai de rien.", 0.92f, "PSA.23.1");
        String fr2 = waitJs("window.__onQbSpeechEnd", 30000);
        check("...and reads (the male voice of a two-voice model)", fr2 != null && fr2.contains("PSA.23.1") && VoiceBridge.find(ctx, "pierre").speaker == 1, fr2);
        vb.setLanguage("vi");
        check("Vietnamese keeps its voice", "vais".equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("fr");
        check("French keeps Pierre", "pierre".equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("en");

        System.out.println("Arabic");
        vb.setLanguage("ar");
        check("no Arabic voice yet: the phone's voice", "system".equals(vb.getVoice()) && !vb.naturalSpeaksLanguage(), vb.getVoice());
        r = pick(act, voices + "/QuietBible-voice-Kareem-Arabic.qbvoice");
        check("voice list stays valid JSON when a credit has an apostrophe", !vb.voices().contains("\\'"), vb.voices().length() + " chars");
        check("Kareem (Arabic) added and chosen for Arabic", r != null && r.contains("\"ok\":true") && r.contains("\"lang\":\"ar\"") && "kareem".equals(vb.getVoice())
              && "ready".equals(waitStatus(vb, 60000)), r + " " + vb.voiceStatus());
        check("Arabic pronunciation dictionary in place", new File(files, "espeak-ng-data/ar_dict").isFile(), null);
        MainActivity.systemCalls.clear();
        long a0 = android.media.AudioTrack.framesHeard;
        vb.speak("لأَنَّهُ هكَذَا أَحَبَّ اللهُ الْعَالَمَ حَتَّى بَذَلَ ابْنَهُ الْوَحِيدَ", 0.92f, "JHN.3.16");
        String ar = waitJs("window.__onQbSpeechEnd", 30000); Thread.sleep(300);
        check("Arabic is read by the natural voice", ar != null && ar.contains("JHN.3.16") && MainActivity.systemCalls.isEmpty() && android.media.AudioTrack.framesHeard - a0 > 22050 * 2, ar);
        vb.setLanguage("fr");
        check("French keeps its voice", "pierre".equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("en");

        System.out.println("Portuguese");
        vb.setLanguage("pt");
        r = pick(act, voices + "/QuietBible-voice-Faber-Portuguese.qbvoice");
        check("Faber (Portuguese) added and chosen for Portuguese", r != null && r.contains("\"ok\":true") && r.contains("\"lang\":\"pt\"") && "faber".equals(vb.getVoice())
              && "ready".equals(waitStatus(vb, 60000)), r + " " + vb.voiceStatus());
        check("Portuguese pronunciation dictionary in place", new File(files, "espeak-ng-data/pt_dict").isFile(), null);
        MainActivity.systemCalls.clear();
        long p0 = android.media.AudioTrack.framesHeard;
        vb.speak("Porque Deus amou ao mundo de tal maneira, que deu o seu Filho unigênito.", 0.92f, "JHN.3.16");
        String pt = waitJs("window.__onQbSpeechEnd", 30000); Thread.sleep(300);
        check("Portuguese is read by the natural voice", pt != null && pt.contains("JHN.3.16") && MainActivity.systemCalls.isEmpty() && android.media.AudioTrack.framesHeard - p0 > 22050 * 2, pt);
        vb.setLanguage("es");
        check("Spanish keeps its own voice (no mix-up between es and pt)", "ald".equals(vb.getVoice()), vb.getVoice());
        vb.setLanguage("en");

        System.out.println("Russian");
        vb.setLanguage("ru");
        r = pick(act, voices + "/QuietBible-voice-Dmitri-Russian.qbvoice");
        check("Dmitri (Russian, male) added and chosen for Russian", r != null && r.contains("\"ok\":true") && r.contains("\"lang\":\"ru\"") && "dmitri".equals(vb.getVoice())
              && "ready".equals(waitStatus(vb, 60000)), r + " " + vb.voiceStatus());
        check("Russian pronunciation dictionary in place", new File(files, "espeak-ng-data/ru_dict").length() > 1_000_000, null);
        MainActivity.systemCalls.clear();
        long r0 = android.media.AudioTrack.framesHeard;
        vb.speak("Ибо так возлюбил Бог мир, что отдал Сына Своего Единородного.", 0.92f, "JHN.3.16");
        String ru = waitJs("window.__onQbSpeechEnd", 30000); Thread.sleep(300);
        check("Russian is read by the natural voice", ru != null && ru.contains("JHN.3.16") && MainActivity.systemCalls.isEmpty() && android.media.AudioTrack.framesHeard - r0 > 22050 * 2, ru);
        r = pick(act, voices + "/QuietBible-voice-Irina-Russian.qbvoice");
        check("Irina (Russian, female) added and chosen", r != null && r.contains("\"ok\":true") && "irina".equals(vb.getVoice()) && "ready".equals(waitStatus(vb, 60000)), vb.getVoice());
        vb.speak("Господь — Пастырь мой; я ни в чем не буду нуждаться.", 0.92f, "PSA.22.1");
        String ru2 = waitJs("window.__onQbSpeechEnd", 30000);
        check("...and reads", ru2 != null && ru2.contains("PSA.22.1"), ru2);
        vb.setLanguage("en");

        waitStatus(vb, 60000);                     // let the voice finish loading before the JVM exits
        System.out.println();
        System.out.println((pass == total ? "RESULT: " : "RESULT (FAILURES): ") + pass + "/" + total + " passed");
        System.exit(pass == total ? 0 : 1);
    }
}
