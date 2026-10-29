package org.quietbible.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.Icon;
import android.media.AudioAttributes;
import android.media.AudioDeviceCallback;
import android.media.AudioDeviceInfo;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.media.MediaMetadata;
import android.media.session.MediaSession;
import android.media.session.PlaybackState;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.SystemClock;

import java.util.HashSet;
import java.util.Set;

/**
 * Lock-screen / notification controls and audio focus for spoken reading.
 *
 * Same public surface as 0.5.9 (MainActivity and its bridges call update(),
 * stopPlayback() and commandSink exactly as before). What changed:
 *
 *  - Focus decisions live in FocusPolicy (unit-tested on a JVM). The page's own
 *    "paused" report no longer erases the "resume when focus comes back" note, so
 *    playback picks up again after a notification sound or a call.
 *  - A permanent focus loss releases our request, so pressing play afterwards
 *    really asks Android for the audio again instead of playing over the other app.
 *  - While reading, SilentTrack runs a silent track from this process so Android
 *    and Bluetooth devices treat Quiet Bible as the app that is playing.
 *  - Bluetooth outputs are watched (no permission needed); if another app grabs
 *    the audio right as one connects, the policy takes it back.
 */
public class PlaybackService extends Service {

    public interface CommandSink {
        void onCommand(String command);
    }

    public static final String CHANNEL_ID = "quiet_bible_playback";
    public static final int NOTIFICATION_ID = 0x1B1B;

    public static final String ACTION_UPDATE = "org.quietbible.app.UPDATE";
    public static final String ACTION_PLAY = "org.quietbible.app.PLAY";
    public static final String ACTION_PAUSE = "org.quietbible.app.PAUSE";
    public static final String ACTION_NEXT = "org.quietbible.app.NEXT";
    public static final String ACTION_PREVIOUS = "org.quietbible.app.PREVIOUS";
    public static final String ACTION_STOP = "org.quietbible.app.STOP";

    public static final String EXTRA_PLAYING = "playing";
    public static final String EXTRA_TITLE = "title";
    public static final String EXTRA_SUBTITLE = "subtitle";

    public static final String CMD_PLAY = "play";
    public static final String CMD_PAUSE = "pause";
    public static final String CMD_NEXT = "next";
    public static final String CMD_PREVIOUS = "previous";
    public static final String CMD_STOP = "stop";

    public static volatile CommandSink commandSink = null;

    private static volatile PlaybackService instance = null;

    private final Handler handler = new Handler(Looper.getMainLooper());

    private final Runnable reclaim = new Runnable() {
        @Override
        public void run() {
            if (instance != PlaybackService.this) return;
            policy.onReclaimed(acquireFocus());
        }
    };

    private final FocusPolicy policy = new FocusPolicy(new FocusPolicy.Effects() {
        @Override
        public void send(String command) {
            PlaybackService.this.send(command);
        }

        @Override
        public void releaseFocus() {
            PlaybackService.this.releaseFocus();
        }

        @Override
        public void scheduleReclaim(long delayMs) {
            handler.postDelayed(reclaim, delayMs);
        }

        @Override
        public void cancelReclaim() {
            handler.removeCallbacks(reclaim);
        }
    });

    /** Output devices already present, so only genuinely new connections count. */
    private final Set<Integer> knownDevices = new HashSet<Integer>();

    private final AudioDeviceCallback deviceCallback = new AudioDeviceCallback() {
        @Override
        public void onAudioDevicesAdded(AudioDeviceInfo[] added) {
            if (added == null) return;
            for (AudioDeviceInfo d : added) {
                if (d == null) continue;
                if (!knownDevices.add(d.getId())) continue;
                if (d.isSink() && isBluetoothOutput(d.getType())) {
                    policy.onBluetoothConnected(SystemClock.elapsedRealtime());
                }
            }
        }

        @Override
        public void onAudioDevicesRemoved(AudioDeviceInfo[] removed) {
            if (removed == null) return;
            for (AudioDeviceInfo d : removed) {
                if (d != null) knownDevices.remove(d.getId());
            }
        }
    };

    private AudioManager audioManager;
    private AudioFocusRequest focusRequest;
    private MediaSession session;
    private boolean deviceWatch = false;

    private boolean playing = false;
    private String title = "Quiet Bible";
    private String subtitle = "Quiet Bible";

    public static void update(Context context, boolean playing, String title, String subtitle) {
        Intent intent = new Intent(context, PlaybackService.class)
            .setAction(ACTION_UPDATE)
            .putExtra(EXTRA_PLAYING, playing)
            .putExtra(EXTRA_TITLE, title)
            .putExtra(EXTRA_SUBTITLE, subtitle);
        context.startForegroundService(intent);
    }

    public static void stopPlayback(Context context) {
        if (instance == null) return;
        context.startService(new Intent(context, PlaybackService.class).setAction(ACTION_STOP));
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
        createChannel();

        session = new MediaSession(this, "QuietBible");
        session.setCallback(new MediaSession.Callback() {
            @Override
            public void onPlay() {
                send(CMD_PLAY);
            }

            @Override
            public void onPause() {
                policy.onUserPause();
                send(CMD_PAUSE);
            }

            @Override
            public void onSkipToNext() {
                send(CMD_NEXT);
            }

            @Override
            public void onSkipToPrevious() {
                send(CMD_PREVIOUS);
            }

            @Override
            public void onStop() {
                policy.onUserPause();
                send(CMD_STOP);
            }
        });
        session.setActive(true);

        publishSession();
        startForeground(NOTIFICATION_ID, buildNotification());

        watchDevices();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String action = intent == null ? null : intent.getAction();
        if (ACTION_UPDATE.equals(action)) {
            playing = intent.getBooleanExtra(EXTRA_PLAYING, false);
            String t = intent.getStringExtra(EXTRA_TITLE);
            String s = intent.getStringExtra(EXTRA_SUBTITLE);
            if (t != null) title = t;
            if (s != null) subtitle = s;
            // Deliberately does NOT clear the focus-loss note when paused: this
            // report is usually the pause the focus loss itself asked for.
            policy.onPlayerState(playing);
            if (playing) {
                acquireFocus();
                SilentTrack.play();
                if (session != null && !session.isActive()) session.setActive(true);
            } else {
                SilentTrack.pause();
            }
            publishSession();
            notificationManager().notify(NOTIFICATION_ID, buildNotification());
        } else if (ACTION_PLAY.equals(action)) {
            send(CMD_PLAY);
        } else if (ACTION_PAUSE.equals(action)) {
            policy.onUserPause();
            send(CMD_PAUSE);
        } else if (ACTION_NEXT.equals(action)) {
            send(CMD_NEXT);
        } else if (ACTION_PREVIOUS.equals(action)) {
            send(CMD_PREVIOUS);
        } else if (ACTION_STOP.equals(action)) {
            // Only the page itself sends this (stopPlayback), so it is already
            // stopped. 0.5.9 echoed "stop" back to it, which could cancel reading
            // that had just been started again, e.g. "Listen" on another verse.
            policy.onUserPause();
            shutdown();
            return START_NOT_STICKY;
        }
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        handler.removeCallbacks(reclaim);
        unwatchDevices();
        SilentTrack.release();
        releaseFocus();
        if (session != null) {
            session.setActive(false);
            session.release();
            session = null;
        }
        if (instance == this) instance = null;
        super.onDestroy();
    }

    private void watchDevices() {
        if (audioManager == null || deviceWatch) return;
        try {
            knownDevices.clear();
            AudioDeviceInfo[] now = audioManager.getDevices(AudioManager.GET_DEVICES_OUTPUTS);
            if (now != null) {
                for (AudioDeviceInfo d : now) {
                    if (d != null) knownDevices.add(d.getId());
                }
            }
            audioManager.registerAudioDeviceCallback(deviceCallback, handler);
            deviceWatch = true;
        } catch (Throwable ignored) {
        }
    }

    private void unwatchDevices() {
        if (!deviceWatch) return;
        deviceWatch = false;
        try {
            audioManager.unregisterAudioDeviceCallback(deviceCallback);
        } catch (Throwable ignored) {
        }
    }

    static boolean isBluetoothOutput(int type) {
        switch (type) {
            case 8:  // TYPE_BLUETOOTH_A2DP - car stereos, headphones, speakers
            case 23: // TYPE_HEARING_AID
            case 26: // TYPE_BLE_HEADSET
            case 27: // TYPE_BLE_SPEAKER
            case 30: // TYPE_BLE_BROADCAST
                return true;
            default: // TYPE_BLUETOOTH_SCO (7) is left out: it appears for calls
                return false;
        }
    }

    /** The translation being read: the page's subtitle is "<translation> · verse n of m". */
    static String album(String subtitle) {
        if (subtitle == null) return "Quiet Bible";
        int dot = subtitle.indexOf(" \u00b7 ");
        String name = dot > 0 ? subtitle.substring(0, dot) : subtitle;
        return name.trim().length() == 0 ? "Quiet Bible" : name.trim();
    }

    private void publishSession() {
        if (session == null) return;
        MediaMetadata.Builder meta = new MediaMetadata.Builder()
            .putString(MediaMetadata.METADATA_KEY_TITLE, title)
            .putString(MediaMetadata.METADATA_KEY_ARTIST, subtitle)
            .putString(MediaMetadata.METADATA_KEY_ALBUM, album(subtitle));
        try {
            Bitmap art = ThemeArt.bitmap();
            if (art != null) meta.putBitmap(MediaMetadata.METADATA_KEY_ALBUM_ART, art);
        } catch (Throwable ignored) {
        }
        session.setMetadata(meta.build());
        session.setPlaybackState(new PlaybackState.Builder()
            .setActions(PlaybackState.ACTION_PLAY
                | PlaybackState.ACTION_PAUSE
                | PlaybackState.ACTION_PLAY_PAUSE
                | PlaybackState.ACTION_SKIP_TO_NEXT
                | PlaybackState.ACTION_SKIP_TO_PREVIOUS
                | PlaybackState.ACTION_STOP)
            .setState(
                playing ? PlaybackState.STATE_PLAYING : PlaybackState.STATE_PAUSED,
                PlaybackState.PLAYBACK_POSITION_UNKNOWN,
                1f,
                SystemClock.elapsedRealtime())
            .build());
    }

    private NotificationManager notificationManager() {
        return (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
    }

    private void createChannel() {
        NotificationChannel channel = new NotificationChannel(
            CHANNEL_ID, "Spoken reading", NotificationManager.IMPORTANCE_LOW);
        channel.setDescription("Shows what Quiet Bible is reading aloud");
        channel.setShowBadge(false);
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        notificationManager().createNotificationChannel(channel);
    }

    private PendingIntent serviceAction(String action) {
        return PendingIntent.getService(
            this,
            action.hashCode(),
            new Intent(this, PlaybackService.class).setAction(action),
            PendingIntent.FLAG_IMMUTABLE);
    }

    private Notification.Action action(int icon, String label, String action) {
        return new Notification.Action.Builder(
            Icon.createWithResource(this, icon), label, serviceAction(action)).build();
    }

    private Notification buildNotification() {
        PendingIntent open = PendingIntent.getActivity(
            this,
            0,
            new Intent(this, MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
            PendingIntent.FLAG_IMMUTABLE);

        Notification.MediaStyle style = new Notification.MediaStyle()
            .setMediaSession(session.getSessionToken())
            .setShowActionsInCompactView(0, 1, 2);

        Notification.Builder builder = new Notification.Builder(this, CHANNEL_ID)
            .setStyle(style)
            .setContentTitle(title)
            .setContentText(subtitle)
            .setSmallIcon(android.R.drawable.ic_media_play)
            .setContentIntent(open)
            .setVisibility(Notification.VISIBILITY_PUBLIC)
            .setOngoing(playing)
            .setShowWhen(false)
            .addAction(action(android.R.drawable.ic_media_previous, "Previous verse", ACTION_PREVIOUS));
        if (playing) {
            builder.addAction(action(android.R.drawable.ic_media_pause, "Pause", ACTION_PAUSE));
        } else {
            builder.addAction(action(android.R.drawable.ic_media_play, "Play", ACTION_PLAY));
        }
        builder.addAction(action(android.R.drawable.ic_media_next, "Next verse", ACTION_NEXT));

        try {
            builder.setColor(ThemeArt.surfaceColor);
            builder.setColorized(true);
            Bitmap art = ThemeArt.bitmap();
            if (art != null) builder.setLargeIcon(art);
        } catch (Throwable ignored) {
        }
        return builder.build();
    }

    /** @return whether we hold audio focus afterwards */
    private boolean acquireFocus() {
        if (focusRequest != null) return true;
        if (audioManager == null) return false;
        AudioAttributes attrs = new AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_MEDIA)
            .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
            .build();
        AudioFocusRequest request = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
            .setAudioAttributes(attrs)
            .setWillPauseWhenDucked(true)
            .setOnAudioFocusChangeListener(new AudioManager.OnAudioFocusChangeListener() {
                @Override
                public void onAudioFocusChange(int change) {
                    policy.onFocusChange(change, SystemClock.elapsedRealtime());
                    if (change < 0) stepAside(change == AudioManager.AUDIOFOCUS_LOSS);
                }
            }, handler)
            .build();
        boolean granted;
        try {
            granted = audioManager.requestAudioFocus(request) == AudioManager.AUDIOFOCUS_REQUEST_GRANTED;
        } catch (Throwable t) {
            granted = false;
        }
        // Remember the request only if it was granted, so a refused request
        // (e.g. during a call) is simply asked again next time.
        focusRequest = granted ? request : null;
        return granted;
    }

    /**
     * Another app has the audio. Go quiet and show "paused" at once rather than
     * waiting for the page to catch up, so Android, the lock screen and headset
     * buttons treat the other app as the one playing. When another app takes the
     * audio for good, also step back as the current media app until reading
     * starts again.
     */
    private void stepAside(boolean permanent) {
        AudioHooks.silence();
        SilentTrack.pause();
        if (playing) {
            playing = false;
            publishSession();
            try {
                notificationManager().notify(NOTIFICATION_ID, buildNotification());
            } catch (Throwable ignored) {
            }
        }
        if (permanent && session != null) {
            try {
                session.setActive(false);
            } catch (Throwable ignored) {
            }
        }
    }

    private void releaseFocus() {
        AudioFocusRequest request = focusRequest;
        focusRequest = null;
        if (request != null && audioManager != null) {
            try {
                audioManager.abandonAudioFocusRequest(request);
            } catch (Throwable ignored) {
            }
        }
    }

    private void shutdown() {
        handler.removeCallbacks(reclaim);
        SilentTrack.pause();
        releaseFocus();
        playing = false;
        policy.onPlayerState(false);
        publishSession();
        stopForeground(STOP_FOREGROUND_REMOVE);
        stopSelf();
    }

    private void send(String command) {
        CommandSink sink = commandSink;
        if (sink != null) sink.onCommand(command);
    }
}
