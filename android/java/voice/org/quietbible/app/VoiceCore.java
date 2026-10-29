package org.quietbible.app;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Schedules the offline voice: one thread turns text into audio, another plays it.
 * Plain Java (no Android types), so the same class runs in the JVM tests with the
 * real sherpa-onnx library.
 *
 *  - speak() plays a verse, from the cache if it was prepared in advance.
 *  - prefetch() prepares the next verse while the current one is playing, so
 *    verses follow each other without a pause for synthesis.
 *  - stop() (and any newer speak) silences whatever is playing within one chunk
 *    of audio and discards work that is no longer wanted.
 */
final class VoiceCore {

    interface Synth {
        float[] generate(String text, float speed) throws Exception;

        int sampleRate();

        /** Frees the voice's memory. */
        void release();
    }

    interface SynthFactory {
        Synth open() throws Throwable;
    }

    /** Plays PCM; blocks until it has been heard, or returns false once the ticket is no longer live. */
    interface Sink {
        boolean play(float[] pcm, int sampleRate, Ticket ticket);

        /** Nothing more to play for now: stop presenting as a playing app. */
        void idle();
    }

    interface Listener {
        void onDone(String id);

        /** Synthesis failed for this verse; the caller can read it another way. */
        void onError(String id, String text, float rate);
    }

    static final int LOADING = 0, READY = 1, FAILED = 2;

    /** Identifies one speak request; dead as soon as anything newer happens. */
    final class Ticket {
        final int n;

        Ticket(int n) {
            this.n = n;
        }

        boolean live() {
            return generation.get() == n;
        }
    }

    private static final int CACHE_ENTRIES = 6;

    private final AtomicInteger generation = new AtomicInteger();
    private final ExecutorService synthesis;
    private final ExecutorService playback;
    private final boolean ownsThreads;
    private volatile boolean closed;
    private final Sink sink;
    private final Listener listener;
    private final float gain;

    private volatile int state = LOADING;
    private volatile Throwable failure;
    private volatile Synth synth;              // set and released on the synthesis thread
    private volatile int rate0 = 22050;
    private volatile String wantedPrefetch;
    private volatile String wantedSpeak;

    private final Map<String, float[]> cache = new LinkedHashMap<String, float[]>(16, 0.75f, true) {
        @Override
        protected boolean removeEldestEntry(Map.Entry<String, float[]> eldest) {
            return size() > CACHE_ENTRIES;
        }
    };

    /** Counters for tests and diagnostics. */
    final AtomicInteger generated = new AtomicInteger();
    final AtomicInteger cacheHits = new AtomicInteger();

    VoiceCore(SynthFactory factory, Sink sink, Listener listener, float gain) {
        this(newThread("qb-voice-synth"), newThread("qb-voice-play"), true, factory, sink, listener, gain);
    }

    /**
     * With threads shared between voices: switching voice queues the new voice's
     * start-up behind the old one's release, so two voices never sit in memory at once.
     */
    VoiceCore(ExecutorService synthesis, ExecutorService playback, final SynthFactory factory,
              Sink sink, Listener listener, float gain) {
        this(synthesis, playback, false, factory, sink, listener, gain);
    }

    private VoiceCore(ExecutorService synthesis, ExecutorService playback, boolean ownsThreads,
                      final SynthFactory factory, Sink sink, Listener listener, float gain) {
        this.synthesis = synthesis;
        this.playback = playback;
        this.ownsThreads = ownsThreads;
        this.sink = sink;
        this.listener = listener;
        this.gain = gain;
        synthesis.execute(new Runnable() {
            @Override
            public void run() {
                if (closed) {
                    state = FAILED;
                    return;
                }
                try {
                    Synth opened = factory.open();
                    rate0 = opened.sampleRate();
                    synth = opened;
                    state = READY;
                } catch (Throwable t) {
                    failure = t;
                    state = FAILED;
                }
            }
        });
    }

    int state() {
        return state;
    }

    Throwable failure() {
        return failure;
    }

    void speak(final String text, final float rate, final String id) {
        if (closed) return;
        final Ticket ticket = new Ticket(generation.incrementAndGet());
        final String key = key(text, rate, id);
        wantedSpeak = key;
        synthesis.execute(new Runnable() {
            @Override
            public void run() {
                if (!ticket.live()) return;
                final float[] pcm;
                try {
                    pcm = audioFor(key, text, rate);
                } catch (Throwable t) {
                    if (ticket.live()) listener.onError(id, text, rate);
                    return;
                }
                if (!ticket.live()) return;
                final int sampleRate = rate0;
                playback.execute(new Runnable() {
                    @Override
                    public void run() {
                        if (!ticket.live()) return;
                        boolean finished = sink.play(pcm, sampleRate, ticket);
                        if (finished && ticket.live()) listener.onDone(id);
                    }
                });
            }
        });
    }

    void prefetch(final String text, final float rate, final String id) {
        if (closed) return;
        final String key = key(text, rate, id);
        wantedPrefetch = key;
        synthesis.execute(new Runnable() {
            @Override
            public void run() {
                if (!key.equals(wantedPrefetch) && !key.equals(wantedSpeak)) return; // skipped past it
                try {
                    audioFor(key, text, rate);
                } catch (Throwable ignored) {
                    // speak() will try again and report the error then
                }
            }
        });
    }

    void stop() {
        generation.incrementAndGet();
        try {
            playback.execute(new Runnable() {
                @Override
                public void run() {
                    if (sink != null) sink.idle();   // after any verse in progress has noticed the stop
                }
            });
        } catch (Throwable ignored) {
            // threads already shut down
        }
    }

    /** Stops, then frees the voice once any synthesis in progress has finished. */
    void shutdown() {
        closed = true;
        stop();
        synthesis.execute(new Runnable() {
            @Override
            public void run() {
                Synth s = synth;
                synth = null;
                if (s != null) {
                    try {
                        s.release();
                    } catch (Throwable ignored) {
                    }
                }
                synchronized (cache) {
                    cache.clear();
                }
            }
        });
        if (ownsThreads) {
            synthesis.shutdown();
            playback.shutdown();
        }
    }

    /** On the synthesis thread. */
    private float[] audioFor(String key, String text, float rate) throws Exception {
        Synth voice = synth;
        if (state != READY || voice == null) throw new IllegalStateException("voice not available", failure);
        float[] pcm;
        synchronized (cache) {
            pcm = cache.get(key);
        }
        if (pcm != null) {
            cacheHits.incrementAndGet();
            return pcm;
        }
        pcm = voice.generate(prepare(text), speedFor(rate));
        generated.incrementAndGet();
        shape(pcm, gain);
        synchronized (cache) {
            cache.put(key, pcm);
        }
        return pcm;
    }

    static String key(String text, float rate, String id) {
        return id + '|' + Math.round(rate * 100) + '|' + text.length() + '|' + text.hashCode();
    }

    /**
     * The reading-speed slider was tuned for phone voices, whose natural pace is
     * quicker; the app's default (0.92) becomes this voice's own pace.
     */
    static float speedFor(float rate) {
        float r = rate / 0.92f;
        if (r < 0.6f) r = 0.6f;
        if (r > 1.6f) r = 1.6f;
        return r;
    }

    /**
     * The BSB prints the divine name in capitals ("the LORD", "the Lord GOD"). Read
     * them as words, never letter by letter.
     */
    static String prepare(String text) {
        if (text == null) return "";
        String t = text.replaceAll("\\bLORD\\b", "Lord").replaceAll("\\bGOD\\b", "God");
        if (t.matches("(?s).*[\\u3000-\\u303f\\uff00-\\uffef].*")) t = cjkPauses(t);
        return t.trim();
    }

    /**
     * Chinese Bibles set headings, notes and speaker labels in brackets
     * ("（大卫的诗）", "〔原文作…〕", "［新娘］"), which a dictionary voice skips without
     * a breath. Read the brackets as pauses, drop quotation marks, and never leave
     * two pauses in a row.
     */
    static String cjkPauses(String t) {
        t = t.replaceAll("[\\uff08\\u3014\\uff3b\\u3010\\uff09\\u3015\\uff3d\\u3011]", "\uff0c");    // （〔［【 】］〕） -> ，   (the real character: an escape in a replacement string is read literally)
        t = t.replaceAll("[\\u300c\\u300d\\u300e\\u300f]", "");                                    // 「」『』
        String before;
        do {
            before = t;
            t = t.replaceAll("\\uff0c\\s*([\\uff0c\\u3002\\uff01\\uff1f\\uff1b\\uff1a\\u3001])", "$1");   // ，， ，。 -> the later mark
            t = t.replaceAll("([\\u3002\\uff01\\uff1f\\uff1b\\uff1a\\u3001])\\s*\\uff0c", "$1");          // 。， -> 。
        } while (!t.equals(before));
        return t.replaceAll("^[\\s\\uff0c]+", "").replaceAll("[\\s\\uff0c]+$", "");
    }

    /** Fixed gain for the voice, with a soft ceiling so no verse ever clips. */
    static void shape(float[] pcm, float gain) {
        final float knee = 0.85f;
        for (int i = 0; i < pcm.length; i++) {
            float x = pcm[i] * gain;
            float a = Math.abs(x);
            if (a > knee) {
                float over = (a - knee) / (1f - knee);
                a = knee + (1f - knee) * (float) Math.tanh(over);
                x = x < 0 ? -a : a;
            }
            pcm[i] = x;
        }
    }

    static ExecutorService newThread(String name) {
        return Executors.newSingleThreadExecutor(named(name));
    }

    private static ThreadFactory named(final String name) {
        return new ThreadFactory() {
            @Override
            public Thread newThread(Runnable r) {
                Thread t = new Thread(r, name);
                t.setDaemon(true);
                return t;
            }
        };
    }
}
