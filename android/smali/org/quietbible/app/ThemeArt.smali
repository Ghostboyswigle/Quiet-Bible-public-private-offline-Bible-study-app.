.class public Lorg/quietbible/app/ThemeArt;
.super Ljava/lang/Object;
.source "ThemeArt.java"


# static fields
.field public static accentColor:I

.field public static bgColor:I

.field private static cached:Landroid/graphics/Bitmap;

.field public static surfaceColor:I


# direct methods
.method static constructor <clinit>()V
    .locals 1

    const v0, -0xebecef

    sput v0, Lorg/quietbible/app/ThemeArt;->bgColor:I

    const v0, -0xdee0e5

    sput v0, Lorg/quietbible/app/ThemeArt;->surfaceColor:I

    const v0, -0x375695

    sput v0, Lorg/quietbible/app/ThemeArt;->accentColor:I

    const/4 v0, 0x0

    sput-object v0, Lorg/quietbible/app/ThemeArt;->cached:Landroid/graphics/Bitmap;

    return-void
.end method

.method public static bitmap()Landroid/graphics/Bitmap;
    .locals 8

    sget-object v0, Lorg/quietbible/app/ThemeArt;->cached:Landroid/graphics/Bitmap;

    if-eqz v0, :cond_build

    return-object v0

    :cond_build
    :try_start_0
    const/16 v1, 0x9

    new-array v1, v1, [I

    sget v2, Lorg/quietbible/app/ThemeArt;->bgColor:I

    sget v3, Lorg/quietbible/app/ThemeArt;->surfaceColor:I

    sget v4, Lorg/quietbible/app/ThemeArt;->accentColor:I

    const/4 v5, 0x0

    aput v2, v1, v5

    const/4 v5, 0x1

    aput v2, v1, v5

    const/4 v5, 0x2

    aput v2, v1, v5

    const/4 v5, 0x3

    aput v2, v1, v5

    const/4 v5, 0x4

    aput v4, v1, v5

    const/4 v5, 0x5

    aput v3, v1, v5

    const/4 v5, 0x6

    aput v3, v1, v5

    const/4 v5, 0x7

    aput v3, v1, v5

    const/16 v5, 0x8

    aput v3, v1, v5

    const/4 v6, 0x1

    const/16 v7, 0x9

    sget-object v5, Landroid/graphics/Bitmap$Config;->ARGB_8888:Landroid/graphics/Bitmap$Config;

    invoke-static {v1, v6, v7, v5}, Landroid/graphics/Bitmap;->createBitmap([IIILandroid/graphics/Bitmap$Config;)Landroid/graphics/Bitmap;

    move-result-object v0

    const/16 v6, 0x140

    const/4 v7, 0x1

    invoke-static {v0, v6, v6, v7}, Landroid/graphics/Bitmap;->createScaledBitmap(Landroid/graphics/Bitmap;IIZ)Landroid/graphics/Bitmap;

    move-result-object v0

    sput-object v0, Lorg/quietbible/app/ThemeArt;->cached:Landroid/graphics/Bitmap;
    :try_end_0
    .catch Ljava/lang/Throwable; {:try_start_0 .. :try_end_0} :catch_0

    return-object v0

    :catch_0
    move-exception v1

    const/4 v0, 0x0

    return-object v0
.end method

.method public static set(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    .locals 2

    :try_start_0
    invoke-static {p0}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v0

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v1

    sput v0, Lorg/quietbible/app/ThemeArt;->bgColor:I

    sput v1, Lorg/quietbible/app/ThemeArt;->surfaceColor:I

    invoke-static {p3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v0

    sput v0, Lorg/quietbible/app/ThemeArt;->accentColor:I

    const/4 v0, 0x0

    sput-object v0, Lorg/quietbible/app/ThemeArt;->cached:Landroid/graphics/Bitmap;
    :try_end_0
    .catch Ljava/lang/Throwable; {:try_start_0 .. :try_end_0} :catch_0

    return-void

    :catch_0
    move-exception v0

    return-void
.end method
