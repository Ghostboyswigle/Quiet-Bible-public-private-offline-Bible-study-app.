package android.app;
import android.content.*;
/** Test activity: runs "UI thread" work inline and records file-picker requests. */
public class Activity extends Context {
    public static final int RESULT_OK = -1, RESULT_CANCELED = 0;
    public Context ctx; public Intent lastStarted; public int lastRequest;
    public Context getApplicationContext() { return ctx; }
    public SharedPreferences getSharedPreferences(String n, int m) { return ctx.getSharedPreferences(n, m); }
    public java.io.File getFilesDir() { return ctx.getFilesDir(); }
    public android.content.res.AssetManager getAssets() { return ctx.getAssets(); }
    public void runOnUiThread(Runnable r) { r.run(); }
    public void startActivityForResult(Intent i, int req) { lastStarted = i; lastRequest = req; }
}
