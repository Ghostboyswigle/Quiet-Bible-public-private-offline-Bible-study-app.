package org.quietbible.app;

import com.k2fsa.sherpa.onnx.GeneratedAudio;
import com.k2fsa.sherpa.onnx.GenerationConfig;
import com.k2fsa.sherpa.onnx.OfflineTts;
import com.k2fsa.sherpa.onnx.OfflineTtsConfig;

import java.io.File;
import java.util.HashMap;

/**
 * A Supertonic voice run by sherpa-onnx. One Supertonic model reads many languages
 * with several voice styles; this reads one language with one style.
 */
final class SupertonicSynth implements VoiceCore.Synth {

    /** The model's files, in the order a pack lists them. */
    static final String[] FILES = {
        "duration_predictor.int8.onnx", "text_encoder.int8.onnx", "vector_estimator.int8.onnx",
        "vocoder.int8.onnx", "tts.json", "unicode_indexer.bin", "voice.bin"};

    private final OfflineTts tts;
    private final int sampleRate;
    private final int style;
    private final String lang;
    private final int steps;

    /**
     * @param dir    the folder holding FILES
     * @param style  which voice style (0..n-1 in voice.bin)
     * @param lang   the language to read, e.g. "es"
     * @param steps  flow-matching steps: more is cleaner and slower (5 is the model's default)
     */
    SupertonicSynth(File dir, int style, String lang, int steps, int threads) {
        this.style = style;
        this.lang = lang;
        this.steps = steps;
        OfflineTtsConfig c = new OfflineTtsConfig();
        c.model.supertonic.durationPredictor = new File(dir, FILES[0]).getAbsolutePath();
        c.model.supertonic.textEncoder = new File(dir, FILES[1]).getAbsolutePath();
        c.model.supertonic.vectorEstimator = new File(dir, FILES[2]).getAbsolutePath();
        c.model.supertonic.vocoder = new File(dir, FILES[3]).getAbsolutePath();
        c.model.supertonic.ttsJson = new File(dir, FILES[4]).getAbsolutePath();
        c.model.supertonic.unicodeIndexer = new File(dir, FILES[5]).getAbsolutePath();
        c.model.supertonic.voiceStyle = new File(dir, FILES[6]).getAbsolutePath();
        c.model.numThreads = threads;
        tts = new OfflineTts(null, c);
        sampleRate = tts.getSampleRate();
    }

    @Override
    public float[] generate(String text, float speed) {
        if (text.isEmpty()) return new float[0];
        GenerationConfig g = new GenerationConfig();
        g.sid = style;
        g.speed = speed;
        g.numSteps = steps;
        g.extra = new HashMap<String, String>();
        g.extra.put("lang", lang);
        GeneratedAudio a = tts.generate(text, g);
        return a.samples == null ? new float[0] : a.samples;
    }

    @Override
    public int sampleRate() {
        return sampleRate;
    }

    @Override
    public void release() {
        tts.release();
    }
}
