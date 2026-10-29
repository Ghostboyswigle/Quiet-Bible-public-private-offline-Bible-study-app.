package android.content;
public class ContentResolver {
    public java.io.InputStream openInputStream(android.net.Uri uri) throws java.io.IOException { return new java.io.FileInputStream(uri.path); }
}
