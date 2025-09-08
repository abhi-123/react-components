import { defineConfig } from "vite";

// Vite config for traffic-light-pure-css app
export default defineConfig({
  base: "/react-components/infinite-scroll/",  // 👈 repo/app path for GitHub Pages
  build: {
    outDir: "../../.dist/infinite-scroll",     // 👈 output goes into shared .dist
    emptyOutDir: false                                // don't wipe other apps’ builds
  }
});