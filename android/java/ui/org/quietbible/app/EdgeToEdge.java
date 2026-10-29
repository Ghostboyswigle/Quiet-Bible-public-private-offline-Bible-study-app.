package org.quietbible.app;

import android.app.Activity;
import android.os.Build;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.webkit.WebView;
import android.widget.FrameLayout;

import java.lang.ref.WeakReference;

/**
 * Android 15 and later draw every app edge to edge: the page would sit under the
 * status bar and the gesture bar, and the keyboard would no longer shrink it. This
 * wraps the page in a frame padded by the system bars, display cutout and keyboard,
 * coloured like the page's header and tab bar so the bars blend in.
 *
 * It also keeps the back gesture doing what it always did on Android 16, where apps
 * targeting it no longer get onBackPressed().
 *
 * Every step is optional: if anything here fails, the page is shown as before.
 */
final class EdgeToEdge {
    private EdgeToEdge() {}

    private static final int FALLBACK = 0xFF141311;   // the original dark theme
    private static WeakReference<FrameLayout> frame = new WeakReference<FrameLayout>(null);
    private static WeakReference<Activity> owner = new WeakReference<Activity>(null);

    /** Called from MainActivity.onCreate with the WebView; returns the view to show. */
    static View wrap(final Activity a, final View content) {
        try {
            FrameLayout box = new FrameLayout(a);
            box.addView(content, new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT));
            box.setBackgroundColor(color());
            frame = new WeakReference<FrameLayout>(box);
            owner = new WeakReference<Activity>(a);
            if (Build.VERSION.SDK_INT >= 30) Api30.install(a, box);
            if (Build.VERSION.SDK_INT >= 33 && content instanceof WebView) Api33.back(a, (WebView) content);
            return box;
        } catch (Throwable t) {
            return content;
        }
    }

    /** The page changed its colours (theme picker): repaint behind the bars. */
    static void themeChanged() {
        final FrameLayout box = frame.get();
        final Activity a = owner.get();
        if (box == null) return;
        box.post(new Runnable() {
            @Override
            public void run() {
                try {
                    box.setBackgroundColor(color());
                    if (a != null && Build.VERSION.SDK_INT >= 30) Api30.icons(a, color());
                } catch (Throwable ignored) {
                }
            }
        });
    }

    static int color() {
        int c = ThemeArt.surfaceColor;
        return c == 0 ? FALLBACK : (c | 0xFF000000);
    }

    /** Light background → dark status-bar icons, and the other way round. */
    static boolean light(int c) {
        int r = (c >> 16) & 0xff, g = (c >> 8) & 0xff, b = c & 0xff;
        return 0.299 * r + 0.587 * g + 0.114 * b > 150;
    }

    /** Insets as padding, the same on Android 11 to 16, so the page lays out one way everywhere. */
    static final class Api30 {
        private Api30() {}

        static void install(Activity a, FrameLayout box) {
            Window w = a.getWindow();
            w.setDecorFitsSystemWindows(false);
            w.setStatusBarColor(0);              // the frame's colour shows through (ignored on 15+)
            w.setNavigationBarColor(0);
            if (Build.VERSION.SDK_INT >= 29) w.setNavigationBarContrastEnforced(false);
            box.setOnApplyWindowInsetsListener(new View.OnApplyWindowInsetsListener() {
                @Override
                public WindowInsets onApplyWindowInsets(View v, WindowInsets in) {
                    android.graphics.Insets s = in.getInsets(WindowInsets.Type.systemBars()
                        | WindowInsets.Type.displayCutout() | WindowInsets.Type.ime());
                    v.setPadding(s.left, s.top, s.right, s.bottom);
                    return WindowInsets.CONSUMED;
                }
            });
            icons(a, color());
            box.requestApplyInsets();
        }

        static void icons(Activity a, int bg) {
            android.view.WindowInsetsController c = a.getWindow().getInsetsController();
            if (c == null) return;
            int both = android.view.WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                | android.view.WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS;
            c.setSystemBarsAppearance(light(bg) ? both : 0, both);
        }
    }

    /** Back: go back in the page if it can, else close the reader, as onBackPressed() did. */
    static final class Api33 {
        private Api33() {}

        static void back(final Activity a, final WebView web) {
            a.getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT,
                new android.window.OnBackInvokedCallback() {
                    @Override
                    public void onBackInvoked() {
                        if (web.canGoBack()) web.goBack();
                        else a.finish();
                    }
                });
        }
    }
}
