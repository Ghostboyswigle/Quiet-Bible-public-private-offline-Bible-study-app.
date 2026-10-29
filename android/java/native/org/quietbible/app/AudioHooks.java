package org.quietbible.app;

/**
 * Lets the playback service silence the built-in voice directly, without waiting
 * for the page. Plain Java; set by VoiceBridge.
 */
final class AudioHooks {
    private AudioHooks() {}

    /** Stops whatever the built-in voice is saying right now. */
    static volatile Runnable silenceSpeech;

    static void silence() {
        Runnable r = silenceSpeech;
        if (r != null) {
            try {
                r.run();
            } catch (Throwable ignored) {
            }
        }
    }
}
