package android.app;
public class NotificationManager {
    public static final int IMPORTANCE_LOW = 2;
    public Notification last;
    public void createNotificationChannel(NotificationChannel c) {}
    public void notify(int id, Notification n) { last = n; }
}
