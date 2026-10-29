package android.content;
public abstract class Context {
    public static final int MODE_PRIVATE = 0;
    public abstract Context getApplicationContext();
    public abstract SharedPreferences getSharedPreferences(String name, int mode);
    public abstract java.io.File getFilesDir();
    public abstract android.content.res.AssetManager getAssets();
    public ContentResolver getContentResolver() { return new ContentResolver(); }
}
