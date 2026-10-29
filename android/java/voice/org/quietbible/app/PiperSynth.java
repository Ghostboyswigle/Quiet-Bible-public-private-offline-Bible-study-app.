package org.quietbible.app;

import com.k2fsa.sherpa.onnx.GeneratedAudio;
import com.k2fsa.sherpa.onnx.OfflineTts;
import com.k2fsa.sherpa.onnx.OfflineTtsConfig;

/** A Piper voice run by sherpa-onnx. */
final class PiperSynth implements VoiceCore.Synth {

    private final OfflineTts tts;
    private final int sampleRate;
    private final int speaker;

    /**
     * @param assets an android.content.res.AssetManager when the model and tokens
     *     are inside the APK, or null when they are plain files (tests)
     * @param espeakDir a real directory holding espeak-ng-data
     */
    PiperSynth(Object assets, String model, String tokens, String espeakDir, int threads) {
        this(assets, model, tokens, espeakDir, threads, 0);
    }

    /** @param speaker which voice in a model that holds several (0 for single-voice models) */
    PiperSynth(Object assets, String model, String tokens, String espeakDir, int threads, int speaker) {
        this(assets, model, tokens, espeakDir, null, null, threads, speaker);
    }

    /**
     * @param lexicon for voices that look words up in a pronunciation dictionary
     *     (e.g. Mandarin, where espeak's guesses at tones are poor) instead of using
     *     espeak; null for espeak voices
     * @param ruleFsts comma-separated text-normalisation rules (numbers, dates) that
     *     come with a dictionary voice; null or empty for none
     */
    PiperSynth(Object assets, String model, String tokens, String espeakDir, String lexicon, String ruleFsts,
               int threads, int speaker) {
        this.speaker = speaker;
        OfflineTtsConfig c = new OfflineTtsConfig();
        c.model.vits.model = model;
        c.model.vits.tokens = tokens;
        if (lexicon != null && lexicon.length() > 0) {
            c.model.vits.lexicon = lexicon;
            if (ruleFsts != null) c.ruleFsts = ruleFsts;
        } else {
            c.model.vits.dataDir = espeakDir;
        }
        c.model.numThreads = threads;
        c.maxNumSentences = 1;
        tts = new OfflineTts(assets, c);
        sampleRate = tts.getSampleRate();
    }

    @Override
    public float[] generate(String text, float speed) {
        if (text.isEmpty()) return new float[0];
        GeneratedAudio a = tts.generate(text, speaker, speed);
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
