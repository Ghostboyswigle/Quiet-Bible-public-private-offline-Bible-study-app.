package com.k2fsa.sherpa.onnx;

/** Field names and types must match sherpa-onnx/jni/offline-tts.cc (v1.13.8). */
public final class OfflineTtsConfig {
    public String ruleFsts = "";
    public String ruleFars = "";
    public float silenceScale = 0.2f;
    public int maxNumSentences = 1;
    public OfflineTtsModelConfig model = new OfflineTtsModelConfig();
}
