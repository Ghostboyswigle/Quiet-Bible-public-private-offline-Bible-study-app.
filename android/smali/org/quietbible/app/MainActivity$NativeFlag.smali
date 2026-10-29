.class public Lorg/quietbible/app/MainActivity$NativeFlag;
.super Ljava/lang/Object;
.source "MainActivity.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lorg/quietbible/app/MainActivity;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x1
    name = "NativeFlag"
.end annotation


# instance fields
.field final synthetic this$0:Lorg/quietbible/app/MainActivity;


# direct methods
.method public constructor <init>(Lorg/quietbible/app/MainActivity;)V
    .locals 0

    .line 185
    iput-object p1, p0, Lorg/quietbible/app/MainActivity$NativeFlag;->this$0:Lorg/quietbible/app/MainActivity;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public isNative()Z
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .line 188
    const/4 v0, 0x1

    return v0
.end method
