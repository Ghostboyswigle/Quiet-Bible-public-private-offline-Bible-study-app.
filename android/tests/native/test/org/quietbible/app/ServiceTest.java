package org.quietbible.app;

import android.content.Context;
import android.content.Intent;
import android.media.AudioDeviceInfo;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.os.Handler;
import android.os.SystemClock;
import android.app.NotificationManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Runs the real PlaybackService source on a JVM against fake Android classes.
 * The test plays Android (audio focus, Bluetooth devices, intent delivery) and
 * the page (the JS player, with the same resume/pause rules as the app bundle).
 */
public class ServiceTest {

    static final int GAIN = 1, LOSS = -1, TRANSIENT = -2, DUCK = -3;
    static final int SPEAKER = 2, A2DP = 8, SCO = 7, BLE_HEADSET = 26;

    /** The page's player, mirroring kt.resume()/kt.pause()/report() in app.js. */
    static final class Page implements PlaybackService.CommandSink {
        final Context ctx = new Context() {};
        final List<String> got = new ArrayList<>();
        String status = "idle";
        final Handler ui = new Handler(null);

        void userPlay() { status = "playing"; report(); }

        /** kt.start(): stops (reporting idle) and immediately starts the new verse */
        void listenFromVerse() { status = "idle"; report(); status = "playing"; report(); }

        public void onCommand(final String c) {
            got.add(c);
            ui.postDelayed(new Runnable() { public void run() {   // JS runs later, on the UI thread
                if (c.equals("play")) { if (status.equals("paused")) { status = "playing"; report(); } }
                else if (c.equals("pause")) { status = "paused"; report(); }
                else if (c.equals("stop")) { status = "idle"; report(); }
            }}, 0);
        }

        void report() {
            if (status.equals("idle")) PlaybackService.stopPlayback(ctx);
            else PlaybackService.update(ctx, status.equals("playing"), "John 3", "verse 16");
        }
    }

    static AudioManager am;
    static NotificationManager nm;
    static PlaybackService svc;
    static Page page;

    static void fresh(AudioDeviceInfo... outputs) {
        Handler.queue.clear();
        Context.started.clear();
        SystemClock.now = 100_000;
        am = new AudioManager();
        for (AudioDeviceInfo d : outputs) am.outputs.add(d);
        nm = new NotificationManager();
        Context.services.put(Context.AUDIO_SERVICE, am);
        Context.services.put(Context.NOTIFICATION_SERVICE, nm);
        svc = null;
        page = new Page();
        PlaybackService.commandSink = page;
    }

    /** Let Android deliver intents and the main thread run until nothing is left. */
    static void settle() {
        for (int guard = 0; guard < 1000; guard++) {
            if (!Context.started.isEmpty()) {
                Intent i = Context.started.remove(0);
                if (svc == null) {
                    if (PlaybackService.ACTION_STOP.equals(i.getAction())) continue;
                    svc = new PlaybackService();
                    svc.onCreate();
                }
                svc.onStartCommand(i, 0, 1);
                continue;
            }
            int before = Handler.pending();
            Handler.advance(0);                                  // run whatever is due now
            if (Handler.pending() == before && Context.started.isEmpty()) return;  // only future tasks remain
        }
        throw new AssertionError("did not settle");
    }

    static android.media.session.MediaSession session() {
        try {
            java.lang.reflect.Field f = PlaybackService.class.getDeclaredField("session");
            f.setAccessible(true);
            return (android.media.session.MediaSession) f.get(svc);
        } catch (Exception e) { throw new RuntimeException(e); }
    }

    static void later(long ms) { Handler.advance(ms); settle(); }

    static void end() {
        if (svc != null) svc.onDestroy();
        PlaybackService.commandSink = null;
    }

    static int pass = 0, total = 0;

    static void check(String name, boolean ok, Object detail) {
        total++;
        if (ok) pass++;
        System.out.println("  [" + (ok ? "PASS" : "FAIL") + "] " + name + (detail == null ? "" : "  -> " + detail));
    }

    static boolean silent() { return AudioTrack.silentPlaying(); }

    public static void main(String[] args) {
        System.out.println("Notifications and calls");
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            boolean started = am.holder != null && silent() && svc.foreground;
            am.focus(DUCK); settle();
            boolean pausedOk = page.status.equals("paused") && !silent();
            later(2500);
            am.focus(GAIN); settle();
            check("notification: pauses, then carries on by itself",
                  started && pausedOk && page.status.equals("playing") && silent() && page.got.equals(List.of("pause", "play")),
                  "started=" + started + " paused=" + pausedOk + " now=" + page.status + " cmds=" + page.got);
            end();
        }
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            am.focus(TRANSIENT); settle();
            later(5 * 60_000);
            boolean heldDuringCall = page.status.equals("paused");
            am.focus(GAIN); settle();
            check("phone call: stays paused during the call, resumes after",
                  heldDuringCall && page.status.equals("playing"), page.got);
            end();
        }
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            am.focus(TRANSIENT); settle();
            svc.onStartCommand(new Intent(page.ctx, PlaybackService.class).setAction(PlaybackService.ACTION_PAUSE), 0, 1); settle();
            am.focus(GAIN); settle();
            check("you press pause on the lock screen during a call: stays paused",
                  page.status.equals("paused"), page.got);
            end();
        }

        System.out.println("Another app takes the audio (YouTube)");
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            final int[] silenced = {0};
            AudioHooks.silenceSpeech = new Runnable() { public void run() { silenced[0]++; } };
            page.userPlay(); settle();
            boolean activeBefore = session().active;
            am.focus(LOSS);                      // before the page has had a chance to answer
            boolean quietAtOnce = silenced[0] == 1 && !silent()
                && session().state.state == android.media.session.PlaybackState.STATE_PAUSED && !session().active;
            settle();
            check("YouTube starts: Quiet Bible goes quiet and shows paused immediately, and stops being the current media app",
                  activeBefore && quietAtOnce && page.status.equals("paused") && !nm.last.ongoing, "silenced=" + silenced[0] + " active=" + session().active);
            svc.onStartCommand(new Intent(page.ctx, PlaybackService.class).setAction(PlaybackService.ACTION_PLAY), 0, 1); settle();
            check("...pressing play in Quiet Bible later makes it the current media app again", session().active && page.status.equals("playing") && silent(), null);
            AudioHooks.silenceSpeech = null;
            end();
        }
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            am.focus(DUCK);
            boolean stillActive = session().active;
            settle();
            am.focus(GAIN); settle();
            check("a notification sound doesn't make Quiet Bible give up its place", stillActive && session().active && page.status.equals("playing"), null);
            end();
        }

        System.out.println("You choose other audio");
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            int req = am.requests;
            am.focus(LOSS); settle();
            later(15_000);
            check("you open a music app: Quiet Bible pauses and stays paused",
                  page.status.equals("paused") && page.got.equals(List.of("pause")) && am.holder == null && am.abandons == 1,
                  page.got + " abandons=" + am.abandons);
            svc.onStartCommand(new Intent(page.ctx, PlaybackService.class).setAction(PlaybackService.ACTION_PLAY), 0, 1); settle();
            check("...pressing play later really takes the audio back (0.5.9 never asked again)",
                  page.status.equals("playing") && am.requests == req + 1 && am.holder != null,
                  "focus requests " + req + " -> " + am.requests);
            end();
        }

        System.out.println("Bluetooth");
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            later(30_000);
            am.connect(new AudioDeviceInfo(7, A2DP, true)); settle();   // get in the car
            later(2_000);
            am.focus(LOSS); settle();                                   // the car's music app jumps in
            boolean pausedFirst = page.status.equals("paused");
            later(1_500);
            check("car connects and another app starts: Quiet Bible takes the audio back",
                  pausedFirst && page.status.equals("playing") && am.holder != null && silent(),
                  "cmds=" + page.got + " holder=" + (am.holder != null));
            end();
        }
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            later(30_000);
            am.focus(LOSS); settle();                                   // takeover lands first
            later(1_000);
            am.connect(new AudioDeviceInfo(8, BLE_HEADSET, true)); settle();
            later(1_500);
            check("same, when the takeover beats Android's Bluetooth notice",
                  page.status.equals("playing"), page.got);
            end();
        }
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true), new AudioDeviceInfo(3, A2DP, true)); // already in the car
            page.userPlay(); settle();
            later(3_000);
            am.focus(LOSS); settle();                                   // you pick a song yourself
            later(10_000);
            check("already connected when you started: the device list at start doesn't count as a new connection",
                  page.status.equals("paused") && page.got.equals(List.of("pause")), page.got);
            end();
        }
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            later(30_000);
            am.connect(new AudioDeviceInfo(9, SCO, true)); settle();    // call audio route only
            am.focus(LOSS); settle();
            later(5_000);
            check("a call-only Bluetooth route (SCO) doesn't trigger a takeback",
                  page.status.equals("paused"), page.got);
            end();
        }
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            later(30_000);
            am.connect(new AudioDeviceInfo(7, A2DP, true)); settle();
            am.focus(LOSS); settle();
            session().callback.onPause();                           // you hit pause on the car stereo
            settle();
            later(5_000);
            check("you hit pause on the stereo right away: no takeback",
                  page.status.equals("paused") && Handler.pending() == 0, page.got);
            end();
        }
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            am.connect(new AudioDeviceInfo(7, A2DP, true)); settle();
            int takebacks = 0;
            for (int i = 0; i < 4; i++) {                              // a pushy app
                am.focus(LOSS); settle();
                String before = page.status;
                later(1_500);
                if (before.equals("paused") && page.status.equals("playing")) takebacks++;
            }
            check("never a tug of war: at most two takebacks per connection",
                  takebacks == 2 && page.status.equals("paused"), takebacks + " takebacks");
            end();
        }

        System.out.println("Lifecycle");
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            am.grant = false;                                           // e.g. a call is going on
            page.userPlay(); settle();
            boolean refused = am.holder == null;
            am.grant = true;
            PlaybackService.update(page.ctx, true, "John 3", "verse 17"); settle();  // next verse
            check("a refused focus request is asked again on the next verse (0.5.9 gave up for good)",
                  refused && am.holder != null, "requests=" + am.requests);
            end();
        }
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            boolean was = silent();
            page.status = "idle"; page.report(); settle();              // stop reading
            boolean stopped = !silent() && am.holder == null && !svc.foreground && svc.stopped;
            svc.onDestroy();
            check("stopping releases the silent track, the audio focus and the Bluetooth watcher",
                  was && stopped && am.callback == null && AudioTrack.current.released,
                  "stopped=" + stopped + " watcher=" + (am.callback == null));
            svc = null; PlaybackService.commandSink = null;
        }
        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            boolean ongoing = nm.last != null && nm.last.ongoing && nm.last.actions == 3;
            am.focus(DUCK); settle();
            boolean pausedCard = nm.last != null && !nm.last.ongoing && nm.last.actions == 3;
            check("lock-screen card still shows previous / play-pause / next and follows the state",
                  ongoing && pausedCard, null);
            end();
        }

        {
            fresh(new AudioDeviceInfo(1, SPEAKER, true));
            page.userPlay(); settle();
            later(20_000);
            page.listenFromVerse(); settle();
            later(2_000);
            check("\"Listen\" on another verse while reading keeps reading (no stop echoed back)",
                  page.status.equals("playing") && !page.got.contains("stop"), page.got);
            end();
        }

        System.out.println();
        check("lock-screen album names the translation being read, not a fixed one",
              PlaybackService.album("King James Version \u00b7 verse 3 of 31").equals("King James Version")
              && PlaybackService.album("Chinese Union Version (Traditional) \u00b7 verse 2 of 6").equals("Chinese Union Version (Traditional)")
              && PlaybackService.album(null).equals("Quiet Bible") && PlaybackService.album("").equals("Quiet Bible"), null);
        System.out.println((pass == total ? "RESULT: " : "RESULT (FAILURES): ") + pass + "/" + total + " passed");
        System.exit(pass == total ? 0 : 1);
    }
}
