.class public Lorg/quietbible/app/MainActivity;
.super Landroid/app/Activity;
.source "MainActivity.java"

# interfaces
.implements Landroid/speech/tts/TextToSpeech$OnInitListener;


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Lorg/quietbible/app/MainActivity$NativeFlag;,
        Lorg/quietbible/app/MainActivity$AssetBridge;,
        Lorg/quietbible/app/MainActivity$SpeechBridge;,
        Lorg/quietbible/app/MainActivity$TransportBridge;
    }
.end annotation


# instance fields
.field private tts:Landroid/speech/tts/TextToSpeech;

.field private volatile ttsReady:Z

.field private web:Landroid/webkit/WebView;


# direct methods
.method public constructor <init>()V
    .locals 1

    .line 26
    invoke-direct {p0}, Landroid/app/Activity;-><init>()V

    .line 29
    const/4 v0, 0x0

    iput-boolean v0, p0, Lorg/quietbible/app/MainActivity;->ttsReady:Z

    return-void
.end method

.method static synthetic access$000(Lorg/quietbible/app/MainActivity;Ljava/lang/String;)Landroid/webkit/WebResourceResponse;
    .locals 0

    .line 26
    invoke-direct {p0, p1}, Lorg/quietbible/app/MainActivity;->openAsset(Ljava/lang/String;)Landroid/webkit/WebResourceResponse;

    move-result-object p0

    return-object p0
.end method

.method static synthetic access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;
    .locals 0

    .line 26
    iget-object p0, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    return-object p0
.end method

.method static synthetic access$200(Lorg/quietbible/app/MainActivity;)Z
    .locals 0

    .line 26
    iget-boolean p0, p0, Lorg/quietbible/app/MainActivity;->ttsReady:Z

    return p0
.end method

.method static synthetic access$300(Lorg/quietbible/app/MainActivity;)Landroid/speech/tts/TextToSpeech;
    .locals 0

    .line 26
    iget-object p0, p0, Lorg/quietbible/app/MainActivity;->tts:Landroid/speech/tts/TextToSpeech;

    return-object p0
.end method

.method private openAsset(Ljava/lang/String;)Landroid/webkit/WebResourceResponse;
    .locals 5

    .line 116
    const-string v0, ".."

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    const/4 v1, 0x0

    if-eqz v0, :cond_0

    return-object v1

    .line 117
    :cond_0
    nop

    .line 118
    const-string v0, ".html"

    invoke-virtual {p1, v0}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_1

    const-string v0, "text/html"

    goto :goto_1

    .line 119
    :cond_1
    const-string v0, ".js"

    invoke-virtual {p1, v0}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_2

    const-string v0, "application/javascript"

    goto :goto_1

    .line 120
    :cond_2
    const-string v0, ".css"

    invoke-virtual {p1, v0}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_3

    const-string v0, "text/css"

    goto :goto_1

    .line 121
    :cond_3
    const-string v0, ".json"

    invoke-virtual {p1, v0}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_4

    const-string v0, "application/json"

    goto :goto_1

    .line 122
    :cond_4
    const-string v0, ".png"

    invoke-virtual {p1, v0}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_5

    const-string v0, "image/png"

    goto :goto_1

    .line 123
    :cond_5
    const-string v0, ".svg"

    invoke-virtual {p1, v0}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_6

    const-string v0, "image/svg+xml"

    goto :goto_1

    .line 124
    :cond_6
    const-string v0, ".jpg"

    invoke-virtual {p1, v0}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v0

    if-nez v0, :cond_8

    const-string v0, ".jpeg"

    invoke-virtual {p1, v0}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_7

    goto :goto_0

    :cond_7
    const-string v0, "text/plain"

    goto :goto_1

    :cond_8
    :goto_0
    const-string v0, "image/jpeg"

    .line 126
    :goto_1
    :try_start_0
    invoke-virtual {p0}, Lorg/quietbible/app/MainActivity;->getAssets()Landroid/content/res/AssetManager;

    move-result-object v2

    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    const-string v4, "www/"

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v3

    invoke-virtual {v3, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object p1

    invoke-virtual {p1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v2, p1}, Landroid/content/res/AssetManager;->open(Ljava/lang/String;)Ljava/io/InputStream;

    move-result-object p1

    .line 127
    new-instance v2, Landroid/webkit/WebResourceResponse;

    const-string v3, "UTF-8"

    invoke-direct {v2, v0, v3, p1}, Landroid/webkit/WebResourceResponse;-><init>(Ljava/lang/String;Ljava/lang/String;Ljava/io/InputStream;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    return-object v2

    .line 128
    :catch_0
    move-exception p1

    .line 129
    return-object v1
.end method

.method private requestNotificationPermission()V
    .locals 2

    .line 166
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v1, 0x21

    if-ge v0, v1, :cond_0

    return-void

    .line 167
    :cond_0
    const-string v0, "android.permission.POST_NOTIFICATIONS"

    invoke-virtual {p0, v0}, Lorg/quietbible/app/MainActivity;->checkSelfPermission(Ljava/lang/String;)I

    move-result v1

    if-eqz v1, :cond_1

    .line 169
    filled-new-array {v0}, [Ljava/lang/String;

    move-result-object v0

    const/16 v1, 0x3e9

    invoke-virtual {p0, v0, v1}, Lorg/quietbible/app/MainActivity;->requestPermissions([Ljava/lang/String;I)V

    .line 171
    :cond_1
    return-void
.end method


# virtual methods
.method protected onActivityResult(IILandroid/content/Intent;)V
    .locals 0

    invoke-super {p0, p1, p2, p3}, Landroid/app/Activity;->onActivityResult(IILandroid/content/Intent;)V

    invoke-static {p0, p1, p2, p3}, Lorg/quietbible/app/VoiceBridge;->onActivityResult(Landroid/app/Activity;IILandroid/content/Intent;)V

    invoke-static {p0, p1, p2, p3}, Lorg/quietbible/app/BibleBridge;->onActivityResult(Landroid/app/Activity;IILandroid/content/Intent;)V

    return-void
.end method

.method public onBackPressed()V
    .locals 1

    .line 250
    iget-object v0, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroid/webkit/WebView;->canGoBack()Z

    move-result v0

    if-eqz v0, :cond_0

    .line 251
    iget-object v0, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    invoke-virtual {v0}, Landroid/webkit/WebView;->goBack()V

    .line 252
    return-void

    .line 254
    :cond_0
    invoke-virtual {p0}, Lorg/quietbible/app/MainActivity;->finish()V

    .line 255
    return-void
.end method

.method protected onCreate(Landroid/os/Bundle;)V
    .locals 3

    .line 34
    const-string v0, "#141311"

    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    .line 36
    nop

    .line 37
    :try_start_0
    invoke-virtual {p0}, Lorg/quietbible/app/MainActivity;->getWindow()Landroid/view/Window;

    move-result-object p1

    invoke-static {v0}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v1

    invoke-virtual {p1, v1}, Landroid/view/Window;->setStatusBarColor(I)V

    .line 38
    invoke-virtual {p0}, Lorg/quietbible/app/MainActivity;->getWindow()Landroid/view/Window;

    move-result-object p1

    invoke-static {v0}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v1

    invoke-virtual {p1, v1}, Landroid/view/Window;->setNavigationBarColor(I)V

    .line 40
    new-instance p1, Landroid/webkit/WebView;

    invoke-direct {p1, p0}, Landroid/webkit/WebView;-><init>(Landroid/content/Context;)V

    iput-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    .line 41
    invoke-static {v0}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v1

    invoke-virtual {p1, v1}, Landroid/webkit/WebView;->setBackgroundColor(I)V

    .line 42
    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    invoke-virtual {p1}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;

    move-result-object p1

    .line 43
    const/4 v1, 0x1

    invoke-virtual {p1, v1}, Landroid/webkit/WebSettings;->setJavaScriptEnabled(Z)V

    .line 44
    invoke-virtual {p1, v1}, Landroid/webkit/WebSettings;->setDomStorageEnabled(Z)V

    .line 45
    invoke-virtual {p1, v1}, Landroid/webkit/WebSettings;->setAllowFileAccess(Z)V

    .line 46
    invoke-virtual {p1, v1}, Landroid/webkit/WebSettings;->setAllowContentAccess(Z)V

    .line 47
    const/4 v2, 0x0

    invoke-virtual {p1, v2}, Landroid/webkit/WebSettings;->setMediaPlaybackRequiresUserGesture(Z)V

    .line 48
    nop

    .line 49
    invoke-virtual {p1, v1}, Landroid/webkit/WebSettings;->setAllowFileAccessFromFileURLs(Z)V

    .line 50
    invoke-virtual {p1, v1}, Landroid/webkit/WebSettings;->setAllowUniversalAccessFromFileURLs(Z)V

    .line 52
    nop

    .line 53
    invoke-virtual {p1, v2}, Landroid/webkit/WebSettings;->setMixedContentMode(I)V

    .line 55
    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    new-instance v1, Landroid/webkit/WebChromeClient;

    invoke-direct {v1}, Landroid/webkit/WebChromeClient;-><init>()V

    invoke-virtual {p1, v1}, Landroid/webkit/WebView;->setWebChromeClient(Landroid/webkit/WebChromeClient;)V

    .line 56
    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    new-instance v1, Lorg/quietbible/app/MainActivity$1;

    invoke-direct {v1, p0}, Lorg/quietbible/app/MainActivity$1;-><init>(Lorg/quietbible/app/MainActivity;)V

    invoke-virtual {p1, v1}, Landroid/webkit/WebView;->setWebViewClient(Landroid/webkit/WebViewClient;)V

    .line 75
    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    new-instance v1, Lorg/quietbible/app/MainActivity$NativeFlag;

    invoke-direct {v1, p0}, Lorg/quietbible/app/MainActivity$NativeFlag;-><init>(Lorg/quietbible/app/MainActivity;)V

    const-string v2, "QuietBibleNative"

    invoke-virtual {p1, v1, v2}, Landroid/webkit/WebView;->addJavascriptInterface(Ljava/lang/Object;Ljava/lang/String;)V

    .line 76
    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    new-instance v1, Lorg/quietbible/app/MainActivity$AssetBridge;

    invoke-direct {v1, p0}, Lorg/quietbible/app/MainActivity$AssetBridge;-><init>(Lorg/quietbible/app/MainActivity;)V

    invoke-static {p0, p1, v1}, Lorg/quietbible/app/BibleBridge;->wrap(Landroid/content/Context;Landroid/webkit/WebView;Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v1

    const-string v2, "QuietBibleAssets"

    invoke-virtual {p1, v1, v2}, Landroid/webkit/WebView;->addJavascriptInterface(Ljava/lang/Object;Ljava/lang/String;)V

    .line 77
    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    new-instance v1, Lorg/quietbible/app/MainActivity$SpeechBridge;

    invoke-direct {v1, p0}, Lorg/quietbible/app/MainActivity$SpeechBridge;-><init>(Lorg/quietbible/app/MainActivity;)V

    invoke-static {p0, p1, v1}, Lorg/quietbible/app/VoiceBridge;->wrap(Landroid/content/Context;Landroid/webkit/WebView;Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v1

    const-string v2, "QuietBibleSpeech"

    invoke-virtual {p1, v1, v2}, Landroid/webkit/WebView;->addJavascriptInterface(Ljava/lang/Object;Ljava/lang/String;)V

    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    new-instance v1, Lorg/quietbible/app/QbStorage;

    invoke-direct {v1, p0}, Lorg/quietbible/app/QbStorage;-><init>(Landroid/content/Context;)V

    const-string v2, "QuietBibleStorage"

    invoke-virtual {p1, v1, v2}, Landroid/webkit/WebView;->addJavascriptInterface(Ljava/lang/Object;Ljava/lang/String;)V

    .line 78
    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    new-instance v1, Lorg/quietbible/app/MainActivity$TransportBridge;

    invoke-direct {v1, p0}, Lorg/quietbible/app/MainActivity$TransportBridge;-><init>(Lorg/quietbible/app/MainActivity;)V

    const-string v2, "QuietBibleTransport"

    invoke-virtual {p1, v1, v2}, Landroid/webkit/WebView;->addJavascriptInterface(Ljava/lang/Object;Ljava/lang/String;)V

    .line 82
    new-instance p1, Lorg/quietbible/app/MainActivity$2;

    invoke-direct {p1, p0}, Lorg/quietbible/app/MainActivity$2;-><init>(Lorg/quietbible/app/MainActivity;)V

    sput-object p1, Lorg/quietbible/app/PlaybackService;->commandSink:Lorg/quietbible/app/PlaybackService$CommandSink;

    .line 98
    invoke-direct {p0}, Lorg/quietbible/app/MainActivity;->requestNotificationPermission()V

    .line 99
    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    # Android 15+ draws edge to edge: pad the page clear of the system bars (EdgeToEdge.java)
    invoke-static {p0, p1}, Lorg/quietbible/app/EdgeToEdge;->wrap(Landroid/app/Activity;Landroid/view/View;)Landroid/view/View;

    move-result-object p1

    new-instance v1, Landroid/view/ViewGroup$LayoutParams;

    const/4 v2, -0x1

    invoke-direct {v1, v2, v2}, Landroid/view/ViewGroup$LayoutParams;-><init>(II)V

    invoke-virtual {p0, p1, v1}, Lorg/quietbible/app/MainActivity;->setContentView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    .line 103
    new-instance p1, Landroid/speech/tts/TextToSpeech;

    invoke-direct {p1, p0, p0}, Landroid/speech/tts/TextToSpeech;-><init>(Landroid/content/Context;Landroid/speech/tts/TextToSpeech$OnInitListener;)V

    iput-object p1, p0, Lorg/quietbible/app/MainActivity;->tts:Landroid/speech/tts/TextToSpeech;

    .line 104
    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    const-string v1, "file:///android_asset/www/index.html"

    invoke-virtual {p1, v1}, Landroid/webkit/WebView;->loadUrl(Ljava/lang/String;)V
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    .line 112
    goto :goto_0

    .line 105
    :catchall_0
    move-exception p1

    .line 106
    new-instance v1, Landroid/widget/TextView;

    invoke-direct {v1, p0}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 107
    const-string v2, "#f4efe6"

    invoke-static {v2}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v2

    invoke-virtual {v1, v2}, Landroid/widget/TextView;->setTextColor(I)V

    .line 108
    invoke-static {v0}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v0

    invoke-virtual {v1, v0}, Landroid/widget/TextView;->setBackgroundColor(I)V

    .line 109
    const/16 v0, 0x60

    const/16 v2, 0x30

    invoke-virtual {v1, v2, v0, v2, v2}, Landroid/widget/TextView;->setPadding(IIII)V

    .line 110
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Quiet Bible could not open the reader on this device.\n\n"

    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v0

    invoke-virtual {p1}, Ljava/lang/Throwable;->getMessage()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object p1

    invoke-virtual {p1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v1, p1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 111
    invoke-virtual {p0, v1}, Lorg/quietbible/app/MainActivity;->setContentView(Landroid/view/View;)V

    .line 113
    :goto_0
    return-void
.end method

.method protected onDestroy()V
    .locals 3

    invoke-static {}, Lorg/quietbible/app/VoiceBridge;->shutdown()V

    .line 259
    const/4 v0, 0x0

    sput-object v0, Lorg/quietbible/app/PlaybackService;->commandSink:Lorg/quietbible/app/PlaybackService$CommandSink;

    .line 260
    invoke-virtual {p0}, Lorg/quietbible/app/MainActivity;->getApplicationContext()Landroid/content/Context;

    move-result-object v1

    invoke-static {v1}, Lorg/quietbible/app/PlaybackService;->stopPlayback(Landroid/content/Context;)V

    .line 261
    iget-object v1, p0, Lorg/quietbible/app/MainActivity;->tts:Landroid/speech/tts/TextToSpeech;

    if-eqz v1, :cond_0

    .line 262
    invoke-virtual {v1}, Landroid/speech/tts/TextToSpeech;->stop()I

    .line 263
    iget-object v1, p0, Lorg/quietbible/app/MainActivity;->tts:Landroid/speech/tts/TextToSpeech;

    invoke-virtual {v1}, Landroid/speech/tts/TextToSpeech;->shutdown()V

    .line 264
    iput-object v0, p0, Lorg/quietbible/app/MainActivity;->tts:Landroid/speech/tts/TextToSpeech;

    .line 266
    :cond_0
    iget-object v1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    if-eqz v1, :cond_1

    .line 267
    const-string v2, "about:blank"

    invoke-virtual {v1, v2}, Landroid/webkit/WebView;->loadUrl(Ljava/lang/String;)V

    .line 268
    iget-object v1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    invoke-virtual {v1}, Landroid/webkit/WebView;->stopLoading()V

    .line 269
    iget-object v1, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    invoke-virtual {v1}, Landroid/webkit/WebView;->destroy()V

    .line 270
    iput-object v0, p0, Lorg/quietbible/app/MainActivity;->web:Landroid/webkit/WebView;

    .line 272
    :cond_1
    invoke-super {p0}, Landroid/app/Activity;->onDestroy()V

    .line 273
    return-void
.end method

.method public onInit(I)V
    .locals 1

    .line 135
    if-nez p1, :cond_0

    const/4 p1, 0x1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    iput-boolean p1, p0, Lorg/quietbible/app/MainActivity;->ttsReady:Z

    .line 136
    iget-boolean p1, p0, Lorg/quietbible/app/MainActivity;->ttsReady:Z

    if-eqz p1, :cond_2

    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->tts:Landroid/speech/tts/TextToSpeech;

    if-nez p1, :cond_1

    goto :goto_1

    .line 137
    :cond_1
    sget-object v0, Ljava/util/Locale;->US:Ljava/util/Locale;

    invoke-virtual {p1, v0}, Landroid/speech/tts/TextToSpeech;->setLanguage(Ljava/util/Locale;)I

    .line 138
    iget-object p1, p0, Lorg/quietbible/app/MainActivity;->tts:Landroid/speech/tts/TextToSpeech;

    new-instance v0, Lorg/quietbible/app/MainActivity$3;

    invoke-direct {v0, p0}, Lorg/quietbible/app/MainActivity$3;-><init>(Lorg/quietbible/app/MainActivity;)V

    invoke-virtual {p1, v0}, Landroid/speech/tts/TextToSpeech;->setOnUtteranceProgressListener(Landroid/speech/tts/UtteranceProgressListener;)I

    .line 162
    return-void

    .line 136
    :cond_2
    :goto_1
    return-void
.end method
