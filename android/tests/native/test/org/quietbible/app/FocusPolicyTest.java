package org.quietbible.app;

import java.util.ArrayList;
import java.util.List;

/** Runs on a plain JVM: javac + java, no Android needed. */
public class FocusPolicyTest {

    static final class Fx implements FocusPolicy.Effects {
        final List<String> log = new ArrayList<>();
        long pendingReclaim = -1;

        public void send(String c) { log.add(c); }
        public void releaseFocus() { log.add("release"); }
        public void scheduleReclaim(long ms) { pendingReclaim = ms; log.add("reclaim@" + ms); }
        public void cancelReclaim() { if (pendingReclaim >= 0) log.add("cancel"); pendingReclaim = -1; }

        List<String> sends() {
            List<String> out = new ArrayList<>();
            for (String s : log) if (s.equals("play") || s.equals("pause")) out.add(s);
            return out;
        }
        boolean reclaimPending() { return pendingReclaim >= 0; }
        /** the service runs the scheduled reclaim: asks Android for focus again */
        void runReclaim(FocusPolicy p, boolean granted) { pendingReclaim = -1; p.onReclaimed(granted); }
    }

    /** The logic that shipped in 0.5.9, reduced to its decisions, for comparison. */
    static final class OldPolicy {
        final Fx fx; boolean playing, pausedByFocusLoss;
        OldPolicy(Fx fx) { this.fx = fx; }
        void onPlayerState(boolean p) { playing = p; if (!p) pausedByFocusLoss = false; }
        void onFocusChange(int c) {
            if (c == -1) { pausedByFocusLoss = false; fx.send("pause"); }
            else if (c == -2 || c == -3) { if (playing) { pausedByFocusLoss = true; fx.send("pause"); } }
            else if (c == 1) { if (pausedByFocusLoss) { pausedByFocusLoss = false; fx.send("play"); } }
        }
    }

    static int pass = 0, total = 0;

    static void check(String name, boolean ok, Object detail) {
        total++;
        if (ok) pass++;
        System.out.println("  [" + (ok ? "PASS" : "FAIL") + "] " + name + (detail == null ? "" : "  -> " + detail));
    }

    static final int GAIN = 1, LOSS = -1, TRANSIENT = -2, DUCK = -3;

    public static void main(String[] args) {
        System.out.println("The reported bug: notification pauses, never resumes");
        {
            Fx fx = new Fx(); OldPolicy old = new OldPolicy(fx);
            old.onPlayerState(true);
            old.onFocusChange(DUCK);      // notification sound
            old.onPlayerState(false);     // page reports the pause back
            old.onFocusChange(GAIN);      // notification done
            check("OLD logic resumes after a notification (expected to fail)",
                  fx.sends().equals(List.of("pause", "play")), fx.sends());
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onPlayerState(true);
            p.onFocusChange(DUCK, 1000);
            p.onPlayerState(false);
            p.onFocusChange(GAIN, 3000);
            check("NEW logic resumes after a notification",
                  fx.sends().equals(List.of("pause", "play")), fx.sends());
        }

        System.out.println("Interruptions");
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onPlayerState(true);
            p.onFocusChange(TRANSIENT, 0); p.onPlayerState(false);
            p.onFocusChange(GAIN, 300_000);
            check("phone call: pauses, resumes when the call ends", fx.sends().equals(List.of("pause", "play")), fx.sends());
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onPlayerState(true);
            p.onFocusChange(DUCK, 0);
            p.onPlayerState(true);        // a verse change already in flight reports 'playing'
            p.onPlayerState(false);       // then the pause lands
            p.onFocusChange(GAIN, 2000);
            check("race: a late 'playing' report doesn't lose the resume", fx.sends().equals(List.of("pause", "play")), fx.sends());
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onPlayerState(false);       // you paused it yourself
            p.onFocusChange(DUCK, 0); p.onFocusChange(GAIN, 2000);
            check("already paused by you: a notification doesn't start it", fx.sends().isEmpty(), fx.sends());
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onPlayerState(true);
            p.onFocusChange(TRANSIENT, 0); p.onPlayerState(false);
            p.onUserPause();              // you press pause on the lock screen mid-call
            p.onFocusChange(GAIN, 60_000);
            check("you pause during a call: stays paused afterwards", fx.sends().equals(List.of("pause")), fx.sends());
        }

        System.out.println("Other apps taking over");
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onPlayerState(true);
            p.onFocusChange(LOSS, 50_000);
            check("you start music yourself: pauses, no fight", fx.sends().equals(List.of("pause")) && !fx.reclaimPending(), fx.log);
            check("...and focus is released so pressing play asks for it again", fx.log.contains("release"), fx.log);
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onBluetoothConnected(10_000);
            p.onPlayerState(true);
            p.onFocusChange(LOSS, 12_000);          // another app auto-starts
            boolean scheduled = fx.reclaimPending();
            p.onPlayerState(false);
            fx.runReclaim(p, true);
            check("Bluetooth connects, another app jumps in: takes the audio back",
                  scheduled && fx.sends().equals(List.of("pause", "play")), fx.log);
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onPlayerState(true);
            p.onFocusChange(LOSS, 20_000);          // the takeover arrives first...
            boolean earlyReclaim = fx.reclaimPending();
            p.onPlayerState(false);
            p.onBluetoothConnected(21_500);         // ...then Android reports the new device
            boolean scheduled = fx.reclaimPending();
            fx.runReclaim(p, true);
            check("same, when the takeover beats the Bluetooth notice",
                  !earlyReclaim && scheduled && fx.sends().equals(List.of("pause", "play")), fx.log);
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onBluetoothConnected(0);
            p.onPlayerState(true);
            p.onFocusChange(LOSS, 60_000);          // a minute later you open a music app
            check("Bluetooth connected long ago: your choice of music is respected", !fx.reclaimPending(), fx.log);
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onPlayerState(true);
            p.onFocusChange(LOSS, 0);
            p.onPlayerState(false);
            p.onBluetoothConnected(10_000);         // device shows up long after
            check("Bluetooth arrives well after an unrelated loss: no fight", !fx.reclaimPending(), fx.log);
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onPlayerState(false);                 // paused
            p.onBluetoothConnected(0);
            p.onFocusChange(LOSS, 1000);
            Fx cfx = new Fx(); FocusPolicy control = new FocusPolicy(cfx);
            control.onPlayerState(true); control.onBluetoothConnected(0); control.onFocusChange(LOSS, 1000);
            check("wasn't playing when Bluetooth connected: nothing to take back",
                  !fx.reclaimPending() && cfx.reclaimPending(), "paused=" + fx.log + "  playing(control)=" + cfx.log);
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onBluetoothConnected(0);
            int reclaimed = 0;
            for (int i = 0; i < 4; i++) {           // an app that keeps grabbing it back
                p.onPlayerState(true);
                p.onFocusChange(LOSS, 1000 + i * 1500);
                p.onPlayerState(false);
                if (fx.reclaimPending()) { reclaimed++; fx.runReclaim(p, true); }
            }
            check("never a tug of war: gives up after two takebacks", reclaimed == 2, reclaimed + " takebacks");
            p.onBluetoothConnected(100_000);        // next time you get in the car
            p.onPlayerState(true);
            p.onFocusChange(LOSS, 101_000);
            check("...and a new connection starts fresh", fx.reclaimPending(), fx.log);
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onBluetoothConnected(0);
            p.onPlayerState(true);
            p.onFocusChange(LOSS, 1000); p.onPlayerState(false);
            boolean scheduled = fx.reclaimPending();
            fx.runReclaim(p, false);                // a call started - Android refuses
            check("if Android refuses the audio (e.g. a call), it doesn't force playback",
                  scheduled && fx.sends().equals(List.of("pause")), "takeback scheduled=" + scheduled + " " + fx.sends());
        }
        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onBluetoothConnected(0);
            p.onPlayerState(true);
            p.onFocusChange(LOSS, 1000); p.onPlayerState(false);
            p.onUserPause();                        // you hit pause on the car stereo
            check("you pause before it takes back: the takeback is cancelled",
                  !fx.reclaimPending() && fx.log.contains("cancel"), fx.log);
        }

        {
            Fx fx = new Fx(); FocusPolicy p = new FocusPolicy(fx);
            p.onBluetoothConnected(0);
            p.onPlayerState(true);
            p.onFocusChange(LOSS, 8_000);           // you open YouTube yourself after connecting
            check("you start YouTube yourself a few seconds after connecting: no takeback", !fx.reclaimPending(), fx.log);
        }

        System.out.println();
        // the "OLD" check is expected to fail; everything else must pass
        int expected = total - 1;
        System.out.println((pass == expected ? "RESULT: " : "RESULT (UNEXPECTED): ")
            + pass + "/" + total + " passed - the one failure is the old logic, reproducing the bug");
        System.exit(pass == expected ? 0 : 1);
    }
}
