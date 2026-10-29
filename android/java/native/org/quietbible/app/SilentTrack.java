package org.quietbible.app;

import android.media.AudioAttributes;
import android.media.AudioFormat;
import android.media.AudioTrack;

/**
 * One second of silence, looped, played from Quiet Bible's own process while it
 * reads aloud.
 *
 * The voice itself comes out of the phone's text-to-speech engine, which runs as
 * a separate app. Android decides where a car's or headset's play button goes by
 * looking at which app it sees playing audio, and without this it never sees
 * Quiet Bible - so a Bluetooth device connecting hands "play" to whatever music
 * app played last, that app starts, and Quiet Bible gets pushed aside. With a
 * track of our own running, the button comes here instead.
 *
 * Every call is guarded: if the device refuses the track for any reason, reading
 * carries on exactly as before, just without this help.
 */
final class SilentTrack {

    private static final int RATE = 8000;
    private static AudioTrack track;

    private SilentTrack() {}

    static synchronized void play() {
        try {
            if (track == null) {
                int frames = RATE; // one second
                AudioTrack t = new AudioTrack.Builder()
                    .setAudioAttributes(new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_MEDIA)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                        .build())
                    .setAudioFormat(new AudioFormat.Builder()
                        .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                        .setSampleRate(RATE)
                        .setChannelMask(AudioFormat.CHANNEL_OUT_MONO)
                        .build())
                    .setTransferMode(AudioTrack.MODE_STATIC)
                    .setBufferSizeInBytes(frames * 2)
                    .build();
                t.write(new short[frames], 0, frames);
                t.setLoopPoints(0, frames, -1);
                track = t;
            }
            if (track.getPlayState() != AudioTrack.PLAYSTATE_PLAYING) track.play();
        } catch (Throwable ignored) {
            release();
        }
    }

    static synchronized void pause() {
        try {
            if (track != null && track.getPlayState() == AudioTrack.PLAYSTATE_PLAYING) track.pause();
        } catch (Throwable ignored) {
        }
    }

    static synchronized void release() {
        AudioTrack t = track;
        track = null;
        if (t == null) return;
        try { t.stop(); } catch (Throwable ignored) { }
        try { t.release(); } catch (Throwable ignored) { }
    }
}
