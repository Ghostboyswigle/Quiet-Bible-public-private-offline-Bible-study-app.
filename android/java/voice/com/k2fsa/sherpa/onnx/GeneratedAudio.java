package com.k2fsa.sherpa.onnx;

/** Field names and types must match sherpa-onnx/jni/offline-tts.cc (v1.13.8). */
public final class GeneratedAudio {
    public final float[] samples;
    public final int sampleRate;

    /** Called from native code: GeneratedAudio(float[] samples, int sampleRate). */
    public GeneratedAudio(float[] samples, int sampleRate) {
        this.samples = samples;
        this.sampleRate = sampleRate;
    }
}
