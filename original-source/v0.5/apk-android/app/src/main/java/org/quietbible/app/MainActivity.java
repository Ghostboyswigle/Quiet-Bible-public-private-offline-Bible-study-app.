package org.quietbible.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Locale;

public class MainActivity extends Activity implements TextToSpeech.OnInitListener {
    private WebView web;
    private TextToSpeech tts;
    private volatile boolean ttsReady = false;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            if (Build.VERSION.SDK_INT >= 21) {
                getWindow().setStatusBarColor(Color.parseColor("#141311"));
                getWindow().setNavigationBarColor(Color.parseColor("#141311"));
            }
            web = new WebView(this);
            web.setBackgroundColor(Color.parseColor("#141311"));
            WebSettings settings = web.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setAllowFileAccess(true);
            settings.setAllowContentAccess(true);
            settings.setMediaPlaybackRequiresUserGesture(false);
            if (Build.VERSION.SDK_INT >= 16) {
                settings.setAllowFileAccessFromFileURLs(true);
                settings.setAllowUniversalAccessFromFileURLs(true);
            }
            if (Build.VERSION.SDK_INT >= 21) {
                settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            }
            web.setWebChromeClient(new WebChromeClient());
            web.setWebViewClient(new WebViewClient() {
                @Override
                public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                    if (request == null || request.getUrl() == null) return null;
                    String path = request.getUrl().getPath();
                    if (path == null) return null;
                    if (path.startsWith("/android_asset/www/")) {
                        path = path.substring("/android_asset/www/".length());
                    } else if (path.startsWith("/android_asset/")) {
                        path = path.substring("/android_asset/".length());
                    } else if (path.startsWith("/www/")) {
                        path = path.substring(5);
                    } else if (path.startsWith("/")) {
                        path = path.substring(1);
                    }
                    if (path.length() == 0) path = "index.html";
                    return openAsset(path);
                }
            });
            web.addJavascriptInterface(new NativeFlag(), "QuietBibleNative");
            web.addJavascriptInterface(new AssetBridge(), "QuietBibleAssets");
            web.addJavascriptInterface(new SpeechBridge(), "QuietBibleSpeech");
            setContentView(web, new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            ));
            tts = new TextToSpeech(this, this);
            web.loadUrl("file:///android_asset/www/index.html");
        } catch (Throwable t) {
            TextView fallback = new TextView(this);
            fallback.setTextColor(Color.parseColor("#f4efe6"));
            fallback.setBackgroundColor(Color.parseColor("#141311"));
            fallback.setPadding(48, 96, 48, 48);
            fallback.setText("Quiet Bible could not open the reader on this device.\n\n" + t.getMessage());
            setContentView(fallback);
        }
    }

    private WebResourceResponse openAsset(String rel) {
        if (rel.contains("..")) return null;
        String mime = "text/plain";
        if (rel.endsWith(".html")) mime = "text/html";
        else if (rel.endsWith(".js")) mime = "application/javascript";
        else if (rel.endsWith(".css")) mime = "text/css";
        else if (rel.endsWith(".json")) mime = "application/json";
        else if (rel.endsWith(".png")) mime = "image/png";
        else if (rel.endsWith(".svg")) mime = "image/svg+xml";
        else if (rel.endsWith(".jpg") || rel.endsWith(".jpeg")) mime = "image/jpeg";
        try {
            InputStream in = getAssets().open("www/" + rel);
            return new WebResourceResponse(mime, "UTF-8", in);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public void onInit(int status) {
        ttsReady = status == TextToSpeech.SUCCESS;
        if (!ttsReady || tts == null) return;
        tts.setLanguage(Locale.US);
        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override
            public void onStart(String utteranceId) {}

            @Override
            public void onError(String utteranceId) {
                onDone(utteranceId);
            }

            @Override
            public void onDone(final String utteranceId) {
                if (web == null) return;
                web.post(new Runnable() {
                    @Override
                    public void run() {
                        String id = utteranceId == null ? "" : utteranceId.replace("\\", "\\\\").replace("'", "\\'");
                        web.evaluateJavascript(
                            "window.__onQbSpeechEnd&&window.__onQbSpeechEnd('" + id + "')",
                            null
                        );
                    }
                });
            }
        });
    }

    public class NativeFlag {
        @JavascriptInterface
        public boolean isNative() {
            return true;
        }
    }

    public class AssetBridge {
        @JavascriptInterface
        public String read(String path) {
            if (path == null) return null;
            String rel = path.startsWith("/") ? path.substring(1) : path;
            if (rel.contains("..") || !rel.startsWith("bible/")) return null;
            try {
                InputStream in = getAssets().open("www/" + rel);
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                byte[] buf = new byte[16384];
                int n;
                while ((n = in.read(buf)) > 0) {
                    out.write(buf, 0, n);
                }
                in.close();
                return out.toString("UTF-8");
            } catch (Exception e) {
                return null;
            }
        }
    }

    public class SpeechBridge {
        @JavascriptInterface
        public boolean ready() {
            return ttsReady;
        }

        @JavascriptInterface
        public void speak(final String text, final float rate, final String id) {
            if (web == null) return;
            web.post(new Runnable() {
                @Override
                public void run() {
                    if (!ttsReady || tts == null || text == null) return;
                    float r = rate;
                    if (r < 0.5f) r = 0.5f;
                    if (r > 1.5f) r = 1.5f;
                    tts.setSpeechRate(r);
                    tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, id == null ? "v" : id);
                }
            });
        }

        @JavascriptInterface
        public void stop() {
            if (web == null) return;
            web.post(new Runnable() {
                @Override
                public void run() {
                    if (ttsReady && tts != null) tts.stop();
                }
            });
        }
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack()) {
            web.goBack();
            return;
        }
        finish();
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
            tts = null;
        }
        if (web != null) {
            web.loadUrl("about:blank");
            web.stopLoading();
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }
}
