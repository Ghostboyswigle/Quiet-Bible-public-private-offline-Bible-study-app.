# Quiet Bible v0.5: the original reader source

Quiet Bible began as a React/TypeScript web reader (made with an AI app builder) wrapped in a
small Android app. `web/app.js` in this repository is the compiled bundle of the code here; since
v0.6 every change has been made in `web/app.js` itself (see `BUILDING.md`, "Editing the page"),
so this is the starting point, not the current source of the page.

What is here is exactly what the Android build used:

| Path | What it is |
|---|---|
| `apk-web/` | The entry point (`main.tsx`) and page (`index.html`) of the Android build. |
| `src/` | The reader: components, the Bible text loader, search, plans, speech, the store, themes. |
| `vite.apk.config.ts` | Builds `apk-web/main.tsx` into one script, `app.js`. |
| `apk-android/` | The Android side as it was then: `AndroidManifest.xml`, `MainActivity.java` and `styles.xml`. The manifest and resources in `android/base/QuietBible-v0.6.0.apk` were compiled from these (see `android/base/README.md`), and `android/smali/` is that `MainActivity` as it has been edited since. |
| `scripts/build-apk.sh` | The original APK build (Android build-tools 34). |
| `scripts/parse-bsb.mjs` | Converted the BSB's USFM files into the reader's JSON. |

Left out: the app builder's own scaffolding, which the Android app never used (a sign-in
system, a database layer, preview and deployment scripts, a web server), its lock file, and
`public/` (the Bible text and icon, which are in `web/`). The package list in `package.json` is
cut down to what this code imports.
