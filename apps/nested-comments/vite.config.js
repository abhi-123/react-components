import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react-components/nested-comments/",
  build: {
    outDir: "../../.dist/nested-comments",
    emptyOutDir: false,
  },
});
