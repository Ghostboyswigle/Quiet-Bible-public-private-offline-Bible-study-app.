.class Lorg/quietbible/app/MainActivity$2;
.super Ljava/lang/Object;
.source "MainActivity.java"

# interfaces
.implements Lorg/quietbible/app/PlaybackService$CommandSink;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lorg/quietbible/app/MainActivity;->onCreate(Landroid/os/Bundle;)V
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

    .line 82
    iput-object p1, p0, Lorg/quietbible/app/MainActivity$2;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onCommand(Ljava/lang/String;)V
    .locals 2

    .line 85
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$2;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    if-nez v0, :cond_0

    return-void

    .line 86
    :cond_0
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$2;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    new-instance v1, Lorg/quietbible/app/MainActivity$2$1;

    invoke-direct {v1, p0, p1}, Lorg/quietbible/app/MainActivity$2$1;-><init>(Lorg/quietbible/app/MainActivity$2;Ljava/lang/String;)V

    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->post(Ljava/lang/Runnable;)Z

    .line 96
    return-void
.end method
