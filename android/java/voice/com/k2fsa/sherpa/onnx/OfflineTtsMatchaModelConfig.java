package com.k2fsa.sherpa.onnx;

/** Field names and types must match sherpa-onnx/jni/offline-tts.cc (v1.13.8). */
public final class OfflineTtsMatchaModelConfig {
    public String acousticModel = "";
    public String vocoder = "";
    public String lexicon = "";
    public String tokens = "";
    public String dataDir = "";
    public float noiseScale = 1.0f;
    public float lengthScale = 1.0f;
}
