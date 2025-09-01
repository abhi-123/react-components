import { defineConfig } from "vite";

// Vite config for traffic-light-pure-css app
export default defineConfig({
  base: "/react-components/traffic-light-pure-css/",  // 👈 repo/app path for GitHub Pages
  build: {
    outDir: "../../.dist/traffic-light-pure-css",     // 👈 output goes into shared .dist
    emptyOutDir: false                                // don't wipe other apps’ builds
  }
});