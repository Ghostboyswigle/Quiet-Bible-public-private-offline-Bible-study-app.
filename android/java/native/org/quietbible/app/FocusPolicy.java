package org.quietbible.app;

/**
 * Decides what Quiet Bible does when other audio comes and goes. Plain Java with
 * no Android types, so every rule here is exercised by FocusPolicyTest on an
 * ordinary JVM before it ever reaches a phone.
 *
 * The three situations it has to tell apart:
 *
 *  - Something brief interrupts - a notification sound, a navigation prompt, a
 *    phone call. Android reports a transient loss, then gives focus back. Pause,
 *    then resume on our own when it returns.
 *
 *  - You deliberately start other audio. Android reports a permanent loss. Pause
 *    and stay paused; pressing play later asks for focus again.
 *
 *  - A Bluetooth device connects and some other app starts itself. That also
 *    arrives as a permanent loss, so it is recognised by timing: a loss within a
 *    few seconds of a Bluetooth output appearing, while we were playing. Take the
 *    audio back - at most twice per connection, so we never get into a tug of war.
 */
final class FocusPolicy {

    /** What the policy asks the service to do. */
    interface Effects {
        void send(String command);

        /** Forget the current focus request, so the next play asks Android again. */
        void releaseFocus();

        void scheduleReclaim(long delayMs);

        void cancelReclaim();
    }

    // AudioManager constants, repeated here so this class needs no Android types
    static final int AUDIOFOCUS_GAIN = 1;
    static final int AUDIOFOCUS_LOSS = -1;
    static final int AUDIOFOCUS_LOSS_TRANSIENT = -2;
    static final int AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK = -3;

    /**
     * A loss this soon after a Bluetooth output appears counts as a takeover. Kept
     * short: apps that start themselves on connect do so within a few seconds,
     * while opening YouTube or music yourself takes longer.
     */
    static final long BLUETOOTH_WINDOW_MS = 6_000;
    /** ...and so does a Bluetooth output appearing this soon after a loss. */
    static final long LOSS_WINDOW_MS = 4_000;
    /** Give the other app a moment to settle before taking the audio back. */
    static final long RECLAIM_DELAY_MS = 1_200;
    static final int MAX_RECLAIMS_PER_CONNECTION = 2;

    static final String PLAY = "play";
    static final String PAUSE = "pause";

    private final Effects fx;

    /** No event yet. Not 0: a clock can legitimately read 0. */
    private static final long NEVER = Long.MIN_VALUE;

    private boolean playing = false;
    private boolean pausedByFocusLoss = false;
    private long bluetoothAt = NEVER;
    private long lostWhilePlayingAt = NEVER;
    private int reclaims = 0;

    FocusPolicy(Effects fx) {
        this.fx = fx;
    }

    boolean isPlaying() {
        return playing;
    }

    boolean isPausedByFocusLoss() {
        return pausedByFocusLoss;
    }

    /**
     * The page reports its state after every change. A paused report is very often
     * the pause a focus loss just asked for, so it must NOT clear the "resume when
     * focus returns" note - that was the bug that left playback stuck after
     * notifications.
     */
    void onPlayerState(boolean nowPlaying) {
        playing = nowPlaying;
    }

    /** Pause or stop pressed on the lock screen, notification or a headset. */
    void onUserPause() {
        pausedByFocusLoss = false;
        lostWhilePlayingAt = NEVER;
        fx.cancelReclaim();
    }

    void onFocusChange(int change, long now) {
        if (change == AUDIOFOCUS_LOSS) {
            boolean wasPlaying = playing;
            fx.releaseFocus();
            pausedByFocusLoss = false;
            fx.send(PAUSE);
            if (wasPlaying) {
                lostWhilePlayingAt = now;
                if (bluetoothAt != NEVER && now - bluetoothAt <= BLUETOOTH_WINDOW_MS) {
                    reclaim();
                }
            }
        } else if (change == AUDIOFOCUS_LOSS_TRANSIENT
                || change == AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK) {
            // spoken word is unintelligible ducked - pause and pick it up again after
            if (playing) {
                pausedByFocusLoss = true;
                fx.send(PAUSE);
            }
        } else if (change == AUDIOFOCUS_GAIN) {
            if (pausedByFocusLoss) {
                pausedByFocusLoss = false;
                fx.send(PLAY);
            }
        }
    }

    /** A Bluetooth audio output (car, headphones, speaker) just appeared. */
    void onBluetoothConnected(long now) {
        bluetoothAt = now;
        reclaims = 0;
        if (lostWhilePlayingAt != NEVER && now - lostWhilePlayingAt <= LOSS_WINDOW_MS) {
            reclaim();
        }
    }

    /** The scheduled reclaim ran; granted says whether Android handed focus back. */
    void onReclaimed(boolean granted) {
        if (granted) fx.send(PLAY);
    }

    private void reclaim() {
        if (reclaims >= MAX_RECLAIMS_PER_CONNECTION) return;
        reclaims++;
        lostWhilePlayingAt = NEVER;
        fx.cancelReclaim();
        fx.scheduleReclaim(RECLAIM_DELAY_MS);
    }
}
