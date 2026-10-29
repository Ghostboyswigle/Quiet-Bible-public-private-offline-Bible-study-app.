package com.k2fsa.sherpa.onnx;

/** Field names and types must match sherpa-onnx/jni/offline-tts.cc (v1.13.8). */
public final class OfflineTtsKokoroModelConfig {
    public String model = "";
    public String voices = "";
    public String tokens = "";
    public String lexicon = "";
    public String lang = "";
    public String dataDir = "";
    public float lengthScale = 1.0f;
}
