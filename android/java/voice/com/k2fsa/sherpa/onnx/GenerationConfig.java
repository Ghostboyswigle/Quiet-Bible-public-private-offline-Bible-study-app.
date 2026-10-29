package com.k2fsa.sherpa.onnx;

import java.util.Map;

/** Field names and types must match GetGenerationConfig in sherpa-onnx/jni/offline-tts.cc (v1.13.8). */
public final class GenerationConfig {
    public float silenceScale = 0.2f;
    public float speed = 1.0f;
    public int sid = 0;
    public float[] referenceAudio = null;
    public int referenceSampleRate = 0;
    public String referenceText = "";
    /** Flow-matching steps (Supertonic). More steps: cleaner, slower. */
    public int numSteps = 5;
    /** Model-specific settings, e.g. "lang" for Supertonic and Kokoro. */
    public Map<String, String> extra = null;
}
