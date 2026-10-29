package android.media;
public abstract class AudioDeviceCallback {
    public void onAudioDevicesAdded(AudioDeviceInfo[] a) {}
    public void onAudioDevicesRemoved(AudioDeviceInfo[] r) {}
}
