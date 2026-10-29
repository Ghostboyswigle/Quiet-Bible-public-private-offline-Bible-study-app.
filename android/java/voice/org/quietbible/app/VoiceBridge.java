package org.quietbible.app;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.AssetManager;
import android.net.Uri;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * window.QuietBibleSpeech. The same speak/stop/ready calls the page always made,
 * now reading with a natural offline voice (Piper) or the phone's own voice.
 *
 * One natural voice (John) is built into the APK. More voices arrive as small
 * ".qbvoice" files the user adds once from Settings; each is kept in its packed
 * form, and only the voice in use is expanded into a full model. If a natural
 * voice can't run on a phone, reading falls back to the phone's voice.
 */
public final class VoiceBridge {

    public static final String SYSTEM = "system";
    public static final String NATURAL = "natural";   // "whichever natural voice was chosen"

    // The built-in voice
    static final String BUILTIN_ID = "john";
    static final String MODEL = "tts/voice.qb8";
    static final String TOKENS = "tts/tokens.txt";
    static final float VOICE_GAIN = 2.3f;               // John is recorded quietly

    static final String ESPEAK_ASSETS = "tts/espeak-ng-data";
    /** Bump when the bundled espeak-ng-data changes so phones copy it again. */
    static final String ESPEAK_VERSION = "1.13.8-en-1";
    /**
     * English dictionary for voices that flap the "t" in "water" ("wadder") although espeak
     * gives them a plain t: they learned it from their American speakers. It marks the
     * syllable after the t with secondary stress (voices/pronunciation/en_listx-clear-t).
     */
    static final String ESPEAK_CLEAR_T_DICT = "tts/en_dict-clear-t";
    /** Bump when en_dict-clear-t changes. */
    static final String ESPEAK_CLEAR_T_VERSION = "1";
    /** Voices that read with en_dict-clear-t. John says a clear t already; Norman got worse with it. */
    static final Set<String> CLEAR_T_VOICES = Collections.singleton("kristin");

    static final int REQUEST_ADD_VOICE = 0x5142;

    static final String PIPER = "piper";
    static final String SUPERTONIC = "supertonic";
    /** Largest voice file accepted (a pack part is under 100 MB). */
    static final long MAX_PART_BYTES = 400L << 20;

    private static final String PREFS = "quietbible_voice";
    private static final String KEY_VOICE = "voice";
    private static final String KEY_LANG = "lang";

    // One per process; they survive activity restarts. All synthesis for every voice
    // runs on one thread, so a new voice only loads after the old one is released.
    private static final ExecutorService SYNTH = VoiceCore.newThread("qb-voice-synth");
    private static final ExecutorService PLAY = VoiceCore.newThread("qb-voice-play");
    private static final AudioTrackSink SINK = new AudioTrackSink();
    private static final Object MODEL_LOCK = new Object();
    private static VoiceCore engine;
    private static String engineVoice;
    private static volatile VoiceBridge current;
    /** Language of the Bible text being read ("en", "es", ...); each natural voice speaks one language. */
    private static volatile String language = "en";
    private static String systemLanguageApplied;
    private static volatile boolean installing;

    private final Context app;
    private final WeakReference<Activity> activity;
    private final WebView web;
    private final MainActivity.SpeechBridge system;
    private final SharedPreferences prefs;

    /** A natural voice the app can read with. */
    static final class Voice {
        final String id, name, note, lang, license, source;
        final float gain;
        final int speaker;
        final File dir;          // null for the built-in voice (it lives in the APK)
        /** "piper", or "supertonic" for a voice that comes out of a many-language pack. */
        final String engine;
        /** The pack's name for voices that share one ("Supertonic 3"), else "". */
        final String pack;
        final int steps;

        Voice(String id, String name, String note, String lang, String license, String source, float gain, int speaker, File dir) {
            this(id, name, note, lang, license, source, gain, speaker, dir, PIPER, "", 0);
        }

        Voice(String id, String name, String note, String lang, String license, String source, float gain, int speaker,
              File dir, String engine, String pack, int steps) {
            this.engine = engine;
            this.pack = pack == null ? "" : pack;
            this.steps = steps;
            this.id = id;
            this.name = name;
            this.note = note;
            this.lang = lang;
            this.license = license == null ? "" : license;
            this.source = source == null ? "" : source;
            this.gain = gain;
            this.speaker = speaker;
            this.dir = dir;
        }

        boolean builtIn() {
            return dir == null;
        }
    }

    private VoiceBridge(Context context, WebView web, MainActivity.SpeechBridge system) {
        this.app = context.getApplicationContext() != null ? context.getApplicationContext() : context;
        this.activity = new WeakReference<Activity>(context instanceof Activity ? (Activity) context : null);
        this.web = web;
        this.system = system;
        this.prefs = app.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    /** Called from MainActivity.onCreate in place of registering the old bridge directly. */
    public static Object wrap(Context context, WebView web, Object systemBridge) {
        VoiceBridge b = new VoiceBridge(context, web, (MainActivity.SpeechBridge) systemBridge);
        current = b;
        AudioHooks.silenceSpeech = new Runnable() {
            @Override
            public void run() {
                shutdown();
            }
        };
        language = b.prefs.getString(KEY_LANG, "en");
        if (!SYSTEM.equals(b.voice())) b.natural(); // load the voice while the page starts
        return b;
    }

    /** Called from MainActivity.onDestroy. */
    public static void shutdown() {
        VoiceCore e;
        synchronized (VoiceBridge.class) {
            e = engine;
        }
        if (e != null) e.stop();
    }

    /** Called from MainActivity.onActivityResult. */
    public static void onActivityResult(Activity a, int request, int result, Intent data) {
        if (request != REQUEST_ADD_VOICE) return;
        final VoiceBridge b = current;
        if (b == null) return;
        final List<Uri> uris = new ArrayList<Uri>();
        if (result == Activity.RESULT_OK && data != null) {
            android.content.ClipData clip = data.getClipData();
            if (clip != null) {
                for (int i = 0; i < clip.getItemCount(); i++) {
                    Uri u = clip.getItemAt(i).getUri();
                    if (u != null) uris.add(u);
                }
            }
            if (uris.isEmpty() && data.getData() != null) uris.add(data.getData());
        }
        if (uris.isEmpty()) {
            b.reportAdded("{\"ok\":false,\"cancelled\":true}");
            return;
        }
        final Context ctx = a.getApplicationContext();
        installing = true;
        new Thread(new Runnable() {
            @Override
            public void run() {
                String json = null, partial = null, error = null;
                try {
                    for (Uri uri : uris) {
                        try {
                            InputStream in = ctx.getContentResolver().openInputStream(uri);
                            if (in == null) throw new IOException("The file could not be opened.");
                            Installed got;
                            try {
                                got = installAny(ctx, in);
                            } finally {
                                in.close();
                            }
                            if (got.voice != null) json = b.selectAdded(got);
                            else partial = got.partialJson();
                        } catch (Throwable t) {
                            if (error == null) error = t.getMessage() == null ? "That file couldn't be added." : t.getMessage();
                        }
                    }
                } finally {
                    installing = false;
                }
                // A finished voice wins; then a pack still waiting for its other part; then the problem.
                if (json == null) json = partial;
                if (json == null) json = "{\"ok\":false,\"error\":\"" + escape(error == null ? "That file couldn't be added." : error) + "\"}";
                b.reportAdded(json);
            }
        }, "qb-voice-install").start();
    }

    /** What adding one file did: a voice ready to use, or one part of a pack that needs more. */
    static final class Installed {
        final Voice voice;           // null while a pack is incomplete
        final String packName;
        final int have, parts;
        final List<Voice> all;       // every voice the file brought

        Installed(Voice voice, List<Voice> all) {
            this.voice = voice;
            this.all = all;
            this.packName = voice.pack;
            this.have = 0;
            this.parts = 0;
        }

        Installed(String packName, int have, int parts) {
            this.voice = null;
            this.all = new ArrayList<Voice>();
            this.packName = packName;
            this.have = have;
            this.parts = parts;
        }

        String partialJson() {
            return "{\"ok\":false,\"partial\":true,\"name\":\"" + escape(packName) + "\",\"have\":" + have
                + ",\"parts\":" + parts + "}";
        }
    }

    /** After an install: switch to the new voice and describe it for the page. */
    String selectAdded(Voice v) {
        setVoice(v.id);
        return "{\"ok\":true,\"id\":\"" + escape(v.id) + "\",\"name\":\"" + escape(v.name)
            + "\",\"lang\":\"" + escape(v.lang) + "\"}";
    }

    /**
     * After a pack: use its voice for the language being read (if it has one) and keep
     * any voice already chosen for the other languages.
     */
    String selectAdded(Installed got) {
        if (got.all.size() <= 1) return selectAdded(got.voice);
        Voice pick = null;
        StringBuilder langs = new StringBuilder();
        java.util.Set<String> seen = new java.util.LinkedHashSet<String>();
        for (Voice v : got.all) {
            if (pick == null && v.lang.equals(language)) pick = v;
            if (seen.add(v.lang)) langs.append(langs.length() > 0 ? "," : "").append(v.lang);
        }
        if (pick != null) setVoice(pick.id);
        Voice shown = pick != null ? pick : got.voice;
        return "{\"ok\":true,\"pack\":\"" + escape(shown.pack) + "\",\"id\":\"" + escape(shown.id) + "\",\"name\":\""
            + escape(shown.name) + "\",\"lang\":\"" + escape(shown.lang) + "\",\"langs\":\"" + escape(langs.toString()) + "\"}";
    }

    // ---- the page's interface ----

    @JavascriptInterface
    public boolean ready() {
        if (!SYSTEM.equals(voice()) && natural().state() != VoiceCore.FAILED) return true;
        return system.ready();
    }

    @JavascriptInterface
    public void speak(String text, float rate, String id) {
        if (text == null) return;
        VoiceCore e = usableNatural();
        if (e != null) {
            e.speak(text, rate, id == null ? "v" : id);
        } else {
            applySystemLanguage();
            system.speak(text, rate, id);
        }
    }

    /** The page says which language the chosen translation is in. */
    @JavascriptInterface
    public void setLanguage(String lang) {
        String l = lang == null ? "en" : lang.trim().toLowerCase(java.util.Locale.ROOT);
        if (!l.matches("[a-z]{2,3}")) l = "en";
        if (!l.equals(language)) {
            language = l;
            prefs.edit().putString(KEY_LANG, l).apply();
            stop();
        }
    }

    /** Whether a natural voice for the current translation's language is on this phone. */
    @JavascriptInterface
    public boolean naturalSpeaksLanguage() {
        return naturalFor(language) != null;
    }

    @JavascriptInterface
    public void prefetch(String text, float rate, String id) {
        if (text == null) return;
        VoiceCore e = usableNatural();
        if (e != null) e.prefetch(text, rate, id == null ? "v" : id);
    }

    @JavascriptInterface
    public void stop() {
        VoiceCore e;
        synchronized (VoiceBridge.class) {
            e = engine;
        }
        if (e != null) e.stop();
        system.stop();
    }

    /** "system", or the id of the natural voice in use. */
    @JavascriptInterface
    public String getVoice() {
        return voice();
    }

    /**
     * "system", a voice id, or "natural" for the natural voice last used. A voice is
     * remembered for its own language, so each language keeps its own choice.
     */
    @JavascriptInterface
    public void setVoice(String v) {
        if (SYSTEM.equals(v)) {
            if (systemChosen()) return;
            stop();
            prefs.edit().putString(KEY_VOICE, SYSTEM).apply();
            return;
        }
        Voice target = v == null || NATURAL.equals(v) ? naturalFor(language) : find(app, v);
        if (!systemChosen() && target != null && target.id.equals(voice())
            && target.id.equals(prefs.getString(KEY_VOICE + ".natural." + target.lang, ""))) return;
        stop();
        SharedPreferences.Editor ed = prefs.edit().putString(KEY_VOICE, NATURAL);
        if (target != null) ed.putString(KEY_VOICE + ".natural." + target.lang, target.id);
        ed.apply();
        if (!SYSTEM.equals(voice())) {
            //noinspection ResultOfMethodCallIgnored
            new File(app.getFilesDir(), "voice-start.guard").delete(); // a deliberate choice gets a fresh chance
            synchronized (VoiceBridge.class) {
                if (engine != null && engine.state() == VoiceCore.FAILED) {
                    engine.shutdown();
                    engine = null;
                    engineVoice = null;
                }
            }
            natural();
        }
    }

    /** The natural voices on this phone, as JSON: [{"id","name","note","lang","license","source","pack","builtIn"}]. */
    @JavascriptInterface
    public String voices() {
        StringBuilder b = new StringBuilder("[");
        for (Voice v : list(app)) {
            if (b.length() > 1) b.append(',');
            b.append("{\"id\":\"").append(json(v.id))
                .append("\",\"name\":\"").append(json(v.name))
                .append("\",\"note\":\"").append(json(v.note))
                .append("\",\"lang\":\"").append(json(v.lang))
                .append("\",\"license\":\"").append(json(v.license))
                .append("\",\"source\":\"").append(json(v.source))
                .append("\",\"pack\":\"").append(json(v.pack))
                .append("\",\"builtIn\":").append(v.builtIn()).append('}');
        }
        return b.append(']').toString();
    }

    /** "loading", "ready", "failed", "installing", or "off" when the phone's voice is chosen. */
    @JavascriptInterface
    public String voiceStatus() {
        if (installing) return "installing";
        if (SYSTEM.equals(voice())) return "off";
        int s = natural().state();
        return s == VoiceCore.READY ? "ready" : s == VoiceCore.FAILED ? "failed" : "loading";
    }

    /** Opens the phone's file picker to add a .qbvoice file. The page hears back via window.__qbVoiceAdded. */
    @JavascriptInterface
    public boolean addVoice() {
        final Activity a = activity.get();
        if (a == null) return false;
        a.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Intent pick = new Intent(Intent.ACTION_OPEN_DOCUMENT)
                    .addCategory(Intent.CATEGORY_OPENABLE)
                    .setType("*/*")
                    .putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);   // a voice pack can come in parts
                try {
                    a.startActivityForResult(pick, REQUEST_ADD_VOICE);
                } catch (Throwable t) {
                    reportAdded("{\"ok\":false,\"error\":\"This phone has no file picker.\"}");
                }
            }
        });
        return true;
    }

    /** Deletes an added voice (the built-in one stays). A pack's voices go together. */
    @JavascriptInterface
    public boolean removeVoice(String id) {
        Voice v = find(app, id);
        if (v == null || v.builtIn()) return false;
        List<Voice> going = new ArrayList<Voice>();
        for (Voice c : list(app)) if (c.dir != null && c.dir.equals(v.dir)) going.add(c);
        String now = voice();
        SharedPreferences.Editor ed = prefs.edit();
        for (Voice g : going) {
            if (g.id.equals(now)) stop();
            if (g.id.equals(prefs.getString(KEY_VOICE + ".natural." + g.lang, null))) ed.remove(KEY_VOICE + ".natural." + g.lang);
            if (g.id.equals(prefs.getString(KEY_VOICE + ".natural", null))) ed.remove(KEY_VOICE + ".natural");
            if (g.id.equals(prefs.getString(KEY_VOICE, null))) ed.putString(KEY_VOICE, NATURAL);
        }
        ed.apply();
        synchronized (VoiceBridge.class) {
            if (engine != null && engineVoice != null) {
                for (Voice g : going) {
                    if (g.id.equals(engineVoice)) {
                        engine.shutdown();
                        engine = null;
                        engineVoice = null;
                        break;
                    }
                }
            }
        }
        synchronized (MODEL_LOCK) {
            deleteTree(v.dir);
        }
        return true;
    }

    // ---- choosing and loading voices ----

    private boolean systemChosen() {
        return SYSTEM.equals(prefs.getString(KEY_VOICE, NATURAL));
    }

    /** The natural voice for a language: the one chosen for it, else the first installed; null if none. */
    private Voice naturalFor(String lang) {
        String pick = prefs.getString(KEY_VOICE + ".natural." + lang, null);
        if (pick == null && "en".equals(lang)) {
            String legacy = prefs.getString(KEY_VOICE, null);            // 0.7.x kept the id here
            if (legacy != null && !SYSTEM.equals(legacy) && !NATURAL.equals(legacy)) pick = legacy;
            if (pick == null) pick = prefs.getString(KEY_VOICE + ".natural", null);
        }
        Voice v = find(app, pick);
        if (v != null && lang.equals(v.lang)) return v;
        for (Voice c : list(app)) if (lang.equals(c.lang)) return c;
        return null;
    }

    /** "system", or the id of the natural voice that will read the current translation. */
    private String voice() {
        if (systemChosen()) return SYSTEM;
        Voice v = naturalFor(language);
        return v == null ? SYSTEM : v.id;
    }

    private VoiceCore usableNatural() {
        if (SYSTEM.equals(voice())) return null;
        VoiceCore e = natural();
        return e.state() == VoiceCore.FAILED ? null : e;
    }

    /** The engine for the chosen natural voice, starting (or switching) it if needed. */
    private VoiceCore natural() {
        String id = voice();
        if (SYSTEM.equals(id)) {
            Voice n = naturalFor(language);
            id = n != null ? n.id : BUILTIN_ID;
        }
        synchronized (VoiceBridge.class) {
            if (engine != null && id.equals(engineVoice)) return engine;
            if (engine != null) engine.shutdown();      // released after anything in progress
            Voice v = find(app, id);
            final Voice use = v != null ? v : builtIn();
            final Context ctx = app;
            engine = new VoiceCore(SYNTH, PLAY, new VoiceCore.SynthFactory() {
                @Override
                public VoiceCore.Synth open() throws Throwable {
                    return openVoice(ctx, use);
                }
            }, SINK, new VoiceCore.Listener() {
                @Override
                public void onDone(String verse) {
                    VoiceBridge b = current;
                    if (b != null) b.notifyEnd(verse);
                }

                @Override
                public void onError(String verse, String text, float rate) {
                    VoiceBridge b = current;
                    if (b != null) b.system.speak(text, rate, verse); // read this verse with the phone's voice
                }
            }, use.gain);
            engineVoice = use.id;
            return engine;
        }
    }

    static VoiceCore.Synth openVoice(Context ctx, Voice v) throws Throwable {
        // If starting a voice ever takes the whole app down (native code), the guard
        // is still there next launch; after two such launches the phone's voice is
        // used instead of crashing again.
        File guard = new File(ctx.getFilesDir(), "voice-start.guard");
        int strikes = readStrikes(guard);
        if (strikes >= 2) throw new IllegalStateException("natural voice failed to start before");
        writeStrikes(guard, strikes + 1);

        System.loadLibrary("onnxruntime");      // fails fast on phones without the engine
        System.loadLibrary("sherpa-onnx-jni");
        int cores0 = Runtime.getRuntime().availableProcessors();
        if (SUPERTONIC.equals(v.engine)) {
            SupertonicSynth st = new SupertonicSynth(v.dir, v.speaker, v.lang, v.steps > 0 ? v.steps : 5,
                cores0 >= 8 ? 4 : cores0 >= 6 ? 3 : 2);
            st.generate(warmUpText(v.lang), 1f);
            //noinspection ResultOfMethodCallIgnored
            guard.delete();
            return st;
        }
        File lexicon = lexicon(v);
        File espeak = null;
        if (lexicon == null) {
            espeak = prepareEspeak(ctx, v);
            addEspeakExtras(v, espeak);
        }
        File dir = prepareVoice(ctx, v);
        int cores = Runtime.getRuntime().availableProcessors();
        int threads = cores >= 8 ? 4 : cores >= 6 ? 3 : 2;
        PiperSynth s = new PiperSynth(null, new File(dir, "voice.onnx").getAbsolutePath(),
            new File(dir, "tokens.txt").getAbsolutePath(), espeak == null ? "" : espeak.getAbsolutePath(),
            lexicon == null ? null : lexicon.getAbsolutePath(), ruleFsts(v), threads, v.speaker);
        s.generate(warmUpText(v.lang), 1f);    // the first run is slow; get it done before anyone waits
        //noinspection ResultOfMethodCallIgnored
        guard.delete();
        return s;
    }

    static String warmUpText(String lang) {
        if ("es".equals(lang)) return "Amén.";
        if ("zh".equals(lang)) return "\u963f\u4eec\u3002";   // 阿们。
        if ("pt".equals(lang)) return "Amém.";
        if ("ru".equals(lang)) return "\u0410\u043c\u0438\u043d\u044c.";   // Аминь.
        if ("ar".equals(lang)) return "\u0622\u0645\u064a\u0646.";         // آمين.
        if ("vi".equals(lang)) return "A-men.";
        return "Amen.";
    }

    /** A voice that reads words from a pronunciation dictionary rather than through espeak. */
    static File lexicon(Voice v) {
        if (v.dir == null) return null;
        File f = new File(v.dir, "lexicon.txt");
        return f.isFile() ? f : null;
    }

    /**
     * The text rules a dictionary voice brings (numbers, dates...), in the order its
     * voice.properties lists them ("rules=phone.fst,date.fst,number.fst").
     */
    static String ruleFsts(Voice v) {
        if (v.dir == null) return null;
        String list;
        try {
            list = load(new FileInputStream(new File(v.dir, "voice.properties"))).getProperty("rules", "");
        } catch (IOException e) {
            return null;
        }
        StringBuilder out = new StringBuilder();
        for (String name : list.split(",")) {
            name = name.trim();
            if (!name.matches(RULE_FILE)) continue;
            File f = new File(v.dir, name);
            if (!f.isFile()) continue;
            if (out.length() > 0) out.append(',');
            out.append(f.getAbsolutePath());
        }
        return out.toString();
    }

    static final String RULE_FILE = "[a-z0-9_-]{1,32}\\.fst";

    static Voice builtIn() {
        return new Voice(BUILTIN_ID, "John", "Male · slower pace", "en",
            "Public domain recordings (LibriVox); voice by Bryce Beattie",
            "Piper en_US-john-medium, https://huggingface.co/rhasspy/piper-voices", VOICE_GAIN, 0, null);
    }

    /**
     * A voice for another language brings the pronunciation dictionary it needs
     * (e.g. es_dict); put it beside the English data the APK provides.
     */
    static void addEspeakExtras(Voice v, File espeak) throws IOException {
        if (v.dir == null) return;
        File[] extras = new File(v.dir, "espeak").listFiles();
        if (extras == null) return;
        synchronized (MODEL_LOCK) {
            for (File f : extras) {
                if (!f.getName().matches("[a-z0-9_-]+_dict")) continue;
                File to = new File(espeak, f.getName());
                if (to.isFile() && to.length() == f.length()) continue;
                copy(new FileInputStream(f), to);
            }
        }
    }

    static File voicesDir(Context ctx) {
        return new File(ctx.getFilesDir(), "voices");
    }

    /** Built-in voice first, then added voices by name. */
    static List<Voice> list(Context ctx) {
        List<Voice> out = new ArrayList<Voice>();
        out.add(builtIn());
        File[] dirs = voicesDir(ctx).listFiles();
        List<Voice> added = new ArrayList<Voice>();
        if (dirs != null) {
            for (File d : dirs) {
                Voice v = read(d);
                if (v != null) added.add(v);
                else added.addAll(readPack(d));
            }
        }
        java.util.Collections.sort(added, new java.util.Comparator<Voice>() {
            @Override
            public int compare(Voice a, Voice b) {
                int c = a.pack.compareToIgnoreCase(b.pack);           // single voices first, then each pack
                return c != 0 ? c : a.name.compareToIgnoreCase(b.name);
            }
        });
        out.addAll(added);
        return out;
    }

    static Voice find(Context ctx, String id) {
        if (id == null) return null;
        if (BUILTIN_ID.equals(id)) return builtIn();
        if (!validId(id)) return null;
        Voice v = read(new File(voicesDir(ctx), id));
        if (v != null) return v;
        int dash = id.indexOf('-');                       // a pack voice: "<pack>-<language>-<style>"
        if (dash <= 0) return null;
        for (Voice p : readPack(new File(voicesDir(ctx), id.substring(0, dash)))) if (p.id.equals(id)) return p;
        return null;
    }

    /**
     * The voices of a many-language pack (format 2), once all its parts are in and
     * joined. voice.properties lists them as voices=lang|style|name|note|gain;...
     */
    static List<Voice> readPack(File dir) {
        List<Voice> out = new ArrayList<Voice>();
        if (!dir.isDirectory() || dir.getName().startsWith(".")) return out;
        File props = new File(dir, "voice.properties");
        if (!props.isFile()) return out;
        try {
            Properties p = load(new FileInputStream(props));
            String id = p.getProperty("id", "");
            if (!"2".equals(p.getProperty("format", "")) || !id.equals(dir.getName()) || !validPackId(id)) return out;
            if (!SUPERTONIC.equals(p.getProperty("engine", ""))) return out;
            for (String f : SupertonicSynth.FILES) if (!new File(dir, f).isFile()) return out;
            String pack = p.getProperty("name", id);
            int steps = 5;
            try {
                steps = Math.max(1, Math.min(16, Integer.parseInt(p.getProperty("steps", "5").trim())));
            } catch (NumberFormatException ignored) {
            }
            for (String entry : p.getProperty("voices", "").split(";")) {
                String[] f = entry.split("\\|", -1);
                if (f.length < 4) continue;
                String lang = f[0].trim().toLowerCase(java.util.Locale.ROOT);
                if (!lang.matches("[a-z]{2,3}")) continue;
                int style;
                try {
                    style = Integer.parseInt(f[1].trim());
                } catch (NumberFormatException e) {
                    continue;
                }
                if (style < 0 || style > 999) continue;
                float gain = 1f;
                if (f.length > 4) {
                    try {
                        float g = Float.parseFloat(f[4].trim());
                        if (g > 0.2f && g < 6f) gain = g;
                    } catch (NumberFormatException ignored) {
                    }
                }
                out.add(new Voice(id + "-" + lang + "-" + style, f[2].trim(), f[3].trim(), lang,
                    p.getProperty("license", ""), p.getProperty("source", ""), gain, style, dir, SUPERTONIC, pack, steps));
            }
        } catch (IOException e) {
            return new ArrayList<Voice>();
        }
        return out;
    }

    static boolean validPackId(String id) {
        return id != null && id.matches("[a-z0-9]{1,24}") && !id.equals(SYSTEM) && !id.equals(NATURAL) && !id.equals(BUILTIN_ID);
    }

    private static Voice read(File dir) {
        if (!dir.isDirectory() || dir.getName().startsWith(".")) return null;
        File props = new File(dir, "voice.properties");
        if (!props.isFile() || !new File(dir, "voice.qb8").isFile() || !new File(dir, "tokens.txt").isFile()) return null;
        try {
            Properties p = load(new FileInputStream(props));
            String id = p.getProperty("id", "");
            if (!id.equals(dir.getName()) || !validId(id)) return null;
            String lang = p.getProperty("language", "en").trim().toLowerCase(java.util.Locale.ROOT);
            if (!lang.matches("[a-z]{2,3}")) lang = "en";
            int speaker = 0;
            try {
                speaker = Math.max(0, Math.min(999, Integer.parseInt(p.getProperty("speaker", "0").trim())));
            } catch (NumberFormatException ignored) {
            }
            return new Voice(id, p.getProperty("name", id), p.getProperty("note", ""), lang,
                p.getProperty("license", ""), p.getProperty("source", ""), gainOf(p), speaker, dir);
        } catch (IOException e) {
            return null;
        }
    }

    static boolean validId(String id) {
        return id != null && id.matches("[a-z0-9][a-z0-9_-]{0,31}")
            && !id.equals(SYSTEM) && !id.equals(NATURAL) && !id.equals(BUILTIN_ID);
    }

    private static float gainOf(Properties p) {
        try {
            float g = Float.parseFloat(p.getProperty("gain", "1"));
            return g > 0.2f && g < 6f ? g : 1f;
        } catch (NumberFormatException e) {
            return 1f;
        }
    }

    private static Properties load(InputStream in) throws IOException {
        try {
            Properties p = new Properties();
            p.load(new InputStreamReader(in, "UTF-8"));
            return p;
        } finally {
            in.close();
        }
    }

    /**
     * Adds a .qbvoice file. Two kinds exist:
     *  - format 1, one Piper voice: voice.properties, tokens.txt, voice.qb8 (plus, for some
     *    languages, espeak/xx_dict, or lexicon.txt and text-rule .fst files);
     *  - format 2, one part of a many-language pack (Supertonic): voice.properties naming
     *    the pack's files, and those files or numbered pieces of them (name.part01...).
     *    Parts wait in voices/.parts-ID until all have arrived; then the pieces are joined,
     *    checked against the sizes and SHA-256 sums the pack lists, and the pack goes live.
     * Nothing is kept from a file that fails its checks.
     */
    static Installed installAny(Context ctx, InputStream file) throws IOException {
        File root = voicesDir(ctx);
        if (!root.isDirectory() && !root.mkdirs()) throw new IOException("No room to store voices.");
        File tmp = new File(root, ".incoming-" + System.nanoTime());
        deleteTree(tmp);
        if (!tmp.mkdirs()) throw new IOException("No room to store voices.");
        try {
            ZipInputStream zip = new ZipInputStream(file);
            ZipEntry e;
            boolean any = false;
            long total = 0;
            byte[] buf = new byte[1 << 16];
            while ((e = zip.getNextEntry()) != null) {
                String n = e.getName();
                boolean extra = n.matches("espeak/[a-z0-9_-]+_dict");
                boolean dictionary = n.equals("lexicon.txt") || n.matches(RULE_FILE);
                boolean packFile = n.matches(PACK_FILE);
                if (!extra && !dictionary && !packFile && !n.equals("voice.properties") && !n.equals("tokens.txt")
                    && !n.equals("voice.qb8")) continue;
                if (extra) {
                    File d = new File(tmp, "espeak");
                    if (!d.isDirectory() && !d.mkdirs()) throw new IOException("No room to store voices.");
                }
                OutputStream out = new BufferedOutputStream(new FileOutputStream(new File(tmp, n)));
                try {
                    int r;
                    while ((r = zip.read(buf)) > 0) {
                        total += r;
                        if (total > MAX_PART_BYTES) throw new IOException("That file is too large to be a Quiet Bible voice.");
                        out.write(buf, 0, r);
                    }
                } finally {
                    out.close();
                }
                any = true;
            }
            if (!any) throw new IOException("That file isn't a Quiet Bible voice.");
            File props = new File(tmp, "voice.properties");
            if (!props.isFile()) throw new IOException("That file isn't a Quiet Bible voice.");
            Properties p = load(new FileInputStream(props));
            if ("2".equals(p.getProperty("format", ""))) return installPart(root, tmp, p);
            Voice v = installSingle(root, tmp, p);
            List<Voice> one = new ArrayList<Voice>();
            one.add(v);
            return new Installed(v, one);
        } catch (java.util.zip.ZipException z) {
            throw new IOException("That file isn't a Quiet Bible voice.");
        } catch (java.io.EOFException cut) {
            throw new IOException("That voice file is incomplete. Try downloading it again.");
        } finally {
            deleteTree(tmp);
        }
    }

    /** Plain file names a pack may carry: its model files and numbered pieces of them. */
    static final String PACK_FILE = "[a-z0-9_][a-z0-9_.-]{0,63}\\.(onnx|json|bin|txt)(\\.part[0-9]{2})?";

    /** Kept for callers that add one Piper voice. */
    static Voice install(Context ctx, InputStream file) throws IOException {
        Installed got = installAny(ctx, file);
        if (got.voice == null) throw new IOException("That is only part of a voice pack. Add the other parts too.");
        return got.voice;
    }

    private static Voice installSingle(File root, File tmp, Properties p) throws IOException {
        if (!new File(tmp, "tokens.txt").isFile() || !new File(tmp, "voice.qb8").isFile()) {
            throw new IOException("That voice file is incomplete. Try downloading it again.");
        }
        String id = p.getProperty("id", "");
        if (!"1".equals(p.getProperty("format", "")) || !validId(id)) {
            throw new IOException("That file isn't a Quiet Bible voice.");
        }
        // Expand it once without keeping the result: proves the file is whole.
        InputStream q = new FileInputStream(new File(tmp, "voice.qb8"));
        try {
            ModelPack.rebuild(q, new OutputStream() {
                @Override
                public void write(int b) {
                }

                @Override
                public void write(byte[] b, int off, int len) {
                }
            });
        } catch (IOException bad) {
            throw new IOException("That voice file is damaged. Try downloading it again.");
        } finally {
            q.close();
        }
        for (File f : listOrEmpty(tmp)) {                    // a Piper voice keeps only its own kinds of file
            String n = f.getName();
            if (f.isFile() && !n.equals("voice.properties") && !n.equals("tokens.txt") && !n.equals("voice.qb8")
                && !n.equals("lexicon.txt") && !n.matches(RULE_FILE)) {
                //noinspection ResultOfMethodCallIgnored
                f.delete();
            }
        }
        File dest = new File(root, id);
        synchronized (MODEL_LOCK) {
            deleteTree(dest);
            if (!tmp.renameTo(dest)) throw new IOException("The voice couldn't be stored.");
        }
        Voice v = read(dest);
        if (v == null) throw new IOException("The voice couldn't be stored.");
        return v;
    }

    /** One part of a many-language pack. */
    private static Installed installPart(File root, File tmp, Properties p) throws IOException {
        String id = p.getProperty("id", "");
        String name = p.getProperty("name", id);
        if (!validPackId(id) || !SUPERTONIC.equals(p.getProperty("engine", ""))) {
            throw new IOException("That voice needs a newer Quiet Bible.");
        }
        int part, parts;
        try {
            part = Integer.parseInt(p.getProperty("part", "").trim());
            parts = Integer.parseInt(p.getProperty("parts", "").trim());
        } catch (NumberFormatException e) {
            throw new IOException("That file isn't a Quiet Bible voice.");
        }
        if (parts < 1 || parts > 9 || part < 1 || part > parts) throw new IOException("That file isn't a Quiet Bible voice.");
        String build = p.getProperty("build", "");
        File stage = new File(root, ".parts-" + id);
        synchronized (MODEL_LOCK) {
            // Parts of a different build of the same pack can't be mixed: start again.
            File staged = new File(stage, "voice.properties");
            if (staged.isFile() && !build.equals(load(new FileInputStream(staged)).getProperty("build", ""))) deleteTree(stage);
            if (!stage.isDirectory() && !stage.mkdirs()) throw new IOException("No room to store voices.");
            for (File f : listOrEmpty(tmp)) {
                if (!f.isFile()) continue;
                File to = new File(stage, f.getName());
                //noinspection ResultOfMethodCallIgnored
                to.delete();
                if (!f.renameTo(to)) throw new IOException("The voice couldn't be stored.");
            }
            File have = new File(stage, ".have-" + part);
            if (!have.exists() && !have.createNewFile()) throw new IOException("The voice couldn't be stored.");
            int got = 0;
            for (int i = 1; i <= parts; i++) if (new File(stage, ".have-" + i).exists()) got++;
            if (got < parts) return new Installed(name, got, parts);

            // All parts are here: join the pieces and check every file.
            String[] files = p.getProperty("files", "").split(",");
            for (String f : files) {
                f = f.trim();
                if (!f.matches(PACK_FILE) || f.contains(".part")) throw new IOException("That file isn't a Quiet Bible voice.");
                File whole = new File(stage, f);
                List<File> pieces = new ArrayList<File>();
                for (int i = 1; i <= 99; i++) {
                    File piece = new File(stage, f + ".part" + (i < 10 ? "0" : "") + i);
                    if (!piece.isFile()) break;
                    pieces.add(piece);
                }
                if (!pieces.isEmpty()) {
                    OutputStream out = new BufferedOutputStream(new FileOutputStream(whole), 1 << 16);
                    try {
                        for (File piece : pieces) copyInto(new FileInputStream(piece), out);
                    } finally {
                        out.close();
                    }
                    for (File piece : pieces) {
                        //noinspection ResultOfMethodCallIgnored
                        piece.delete();
                    }
                }
                if (!whole.isFile()) throw new IOException("The " + name + " voice files don't match each other. Download both parts again.");
                String size = p.getProperty("size." + f, ""), sum = p.getProperty("sha256." + f, "");
                if (!size.isEmpty() && whole.length() != Long.parseLong(size.trim())) {
                    deleteTree(stage);
                    throw new IOException("The " + name + " voice files are damaged. Download both parts again.");
                }
                if (!sum.isEmpty() && !sum.trim().equalsIgnoreCase(sha256(whole))) {
                    deleteTree(stage);
                    throw new IOException("The " + name + " voice files are damaged. Download both parts again.");
                }
            }
            for (File f : listOrEmpty(stage)) {
                if (f.getName().startsWith(".have-")) {
                    //noinspection ResultOfMethodCallIgnored
                    f.delete();
                }
            }
            File dest = new File(root, id);
            deleteTree(dest);
            if (!stage.renameTo(dest)) throw new IOException("The voice couldn't be stored.");
        }
        List<Voice> all = readPack(new File(root, id));
        if (all.isEmpty()) throw new IOException("That voice pack has no voices this app can use.");
        return new Installed(all.get(0), all);
    }

    static String sha256(File f) throws IOException {
        try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-256");
            InputStream in = new FileInputStream(f);
            try {
                byte[] buf = new byte[1 << 16];
                int n;
                while ((n = in.read(buf)) > 0) md.update(buf, 0, n);
            } finally {
                in.close();
            }
            StringBuilder b = new StringBuilder();
            for (byte x : md.digest()) b.append(String.format("%02x", x & 0xff));
            return b.toString();
        } catch (java.security.NoSuchAlgorithmException e) {
            throw new IOException("SHA-256 unavailable");
        }
    }

    private static File[] listOrEmpty(File dir) {
        File[] k = dir.listFiles();
        return k == null ? new File[0] : k;
    }

    private static void copyInto(InputStream in, OutputStream out) throws IOException {
        try {
            byte[] buf = new byte[1 << 16];
            int n;
            while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
        } finally {
            in.close();
        }
    }

    /**
     * Expands the chosen voice into a full model. Only the voice in use is kept
     * expanded; the others stay packed.
     */
    static File prepareVoice(Context ctx, Voice v) throws IOException {
        synchronized (MODEL_LOCK) {
            AssetManager am = ctx.getAssets();
            long crc;
            InputStream head = packed(am, v);
            try {
                crc = ModelPack.checksum(head);
            } finally {
                head.close();
            }
            File dir = new File(ctx.getFilesDir(), "voice");
            File model = new File(dir, "voice.onnx");
            File marker = new File(dir, ".qb-model-" + v.id + "-" + Long.toHexString(crc));
            if (marker.exists() && model.isFile() && new File(dir, "tokens.txt").isFile()) return dir;

            deleteTree(dir);
            if (!dir.mkdirs() && !dir.isDirectory()) throw new IOException("mkdir " + dir);
            File tmp = new File(dir, "voice.onnx.part");
            InputStream in = packed(am, v);
            try {
                OutputStream out = new BufferedOutputStream(new FileOutputStream(tmp), 1 << 16);
                try {
                    ModelPack.rebuild(in, out);
                } finally {
                    out.close();
                }
            } finally {
                in.close();
            }
            if (!tmp.renameTo(model)) throw new IOException("could not place the voice model");
            InputStream tokens = v.builtIn() ? am.open(TOKENS) : new FileInputStream(new File(v.dir, "tokens.txt"));
            copy(tokens, new File(dir, "tokens.txt"));
            if (!marker.createNewFile() && !marker.exists()) throw new IOException("could not mark the voice model");
            return dir;
        }
    }

    private static InputStream packed(AssetManager am, Voice v) throws IOException {
        return v.builtIn() ? am.open(MODEL) : new FileInputStream(new File(v.dir, "voice.qb8"));
    }

    static int readStrikes(File f) {
        if (!f.exists()) return 0;
        return f.length() > 0 ? (int) Math.min(9, f.length()) : 1;
    }

    static void writeStrikes(File f, int n) throws IOException {
        OutputStream out = new FileOutputStream(f);
        try {
            out.write(new byte[Math.max(1, n)]);
        } finally {
            out.close();
        }
    }

    /** Point the phone's own text-to-speech at the translation's language. */
    private void applySystemLanguage() {
        String l = language;
        Object tts = phoneTts();
        if (tts == null) return;
        synchronized (VoiceBridge.class) {
            // English is set once; other languages are set before every verse, because the
            // activity sets US English again whenever its speech engine (re)starts.
            if ("en".equals(l) && l.equals(systemLanguageApplied) && tts == lastTts) return;
            try {
                android.speech.tts.TextToSpeech t = (android.speech.tts.TextToSpeech) tts;
                java.util.Locale known = tts == lastTts ? workingLocale.get(l) : null;
                if (known != null) {
                    t.setLanguage(known);
                } else {
                    java.util.Locale[] tries = systemLocales(l);
                    for (java.util.Locale loc : tries) {
                        // 0..2 = available (language, country, variant); below 0 = missing or unsupported
                        if (t.setLanguage(loc) >= 0) {
                            workingLocale.put(l, loc);
                            break;
                        }
                    }
                }
                systemLanguageApplied = l;
                lastTts = tts;
            } catch (Throwable ignored) {
            }
        }
    }

    private static final java.util.Map<String, java.util.Locale> workingLocale = new java.util.HashMap<String, java.util.Locale>();

    /**
     * The phone voices to ask for, best first. Phones name some languages differently
     * from the Bible files: Google's Tagalog voice is listed as Filipino ("fil").
     */
    static java.util.Locale[] systemLocales(String l) {
        if ("en".equals(l)) return new java.util.Locale[] {java.util.Locale.US};
        if ("tl".equals(l) || "fil".equals(l)) {
            return new java.util.Locale[] {new java.util.Locale("fil", "PH"), new java.util.Locale("tl", "PH"), new java.util.Locale("fil"), new java.util.Locale("tl")};
        }
        if ("zh".equals(l)) return new java.util.Locale[] {java.util.Locale.SIMPLIFIED_CHINESE, new java.util.Locale("zh")};
        return new java.util.Locale[] {new java.util.Locale(l)};
    }

    private static Object lastTts;

    /** The activity's TextToSpeech (the page's "phone voice"). */
    private Object phoneTts() {
        Activity a = activity.get();
        if (a == null) return null;
        try {
            java.lang.reflect.Field f = a.getClass().getDeclaredField("tts");
            f.setAccessible(true);
            return f.get(a);
        } catch (Throwable t) {
            return null;
        }
    }

    private void notifyEnd(String id) {
        runJs("window.__onQbSpeechEnd&&window.__onQbSpeechEnd('" + escape(id) + "')");
    }

    void reportAdded(String json) {
        runJs("window.__qbVoiceAdded&&window.__qbVoiceAdded(" + json + ")");
    }

    private void runJs(final String js) {
        final WebView w = web;
        if (w == null) return;
        w.post(new Runnable() {
            @Override
            public void run() {
                try {
                    w.evaluateJavascript(js, null);
                } catch (Throwable ignored) {
                }
            }
        });
    }

    /** Safe inside a JavaScript string in either quote style. */
    static String escape(String s) {
        StringBuilder b = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '\\' || c == '\'' || c == '"') b.append('\\').append(c);
            else if (c < 0x20 || c == 0x2028 || c == 0x2029 || c == '<') b.append(String.format("\\u%04x", (int) c));
            else b.append(c);
        }
        return b.toString();
    }

    /** Like escape(), for text the page hands to JSON.parse, where \' is not a valid escape. */
    static String json(String s) {
        StringBuilder b = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '\\' || c == '"') b.append('\\').append(c);
            else if (c < 0x20 || c == 0x2028 || c == 0x2029 || c == '<') b.append(String.format("\\u%04x", (int) c));
            else b.append(c);
        }
        return b.toString();
    }

    /** espeak-ng reads its data from real files, so copy it out of the APK once. */
    static File prepareEspeak(Context ctx) throws IOException {
        synchronized (MODEL_LOCK) {
            File dir = new File(ctx.getFilesDir(), "espeak-ng-data");
            File marker = new File(dir, ".qb-version-" + ESPEAK_VERSION);
            if (marker.exists()) return dir;
            deleteTree(dir);
            copyAssets(ctx.getAssets(), ESPEAK_ASSETS, dir);
            if (!marker.createNewFile() && !marker.exists()) throw new IOException("could not mark espeak data");
            return dir;
        }
    }

    /** The espeak data a voice reads with: the shared copy, or its own for CLEAR_T_VOICES. */
    static File prepareEspeak(Context ctx, Voice v) throws IOException {
        if (!CLEAR_T_VOICES.contains(v.id)) return prepareEspeak(ctx);
        synchronized (MODEL_LOCK) {
            File dir = new File(ctx.getFilesDir(), "espeak-ng-data-clear-t");
            File marker = new File(dir, ".qb-version-" + ESPEAK_VERSION + "-clear-t-" + ESPEAK_CLEAR_T_VERSION);
            if (marker.exists()) return dir;
            deleteTree(dir);
            copyAssets(ctx.getAssets(), ESPEAK_ASSETS, dir);
            copy(ctx.getAssets().open(ESPEAK_CLEAR_T_DICT), new File(dir, "en_dict"));
            if (!marker.createNewFile() && !marker.exists()) throw new IOException("could not mark espeak data");
            return dir;
        }
    }

    private static void copyAssets(AssetManager am, String path, File to) throws IOException {
        String[] kids = am.list(path);
        if (kids == null || kids.length == 0) {
            copy(am.open(path), to);
            return;
        }
        if (!to.isDirectory() && !to.mkdirs()) throw new IOException("mkdir " + to);
        for (String k : kids) copyAssets(am, path + "/" + k, new File(to, k));
    }

    private static void copy(InputStream in, File to) throws IOException {
        try {
            File parent = to.getParentFile();
            if (parent != null && !parent.isDirectory() && !parent.mkdirs()) throw new IOException("mkdir " + parent);
            OutputStream out = new FileOutputStream(to);
            try {
                byte[] buf = new byte[16384];
                int n;
                while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
            } finally {
                out.close();
            }
        } finally {
            in.close();
        }
    }

    private static void deleteTree(File f) {
        if (f == null) return;
        File[] kids = f.listFiles();
        if (kids != null) for (File k : kids) deleteTree(k);
        //noinspection ResultOfMethodCallIgnored
        f.delete();
    }
}
