import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react-components/theme-toggle/",
  build: {
    outDir: "../../.dist/theme-toggle",
    emptyOutDir: false,
  },
});
