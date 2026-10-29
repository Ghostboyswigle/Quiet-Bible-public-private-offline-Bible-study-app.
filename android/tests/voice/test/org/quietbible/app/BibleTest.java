package org.quietbible.app;

import android.app.Activity;
import android.content.*;
import android.content.res.AssetManager;
import android.net.Uri;
import android.webkit.WebView;
import java.io.*;
import java.util.*;
import java.util.zip.*;

/** BibleBridge as shipped, on a JVM: the KJV and the BSB from the APK, other translations added from .qbbible files through the picker path. */
public class BibleTest {
    static int pass = 0, total = 0;
    static void check(String name, boolean ok, Object detail) {
        total++; if (ok) pass++;
        String d = detail == null ? "" : String.valueOf(detail); if (d.length() > 220) d = d.substring(0, 220) + "…";
        System.out.println("  [" + (ok ? "PASS" : "FAIL") + "] " + name + (detail == null ? "" : "  -> " + d));
    }
    static WebView web;
    static String waitJs(long ms) throws InterruptedException {
        long t0 = System.currentTimeMillis();
        while (System.currentTimeMillis() - t0 < ms) {
            synchronized (web.js) { for (String s : web.js) if (s.startsWith("window.__qbTranslationAdded")) { web.js.remove(s); return s; } }
            Thread.sleep(20);
        }
        return null;
    }
    static String pick(Activity act, String path) throws InterruptedException {
        Intent r = new Intent("result"); r.data = new Uri(path);
        BibleBridge.onActivityResult(act, BibleBridge.REQUEST_ADD_TRANSLATION, Activity.RESULT_OK, r);
        return waitJs(30000);
    }
    static File zip(File dir, String name, String[][] entries) throws IOException {
        File f = new File(dir, name);
        try (ZipOutputStream z = new ZipOutputStream(new FileOutputStream(f))) {
            for (String[] e : entries) { z.putNextEntry(new ZipEntry(e[0])); z.write(e[1].getBytes("UTF-8")); }
        }
        return f;
    }
    static void write(File f, String text) throws IOException {
        f.getParentFile().mkdirs(); java.nio.file.Files.write(f.toPath(), text.getBytes("UTF-8"));
    }
    public static void main(String[] a) throws Exception {
        final String apk = a[0]; final File files = new File(a[1]); files.mkdirs(); final String kjv = a[2], rvPack = a[3];
        final AssetManager assets = new AssetManager(apk);
        final Context ctx = new Context() {
            public Context getApplicationContext() { return this; }
            public SharedPreferences getSharedPreferences(String n, int m) { return null; }
            public File getFilesDir() { return files; }
            public AssetManager getAssets() { return assets; }
        };
        // A phone updating from 0.8/0.9, where the KJV had been added from its file.
        File oldKjv = new File(files, "bibles/KJV");
        write(new File(oldKjv, "translation.properties"), "format=1\nid=KJV\nname=King James Version\nabbr=KJV\nlanguage=en\n");
        write(new File(oldKjv, "meta.json"), "{\"meta\":[{\"id\":\"GEN\"}]}");
        write(new File(oldKjv, "books/GEN.json"), "[{\"n\":1,\"v\":[{\"n\":1,\"t\":\"old copy\"}]}]");
        // A phone that once had the BSB added from a file.
        File oldBsb = new File(files, "bibles/BSB");
        write(new File(oldBsb, "translation.properties"), "format=1\nid=BSB\nname=Berean Standard Bible\nabbr=BSB\nlanguage=en\n");
        write(new File(oldBsb, "meta.json"), "{\"meta\":[{\"id\":\"GEN\"}]}");
        write(new File(oldBsb, "books/GEN.json"), "[{\"n\":1,\"v\":[{\"n\":1,\"t\":\"old copy\"}]}]");
        MainActivity act = new MainActivity(); act.ctx = ctx;
        web = new WebView();
        BibleBridge bb = (BibleBridge) BibleBridge.wrap(act, web, act.new AssetBridge());

        System.out.println("Built in");
        String gen0 = bb.read("bible/books/GEN.json"), jhn0 = bb.read("bible/books/JHN.json"), meta0 = bb.read("/bible/meta.json");
        check("the King James Version comes from the APK", gen0 != null && gen0.contains("In the beginning God created the heaven and the earth.")
              && jhn0.contains("only begotten Son") && meta0.contains("\"GEN\"") && meta0.contains("\"REV\""), null);
        int v0 = 0; java.util.regex.Matcher m0 = java.util.regex.Pattern.compile("\"verses\":(\\d+)").matcher(meta0); while (m0.find()) v0 += Integer.parseInt(m0.group(1));
        check("all 66 books, 31,102 verses", meta0.split("\"id\"").length - 1 == 66 && v0 == 31102, v0);
        check("the KJV is the main text (no BSB wording in it)", !jhn0.contains("one and only Son") && !meta0.contains("\"verses\":1068"), null);
        check("the KJV, then the BSB, both built in", bb.translations().startsWith("[{\"id\":\"KJV\",\"name\":\"King James Version\",\"abbr\":\"KJV\",\"lang\":\"en\",")
              && bb.translations().contains("\"builtIn\":true},{\"id\":\"BSB\",\"name\":\"Berean Standard Bible\",\"abbr\":\"BSB\",\"lang\":\"en\",")
              && bb.translations().endsWith("\"builtIn\":true}]") && bb.translations().split("\"id\"").length - 1 == 2, bb.translations());
        String bjhn = bb.read("translations/BSB/books/JHN.json"), bmeta = bb.read("translations/BSB/meta.json"), bpsa = bb.read("/translations/BSB/books/PSA.json");
        check("the BSB comes from the APK", bjhn != null && bjhn.contains("For God so loved the world that He gave His one and only Son")
              && bmeta != null && bmeta.contains("\"REV\"") && bmeta.split("\"id\"").length - 1 == 66 && bpsa.contains("\"d\":\"A Psalm of David, when he fled from his son Absalom.\""), null);
        int bv = 0; java.util.regex.Matcher bm = java.util.regex.Pattern.compile("\"verses\":(\\d+)").matcher(bmeta); while (bm.find()) bv += Integer.parseInt(bm.group(1));
        check("all of the BSB: 31,086 verses (the 16 it leaves out are left out)", bv == 31086 && !bjhn.contains("\"n\":4,\"t\":\"\""), bv);
        check("the BSB's credit is in the list", bb.translations().contains("\"license\":\"Public domain (dedicated to the public domain"), bb.translations());
        check("nothing but books and the contents served from the BSB", bb.read("translations/BSB/../meta.json") == null && bb.read("translations/BSB/books/../../bsb.txt") == null
              && bb.read("translations/BSB/books/JHN.txt") == null && bb.read("translations/BSB/translation.properties") == null, null);
        check("the KJV's credit is in the list", bb.translations().contains("\"license\":\"Public domain, except in the United Kingdom")
              && bb.translations().contains("\"source\":\"The Holy Bible, King James Version, 1769"), bb.translations());
        String gpl = bb.licenseText("espeak-ng-GPL-3.0.txt"), notices = bb.licenseText("THIRD-PARTY-NOTICES.txt");
        check("licence texts are readable for the credits screen", gpl != null && gpl.contains("GNU GENERAL PUBLIC LICENSE") && gpl.contains("Version 3")
              && notices != null && notices.contains("sherpa-onnx") && bb.licenseText("sherpa-onnx-Apache-2.0.txt").contains("Apache License"), null);
        check("only licence files can be read that way", bb.licenseText("../AndroidManifest.xml") == null && bb.licenseText("www/app.js") == null
              && bb.licenseText("missing.txt") == null && bb.licenseText(null) == null && bb.licenseText(".hidden.txt") == null, null);
        for (int i = 0; i < 100 && (oldKjv.exists() || oldBsb.exists()); i++) Thread.sleep(50);
        check("the KJV once added from a file is cleared away (it would never be read again)", !oldKjv.exists(), null);
        check("so is a BSB once added from a file", !oldBsb.exists() && !bjhn.contains("old copy"), null);
        check("nothing served for a translation that isn't there", bb.read("translations/RV1909/meta.json") == null && bb.read("translations/KJV/meta.json") == null, null);

        System.out.println("Adding translations");
        check("\"Add a translation\" opens the file picker", bb.addTranslation() && act.lastRequest == BibleBridge.REQUEST_ADD_TRANSLATION, act.lastRequest);
        String r = pick(act, kjv);
        check("picking the old KJV file just says it's already built in", r != null && r.contains("\"ok\":false") && r.contains("King James Version is already built into Quiet Bible")
              && bb.translations().split("\"id\"").length - 1 == 2 && !new File(files, "bibles/KJV").exists(), r);
        String rv = pick(act, rvPack);
        check("Reina-Valera 1909 added, marked Spanish, listed after the KJV and the BSB", rv != null && rv.contains("\"ok\":true")
              && bb.translations().startsWith("[{\"id\":\"KJV\",") && bb.translations().contains("\"builtIn\":true},{\"id\":\"RV1909\",\"name\":\"Reina-Valera 1909\",\"abbr\":\"RV1909\",\"lang\":\"es\",\"license\":\"Public domain\",\"source\":\"Reina-Valera 1909")
              && bb.translations().indexOf("\"id\":\"BSB\"") < bb.translations().indexOf("\"id\":\"RV1909\"")
              && bb.translations().split("\"id\"").length - 1 == 3, bb.translations());
        String gen = bb.read("translations/RV1909/books/GEN.json"), rmeta = bb.read("translations/RV1909/meta.json");
        check("its text and Spanish book names are served", gen != null && gen.contains("En el principio crió Dios") && rmeta.contains("\"name\":\"Génesis\"") && rmeta.contains("\"name\":\"Apocalipsis\""), null);
        int verses = 0; java.util.regex.Matcher m = java.util.regex.Pattern.compile("\"verses\":(\\d+)").matcher(rmeta); while (m.find()) verses += Integer.parseInt(m.group(1));
        check("all 66 books of it", rmeta.split("\"id\"").length - 1 == 66 && verses > 31000, verses);
        check("paths outside the translation are refused", bb.read("translations/RV1909/../../shared_prefs/x.xml") == null
              && bb.read("translations/RV1909/translation.properties") == null && bb.read("translations/../voice/tokens.txt") == null, null);
        if (a.length > 5) {
            String cuv = pick(act, a[4]), cuvs = pick(act, a[5]);
            check("both Chinese Union Version scripts added and marked Chinese", cuv != null && cuv.contains("\"ok\":true") && cuvs != null && cuvs.contains("\"ok\":true")
                  && bb.translations().contains("\"id\":\"CUV\",\"name\":\"Chinese Union Version (Traditional)\",\"abbr\":\"CUV\",\"lang\":\"zh\"")
                  && bb.translations().contains("\"id\":\"CUVS\",\"name\":\"Chinese Union Version (Simplified)\",\"abbr\":\"CUVS\",\"lang\":\"zh\""), bb.translations());
            String zt = bb.read("translations/CUV/books/JHN.json"), zs = bb.read("translations/CUVS/books/JHN.json"), zm = bb.read("translations/CUVS/meta.json");
            check("Chinese text served intact in each script, with Chinese book names", zt != null && zt.contains("神愛世人") && zs != null && zs.contains("神爱世人")
                  && zm.contains("\"name\":\"创世记\"") && zm.contains("\"abbr\":\"约一\""), null);
            bb.removeTranslation("CUV"); bb.removeTranslation("CUVS");
            check("...and removed again", !bb.translations().contains("CUV"), bb.translations());
        }
        if (a.length > 6) {
            String adb = pick(act, a[6]);
            check("Ang Dating Biblia added and marked Tagalog", adb != null && adb.contains("\"ok\":true")
                  && bb.translations().contains("{\"id\":\"ADB\",\"name\":\"Ang Dating Biblia (1905)\",\"abbr\":\"ADB\",\"lang\":\"tl\",\"license\":\"Public domain\",")
                  && bb.translations().contains("\"builtIn\":false}"), bb.translations());
            String tj = bb.read("translations/ADB/books/JHN.json"), tm = bb.read("translations/ADB/meta.json");
            check("Tagalog text and book names served", tj != null && tj.contains("bugtong na Anak") && tm.contains("\"name\":\"Mga Taga-Roma\"") && tm.contains("\"name\":\"Apocalipsis\""), null);
            bb.removeTranslation("ADB");
        }
        for (int i = 7; i < a.length; i++) {
            String res = pick(act, a[i]);
            java.util.regex.Matcher id = java.util.regex.Pattern.compile("\"id\":\"([A-Za-z0-9_-]+)\"").matcher(res == null ? "" : res);
            boolean ok = res != null && res.contains("\"ok\":true") && id.find();
            String tid = ok ? id.group(1) : "?";
            String g = ok ? bb.read("translations/" + tid + "/books/GEN.json") : null, mt = ok ? bb.read("translations/" + tid + "/meta.json") : null;
            check("extra translation " + new File(a[i]).getName() + " installs and serves 66 books", ok && g != null && g.length() > 1000 && mt.split("\"id\"").length - 1 == 66, res);
            if (ok) bb.removeTranslation(tid);
        }
        check("the built-in KJV is untouched", bb.read("bible/books/JHN.json").contains("only begotten Son"), null);

        System.out.println("Files that aren't translations");
        File tmp = new File(files, "t"); tmp.mkdirs();
        r = pick(act, zip(tmp, "photos.zip", new String[][] {{"a.jpg", "x"}}).getPath());
        check("a random zip is refused", r != null && r.contains("isn\\'t a Quiet Bible translation"), r);
        r = pick(act, zip(tmp, "fake.qbbible", new String[][] {{"translation.properties", "format=1\nid=kjv\nname=Fake\n"}, {"meta.json", "{\"meta\":[{\"id\":\"GEN\"}]}"}, {"books/GEN.json", "[{\"n\":1,\"v\":[]}]"}}).getPath());
        check("can't replace the built-in KJV", r != null && r.contains("\"ok\":false") && bb.read("bible/books/GEN.json").contains("the heaven and the earth"), r);
        r = pick(act, zip(tmp, "bsb.qbbible", new String[][] {{"translation.properties", "format=1\nid=BSB\nname=Fake\n"}, {"meta.json", "{\"meta\":[{\"id\":\"GEN\"}]}"}, {"books/GEN.json", "[{\"n\":1,\"v\":[]}]"}}).getPath());
        check("...or the built-in BSB", r != null && r.contains("\"ok\":false") && r.contains("Berean Standard Bible is already built into Quiet Bible")
              && !new File(files, "bibles/BSB").exists() && bb.read("translations/BSB/books/GEN.json").contains("In the beginning God created the heavens and the earth."), r);
        r = pick(act, zip(tmp, "short.qbbible", new String[][] {{"translation.properties", "format=1\nid=ASV\nname=American Standard Version\n"}, {"meta.json", "{\"meta\":[{\"id\":\"GEN\"},{\"id\":\"EXO\"}]}"}, {"books/GEN.json", "[{\"n\":1,\"v\":[]}]"}}).getPath());
        check("a translation missing books is refused, nothing half-added", r != null && r.contains("incomplete") && !bb.translations().contains("ASV"), r);
        r = pick(act, zip(tmp, "evil.qbbible", new String[][] {{"translation.properties", "format=1\nid=EVIL\nname=Evil\n"}, {"meta.json", "{\"meta\":[{\"id\":\"GEN\"}]}"}, {"books/GEN.json", "[{\"n\":1,\"v\":[]}]"}, {"../../escape.txt", "gotcha"}}).getPath());
        check("names that try to escape the folder are ignored", !new File(files, "escape.txt").exists() && !new File(files.getParentFile(), "escape.txt").exists(), r);
        bb.removeTranslation("EVIL");
        byte[] whole = java.nio.file.Files.readAllBytes(new File(rvPack).toPath());
        File cut = new File(tmp, "cut.qbbible"); java.nio.file.Files.write(cut.toPath(), Arrays.copyOf(whole, whole.length / 3));
        bb.removeTranslation("RV1909");
        r = pick(act, cut.getPath());
        check("a half-downloaded file is refused", r != null && r.contains("\"ok\":false") && !bb.translations().contains("RV1909"), r);

        System.out.println("Removing");
        pick(act, rvPack);
        check("remove the Reina-Valera", bb.removeTranslation("RV1909") && !bb.translations().contains("RV1909") && bb.read("translations/RV1909/meta.json") == null, bb.translations());
        check("the built-in KJV can't be removed", !bb.removeTranslation("KJV") && bb.translations().contains("\"id\":\"KJV\""), null);
        check("nor the built-in BSB", !bb.removeTranslation("BSB") && bb.translations().contains("\"id\":\"BSB\"") && bb.read("translations/BSB/meta.json") != null, null);
        String[] left = new File(files, "bibles").list();
        check("no leftovers in storage", left != null && left.length == 0, Arrays.toString(left));

        System.out.println();
        System.out.println((pass == total ? "RESULT: " : "RESULT (FAILURES): ") + pass + "/" + total + " passed");
        System.exit(pass == total ? 0 : 1);
    }
}
