import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const packageSourceEntry = path.resolve(packageRoot, "main.js");
const packageDistEntry = path.resolve(packageRoot, "dist/index.esm.js");

export default defineConfig(({ command }) => {
  const usePackageSource = command === "serve";

  return {
    plugins: [react()],
    base: "/react-tree-checkbox/",
    root: __dirname,
    resolve: {
      alias: {
        "react-tree-checkbox": usePackageSource
          ? packageSourceEntry
          : packageDistEntry,
      },
    },
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      fs: {
        allow: [packageRoot],
      },
      watch: {
        // Keep watching package source; ignore built artifacts
        ignored: ["**/website/dist/**"],
      },
    },
    optimizeDeps: {
      exclude: ["react-tree-checkbox"],
    },
  };
});
