.class Lorg/quietbible/app/MainActivity$2$1;
.super Ljava/lang/Object;
.source "MainActivity.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lorg/quietbible/app/MainActivity$2;->onCommand(Ljava/lang/String;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$1:Lorg/quietbible/app/MainActivity$2;

.field final synthetic val$command:Ljava/lang/String;


# direct methods
.method constructor <init>(Lorg/quietbible/app/MainActivity$2;Ljava/lang/String;)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    .line 86
    iput-object p1, p0, Lorg/quietbible/app/MainActivity$2$1;->this$1:Lorg/quietbible/app/MainActivity$2;

    iput-object p2, p0, Lorg/quietbible/app/MainActivity$2$1;->val$command:Ljava/lang/String;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 3

    .line 89
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$2$1;->this$1:Lorg/quietbible/app/MainActivity$2;

    iget-object v0, v0, Lorg/quietbible/app/MainActivity$2;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    if-nez v0, :cond_0

    return-void

    .line 90
    :cond_0
    iget-object v0, p0, Lorg/quietbible/app/MainActivity$2$1;->this$1:Lorg/quietbible/app/MainActivity$2;

    iget-object v0, v0, Lorg/quietbible/app/MainActivity$2;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-static {v0}, Lorg/quietbible/app/MainActivity;->access$100(Lorg/quietbible/app/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "window.__qbTransport&&window.__qbTransport(\'"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    iget-object v2, p0, Lorg/quietbible/app/MainActivity$2$1;->val$command:Ljava/lang/String;

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    const-string v2, "\')"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    const/4 v2, 0x0

    invoke-virtual {v0, v1, v2}, Landroid/webkit/WebView;->evaluateJavascript(Ljava/lang/String;Landroid/webkit/ValueCallback;)V

    .line 94
    return-void
.end method
