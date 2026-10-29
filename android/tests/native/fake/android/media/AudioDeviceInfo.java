package android.media;
public class AudioDeviceInfo {
    final int id, type; final boolean sink;
    public AudioDeviceInfo(int id, int type, boolean sink) { this.id = id; this.type = type; this.sink = sink; }
    public int getId() { return id; }
    public int getType() { return type; }
    public boolean isSink() { return sink; }
}
