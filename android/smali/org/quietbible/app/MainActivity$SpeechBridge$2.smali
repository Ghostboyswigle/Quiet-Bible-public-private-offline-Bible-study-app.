.class Lorg/quietbible/app/MainActivity$SpeechBridge$2;
.super Ljava/lang/Object;
.source "MainActivity.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lorg/quietbible/app/MainActivity$SpeechBridge;->stop()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;


# direct methods
.method constructor <init>(Lorg/quietbible/app/MainActivity$SpeechBridge;)V
    .locals 0

    .line 239
    iput-object p1, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$2;->this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 1

    .line 242
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$2;->this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;

    iget-object v0, v0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$200(Lorg/quietbible/app/MainActivity;)Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$2;->this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;

    iget-object v0, v0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$300(Lorg/quietbible/app/MainActivity;)Landroid/speech/tts/TextToSpeech;

    move-result-object v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$2;->this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;

    iget-object v0, v0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$300(Lorg/quietbible/app/MainActivity;)Landroid/speech/tts/TextToSpeech;

    move-result-object v0

    invoke-virtual {v0}, Landroid/speech/tts/TextToSpeech;->stop()I

    .line 243
    :cond_0
    return-void
.end method
