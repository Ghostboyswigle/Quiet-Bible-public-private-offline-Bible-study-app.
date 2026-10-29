package com.k2fsa.sherpa.onnx;

/** Field names and types must match sherpa-onnx/jni/offline-tts.cc (v1.13.8). */
public final class OfflineTtsSupertonicModelConfig {
    public String durationPredictor = "";
    public String textEncoder = "";
    public String vectorEstimator = "";
    public String vocoder = "";
    public String ttsJson = "";
    public String unicodeIndexer = "";
    public String voiceStyle = "";
}
