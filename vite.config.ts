/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    global: "globalThis",
    __filename: JSON.stringify(""),
    __dirname: JSON.stringify(""),
  },
  resolve: {
    alias: {
      // Provide polyfills for Node.js modules when running in browser
      path: "path-browserify",
      fs: "browserify-fs",
      os: "os-browserify/browser",
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      buffer: "buffer",
      util: "util",
    },
  },
  optimizeDeps: {
    exclude: ["corestore", "hyperdrive", "hyperswarm"],
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["corestore", "hyperdrive", "hyperswarm"],
    },
  },
  // @ts-expect-error - Vitest config is valid but types conflict with Vite
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: [],
    pool: "vmThreads",
  },
});
