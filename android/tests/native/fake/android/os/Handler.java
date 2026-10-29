package android.os;
import java.util.*;
/** Fake main-thread queue driven by the test clock. */
public class Handler {
    static final class Task { final Runnable r; final long at; Task(Runnable r, long at) { this.r = r; this.at = at; } }
    public static final List<Task> queue = new ArrayList<>();
    public Handler(Looper l) {}
    public boolean postDelayed(Runnable r, long ms) { queue.add(new Task(r, SystemClock.now + ms)); return true; }
    public void removeCallbacks(Runnable r) { queue.removeIf(t -> t.r == r); }
    public static int pending() { return queue.size(); }
    /** advance the clock, running anything that falls due */
    public static void advance(long ms) {
        long end = SystemClock.now + ms;
        while (true) {
            Task next = null;
            for (Task t : queue) if (t.at <= end && (next == null || t.at < next.at)) next = t;
            if (next == null) break;
            queue.remove(next); SystemClock.now = Math.max(SystemClock.now, next.at); next.r.run();
        }
        SystemClock.now = end;
    }
}
