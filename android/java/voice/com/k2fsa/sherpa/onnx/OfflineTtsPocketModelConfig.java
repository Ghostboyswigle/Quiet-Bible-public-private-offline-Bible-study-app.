package com.k2fsa.sherpa.onnx;

/** Field names and types must match sherpa-onnx/jni/offline-tts.cc (v1.13.8). */
public final class OfflineTtsPocketModelConfig {
    public String lmFlow = "";
    public String lmMain = "";
    public String encoder = "";
    public String decoder = "";
    public String textConditioner = "";
    public String vocabJson = "";
    public String tokenScoresJson = "";
    public int voiceEmbeddingCacheCapacity = 50;
}
