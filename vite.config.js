import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/ui-cluster/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        vectorTiles: resolve(__dirname, "vector-tiles.html"),
        mockMarkers: resolve(__dirname, "mock-json-data.html"),
      },
    },
  },
});
