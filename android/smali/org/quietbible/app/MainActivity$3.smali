.class Lorg/quietbible/app/MainActivity$3;
.super Landroid/speech/tts/UtteranceProgressListener;
.source "MainActivity.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lorg/quietbible/app/MainActivity;->onInit(I)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lorg/quietbible/app/MainActivity;


# direct methods
.method constructor <init>(Lorg/quietbible/app/MainActivity;)V
    .locals 0

    .line 138
    iput-object p1, p0, Lorg/quietbible/app/MainActivity$3;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-direct {p0}, Landroid/speech/tts/UtteranceProgressListener;-><init>()V

    return-void
.end method


# virtual methods
.method public onDone(Ljava/lang/String;)V
    .locals 2

    .line 149
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$3;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    if-nez v0, :cond_0

    return-void

    .line 150
    :cond_0
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$3;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    new-instance v1, Lorg/quietbible/app/MainActivity$3$1;

    invoke-direct {v1, p0, p1}, Lorg/quietbible/app/MainActivity$3$1;-><init>(Lorg/quietbible/app/MainActivity$3;Ljava/lang/String;)V

    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->post(Ljava/lang/Runnable;)Z

    .line 160
    return-void
.end method

.method public onError(Ljava/lang/String;)V
    .locals 0

    .line 144
    invoke-virtual {p0, p1}, Lorg/quietbible/app/MainActivity$3;->onDone(Ljava/lang/String;)V

    .line 145
    return-void
.end method

.method public onStart(Ljava/lang/String;)V
    .locals 0

    .line 140
    return-void
.end method
