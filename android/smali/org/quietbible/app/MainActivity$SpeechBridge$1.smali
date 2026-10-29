.class Lorg/quietbible/app/MainActivity$SpeechBridge$1;
.super Ljava/lang/Object;
.source "MainActivity.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lorg/quietbible/app/MainActivity$SpeechBridge;->speak(Ljava/lang/String;FLjava/lang/String;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;

.field final synthetic val$id:Ljava/lang/String;

.field final synthetic val$rate:F

.field final synthetic val$text:Ljava/lang/String;


# direct methods
.method constructor <init>(Lorg/quietbible/app/MainActivity$SpeechBridge;Ljava/lang/String;FLjava/lang/String;)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    .line 223
    iput-object p1, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;

    iput-object p2, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->val$text:Ljava/lang/String;

    iput p3, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->val$rate:F

    iput-object p4, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->val$id:Ljava/lang/String;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 5

    .line 226
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;

    iget-object v0, v0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$200(Lorg/quietbible/app/MainActivity;)Z

    move-result v0

    if-eqz v0, :cond_4

    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;

    iget-object v0, v0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$300(Lorg/quietbible/app/MainActivity;)Landroid/speech/tts/TextToSpeech;

    move-result-object v0

    if-eqz v0, :cond_4

    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->val$text:Ljava/lang/String;

    if-nez v0, :cond_0

    goto :goto_0

    .line 227
    :cond_0
    iget v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->val$rate:F

    .line 228
    const v1, 0x3f000000    # 0.5f (plain const: d2j-smali mis-assembles high16)

    cmpg-float v2, v0, v1

    if-gez v2, :cond_1

    move v0, v1

    .line 229
    :cond_1
    const v1, 0x3fc00000    # 1.5f

    cmpl-float v2, v0, v1

    if-lez v2, :cond_2

    move v0, v1

    .line 230
    :cond_2
    iget-object v1, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;

    iget-object v1, v1, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v1}, Lorg/quietbible/app/MainActivity;->access$300(Lorg/quietbible/app/MainActivity;)Landroid/speech/tts/TextToSpeech;

    move-result-object v1

    invoke-virtual {v1, v0}, Landroid/speech/tts/TextToSpeech;->setSpeechRate(F)I

    .line 231
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->this$1:Lorg/quietbible/app/MainActivity$SpeechBridge;

    iget-object v0, v0, Lorg/quietbible/app/MainActivity$SpeechBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$300(Lorg/quietbible/app/MainActivity;)Landroid/speech/tts/TextToSpeech;

    move-result-object v0

    iget-object v1, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->val$text:Ljava/lang/String;

    iget-object v2, p0, Lorg/quietbible/app/MainActivity$SpeechBridge$1;->val$id:Ljava/lang/String;

    if-nez v2, :cond_3

    const-string v2, "v"

    :cond_3
    const/4 v3, 0x0

    const/4 v4, 0x0

    invoke-virtual {v0, v1, v3, v4, v2}, Landroid/speech/tts/TextToSpeech;->speak(Ljava/lang/CharSequence;ILandroid/os/Bundle;Ljava/lang/String;)I

    .line 232
    return-void

    .line 226
    :cond_4
    :goto_0
    return-void
.end method
