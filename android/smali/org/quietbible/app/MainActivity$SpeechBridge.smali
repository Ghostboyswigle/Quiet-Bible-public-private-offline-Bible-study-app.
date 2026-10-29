.class public Lorg/quietbible/app/MainActivity$SpeechBridge;
.super Ljava/lang/Object;
.source "MainActivity.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lorg/quietbible/app/MainActivity;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x1
    name = "SpeechBridge"
.end annotation


# instance fields
.field final synthetic this$0:Lorg/quietbible/app/MainActivity;


# direct methods
.method public constructor <init>(Lorg/quietbible/app/MainActivity;)V
    .locals 0

    .line 214
    iput-object p1, p0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public ready()Z
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .line 217
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$200(Lorg/quietbible/app/MainActivity;)Z

    move-result v0

    return v0
.end method

.method public speak(Ljava/lang/String;FLjava/lang/String;)V
    .locals 2
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .line 222
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    if-nez v0, :cond_0

    return-void

    .line 223
    :cond_0
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    new-instance v1, Lorg/quietbible/app/MainActivity$SpeechBridge$1;

    invoke-direct {v1, p0, p1, p2, p3}, Lorg/quietbible/app/MainActivity$SpeechBridge$1;-><init>(Lorg/quietbible/app/MainActivity$SpeechBridge;Ljava/lang/String;FLjava/lang/String;)V

    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->post(Ljava/lang/Runnable;)Z

    .line 234
    return-void
.end method

.method public stop()V
    .locals 2
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .line 238
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    if-nez v0, :cond_0

    return-void

    .line 239
    :cond_0
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    new-instance v1, Lorg/quietbible/app/MainActivity$SpeechBridge$2;

    invoke-direct {v1, p0}, Lorg/quietbible/app/MainActivity$SpeechBridge$2;-><init>(Lorg/quietbible/app/MainActivity$SpeechBridge;)V

    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->post(Ljava/lang/Runnable;)Z

    .line 245
    return-void
.end method
