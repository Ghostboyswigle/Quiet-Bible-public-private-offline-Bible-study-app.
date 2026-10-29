package android.media;
import java.util.*;
/** Fake: records focus requests; the test plays the role of Android. */
public class AudioManager {
    public static final int AUDIOFOCUS_GAIN = 1, AUDIOFOCUS_LOSS = -1, AUDIOFOCUS_REQUEST_GRANTED = 1, AUDIOFOCUS_REQUEST_FAILED = 0, GET_DEVICES_OUTPUTS = 2;
    public interface OnAudioFocusChangeListener { void onAudioFocusChange(int change); }
    public boolean grant = true; public int requests = 0, abandons = 0;
    public AudioFocusRequest holder;                 // who Android thinks holds focus for us
    public final List<AudioDeviceInfo> outputs = new ArrayList<>();
    public AudioDeviceCallback callback;
    public int requestAudioFocus(AudioFocusRequest r) { requests++; if (!grant) return AUDIOFOCUS_REQUEST_FAILED; holder = r; return AUDIOFOCUS_REQUEST_GRANTED; }
    public int abandonAudioFocusRequest(AudioFocusRequest r) { abandons++; if (holder == r) holder = null; return 1; }
    public AudioDeviceInfo[] getDevices(int flags) { return outputs.toArray(new AudioDeviceInfo[0]); }
    public void registerAudioDeviceCallback(AudioDeviceCallback cb, android.os.Handler h) {
        callback = cb;
        // real Android reports every current device right after registering
        final AudioDeviceInfo[] now = getDevices(GET_DEVICES_OUTPUTS);
        h.postDelayed(() -> cb.onAudioDevicesAdded(now), 0);
    }
    public void unregisterAudioDeviceCallback(AudioDeviceCallback cb) { if (callback == cb) callback = null; }
    /** Android tells the current focus holder something changed */
    public void focus(int change) { if (holder != null) holder.listener.onAudioFocusChange(change); if (change == -1) {} }
    public void connect(AudioDeviceInfo d) { outputs.add(d); if (callback != null) callback.onAudioDevicesAdded(new AudioDeviceInfo[]{d}); }
}
