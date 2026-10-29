package android.webkit;
import java.util.*;
public class WebView {
    public final List<String> js = Collections.synchronizedList(new ArrayList<String>());
    public boolean post(Runnable r) { r.run(); return true; }
    public void evaluateJavascript(String s, ValueCallback<String> cb) { js.add(s); }
}
