package com.k2fsa.sherpa.onnx;

/** Field names and types must match sherpa-onnx/jni/offline-tts.cc (v1.13.8). */
public final class OfflineTts {
    private long ptr;

    /**
     * @param assetManager an android.content.res.AssetManager to read the model and
     *     tokens from the APK's assets, or null to read them from files
     */
    public OfflineTts(Object assetManager, OfflineTtsConfig config) {
        ptr = assetManager != null ? newFromAsset(assetManager, config) : newFromFile(config);
        if (ptr == 0) throw new IllegalStateException("sherpa-onnx could not create the voice");
    }

    public int getSampleRate() {
        return getSampleRate(ptr);
    }

    public GeneratedAudio generate(String text, int sid, float speed) {
        if (ptr == 0) throw new IllegalStateException("released");
        return generateImpl(ptr, text, sid, speed);
    }

    /** For models that take more than speaker and speed (Supertonic needs a language). */
    public GeneratedAudio generate(String text, GenerationConfig config) {
        if (ptr == 0) throw new IllegalStateException("released");
        return generateWithConfigImpl(ptr, text, config, null);
    }

    public int getNumSpeakers() {
        return getNumSpeakers(ptr);
    }

    public void release() {
        if (ptr != 0) {
            delete(ptr);
            ptr = 0;
        }
    }

    private native long newFromAsset(Object assetManager, OfflineTtsConfig config);

    private native long newFromFile(OfflineTtsConfig config);

    private native void delete(long ptr);

    private native int getSampleRate(long ptr);

    private native int getNumSpeakers(long ptr);

    private native GeneratedAudio generateImpl(long ptr, String text, int sid, float speed);

    private native GeneratedAudio generateWithConfigImpl(long ptr, String text, GenerationConfig config, Object callback);
}
