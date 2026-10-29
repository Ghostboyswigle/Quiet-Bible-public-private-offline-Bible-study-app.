package android.speech.tts;
public class TextToSpeech {
    public java.util.Locale language = java.util.Locale.US; public int sets = 0;
    /** Locales this pretend phone has no voice for (e.g. "fil_PH"); asking for one changes nothing. */
    public static final java.util.Set<String> unsupported = new java.util.HashSet<>();
    public int setLanguage(java.util.Locale l) { sets++; if (unsupported.contains(l.toString())) return -2; language = l; return 0; }
}
