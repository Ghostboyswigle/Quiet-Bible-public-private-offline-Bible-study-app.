.class public Lorg/quietbible/app/MainActivity$TransportBridge;
.super Ljava/lang/Object;
.source "MainActivity.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lorg/quietbible/app/MainActivity;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x1
    name = "TransportBridge"
.end annotation


# instance fields
.field final synthetic this$0:Lorg/quietbible/app/MainActivity;


# direct methods
.method public constructor <init>(Lorg/quietbible/app/MainActivity;)V
    .locals 0

    .line 173
    iput-object p1, p0, Lorg/quietbible/app/MainActivity$TransportBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public stop()V
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .line 181
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$TransportBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-virtual {v0}, Lorg/quietbible/app/MainActivity;->getApplicationContext()Landroid/content/Context;

    move-result-object v0

    invoke-static {v0}, Lorg/quietbible/app/PlaybackService;->stopPlayback(Landroid/content/Context;)V

    .line 182
    return-void
.end method

.method public theme(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    .locals 0
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    invoke-static {p1, p2, p3, p4}, Lorg/quietbible/app/ThemeArt;->set(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    invoke-static {}, Lorg/quietbible/app/EdgeToEdge;->themeChanged()V

    return-void
.end method

.method public update(ZLjava/lang/String;Ljava/lang/String;)V
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .line 176
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$TransportBridge;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-virtual {v0}, Lorg/quietbible/app/MainActivity;->getApplicationContext()Landroid/content/Context;

    move-result-object v0

    invoke-static {v0, p1, p2, p3}, Lorg/quietbible/app/PlaybackService;->update(Landroid/content/Context;ZLjava/lang/String;Ljava/lang/String;)V

    .line 177
    return-void
.end method
