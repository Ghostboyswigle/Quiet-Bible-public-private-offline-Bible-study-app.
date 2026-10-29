package com.k2fsa.sherpa.onnx;

/** Field names and types must match sherpa-onnx/jni/offline-tts.cc (v1.13.8). */
public final class OfflineTtsModelConfig {
    public String provider = "";
    public int numThreads = 2;
    public OfflineTtsVitsModelConfig vits = new OfflineTtsVitsModelConfig();
    public OfflineTtsMatchaModelConfig matcha = new OfflineTtsMatchaModelConfig();
    public OfflineTtsKokoroModelConfig kokoro = new OfflineTtsKokoroModelConfig();
    public OfflineTtsZipVoiceModelConfig zipvoice = new OfflineTtsZipVoiceModelConfig();
    public OfflineTtsKittenModelConfig kitten = new OfflineTtsKittenModelConfig();
    public OfflineTtsPocketModelConfig pocket = new OfflineTtsPocketModelConfig();
    public OfflineTtsSupertonicModelConfig supertonic = new OfflineTtsSupertonicModelConfig();
    public boolean debug = false;
    { provider = "cpu"; }
}
