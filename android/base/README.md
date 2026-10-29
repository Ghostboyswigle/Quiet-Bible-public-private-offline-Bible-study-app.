# The base APK

`QuietBible-v0.6.0.apk` is the first Android build of Quiet Bible. `tools/build.py` keeps three
things from it, which are stored there in Android's compiled form:

| In the APK | Readable form | Made from |
|---|---|---|
| `AndroidManifest.xml` | `decoded/AndroidManifest.xml` | `original-source/v0.5/apk-android/app/src/main/AndroidManifest.xml`, with the playback service and its permissions added in v0.6. `tools/build.py` changes only `versionCode`, `versionName` and `targetSdkVersion` (with `tools/manifest.py`). |
| `resources.arsc` | `decoded/resources.txt` | `original-source/v0.5/apk-android/app/src/main/res/values/styles.xml` (the theme) and the icon. |
| `res/drawable-nodpi-v4/quiet_bible_icon.png` | `decoded/res-files.txt` | The same picture as `web/quiet-bible-icon.png`. |

Everything else in the APK is replaced at build time (see `BUILDING.md`).

`python3 tools/decode_base.py` writes the `decoded/` files; `--check` confirms they still match
the APK. To change the manifest or the theme beyond what `tools/manifest.py` does, edit the
readable form and compile it with Android's `aapt2` (build-tools 34), or with apktool, into a new
base APK.
