package android.content;
public class Intent {
    public static final String ACTION_OPEN_DOCUMENT = "android.intent.action.OPEN_DOCUMENT", CATEGORY_OPENABLE = "android.intent.category.OPENABLE";
    public static final String EXTRA_ALLOW_MULTIPLE = "android.intent.extra.ALLOW_MULTIPLE";
    public final String action; public String type; public android.net.Uri data; public ClipData clip;
    public final java.util.Map<String, Object> extras = new java.util.HashMap<>();
    public Intent(String action) { this.action = action; }
    public Intent addCategory(String c) { return this; }
    public Intent setType(String t) { type = t; return this; }
    public Intent putExtra(String k, boolean v) { extras.put(k, v); return this; }
    public android.net.Uri getData() { return data; }
    public ClipData getClipData() { return clip; }
}
