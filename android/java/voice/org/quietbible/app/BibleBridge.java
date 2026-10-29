package org.quietbible.app;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * window.QuietBibleAssets. The page reads the Bible text through read(path); the
 * built-in King James Version comes from the APK, and paths
 * under "translations/ID/..." come from translations the user has added from
 * ".qbbible" files in Settings, or, for the built-in Berean Standard Bible, from the
 * APK's bible/bsb/. Everything stays on the phone.
 */
public final class BibleBridge {

    static final String BUILTIN_ID = "KJV";
    /** The second built-in translation; read from assets/www/bible/bsb/. */
    static final String BSB_ID = "BSB";
    static final int REQUEST_ADD_TRANSLATION = 0x5143;
    /** A whole Bible is a few MB of text; anything far bigger is not a translation file. */
    static final long MAX_PACK_BYTES = 64L << 20;

    private static volatile BibleBridge current;
    private static volatile boolean installing;

    private final Context app;
    private final WeakReference<Activity> activity;
    private final WebView web;
    private final MainActivity.AssetBridge assets;

    static final class Translation {
        final String id, name, abbr, lang, license, source;
        final File dir;          // null for the built-in KJV

        Translation(String id, String name, String abbr, String lang, String license, String source, File dir) {
            this.id = id;
            this.name = name;
            this.abbr = abbr;
            this.lang = lang;
            this.license = license == null ? "" : license;
            this.source = source == null ? "" : source;
            this.dir = dir;
        }

        boolean builtIn() {
            return dir == null;
        }
    }

    private BibleBridge(Context context, WebView web, MainActivity.AssetBridge assets) {
        this.app = context.getApplicationContext() != null ? context.getApplicationContext() : context;
        this.activity = new WeakReference<Activity>(context instanceof Activity ? (Activity) context : null);
        this.web = web;
        this.assets = assets;
    }

    /** Called from MainActivity.onCreate in place of registering the old bridge directly. */
    public static Object wrap(Context context, WebView web, Object assetBridge) {
        BibleBridge b = new BibleBridge(context, web, (MainActivity.AssetBridge) assetBridge);
        current = b;
        clearSuperseded(b.app);
        return b;
    }

    /** Called from MainActivity.onActivityResult. */
    public static void onActivityResult(Activity a, int request, int result, Intent data) {
        if (request != REQUEST_ADD_TRANSLATION) return;
        final BibleBridge b = current;
        if (b == null) return;
        final Uri uri = result == Activity.RESULT_OK && data != null ? data.getData() : null;
        if (uri == null) {
            b.report("{\"ok\":false,\"cancelled\":true}");
            return;
        }
        final Context ctx = a.getApplicationContext();
        installing = true;
        new Thread(new Runnable() {
            @Override
            public void run() {
                String json;
                try {
                    InputStream in = ctx.getContentResolver().openInputStream(uri);
                    if (in == null) throw new IOException("The file could not be opened.");
                    Translation t;
                    try {
                        t = install(ctx, in);
                    } finally {
                        in.close();
                    }
                    json = "{\"ok\":true,\"id\":\"" + VoiceBridge.escape(t.id) + "\",\"name\":\"" + VoiceBridge.escape(t.name) + "\"}";
                } catch (Throwable t) {
                    String msg = t.getMessage() == null ? "That file couldn't be added." : t.getMessage();
                    json = "{\"ok\":false,\"error\":\"" + VoiceBridge.escape(msg) + "\"}";
                } finally {
                    installing = false;
                }
                b.report(json);
            }
        }, "qb-bible-install").start();
    }

    // ---- the page's interface ----

    @JavascriptInterface
    public String read(String path) {
        if (path == null) return null;
        String p = path;
        while (p.startsWith("/")) p = p.substring(1);
        if (!p.startsWith("translations/")) return assets.read(path);
        String rest = p.substring("translations/".length());
        int slash = rest.indexOf('/');
        if (slash <= 0) return null;
        String id = rest.substring(0, slash);
        String file = rest.substring(slash + 1);
        if (!file.matches("(books/[A-Z0-9]{3}\\.json|meta\\.json)")) return null;
        if (BSB_ID.equals(id)) return assets.read("bible/bsb/" + file);
        if (!validId(id)) return null;
        File f = new File(new File(biblesDir(app), id), file);
        if (!f.isFile()) return null;
        try {
            return readText(new FileInputStream(f));
        } catch (IOException e) {
            return null;
        }
    }

    /** Translations on this phone as JSON: [{"id","name","abbr","lang","license","source","builtIn"}], the built-in KJV and BSB first. */
    @JavascriptInterface
    public String translations() {
        StringBuilder b = new StringBuilder("[");
        for (Translation t : list(app)) {
            if (b.length() > 1) b.append(',');
            b.append("{\"id\":\"").append(VoiceBridge.json(t.id))
                .append("\",\"name\":\"").append(VoiceBridge.json(t.name))
                .append("\",\"abbr\":\"").append(VoiceBridge.json(t.abbr))
                .append("\",\"lang\":\"").append(VoiceBridge.json(t.lang))
                .append("\",\"license\":\"").append(VoiceBridge.json(t.license))
                .append("\",\"source\":\"").append(VoiceBridge.json(t.source))
                .append("\",\"builtIn\":").append(t.builtIn()).append('}');
        }
        return b.append(']').toString();
    }

    /**
     * The text of one of the licence files the APK carries in assets/licenses, for the
     * credits screen. Only plain names ending in .txt are allowed.
     */
    @JavascriptInterface
    public String licenseText(String name) {
        if (name == null || !name.matches(LICENSE_FILE)) return null;
        try {
            return readText(app.getAssets().open("licenses/" + name));
        } catch (IOException e) {
            return null;
        }
    }

    static final String LICENSE_FILE = "[A-Za-z0-9][A-Za-z0-9._-]{0,63}\\.txt";

    @JavascriptInterface
    public boolean installingTranslation() {
        return installing;
    }

    /** Opens the phone's file picker for a .qbbible file; the page hears back via window.__qbTranslationAdded. */
    @JavascriptInterface
    public boolean addTranslation() {
        final Activity a = activity.get();
        if (a == null) return false;
        a.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Intent pick = new Intent(Intent.ACTION_OPEN_DOCUMENT)
                    .addCategory(Intent.CATEGORY_OPENABLE)
                    .setType("*/*");
                try {
                    a.startActivityForResult(pick, REQUEST_ADD_TRANSLATION);
                } catch (Throwable t) {
                    report("{\"ok\":false,\"error\":\"This phone has no file picker.\"}");
                }
            }
        });
        return true;
    }

    /** Deletes an added translation; the built-in KJV and BSB stay. */
    @JavascriptInterface
    public boolean removeTranslation(String id) {
        Translation t = find(app, id);
        if (t == null || t.builtIn()) return false;
        deleteTree(t.dir);
        return true;
    }

    // ---- storage ----

    static File biblesDir(Context ctx) {
        return new File(ctx.getFilesDir(), "bibles");
    }

    static boolean validId(String id) {
        return id != null && id.matches("[A-Za-z0-9][A-Za-z0-9_-]{0,15}")
            && !id.equalsIgnoreCase(BUILTIN_ID) && !id.equalsIgnoreCase(BSB_ID);
    }

    static Translation builtIn() {
        return new Translation(BUILTIN_ID, "King James Version", "KJV", "en",
            "Public domain, except in the United Kingdom, where the rights are held by the Crown",
            "The Holy Bible, King James Version, 1769 standard text", null);
    }

    static Translation builtInBsb() {
        return new Translation(BSB_ID, "Berean Standard Bible", "BSB", "en",
            "Public domain (dedicated to the public domain by the Berean Bible translation committee)",
            "The Holy Bible, Berean Standard Bible, from bereanbible.com", null);
    }

    /**
     * The KJV and the BSB used to be added from files; now that they are built in, an added
     * copy is never read again, so give its space back.
     */
    static void clearSuperseded(Context ctx) {
        final File kjv = new File(biblesDir(ctx), BUILTIN_ID);
        final File bsb = new File(biblesDir(ctx), BSB_ID);
        if (!kjv.exists() && !bsb.exists()) return;
        new Thread(new Runnable() {
            @Override
            public void run() {
                if (kjv.exists()) deleteTree(kjv);
                if (bsb.exists()) deleteTree(bsb);
            }
        }, "qb-bible-tidy").start();
    }

    static List<Translation> list(Context ctx) {
        List<Translation> out = new ArrayList<Translation>();
        out.add(builtIn());
        out.add(builtInBsb());
        List<Translation> added = new ArrayList<Translation>();
        File[] dirs = biblesDir(ctx).listFiles();
        if (dirs != null) {
            for (File d : dirs) {
                Translation t = readDir(d);
                if (t != null) added.add(t);
            }
        }
        java.util.Collections.sort(added, new java.util.Comparator<Translation>() {
            @Override
            public int compare(Translation a, Translation b) {
                return a.name.compareToIgnoreCase(b.name);
            }
        });
        out.addAll(added);
        return out;
    }

    static Translation find(Context ctx, String id) {
        if (id == null) return null;
        if (BUILTIN_ID.equals(id)) return builtIn();
        if (BSB_ID.equals(id)) return builtInBsb();
        if (!validId(id)) return null;
        return readDir(new File(biblesDir(ctx), id));
    }

    private static Translation readDir(File dir) {
        if (!dir.isDirectory() || dir.getName().startsWith(".")) return null;
        File props = new File(dir, "translation.properties");
        if (!props.isFile() || !new File(dir, "meta.json").isFile()) return null;
        try {
            Properties p = loadProps(new FileInputStream(props));
            String id = p.getProperty("id", "");
            if (!id.equals(dir.getName()) || !validId(id)) return null;
            String lang = p.getProperty("language", "en").trim().toLowerCase(java.util.Locale.ROOT);
            if (!lang.matches("[a-z]{2,3}")) lang = "en";
            return new Translation(id, p.getProperty("name", id), p.getProperty("abbr", id), lang,
                p.getProperty("license", ""), p.getProperty("source", ""), dir);
        } catch (IOException e) {
            return null;
        }
    }

    /**
     * Adds a translation from a .qbbible file: a zip holding translation.properties,
     * meta.json and books/XXX.json. Checked in full before anything is kept.
     */
    static Translation install(Context ctx, InputStream file) throws IOException {
        File root = biblesDir(ctx);
        if (!root.isDirectory() && !root.mkdirs()) throw new IOException("No room to store translations.");
        File tmp = new File(root, ".incoming-" + System.nanoTime());
        deleteTree(tmp);
        if (!new File(tmp, "books").mkdirs()) throw new IOException("No room to store translations.");
        try {
            ZipInputStream zip = new ZipInputStream(file);
            ZipEntry e;
            long total = 0;
            int books = 0;
            byte[] buf = new byte[1 << 16];
            while ((e = zip.getNextEntry()) != null) {
                String n = e.getName();
                boolean book = n.matches("books/[A-Z0-9]{3}\\.json");
                if (!book && !n.equals("translation.properties") && !n.equals("meta.json")) continue;
                OutputStream out = new BufferedOutputStream(new FileOutputStream(new File(tmp, n)));
                try {
                    int r;
                    while ((r = zip.read(buf)) > 0) {
                        total += r;
                        if (total > MAX_PACK_BYTES) throw new IOException("That file is too large to be a Bible translation.");
                        out.write(buf, 0, r);
                    }
                } finally {
                    out.close();
                }
                if (book) books++;
            }
            File props = new File(tmp, "translation.properties");
            if (!props.isFile()) throw new IOException("That file isn't a Quiet Bible translation.");
            if (!new File(tmp, "meta.json").isFile() || books == 0) {
                throw new IOException("That translation file is incomplete. Try downloading it again.");
            }
            Properties p = loadProps(new FileInputStream(props));
            String id = p.getProperty("id", "");
            if (BUILTIN_ID.equalsIgnoreCase(id.trim())) {
                throw new IOException("The " + builtIn().name + " is already built into Quiet Bible.");
            }
            if (BSB_ID.equalsIgnoreCase(id.trim())) {
                throw new IOException("The " + builtInBsb().name + " is already built into Quiet Bible.");
            }
            if (!"1".equals(p.getProperty("format", "")) || !validId(id)) {
                throw new IOException("That file isn't a Quiet Bible translation.");
            }
            // Every book the table of contents names must be here and look like book data.
            String meta = readText(new FileInputStream(new File(tmp, "meta.json")));
            java.util.regex.Matcher m = java.util.regex.Pattern.compile("\"id\"\\s*:\\s*\"([A-Z0-9]{3})\"").matcher(meta);
            int listed = 0;
            while (m.find()) {
                listed++;
                File b = new File(tmp, "books/" + m.group(1) + ".json");
                if (!b.isFile() || b.length() < 10 || !startsWith(b, '[')) {
                    throw new IOException("That translation file is incomplete. Try downloading it again.");
                }
            }
            if (listed == 0) throw new IOException("That file isn't a Quiet Bible translation.");
            File dest = new File(root, id);
            deleteTree(dest);
            if (!tmp.renameTo(dest)) throw new IOException("The translation couldn't be stored.");
            Translation t = readDir(dest);
            if (t == null) throw new IOException("The translation couldn't be stored.");
            return t;
        } catch (java.util.zip.ZipException z) {
            throw new IOException("That file isn't a Quiet Bible translation.");
        } catch (java.io.EOFException cut) {
            throw new IOException("That translation file is incomplete. Try downloading it again.");
        } finally {
            deleteTree(tmp);
        }
    }

    private static boolean startsWith(File f, char c) throws IOException {
        InputStream in = new FileInputStream(f);
        try {
            int b;
            do {
                b = in.read();
            } while (b == ' ' || b == '\n' || b == '\r' || b == '\t' || b == 0xEF || b == 0xBB || b == 0xBF);
            return b == c;
        } finally {
            in.close();
        }
    }

    private static Properties loadProps(InputStream in) throws IOException {
        try {
            Properties p = new Properties();
            p.load(new InputStreamReader(in, "UTF-8"));
            return p;
        } finally {
            in.close();
        }
    }

    private static String readText(InputStream in) throws IOException {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buf = new byte[1 << 16];
            int n;
            while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
            return out.toString("UTF-8");
        } finally {
            in.close();
        }
    }

    void report(String json) {
        final WebView w = web;
        if (w == null) return;
        final String js = "window.__qbTranslationAdded&&window.__qbTranslationAdded(" + json + ")";
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

    private static void deleteTree(File f) {
        if (f == null) return;
        File[] kids = f.listFiles();
        if (kids != null) for (File k : kids) deleteTree(k);
        //noinspection ResultOfMethodCallIgnored
        f.delete();
    }
}
