package android.content.res;
import java.io.*; import java.util.*; import java.util.zip.*;
/** Serves assets straight out of an APK file, with Android's list() semantics. */
public class AssetManager {
    final ZipFile zip;
    public AssetManager(String apk) throws IOException { zip = new ZipFile(apk); }
    public String[] list(String path) throws IOException {
        String p = "assets/" + path + "/"; TreeSet<String> kids = new TreeSet<>();
        for (Enumeration<? extends ZipEntry> e = zip.entries(); e.hasMoreElements();) {
            String n = e.nextElement().getName();
            if (n.startsWith(p)) { String rest = n.substring(p.length()); int s = rest.indexOf('/'); kids.add(s < 0 ? rest : rest.substring(0, s)); }
        }
        return kids.toArray(new String[0]);
    }
    public InputStream open(String path) throws IOException {
        ZipEntry z = zip.getEntry("assets/" + path); if (z == null) throw new FileNotFoundException(path); return zip.getInputStream(z);
    }
}
