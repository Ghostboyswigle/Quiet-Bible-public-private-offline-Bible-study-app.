package org.quietbible.app;

import android.media.AudioAttributes;
import android.media.AudioFormat;
import android.media.AudioTrack;

/**
 * Plays the offline voice from Quiet Bible's own process. Because the audio now
 * comes from this app (not the phone's separate text-to-speech engine), Android,
 * car stereos and headphones see Quiet Bible as the app that is playing.
 *
 * All AudioTrack calls happen on the one playback thread.
 */
final class AudioTrackSink implements VoiceCore.Sink {

    /** Pause after each verse, like a reader drawing breath. */
    static final int GAP_MS = 220;
    private static final int CHUNK = 2048;

    private AudioTrack track;
    private int trackRate;

    @Override
    public boolean play(float[] pcm, int sampleRate, VoiceCore.Ticket ticket) {
        AudioTrack t;
        try {
            t = trackFor(sampleRate);
        } catch (Throwable e) {
            return true; // no audio output; don't stall the reading
        }
        t.pause();
        t.flush();                      // head position back to 0
        t.play();

        int gap = sampleRate * GAP_MS / 1000;
        int total = pcm.length + gap;
        int off = 0;
        while (off < pcm.length) {
            if (!ticket.live()) return halt(t);
            int n = Math.min(CHUNK, pcm.length - off);
            int w = t.write(pcm, off, n, AudioTrack.WRITE_BLOCKING);
            if (w < 0) return halt(t);
            off += w;
        }
        float[] silence = new float[Math.min(CHUNK, Math.max(1, gap))];
        int left = gap;
        while (left > 0) {
            if (!ticket.live()) return halt(t);
            int n = Math.min(silence.length, left);
            int w = t.write(silence, 0, n, AudioTrack.WRITE_BLOCKING);
            if (w < 0) return halt(t);
            left -= w;
        }

        // Wait until the last sample has actually been heard.
        long deadline = System.nanoTime() + (long) (total * 1e9 / sampleRate) + 3_000_000_000L;
        while (t.getPlaybackHeadPosition() < total) {
            if (!ticket.live()) return halt(t);
            if (System.nanoTime() > deadline) break;
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                return halt(t);
            }
        }
        // Paused between verses: an idle track left "playing" makes Android treat
        // Quiet Bible as the app playing, which confuses other apps' controls.
        try {
            t.pause();
        } catch (Throwable ignored) {
        }
        return ticket.live();
    }

    @Override
    public void idle() {
        if (track != null) halt(track);
    }

    private boolean halt(AudioTrack t) {
        try {
            t.pause();
            t.flush();
        } catch (Throwable ignored) {
        }
        return false;
    }

    private AudioTrack trackFor(int sampleRate) {
        if (track != null && trackRate == sampleRate) return track;
        if (track != null) {
            try {
                track.release();
            } catch (Throwable ignored) {
            }
            track = null;
        }
        int min = AudioTrack.getMinBufferSize(sampleRate, AudioFormat.CHANNEL_OUT_MONO, AudioFormat.ENCODING_PCM_FLOAT);
        int size = Math.max(min, sampleRate / 4 * 4); // at least 0.25 s of float samples
        track = new AudioTrack.Builder()
            .setAudioAttributes(new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_MEDIA)
                .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                .build())
            .setAudioFormat(new AudioFormat.Builder()
                .setEncoding(AudioFormat.ENCODING_PCM_FLOAT)
                .setSampleRate(sampleRate)
                .setChannelMask(AudioFormat.CHANNEL_OUT_MONO)
                .build())
            .setTransferMode(AudioTrack.MODE_STREAM)
            .setBufferSizeInBytes(size)
            .build();
        trackRate = sampleRate;
        return track;
    }
}
