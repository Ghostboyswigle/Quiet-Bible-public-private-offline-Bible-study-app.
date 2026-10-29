import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), viteReact()],
  publicDir: false,
  resolve: {
    alias: { "@": resolve(root, "src") },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    emptyOutDir: true,
    outDir: resolve(root, "apk-android/app/src/main/assets/www"),
    cssCodeSplit: false,
    lib: {
      entry: resolve(root, "apk-web/main.tsx"),
      name: "QuietBible",
      formats: ["iife"],
      fileName: () => "app.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: "app.[ext]",
      },
    },
  },
});
