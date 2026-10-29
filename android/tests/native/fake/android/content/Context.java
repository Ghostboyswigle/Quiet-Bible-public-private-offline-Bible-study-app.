package android.content;
public abstract class Context {
    public static final String AUDIO_SERVICE = "audio";
    public static final String NOTIFICATION_SERVICE = "notification";
    public static java.util.Map<String,Object> services = new java.util.HashMap<>();
    public static java.util.List<Intent> started = new java.util.ArrayList<>();
    public Object getSystemService(String name) { return services.get(name); }
    public ComponentName startForegroundService(Intent i) { started.add(i); return null; }
    public ComponentName startService(Intent i) { started.add(i); return null; }
}
