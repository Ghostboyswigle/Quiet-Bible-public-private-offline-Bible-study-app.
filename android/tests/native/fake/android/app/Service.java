package android.app;
public abstract class Service extends android.content.Context {
    public static final int START_STICKY = 1, START_NOT_STICKY = 2, STOP_FOREGROUND_REMOVE = 1;
    public boolean foreground, stopped;
    public void onCreate() {}
    public int onStartCommand(android.content.Intent i, int f, int id) { return START_STICKY; }
    public void onDestroy() {}
    public abstract android.os.IBinder onBind(android.content.Intent i);
    public final void startForeground(int id, Notification n) { foreground = true; }
    public final void stopForeground(int flags) { foreground = false; }
    public final void stopSelf() { stopped = true; }
}
