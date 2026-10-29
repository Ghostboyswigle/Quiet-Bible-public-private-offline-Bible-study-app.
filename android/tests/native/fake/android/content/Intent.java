package android.content;
import java.util.*;
public class Intent {
    public static final int FLAG_ACTIVITY_SINGLE_TOP = 0x20000000;
    public final Class<?> cls; String action; final Map<String,Object> extras = new HashMap<>();
    public Intent(Context c, Class<?> cls) { this.cls = cls; }
    public Intent setAction(String a) { action = a; return this; }
    public Intent addFlags(int f) { return this; }
    public Intent putExtra(String k, boolean v) { extras.put(k, v); return this; }
    public Intent putExtra(String k, String v) { extras.put(k, v); return this; }
    public String getAction() { return action; }
    public boolean getBooleanExtra(String k, boolean d) { Object o = extras.get(k); return o == null ? d : (Boolean) o; }
    public String getStringExtra(String k) { return (String) extras.get(k); }
}
