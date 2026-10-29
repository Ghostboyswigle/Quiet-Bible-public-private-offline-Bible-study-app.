package com.k2fsa.sherpa.onnx;

/** Field names and types must match sherpa-onnx/jni/offline-tts.cc (v1.13.8). */
public final class OfflineTtsVitsModelConfig {
    public String model = "";
    public String lexicon = "";
    public String tokens = "";
    public String dataDir = "";
    public float noiseScale = 0.667f;
    public float noiseScaleW = 0.8f;
    public float lengthScale = 1.0f;
}
