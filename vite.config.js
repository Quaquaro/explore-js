import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/js/*.test.js"],
    globals: true,
    reporters: "verbose",
  },
  root: "src",
  assetsInclude: ["./assets/**/*.*"],
  build: {
    emptyOutDir: true,
    outDir: "../dist",
  },
});
